# README Badge Rollback Workflow

This checklist helps you use the dynamic toggle-rollback script (`toggle-rollback.sh`) to remove the Shields.io CI badge or both CI + pre-commit.ci badges from the top of your `README.md` — while keeping the Developer Docs block intact.

---

## 🚨 Rollback Options

- **Remove only the CI badge:**
  ```bash
  ./toggle-rollback.sh --ci-only
  ```
  _Leaves the pre-commit.ci badge and Developer Docs block._

- **Remove both CI + pre-commit.ci badges:**
  ```bash
  ./toggle-rollback.sh --both
  ```
  _Leaves only the Developer Docs block._

---

## ✅ Steps

1. **Run the Script:**  
   Choose your rollback mode and run the command above in your repo root.

2. **Verify:**
   - The selected badge(s) are gone from the top of `README.md`.
   - The Developer Docs block is untouched.

3. **Review Commit & PR:**
   - The script auto-creates a commit and pushes a branch.
   - If you have the GitHub CLI (`gh`), a PR will open automatically with a clear title/body.
   - Otherwise, open a PR manually from the new branch.

---

## ♻️ Safe & Idempotent

- Script can be run multiple times; it won’t break if badges are already removed.
- No manual editing required.
- Dirty branches are guarded against accidental changes.

---

## 🛠️ Troubleshooting

- Run from your repo root.
- Requires `git` and push access.
- `gh` CLI required for automatic PR opening (optional).
- If you get a "Dirty branch detected" message, commit/stash changes before running.

---

_Last updated: 2025-09-27_