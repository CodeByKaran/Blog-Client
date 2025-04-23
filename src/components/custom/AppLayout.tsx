"use client";

import type React from "react";
import { Filter, Menu, Search } from "lucide-react";
import AppSideBar from "./AppSideBar";
import { Button } from "@/components/ui/button";

import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import RightSideBar from "./RightSideBar";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

import AnimatedWords from "./AnimatedWords";

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

const wordsObj = [
  {
    words: ["Unique Experience"],
  },
  {
    words: ["Creative Journey"],
  },
  {
    words: ["Innovative Technology", "Cutting-Edge Solutions"],
  },
  {
    words: ["Inspiring Thoughts"],
  },
  {
    words: ["Digital Transformation"],
  },
  {
    words: ["Future Vision"],
  },
  {
    words: ["Immersive Storytelling"],
  },
  {
    words: ["Breakthrough Ideas"],
  },
];

const DyanmicHeader = () => {
  const path = usePathname();

  if (path == "/explore") {
    return (
      <div className="relative flex w-full items-center">
        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search blogs..."
          className="w-full pl-8"
        />
        <Popover>
          <PopoverTrigger>
            <Filter className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-transparent p-2 pb-4 pl-3 backdrop-blur-3xl">
            <div className="flex w-full flex-col space-y-1">
              <div>
                <h4 className="font-poppins text-xs font-medium">Tags</h4>
              </div>
              <div className="flex items-center space-x-1.5 rounded-md">
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  coding
                </Button>
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  fashion
                </Button>
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  new era
                </Button>
              </div>
            </div>
            <div className="mt-2 flex w-full flex-col space-y-1">
              <div>
                <h4 className="font-poppins text-xs font-medium">Title</h4>
              </div>
              <div className="flex items-center space-x-1.5 rounded-md">
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  nextjs
                </Button>
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  react
                </Button>
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  backend
                </Button>
              </div>
            </div>
            <div className="mt-2 flex w-full flex-col space-y-1">
              <div>
                <h4 className="font-poppins text-xs font-medium">Duration</h4>
              </div>
              <div className="flex items-center space-x-1.5 rounded-md">
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  This week
                </Button>
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  This month
                </Button>
                <Button className="text-xs" variant={"outline"} size={"sm"}>
                  This year
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  if (path == "/blogs") {
    return (
      <div className="no-scrollbar relative flex w-full gap-x-1.5 overflow-x-auto font-poppins text-sm font-thin md:justify-center">
        <Button variant={"outline"} size={"sm"}>
          Most Liked
        </Button>
        <Button variant={"outline"} size={"sm"}>
          Most Comments
        </Button>
        <Button variant={"outline"} size={"sm"}>
          Most Saves
        </Button>
        <Button variant={"outline"} size={"sm"}>
          My Saved
        </Button>
      </div>
    );
  }

  if (path == "/create") {
    return (
      <div className="relative flex w-full flex-col items-center">
        <h1 className="text-center font-poppins text-2xl">Narrate </h1>
        <span className="absolute top-[25.5px] hidden font-poppins text-xs font-thin text-gray-400/80 md:block">
          your <AnimatedWords wordsObj={wordsObj} />
        </span>
      </div>
    );
  }

  if (path == "/signin" || path == "/signup") {
    return <></>;
  }

  if (path == "/profile") {
    return <h1 className="font-poppins text-xl font-medium">Profile</h1>;
  }

  return (
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
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  if (path == "/signin" || path == "/signup") {
    return <main>{children}</main>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-screen">
        <AppSideBar />

        <SidebarInset className="w-full">
          <div className="flex w-full flex-col">
            {/* Fixed Searchbar */}
            <header className="sticky top-0 z-50 flex h-15 items-center gap-4 border-b bg-transparent px-4 py-3 backdrop-blur-lg md:justify-center">
              <MobileMenuToggle />
              <DyanmicHeader />
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
