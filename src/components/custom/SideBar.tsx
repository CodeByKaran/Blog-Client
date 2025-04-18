import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import ProfileSection from "./AsideProfileSection";
import AsideNavigation from "./AsideNavigation";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen w-75 transform rounded-r-lg bg-[#060606] transition-transform duration-200 ease-in-out lg:fixed lg:z-10 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* app title */}
        <div className="sticky top-0 left-0 flex items-center justify-between border-b border-dashed border-gray-500/50 p-4">
          <h1 className="font-semibol font-poppins text-xl text-gray-100">
            <motion.span
              className="inline-block text-[1.2em] text-indigo-500"
              initial={{ rotate: 0 }}
              animate={{ rotate: -10 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 2,
              }}
            >
              N
            </motion.span>{" "}
            arrate
          </h1>
        </div>
        {/* profile section */}
        <div className="sticky top-0 left-0 border-b border-dashed border-gray-500/50 p-4">
          <ProfileSection />
        </div>
        {/* Navigations */}

        <nav className="max-h-[calc(100vh-4rem)] space-y-2 overflow-y-auto p-4">
          <AsideNavigation />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
