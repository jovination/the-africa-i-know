import { fetchPodcasts, type PodcastData } from "@/lib/api"

let podcastsCache: PodcastData[] | null = null
let podcastsPromise: Promise<PodcastData[]> | null = null

export async function getPodcasts(): Promise<PodcastData[]> {
  try {
    return await fetchPodcasts()
  } catch (error) {
    console.error("Error fetching podcasts:", error)
    return []
  }
}

export function podcastsResource(): PodcastData[] {
  if (podcastsCache !== null) {
    return podcastsCache
  }

  if (podcastsPromise === null) {
    podcastsPromise = getPodcasts().then((data) => {
      podcastsCache = data
      return data
    })
  }

  throw podcastsPromise
}

export function clearPodcastsCache() {
  podcastsCache = null
  podcastsPromise = null
}

export type { PodcastData }
