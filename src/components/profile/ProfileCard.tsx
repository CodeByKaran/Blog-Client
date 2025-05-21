"use client";

import { useReducer, useState } from "react";
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
import {
  Pencil,
  Camera,
  X,
  Save,
  Mail,
  User,
  Info,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkSameUsername, UpdateUserData, updateUserInfo } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useDebounce } from "@uidotdev/usehooks";

const initialState = {
  name: "",
  username: "",
  email: "",
  bio: "",
  avatar: "",
};

// Define reducer function
function userReducer(
  state: typeof initialState,
  action: { type: string; payload?: typeof initialState },
) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function ProfileCard() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, dispatch] = useReducer(userReducer, initialState);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    dispatch({
      type: "update",
      payload: {
        ...user,
        [name]: value,
      },
    });
  };

  const debouncedUsername = useDebounce(user.username, 500);

  const { isFetching: isCheckingUsername, data: usernameAvailability } =
    useQuery({
      queryKey: ["checkUsername", debouncedUsername],
      queryFn: () => checkSameUsername(debouncedUsername),
      enabled: debouncedUsername?.length >= 3,
      retry: false,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    });

  const updateUserProfile = useMutation({
    mutationFn: (data: UpdateUserData) => updateUserInfo(data),
    onSuccess: (res: any) => {
      router.push("/");
      dispatch({
        type: "update",
        payload: {
          name:
            res.response.data.first_name + " " + res.response.data.last_name,
          username: res.response.data.username,
          email: res.response.data.email,
          avatar: res.response.data.avatar,
          bio: res.response.data.bio,
        },
      });
    },
    onError: (err: any) => {
      toast.error(`${err.response.data.message}`);
    },
  });

  const handleSave = () => {
    const data = {
      username: user.username,
      bio: user.bio,
    };
    updateUserProfile.mutate(data);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-transparent font-poppins">
      {/* Header background */}
      <div className="pattern z-10 h-24 w-full bg-gradient-to-t from-gray-950 to-transparent"></div>

      {/* User info container */}
      <div className="z-20 p-6 pt-3">
        <div className="-mt-12 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
          <div className="group relative">
            <div className="relative h-24 w-24 rounded-full border-4 border-gray-900">
              <Image
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                }
                alt={user.name}
                width={96}
                height={96}
                className="h-full w-full rounded-full object-cover"
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
                  <div className="relative grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex items-center rounded-md border border-gray-700 bg-gray-800 px-3">
                      <span className="text-gray-400">@</span>
                      <Input
                        onChange={handleChange}
                        name="username"
                        type="text"
                        id="username"
                        defaultValue={user.username}
                        className="ml-2 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="absolute top-10 right-5 -translate-y-1/2">
                      {isCheckingUsername && (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      )}
                      {!isCheckingUsername &&
                        usernameAvailability?.data?.exists === false &&
                        user.username?.length >= 3 && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      {!isCheckingUsername &&
                        usernameAvailability?.data?.exists === true && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                    </div>
                    {!isCheckingUsername &&
                      usernameAvailability === false &&
                      user.username?.length >= 3 && (
                        <p className="text-xs text-red-500">
                          Username is already taken
                        </p>
                      )}
                    {!isCheckingUsername &&
                      usernameAvailability === true &&
                      user.username?.length >= 3 && (
                        <p className="text-xs text-green-500">
                          Username is available
                        </p>
                      )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Bio</Label>
                    <div className="relative">
                      <Info className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        name="bio"
                        id="bio"
                        defaultValue={user.bio}
                        className="resize-none border-gray-700 bg-gray-800 pl-10"
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                          dispatch({
                            type: "update",
                            payload: {
                              ...user,
                              [e.target.name]: e.target.value,
                            },
                          });
                        }}
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
                    onClick={handleSave}
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
