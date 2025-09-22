#!/usr/bin/env bash
set -euo pipefail

# Script begins
echo "🛠 Adding release + GHCR workflows…"
mkdir -p .github/workflows

# 1) GitHub Release on tag
cat > .github/workflows/release.yml <<'YAML'
name: Release on tag
on:
  push:
    tags:
      - "v*.*.*"
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: softprops/action-gh-release@v2
        if: startsWith(github.ref, 'refs/tags/')
        with:
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
YAML

# 2) Build & push Docker image to GHCR on tag
cat > .github/workflows/publish-ghcr.yml <<'YAML'
name: Publish Docker image (GHCR) on tag
on:
  push:
    tags:
      - "v*.*.*"
permissions:
  contents: read
  packages: write
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Derive tags/labels from the Git ref (v1.2.3, 1.2, 1, sha)
      - name: Docker meta
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
            type=sha
          labels: |
            org.opencontainers.image.source=${{ github.repositoryUrl }}

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      # Buildx is auto-enabled by docker/build-push-action; set platforms via env if needed
      - name: Build & push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
YAML

git add .github/workflows/release.yml .github/workflows/publish-ghcr.yml
git commit -m "ci(release): add release-on-tag + GHCR publish" || true
git push

# Displaying informational message
echo "🏷️ To trigger both workflows, cut a semver tag:"
echo "    git tag v0.1.0 && git push origin v0.1.0"
echo "✅ Done. On tag push: GitHub Release is created and Docker image publishes to ghcr.io/<owner>/<repo>."