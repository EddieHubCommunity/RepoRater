"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { account } from "@/config/appwrite-client";
import Alert from "./Alert";
import Logo from "@/assets/repo-rater-logo.svg";
import Image from "next/image";

export default function Navbar() {
  const params = useSearchParams();
  const alert = params.get("alert");
  const message = params.get("message");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const getUser = async () => {
    try {
      const user = await account.getSession("current");
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="flex justify-center p-2 bg-green-500 text-black">
        <Link
          href="https://github.com/EddieHubCommunity/RepoRater"
          target="_blank"
        >
          Support by giving the RepoRater a STAR on GitHub
        </Link>
      </div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="flex flex-row">
            <Image src={Logo} alt="RepoRater Logo" width={40} height={40} className="cursor-pointer" onClick={() => router.push("/")} />
            <p className="text-xl m-2 hidden sm:inline">
              RepoRater{" "}
              <span className="text-sm text-gray-400 hidden md:inline">
                ... community ratings for GitHub Repositories
              </span>
            </p>
          </div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">List Ratings</Link>
            </li>
            <li>
              <Link href="/popular">Popular Ratings</Link>
            </li>
            <li>
              <Link href="/rankings">User Rankings</Link>
            </li>
            {user && (
              <li>
                <Link href="/rate">Add Rating</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
            )}
            {user && (
              <li>
                <Link href="/auth/login" onClick={logout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {alert && <Alert message={message} />}
    </>
  );
}
