#!/usr/bin/env bash
set -euo pipefail

OWNER="${OWNER:-$(git config --get remote.origin.url | sed -E 's#.*github.com[:/]|\.git$##' | cut -d/ -f1)}"
REPO="${REPO:-$(git config --get remote.origin.url | sed -E 's#.*github.com[:/]|\.git$##' | cut -d/ -f2)}"
BRANCH="${BRANCH:-main}"

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required (brew install jq / apt-get install jq)" >&2
  exit 127
fi

RUN_ID=$(gh run list -R "$OWNER/$REPO" --workflow "Node / Grunt CI" --branch "$BRANCH" --limit 1 --json databaseId -q '.[0].databaseId' || true)
if [[ -z "
${RUN_ID:-}" ]]; then
  echo "::notice::No CI runs found on $BRANCH – skipping drift check."
  exit 0
fi

WANT_NODE20=$(gh run view -R "$OWNER/$REPO" "$RUN_ID" --json jobs \
  | jq -r '.jobs[].name' \
  | grep -iE 'build.*(node[^0-9]*20(\.x)?|20(\.x)?[^0-9]*node)' \
  | head -n1 || true)

SHA=$(gh run view -R "$OWNER/$REPO" "$RUN_ID" --json headSha -q .headSha)
WANT_NETLIFY=$(gh api "repos/$OWNER/$REPO/commits/$SHA/check-runs" -F per_page=100 \
  --jq '[.check_runs[] | select(.app.slug=="netlify") | .name]
        | (map(select(test("prod|production"; "i"))) + .)
        | first' || true)

if [[ -z "
${WANT_NODE20:-}" || -z "
${WANT_NETLIFY:-}" ]]; then
  echo "::notice::Could not resolve desired contexts (node20:'$WANT_NODE20' netlify:'$WANT_NETLIFY')."
  exit 0
fi

HAVE_JSON=$(gh api "repos/$OWNER/$REPO/branches/$BRANCH/protection" || true)
if [[ -z "
${HAVE_JSON:-}" ]]; then
  echo "::notice::No branch protection found on $BRANCH."
  HAVE_LIST=()
else
  mapfile -t HAVE_LIST < <(jq -r '.required_status_checks.contexts[]? // empty' <<<"$HAVE_JSON")
fi

to_set() { tr -d '\r' | awk 'NF' | sed 's/^ *//; s/ *$//' | sort -u; }

WANT=$(printf "%s\n%s\n" "$WANT_NODE20" "$WANT_NETLIFY" | to_set)
HAVE=$(printf "%s\n" "${HAVE_LIST[@]-}" | to_set)

if diff -u <(printf "%s\n" "$HAVE") <(printf "%s\n" "$WANT") >/dev/null; then
  echo "✅ No drift. Required contexts are up to date."
  exit 0
fi

echo "⚠️ Drift detected:"
echo "Have:"
printf "  - %s\n" ${HAVE_LIST[@]-}
echo "Want:"
printf "  - %s\n" "$WANT_NODE20" "$WANT_NETLIFY"
exit 2
