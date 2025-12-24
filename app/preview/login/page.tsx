"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { useSearchParams } from "next/navigation";

const initialState = {
  error: "",
};

export default function Login() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [state, formAction] = useActionState(login, initialState);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md text-center border border-gray-800">
          <p className="text-white text-lg font-semibold">
            Missing Case Study ID
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
            Preview Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <input type="hidden" name="id" value={id} />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Password"
              />
            </div>
          </div>

          {state?.error && (
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center font-medium">
                {state.error}
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
