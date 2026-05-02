"use client"

import { useState, useEffect } from "react"
import YouTubePodcastPlayer from "./YouTubePodcastPlayer"
import { fetchPodcasts, type PodcastData } from "@/lib/api"
import { Spinner } from "./ui/spinner"

export default function PodcastList() {
  const [podcasts, setPodcasts] = useState<PodcastData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const podcastsData = await fetchPodcasts()
        setPodcasts(podcastsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load podcasts")
      } finally {
        setLoading(false)
      }
    }

    loadPodcasts()
  }, [])

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-96">
        <Spinner className=" rounded-full size-8 border-b-2 border-gray-900" />
        <p className="mt-4 text-gray-600">Loading podcasts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-96">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

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
              title={podcast.title}
              description={`Host: ${podcast.host}${podcast.guest ? ` | Guest: ${podcast.guest}` : ''}`}
              episodeTitle={podcast.title}
            />
            
            {/* Additional podcast information */}
            {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span><strong>Host:</strong> {podcast.host}</span>
                {podcast.guest && <span><strong>Guest:</strong> {podcast.guest}</span>}
                <span><strong>Published:</strong> {podcast.publishedDate}</span>
                {podcast.duration !== "N/A" && <span><strong>Duration:</strong> {podcast.duration}</span>}
              </div>
              
              {podcast.summary && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-900 text-center">Summary</h4>
                  <p className="text-gray-700 mt-1 text-center">{podcast.summary}</p>
                </div>
              )}
              
              {podcast.transcription && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-900 text-center">Transcription</h4>
                  <p className="text-gray-700 mt-1 text-sm whitespace-pre-wrap text-center">{podcast.transcription}</p>
                </div>
              )}
            </div> */}
          </div>
        </div>
      ))}
    </div>
  )
}
