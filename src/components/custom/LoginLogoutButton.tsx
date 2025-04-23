import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const isLoggedIn = false;

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

const LoginLogoutButton = () => {
  return (
    <>
      {isLoggedIn ? (
        <LinkWraper href="signup">
          <Button variant={"destructive"} className="w-full">
            LogOut
          </Button>
        </LinkWraper>
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
