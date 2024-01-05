const StatSkeleton = () => {
	return (
		<div className="w-11/12 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
			<div className="skeleton w-48 h-36 bg-slate-900 rounded-none lg:mt-0"></div>
			<div className="skeleton w-48 h-36 bg-slate-900 rounded-none lg:mt-0 lg:mx-4"></div>
			<div className="skeleton w-48 h-36 bg-slate-900 rounded-none lg:mt-0"></div>
			<div className="skeleton w-48 h-36 bg-slate-900 rounded-none lg:mt-0"></div>
		</div>
	);
};

export default StatSkeleton;
