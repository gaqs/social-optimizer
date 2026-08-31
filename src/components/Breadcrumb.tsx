"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps extends React.ComponentProps<"nav"> {
    separator?: React.ReactNode;
}

export function Breadcrumb({
    children,
    className,
    separator = "/",
    ...props
}: BreadcrumbProps) {
    const items = React.Children.toArray(children);

    return (
        <nav
            aria-label="breadcrumb"
            className={cn("flex items-center text-sm", className)}
            {...props}
        >
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((child, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2"
                    >
                        {child}

                        {index < items.length - 1 && (
                            <span className="text-gray-400">
                                {separator}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

interface BreadcrumbItemProps extends React.ComponentProps<"div"> {
  href?: string;
  active?: boolean;
}

export function BreadcrumbItem({
    href,
    active = false,
    children,
    className,
    ...props
}: BreadcrumbItemProps) {

    return (
        <div
            className={cn(
                active
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-900",
                className
            )}
            {...props}
        >
            {active || !href ? (
                children
            ) : (
                <Link href={href}>
                    {children}
                </Link>
            )}
        </div>
    );
}