"use client";

import type React from "react";
import { Menu } from "lucide-react";
import AppSideBar from "./AppSideBar";
import { Button } from "@/components/ui/button";

import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import RightSideBar from "./RightSideBar";

// Create a separate toggle button component that uses the useSidebar hook
function MobileMenuToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-screen">
        <AppSideBar />

        <SidebarInset className="w-full">
          <div className="flex w-full flex-col">
            {/* Fixed Searchbar */}
            <header className="sticky top-0 z-50 flex h-15 items-center gap-4 border-b bg-transparent px-4 py-3 backdrop-blur-lg md:justify-center">
              <MobileMenuToggle />
              <div className="no-scrollbar relative flex w-full max-w-md gap-x-1.5 overflow-x-auto font-poppins text-sm font-thin md:justify-center">
                <Button variant={"outline"} size={"sm"}>
                  Trendings
                </Button>
                <Button variant={"outline"} size={"sm"}>
                  Codings
                </Button>
                <Button variant={"outline"} size={"sm"}>
                  Fashion
                </Button>
                <Button variant={"outline"} size={"sm"}>
                  Actress
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
          </div>
        </SidebarInset>
        <div className="hidden w-72 border-l bg-transparent lg:block">
          <RightSideBar />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
