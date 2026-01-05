"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="w-full max-w-6xl space-y-6">
        <h2>Users service is temporarily unavailable</h2>
        <button onClick={reset}>Try again in 5 seconds</button>
      </div>
    </div>
  );
}
