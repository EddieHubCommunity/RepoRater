"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { client } from "@/config/appwrite-client";
import ActivitySkeleton from "./ListSkeletons/ActivitySkeleton";

const ActivityList = dynamic(() => import("./componentList/ActivityList"), {
	loading: ActivitySkeleton,
	ssr: false,
});

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
			{!activity && <h1>Loading...</h1>}
			<ul role="list" className="divide-y divide-white/5">
				{activity.map((rating, idx) => (
					<ActivityList key={idx} rating={rating} />
				))}
			</ul>
		</>
	);
}
