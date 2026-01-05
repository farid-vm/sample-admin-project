"use client";

import { LoadingSpinner } from "@/components/LodingSpinner";

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
        <LoadingSpinner />
    </div>
  );
}
