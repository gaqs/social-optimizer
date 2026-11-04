"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    Globe,
    MoreHorizontal,
} from "lucide-react";
import Button from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";

interface PreviewModalProps {
    content: string;
    platforms: string[];
    mediaFiles: File[];
    mediaPaths?: string[]; // media ya guardado (edición) o elegido de la biblioteca
    onClose: () => void;
}

const ICONS: Record<string, string> = {
    Instagram: "/img/rrss/instagram.png",
    Facebook: "/img/rrss/facebook.png",
    Tiktok: "/img/rrss/tiktok.png",
    X: "/img/rrss/x.png",
};

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

export default function PreviewModal({
    content,
    platforms,
    mediaFiles,
    mediaPaths = [],
    onClose,
}: PreviewModalProps) {
    const [index, setIndex] = useState(0);

    // El modal se monta al abrir y los archivos no cambian mientras está abierto:
    // los blob URLs se crean una vez y se revocan al desmontar.
    const [fileUrls] = useState(() =>
        mediaFiles.map((file) => URL.createObjectURL(file)),
    );
    useEffect(
        () => () => fileUrls.forEach((url) => URL.revokeObjectURL(url)),
        [fileUrls],
    );

    // Las rutas guardadas van primero (orden del formulario), luego los archivos nuevos
    const media = [
        ...mediaPaths.map((src) => ({ src, video: VIDEO_EXT.test(src) })),
        ...mediaFiles.map((file, i) => ({
            src: fileUrls[i],
            video: file.type.startsWith("video/"),
        })),
    ].filter((item) => item.src);

    const count = media.length;
    const active = count ? Math.min(index, count - 1) : 0;
    const current = media[active];
    const go = (step: number) => setIndex((i) => (i + step + count) % count);

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="max-h-[calc(100dvh-1rem)] max-w-md gap-0 overflow-x-hidden overflow-y-auto p-0">
                <DialogTitle className="sr-only">Previsualización del post</DialogTitle>
                <DialogDescription className="sr-only">
                    Así se verá tu publicación en las redes seleccionadas
                </DialogDescription>

                <div className="flex items-center gap-2 p-4">
                    {platforms.map((platform) => (
                        <Image
                            key={platform}
                            src={ICONS[platform] ?? ICONS.Instagram}
                            alt={platform}
                            width={20}
                            height={20}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100" />
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm truncate">Tu cuenta</div>
                        <div className="text-xs text-neutral-400 flex items-center gap-1">
                            <Globe size={11} /> Hace un momento
                        </div>
                    </div>
                    <MoreHorizontal size={18} className="text-neutral-400" />
                </div>

                {current && (
                    <div className="relative w-full bg-neutral-100">
                        {current.video ? (
                            <video
                                key={current.src}
                                src={current.src}
                                controls
                                muted
                                playsInline
                                className="max-h-[45dvh] w-full object-contain"
                            />
                        ) : (
                            <Image
                                key={current.src}
                                src={current.src}
                                alt={`Previsualización ${active + 1} de ${count}`}
                                width={400}
                                height={500}
                                className="max-h-[45dvh] w-full object-contain"
                            />
                        )}

                        {count > 1 && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Media anterior"
                                    onClick={() => go(-1)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Media siguiente"
                                    onClick={() => go(1)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                                >
                                    <ChevronRight size={18} />
                                </button>
                                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                                    {media.map((item, i) => (
                                        <button
                                            key={item.src}
                                            type="button"
                                            aria-label={`Ir al media ${i + 1}`}
                                            onClick={() => setIndex(i)}
                                            className={`h-2 w-2 rounded-full ${
                                                i === active ? "bg-indigo-600" : "bg-neutral-400/60"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-neutral-700">
                        <Heart size={22} />
                        <MessageCircle size={22} />
                        <Send size={22} />
                        <Bookmark size={22} className="ml-auto" />
                    </div>
                    <div className="text-sm whitespace-pre-wrap break-words">
                        {content || <span className="text-neutral-400">Sin contenido</span>}
                    </div>
                </div>

                <div className="p-4 pt-0">
                    <Button variant="white" className="w-full font-bold" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
