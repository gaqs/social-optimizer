"use client";

import { useMemo } from "react";
import {
    ImageEditor,
    type ExportOptions,
    type ExportResult,
    type LabelOverrides,
    type ToolInput,
} from "@image-ultra/react";
import "@image-ultra/react/styles.css";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ImageEditorModalProps {
    src: string;
    aspect: number;
    // Herramientas visibles del editor; si se omite quedan todas las nativas
    tools?: readonly ToolInput[];
    exportOptions: ExportOptions; // pásalo como constante fuera del componente
    labels: LabelOverrides;       // idem
    title?: string;
    busy?: boolean;
    busyLabel?: string;
    onSave: (result: ExportResult) => void;
    onClose: () => void;
}

export default function ImageEditorModal({
    src,
    aspect,
    tools,
    exportOptions,
    labels,
    title = "Recortar Imagen",
    busy = false,
    busyLabel = "Subiendo...",
    onSave,
    onClose,
}: ImageEditorModalProps) {
    const initialState = useMemo(
        () => ({ geometry: { cropAspect: aspect } }),
        [aspect]
    );

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                // Mientras hay una operación en curso no se cierra (Esc ni clic fuera)
                if (!open && !busy) onClose();
            }}
        >
            <DialogContent className="sm:max-w-3xl" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <DialogClose
                    disabled={busy}
                    render={
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="absolute top-4 right-4"
                        />
                    }
                >
                    <XIcon />
                    <span className="sr-only">Cerrar</span>
                </DialogClose>

                <div className="relative w-full h-[560px] rounded-xl overflow-hidden">
                    <ImageEditor
                        src={src}
                        initialState={initialState}
                        tools={tools}
                        theme="light"
                        themeOverrides={{ accent: "#4f46e5" }}
                        labels={labels}
                        exportOptions={exportOptions}
                        onSave={onSave}
                        onCancel={onClose}
                    />

                    {busy && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-bold text-indigo-600">
                            {busyLabel}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
