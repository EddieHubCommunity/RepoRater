import Image from "next/image";
import Link from "next/link";

import { abbreviateNumber } from "@/utils/abbreviateNumbers";
import { classNames } from "@/utils/classNames";

export default function Repo({ url, owner, name, logo, stars, votes }) {
  const percentage = Math.round((stars / 5) * 100);
  return (
    <div className="stats shadow stats-vertical m-2">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Stars</div>
        <div className="stat-value text-primary">{abbreviateNumber(stars)}</div>
        <div className="stat-desc">
          <Link href={url} target="_blank">
            GitHub
          </Link>
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Votes</div>
        <div className="stat-value text-secondary">{votes}</div>
        <div className="stat-desc">{owner}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div
            className={classNames([
              "avatar",
              percentage > 71 ? "online" : "offline",
            ])}
          >
            <div className="w-16 rounded-full">
              {logo && (
                <Image
                  src={logo}
                  alt={`Logo for repo ${owner}/${name}`}
                  width="32"
                  height="32"
                />
              )}
            </div>
          </div>
        </div>
        <div className="stat-value">{percentage}%</div>
        {percentage > 71 && <div className="stat-title">Recommend</div>}
        {percentage < 70 && <div className="stat-title">Research</div>}
        <div className="stat-desc text-secondary">{name}</div>
      </div>
    </div>
  );
}
