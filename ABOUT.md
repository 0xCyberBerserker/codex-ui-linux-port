# About Codex UI Linux Port

Codex UI Linux Port is an unofficial packaging automation project for Linux systems.

The project exists to make frequent Codex UI updates repeatable on Linux without committing upstream binaries or maintainer-local runtime data to git. It uses GitHub Actions as the release authority, validates generated packages, and keeps publication readiness explicit.

## Scope

The project provides:

- automated source archive resolution from upstream release metadata
- Linux native module rebuilds
- Linux desktop integration patches
- Arch/CachyOS, Debian, and RPM package outputs
- checksum and manifest validation
- a host-aware updater command: `codexui-update`
- future AUR metadata

## Non-Goals

The project does not:

- claim official OpenAI support
- redistribute source ownership
- commit extracted upstream application bundles to git
- store Codex chats, profiles, sessions, runtime state, tokens, or maintainer-local data
- publish AUR packages before redistribution and trademark review

## Publication Model

The repository is currently private. It is designed for later public release after `docs/publication.md` is complete. If public redistribution of release assets is not acceptable, the automation can still be published without public binary assets.
