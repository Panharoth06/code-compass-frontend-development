import type React from "react";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "./globals.css";

import { Navbar1 } from "@/components/general/navbar1";
import { Footer2 } from "@/components/general/footer2";
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
              <div className="min-h-screen flex flex-col">
                <header className="container-default shrink-0">
                  <Navbar1 />
                </header>

                <main className="container-default flex-1 min-h-0">
                  {children}
                </main>

                <footer className="container-default shrink-0">
                  <Footer2 />
                </footer>
              </div>
            </ThemeProvider>
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
