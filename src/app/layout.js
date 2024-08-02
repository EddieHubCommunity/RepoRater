import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { classNames } from "@/utils/classNames";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RepoRater: Rate GitHub Repos for Developer Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-900">
      <body className={classNames(["h-full", inter.className])}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
