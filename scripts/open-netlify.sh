#!/bin/sh
die(){ printf "%s\n" "$1" >&2; exit 1; }

deploy_url="$1"
if [ -z "$deploy_url" ] && command -v netlify >/dev/null 2>&1; then
  echo "Opening linked project admin via Netlify CLI"
  netlify open --admin
  exit $?
fi
[ -z "$deploy_url" ] && die "Usage: $0 <netlify-site-url>"

host="$(printf '%s\n' "$deploy_url" | awk -F[/:] '{print $4}')"
case "$host" in *.netlify.app) ;; *) die "Expected a *.netlify.app URL so I can infer the site slug.";; esac

left="${host%%.netlify.app}"
slug="${left##*--}"
dashboard_url="https://app.netlify.com/sites/$slug/deploys"
echo "Opening $dashboard_url"
open "$dashboard_url" 2>/dev/null \
  || xdg-open "$dashboard_url" 2>/dev/null \
  || wslview "$dashboard_url" 2>/dev/null \
  || cygstart "$dashboard_url" 2>/dev/null \
  || { command -v netlify >/dev/null 2>&1 && netlify open --admin \
       || die "Could not open browser (no 'open', 'xdg-open', 'wslview', or 'cygstart')."; }
