const RepoListSkeleton = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-full flex items-center my-4">
        <div className="skeleton w-20 h-20 bg-slate-900 rounded-none mt-4 lg:mt-0"></div>
        <div className="skeleton w-full h-20 bg-slate-900 mx-4 rounded-none mt-4 lg:mt-0"></div>
      </div>
    </div>
  );
};

export default RepoListSkeleton;
