"use client";

import { Search, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("search clicked");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      inputRef.current?.focus();
    }

    if (e.key === "Escape" && document.activeElement === inputRef.current) {
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="z-50 flex w-full items-center justify-center py-2">
      <form action="search" onSubmit={handleSearch}>
        <div className="relative ml-12 flex items-center gap-x-2 rounded-full border border-gray-500/30 bg-black-show/60 px-3 py-2 sm:ml-0">
          <span>
            <Search className="h-5 w-5" />
          </span>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="flex h-9 w-[300px] items-center font-poppins text-sm font-thin text-gray-100/80 outline-0 placeholder:text-gray-100/80 max-s450:w-full md:w-[600px]"
            placeholder="codings . . ."
          />
          {inputValue && (
            <motion.span
              onClick={() => setInputValue("")}
              className="absolute top-1/2 right-14 -translate-y-1/2 cursor-pointer"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
              }}
            >
              <X className="h-4 w-4" />
            </motion.span>
          )}
          <kbd className="pointer-events-none hidden h-5 items-center gap-1 rounded border border-none bg-gray-900/90 px-1.5 py-3 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
