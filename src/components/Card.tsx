"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  mouseOver?: boolean;
  className?: string;

  // Imagen opcional
  image?: string;
  imageAlt?: string;
  imageHeight?: number;
}

export default function Card({
  children,
  mouseOver = false,
  className,
  image,
  imageAlt = "Card image",
  imageHeight = 220,
}: CardProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const bounds = divRef.current.getBoundingClientRect();

    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-0.5 shadow-lg backdrop-blur-md cursor-pointer",
        className,
      )}
    >
      {visible && mouseOver && (
        <div
          className="pointer-events-none absolute z-0 size-60 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 blur-xl transition-opacity duration-300"
          style={{
            top: position.y - 120,
            left: position.x - 120,
          }}
        />
      )}

      <div
        className={cn(
          "relative z-10 overflow-hidden rounded-[10px]",
          mouseOver && "bg-white",
        )}
      >
        {image && (
          <div className="relative w-full" style={{ height: imageHeight }}>
            <Image src={image} alt={imageAlt} fill className="object-cover" />
          </div>
        )}

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
