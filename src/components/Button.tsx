import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "white"
  | "border_white"
  | "instagram"
  | "x"
  | "tiktok"
  | "facebook";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white transition-all hover:bg-indigo-700 hover:scale-103 shadow-md",
  secondary:
    "bg-indigo-500 text-white transition-all hover:bg-blue-600 hover:scale-103 shadow-md",
  tertiary:
    "bg-orange-700 text-white transition-all hover:bg-orange-800 hover:scale-103 shadow-md",
  white:
    "bg-white text-indigo-600 transition-all hover:bg-gray-100 hover:scale-103 shadow-md",
  border_white:
    "bg-transparent text-white-600 transition-all hover:bg-white hover:text-indigo-600 hover:scale-103 shadow-md border-1 border-white",

  instagram:
    "bg-gradient-to-r from-[#fcb045] via-[#fd1d1d] to-[#833ab4] text-white transition-all hover:bg-indigo-700 hover:scale-103 shadow-md",
  x: "bg-black text-white hover:bg-neutral-900 transition-all hover:bg-indigo-700 hover:scale-103 shadow-md",
  tiktok:
    "bg-black hover:bg-zinc-900 text-white transition-all hover:bg-indigo-700 hover:scale-103 shadow-md",
  facebook:
    "bg-[#1877F2] text-white transition-all hover:bg-indigo-700 hover:scale-103 shadow-md",
};

export default function Button({
  children,
  isLoading = false,
  loadingText = "Cargando...",
  variant = "primary",
  disabled,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      {...props}
      className={cn(
        `cursor-pointer px-6 py-3 rounded-2xl flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]}`,
        className,
      )}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {isLoading ? loadingText : children}
    </button>
  );
}
