# Data Formats & Interfaces Documentation

## Overview
Complete documentation of Cities and Stories data structures, interfaces, and formats for dashboard CRUD operations.

---

## 📖 Stories Data Structure

### Core Interface
```typescript
export interface Story {
  id: string;                    // Unique identifier
  title: string;                 // Story title
  author: string;                // Author name
  authorRole: string;            // Author's role/title
  date: string;                  // Publication date (formatted)
  intro: string;                 // Story introduction/summary
  cardImage: string;             // Thumbnail for story cards
  featuredImage: string;         // Main featured image
  sections: StorySection[];      // Story content sections
}

export interface StorySection {
  heading?: string;              // Section heading (optional)
  body: string;                  // Section content (supports rich text)
  image?: string;                // Section image (optional)
}
```

### Data Flow & Sources
| Field | Source | User Input | Auto-Generated |
|-------|--------|------------|----------------|
| id | System | ❌ | ✅ (UUID/timestamp) |
| title | User | ✅ | ❌ |
| author | User | ✅ | ❌ |
| authorRole | User | ✅ | ❌ |
| date | User | ✅ | ❌ |
| intro | User | ✅ | ❌ |
| cardImage | User | ✅ (upload) | ❌ |
| featuredImage | User | ✅ (upload) | ❌ |
| sections | User | ✅ (rich editor) | ❌ |

### Validation Rules
```typescript
const StoryValidation = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 200
  },
  author: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  authorRole: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  intro: {
    required: true,
    minLength: 50,
    maxLength: 500
  },
  cardImage: {
    required: true,
    fileType: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5MB
  },
  featuredImage: {
    required: true,
    fileType: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 10MB
  },
  sections: {
    required: true,
    minItems: 1,
    maxItems: 20
  }
}
```

### CRUD Operations Schema
```typescript
// CREATE
interface CreateStoryRequest {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  intro: string;
  cardImage: File;
  featuredImage: File;
  sections: Omit<StorySection, 'id'>[];
}

// READ
interface GetStoryResponse extends Story {}
interface GetStoriesResponse {
  stories: Story[];
  total: number;
  page: number;
  limit: number;
}

// UPDATE
interface UpdateStoryRequest {
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

// DELETE
interface DeleteStoryRequest {
  id: string;
  confirm: boolean;
}
```

---

## 🏙️ Cities Data Structure

### Core Interface
```typescript
export interface City {
  id: string;                    // Unique identifier
  videoId: string;              // YouTube video ID
  videoUrl: string;             // Full YouTube URL
  title: string;                // Video title (from YouTube)
  thumbnail: string;            // Video thumbnail (from YouTube)
  views: string;                // View count (formatted from YouTube)
  publishedDate: string;        // Publish date (from YouTube)
  platform: string;             // Always "YouTube"
  location: string;             // City name (user input)
  country: string;              // Country name (user input)
}
```

### YouTube Integration Flow
```typescript
// User provides YouTube URL + Location/Country
const userInput = {
  videoUrl: "https://youtu.be/4TjMG4KuDXc?si=1UdyYUQiYYn3GCL-",
  location: "Dar es Salaam",
  country: "Tanzania"
}

// System extracts and fetches YouTube data
const youtubeData = await fetchYouTubeVideoData(userInput.videoUrl)
// Returns: { videoId, title, thumbnail, views, publishedDate, platform }

// Combined with user input
const finalCity: City = {
  id: generateId(),
  ...youtubeData,
  ...userInput
}
```

### Data Sources & Flow
| Field | Source | User Input | Auto-Generated |
|-------|--------|------------|----------------|
| id | System | ❌ | ✅ (UUID/timestamp) |
| videoId | YouTube API | ❌ | ✅ (from URL) |
| videoUrl | User | ✅ | ❌ |
| title | YouTube API | ❌ | ✅ |
| thumbnail | YouTube API | ❌ | ✅ |
| views | YouTube API | ❌ | ✅ (formatted) |
| publishedDate | YouTube API | ❌ | ✅ (formatted) |
| platform | System | ❌ | ✅ ("YouTube") |
| location | User | ✅ | ❌ |
| country | User | ✅ | ❌ |

### YouTube URL Validation
```typescript
// Supported URL formats
const supportedFormats = [
  'https://youtu.be/VIDEO_ID',
  'https://www.youtube.com/watch?v=VIDEO_ID',
  'https://youtube.com/watch?v=VIDEO_ID',
  'https://www.youtube.com/embed/VIDEO_ID'
]

// Validation Rules
const CityValidation = {
  videoUrl: {
    required: true,
    pattern: /^https:\/\/(youtu\.be\/|www\.youtube\.com\/watch\?v=|youtube\.com\/watch\?v=|www\.youtube\.com\/embed\/)[\w-]+/,
    custom: validateYouTubeUrl
  },
  location: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  country: {
    required: true,
    minLength: 2,
    maxLength: 100
  }
}
```

### CRUD Operations Schema
```typescript
// CREATE
interface CreateCityRequest {
  videoUrl: string;
  location: string;
  country: string;
}

// READ
interface GetCityResponse extends City {}
interface GetCitiesResponse {
  cities: City[];
  total: number;
  page: number;
  limit: number;
}

// UPDATE
interface UpdateCityRequest {
  id: string;
  videoUrl?: string;           // Will re-fetch YouTube data
  location?: string;
  country?: string;
}

// DELETE
interface DeleteCityRequest {
  id: string;
  confirm: boolean;
}
```

---

## 🗄️ Data Storage Format

### File Structure
```
/app/data/
├── stories.ts          # Stories array with Story interface
├── cities.ts           # Cities array with City interface
└── types.ts            # Shared type definitions
```

### JSON Export Format
```json
{
  "stories": [
    {
      "id": "founder-first-grit-growth",
      "title": "Founder First: Grit, Growth, and Entrepreneurship on the Continent",
      "author": "Dr Mzamo Masito",
      "authorRole": "Entrepreneur",
      "date": "April 2026",
      "intro": "Across Africa, a new generation of founders...",
      "cardImage": "https://images.unsplash.com/...",
      "featuredImage": "https://images.unsplash.com/...",
      "sections": [
        {
          "heading": "The Journey Begins",
          "body": "The story of African entrepreneurship...",
          "image": "https://images.unsplash.com/..."
        }
      ]
    }
  ],
  "cities": [
    {
      "id": "1",
      "videoId": "4TjMG4KuDXc",
      "videoUrl": "https://youtu.be/4TjMG4KuDXc?si=1UdyYUQiYYn3GCL-",
      "title": "Dar es Salaam - Tanzania's Largest City",
      "thumbnail": "https://img.youtube.com/vi/4TjMG4KuDXc/maxresdefault.jpg",
      "views": "1.3M+",
      "publishedDate": "October 15, 2025",
      "platform": "YouTube",
      "location": "Dar es Salaam",
      "country": "Tanzania"
    }
  ]
}
```

---

## 🔧 Utility Functions

### Stories Utilities
```typescript
// Generate unique story ID
export function generateStoryId(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

// Format story date
export function formatStoryDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
}

// Validate story completeness
export function validateStory(story: Partial<Story>): ValidationResult {
  // Implementation for validation logic
}
```

### Cities Utilities
```typescript
// Extract YouTube video ID
export function extractVideoId(url: string): string | null {
  // Implementation for YouTube URL parsing
}

// Format view count
export function formatViewCount(count: string | number): string {
  // Implementation for view count formatting
}

// Refresh YouTube data
export async function refreshCityData(city: City): Promise<City> {
  // Re-fetch YouTube metadata
}
```

---

## 📊 Dashboard Integration Points

### API Endpoints Structure
```
/api/dashboard/stories
├── GET    /           # List all stories
├── POST   /           # Create new story
├── GET    /[id]       # Get single story
├── PUT    /[id]       # Update story
├── DELETE /[id]       # Delete story
└── POST   /[id]/image # Upload story image

/api/dashboard/cities
├── GET    /           # List all cities
├── POST   /           # Create new city
├── GET    /[id]       # Get single city
├── PUT    /[id]       # Update city
├── DELETE /[id]       # Delete city
└── POST   /validate   # Validate YouTube URL
```

### Form Field Mappings
| Dashboard Form | Data Field | Type | Required |
|---------------|------------|------|----------|
| Story Title | title | text | ✅ |
| Story Author | author | text | ✅ |
| Author Role | authorRole | text | ✅ |
| Publication Date | date | date | ✅ |
| Story Intro | intro | textarea | ✅ |
| Card Image | cardImage | file | ✅ |
| Featured Image | featuredImage | file | ✅ |
| Story Sections | sections | array | ✅ |

| Dashboard Form | Data Field | Type | Required |
|---------------|------------|------|----------|
| YouTube URL | videoUrl | url | ✅ |
| City Location | location | text | ✅ |
| Country | country | text | ✅ |

---

## 🔄 Data Lifecycle

### Stories Lifecycle
1. **Draft** → Created but not published
2. **Published** → Live on website
3. **Updated** → Modified with version tracking
4. **Archived** → Removed from public view
5. **Deleted** → Permanently removed

### Cities Lifecycle
1. **Pending** → YouTube data being fetched
2. **Active** → Live on website
3. **Updated** → Location info modified
4. **Refreshed** → YouTube data updated
5. **Removed** → Deleted from system

---

## 🚀 Implementation Notes

### Performance Considerations
- **Stories**: Image optimization, lazy loading for large content
- **Cities**: YouTube thumbnail caching, API rate limiting
- **Search**: Indexing for fast content discovery

### Security Measures
- **File Upload**: Type validation, size limits, virus scanning
- **Input Sanitization**: XSS protection, SQL injection prevention
- **API Security**: Rate limiting, authentication checks

### Scalability Planning
- **Database Ready**: Interfaces designed for easy database migration
- **CDN Integration**: Image and video CDN support
- **Caching Strategy**: Redis integration ready

This documentation provides the complete foundation for implementing robust CRUD operations for both Cities and Stories in your dashboard.
