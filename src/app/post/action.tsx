"use server"

import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { postSchema } from "./schema";
import { MEDIA_RULES, mediaKind, parsePostMedia } from "@/lib/media";
import type { MediaLibraryItem } from "./mediaLibrary";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

const MEDIA_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

const mediaError = (message: string): ActionResponse => ({
  ...initialState,
  id: crypto.randomUUID(),
  success: false,
  errors: { media: [message] },
});

// Biblioteca de medios: todas las imágenes/videos que el usuario ya subió en sus posts.
export async function getMediaLibrary(): Promise<MediaLibraryItem[]> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return [];

  const posts = await prisma.posts.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const byPath = new Map<string, MediaLibraryItem>();

  for (const post of posts) {
    for (const path of parsePostMedia(post.media)) {
      const found = byPath.get(path);

      if (found) {
        post.platforms.forEach((p) => {
          if (!found.platforms.includes(p)) found.platforms.push(p);
        });
        if (post.createdAt < new Date(found.createdAt)) {
          found.createdAt = post.createdAt.toISOString();
        }
      } else {
        byPath.set(path, {
          path,
          kind: /\.(mp4|webm|mov)$/i.test(path) ? "video" : "image",
          createdAt: post.createdAt.toISOString(),
          platforms: [...post.platforms],
          postContent: post.content.slice(0, 100),
        });
      }
    }
  }

  return [...byPath.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createPost(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { _form: ["Debes iniciar sesión para publicar."] },
    };
  }

  const raw = {
    content: formData.get("content")?.toString() ?? "",
    platforms: formData.getAll("platforms").map((p) => p.toString()),
    mode: formData.get("mode")?.toString() ?? "now",
    scheduledDate: formData.get("scheduledDate")?.toString() || undefined,
    scheduledTime: formData.get("scheduledTime")?.toString() || undefined,
  };

  const parsed = postSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Al republicar, `id` referencia el post a actualizar (verificando que sea del usuario).
  const id = formData.get("id")?.toString() || undefined;
  const existing = id
    ? await prisma.posts.findFirst({ where: { id, userId: session.user.id } })
    : null;

  if (id && !existing) {
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { _form: ["No se encontró la publicación a editar."] },
    };
  }

  // Media guardado que el usuario conserva (solo rutas que ya pertenecen al post).
  const keepMedia = formData.getAll("keepMedia").map((p) => p.toString());
  const keptExisting = existing
    ? parsePostMedia(existing.media).filter((p) => keepMedia.includes(p))
    : [];

  // Medios elegidos desde la biblioteca: solo se aceptan rutas que el usuario ya subió.
  const libraryRaw = formData.getAll("libraryMedia").map((p) => p.toString());
  let libraryPaths: string[] = [];
  if (libraryRaw.length > 0) {
    const owned = new Set<string>();
    const userPosts = await prisma.posts.findMany({
      where: { userId: session.user.id },
      select: { media: true },
    });
    userPosts.forEach((post) =>
      parsePostMedia(post.media).forEach((m) => owned.add(m)),
    );
    libraryPaths = [...new Set(libraryRaw.filter((p) => owned.has(p)))];
  }

  const mediaFiles = formData
    .getAll("media")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (mediaFiles.length === 0 && keptExisting.length === 0 && libraryPaths.length === 0) {
    return mediaError("Debes subir al menos una imagen o video para el post.");
  }

  if (mediaFiles.length > MEDIA_RULES.maxFiles) {
    return mediaError(`Solo puedes subir hasta ${MEDIA_RULES.maxFiles} archivos por publicación.`);
  }

  // shortcut: duración/dimensiones solo se validan en el cliente (acá no hay parser de medios)
  for (const file of mediaFiles) {
    const kind = mediaKind(file.type);
    if (!kind || !MEDIA_RULES.allowedMimeTypes.includes(file.type)) {
      return mediaError(`Formato no permitido: ${file.type || "desconocido"}.`);
    }
    const maxSizeMB = kind === "video" ? MEDIA_RULES.maxVideoSizeMB : MEDIA_RULES.maxImageSizeMB;
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      return mediaError(
        `${kind === "video" ? "El video" : "La imagen"} "${file.name}" supera el máximo de ${maxSizeMB}MB.`
      );
    }
  }

  const mediaPaths: string[] = [];

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    for (const [index, file] of mediaFiles.entries()) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const extension = MEDIA_EXTENSIONS[file.type] ?? "bin";
      const filename = `post-${session.user.id}-${Date.now()}-${index}.${extension}`;
      await writeFile(path.join(uploadDir, filename), buffer);
      mediaPaths.push(`/uploads/${filename}`);
    }
  } catch (error) {
    console.error("Error guardando los archivos del post:", error);
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { _form: ["No se pudieron guardar los archivos. Intenta nuevamente."] },
    };
  }

  const { content, platforms, mode, scheduledDate, scheduledTime } = parsed.data;

  // El schema ya garantiza fecha y hora cuando mode === "schedule"
const isScheduled = mode === "schedule";
const scheduledFor = isScheduled
    ? new Date(`${scheduledDate}T${scheduledTime}:00`)
    : new Date();

  // El media final combina lo conservado, la biblioteca y lo recién subido.
  const finalMedia = [...new Set([...keptExisting, ...libraryPaths, ...mediaPaths])];

  try {
    if (existing) {
      await prisma.posts.update({
        where: { id: existing.id },
        data: {
          content,
          media: JSON.stringify(finalMedia),
          platforms,
          status: isScheduled ? "scheduled" : "published",
          ScheduledFor: scheduledFor,
        },
      });
    } else {
      await prisma.posts.create({
        data: {
          content,
          media: JSON.stringify(finalMedia),
          platforms,
          status: isScheduled ? "scheduled" : "published",
          ScheduledFor: scheduledFor,
          userId: session.user.id,
        },
      });
    }
  } catch (error) {
    console.error("Error guardando el post:", error);
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { _form: ["No se pudo guardar el post. Intenta nuevamente."] },
    };
  }

  return {
    ...initialState,
    id: crypto.randomUUID(),
    success: true,
    message: existing
      ? "Publicación actualizada y republicada correctamente."
      : isScheduled
        ? "Post programado correctamente."
        : "Publicación enviada correctamente.",
  };
}

