"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "./ui/card"
import { fetchYouTubeVideoData } from "@/lib/youtube"
import { City } from "@/app/data/cities"

interface AddCityFormProps {
  onCityAdded?: (city: City) => void
}

export function AddCityForm({ onCityAdded }: AddCityFormProps) {
  const [formData, setFormData] = useState({
    videoUrl: "",
    location: "",
    country: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Fetch YouTube data
      const youtubeData = await fetchYouTubeVideoData(formData.videoUrl)
      
      if (!youtubeData) {
        throw new Error("Failed to fetch YouTube video data")
      }

      // Create new city object
      const newCity: City = {
        id: Date.now().toString(),
        videoId: youtubeData.videoId,
        videoUrl: formData.videoUrl,
        title: youtubeData.title,
        thumbnail: youtubeData.thumbnail,
        views: youtubeData.views,
        publishedDate: youtubeData.publishedDate,
        platform: youtubeData.platform,
        location: formData.location,
        country: formData.country
      }

      // Call callback
      if (onCityAdded) {
        onCityAdded(newCity)
      }

      // Reset form
      setFormData({ videoUrl: "", location: "", country: "" })

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold">Add New City</h3>
        <p className="text-sm text-gray-600">
          Add a city by providing a YouTube video URL and location details
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel>YouTube URL</FieldLabel>
            <FieldContent>
              <Input
                type="url"
                placeholder="https://youtu.be/..."
                value={formData.videoUrl}
                onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                required
              />
            </FieldContent>
          </Field>
          
          <Field>
            <FieldLabel>Location</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                placeholder="e.g., Dar es Salaam"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </FieldContent>
          </Field>
          
          <Field>
            <FieldLabel>Country</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                placeholder="e.g., Tanzania"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                required
              />
            </FieldContent>
          </Field>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Adding City..." : "Add City"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
