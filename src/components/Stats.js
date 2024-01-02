"use client";

import { useEffect, useState } from "react";

import { client } from "@/config/appwrite-client";
import { abbreviateNumber } from "@/utils/abbreviateNumbers";

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
        value: ((data.ratings / data.stars) * 100).toFixed(1),
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
            <div
              key={stat.name}
              className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
            >
              <p className="text-sm font-medium leading-6 text-gray-400">
                {stat.name}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {abbreviateNumber(stat.value)}
                </span>
                {stat.unit ? (
                  <span className="text-sm text-gray-400">{stat.unit}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
