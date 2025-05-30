"use client";
import { BadgePlus, Home, Rss, Search, UserPen } from "lucide-react";

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
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ProfileSection from "./AsideProfileSection";
import LoginLogoutButton from "./LoginLogoutButton";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";

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
  {
    item: "Explore",
    href: "/explore",
    icon: <Search className="h-6 w-6" />,
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const { session, isLoading } = useSession();
  useEffect(() => {
    console.log(session);

    if (session && !isLoading) {
      router.push("/");
    }
    if (!session && !isLoading) {
      router.push("/signin");
    }
  }, [session, isLoading, router]);
  const path = usePathname();
  const toggle = useSidebar();
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="pl-3">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="font-poppins text-xl font-medium">
            <span className="text-[1.2em] text-purple-500">N</span>arrate
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 max-h-fit pb-4 pl-3 sm:pb-0">
        <SidebarGroup className="">
          <SidebarGroupLabel>
            <div className="font-poppins text-lg font-medium">Profile</div>
          </SidebarGroupLabel>
          <ProfileSection
            username={session?.data?.user?.username}
            image={session?.data?.user?.image}
            isLoading={isLoading}
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pt-1 pl-3">
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="font-poppins text-lg font-medium">Navigation</div>
          </SidebarGroupLabel>
          <SidebarMenu className="py-2">
            {navItems.map((e) => {
              return (
                <SidebarMenuItem
                  key={e.item}
                  onClick={() => toggle.isMobile && toggle.toggleSidebar()}
                >
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
      <SidebarFooter className="pl-3">
        <LoginLogoutButton
          session={session?.data?.user.username}
          isLoading={isLoading}
        />
        <div className="px-4 py-2 text-xs text-muted-foreground">
          © 2025 Narrate Inc.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
