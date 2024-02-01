"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { client } from "@/config/appwrite-client";

export default function Activity() {
  const [activity, setActivity] = useState([]);

  const getActivity = async () => {
    const res = await fetch("/api/activity");
    const data = await res.json();
    setActivity(data);
  };

  useEffect(() => {
    const events = [
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RATINGS_ID}.documents`,
    ];
    client.subscribe(events, () => getActivity());
    getActivity();
  }, []);

  return (
    <>
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Activity feed
        </h2>
        {/* <a
      href="#"
      className="text-sm font-semibold leading-6 text-indigo-400"
    >
      View all
    </a> */}
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {activity.map((rating, idx) => (
          <li key={idx} className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-3">
              <Link
                href={`https://github.com/${rating.username}`}
                target="_blank"
              >
                <Image
                  className="h-6 w-6 flex-none rounded-full bg-gray-800"
                  src={`https://github.com/${rating.username}.png`}
                  alt={`Logo for ${rating.name}`}
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href={`https://github.com/${rating.username}`}
                target="_blank"
                className="flex-auto truncate text-sm font-semibold leading-6 text-white"
              >
                {rating.username}
              </Link>
              <time
                dateTime={rating.$updatedAt}
                className="flex-none text-xs text-gray-400"
              >
                {rating.timeAgo}
              </time>
            </div>
            <p className="mt-3 truncate text-sm text-gray-400">
              Rated{" "}
              <Link
                href={`/rate?owner=${rating.owner}&name=${rating.name}`}
                className="text-green-500"
              >
                {rating.owner}/{rating.name}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
