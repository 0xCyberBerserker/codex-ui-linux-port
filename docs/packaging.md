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

The Arch/CachyOS package is the primary target. Debian and Fedora packages are generated for future portability, but the host must provide a compatible Electron 42 runtime.

## Release Build Authority

GitHub Actions is the authoritative builder for release artifacts. Generated releases are public GitHub release assets and must remain clearly marked as unofficial.

A release run must generate and validate:

- `Codex-$VERSION.dmg` or `Codex-$VERSION.zip`
- `codex-ui-linux-port-$VERSION-1-x86_64.pkg.tar.zst`
- `codex-ui-linux-port_$VERSION_amd64.deb`
- `codex-ui-linux-port-$VERSION-1.x86_64.rpm`
- `manifest.json`
- `checksums.txt`

The workflow downloads the upstream source archive on every run. If a release for the same version already exists, the workflow compares the downloaded archive SHA256 with `manifest.json`. Matching SHA256 means the release is current and the build is skipped. A changed SHA256 rebuilds the packages and refreshes release assets with `--clobber`.

The workflow fails before release creation or refresh if any required package is missing, empty, has an unexpected name, has a stale source archive hash, or fails checksum validation.

Local package builds remain supported for bootstrap, debugging, and smoke testing. They are not the source of truth for future releases.
