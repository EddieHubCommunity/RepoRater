"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { client } from "@/config/appwrite-client";
import { classNames } from "@/utils/classNames";
import { abbreviateNumber } from "@/utils/abbreviateNumbers";

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
const groups = {
  recommend: 70,
  research: 40,
};

const calStatus = (percentage) => {
  if (percentage >= groups.recommend) {
    return "recommend";
  }
  if (percentage >= groups.research && percentage < groups.recommend) {
    return "research";
  }
  return "caution";
};

export default function Repos({ minimumVotes = 5, keyword, sort }) {
  const [repos, setRepos] = useState([]);
  const getRepos = async () => {
    const params = [];
    if (minimumVotes) {
      params.push(`minimumVotes=${minimumVotes}`);
    }
    if (keyword) {
      params.push(`keyword=${keyword}`);
    }
    if (sort) {
      params.push(`sort=${sort}`);
    }
    const res = await fetch(
      `/api/repos${params.length ? `?${params.join("&")}` : ""}`
    );

    const data = await res.json();

    const repos = data.map((repo) => {
      const percentage = Math.round((repo.rating / 5) * 100);
      return {
        ...repo,
        percentage,
        status: calStatus(percentage),
      };
    });

    setRepos(repos);
  };

  useEffect(() => {
    const events = [
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REPOS_ID}.documents`,
    ];
    client.subscribe(events, () => getRepos());
    getRepos();
  }, [keyword, sort]);

  return (
    <ul role="list" className="divide-y divide-white/5">
      {repos.map((repo, idx) => (
        <li
          key={idx}
          className={classNames([
            "relative sm:flex items-center w-full sm:w-auto space-y-4 sm:space-x-4 space-x-0 sm:space-y-0 px-4 py-4 sm:px-6 lg:px-8",
            repo.topics.length && "tooltip",
          ])}
          data-tip={repo.topics.join(", ")}
        >
          <Image
            className="hidden w-12 h-12 rounded-md sm:block"
            src={repo.logo}
            alt={`Logo for ${repo.owner}/${repo.name}`}
            width={40}
            height={40}
          />
          <div className="flex-auto min-w-0">
            <div className="flex items-start gap-x-3">
              <div
                className={classNames([
                  statuses[repo.status],
                  "flex-none mt-1 rounded-full p-1",
                ])}
              >
                <div className="w-2 h-2 bg-current rounded-full" />
              </div>
              <div className="flex flex-row flex-wrap items-center gap-2 md:gap-4">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <Link
                    href={`/rate?owner=${repo.owner}&name=${repo.name}`}
                    className="inline-block w-full text-left whitespace-normal"
                  >
                    {repo.owner}
                    <span className="mx-2 text-gray-400">/</span>
                    {repo.name}
                    <span className="absolute inset-0" />
                  </Link>
                </h2>
                <div className="flex gap-4">
                  {repo.language && (
                    <p className="text-xs">({repo.language})</p>
                  )}
                  {repo.stars && (
                    <p className="text-xs">
                      ({abbreviateNumber(repo.stars)} ⭐️)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-x-2.5 text-xs flex-wrap leading-5 text-gray-400">
              <p className="text-left md:text-center">
                {repo.description}{" "}
                <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5  inline-block mx-2 fill-gray-300"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <span className="">{repo.status}</span>
              </p>
              <div className="flex items-center gap-x-2.5"></div>
            </div>
          </div>
          <div
            className={classNames([
              badges[repo.status],
              "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset",
            ])}
          >
            {repo.rating.toFixed(1)} / 5 ({repo.votes})
          </div>
          <ChevronRightIcon
            className="flex-none hidden w-5 h-5 text-gray-400 sm:block"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}
