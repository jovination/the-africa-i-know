import Link from "next/link";
import { Story } from "@/app/data/stories";
import { RemoteImage } from "@/components/RemoteImage";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.id}`}
      className="group flex flex-col gap-0 cursor-pointer"
    >
      {/* Image */}
      <div className="rounded-[14px] overflow-hidden bg-black h-55 sm:h-[260px] xl:h-[300px]">
        <RemoteImage
          src={story.cardImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={400}
          height={300}
        />
      </div>

      {/* Title */}
      <p className="font-bold text-base sm:text-lg text-black leading-snug mt-4 mb-2 line-clamp-3">
        {story.title}
      </p>

      {/* Author */}
      <div className="flex flex-col gap-0.5">
        <p className="font-bold text-sm sm:text-base text-black">By {story.author}</p>
        <p className="text-[#878787] text-xs sm:text-sm">{story.authorRole}</p>
      </div>
    </Link>
  );
}
