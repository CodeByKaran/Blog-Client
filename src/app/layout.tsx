import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import GradientBackground from "@/components/custom/GradientBackground";
import AppLayout from "@/components/custom/AppLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Narrate",
  description:
    "Narrate is a sleek and intuitive blogging platform designed for modern storytellers. Whether you're sharing personal experiences, industry insights, or creative pieces, Narrate gives you the tools to publish with clarity, style, and reach. Write freely, connect deeply, and let your voice be heard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-black antialiased`}>
        <GradientBackground />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
