import React from "react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSectionProps {
  username?: string;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const ProfileSection = ({
  username = "Karan",
  isLoggedIn = false,
  onLogin = () => {},
  onLogout = () => {},
}: ProfileSectionProps) => {
  return (
    <div className="mt-3">
      <div className="group flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 cursor-default">
          <p className="truncate text-sm font-medium text-gray-100">
            {username}
          </p>
        </div>

        {isLoggedIn ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={onLogout}
            className="bg-red-500 text-gray-100"
          >
            logout <LogOut className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={onLogin}
            className="bg-blue-600 text-gray-100 hover:bg-blue-800"
          >
            login <LogIn className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="mt-5 flex cursor-default flex-col items-start rounded-md bg-background/1 p-2">
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
