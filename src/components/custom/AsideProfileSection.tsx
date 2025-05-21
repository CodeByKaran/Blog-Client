import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

interface ProfileSectionProps {
  username?: string;
  image?: string;
  isLoading?: boolean;
}

const ProfileSection = ({
  username,
  image,
  isLoading,
}: ProfileSectionProps) => {
  if (isLoading) {
    return (
      <div className="mt-2 animate-pulse rounded-md bg-background p-2 transition-all duration-300 hover:bg-background/50 md:pl-2">
        <div className="group flex cursor-pointer items-center gap-3">
          <Avatar className="animate-pulse">
            <AvatarImage src="" />
            <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 cursor-default">
            <p className="truncate text-sm font-medium text-gray-100"></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-md bg-background p-2 transition-all duration-300 hover:bg-background/50 md:pl-2">
      <div className="profile flex cursor-pointer items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          <Avatar>
            <AvatarImage
              src={
                image ||
                "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              }
            />
            <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 cursor-default">
            <p className="truncate text-sm font-medium text-gray-100">
              {username}
            </p>
          </div>
        </div>
        <div className="">
          <ArrowRight className="profileArrow h-4 w-4 text-gray-100 duration-300" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
