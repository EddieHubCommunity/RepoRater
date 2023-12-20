"use client";

import { useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();
  const alert = searchParams.get("alert");
  const message = searchParams.get("message");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {alert && <Alert message={message} />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
