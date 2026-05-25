"use client";

import { Button } from "../../components/ui/button";
import { clearStoriesCache } from "../../app/data/stories";

export default function StoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full my-20 flex flex-col items-center justify-center gap-4 p-10">
      <p className="text-xl font-bold">Could not load stories</p>
      <p className="text-sm text-gray-600 max-w-md text-center">{error.message}</p>
      <Button
        variant="outline"
        onClick={() => {
          clearStoriesCache();
          reset();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
