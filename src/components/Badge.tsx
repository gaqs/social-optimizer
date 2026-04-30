import { Dot } from "lucide-react";

export default function Badge({children, className}: {children: React.ReactNode, className?: string}){
    return(
        <div className={`bg-indigo-200 text-indigo-600 text-xs font-medium px-3 py-0.5 rounded w-fit mb-3 ${className}`}>{children}</div>
    )
}