"use client";

import { useState, useActionState, useEffect, startTransition } from "react";
import Image from "next/image";
import type { ExportOptions, ExportResult, LabelOverrides } from "@image-ultra/react";
import { Edit2 } from "lucide-react";
import Toast from "@/components/Toast";
import ImageEditorModal from "@/components/ImageEditorModal";
import { useImagePicker } from "@/hooks/useImagePicker";
import { authClient } from "@/lib/auth-client";

interface AvatarUploadProps {
    currentAvatar?: string;
    onUploadAction: (
        prevState: ActionResponse,
        formData: FormData
    ) => Promise<ActionResponse>;
}

const initialState: ActionResponse = { success: false, message: "" };

const EXPORT_OPTIONS: ExportOptions = {
    mimeType: "image/jpeg",
    quality: 0.9,
    maxWidth: 512,
    maxHeight: 512,
};

const LABELS: LabelOverrides = { done: "Guardar foto", cancel: "Cancelar" };

export default function AvatarUpload({
    currentAvatar = "/img/profile.png",
    onUploadAction,
}: AvatarUploadProps) {
    const picker = useImagePicker();
    const { close } = picker;

    const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
    const [state, formAction, isUploading] = useActionState(onUploadAction, initialState);

    useEffect(() => {
        if (!state.success) return;
        authClient.getSession({ query: { disableCookieCache: true } }).then(() => {
            authClient.$store.notify("$sessionSignal");
        });
        close();
    }, [state, close]);

    // Libera el blob de la vista previa anterior
    useEffect(() => {
        return () => {
            if (avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    const handleSave = ({ blob }: ExportResult) => {
        const formData = new FormData();
        formData.append("avatar", blob, "avatar.jpg");

        setAvatarPreview(URL.createObjectURL(blob)); // optimista
        startTransition(() => formAction(formData));
    };

    return (
        <>
            <Toast id={state.id} success={state.success} message={state.message} />

            <div id="profile-avatar" className="w-fit me-5 relative mb-5">
                <input {...picker.inputProps} />

                <div onClick={picker.open} className="absolute bg-indigo-600 p-3 rounded-full -bottom-1 -right-1 cursor-pointer hover:bg-indigo-700 transition-colors z-10" >
                    <Edit2 color="white" size={20} />
                </div>

                <Image
                    src={avatarPreview}
                    alt="avatar"
                    width={180}
                    height={180}
                    priority
                    className="rounded-2xl border-5 border-white object-cover aspect-square"
                />
            </div>

            {picker.src && (
                <ImageEditorModal
                    src={picker.src}
                    aspect={1}
                    exportOptions={EXPORT_OPTIONS}
                    labels={LABELS}
                    busy={isUploading}
                    busyLabel="Subiendo foto..."
                    onSave={handleSave}
                    onClose={close}
                />
            )}
        </>
    );
}