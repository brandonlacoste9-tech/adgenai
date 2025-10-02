OWNER  ?= $(shell git config --get remote.origin.url | sed -E 's#.*github.com[:/]|\.git$$##' | cut -d/ -f1)
REPO   ?= $(shell git config --get remote.origin.url | sed -E 's#.*github.com[:/]|\.git$$##' | cut -d/ -f2)
BRANCH ?= main

.PHONY: help
help:
\t@printf "Targets:\n"
\t@printf "  contexts                List latest CI job names and results\n"
\t@printf "  protect-auto:show       Show resolved required contexts for protection\n"
\t@printf "  protect-auto            Apply branch protection (DRY=1 for dry-run)\n"
\t@printf "  verify-protection       Show current branch protection settings\n"
\t@printf "  unrequire               Remove all required status checks\n"
.DEFAULT_GOAL := help

.PHONY: contexts
contexts:
\t@( \
\t  RUN_ID=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Vite CI" --branch $(BRANCH) --limit 1 --json databaseId -q '.[0].databaseId'); \
\t  if [ -z "$RUN_ID" ]; then echo "No runs found for $(BRANCH)"; exit 0; fi; \
\t  gh run view -R $(OWNER)/$(REPO) $$RUN_ID --json jobs \
\t    -q '.jobs[] | "\(.name)  =>  \(.conclusion)"'; \
\t)

.PHONY: protect-auto:show
protect-auto:show:
\t@( set -e; \
\t   command -v jq >/dev/null 2>&1 || { echo "jq is required (brew install jq / apt-get install jq)"; exit 127; } ;\
\t   COMMIT_SHA=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Vite CI" --branch $(BRANCH) --limit 1 --json headSha -q '.[0].headSha'); \
\t   NETLIFY_NAME=$$( \
\t     gh api repos/$(OWNER)/$(REPO)/commits/$$COMMIT_SHA/check-runs \
\t       -F per_page=100 \
\t       --jq '[.check_runs[] | select(.app.slug=="netlify") | .name] | (map(select(test("prod|production"; "i"))) + .) | first' \
\t   ); \
\t   NODE20_CONTEXT=$$( \
\t     RUN_ID=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Vite CI" --branch $(BRANCH) --limit 1 --json databaseId -q '.[0].databaseId'); \
\t     gh run view -R $(OWNER)/$(REPO) $$RUN_ID --json jobs \
\t       | jq -r '.jobs[].name' \
\t       | grep -iE 'build.*(node[^0-9]*20(\.x)?|20(\.x)?[^0-9]*node)' \
\t       | head -n1 \
\t   ); \
\t   echo "Would require:"; \
\t   printf "  • \"%s\"\n" "$$NODE20_CONTEXT"; \
\t   printf "  • \"%s\"\n" "$$NETLIFY_NAME"; \
\t)

.PHONY: protect-auto
protect-auto:
\t@( set -e; \
\t   if [ -z "$GH_TOKEN" ]; then \
\t     gh auth status >/dev/null 2>&1 || { echo "No GH_TOKEN and gh not logged in. Run 'gh auth login' or export GH_TOKEN."; exit 1; } ;\
\t   fi ;\
\t   command -v jq >/dev/null 2>&1 || { echo "jq is required (brew install jq / apt-get install jq)"; exit 127; } ;\
\t   COMMIT_SHA=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Vite CI" --branch $(BRANCH) --limit 1 --json headSha -q '.[0].headSha'); \
\t   if [ -z "$COMMIT_SHA" ]; then echo "No recent run on $(BRANCH); push a change or run CI first."; exit 1; fi; \
\t   NETLIFY_NAME=$$( \
\t     gh api repos/$(OWNER)/$(REPO)/commits/$$COMMIT_SHA/check-runs \
\t       -F per_page=100 \
\t       --jq '[.check_runs[] | select(.app.slug=="netlify") | .name] | (map(select(test("prod|production"; "i"))) + .) | first' \
\t   ); \
\t   if [ -z "$NETLIFY_NAME" ]; then echo "No Netlify check on $$COMMIT_SHA; trigger a deploy or rerun checks."; exit 1; fi; \
\t   NODE20_CONTEXT=$$( \
\t     RUN_ID=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Vite CI" --branch $(BRANCH) --limit 1 --json databaseId -q '.[0].databaseId'); \
\t     gh run view -R $(OWNER)/$(REPO) $$RUN_ID --json jobs \
\t       | jq -r '.jobs[].name' \
\t       | grep -iE 'build.*(node[^0-9]*20(\.x)?|20(\.x)?[^0-9]*node)' \
\t       | head -n1 \
\t   ); \
\t   if [ -z "$NODE20_CONTEXT" ]; then echo "No Node 20 build context found; check your CI job names."; exit 1; fi; \
\t   echo "Will require contexts:"; \
\t   printf "  • \"%s\"\n" "$$NODE20_CONTEXT"; \
\t   printf "  • \"%s\"\n" "$$NETLIFY_NAME"; \
\t   if [ "$$DRY" = "1" ]; then echo "[DRY] Skipping apply."; exit 0; fi; \
\t   gh api -X PUT repos/$(OWNER)/$(REPO)/branches/$(BRANCH)/protection \
\t     -H "Accept: application/vnd.github+json" \
\t     -f required_status_checks.strict=true \
\t     -F required_status_checks.contexts[]="$$NODE20_CONTEXT" \
\t     -F required_status_checks.contexts[]="$$NETLIFY_NAME" \
\t     -f enforce_admins=true \
\t     -f required_pull_request_reviews.dismiss_stale_reviews=true \
\t     -f required_pull_request_reviews.required_approving_review_count=1 \
\t     -f required_linear_history=true \
\t     -f restrictions=""; \
\t   echo "Branch protection updated ✅"; \
\t)

.PHONY: verify-protection
verify-protection:
\tgh api repos/$(OWNER)/$(REPO)/branches/$(BRANCH)/protection \
\t  --jq '{strict:.required_status_checks.strict,contexts:.required_status_checks.contexts,linear:.required_linear_history.enabled,reviews:.required_pull_request_reviews.required_approving_review_count}'

.PHONY: unrequire
unrequire:
\tgh api -X PUT repos/$(OWNER)/$(REPO)/branches/$(BRANCH)/protection \
\t  -H "Accept: application/vnd.github+json" \
\t  -f required_status_checks.strict=true \
\t  -f required_status_checks.contexts[]=\"\" \
\t  -f enforce_admins=true \
\t  -f required_pull_request_reviews.required_approving_review_count=1 \
\t  -f required_linear_history=true \
\t  -f restrictions=""