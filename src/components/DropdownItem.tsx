"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function DropdownItem({children, onClick, className}: DropdownItemProps) {
    return (
        <div onClick={onClick} className={cn("w-full px-4 py-3 text-left text-sm hover:bg-neutral-100 transition-colors", className)}>
            {children}
        </div>
    );
}