import { cn } from "@/lib/utils";
import { BadgePlus, Home, Rss, UserPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const navItems = [
  {
    item: "Home",
    href: "/home",
    icon: <Home className="h-6 w-6" />,
  },
  {
    item: "Profile",
    href: "/profile",
    icon: <UserPen className="h-6 w-6" />,
  },
  {
    item: "Create",
    href: "/create",
    icon: <BadgePlus className="h-6 w-6" />,
  },
  {
    item: "Blogs",
    href: "/blogs",
    icon: <Rss className="h-6 w-6" />,
  },
];

const AsideNavigation = () => {
  const path = usePathname();

  return (
    <ScrollArea className="overflow-auto">
      {navItems.map((e) => {
        return (
          <div className="" key={e.item}>
            <Link
              href={e.href}
              className={cn(
                "my-2 flex w-full justify-between rounded-lg py-3 pr-3 pl-2 transition-colors hover:bg-background/5",
                path == e.href ? "bg-white/90 hover:bg-white/95" : "",
              )}
            >
              <span
                className={cn(
                  "font-poppins font-light text-gray-100",
                  path == e.href ? "font-poppins font-bold text-gray-900" : "",
                )}
              >
                {e.item}
              </span>
              <span
                className={cn(
                  "text-gray-100",
                  path == e.href ? "text-gray-900" : "",
                )}
              >
                {e.icon}
              </span>
            </Link>
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default AsideNavigation;
