"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

import { account } from "@/config/appwrite-client";
import Alert from "./Alert";

export default function Navbar() {
  const params = useSearchParams();
  const alert = params.get("alert");
  const message = params.get("message");
  const [user, setUser] = useState(null);
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
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <p className="text-xl m-2 hidden sm:inline">
            GitHub Repo Rater{" "}
            <span className="text-sm text-gray-400 hidden md:inline">
              ... more than a vanity star rating!
            </span>
          </p>
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
        <SearchBar />
      </div>
      {alert && <Alert message={message} />}
    </>
  );
}
