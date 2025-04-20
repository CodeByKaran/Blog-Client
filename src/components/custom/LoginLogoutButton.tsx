import React from "react";
import { Button } from "../ui/button";

const isLoggedIn = false;

const LoginLogoutButton = () => {
  return (
    <>
      {isLoggedIn ? (
        <Button variant={"destructive"}>LogOut</Button>
      ) : (
        <>
          <Button variant={"outline"}>Login</Button>
          <Button variant={"secondary"} className="">
            Create New Account
          </Button>
        </>
      )}
    </>
  );
};

export default LoginLogoutButton;
