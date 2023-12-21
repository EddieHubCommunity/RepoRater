import { abbreviateNumber } from "@/utils/abbreviateNumbers";
import Image from "next/image";

export default function User({ username, votes, stars }) {
  const average = (stars / 5 / votes) * 100;
  return (
    <div className="stats shadow m-2">
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
        <div className="stat-title">Total Ratings</div>
        <div className="stat-value text-primary">{votes}</div>
        <div className="stat-desc">How many projects voted for</div>
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
        <div className="stat-title">Total Stars</div>
        <div className="stat-value text-secondary">{stars}</div>
        <div className="stat-desc">How many stars were given</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <Image
                src={`https://github.com/${username}.png`}
                alt={`Profile picture for user ${username}`}
                width="32"
                height="32"
              />
            </div>
          </div>
        </div>
        <div className="stat-value">{abbreviateNumber(average)}%</div>
        <div className="stat-title">Average</div>
        <div className="stat-desc text-secondary">Rating given</div>
      </div>
    </div>
  );
}
