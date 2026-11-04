// Reglas de validación de multimedia para los posts.
export type MediaType = "image" | "video" | "gif";

export interface MediaRules {
  allowedTypes: MediaType[];
  allowedMimeTypes: string[];
  maxFiles: number;
  maxImageSizeMB?: number;
  maxVideoSizeMB?: number;
  minVideoDurationSeconds?: number;
  maxVideoDurationSeconds?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  minAspectRatio?: number;
  maxAspectRatio?: number;
  minFps?: number;
  maxFps?: number;
}

// Regla global (no por red social): subir una regla por plataforma si se necesita.
export const MEDIA_RULES: MediaRules = {
  allowedTypes: ["image", "gif", "video"],
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ],
  maxFiles: 10,
  maxImageSizeMB: 10,
  maxVideoSizeMB: 100,
  minVideoDurationSeconds: 3,
  maxVideoDurationSeconds: 90,
  minWidth: 480,
  minHeight: 480,
  maxWidth: 8000,
  maxHeight: 8000,
  minAspectRatio: 9 / 16,
  maxAspectRatio: 16 / 9,
  // shortcut: minFps/maxFps no se validan (requiere decodificar frames), usar un parser de medios si se necesita
};

export function mediaKind(mime: string): MediaType | null {
  if (mime === "image/gif") return "gif";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return null;
}

interface MediaMeta {
  width: number;
  height: number;
  duration?: number;
}

function readImageMeta(file: File): Promise<MediaMeta> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}

function readVideoMeta(file: File): Promise<MediaMeta> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      // Algunos webm reportan Infinity hasta decodificar: se omite la duración
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: Number.isFinite(video.duration) ? video.duration : undefined,
      });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer el video"));
    };
    video.src = url;
  });
}

function mb(size: number): number {
  return size / (1024 * 1024);
}

/** Devuelve un mensaje de error en español o null si el archivo es válido. */
export async function validateMediaFile(
  file: File,
  rules: MediaRules,
  currentCount: number
): Promise<string | null> {
  const kind = mediaKind(file.type);
  if (!kind) return `Tipo de archivo no soportado: ${file.type || "desconocido"}.`;
  if (!rules.allowedTypes.includes(kind)) return `No se permiten archivos tipo "${kind}".`;
  if (!rules.allowedMimeTypes.includes(file.type)) return `Formato no permitido: ${file.type}.`;

  if (currentCount >= rules.maxFiles) {
    return `Solo puedes subir hasta ${rules.maxFiles} archivos por publicación.`;
  }

  const label = kind === "video" ? "El video" : "La imagen";
  const maxSizeMB = kind === "video" ? rules.maxVideoSizeMB : rules.maxImageSizeMB;
  if (maxSizeMB && mb(file.size) > maxSizeMB) {
    return `${label} supera el máximo de ${maxSizeMB}MB (pesa ${mb(file.size).toFixed(1)}MB).`;
  }

  const meta = await (kind === "video" ? readVideoMeta(file) : readImageMeta(file)).catch(
    () => null
  );
  if (!meta) return `No se pudo leer ${kind === "video" ? "el video" : "la imagen"}.`;

  const { width, height, duration } = meta;
  if (width && height) {
    if (rules.minWidth && width < rules.minWidth)
      return `${label} es muy pequeña: ${width}px de ancho (mínimo ${rules.minWidth}px).`;
    if (rules.maxWidth && width > rules.maxWidth)
      return `${label} es muy ancha: ${width}px (máximo ${rules.maxWidth}px).`;
    if (rules.minHeight && height < rules.minHeight)
      return `${label} es muy baja: ${height}px de alto (mínimo ${rules.minHeight}px).`;
    if (rules.maxHeight && height > rules.maxHeight)
      return `${label} es muy alta: ${height}px (máximo ${rules.maxHeight}px).`;

    // El ratio solo aplica a video: las imágenes se recortan en el editor
    if (kind === "video") {
      const ratio = width / height;
      if (rules.minAspectRatio && ratio < rules.minAspectRatio)
        return `${label} no cumple la relación de aspecto mínima (${rules.minAspectRatio.toFixed(2)}).`;
      if (rules.maxAspectRatio && ratio > rules.maxAspectRatio)
        return `${label} supera la relación de aspecto máxima (${rules.maxAspectRatio.toFixed(2)}).`;
    }
  }

  if (kind === "video" && duration !== undefined) {
    if (rules.minVideoDurationSeconds && duration < rules.minVideoDurationSeconds)
      return `El video dura ${duration.toFixed(1)}s (mínimo ${rules.minVideoDurationSeconds}s).`;
    if (rules.maxVideoDurationSeconds && duration > rules.maxVideoDurationSeconds)
      return `El video dura ${duration.toFixed(1)}s (máximo ${rules.maxVideoDurationSeconds}s).`;
  }

  return null;
}

/**
 * El campo `media` guarda un JSON array de rutas; los posts antiguos tienen
 * una sola ruta sin JSON, así que se soportan ambos formatos.
 */
export function parsePostMedia(media: string): string[] {
  if (!media) return [];
  try {
    const parsed: unknown = JSON.parse(media);
    if (Array.isArray(parsed)) return parsed.filter((m): m is string => typeof m === "string");
  } catch {
    // formato anterior: una sola ruta
  }
  return [media];
}

/** Primera imagen (o gif) de un post, para mostrar en el calendario; los videos se omiten. */
export function firstImageMedia(media: string): string | null {
  return parsePostMedia(media).find((m) => !/\.(mp4|webm|mov)$/i.test(m)) ?? null;
}
