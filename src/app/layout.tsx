import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { syncUser } from "@/lib/actions";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Connectly — Social Network", template: "%s | Connectly" },
  description: "Connect with friends, share moments, and discover communities on Connectly.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon1.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Connectly — Social Network",
    description: "Connect with friends, share moments, and discover communities.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Don't await — run in background, don't block page render
  syncUser().catch(() => {});
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <div className="w-full bg-white dark:bg-gray-900 px-4 md:px-7 lg:px-16 xl:px-32 2xl:px-64 sticky top-0 z-50 shadow-sm dark:shadow-gray-800/50 dark:border-b dark:border-gray-800">
              <Navbar />
            </div>
            <div className="bg-slate-50 dark:bg-gray-950 min-h-screen px-4 md:px-7 lg:px-16 xl:px-32 2xl:px-64">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
