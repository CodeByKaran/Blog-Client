"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Camera, X, Save, Mail, User } from "lucide-react";

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-transparent font-poppins">
      {/* Header background */}
      <div className="pattern z-10 h-24 w-full bg-gradient-to-t from-gray-950 to-transparent"></div>

      {/* User info container */}
      <div className="z-20 p-6 pt-3">
        <div className="-mt-12 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
          <div className="group relative">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-gray-900">
              <Image
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                }
                alt={user.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-6 flex-1 sm:mt-0">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <div className="mt-1 flex items-center text-gray-400">
              <span className="text-sm">@{user.username}</span>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-700">
                      <Image
                        src={
                          user.avatar || "/placeholder.svg?height=200&width=200"
                        }
                        alt={user.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute right-0 bottom-0 flex items-center justify-center rounded-full bg-purple-600 p-2 text-white shadow-lg">
                      <Camera className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue={user.name}
                      className="border-gray-700 bg-gray-800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex items-center rounded-md border border-gray-700 bg-gray-800 px-3">
                      <span className="text-gray-400">@</span>
                      <Input
                        id="username"
                        defaultValue={user.username}
                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="border-gray-700 bg-gray-800 pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="border-gray-700"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Additional user info */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-3 rounded-lg bg-gray-800 p-3">
            <div className="rounded-full bg-gray-700 p-2">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Email</span>
              <span className="text-sm text-white">{user.email}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 rounded-lg bg-gray-800 p-3">
            <div className="rounded-full bg-gray-700 p-2">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Full Name</span>
              <span className="text-sm text-white">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
