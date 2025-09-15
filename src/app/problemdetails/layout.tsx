import type React from "react";
import type { Metadata } from "next";
import "../globals.css";

import { ThemeProvider } from "@/components/general/ThemeProvider";
import { Providers } from "@/components/problemdetailComponents/problemsImpl/providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "CodeCompass",
  description: "Interactive coding platform with Monaco editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster />
    </Providers>
  );
}
