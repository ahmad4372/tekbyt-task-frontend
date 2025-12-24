"use client";

import Toast from "@/app/components/Ui/Toast";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 p-4 text-center">
      <Toast
        message={error.message || "An unexpected error occurred"}
        type="error"
      />

      <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-400 mb-8 sm:text-sm">
          {error.message || "We encountered an error while loading this page."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200"
          >
            Try again
          </button>

          <Link
            href="/"
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
