"use client";

interface InputProps {
  className?: string;
  placeholder: string;
  type: "text" | "password";
}

export const Input = ({ className, placeholder, type }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg bg-[#1f1f1f] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BEFC6D] transition ${className}`}
          />
  );
};
