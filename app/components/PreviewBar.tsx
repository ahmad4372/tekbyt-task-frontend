"use client";

import { logout } from "@/app/preview/actions";
import { useActionState } from "react";

export default function PreviewBar() {
  const [state, formAction] = useActionState(logout, null);

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white px-4 py-2 flex items-center justify-between z-50">
      <span className="font-semibold text-sm">Preview Mode</span>
      <form action={formAction}>
        <button
          type="submit"
          className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-bold hover:bg-blue-50 transition-colors"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
