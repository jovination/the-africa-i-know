// YouTube API utility functions

export interface YouTubeVideoData {
  videoId: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedDate: string;
  platform: string;
}

// Function to fetch metadata for multiple cities
export async function fetchCitiesWithMetadata(cities: { videoUrl: string }[]): Promise<Array<{ city: any; metadata: YouTubeVideoData | null }>> {
  const results = await Promise.allSettled(
    cities.map(async (city) => {
      const metadata = await fetchYouTubeVideoData(city.videoUrl);
      return { city, metadata };
    })
  );

  return results.map((result) => 
    result.status === 'fulfilled' ? result.value : { city: result.reason.city, metadata: null }
  );
}

/**
 * Extract video ID from YouTube URL
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Fetch video metadata from YouTube API
 * Note: This requires a YouTube API key to work in production
 */
export async function fetchYouTubeVideoData(videoUrl: string): Promise<YouTubeVideoData | null> {
  const videoId = extractVideoId(videoUrl);
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  try {
    // Try to fetch real YouTube data first
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (apiKey) {
      // Real YouTube API call
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          const viewCount = parseInt(video.statistics.viewCount || '0');
          
          return {
            videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url,
            views: formatViewCount(viewCount),
            publishedDate: formatPublishedDate(video.snippet.publishedAt),
            platform: "YouTube"
          };
        }
      }
    }
    
    // Fallback: Try to fetch basic data from YouTube oEmbed (no API key required)
    const oEmbedResponse = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`
    );
    
    if (oEmbedResponse.ok) {
      const oEmbedData = await oEmbedResponse.json();
      
      // Extract video ID from thumbnail URL for better quality thumbnail
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      return {
        videoId,
        title: oEmbedData.title,
        thumbnail: thumbnailUrl,
        views: "View count unavailable",
        publishedDate: "Date unavailable",
        platform: "YouTube"
      };
    }
    
    // Final fallback: Use basic data
    return {
      videoId,
      title: `YouTube Video: ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      views: "View count unavailable",
      publishedDate: "Date unavailable",
      platform: "YouTube"
    };
    
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    
    // Return basic fallback data
    return {
      videoId,
      title: `YouTube Video: ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      views: "View count unavailable",
      publishedDate: "Date unavailable",
      platform: "YouTube"
    };
  }
}

/**
 * Format view count from YouTube API response
 */
export function formatViewCount(viewCount: string | number): string {
  const count = typeof viewCount === 'string' ? parseInt(viewCount.replace(/[^0-9]/g, '')) : viewCount;
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`;
  }
  
  return `${count}+`;
}

/**
 * Format date from YouTube API response
 */
export function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
