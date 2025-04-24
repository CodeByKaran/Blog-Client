import { SignupForm } from "@/components/forms/SignUpForm";
import { AuthLayout } from "@/components/layout/AuthLayout";
import React from "react";

const SignUp = () => {
  return (
    <AuthLayout
      title="Create an account"
      description="Sign up to start sharing your stories with the world"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default SignUp;
