# Usage

## Update

```bash
codexui-update
```

The updater detects the host OS, downloads the latest compatible package from the GitHub release, verifies checksums, installs the package, and checks the installed command.

## Supported Systems

- CachyOS and Arch-like systems using `pacman`
- Debian and Ubuntu-like systems using `apt-get`
- Fedora and RHEL-like systems using `dnf`

## Authentication

While this repository is private, release access requires GitHub authentication.

Recommended:

```bash
gh auth login
```

Alternative:

```bash
export GITHUB_TOKEN=...
```

## Smoke Test

```bash
codexui-update --smoke
```

The smoke test launches Codex UI with a temporary profile and checks for a successful startup log.
