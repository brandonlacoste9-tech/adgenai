# Release Flow

## ✅ What’s already wired

- **Two workflows**:
  - **Release** → gated by `release` environment.
  - **Publish Docker → GHCR** → gated by `registry` environment.
- Both triggered by `v*.*.*` tags.
- **Concurrency key**: `${{ github.workflow }}-${{ github.ref }}`.
- Environments (`release`, `registry`) created via `gh` CLI.
- Workflows committed under `.github/workflows/release.yml` and `.github/workflows/publish-ghcr.yml`.

---

## 🛠 Operator Orders

- **R1 (Release)**: Approve `release` env → unlock secrets → confirm `gh release view vX.Y.Z` shows notes.
- **R2 (Registry)**: Approve `registry` env → confirm buildx multi-arch push → verify provenance digest → inspect manifest.

---

## 🚦 Trigger

One liner to light both gates:

```bash
git tag v0.1.0 && git push origin v0.1.0
```

---

## 📋 Sanity Proofs

- **Release object**:

  ```bash
  gh release view v0.1.0
  ```
- **Docker manifest**:

  ```bash
  OWNER_REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
  docker buildx imagetools inspect ghcr.io/${OWNER_REPO}:v0.1.0
  ```

---

## ⚠️ Watchouts

- **`permission_denied: write_package`** → ensure `packages: write`.
- **Duplicate runs** → check concurrency `cancel-in-progress`.
- **Missing provenance** → attestation must use build digest, no tag.