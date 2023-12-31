"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { account } from "@/config/appwrite-client";
import Alert from "./Alert";

export default function Navbar() {
  const params = useSearchParams();
  const alert = params.get("alert");
  const message = params.get("message");
  const [user, setUser] = useState(null);

  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

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
          Support by giving the GitHub repo a STAR
        </Link>
      </div>


      <div className="navbar bg-base-100 relative">
        <div className="flex-1">
          <p className="text-xl m-2 inline">
            GitHub Repo Rater{" "}
            <span className="text-sm text-gray-400 hidden md:inline">
              ... more than a vanity star rating!
            </span>
          </p>
        </div>
        <button className="md:hidden inline-block ms-auto" onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 -mb-1.5 ms-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16">

            </path>
          </svg>
        </button>
        <div className="flex-none">
          <ul className={`menu menu-horizontal px-1 md:flex 
          ${!isMobileMenuVisible ? 'hidden':
              'absolute md:static md:flex-row md:h-[auto] top-12 left-0 right-0 bottom-0 h-[82dvh] flex flex-col bg-base-100 mobile-navbar'}`}>
            <li>
              <Link href="/" onClick={() => setIsMobileMenuVisible(false)}>List Ratings</Link>
            </li>
            <li>
              <Link href="/popular" onClick={() => setIsMobileMenuVisible(false)}>Popular Ratings</Link>
            </li>
            <li>
              <Link href="/rankings" onClick={() => setIsMobileMenuVisible(false)}>User Rankings</Link>
            </li>
            {user && (
              <li>
                <Link href="/rate" onClick={() => setIsMobileMenuVisible(false)}>Add Rating</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link href="/auth/login" onClick={() => setIsMobileMenuVisible(false)}>Login</Link>
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
