"use server"

import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { postSchema } from "./schema";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

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
    scheduleEnabled: formData.get("scheduleEnabled")?.toString() ?? "false",
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

  const mediaFile = formData.get("media");

  if (!(mediaFile instanceof File) || mediaFile.size === 0) {
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { media: ["Debes subir una imagen para el post."] },
    };
  }

  if (!mediaFile.type.startsWith("image/")) {
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { media: ["El archivo debe ser una imagen."] },
    };
  }

  let mediaPath: string;

  try {
    const bytes = await mediaFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = mediaFile.type.split("/")[1] || "jpg";
    const filename = `post-${session.user.id}-${Date.now()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    mediaPath = `/uploads/${filename}`;
  } catch (error) {
    console.error("Error guardando la imagen:", error);
    return {
      ...initialState,
      id: crypto.randomUUID(),
      success: false,
      errors: { _form: ["No se pudo guardar la imagen. Intenta nuevamente."] },
    };
  }

  const { content, platforms, scheduleEnabled, scheduledDate, scheduledTime } = parsed.data;

  const scheduledFor =
    scheduleEnabled && scheduledDate && scheduledTime
      ? new Date(`${scheduledDate}T${scheduledTime}:00`)
      : null;

  try {
    await prisma.posts.create({
      data: {
        content,
        media: mediaPath,
        platforms,
        status: scheduledFor ? "scheduled" : "draft",
        ScheduledFor: scheduledFor,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Error creando el post:", error);
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
    message: scheduledFor ? "Post programado correctamente." : "Post guardado como borrador.",
  };
}

