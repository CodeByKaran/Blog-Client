import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSectionProps {
  username?: string;
  isLoggedIn?: boolean;
}

const ProfileSection = ({ username = "Karan" }: ProfileSectionProps) => {
  return (
    <div className="mt-3 pl-2">
      <div className="group flex cursor-pointer items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 cursor-default">
          <p className="truncate text-sm font-medium text-gray-100">
            {username}
          </p>
        </div>
      </div>
      <div className="mt-2 flex cursor-default flex-col items-start rounded-md">
        <h3 className="font-poppins font-medium text-gray-100">About Me</h3>
        <p className="font-poppins text-[0.8rem] font-normal text-gray-50">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
          voluptatem quisquam itaque praesentium soluta nulla quasi earum
          ratione, incidunt dicta?
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
