"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { client } from "@/config/appwrite-client";
import RepoListSkeleton from "./ListSkeletons/RepoListSkeleton";

const RepoList = dynamic(() => import("./componentList/RepoList"), {
  loading: RepoListSkeleton,
  ssr: false,
});

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
      `/api/repos${params.length ? `?${params.join("&")}` : ""}`,
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
        <RepoList key={idx} repo={repo} />
      ))}
    </ul>
  );
}
