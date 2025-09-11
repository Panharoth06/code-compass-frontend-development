import type React from "react";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "../globals.css";

import { ThemeProvider } from "@/components/general/ThemeProvider";
import { Providers } from "@/components/problemdetailComponents/problemsImpl/providers";

const barlow = Barlow({
  weight: "400",
  variable: "--font-barlow",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning className={barlow.className}>
      <body className={`${barlow.variable} antialiased`}>
        <Suspense fallback={null}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
            </ThemeProvider>
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
