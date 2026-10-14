"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useImagePicker() {
    const inputRef = useRef<HTMLInputElement>(null);
    const srcRef = useRef<string | null>(null);
    const [src, setSrc] = useState<string | null>(null);

    const replaceSrc = useCallback((next: string | null) => {
        if (srcRef.current) URL.revokeObjectURL(srcRef.current);
        srcRef.current = next;
        setSrc(next);
    }, []);

    // Limpieza al desmontar
    useEffect(() => {
        return () => {
            if (srcRef.current) URL.revokeObjectURL(srcRef.current);
        };
    }, []);

    const open = useCallback(() => inputRef.current?.click(), []);

    const close = useCallback(() => {
        replaceSrc(null);
        // Permite volver a elegir el mismo archivo
        if (inputRef.current) inputRef.current.value = "";
    }, [replaceSrc]);

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            replaceSrc(URL.createObjectURL(file));
        },
        [replaceSrc]
    );

    return {
        src,
        isOpen: src !== null,
        open,
        close,
        // Se esparce directo en el <input>
        inputProps: {
            ref: inputRef,
            type: "file" as const,
            accept: "image/png, image/jpeg, image/gif",
            className: "hidden",
            onChange,
        },
    };
}