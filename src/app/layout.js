import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import SearchBar from "@/components/SearchBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SearchBar />
        <Analytics />
      </body>
    </html>
  );
}
