# Dashboard Implementation Guide

## 🏗️ Architecture Overview

### File Structure for Dashboard
```
/app/
├── dashboard/
│   ├── layout.tsx              # Dashboard layout wrapper
│   ├── page.tsx                # Dashboard home
│   ├── stories/
│   │   ├── page.tsx            # Stories listing
│   │   ├── [id]/
│   │   │   ├── page.tsx        # Story detail/edit
│   │   │   └── edit.tsx        # Story edit form
│   │   └── new/
│   │       └── page.tsx        # Create new story
│   ├── cities/
│   │   ├── page.tsx            # Cities listing
│   │   ├── [id]/
│   │   │   ├── page.tsx        # City detail/edit
│   │   │   └── edit.tsx        # City edit form
│   │   └── new/
│   │       └── page.tsx        # Create new city
│   └──
├── api/
│   ├── dashboard/
│   │   ├── stories/
│   │   │   ├── route.ts        # Stories CRUD API
│   │   │   ├── [id]/
│   │   │   │   └── route.ts    # Individual story operations
│   │   │   └── upload/
│   │   │       └── route.ts    # Image upload
│   │   ├── cities/
│   │   │   ├── route.ts        # Cities CRUD API
│   │   │   ├── [id]/
│   │   │   │   └── route.ts    # Individual city operations
│   │   │   └── validate/
│   │   │       └── route.ts    # YouTube URL validation
│   │   └
├── components/
│   ├── dashboard/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   │   ├── Header.tsx      # Dashboard header
│   │   │   └── Layout.tsx      # Main layout wrapper
│   │   ├── stories/
│   │   │   ├── StoryCard.tsx   # Story preview card
│   │   │   ├── StoryForm.tsx   # Story creation/edit form
│   │   │   ├── StoryList.tsx   # Stories listing table
│   │   │   └── StoryEditor.tsx # Rich text editor
│   │   ├── cities/
│   │   │   ├── CityCard.tsx    # City preview card
│   │   │   ├── CityForm.tsx    # City creation/edit form
│   │   │   ├── CityList.tsx    # Cities listing table
│   │   │   └── YouTubePreview.tsx # YouTube video preview
│   │   ├── shared/
│   │   │   ├── DataTable.tsx   # Reusable data table
│   │   │   ├── SearchBar.tsx   # Search and filter
│   │   │   ├── Pagination.tsx  # Pagination component
│   │   │   ├── ConfirmDialog.tsx # Delete confirmation
│   │   │   └── ImageLinkInput.tsx # Image link input component
│   │   
└── lib/
    ├── dashboard/
    │   ├── auth.ts             # Dashboard authentication
    │   ├── api.ts              # API client utilities
    │   ├── validation.ts       # Form validation
    │   ├── storage.ts          # File storage utilities
    │   └── utils.ts            # Helper functions
    ├── youtube.ts              # YouTube integration
    └── data-management.ts      # CRUD operations
```

---

## 🔐 Authentication Setup

### Dashboard Auth Configuration
```typescript
// lib/dashboard/auth.ts
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day
  },
  account: {
    accountLinking: {
      enabled: false
    }
  }
})

// Middleware for dashboard protection
export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (!session) {
    redirect('/login')
  }
  
  return session
}
```

### Dashboard Layout with Auth
```typescript
// app/dashboard/layout.tsx
import { requireAuth } from "@/lib/dashboard/auth"
import { DashboardLayout } from "@/components/dashboard/layout/Layout"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  
  return <DashboardLayout>{children}</DashboardLayout>
}
```

---

## 📝 Stories CRUD Implementation

### Stories API Routes
```typescript
// app/api/dashboard/stories/route.ts
import { NextRequest, NextResponse } from "next/server"
import { stories } from "@/app/data/stories"
import { StoryValidationSchema } from "@/docs/api-schemas"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const query = searchParams.get('query') || ''
  
  // Filter and paginate stories
  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(query.toLowerCase()) ||
    story.author.toLowerCase().includes(query.toLowerCase())
  )
  
  const startIndex = (page - 1) * limit
  const paginatedStories = filteredStories.slice(startIndex, startIndex + limit)
  
  return NextResponse.json({
    stories: paginatedStories,
    total: filteredStories.length,
    page,
    limit
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validation = validateStoryData(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }
    
    // Create new story
    const newStory: Story = {
      id: generateStoryId(body.title),
      ...body
    }
    
    stories.push(newStory)
    
    return NextResponse.json({ story: newStory }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    )
  }
}
```

### Story Form Component
```typescript
// components/dashboard/stories/StoryForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/dashboard/shared/ImageUpload"
import { StoryEditor } from "@/components/dashboard/stories/StoryEditor"
import { StoryFormData } from "@/docs/api-schemas"

interface StoryFormProps {
  initialData?: Partial<StoryFormData>
  onSubmit: (data: StoryFormData) => Promise<void>
  isEditing?: boolean
}

export function StoryForm({ initialData, onSubmit, isEditing = false }: StoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sections, setSections] = useState(initialData?.sections || [{ body: '' }])
  
  const { register, handleSubmit, formState: { errors } } = useForm<StoryFormData>({
    defaultValues: initialData
  })

  const onFormSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit({ ...data, sections })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <Field>
        <FieldLabel>Story Title</FieldLabel>
        <FieldContent>
          <Input
            {...register('title', { required: true, minLength: 3 })}
            placeholder="Enter story title"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Author</FieldLabel>
        <FieldContent>
          <Input
            {...register('author', { required: true })}
            placeholder="Author name"
          />
          {errors.author && (
            <span className="text-red-500 text-sm">{errors.author.message}</span>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Author Role</FieldLabel>
        <FieldContent>
          <Input
            {...register('authorRole', { required: true })}
            placeholder="Author's role or title"
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Publication Date</FieldLabel>
        <FieldContent>
          <Input
            {...register('date', { required: true })}
            type="date"
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Introduction</FieldLabel>
        <FieldContent>
          <Textarea
            {...register('intro', { required: true, minLength: 50 })}
            placeholder="Story introduction (minimum 50 characters)"
            rows={4}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Card Image</FieldLabel>
        <FieldContent>
          <ImageUpload
            onFileSelect={(file) => {/* Handle file upload */}}
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Featured Image</FieldLabel>
        <FieldContent>
          <ImageUpload
            onFileSelect={(file) => {/* Handle file upload */}}
            accept="image/*"
            maxSize={10 * 1024 * 1024} // 10MB
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Story Sections</FieldLabel>
        <FieldContent>
          <StoryEditor
            sections={sections}
            onChange={setSections}
          />
        </FieldContent>
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : isEditing ? 'Update Story' : 'Create Story'}
      </Button>
    </form>
  )
}
```

---

## 🏙️ Cities CRUD Implementation

### Cities API Routes
```typescript
// app/api/dashboard/cities/route.ts
import { NextRequest, NextResponse } from "next/server"
import { cities } from "@/app/data/cities"
import { fetchYouTubeVideoData } from "@/lib/youtube"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const query = searchParams.get('query') || ''
  
  // Filter and paginate cities
  const filteredCities = cities.filter(city => 
    city.location.toLowerCase().includes(query.toLowerCase()) ||
    city.country.toLowerCase().includes(query.toLowerCase())
  )
  
  const startIndex = (page - 1) * limit
  const paginatedCities = filteredCities.slice(startIndex, startIndex + limit)
  
  return NextResponse.json({
    cities: paginatedCities,
    total: filteredCities.length,
    page,
    limit
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoUrl, location, country } = body
    
    // Validate YouTube URL and fetch data
    const youtubeData = await fetchYouTubeVideoData(videoUrl)
    if (!youtubeData) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL or failed to fetch video data' },
        { status: 400 }
      )
    }
    
    // Create new city
    const newCity: City = {
      id: Date.now().toString(),
      ...youtubeData,
      videoUrl,
      location,
      country
    }
    
    cities.push(newCity)
    
    return NextResponse.json({ city: newCity }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create city' },
      { status: 500 }
    )
  }
}
```

### City Form Component
```typescript
// components/dashboard/cities/CityForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { YouTubePreview } from "@/components/dashboard/cities/YouTubePreview"
import { CityFormData } from "@/docs/api-schemas"

interface CityFormProps {
  initialData?: Partial<CityFormData>
  onSubmit: (data: CityFormData) => Promise<void>
  isEditing?: boolean
}

export function CityForm({ initialData, onSubmit, isEditing = false }: CityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [youtubeData, setYoutubeData] = useState<any>(null)
  const [isValidatingUrl, setIsValidatingUrl] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CityFormData>({
    defaultValues: initialData
  })

  const videoUrl = watch('videoUrl')

  // Validate YouTube URL when it changes
  const validateYouTubeUrl = async (url: string) => {
    if (!url) return
    
    setIsValidatingUrl(true)
    try {
      const response = await fetch('/api/dashboard/cities/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url })
      })
      
      const data = await response.json()
      if (data.success) {
        setYoutubeData(data.data)
      } else {
        setYoutubeData(null)
      }
    } catch (error) {
      setYoutubeData(null)
    } finally {
      setIsValidatingUrl(false)
    }
  }

  const onFormSubmit = async (data: CityFormData) => {
    if (!youtubeData) {
      // Validate YouTube URL first
      await validateYouTubeUrl(data.videoUrl)
      if (!youtubeData) return
    }
    
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <Field>
        <FieldLabel>YouTube URL</FieldLabel>
        <FieldContent>
          <Input
            {...register('videoUrl', { 
              required: true,
              pattern: /^https:\/\/(youtu\.be\/|www\.youtube\.com\/watch\?v=|youtube\.com\/watch\?v=|www\.youtube\.com\/embed\/)[\w-]+/
            })}
            placeholder="https://youtu.be/..."
            onBlur={(e) => validateYouTubeUrl(e.target.value)}
          />
          {errors.videoUrl && (
            <span className="text-red-500 text-sm">Please enter a valid YouTube URL</span>
          )}
        </FieldContent>
      </Field>

      {youtubeData && (
        <YouTubePreview data={youtubeData} />
      )}

      <Field>
        <FieldLabel>Location</FieldLabel>
        <FieldContent>
          <Input
            {...register('location', { required: true, minLength: 2 })}
            placeholder="e.g., Dar es Salaam"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">{errors.location.message}</span>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Country</FieldLabel>
        <FieldContent>
          <Input
            {...register('country', { required: true, minLength: 2 })}
            placeholder="e.g., Tanzania"
          />
          {errors.country && (
            <span className="text-red-500 text-sm">{errors.country.message}</span>
          )}
        </FieldContent>
      </Field>

      <Button 
        type="submit" 
        disabled={isSubmitting || isValidatingUrl} 
        className="w-full"
      >
        {isSubmitting ? 'Saving...' : isValidatingUrl ? 'Validating...' : isEditing ? 'Update City' : 'Add City'}
      </Button>
    </form>
  )
}
```

---

## 🎯 Dashboard Pages Implementation

### Stories Listing Page
```typescript
// app/dashboard/stories/page.tsx
import { StoriesList } from "@/components/dashboard/stories/StoriesList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function StoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stories</h1>
          <p className="text-gray-600">Manage your story content</p>
        </div>
        <Link href="/dashboard/stories/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Story
          </Button>
        </Link>
      </div>
      
      <StoriesList />
    </div>
  )
}
```

### Cities Listing Page
```typescript
// app/dashboard/cities/page.tsx
import { CitiesList } from "@/components/dashboard/cities/CitiesList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cities</h1>
          <p className="text-gray-600">Manage city video content</p>
        </div>
        <Link href="/dashboard/cities/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add City
          </Button>
        </Link>
      </div>
      
      <CitiesList />
    </div>
  )
}
```

---

## 🔍 Search and Filter Implementation

### Search Component
```typescript
// components/dashboard/shared/SearchBar.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilter?: (filters: any) => void
  placeholder?: string
}

export function SearchBar({ onSearch, onFilter, placeholder = "Search..." }: SearchBarProps) {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
      <Button type="submit">Search</Button>
      {onFilter && (
        <Button variant="outline" onClick={() => {/* Open filter dialog */}}>
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      )}
    </form>
  )
}
```

---

## 📊 Analytics Dashboard

### Analytics Page
```typescript
// app/dashboard/analytics/page.tsx
import { StatsCard } from "@/components/dashboard/analytics/StatsCard"
import { ActivityFeed } from "@/components/dashboard/analytics/ActivityFeed"
import { Chart } from "@/components/dashboard/analytics/Chart"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600">Track your content performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Stories" value="12" change="+2" />
        <StatsCard title="Total Cities" value="8" change="+1" />
        <StatsCard title="Total Views" value="45.2K" change="+12%" />
        <StatsCard title="Engagement Rate" value="3.2%" change="+0.5%" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Content Performance" type="line" />
        <Chart title="Popular Categories" type="bar" />
      </div>
      
      <ActivityFeed />
    </div>
  )
}
```

---

## 🚀 Next Steps

1. **Set up authentication** - Configure better-auth for dashboard access
2. **Implement API routes** - Create all CRUD endpoints
3. **Build UI components** - Implement forms, lists, and layouts
4. **Add file upload** - Configure image handling and storage
5. **Test thoroughly** - Verify all CRUD operations work correctly
6. **Deploy** - Set up production environment

This implementation guide provides the complete foundation for building a robust dashboard with full CRUD operations for both Cities and Stories content management.
