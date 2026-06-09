# Patch Set

The build scripts apply these patch classes during package generation:

- `better-sqlite3` Electron 42/V8 compatibility fixes before native rebuild.
- Linux launcher wrapper with stable Electron flags.
- Linux visual shell override for the rehosted desktop UI.
- Electron native menu suppression.
- Spanish locale defaults for the Linux launcher.

Patch logic lives in `scripts/patch-native-modules` and `scripts/apply-linux-patches` so it can be replayed for each upstream DMG update.

