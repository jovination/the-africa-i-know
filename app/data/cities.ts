export interface City {
  id: string;
  videoUrl: string; // YouTube video URL (stored in database)
  platform: string; // always "YouTube" (stored in database)
  location: string; // user-entered (stored in database)
  country: string; // user-entered (stored in database)
  featured: boolean; // featured status for hero display
}

// YouTube metadata (fetched dynamically from YouTube API)
export interface YouTubeMetadata {
  videoId: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedDate: string;
}

// Combined City data for display (database + YouTube API)
export interface CityWithMetadata extends City {
  metadata: YouTubeMetadata;
}

// Fetch cities from API: https://dashboard.africaiknow.com/api/cities
export async function getCities(): Promise<City[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.africaiknow.com'}/api/cities`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AFRICA_PODCAS_API}`,
        'Content-Type': 'application/json'
      },
      next: { tags: ['cities'] }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Transform API data to match City interface
    interface APICityResponse {
      id: number;
      videoUrl: string;
      platform: string;
      location: string;
      country: string;
      featured: boolean;
    }
    
    return result.data.map((city: APICityResponse) => ({
      id: city.id.toString(),
      videoUrl: city.videoUrl,
      platform: city.platform,
      location: city.location,
      country: city.country,
      featured: city.featured ?? false
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}
