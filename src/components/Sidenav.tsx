"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BarChart3,
  Calendar1,
  ChevronLeft,
  ChevronRight,
  CopyPlus
} from "lucide-react";
import clsx from "clsx";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Post Creator",
    href: "/post-creator",
    icon: Users,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: Calendar1,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside className="top-0 left-0 z-50 transition-all duration-300 flex flex-col w-20 md:w-80 hover:w-80">

        {/* Header */}
        <div className="h-[80px] flex items-center justify-between px-4 shrink-0 bg-transparent">

          <div className="flex items-center gap-2">

            {/* Desktop collapse */}
            <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100" >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto bg-white">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={clsx(
                  "flex items-center gap-3 px-3 py-3 transition-all duration-200 group",
                  isActive
                    ? "border-s-4 border-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-black hover:border-s-4 hover:border-indigo-600 hover:bg-indigo-50"
                )}>

                <Icon className={clsx("shrink-0 w-5 h-5")}/>

                {!collapsed && (
                  <span className="font-medium truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
          <Link href="/post" className="flex items-center gap-3 px-3 py-5 transition-all duration-200 text-white bg-indigo-600 !rounded-xl mt-10 font-bold hover:bg-indigo-400 transition">
            <CopyPlus strokeWidth={3} className="shrink-0 w-5 h-5"/>
            {!collapsed && (
              <span className="truncate">
                Crear Post
              </span>
            )}
          </Link>
        </nav>
      </aside>
    </>
  );
}