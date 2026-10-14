"use client";

import { useMemo } from "react";
import {
    ImageEditor,
    type ExportOptions,
    type ExportResult,
    type LabelOverrides,
} from "@image-ultra/react";
import "@image-ultra/react/styles.css";
import { X } from "lucide-react";

interface ImageEditorModalProps {
    src: string;
    aspect: number;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative flex flex-col gap-4 shadow-2xl">
                <div className="flex justify-between items-center">
                    <h5 className="font-bold text-lg text-gray-800">{title}</h5>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={busy}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-40"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="relative w-full h-[560px] rounded-xl overflow-hidden">
                    <ImageEditor
                        src={src}
                        initialState={initialState}
                        tools={["adjust"]}
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
            </div>
        </div>
    );
}