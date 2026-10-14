"use client";

import {
  forwardRef,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  startAdornment?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      className,
      id,
      startAdornment,
      children,
      ...props
    },
    ref
  ) => {
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
            <div className="flex shrink-0 items-center pl-4 text-gray-500">
              {startAdornment}
            </div>
          )}

          <div className="relative flex-1 min-w-0">
            <select
              ref={ref}
              id={id}
              className={cn(
                "w-full appearance-none bg-transparent px-4 py-3 pr-10 outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              {...props}
            >
              {children}
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
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

Select.displayName = "Select";

export default Select;
