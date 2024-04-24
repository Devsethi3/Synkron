import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import db from "@/lib/supabase/db";
import { ThemeProvider } from "@/providers/NextThemeProvider";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster";
import AppStateProvider from "@/providers/StateProvider";
import { SupabaseUserProvider } from "@/providers/SupabaseUserProvider";
import NextTopLoader from "nextjs-toploader";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(db);

  return (
    <html lang="en">
      <body className={twMerge("bg-background", font.className)}>
        <AppStateProvider>
          <SupabaseUserProvider>
            <NextTopLoader
              color="#7C3AED"
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={false}
              easing="ease"
            />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </SupabaseUserProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
