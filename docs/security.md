# Security And Privacy

This repository must not contain:

- Local usernames or absolute home paths
- Codex chats, profiles, sessions, or runtime databases
- Tokens, private keys, SSH material, or GitHub credentials
- Extracted upstream app bundles or dependency trees

Run before every commit and release:

```bash
scripts/privacy-audit
```

Release binaries should be attached as GitHub release assets, not committed to git.

## Release Boundary

Before publishing releases or changing release policy, review `docs/publication.md` and rerun:

```bash
scripts/privacy-audit
```

Do not publish local paths, Codex runtime state, chat data, tokens, credentials, or extracted app trees.
