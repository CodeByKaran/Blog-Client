"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-full min-h-screen">
      <SideBar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <div className="flex flex-1 flex-col lg:ml-75">
        {/* Mobile header with menu button */}
        <header className="fixed top-2 z-10 w-fit p-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5 fill-white" color="white" />
          </Button>
        </header>

        <MainBar>{children}</MainBar>
      </div>
    </div>
  );
};

export default AppLayout;
