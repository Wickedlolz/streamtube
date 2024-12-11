"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import client from "@/lib/queryClient";
import { FirebaseProvider } from "@/contexts/FirebaseContext";
import { ThemeProvider } from "next-themes";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <QueryClientProvider client={client}>
        <FirebaseProvider>
          <Header />
          <main className="dark:bg-black">{children}</main>
          <Toaster />
          <Footer />
        </FirebaseProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
