# Codex UI Linux Port

Private automation for rebuilding the macOS Codex UI DMG into lightweight Linux packages.

This repository exists because Codex UI changes frequently and the Linux workstation workflow needs a repeatable update path. It stores only scripts, patches, package metadata, and documentation. Upstream Codex binaries are not committed to git.

## Targets

- Arch/CachyOS: `.pkg.tar.zst`
- Debian/Ubuntu: `.deb`
- Fedora/RHEL-like: `.rpm`
- Future AUR metadata: prepared under `packaging/aur`, not published

## Quick Use

Install or update from the latest private GitHub release:

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

Private release access requires one of:

- `gh` authenticated with repository access
- `GITHUB_TOKEN`
- `GH_TOKEN`

## Build From A DMG

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

## Disclaimer

This is an unofficial private automation wrapper and packaging toolkit. Codex, the Codex UI app, and upstream binaries belong to OpenAI. This repository does not claim endorsement, ownership, or official support.

