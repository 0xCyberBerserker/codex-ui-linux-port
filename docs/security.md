# Security And Privacy

This repository must not contain:

- Local usernames or absolute home paths
- Work or company data
- Codex chats, profiles, sessions, or runtime databases
- Tokens, private keys, SSH material, or GitHub credentials
- Extracted upstream app bundles or dependency trees

Run before every commit and release:

```bash
scripts/privacy-audit
```

Release binaries should be attached as GitHub release assets, not committed to git.

## Public Release Boundary

This repository is currently private. Before changing repository or release visibility, complete `docs/publication.md` and rerun:

```bash
scripts/privacy-audit
```

Do not publish maintainer-local paths, Codex runtime state, chat data, employer context, tokens, credentials, or extracted app trees.
