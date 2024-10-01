"use server";

import Image from "next/image";
import { Query, Databases } from "node-appwrite";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { clientAdmin } from "@/config/appwrite-server";
import { classNames } from "@/utils/classNames";
import Link from "next/link";

const statuses = {
  research: "text-orange-500 bg-orange-100/10",
  recommend: "text-green-400 bg-green-400/10",
  caution: "text-rose-400 bg-rose-400/10",
};
const badges = {
  research: "text-orange-500 bg-orange-100/10 ring-orange-400/20",
  recommend: "text-green-400 bg-green-400/10 ring-green-400/20",
  caution: "text-rose-400 bg-rose-400/10 ring-rose-400/20",
};

export default async function Users() {
  const ratings = await new Databases(clientAdmin()).listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RATINGS_ID,
    [Query.limit(1000)],
  );
  const users = ratings.documents.reduce((acc, rating) => {
    if (!acc[rating.username]) {
      acc[rating.username] = {
        votes: 0,
        stars: 0,
      };
    }
    acc[rating.username].votes += 1;
    acc[rating.username].stars += rating.rating;
    return acc;
  }, {});

  return (
    <ul role="list" className="divide-y divide-white/5">
      {Object.entries(users)
        .sort((a, b) => b[1].votes - a[1].votes)
        .slice(0, 10)
        .map(([username, user]) => ({
          username,
          votes: user.votes,
          stars: user.stars,
        }))
        .map((user) => (
          <li
            key={user.$id}
            className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <Image
              className="inline-block rounded-md h-12 w-12"
              src={`https://github.com/${user.username}.png`}
              alt={`Profile picture for user ${user.username}`}
              width={40}
              height={40}
            />
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div
                  className={classNames([
                    statuses.recommend,
                    "flex-none rounded-full p-1",
                  ])}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <Link
                    href={`https://github.com/${user.username}`}
                    className="flex gap-x-2"
                    target="_blank"
                  >
                    <span className="truncate">GitHub</span>
                    <span className="text-gray-400">/</span>
                    <span className="whitespace-nowrap">{user.username}</span>
                    <span className="absolute inset-0" />
                  </Link>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                <p className="truncate">Rated many repos</p>
                <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5 flex-none fill-gray-300"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="whitespace-nowrap">Popular</p>
              </div>
            </div>
            <div
              className={classNames([
                badges.recommend,
                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset",
              ])}
            >
              {((user.stars / 5 / user.votes) * 100).toFixed(1)}% ({user.votes})
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </li>
        ))}
    </ul>
  );
}
