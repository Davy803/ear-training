import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ear Training App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800">
          <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              <Link href={"/"}> Ear Training App</Link>
            </h1>
            <div className="flex items-center gap-4">
              Login coming soon.
              <Link
                className="text-gray-600 dark:text-gray-300 hover:underline"
                href="#"
              >
                Profile
              </Link>
              <Link
                className="text-gray-600 dark:text-gray-300 hover:underline"
                href="#"
              >
                Logout
              </Link>
            </div>
          </header>
          <div className="flex min-min-h-screen flex-col items-center justify-between p-24">
            {children}
          </div>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
