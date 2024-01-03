"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { classNames } from "@/utils/classNames";

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

export default function Repos({ minimumVotes = 5, keyword }) {
  const [repos, setRepos] = useState([]);
  const getRepos = async () => {
    const params = [];
    if (minimumVotes) {
      params.push(`minimumVotes=${minimumVotes}`);
    }
    if (keyword) {
      params.push(`keyword=${keyword}`);
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
    getRepos();
  }, [keyword]);

  return (
    <ul role="list" className="divide-y divide-white/5">
      {repos.map((repo, idx) => (
        <li
          key={idx}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
        >
          <Image
            className="inline-block rounded-md h-12 w-12"
            src={repo.logo}
            alt={`Logo for ${repo.owner}/${repo.name}`}
            width={40}
            height={40}
          />
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div
                className={classNames([
                  statuses[repo.status],
                  "flex-none rounded-full p-1",
                ])}
              >
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <Link
                  href={`/rate?owner=${repo.owner}&name=${repo.name}`}
                  className="flex gap-x-2"
                >
                  <span className="truncate">{repo.owner}</span>
                  <span className="text-gray-400">/</span>
                  <span className="whitespace-nowrap">{repo.name}</span>
                  <span className="absolute inset-0" />
                </Link>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">{repo.description}</p>
              <svg
                viewBox="0 0 2 2"
                className="h-0.5 w-0.5 flex-none fill-gray-300"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="whitespace-nowrap">{repo.status}</p>
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
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}
