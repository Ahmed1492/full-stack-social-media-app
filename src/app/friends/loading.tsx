export default function Loading() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-xl skeleton" />
                <div className="h-4 flex-1 rounded skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="h-5 w-36 rounded skeleton mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[1,2].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full skeleton flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3.5 w-24 rounded skeleton" />
                  <div className="h-3 w-20 rounded skeleton" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-7 w-16 rounded-lg skeleton" />
                  <div className="h-7 w-16 rounded-lg skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="h-5 w-28 rounded skeleton mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                <div className="w-12 h-12 rounded-full skeleton flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3.5 w-24 rounded skeleton" />
                  <div className="h-3 w-16 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
