# Packaging

The package layout is intentionally small and does not bundle a full Electron runtime.

Installed paths:

- `/opt/codex-ui-linux-port`
- `/usr/bin/codex-ui-linux`
- `/usr/bin/codexui-update`
- `/usr/share/applications/codex-ui-linux.desktop`
- `/usr/share/icons/hicolor/scalable/apps/codex-ui-linux.svg`

Runtime dependencies:

- Electron 42 (`electron42`)
- Node.js
- curl
- jq
- desktop-file-utils

The Arch/CachyOS package is the primary supported target. Debian and Fedora packages are experimental: they are generated for portability testing, but the host must provide a compatible Electron 42 runtime.

Generated packages use `Custom` license metadata because they aggregate repository-authored material and upstream components governed by separate terms. Project license files are installed under `/usr/share/licenses/codex-ui-linux-port`.

## Release Build Authority

GitHub Actions is the authoritative builder for release artifacts. Generated releases are public GitHub release assets and must remain clearly marked as unofficial.

A release run must generate and validate:

- `Codex-$VERSION.dmg`
- `codex-ui-linux-port-$VERSION-1-x86_64.pkg.tar.zst`
- `codex-ui-linux-port_$VERSION_amd64.deb`
- `codex-ui-linux-port-$VERSION-1.x86_64.rpm`
- `manifest.json`
- `checksums.txt`

The workflow reads the latest version from the official appcast and downloads the official stable `Codex.dmg` URL on every run. It validates the DMG's internal application version before packaging. If a release for the same version exists, the workflow compares the downloaded DMG SHA256 with `manifest.json`, downloads every asset listed in `checksums.txt`, and verifies every hash. Matching source and artifact hashes mean the release is current and the build is skipped. Any mismatch rebuilds the packages and refreshes release assets with `--clobber`.

`manifest.json` records the upstream source URL, source archive filename, SHA256, package version, and UTC generation timestamp.

The workflow fails before release creation or refresh if any required package is missing, empty, has an unexpected name, has a stale source archive hash, or fails checksum validation.

Local package builds remain supported for bootstrap, debugging, and smoke testing. They are not the source of truth for future releases.
