"use client";

import type React from "react";
import { Menu, Search } from "lucide-react";
import AppSideBar from "./AppSideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";

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
        <SidebarInset className="">
          <div className="flex w-full flex-col">
            {/* Fixed Searchbar */}
            <header className="sticky top-0 z-50 flex h-15 items-center justify-center gap-4 border-b bg-transparent px-4 py-3 backdrop-blur-lg">
              <MobileMenuToggle />
              <div className="relative w-full max-w-md">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8"
                />
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-transparent">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
