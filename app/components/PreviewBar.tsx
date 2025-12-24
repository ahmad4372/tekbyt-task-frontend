import Link from "next/link";

export default function PreviewBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white px-4 py-2 flex items-center justify-between z-50">
      <span className="font-semibold text-sm">Preview Mode</span>
      <Link href="/" className="text-white hover:underline">
        Go to Home
      </Link>
    </div>
  );
}
