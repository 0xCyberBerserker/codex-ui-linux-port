# User Manual

## English

Codex UI Linux Port provides an unofficial Linux packaging and update path for Codex UI.

## Install Or Update

```bash
codexui-update
```

## Check Latest Available Version

```bash
codexui-update --check
```

## Smoke Test

```bash
codexui-update --smoke
```

The smoke test launches Codex UI with a temporary profile and checks for a startup marker.

## Supported Systems

- Arch/CachyOS through `pacman`
- Debian/Ubuntu through `apt-get` experimental packages
- Fedora/RHEL-like systems through `dnf` experimental packages

## Security Notes

- Public release downloads do not require authentication.
- Private forks or rate-limited environments can use `GITHUB_TOKEN` or `GH_TOKEN`.
- Do not store chats, credentials, profiles, runtime databases, or local project material in this repository.

See `docs/usage.md` for detailed usage.

---

# Manual de usuario

## Español

Codex UI Linux Port proporciona una vía no oficial para empaquetar y actualizar Codex UI en Linux.

## Instalar o actualizar

```bash
codexui-update
```

## Comprobar última versión disponible

```bash
codexui-update --check
```

## Smoke test

```bash
codexui-update --smoke
```

El smoke test lanza Codex UI con un perfil temporal y comprueba una marca de arranque correcto.

## Sistemas soportados

- Arch/CachyOS mediante `pacman`
- Debian/Ubuntu mediante paquetes experimentales con `apt-get`
- Sistemas tipo Fedora/RHEL mediante paquetes experimentales con `dnf`

## Notas de seguridad

- Las descargas públicas de release no requieren autenticación.
- Forks privados o entornos con rate limit pueden usar `GITHUB_TOKEN` o `GH_TOKEN`.
- No guardes chats, credenciales, perfiles, bases runtime ni material local de proyectos en este repositorio.

Consulta `docs/usage.md` para uso detallado.
