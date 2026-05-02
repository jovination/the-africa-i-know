"use client"

import { StoryCard } from "@/components/StoryCard";
import { storiesResource, type Story } from "@/app/data/stories";
import Image from "next/image";

export function StoriesList() {
  const stories = storiesResource();

  if (!stories || stories.length === 0) {
    return (
      <div className="w-full my-20 bg-[#FEF7ED] rounded-2xl h-150 flex flex-col items-center justify-center space-y-3 p-10">
        <Image src="/Error.svg" alt="Stories" width={300} height={300} />
        <p className="text-2xl font-bold mt-10">No stories yet</p>
        <p className="text-md max-w-md text-center">We are curating stories of builders, leaders, and changemakers from across Africa. Be the first to know when they arrive.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-10 md:gap-y-16">
      {stories.map((story: Story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
