"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block font-bold text-gray-700 mb-1">
            {label}
          </label>
        )}

        <input ref={ref} id={id} type="text" className={ cn(
            "w-full rounded-xl border px-4 py-3 outline-none transition",
            "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
