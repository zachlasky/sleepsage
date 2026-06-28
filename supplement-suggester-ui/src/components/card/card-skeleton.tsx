const CardSkeleton = () => {
  return (
    // <div className="animate-pulse duration-200 flex flex-col w-[275.75px] bg-white rounded-xl shadow-md">
    //   <div className="w-full h-[146.25px] bg-gray-200 rounded-t-lg" />

    //   <div className="p-5 flex-1 space-y-3">
    //     <div className="h-4 bg-gray-200 rounded w-2/3" />
    //     <div className="h-3 bg-gray-200 rounded w-full" />
    //     <div className="h-3 bg-gray-200 rounded w-5/6" />
    //     <div className="h-3 bg-gray-200 rounded w-4/6" />
    //     <div className="h-3 bg-gray-200 rounded w-2/3" />
    //   </div>

    //   <div className="px-5 h-[42px] border-t border-t-[#f4f4f4] grid items-center">
    //     <div className="h-3 w-20 bg-gray-200 rounded" />
    //   </div>
    // </div>

    <div className="animate-pulse duration-200 flex flex-col w-[300px] lg:w-[350px] bg-white rounded-xl shadow-md">
      <div className="w-full h-[250px] lg:h-[280px] bg-gray-200 rounded-t-lg" />

      <div className="p-5 flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>

      <div className="px-5 h-[46px] border-t border-t-[#f4f4f4] grid items-center">
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export { CardSkeleton };
