"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample user data
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Sam Wilson",
    username: "samw",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Taylor Swift",
    username: "taylors",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Jamie Smith",
    username: "jamies",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Jordan Lee",
    username: "jordanl",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    name: "Casey Morgan",
    username: "caseym",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    name: "Riley Cooper",
    username: "rileyc",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle clicks outside the search component to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-72 border-l bg-transparent">
      <div className="flex h-full flex-col">
        {/* Sticky Search Header */}
        <div
          className="sticky top-0 z-10 border-b bg-transparent p-4"
          ref={searchRef}
        >
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />

            {/* Suggestions Dropdown */}
            {isFocused && (
              <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 absolute top-full right-0 left-0 z-50 mt-1 max-h-64 overflow-y-auto rounded-md border bg-background shadow-lg">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex cursor-pointer items-center gap-3 p-3 hover:bg-muted"
                      onClick={() => {
                        setSearchQuery(user.username);
                        setIsFocused(false);
                      }}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-muted-foreground">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Content */}
        <div className="flex-1 p-4">
          <h3 className="mb-4 text-lg font-medium">Online Users</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white"></span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-medium">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b pb-3 last:border-0">
                  <p className="text-sm">
                    <span className="font-medium">Alex Johnson</span> commented
                    on your post
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
