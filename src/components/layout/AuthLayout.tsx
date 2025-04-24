import type React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
  showLogo?: boolean;
}

export function AuthLayout({
  children,
  title,
  description,
  footer,
  showLogo = false,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="relative container flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Background decoration */}
        <div className="fixed inset-0 h-full w-screen overflow-hidden">
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-900/20 blur-[100px]" />
          <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-800/20 blur-[100px]" />
        </div>

        {/* Left side - Form */}
        <div className="relative flex w-full flex-col items-center justify-center space-y-6 p-8 md:p-12 lg:p-16">
          {showLogo && (
            <Link
              href="/"
              className="absolute top-8 left-8 flex items-center text-2xl font-bold text-purple-500"
            >
              <span className="text-white">N</span>arrate
            </Link>
          )}
          <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
          {footer && <div className="mt-4">{footer}</div>}
        </div>

        {/* Right side - Image/Decoration */}
        <div className="fixed right-0 hidden h-full w-1/2 border-l lg:block">
          <div className="relative h-full w-full">
            <div className="absolute inset-0" />
            <Link
              href="/"
              className="absolute top-8 left-8 flex items-center text-2xl font-bold text-purple-500"
            >
              <span className="text-white">N</span>arrate
            </Link>
            <div className="relative z-20 flex h-full flex-col items-center justify-center px-12">
              <div className="mx-auto w-full max-w-md space-y-6 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Share Your Story
                  </h2>
                  <p className="text-gray-400">
                    Join our community of storytellers and share your
                    experiences with the world.
                  </p>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4 rounded-lg border border-gray-800 p-4 backdrop-blur-sm">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">
                        Alex Johnson
                      </p>
                      <p className="text-xs text-gray-400">
                        &quot;Narrate has transformed how I share my experiences
                        with the world.&quot;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rounded-lg border border-gray-800 p-4 backdrop-blur-sm">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">
                        Sam Wilson
                      </p>
                      <p className="text-xs text-gray-400">
                        &quot;The community here is amazing. I&apos;ve found my
                        creative voice.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
