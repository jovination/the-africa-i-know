"use client"

import YouTubePodcastPlayer from "./YouTubePodcastPlayer"
import { podcastsResource } from "@/app/data/podcasts"

export default function PodcastList() {
  const podcasts = podcastsResource()

  if (podcasts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-96">
        <p className="text-gray-600">No podcasts available</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="w-full flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <YouTubePodcastPlayer
              youtubeUrl={podcast.youtubeUrl}
              youtubeId={podcast.youtubeId}
              title={podcast.title}
              description={`Host: ${podcast.host}${podcast.guest ? ` | Guest: ${podcast.guest}` : ""}`}
              episodeTitle={podcast.title}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
