import { z } from "zod";

export const postSchema = z.object({
    content: z
        .string()
        .min(1, "El contenido no puede estar vacío")
        .max(2200, "El contenido es demasiado largo"),
    platforms: z
        .array(z.enum(["X", "Facebook", "Instagram", "Tiktok"]))
        .min(1, "Selecciona al menos una red social"),
    mode: z.enum(["now", "schedule"]),
    scheduledDate: z.string().optional(),
    scheduledTime: z.string().optional(),
})
.superRefine((data, ctx) => {
    if (data.mode === "schedule") {
        if (!data.scheduledDate) {
            ctx.addIssue({ code: "custom", message: "Selecciona una fecha", path: ["scheduledDate"] });
        }
        if (!data.scheduledTime) {
            ctx.addIssue({ code: "custom", message: "Selecciona una hora", path: ["scheduledTime"] });
        }
    }
});