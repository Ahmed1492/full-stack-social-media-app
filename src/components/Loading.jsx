export default function Loading() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-3.5 w-32 rounded skeleton" />
              <div className="h-3 w-20 rounded skeleton" />
            </div>
          </div>
          <div className="w-full h-56 rounded-2xl skeleton" />
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-full rounded skeleton" />
            <div className="h-3.5 w-4/5 rounded skeleton" />
          </div>
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <div className="h-8 w-20 rounded-xl skeleton" />
            <div className="h-8 w-24 rounded-xl skeleton" />
            <div className="h-8 w-16 rounded-xl skeleton ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
