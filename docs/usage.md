# Usage

## Update

```bash
codexui-update
```

The updater detects the host OS, downloads the latest compatible package from the GitHub release, verifies checksums, installs the package, and checks the installed command.

## Supported Systems

- CachyOS and Arch-like systems using `pacman`
- Debian and Ubuntu-like systems using `apt-get` (experimental)
- Fedora and RHEL-like systems using `dnf` (experimental)

## Authentication

Public releases do not require authentication.

Private forks or rate-limited environments can authenticate with `GITHUB_TOKEN` or `GH_TOKEN`. Public GitHub releases use the unauthenticated Releases API and do not require GitHub CLI.

## Smoke Test

```bash
codexui-update --smoke
```

The smoke test launches Codex UI with a temporary profile and checks for a successful startup log.

## Runtime Overrides

The launcher follows the host locale and Electron's native display backend selection. Optional overrides:

```bash
CODEXUI_LANG=es-ES codex-ui-linux
CODEXUI_OZONE_PLATFORM=x11 codex-ui-linux
CODEXUI_ELECTRON_FLAGS="--disable-vulkan --force-device-scale-factor=1" codex-ui-linux
```

No language, X11 backend, Vulkan mode, or scale factor is forced by default.
