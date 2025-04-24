"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  profileImage: string | null;
  agreeToTerms: boolean;
}

export function SignupForm() {
  const router = useRouter();
  const [step, setStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    agreeToTerms: false,
  });

  // Form validation states
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Check username availability after typing stops
    if (name === "username" && value.length > 2) {
      setIsCheckingUsername(true);
      // Simulate API call to check username availability
      setTimeout(() => {
        // For demo purposes, usernames containing "admin" are unavailable
        const available = !value.toLowerCase().includes("admin");
        setIsUsernameAvailable(available);
        setIsCheckingUsername(false);
      }, 800);
    } else if (name === "username") {
      setIsUsernameAvailable(null);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just use a placeholder
      setFormData({
        ...formData,
        profileImage: "/placeholder.svg?height=200&width=200",
      });
    }
  };

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

  const validateForm = () => {
    const newErrors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: "",
    };

    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (isUsernameAvailable === false) {
      newErrors.username = "Username is already taken";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (validateForm()) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
          setStep(2);
        }, 1500);
      }
    } else if (step === 2) {
      // Validate OTP
      if (otp.join("").length === 6) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
          router.push("/signin");
        }, 1500);
      }
    }
  };

  const resendOtp = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset OTP fields
      setOtp(["", "", "", "", "", ""]);
      // Focus on first input
      const firstInput = document.getElementById("otp-0");
      if (firstInput) {
        firstInput.focus();
      }
    }, 1500);
  };

  return (
    <div className="mt-6">
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`border-gray-700 bg-gray-900/50 backdrop-blur-sm ${
                errors.email ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                name="username"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleInputChange}
                className={`border-gray-700 bg-gray-900/50 pr-10 backdrop-blur-sm ${
                  errors.username ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              <div className="absolute top-2.5 right-3">
                {isCheckingUsername && (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                )}
                {!isCheckingUsername && isUsernameAvailable === true && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {!isCheckingUsername && isUsernameAvailable === false && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username}</p>
            )}
            {!errors.username &&
              isUsernameAvailable === true &&
              formData.username.length > 0 && (
                <p className="text-xs text-green-500">Username is available</p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-image">Profile Picture (Optional)</Label>
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-800">
                {formData.profileImage ? (
                  <Image
                    src={formData.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-700 bg-gray-800"
                  onClick={() =>
                    document.getElementById("profile-image")?.click()
                  }
                  disabled={isLoading}
                >
                  Upload Photo
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border-gray-700 bg-gray-900/50 pr-10 backdrop-blur-sm ${
                  errors.password ? "border-red-500" : ""
                }`}
                disabled={isLoading}
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
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`border-gray-700 bg-gray-900/50 pr-10 backdrop-blur-sm ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                disabled={isLoading}
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
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  agreeToTerms: checked === true,
                })
              }
              disabled={isLoading}
            />
            <label
              htmlFor="agreeToTerms"
              className={`text-xs leading-tight ${errors.agreeToTerms ? "text-red-500" : "text-gray-300"}`}
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-500">{errors.agreeToTerms}</p>
          )}

          <Button
            type="submit"
            className="mt-2 w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading || isCheckingUsername}
          >
            {isLoading ? (
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
                  <span className="font-medium">{formData.email}</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
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
                  disabled={isLoading}
                >
                  Didn &apos; t receive a code? Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
