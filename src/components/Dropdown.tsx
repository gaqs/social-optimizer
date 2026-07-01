"use client";

import {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
}

export default function Dropdown({trigger, children}: DropdownProps) {

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        
    }, []);

    return (
        <div ref={containerRef} className="relative inline-block">
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
                {trigger}
            </div>

            {open && (
                <div className="absolute right-0 mt-2 min-w-[200px] rounded-lg border border-neutral-200 bg-white shadow-lg z-50 overflow-hidden">
                    {children}
                </div>
            )}
        </div>
    );
}