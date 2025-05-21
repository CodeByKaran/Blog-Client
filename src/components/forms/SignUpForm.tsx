"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  EyeIcon,
  EyeOffIcon,
  Loader2,
  Camera,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkAndVerifyOtp,
  checkSameUsername,
  refreshOtp,
  signUp,
} from "@/lib/fetch";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "sonner";

// Define Zod schema for form validation
const signupSchema = z
  .object({
    email: z.string().email("Email is invalid"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    first_name: z.string().min(3, "First name must be at least 3 characters"),
    last_name: z.string().min(3, "Last name must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
    },
  });
  const username = watch("username");
  const debouncedUsername = useDebounce(username, 500);

  // Form submission mutation
  const submitForm = useMutation({
    mutationFn: (data: SignupFormData) => signUp(data),
    onSuccess: (res: any) => {
      toast.success(
        `verification code has sent to your email , please check spam in case not found!`,
        {
          duration: 6000,
        },
      );
      setStep(2);
    },
    onError: (err: any) => {
      toast.error(`${err.response.data.message}`, {
        duration: 6000,
      });
    },
  });

  const { isFetching: isCheckingUsername, data: usernameAvailability } =
    useQuery({
      queryKey: ["checkUsername", debouncedUsername],
      queryFn: () => checkSameUsername(debouncedUsername),
      enabled: debouncedUsername?.length >= 3,
      retry: false,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    });

  // OTP verification mutation
  const verifyOtp = useMutation({
    mutationFn: (otp: string) => checkAndVerifyOtp(watch("email"), otp),
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (err: any) => {
      toast.error(`${err.response.data.message}`);
    },
  });

  // Resend OTP mutation
  const resendOtpMutation = useMutation({
    mutationFn: () => refreshOtp(watch("email")),
    onSuccess: () => {
      toast.success(
        `verification code has sent to your email, please check spam in case not found!`,
        {
          duration: 6000,
        },
      );
      setOtp(["", "", "", "", "", ""]);
      const firstInput = document.getElementById("otp-0");
      if (firstInput) {
        firstInput.focus();
      }
    },
    onError: (err: any) => {
      toast.error(`${err.response.data.message}`);
    },
  });

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const SubmitForm = (data: SignupFormData) => {
    // Don't proceed if username is already taken
    if (usernameAvailability?.data?.exists) {
      return;
    }

    if (step === 1) {
      submitForm.mutate(data);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      verifyOtp.mutate(otpValue);
    }
  };

  const resendOtp = () => {
    resendOtpMutation.mutate();
  };

  return (
    <div className="mt-6">
      {step === 1 ? (
        <form onSubmit={handleSubmit(SubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              {...register("first_name")}
              type="text"
              placeholder="Enter your first name"
              className={`border-gray-700 bg-gray-900/50 backdrop-blur-sm ${errors.first_name ? "border-red-500" : ""}`}
              disabled={submitForm.isPending}
            />
            {errors.first_name && (
              <p className="text-xs text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              {...register("last_name")}
              type="text"
              placeholder="Enter your last name"
              className={`border-gray-700 bg-gray-900/50 backdrop-blur-sm ${errors.last_name ? "border-red-500" : ""}`}
              disabled={submitForm.isPending}
            />
            {errors.last_name && (
              <p className="text-xs text-red-500">{errors.last_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              className={`border-gray-700 bg-gray-900/50 backdrop-blur-sm ${
                errors.email ? "border-red-500" : ""
              }`}
              disabled={submitForm.isPending}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                {...register("username")}
                placeholder="Choose a unique username"
                className={`border-gray-700 bg-gray-900/50 pr-10 backdrop-blur-sm ${
                  errors.username ? "border-red-500" : ""
                }`}
                disabled={submitForm.isPending}
              />
              <div className="absolute top-2.5 right-3">
                {isCheckingUsername && (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                )}
                {!isCheckingUsername &&
                  usernameAvailability?.data?.exists === false &&
                  watch("username")?.length >= 3 && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                {!isCheckingUsername &&
                  usernameAvailability?.data?.exists === true && (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
              </div>
            </div>
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
            {!errors.username &&
              usernameAvailability === false &&
              username?.length >= 3 && (
                <p className="text-xs text-red-500">
                  Username is already taken
                </p>
              )}
            {!errors.username &&
              usernameAvailability === true &&
              username?.length >= 3 && (
                <p className="text-xs text-green-500">Username is available</p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                className={`border-gray-700 bg-gray-900/50 pr-10 backdrop-blur-sm ${
                  errors.password ? "border-red-500" : ""
                }`}
                disabled={submitForm.isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-300"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`border-gray-700 bg-gray-900/50 pr-10 backdrop-blur-sm ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                disabled={submitForm.isPending}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-300"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-2 w-full bg-purple-600 hover:bg-purple-700"
            disabled={submitForm.isPending || isCheckingUsername}
          >
            {submitForm.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                Account
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Sign in
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg border border-purple-800/30 bg-purple-900/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-purple-900/20 p-2">
                <AlertCircle className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-purple-300">
                  We&apos;ve sent a verification code to{" "}
                  <span className="font-medium">{watch("email")}</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp-0">Enter Verification Code</Label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="h-12 w-12 border-gray-700 bg-gray-900/50 text-center text-lg"
                    disabled={verifyOtp.isPending}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={verifyOtp.isPending}
              >
                {verifyOtp.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
                  </>
                ) : (
                  "Verify & Complete"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-sm text-purple-400 hover:text-purple-300"
                  disabled={verifyOtp.isPending || resendOtpMutation.isPending}
                >
                  {resendOtpMutation.isPending
                    ? "Sending new code..."
                    : "Didn't receive a code? Resend"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
