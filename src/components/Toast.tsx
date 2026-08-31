"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface ToastProps {
    id?: string;
    success: boolean;
    message?: string;
    duration?: number;
}

export default function Toast({
    id,
    success,
    message,
    duration = 5000,
}: ToastProps) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);

    }, [id, duration]);

    if (!message) return null;

    return (
        <div
            className={`
                fixed
                top-30
                right-5
                z-50
                transition-all
                duration-300
                ease-in-out
                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0 pointer-events-none"
                }
            `}
        >
            <div
                className={`
                    flex
                    items-center
                    gap-3
                    min-w-[320px]
                    rounded-lg
                    shadow-xl
                    px-4
                    py-3
                    text-white
                    ${success ? "bg-green-600" : "bg-red-600"}
                `}
            >
                {success ? (
                    <CheckCircle2 size={20} />
                ) : (
                    <XCircle size={20} />
                )}

                <span className="flex-1">
                    {message}
                </span>
            </div>
        </div>
    );
}
