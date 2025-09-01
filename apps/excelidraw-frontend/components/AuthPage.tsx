"use client"

import { Input } from "@repo/ui/input"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1a1a1a] text-white">
      <div className="w-full max-w-sm bg-[#2a2a2a] rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          {isSignin ? "Welcome Back 👋" : "Join Us 🚀"}
        </h2>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Email"
            className=""
          />

          <Input
            type="password"
            placeholder="Password"
            className=""
          />
        </div>

        <button
          onClick={() => {}}
          className="w-full bg-[#BEFC6D] text-black py-2 rounded-lg font-medium hover:bg-lime-300 transition"
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-400">
          {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href="#"
            className="text-[#BEFC6D] hover:underline font-medium"
          >
            {isSignin ? "Sign Up" : "Sign In"}
          </a>
        </p>
      </div>
    </div>
  );
}
