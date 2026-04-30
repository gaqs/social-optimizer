"use client";

import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface CardProps{
    children: React.ReactNode;
    mouseOver?: boolean;
    className?: string;
}

export default function Card( { children, mouseOver = false, className }: CardProps) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef<HTMLDivElement>(null); //useref debe ser htmlelement

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
        <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className={
                cn("relative rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer",
                    className
                )}
            >
                
            {visible && mouseOver &&(
                <div className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
                    style={{ top: position.y - 120, left: position.x - 120,}}  />
            )}
            <div className="relative z-10 bg-white h-full w-full rounded-[10px] p-5"> 
                { children }
            </div>
            
            
        </div>
    );

}

