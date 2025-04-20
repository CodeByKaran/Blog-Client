"use client";
import { BadgePlus, Home, Rss, UserPen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ProfileSection from "./AsideProfileSection";
import LoginLogoutButton from "./LoginLogoutButton";
import { usePathname } from "next/navigation";

const navItems = [
  {
    item: "Home",
    href: "/",
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

const AppSidebar = () => {
  const path = usePathname();
  return (
    <Sidebar className="w-[300px] border-r-0">
      <SidebarHeader className="border-b border-dashed border-gray-500/50">
        <div className="flex items-center gap-2 pt-2">
          <div className="font-poppins text-xl font-medium">
            <span className="text-[1.2em] text-purple-500">N</span>arrate
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="font-poppins text-lg font-medium">Profile</div>
          </SidebarGroupLabel>
          <ProfileSection />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="font-poppins text-lg font-medium">Navigation</div>
          </SidebarGroupLabel>
          <SidebarMenu className="py-2">
            {navItems.map((e) => {
              return (
                <SidebarMenuItem key={e.item}>
                  <SidebarMenuButton asChild isActive={e.href == path}>
                    <Link href={e.href}>
                      {e.icon}
                      <span className="py-4 font-poppins text-sm font-medium">
                        {e.item}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LoginLogoutButton />
        <div className="px-4 py-2 text-xs text-muted-foreground">
          © 2025 Narrate Inc.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
