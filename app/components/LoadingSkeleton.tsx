export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-12">
      {/* Back link placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-24 mb-4 animate-pulse"></div>

      {/* Featured Image placeholder */}
      <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-8 animate-pulse"></div>

      {/* Title placeholder */}
      <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-4 animate-pulse"></div>

      {/* Author info placeholder */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-full mr-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-32 mr-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-24 animate-pulse"></div>
      </div>

      {/* Content placeholders */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-4/5 animate-pulse"></div>
      </div>
    </div>
  );
}
