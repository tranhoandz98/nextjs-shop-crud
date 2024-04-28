import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./app-provider";
import SlideSession from "@/components/slide-session";
import { baseOpenGraph } from "./shared-metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Productic',
    default: 'Productic'
  },
  description: 'Được tạo bởi Hoantv',
  openGraph: baseOpenGraph
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Header />
            <main className="container">{children}</main>
            <SlideSession />
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
