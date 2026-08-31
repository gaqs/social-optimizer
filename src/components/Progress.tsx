"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  children: React.ReactNode;
  className?: string;
}

export function Progress({ children, className }: ProgressProps) {
  return (
    <div
      className={cn(
        "w-full h-3 overflow-hidden rounded-full bg-indigo-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  className,
  showLabel = false,
}: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "flex h-full items-center justify-center rounded-full bg-indigo-600 transition-all duration-300",
        className,
      )}
      style={{ width: `${progress}%` }}
    >
      {showLabel && (
        <span className="px-2 text-xs font-medium text-white">{progress}%</span>
      )}
    </div>
  );
}
