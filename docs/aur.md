# AUR Preparation

The repository includes future AUR metadata under `packaging/aur`.

Package name:

```text
codex-ui-linux-port-bin
```

The AUR package is not published yet. Before publication:

1. Review redistribution and trademark implications.
2. Decide whether release assets may be publicly accessible.
3. Update `source` URLs to public release assets if the repository becomes public.
4. Run:

```bash
scripts/update-aur-metadata
```

5. Regenerate `.SRCINFO`.
6. Build locally with:

```bash
makepkg -sf
```

