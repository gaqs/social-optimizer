import subprocess

def exportar_diff_locales_por_fecha(
    fecha_inicio: str, 
    fecha_fin: str, 
    archivo_salida: str = "cambios_no_committed.txt"
):
    """
    Exporta el git diff de cambios NO confirmados (uncommitted)
    cuyos archivos fueron modificados localmente entre fecha_inicio y fecha_fin (YYYY-MM-DD).
    """
    from datetime import datetime
    from pathlib import Path

    # Convertir strings a objetos datetime
    dt_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    # El final del día abarca hasta las 23:59:59
    dt_fin = datetime.strptime(fecha_fin, "%Y-%m-%d").replace(hour=23, minute=59, second=59)

    try:
        # Obtener la lista de archivos con cambios locales (staged y unstaged)
        status_output = subprocess.check_output(
            ["git", "status", "--porcelain"],
            text=True,
            errors="ignore"
        )

        archivos_en_rango = []

        for line in status_output.splitlines():
            if not line.strip():
                continue
            
            # Obtener la ruta del archivo omitiendo el indicador de estado (2 letras + espacio)
            filepath_str = line[3:].strip().strip('"')
            path = Path(filepath_str)

            # Verificar si el archivo existe actualmente en disco
            if path.exists() and path.is_file():
                # Fecha de modificación en el sistema de archivos local
                mtime = datetime.fromtimestamp(path.stat().st_mtime)

                if dt_inicio <= mtime <= dt_fin:
                    archivos_en_rango.append(filepath_str)

        if not archivos_en_rango:
            print(f"⚠️ No hay archivos modificados en disco entre {fecha_inicio} y {fecha_fin}.")
            return

        print(f"📁 Archivos modificados detectados ({len(archivos_en_rango)}):")
        for f in archivos_en_rango:
            print(f"  - {f}")

        # Ejecutamos git diff HEAD sobre los archivos filtrados
        # "HEAD" incluye tanto cambios en staging (git add) como cambios pendientes
        cmd = ["git", "diff", "HEAD", "--"] + archivos_en_rango
        
        diff_output = subprocess.check_output(cmd, text=True, errors="ignore")

        if not diff_output.strip():
            print("⚠️ Los archivos están modificados pero no presentan diferencias de código.")
            return

        with open(archivo_salida, "w", encoding="utf-8") as f:
            f.write(diff_output)

        print(f"\n✅ Cambios exportados exitosamente a: {archivo_salida}")

    except subprocess.CalledProcessError as e:
        print("❌ Error al consultar Git:", e)
    except Exception as e:
        print("❌ Error inesperado:", e)


if __name__ == "__main__":
    # Modifica estas fechas según lo que necesites (Formato: YYYY-MM-DD)
    FECHA_INICIO = "2026-08-01"
    FECHA_FIN = "2026-08-31"

    exportar_diff_locales_por_fecha(FECHA_INICIO, FECHA_FIN, "cambios_no_confirmados.txt")