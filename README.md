<p align="center">
  <img src="docs/assets/codex-ui-linux-port.svg" alt="Codex UI Linux Port icon" width="132">
</p>

<p align="center">
  <strong>Codex UI Linux Port</strong>
</p>

<p align="center">
  Unofficial Linux packaging automation for Codex UI.
</p>

<p align="center">
  <a href="https://github.com/0xCyberBerserker/codex-ui-linux-port/actions/workflows/release.yml"><img alt="Release workflow" src="https://img.shields.io/badge/release%20build-passing-8fd18f"></a>
  <a href="https://github.com/0xCyberBerserker/codex-ui-linux-port/releases/tag/v26.602.71036"><img alt="Latest release" src="https://img.shields.io/badge/latest%20release-v26.602.71036-ffb454"></a>
  <img alt="Targets" src="https://img.shields.io/badge/targets-Arch%20%7C%20Debian%20%7C%20RPM-ffb454">
  <img alt="Status" src="https://img.shields.io/badge/status-private%20validation-8fd18f">
  <img alt="Unofficial" src="https://img.shields.io/badge/OpenAI-unofficial-lightgrey">
</p>

<p align="center">
  <sub>Made with 🖤 in Barcelona City 🇪🇸</sub>
</p>

This repository rebuilds the upstream macOS Codex UI release artifact into Linux packages through auditable scripts and GitHub Actions. It is private while the automation and publication boundary are being validated, and it is structured so it can become public later without exposing maintainer-local data.

## Project Signal

| Area | Current signal |
| --- | --- |
| Release builder | GitHub Actions is authoritative; badge is static while repository is private |
| Source tracking | Upstream appcast, current source archive, SHA256 manifest |
| Linux targets | Arch/CachyOS, Debian/Ubuntu, Fedora/RHEL-like |
| Public status | Private validation now, public-ready structure later |
| Data boundary | No chats, credentials, runtime state, employer data, or local paths |
| AUR status | Metadata prepared, not published |

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
