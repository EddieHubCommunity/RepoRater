"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { client } from "@/config/appwrite-client";
import StatSkeleton from "./ListSkeletons/StatSkeleton";

const StatsList = dynamic(() => import("./componentList/StatsList"), {
  loading: StatSkeleton,
  ssr: false,
});

export default function Stats() {
  const [stats, setStats] = useState([]);

  const getStats = async () => {
    const res = await fetch("/api/stats");
    const data = await res.json();
    const stats = [
      { name: "Total Ratings", value: data.ratings, unit: "⭐️" },
      { name: "Total Repos", value: data.repos, unit: "GitHub" },
      { name: "Total Stars", value: data.stars, unit: "⭐️" },
      {
        name: "Recommended Repos",
        value: ((data.stars / data.ratings / 5) * 100).toFixed(1),
        unit: "%",
      },
    ];
    setStats(stats);
  };

  useEffect(() => {
    const events = [
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APP_ID}.documents`,
    ];
    client.subscribe(events, () => getStats());
    getStats();
  }, []);

  return (
    <div className="bg-gray-900 flex grow">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsList key={stat.name} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
