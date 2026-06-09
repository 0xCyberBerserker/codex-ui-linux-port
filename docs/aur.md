# AUR Preparation

The repository includes future AUR metadata under `packaging/aur`.

Package name:

```text
codex-ui-linux-port-bin
```

The AUR package is not published yet.

Before AUR publication:

1. Review redistribution and trademark implications.
2. Decide whether release assets may be publicly accessible.
3. Confirm release asset URLs and checksums.
4. Review `docs/publication.md`.
5. Run:

```bash
scripts/update-aur-metadata
```

6. Regenerate `.SRCINFO`.
7. Build locally with:

```bash
makepkg -sf
```
