"use server";

import { z } from "zod";
import { updateUserProfile, updateUserProfileAvatar } from "@/services/profile";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { writeFile, mkdir } from "fs/promises";

import { getLoggedUser } from "@/services/auth";
import { getUserProfile } from "@/services/profile";

import { unlink } from "fs/promises";

import path from "path";


/* Actualizacion de perfil */
const schema = z.object({
    userId: z.string(),
    name: z.string().min(2),
    email: z.email(),
    bio: z.string().trim().optional(),
    occupation: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
});

export async function updateProfile(
    _prevState: ActionResponse,
    formData: FormData,
): Promise<ActionResponse> {
    try {
        const data = schema.parse({
            userId: formData.get("userId"),
            name: formData.get("name"),
            email: formData.get("email"),
            bio: formData.get("bio"),
            occupation: formData.get("occupation"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            city: formData.get("city"),
            country: formData.get("country"),
        });
        await updateUserProfile(data.userId, data);
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Ha ocurrio un error inesperado",
        };
    }

    revalidatePath("profile/edit");

    return {
        id: crypto.randomUUID(),
        success: true,
        message: "Perfil actualizado correctamente.",
    };
}



/* Actualizacion de contraseña */
const passwordSchema = z.object({
    userId: z.string(),
    oldpassword: z.string().min(1, "Debe agregar la contraseña actual"),
    newpassword: z.string().min(6, "La contraseña debe tener minimo 6 caracteres"),
    repeatpassword: z.string().min(1, "Debe agregar repetir contraseña"),
})
.superRefine((data, ctx) => {
    if (data.newpassword !== data.repeatpassword) {
        ctx.addIssue({
            code: "custom",
            message: "Las contraseñas no coinciden",    
        })
    }
});

export async function updatePassword(
    _prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {

    const rawData = Object.fromEntries(formData) as Record<string, string>;
    const validatedFields = passwordSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Por favor corrige los errores del formulario.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try{
        const data = await auth.api.changePassword({
            body: {
                newPassword: validatedFields.data.newpassword,
                currentPassword: validatedFields.data.oldpassword,
                revokeOtherSessions: false,
            },
            // This endpoint requires session cookies.
            headers: await headers(),
        });

        return {
            id: crypto.randomUUID(),
            success: true,
            message: "Contraseña actualizada correctamente.",
        };


    }catch(error: any){
        return {
            success: false,
            message:
                error?.message ||
                "Ocurrió un error inesperado al cambiar la contraseña.",
        };
    }
    
}



/* Actualizacion de avatar */
export async function updateAvatarAction(
    _prevState: ActionResponse, 
    formData: FormData,
):Promise<ActionResponse> {

    const user = await getLoggedUser(); 
    if (!user) {
        return {
            id: crypto.randomUUID(),
            success: false,
            message: "No estás autenticado",
        };
    }

    const userId = user.id;
    const file = formData.get("avatar") as File;

    if (!file) {
        return {
            id: crypto.randomUUID(),
            success: false,
            message: "No se envió ningún archivo",
        };
    }

    try{
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        //Definir la ruta en el sistema de archivos (public/uploads/avatars)
        const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
        await mkdir(uploadDir, { recursive: true });

        // Nombre siempre único -> evita cache por URL repetida
        const fileName = `avatar-${userId}-${Date.now()}.jpg`;
        const filePath = path.join(uploadDir, fileName);

        // Borrar avatar anterior si existe (limpieza)
        const userProfile = await getUserProfile(userId);
        const oldAvatar = userProfile?.profile?.avatar;

        await writeFile(filePath, buffer);

        if (oldAvatar) {
            const oldPath = path.join(process.cwd(), "public", oldAvatar);
            await unlink(oldPath).catch(() => {
                // si no existe o falla el borrado, no rompemos el flujo
            });
        }

        const avatarUrl = `/uploads/avatars/${fileName}`;
        
        await updateUserProfileAvatar(userId, avatarUrl);

        revalidatePath("/profile/edit");

        return {
            id: crypto.randomUUID(),
            success: true,
            message: "Avatar actualizado correctamente."
        };

    }catch(error){
        return {
            id: crypto.randomUUID(),
            success: false,
            message: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
        };
    }
    
}
