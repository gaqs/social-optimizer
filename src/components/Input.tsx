"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type,
      className,
      id,
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const inputType =
      isPasswordField && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block font-bold text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex w-full items-center rounded-xl border bg-neutral-50 transition",
            "border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20",
            "disabled:opacity-50",
            error &&
              "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
          )}
        >
          {startAdornment && (
            <div className="flex shrink-0 items-center pl-4 pe-2 text-gray-500">
                {startAdornment}
            </div>
)}

          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              "w-full bg-transparent px-4 py-3 outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              startAdornment && "pl-2",
              (endAdornment || isPasswordField) && "pr-2",
              className
            )}
            {...props}
          />

          {isPasswordField ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center px-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          ) : (
            endAdornment && (
              <div className="flex items-center pr-4 text-gray-500">
                {endAdornment}
              </div>
            )
          )}
        </div>

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

