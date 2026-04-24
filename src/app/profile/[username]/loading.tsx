export default function Loading() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="h-28 skeleton" />
            <div className="p-4 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full skeleton -mt-7" />
              <div className="h-4 w-28 rounded skeleton" />
              <div className="h-8 w-full rounded-xl skeleton mt-2" />
            </div>
          </div>
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

      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-4">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-48 skeleton" />
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-end gap-4 -mt-14">
              <div className="w-20 h-20 rounded-full skeleton ring-4 ring-white" />
            </div>
            <div className="h-6 w-40 rounded skeleton" />
            <div className="h-4 w-24 rounded skeleton" />
            <div className="flex gap-8 pt-4 border-t border-gray-100">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="h-5 w-8 rounded skeleton" />
                  <div className="h-3 w-16 rounded skeleton" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {[1,2].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full skeleton" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-3.5 w-32 rounded skeleton" />
                <div className="h-3 w-20 rounded skeleton" />
              </div>
            </div>
            <div className="w-full h-56 rounded-2xl skeleton" />
            <div className="h-3.5 w-3/4 rounded skeleton" />
            <div className="flex gap-3 pt-3 border-t border-gray-100">
              <div className="h-8 w-20 rounded-xl skeleton" />
              <div className="h-8 w-24 rounded-xl skeleton" />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block w-[34%]">
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
            <div className="h-4 w-24 rounded skeleton" />
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg skeleton" />
                <div className="h-3.5 flex-1 rounded skeleton" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="h-4 w-16 rounded skeleton mb-4" />
            <div className="grid grid-cols-3 gap-1.5">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square rounded-xl skeleton" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
