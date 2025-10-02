OWNER  ?= $(shell git config --get remote.origin.url | sed -E 's#.*github.com[:/]|\.git$$##' | cut -d/ -f1)
REPO   ?= $(shell git config --get remote.origin.url | sed -E 's#.*github.com[:/]|\.git$$##' | cut -d/ -f2)
BRANCH ?= main

.PHONY: help
help:
	@printf "Targets:\n"
	@printf "  contexts                List latest CI job names and results\n"
	@printf "  protect-auto-show       Show resolved required contexts for protection\n"
	@printf "  protect-auto            Apply branch protection (DRY=1 for dry-run)\n"
	@printf "  verify-protection       Show current branch protection settings\n"
	@printf "  unrequire               Remove all required status checks\n"
	@printf "  open-netlify            Open Netlify dashboard for deployed site\n"
	@printf "  deploy-prod             Build and deploy to production\n"
.DEFAULT_GOAL := help

.PHONY: contexts
contexts:
	@( \
	  RUN_ID=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Grunt CI" --branch $(BRANCH) --limit 1 --json databaseId -q '.[0].databaseId'); \
	  if [ -z "$RUN_ID" ]; then echo "No runs found for $(BRANCH)"; exit 0; fi; \
	  gh run view -R $(OWNER)/$(REPO) $$RUN_ID --json jobs \
	    -q '.jobs[] | "\(.name)  =>  \(.conclusion)"'; \
	)

.PHONY: protect-auto\:show
protect-auto-show:
	@( set -e; \
	   command -v jq >/dev/null 2>&1 || { echo "jq is required (brew install jq / apt-get install jq)"; exit 127; } ;\
	   COMMIT_SHA=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Grunt CI" --branch $(BRANCH) --limit 1 --json headSha -q '.[0].headSha'); \
	   NETLIFY_NAME=$$( \
	     gh api repos/$(OWNER)/$(REPO)/commits/$$COMMIT_SHA/check-runs \
	       -F per_page=100 \
	       --jq '[.check_runs[] | select(.app.slug=="netlify") | .name] | (map(select(test("prod|production"; "i"))) + .) | first' \
	   ); \
	   NODE20_CONTEXT=$$( \
	     RUN_ID=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Grunt CI" --branch $(BRANCH) --limit 1 --json databaseId -q '.[0].databaseId'); \
	     gh run view -R $(OWNER)/$(REPO) $$RUN_ID --json jobs \
	       | jq -r '.jobs[].name' \
	       | grep -iE 'build.*(node[^0-9]*20(\.x)?|20(\.x)?[^0-9]*node)' \
	       | head -n1 \
	   ); \
	   echo "Would require:"; \
	   printf "  • \"%s\"\n" "$$NODE20_CONTEXT"; \
	   printf "  • \"%s\"\n" "$$NETLIFY_NAME"; \
	)

.PHONY: protect-auto
protect-auto:
	@( set -e; \
	   if [ -z "$GH_TOKEN" ]; then \
	     gh auth status >/dev/null 2>&1 || { echo "No GH_TOKEN and gh not logged in. Run 'gh auth login' or export GH_TOKEN."; exit 1; } ;\
	   fi ;\
	   command -v jq >/dev/null 2>&1 || { echo "jq is required (brew install jq / apt-get install jq)"; exit 127; } ;\
	   COMMIT_SHA=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Grunt CI" --branch $(BRANCH) --limit 1 --json headSha -q '.[0].headSha'); \
	   if [ -z "$COMMIT_SHA" ]; then echo "No recent run on $(BRANCH); push a change or run CI first."; exit 1; fi; \
	   NETLIFY_NAME=$$( \
	     gh api repos/$(OWNER)/$(REPO)/commits/$$COMMIT_SHA/check-runs \
	       -F per_page=100 \
	       --jq '[.check_runs[] | select(.app.slug=="netlify") | .name] | (map(select(test("prod|production"; "i"))) + .) | first' \
	   ); \
	   if [ -z "$NETLIFY_NAME" ]; then echo "No Netlify check on $$COMMIT_SHA; trigger a deploy or rerun checks."; exit 1; fi; \
	   NODE20_CONTEXT=$$( \
	     RUN_ID=$$(gh run list -R $(OWNER)/$(REPO) --workflow "Node / Grunt CI" --branch $(BRANCH) --limit 1 --json databaseId -q '.[0].databaseId'); \
	     gh run view -R $(OWNER)/$(REPO) $$RUN_ID --json jobs \
	       | jq -r '.jobs[].name' \
	       | grep -iE 'build.*(node[^0-9]*20(\.x)?|20(\.x)?[^0-9]*node)' \
	       | head -n1 \
	   ); \
	   if [ -z "$NODE20_CONTEXT" ]; then echo "No Node 20 build context found; check your CI job names."; exit 1; fi; \
	   echo "Will require contexts:"; \
	   printf "  • \"%s\"\n" "$$NODE20_CONTEXT"; \
	   printf "  • \"%s\"\n" "$$NETLIFY_NAME"; \
	   if [ "$$DRY" = "1" ]; then echo "[DRY] Skipping apply."; exit 0; fi; \
	   gh api -X PUT repos/$(OWNER)/$(REPO)/branches/$(BRANCH)/protection \
	     -H "Accept: application/vnd.github+json" \
	     -f required_status_checks.strict=true \
	     -F required_status_checks.contexts[]="$$NODE20_CONTEXT" \
	     -F required_status_checks.contexts[]="$$NETLIFY_NAME" \
	     -f enforce_admins=true \
	     -f required_pull_request_reviews.dismiss_stale_reviews=true \
	     -f required_pull_request_reviews.required_approving_review_count=1 \
	     -f required_linear_history=true \
	     -f restrictions=""; \
	   echo "Branch protection updated ✅"; \
	)

.PHONY: verify-protection
verify-protection:
	gh api repos/$(OWNER)/$(REPO)/branches/$(BRANCH)/protection \
	  --jq '{strict:.required_status_checks.strict,contexts:.required_status_checks.contexts,linear:.required_linear_history.enabled,reviews:.required_pull_request_reviews.required_approving_review_count}'

.PHONY: unrequire
unrequire:
	gh api -X PUT repos/$(OWNER)/$(REPO)/branches/$(BRANCH)/protection \
	  -H "Accept: application/vnd.github+json" \
	  -f required_status_checks.strict=true \
	  -f required_status_checks.contexts[]=\"\" \
	  -f enforce_admins=true \
	  -f required_pull_request_reviews.required_approving_review_count=1 \
	  -f required_linear_history=true \
	  -f restrictions=""
.PHONY: open-netlify
open-netlify:
	@if [ -z "$$NEXT_PUBLIC_SITE_URL" ]; then \
	  echo "Set NEXT_PUBLIC_SITE_URL (e.g., https://adgenxai-2-0.netlify.app)"; exit 1; \
	fi; \
	HOST=$$(printf '%s\n' "$$NEXT_PUBLIC_SITE_URL" | awk -F[/:] '{print $$4}'); \
	case "$$HOST" in *.netlify.app) ;; *) echo "Pass a *.netlify.app URL"; exit 1;; esac; \
	LEFT=$${HOST%%.netlify.app}; \
	SLUG=$${LEFT##*--}; \
	URL="https://app.netlify.com/sites/$$SLUG/deploys"; \
	echo "Opening $$URL"; \
	(open "$$URL" 2>/dev/null || xdg-open "$$URL" 2>/dev/null || wslview "$$URL" 2>/dev/null || cygstart "$$URL" 2>/dev/null || netlify open --admin)

.PHONY: deploy-prod
deploy-prod:
	# Build locally and push to production in one step
	npm run build
	netlify deploy --prod --dir=dist
