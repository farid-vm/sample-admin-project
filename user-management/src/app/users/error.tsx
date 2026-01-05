"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Users service is temporarily unavailable</h2>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
