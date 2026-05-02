const API_BASE_URL = 'https://dashboard.africaiknow.com/api';
const API_KEY = process.env.NEXT_PUBLIC_AFRICA_PODCAS_API || process.env.AFRICA_PODCAS_API;

export interface JoinMovementData {
  name: string;
  email: string;
}

export interface NomineeData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const apiHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

export async function submitJoinMovement(data: JoinMovementData) {
  try {
    const response = await fetch(`${API_BASE_URL}/join-movement`, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Join movement API error:', error);
    throw error;
  }
}

export async function submitNominee(data: NomineeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/nominees`, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Nominee API error:', error);
    throw error;
  }
}

export async function fetchCities() {
  try {
    const response = await fetch(`${API_BASE_URL}/cities`, {
      method: 'GET',
      headers: apiHeaders,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Cities API error:', error);
    throw error;
  }
}

export interface PodcastData {
  id: number;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  publishedDate: string;
  host: string;
  guest: string;
  transcription: string;
  summary: string;
  tags: string;
}

export async function fetchPodcasts(): Promise<PodcastData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/podcasts`, {
      method: 'GET',
      headers: apiHeaders,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Podcasts API error:', error);
    throw error;
  }
}

export interface StorySection {
  body: string;
  image?: string;
  heading?: string;
}

export interface StoryData {
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

export async function fetchStories(): Promise<StoryData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/stories`, {
      method: 'GET',
      headers: apiHeaders,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Stories API error:', error);
    throw error;
  }
}
