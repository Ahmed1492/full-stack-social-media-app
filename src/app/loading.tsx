export default function Loading() {
  return (
    <div className="flex gap-6 pt-6 px-4 md:px-0">
      {/* Left sidebar skeleton */}
      <div className="hidden xl:flex flex-col gap-4 w-[30%]">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-28 skeleton" />
          <div className="p-4 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full skeleton -mt-7" />
            <div className="h-4 w-32 rounded-lg skeleton" />
            <div className="h-3 w-20 rounded-lg skeleton" />
            <div className="flex gap-6 w-full justify-around pt-3 border-t border-gray-100">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="h-4 w-8 rounded skeleton" />
                  <div className="h-3 w-12 rounded skeleton" />
                </div>
              ))}
            </div>
            <div className="h-8 w-full rounded-xl skeleton" />
          </div>
        </div>
        {/* Menu card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col gap-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-xl skeleton flex-shrink-0" />
              <div className="h-4 flex-1 rounded-lg skeleton" />
            </div>
          ))}
        </div>
      </div>

      {/* Center feed skeleton */}
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-4">
        {/* Stories */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full skeleton" />
              <div className="h-3 w-12 rounded skeleton" />
            </div>
          ))}
        </div>

        {/* Add post */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
            <div className="flex-1 h-20 rounded-xl skeleton" />
          </div>
        </div>

        {/* Posts */}
        {[1,2,3].map(i => (
          <PostSkeleton key={i} />
        ))}
      </div>

      {/* Right sidebar skeleton */}
      <div className="hidden lg:flex flex-col gap-4 w-[33%]">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3">
          <div className="h-4 w-32 rounded skeleton" />
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-3 w-3/4 rounded skeleton" />
                <div className="h-2.5 w-1/2 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="h-4 w-24 rounded skeleton mb-4" />
          <div className="grid grid-cols-3 gap-1.5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square rounded-xl skeleton" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3.5 w-32 rounded skeleton" />
          <div className="h-3 w-20 rounded skeleton" />
        </div>
      </div>
      {/* Image */}
      <div className="w-full h-64 rounded-2xl skeleton" />
      {/* Text */}
      <div className="flex flex-col gap-2">
        <div className="h-3.5 w-full rounded skeleton" />
        <div className="h-3.5 w-4/5 rounded skeleton" />
      </div>
      {/* Actions */}
      <div className="flex gap-3 pt-3 border-t border-gray-100">
        <div className="h-8 w-20 rounded-xl skeleton" />
        <div className="h-8 w-24 rounded-xl skeleton" />
        <div className="h-8 w-16 rounded-xl skeleton ml-auto" />
      </div>
    </div>
  );
}
