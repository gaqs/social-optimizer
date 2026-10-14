import subprocess
from datetime import datetime
from pathlib import Path


def _git(args, cwd, check=True):
    return subprocess.run(
        ["git", *args],
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=check,
    )


def exportar_diff_locales_por_fecha(
    fecha_inicio: str,
    fecha_fin: str,
    archivo_salida: str = "cambios_no_committed.txt",
    incluir_nuevos: bool = True,
):
    """
    Exporta el git diff de cambios NO confirmados (staged + unstaged, y
    opcionalmente archivos nuevos) cuyos archivos fueron modificados en disco
    entre fecha_inicio y fecha_fin (YYYY-MM-DD).
    """
    dt_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    dt_fin = datetime.strptime(fecha_fin, "%Y-%m-%d").replace(hour=23, minute=59, second=59)

    try:
        # Raíz del repo: las rutas de git status son relativas a ella
        raiz = Path(_git(["rev-parse", "--show-toplevel"], cwd=None).stdout.strip())

        # -z: separa por NUL, sin comillas ni escapes; -uall: lista archivos nuevos individuales
        status = _git(["status", "--porcelain", "-z", "-uall"], cwd=raiz).stdout
        entradas = status.split("\0")

        tracked, nuevos = [], []
        i = 0
        while i < len(entradas):
            entrada = entradas[i]
            i += 1
            if len(entrada) < 4:
                continue

            estado, ruta = entrada[:2], entrada[3:]

            # En renombrados/copias, la siguiente entrada es la ruta original
            if "R" in estado or "C" in estado:
                i += 1

            if "D" in estado:
                continue  # eliminados: no existen en disco, no tienen fecha de modificación

            path = raiz / ruta
            if not path.is_file():
                continue

            mtime = datetime.fromtimestamp(path.stat().st_mtime)
            if not (dt_inicio <= mtime <= dt_fin):
                continue

            if estado == "??":
                nuevos.append(ruta)
            else:
                tracked.append(ruta)

        if not tracked and not (incluir_nuevos and nuevos):
            print(f"⚠️ No hay archivos modificados en disco entre {fecha_inicio} y {fecha_fin}.")
            return

        print(f"📁 Modificados ({len(tracked)}):")
        for f in tracked:
            print(f"  - {f}")
        if incluir_nuevos:
            print(f"🆕 Nuevos ({len(nuevos)}):")
            for f in nuevos:
                print(f"  - {f}")

        partes = []

        if tracked:
            # Si no hay commits aún, HEAD no existe: usar el árbol vacío
            hay_head = _git(["rev-parse", "--verify", "HEAD"], cwd=raiz, check=False).returncode == 0
            base = "HEAD" if hay_head else "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
            partes.append(_git(["diff", base, "--", *tracked], cwd=raiz).stdout)

        if incluir_nuevos:
            for f in nuevos:
                # --no-index devuelve código 1 cuando hay diferencias, es normal
                r = _git(["diff", "--no-index", "--", "/dev/null", f], cwd=raiz, check=False)
                partes.append(r.stdout)

        diff_output = "\n".join(p for p in partes if p.strip())

        if not diff_output.strip():
            print("⚠️ Los archivos tienen fecha en el rango pero no presentan diferencias.")
            return

        Path(archivo_salida).write_text(diff_output, encoding="utf-8")
        print(f"\n✅ Cambios exportados a: {archivo_salida}")

    except subprocess.CalledProcessError as e:
        print("❌ Error al consultar Git:", e.stderr or e)
    except Exception as e:
        print("❌ Error inesperado:", e)


if __name__ == "__main__":
    FECHA_INICIO = "2026-09-01"
    FECHA_FIN = "2026-09-28"

    exportar_diff_locales_por_fecha(FECHA_INICIO, FECHA_FIN, "cambios_no_confirmados.txt")