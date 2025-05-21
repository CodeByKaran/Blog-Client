"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "@/lib/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

interface LoginFormProps {
  session?: string;
  isLoading?: boolean;
}

const LinkWraper = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href} className="w-auto">
      {children}
    </Link>
  );
};

const LoginLogoutButton = ({ session, isLoading }: LoginFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      router.push("/signin");
    },
  });

  const handleLogOut = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };
  if (isLoading)
    return (
      <Button
        variant={"outline"}
        className="center w-full animate-pulse"
      ></Button>
    );

  return (
    <>
      {session ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"destructive"}
              className="w-full hover:bg-background/50"
              disabled={logoutMutation.isPending}
            >
              LogOut
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[525px]"
            aria-describedby="dialog content"
          >
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div>
                <p className="font-poppins text-sm font-medium text-gray-50">
                  are you sure want to log out!
                </p>
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
                  onClick={handleLogOut}
                  className="bg-red-600 text-gray-100 hover:bg-red-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  ok
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <LinkWraper href="signin">
            <Button variant={"outline"} className="w-full">
              Login
            </Button>
          </LinkWraper>
          <LinkWraper href="signup">
            <Button variant={"secondary"} className="w-full">
              Create New Account
            </Button>
          </LinkWraper>
        </>
      )}
    </>
  );
};

export default LoginLogoutButton;
