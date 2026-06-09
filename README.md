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
  <a href="https://github.com/0xCyberBerserker/codex-ui-linux-port/actions/workflows/release.yml"><img alt="Release workflow" src="https://img.shields.io/github/actions/workflow/status/0xCyberBerserker/codex-ui-linux-port/release.yml?branch=main&label=release%20build"></a>
  <a href="https://github.com/0xCyberBerserker/codex-ui-linux-port/releases"><img alt="Latest release" src="https://img.shields.io/github/v/release/0xCyberBerserker/codex-ui-linux-port?label=latest%20release"></a>
  <img alt="Targets" src="https://img.shields.io/badge/targets-Arch%20%7C%20Debian%20%7C%20RPM-ffb454">
  <img alt="Status" src="https://img.shields.io/badge/status-public%20automation-8fd18f">
  <img alt="Unofficial" src="https://img.shields.io/badge/OpenAI-unofficial-lightgrey">
</p>

<p align="center">
  <sub>Made with 🖤 in Barcelona City 🇪🇸</sub>
</p>

This repository rebuilds upstream Codex UI release artifacts into Linux packages through auditable scripts and GitHub Actions.

## Project Signal

| Area | Current signal |
| --- | --- |
| Release builder | GitHub Actions is authoritative |
| Source tracking | Upstream appcast, current source archive, SHA256 manifest |
| Linux targets | Arch/CachyOS, Debian/Ubuntu, Fedora/RHEL-like |
| Public status | Public automation repository |
| Data boundary | No chats, credentials, runtime state, private data, or local paths |
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
- keep private runtime data out of git

## Operational Rationale

This project covers a practical need that emerged from daily engineering work: Codex UI is part of the maintainer's regular Linux workstation workflow, and frequent upstream updates made manual repackaging wasteful and error-prone.

The automation was built to turn unavoidable waiting periods such as long builds, dependency installs, and CI feedback loops into useful maintenance time. The goal is straightforward: keep the workstation reliable, reduce repeated manual update work, and improve day-to-day engineering throughput without storing private runtime data, credentials, chats, or local project material.

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

Public release downloads do not require authentication. Private forks can use `gh auth login`, `GITHUB_TOKEN`, or `GH_TOKEN`.

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

## Public Status

- Repository visibility: public
- Release visibility: public
- AUR package: prepared, not published

Publication and redistribution notes live in [docs/publication.md](docs/publication.md).

## Documentation

- [Usage](docs/usage.md)
- [Packaging](docs/packaging.md)
- [Security And Privacy](docs/security.md)
- [AUR Preparation](docs/aur.md)
- [Publication Checklist](docs/publication.md)
- [Disclaimer](DISCLAIMER.md)

## Disclaimer

This is an unofficial automation wrapper and packaging toolkit. Codex, Codex UI, OpenAI trademarks, upstream binaries, release metadata, and application assets belong to OpenAI or their respective owners. This repository is not affiliated with, endorsed by, or supported by OpenAI.
