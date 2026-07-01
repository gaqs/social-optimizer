import { cn } from "@/lib/utils";

export default function Badge({children, className}: {children: React.ReactNode, className?: string}){
    return(
        <div className={cn("bg-indigo-200 text-indigo-600 text-xs font-medium px-3 py-0.5 rounded w-fit mb-3", className)}>{children}</div>
    )
}