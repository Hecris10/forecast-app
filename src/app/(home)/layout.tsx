import type { Metadata } from "next";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Providers } from "@/components/providers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "../globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased w-screen">
        <Providers>
          <AppSidebar />
          <main className="w-full relative">
            <SidebarTrigger className="absolute top-4 left-4" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
