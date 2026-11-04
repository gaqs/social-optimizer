"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ExportOptions, ExportResult, LabelOverrides } from "@image-ultra/react";
import { CloudUpload, Plus, X, LibraryBig } from "lucide-react";
import ImageEditorModal from "@/components/ImageEditorModal";
import { useImagePicker } from "@/hooks/useImagePicker";
import { MEDIA_RULES, validateMediaFile } from "@/lib/media";
import MediaLibrary from "./mediaLibrary";

interface MediaUploadProps {
    onMediaReady: (files: File[], keepExisting: string[]) => void;
    error?: string[];
    existingMedia?: string[];
}

interface MediaItem {
    id: string;
    kind: "image" | "video";
    url: string;
    file?: File; // presente solo en archivos recién subidos
    path?: string; // presente solo en media ya guardado en el post
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

const EXPORT_OPTIONS: ExportOptions = {
    mimeType: "image/jpeg",
    quality: 0.9,
    maxWidth: 1440,
    maxHeight: 1800,
};

const LABELS: LabelOverrides = { done: "Confirmar recorte", cancel: "Cancelar" };
const ACCEPT = MEDIA_RULES.allowedMimeTypes.join(",");

export default function MediaUpload({ onMediaReady, error, existingMedia = [] }: MediaUploadProps) {
    const picker = useImagePicker();
    // Arranca con el media guardado (al editar) y se van agregando archivos nuevos.
    const [items, setItems] = useState<MediaItem[]>(() =>
        existingMedia.map((path) => ({
            id: crypto.randomUUID(),
            kind: VIDEO_EXT.test(path) ? "video" : "image",
            url: path,
            path,
        })),
    );
    const [mediaError, setMediaError] = useState<string | null>(null);
    const [libraryOpen, setLibraryOpen] = useState(false);

    // Ref con los items actuales para leerlos dentro del onChange async
    const itemsRef = useRef<MediaItem[]>([]);
    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    // Revoca los object URLs de los archivos nuevos al desmontar
    useEffect(() => {
        return () => {
            itemsRef.current.forEach((item) => {
                if (item.file) URL.revokeObjectURL(item.url);
            });
        };
    }, []);

    const commit = (next: MediaItem[]) => {
        setItems(next);
        onMediaReady(
            next.filter((item): item is MediaItem & { file: File } => !!item.file).map((item) => item.file),
            next.filter((item): item is MediaItem & { path: string } => !!item.path).map((item) => item.path),
        );
    };

    const addFile = (file: File) => {
        const item: MediaItem = {
            id: crypto.randomUUID(),
            file,
            kind: file.type.startsWith("video/") ? "video" : "image",
            url: URL.createObjectURL(file),
        };
        commit([...itemsRef.current, item]);
    };

    const removeItem = (id: string) => {
        const target = itemsRef.current.find((item) => item.id === id);
        if (target?.file) URL.revokeObjectURL(target.url);
        commit(itemsRef.current.filter((item) => item.id !== id));
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const err = await validateMediaFile(file, MEDIA_RULES, itemsRef.current.length);
        if (err) {
            setMediaError(err);
            picker.close(); // resetea el input para poder volver a elegir el archivo
            return;
        }
        setMediaError(null);

        if (file.type.startsWith("video/")) {
            addFile(file);
            picker.close();
        } else {
            // Las imágenes pasan por el editor de recorte antes del preview
            picker.inputProps.onChange(e);
        }
    };

    const handleEditorSave = ({ blob }: ExportResult) => {
        addFile(new File([blob], `post-${Date.now()}.jpg`, { type: blob.type }));
        picker.close();
    };

    // Agrega medios elegidos de la biblioteca respetando el máximo de archivos.
    const handleLibrarySelect = (paths: string[]) => {
        setLibraryOpen(false);
        const current = itemsRef.current;
        const already = new Set(current.filter((item) => item.path).map((item) => item.path));
        const room = Math.max(0, MEDIA_RULES.maxFiles - current.length);

        const additions: MediaItem[] = paths
            .filter((path) => !already.has(path))
            .slice(0, room)
            .map((path) => ({
                id: crypto.randomUUID(),
                kind: VIDEO_EXT.test(path) ? "video" : "image",
                url: path,
                path,
            }));

        if (additions.length) commit([...current, ...additions]);
    };

    return (
        <div className="bg-indigo-50 p-10 mb-2 rounded-xl">
            <div className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
                <div className="text-sm text-neutral-500">
                    Sube desde tu equipo o reutiliza medios ya publicados.
                </div>
                <button
                    type="button"
                    onClick={() => setLibraryOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-indigo-300 bg-white px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50"
                >
                    <LibraryBig size={16} />
                    Elegir de mi biblioteca
                </button>
            </div>

            <input {...picker.inputProps} accept={ACCEPT} onChange={handleFile} />

            {items.length === 0 && (
                <div
                    className="w-full text-center flex flex-col items-center justify-center cursor-pointer"
                    onClick={picker.open}
                >
                    <div className="p-5 bg-white rounded-full text-indigo-600 mb-2 w-fit">
                        <CloudUpload size={32} />
                    </div>
                    <div className="font-bold mb-2">Arrastra y suelta archivos</div>
                    <div className="text-sm text-neutral-400 mb-10">
                        Sube imágenes (max. {MEDIA_RULES.maxImageSizeMB}MB) o videos
                        (max. {MEDIA_RULES.maxVideoSizeMB}MB) · hasta{" "}
                        {MEDIA_RULES.maxFiles} archivos
                    </div>
                    <div className="font-bold text-indigo-600">Buscar archivos</div>
                </div>
            )}

            {items.length > 0 && (
                <div className="flex flex-wrap items-start justify-center gap-3">
                    {items.map((item) => (
                        <div key={item.id} className="relative w-48 h-48">
                            {item.kind === "video" ? (
                                <video
                                    src={item.url}
                                    controls
                                    muted
                                    playsInline
                                    className="w-full h-full rounded-xl object-cover bg-black"
                                />
                            ) : (
                                <Image
                                    src={item.url}
                                    alt="preview"
                                    fill
                                    className="rounded-xl object-cover"
                                />
                            )}
                            {item.path && (
                                <div className="absolute bottom-0 left-0 rounded-bl-xl bg-black/60 px-2 py-1 text-xs text-white">
                                    Guardada
                                </div>
                            )}
                            <button
                                type="button"
                                aria-label="Quitar archivo"
                                onClick={() => removeItem(item.id)}
                                className="absolute -top-2 -right-2 bg-white text-neutral-500 hover:text-red-500 rounded-full p-1 shadow-md"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    {items.length < MEDIA_RULES.maxFiles && (
                        <button
                            type="button"
                            onClick={picker.open}
                            className="w-48 h-48 rounded-xl border-2 border-dashed border-indigo-300 text-indigo-500 flex flex-col items-center justify-center gap-2 font-bold hover:bg-white/50"
                        >
                            <Plus size={32} />
                            <span className="text-sm">Agregar imagen o video</span>
                        </button>
                    )}
                </div>
            )}

            {mediaError && <p className="text-red-500 text-sm mt-2">{mediaError}</p>}
            {error?.map((err) => (
                <p key={err} className="text-red-500 text-sm mt-2">{err}</p>
            ))}

            {picker.src && (
                <ImageEditorModal
                    src={picker.src}
                    aspect={4 / 5}
                    exportOptions={EXPORT_OPTIONS}
                    labels={LABELS}
                    onSave={handleEditorSave}
                    onClose={picker.close}
                />
            )}

            <MediaLibrary
                open={libraryOpen}
                onClose={() => setLibraryOpen(false)}
                onSelect={handleLibrarySelect}
            />
        </div>
    );
}
