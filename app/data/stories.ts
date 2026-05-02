export interface StorySection {
  heading?: string;
  body: string;
  image?: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  intro: string;
  cardImage: string;
  featuredImage: string;
  sections: StorySection[];
}

// Cache for stories data
let storiesCache: Story[] | null = null;
let storiesPromise: Promise<Story[]> | null = null;

// Fetch stories from API: https://dashboard.africaiknow.com/api/stories
export async function getStories(): Promise<Story[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.africaiknow.com'}/api/stories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AFRICA_PODCAS_API}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Transform API data to match Story interface
    interface APIStoryResponse {
      id: number;
      title: string;
      author: string;
      authorRole: string;
      date: string;
      intro: string;
      cardImage: string;
      featuredImage: string;
      sections: StorySection[];
      createdAt: string;
      updatedAt: string;
    }
    
    return result.data.map((story: APIStoryResponse) => ({
      id: story.id.toString(),
      title: story.title,
      author: story.author,
      authorRole: story.authorRole,
      date: story.date,
      intro: story.intro,
      cardImage: story.cardImage,
      featuredImage: story.featuredImage,
      sections: story.sections
    }));
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}

// Suspense-enabled stories resource
export function storiesResource() {
  if (storiesCache !== null) {
    return storiesCache;
  }

  if (storiesPromise === null) {
    storiesPromise = getStories().then(data => {
      storiesCache = data;
      return data;
    });
  }

  throw storiesPromise;
}

// Clear cache (useful for refetching)
export function clearStoriesCache() {
  storiesCache = null;
  storiesPromise = null;
}
