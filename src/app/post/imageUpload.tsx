"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ExportOptions, ExportResult, LabelOverrides } from "@image-ultra/react";
import { CloudUpload, RotateCcw } from "lucide-react";
import Card from "@/components/Card";
import ImageEditorModal from "@/components/ImageEditorModal";
import { useImagePicker } from "@/hooks/useImagePicker";

interface ImageUploadProps {
    onImageReady: (file: File | null) => void;
    error?: string[];
}

const EXPORT_OPTIONS: ExportOptions = {
    mimeType: "image/jpeg",
    quality: 0.9,
    maxWidth: 1440,
    maxHeight: 1800,
};

const LABELS: LabelOverrides = { done: "Confirmar recorte", cancel: "Cancelar" };

export default function ImageUpload({ onImageReady, error }: ImageUploadProps) {
    const picker = useImagePicker();
    const { close } = picker;
    const [preview, setPreview] = useState<string | null>(null);

    // Revoca el preview anterior al cambiarlo y al desmontar
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleSave = ({ blob }: ExportResult) => {
        const file = new File([blob], `post-${Date.now()}.jpg`, { type: blob.type });
        setPreview(URL.createObjectURL(blob));
        onImageReady(file);
        close();
    };

    const handleReset = () => {
        setPreview(null);
        onImageReady(null);
        close();
    };

    return (
        <div className="bg-indigo-50 p-10 mb-2 rounded-xl">
            <input
                {...picker.inputProps}
                accept="image/*"
                onChange={(e) => {
                    setPreview(null);
                    onImageReady(null);
                    picker.inputProps.onChange(e);
                }}
            />

            {!preview && (
                <div
                    className="w-full text-center flex flex-col items-center justify-center cursor-pointer"
                    onClick={picker.open}
                >
                    <div className="p-5 bg-white rounded-full text-indigo-600 mb-2 w-fit">
                        <CloudUpload size={32} />
                    </div>
                    <div className="font-bold mb-2">Arrastra y suelta archivos</div>
                    <div className="text-sm text-neutral-400 mb-10">
                        Sube imagenes en alta resolucion (Max. 10MB)
                    </div>
                    <div className="font-bold text-indigo-600">Buscar archivos</div>
                </div>
            )}

            {preview && (
                <div className="relative w-full flex flex-col items-center gap-3">
                    <div className="relative w-48 h-48 rounded-xl overflow-hidden">
                        <Image src={preview} alt="preview" fill className="object-cover" />
                    </div>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1 text-sm text-indigo-600 font-bold"
                    >
                        <RotateCcw size={14} /> Cambiar imagen
                    </button>
                </div>
            )}

            {picker.src && (
                <ImageEditorModal
                    src={picker.src}
                    aspect={4 / 5}
                    exportOptions={EXPORT_OPTIONS}
                    labels={LABELS}
                    onSave={handleSave}
                    onClose={handleReset}
                />
            )}

            {error?.map((err) => (
                <p key={err} className="text-red-500 text-sm mt-2">{err}</p>
            ))}
        </div>
    );
}