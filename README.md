# Codex UI Linux Port

Private-first automation for rebuilding the macOS Codex UI DMG into lightweight Linux packages.

This repository exists because Codex UI changes frequently and Linux workstation users need a repeatable update path. It stores only scripts, patches, package metadata, and documentation. Upstream Codex binaries are not committed to git.

The repository is currently private while the automation is validated. It is intended to become public later after the publication checklist is complete, redistribution constraints are reviewed, and all maintainer-local assumptions are removed.

## Targets

- Arch/CachyOS: `.pkg.tar.zst`
- Debian/Ubuntu: `.deb`
- Fedora/RHEL-like: `.rpm`
- Future AUR metadata: prepared under `packaging/aur`, not published

## Quick Use

Install or update from the latest GitHub release:

```bash
codexui-update
```

Check without installing:

```bash
codexui-update --check
```

Run a smoke test after install:

```bash
codexui-update --smoke
```

While this repository is private, release access requires one of:

- `gh` authenticated with repository access
- `GITHUB_TOKEN`
- `GH_TOKEN`

## Build From A DMG

GitHub Actions is the authoritative release builder. Scheduled and manual workflow runs always download the current upstream DMG, compare its SHA256 with the existing release manifest, build the Arch/CachyOS, Debian, and RPM packages when needed, validate the full artifact set, run the privacy audit, and publish or refresh a private release.

Local builds are for bootstrap, debugging, and smoke testing only:

```bash
scripts/build-from-dmg --dmg /path/to/Codex.dmg
```

The build script extracts the app, rebuilds Linux native modules, applies local Linux patches, runs validation, and emits package artifacts under `dist/`.

## Privacy Boundary

Before committing or releasing, run:

```bash
scripts/privacy-audit
```

The audit blocks local paths, Codex runtime state, token-like strings, private keys, and known personal/work data patterns.

## Publication Status

Current status:

- Repository visibility: private
- Release visibility: private
- Public release: planned, not ready
- AUR package: prepared, not published

Before making the repository public, complete `docs/publication.md`.

## Disclaimer

This is an unofficial automation wrapper and packaging toolkit. Codex, the Codex UI app, and upstream binaries belong to OpenAI. This repository does not claim endorsement, ownership, or official support.
