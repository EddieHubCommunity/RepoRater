import Image from "next/image";
import Link from "next/link";

const ActivityList = ({ rating }) => {
	return (
		<>
			<li className="px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-x-3">
					<Link href={`https://github.com/${rating.username}`} target="_blank">
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
						className="flex-none text-xs text-gray-600"
					>
						{rating.timeAgo}
					</time>
				</div>
				<p className="mt-3 truncate text-sm text-gray-500">
					Rated{" "}
					<Link className="text-gray-400" href={rating.url} target="_blank">
						{rating.url.split("github.com/")[1]}
					</Link>
				</p>
			</li>
		</>
	);
};

export default ActivityList;
