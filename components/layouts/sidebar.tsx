"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const routes = [
  { name: "Dashboard", route: "/", icon: LayoutDashboard },
  { name: "Product", route: "/product", icon: Package },
  { name: "Order", route: "/order", icon: ShoppingCart },
  { name: "User", route: "/user", icon: Users },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        "flex flex-col light:bg-white dark:bg-background relative h-screen left-0 border-r transition-all duration-300",
        className,
        isOpen ? "w-64" : "w-24"
      )}
    >
      <div className="absolute -right-5 top-1/2 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full py-5 shadow-md bg-white hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <ChevronLeft size={16} className="dark:text-black " />
          ) : (
            <ChevronRight size={16} className="dark:text-black" />
          )}
        </Button>
      </div>
      <div className={cn("space-y-4 py-4")}>
        <div className="w-full py-2">
          <Link
            href={"/"}
            className={cn(
              "flex items-center justify-center px-4 h-[50px]",
              isOpen ? "" : ""
            )}
          >
            <Image
              src={isOpen ? "/logo.webp" : "/logo-small.webp"}
              alt="Dashboard Logo"
              width={isOpen ? 150 : 50}
              height={isOpen ? 50 : 50}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <ScrollArea
          className={cn("h-72 w-full", isOpen ? "px-4" : "h-auto px-4")}
        >
          <div className="flex gap-4 flex-col">
            {routes.map((route) => (
              <Button
                key={route.name}
                asChild
                variant={pathname === route.route ? "secondary" : "ghost"}
                className={cn(
                  "justify-start rounded-2xl drop-shadow-md",
                  isOpen ? "w-full" : "w-14"
                )}
              >
                <Link href={route.route} className="flex items-center gap-2">
                  <route.icon size={20} />
                  {isOpen && <span>{route.name}</span>}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
