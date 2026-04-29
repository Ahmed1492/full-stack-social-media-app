export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3.5 bg-gray-200 rounded-full w-32" />
          <div className="h-2.5 bg-gray-100 rounded-full w-20" />
        </div>
      </div>
      {/* Text lines */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded-full w-full" />
        <div className="h-3 bg-gray-200 rounded-full w-4/5" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
      {/* Image placeholder */}
      <div className="w-full h-52 bg-gray-100 rounded-2xl" />
      {/* Interactions */}
      <div className="flex items-center gap-4 pt-1 border-t border-gray-100">
        <div className="h-8 w-16 bg-gray-100 rounded-xl" />
        <div className="h-8 w-16 bg-gray-100 rounded-xl" />
        <div className="h-8 w-16 bg-gray-100 rounded-xl ml-auto" />
      </div>
    </div>
  );
}
