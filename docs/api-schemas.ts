// API Schema Definitions for Dashboard CRUD Operations

// ==================== STORIES ====================

// Base Story Interface
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

export interface StorySection {
  heading?: string;
  body: string;
  image?: string;
}

// Story CRUD Request/Response Types
export interface CreateStoryRequest {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  intro: string;
  cardImage: File;
  featuredImage: File;
  sections: Omit<StorySection, 'id'>[];
}

export interface UpdateStoryRequest {
  id: string;
  title?: string;
  author?: string;
  authorRole?: string;
  date?: string;
  intro?: string;
  cardImage?: File;
  featuredImage?: File;
  sections?: StorySection[];
}

export interface DeleteStoryRequest {
  id: string;
  confirm: boolean;
}

export interface GetStoryResponse extends Story {}

export interface GetStoriesResponse {
  stories: Story[];
  total: number;
  page: number;
  limit: number;
}

// ==================== CITIES ====================

// Base City Interface
export interface City {
  id: string;
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedDate: string;
  platform: string;
  location: string;
  country: string;
}

// City CRUD Request/Response Types
export interface CreateCityRequest {
  videoUrl: string;
  location: string;
  country: string;
}

export interface UpdateCityRequest {
  id: string;
  videoUrl?: string;
  location?: string;
  country?: string;
}

export interface DeleteCityRequest {
  id: string;
  confirm: boolean;
}

export interface GetCityResponse extends City {}

export interface GetCitiesResponse {
  cities: City[];
  total: number;
  page: number;
  limit: number;
}

// ==================== VALIDATION ====================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Story Validation Schema
export const StoryValidationSchema = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s\-_.,!?':]+$/
  },
  author: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'.]+$/
  },
  authorRole: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'.]+$/
  },
  date: {
    required: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/
  },
  intro: {
    required: true,
    minLength: 50,
    maxLength: 500
  },
  cardImage: {
    required: true,
    fileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  featuredImage: {
    required: true,
    fileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 10 * 1024 * 1024 // 10MB
  },
  sections: {
    required: true,
    minItems: 1,
    maxItems: 20
  }
};

// City Validation Schema
export const CityValidationSchema = {
  videoUrl: {
    required: true,
    pattern: /^https:\/\/(youtu\.be\/|www\.youtube\.com\/watch\?v=|youtube\.com\/watch\?v=|www\.youtube\.com\/embed\/)[\w-]+(\?.*)?$/
  },
  location: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'.]+$/
  },
  country: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'.]+$/
  }
};

// ==================== UTILITY TYPES ====================

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query?: string;
  category?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardStats {
  totalStories: number;
  totalCities: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'story' | 'city';
  action: 'create' | 'update' | 'delete';
  timestamp: string;
  description: string;
}

// ==================== FORM TYPES ====================

export interface StoryFormData {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  intro: string;
  cardImage: File | null;
  featuredImage: File | null;
  sections: StorySection[];
}

export interface CityFormData {
  videoUrl: string;
  location: string;
  country: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
}

// ==================== YOUTUBE INTEGRATION ====================

export interface YouTubeVideoData {
  videoId: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedDate: string;
  platform: string;
}

export interface YouTubeApiResponse {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      maxres: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
}

// ==================== EXPORT/IMPORT ====================

export interface ExportOptions {
  format: 'json' | 'csv';
  includeImages: boolean;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: ImportError[];
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
}
