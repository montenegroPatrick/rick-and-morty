/** @format */

"use client";

import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer text-2xl font-bold hover:underline hover:text-blue-500"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}
