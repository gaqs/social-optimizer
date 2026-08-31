"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkEmailExists } from "@services/register";
import { redirect } from "next/navigation";

const registerSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string()
        .min(1, "El correo electrónico es requerido")
        .email("Correo electrónico no válido")
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres")
        .max(32, "La contraseña no puede exceder los 32 caracteres"),
});

export async function submitRegister(
    prevState: ActionResponse,
    formData: FormData,
): Promise<ActionResponse> {

    const rawData = Object.fromEntries(formData) as Record<string, string>
    //eliminamos campos que no queremos que se mantengan
    const { password, ...safeInputs } = rawData;

    const validatedFields = registerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Por favor corrige los errores del formulario.",
            errors: validatedFields.error.flatten().fieldErrors,
            inputs: safeInputs
        };
    }

    let shouldRedirect = false;

    try {
        // 3. Pre-verificación opcional de correo existente
        const exists = await checkEmailExists(validatedFields.data.email);
        if (exists) {
            return {
                success: false,
                message: "El correo electrónico ya se encuentra registrado.",
                errors: {
                    email: ["Este correo ya está en uso."],
                },
                inputs: safeInputs
            };
        }
        // 4. Registrar en Better-Auth
        await auth.api.signUpEmail({
            body: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                password,
                callbackURL: "/verify-email?callback=true",
            },
            headers: await headers(),
        });

        shouldRedirect = true;

    } catch (error: any) {
        return {
            success: false,
            message:
                error?.message ||
                "Ocurrió un error inesperado al registrar el usuario.",
            inputs: safeInputs
        };
    }

    if (shouldRedirect) {
        redirect("/verify-email?status=waiting");
    }

    return { success:true };
}
