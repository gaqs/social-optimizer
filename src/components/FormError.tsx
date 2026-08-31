"use client";

interface FormErrorSummaryProps {
    errors?: Record<string, string[] | undefined>;
    title?: string;
}

export default function FormErrorSummary({
    errors,
    title = "Por favor corrige los siguientes errores:",
}: FormErrorSummaryProps) {
    if (!errors) return null;

    // Aplanamos todos los mensajes de todos los campos en una sola lista
    const messages = Object.values(errors)
        .filter(Boolean)
        .flat() as string[];

    if (messages.length === 0) return null;

    return (
        <div className="p-4 rounded-md mb-5 text-sm bg-red-50 text-red-700 border border-red-200">
            <p className="font-semibold mb-2">{title}</p>
            <ul className="list-disc list-inside space-y-1">
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}