import React from "react";

interface MainBarProps {
  children: React.ReactNode;
}

const MainBar = ({ children }: MainBarProps) => {
  return (
    <main className="min-h-screen flex-1 overflow-y-auto text-gray-100">
      {children}
    </main>
  );
};

export default MainBar;
