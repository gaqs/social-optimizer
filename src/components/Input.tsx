"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, type, className, id, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

    return (
      <div className="w-full relative">
        {label && (
          <label htmlFor={id} className="block font-bold text-gray-700 mb-1">
            {label}
          </label>
        )}

        <input ref={ref} id={id} type={inputType} className={ cn(
            "w-full rounded-xl border px-4 py-3 outline-none transition",
            "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {isPasswordField && (
          <button type="button" onClick={ ()=>setShowPassword(!showPassword) } className="absolute top-[43] right-[20] text-gray-500 cursor-pointer hover:text-gray-700 transition">
            { showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )

        }

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
