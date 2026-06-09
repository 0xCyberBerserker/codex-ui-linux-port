# Codex UI Linux Port

Unofficial Linux packaging automation for Codex UI.

This repository rebuilds the upstream macOS Codex UI release artifact into Linux packages through auditable scripts and GitHub Actions. It is private while the automation and publication boundary are being validated, and it is structured so it can become public later without exposing maintainer-local data.

## What It Builds

- Arch/CachyOS package: `.pkg.tar.zst`
- Debian/Ubuntu package: `.deb`
- Fedora/RHEL-like package: `.rpm`
- Source archive release asset: `Codex-$VERSION.dmg` or `Codex-$VERSION.zip`
- Release manifest and checksums
- Future AUR metadata under `packaging/aur`

## Why It Exists

Codex UI changes frequently. Linux users need a repeatable path that can:

- fetch the current upstream source archive
- rebuild native modules for Linux
- apply Linux desktop patches
- package the app for common Linux families
- verify artifacts before release
- keep private/runtime data out of git

## Operational Rationale

This project was developed as work-adjacent tooling during unavoidable waiting periods such as long builds, dependency installs, and CI feedback loops. The goal is to use that downtime productively: keep the daily Linux workstation stable, reduce repeated manual update work, and improve the reliability of a tool used for day-to-day engineering tasks.

The repository is intentionally auditable, private during validation, and scoped to automation that improves the maintainer's working environment without storing employer data, chats, credentials, or runtime state.

## Install Or Update

```bash
codexui-update
```

Check without installing:

```bash
codexui-update --check
```

Run a smoke test:

```bash
codexui-update --smoke
```

While this repository is private, release access requires `gh auth login`, `GITHUB_TOKEN`, or `GH_TOKEN`.

## Release Pipeline

GitHub Actions is the authoritative builder.

Every scheduled or manual run downloads the current upstream source archive, computes its SHA256, compares it with the existing release manifest, and rebuilds only when needed. If the same version tag already exists but the source archive changed, the release assets are refreshed with `--clobber`.

Required release assets:

- `Codex-$VERSION.dmg` or `Codex-$VERSION.zip`
- `codex-ui-linux-port-$VERSION-1-x86_64.pkg.tar.zst`
- `codex-ui-linux-port_$VERSION_amd64.deb`
- `codex-ui-linux-port-$VERSION-1.x86_64.rpm`
- `manifest.json`
- `checksums.txt`

Local builds are supported for bootstrap and debugging:

```bash
scripts/build-from-dmg --source /path/to/Codex.dmg
```

## Repository Boundary

Committed files must be limited to automation, patches, package metadata, and documentation. Upstream binaries, extracted app bundles, Codex chats, Codex profiles, runtime databases, local paths, tokens, and private keys must not be committed.

Before every commit and release:

```bash
scripts/privacy-audit
```

## Publication Status

Current state:

- Repository visibility: private
- Release visibility: private
- Public release: planned, not ready
- AUR package: prepared, not published

Before changing visibility, complete [docs/publication.md](docs/publication.md).

## Documentation

- [Usage](docs/usage.md)
- [Packaging](docs/packaging.md)
- [Security And Privacy](docs/security.md)
- [AUR Preparation](docs/aur.md)
- [Publication Checklist](docs/publication.md)
- [Disclaimer](DISCLAIMER.md)

## Disclaimer

This is an unofficial automation wrapper and packaging toolkit. Codex, Codex UI, OpenAI trademarks, upstream binaries, release metadata, and application assets belong to OpenAI or their respective owners. This repository is not affiliated with, endorsed by, or supported by OpenAI.
