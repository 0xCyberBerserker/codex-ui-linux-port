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
