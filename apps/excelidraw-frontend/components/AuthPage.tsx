"use client"

import { Input } from "@repo/ui/input"
import Link from "next/link"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-white to-[#f8f9ff] text-gray-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          {isSignin ? "Welcome Back 👋" : "Join Us 🚀"}
        </h2>

        <p className="text-center text-gray-500">
          {isSignin
            ? "Sign in to continue your journey"
            : "Create an account to get started"}
        </p>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Email"
            className="border border-gray-200 focus:ring-2 focus:ring-indigo-400"
          />

          <Input
            type="password"
            placeholder="Password"
            className="border border-gray-200 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={() => {}}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium shadow-md hover:opacity-90 transition"
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500">
          {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isSignin ? "/signup" : "/signin"}
            className="text-indigo-600 hover:underline font-medium"
          >
            {isSignin ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  )
}
