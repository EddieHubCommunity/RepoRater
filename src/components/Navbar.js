"use client";

import Link from "next/link";

import { account } from "@/config/appwrite-client";
import { useEffect, useState } from "react";

export default function Navbar() {
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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <p className="text-xl m-2">
          GitHub Repo Rater{" "}
          <span className="text-sm text-gray-400">
            ... more than a vanity star rating!
          </span>
        </p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">List Ratings</Link>
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
  );
}
