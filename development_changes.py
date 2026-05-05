import subprocess

def exportar_log(desde="2026-01-01", archivo_salida="cambios.txt"):
    """
    Exporta el git log con parches (-p) desde una fecha dada a un archivo de texto.
    """
    try:
        log = subprocess.check_output(
            ["git", "show"],
            text=True,
            errors="ignore"
        )

        with open(archivo_salida, "w", encoding="utf-8") as f:
            f.write(log)

        print(f"✅ Log exportado a {archivo_salida}")

    except subprocess.CalledProcessError as e:
        print("❌ Error al ejecutar git:", e)

if __name__ == "__main__":
    exportar_log("2025-01-01", "cambios.txt")

