import { LoginForm } from "@/components/forms/SignInForm";
import { AuthLayout } from "@/components/layout/AuthLayout";
import React from "react";

const SignIn = () => {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      {" "}
      <LoginForm />
    </AuthLayout>
  );
};

export default SignIn;
