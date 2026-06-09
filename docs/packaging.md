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

GitHub Actions is the authoritative builder for release artifacts. A release run must generate and validate:

- `codex-ui-linux-port-$VERSION-1-x86_64.pkg.tar.zst`
- `codex-ui-linux-port_$VERSION_amd64.deb`
- `codex-ui-linux-port-$VERSION-1.x86_64.rpm`
- `manifest.json`
- `checksums.txt`

The workflow fails before release creation if any required package is missing, empty, has an unexpected name, or fails checksum validation.

Local package builds remain supported for bootstrap, debugging, and smoke testing. They are not the source of truth for future releases.
