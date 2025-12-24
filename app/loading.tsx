export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Case Studies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden shadow-md bg-white dark:bg-zinc-900"
          >
            <div className="h-48 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
