// Test YouTube integration component
"use client"

import { useState, useEffect } from "react"
import { extractVideoId, fetchYouTubeVideoData } from "@/lib/youtube"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { City } from "@/app/data/cities"

export default function TestYouTubeIntegration() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const testUrl = "https://youtu.be/4TjMG4KuDXc?si=1UdyYUQiYYn3GCL-"

  const runTest = async () => {
    setLoading(true)
    setError("")
    
    try {
      console.log("Testing YouTube URL:", testUrl)
      
      // Test video ID extraction
      const videoId = extractVideoId(testUrl)
      console.log("Extracted video ID:", videoId)
      
      if (!videoId) {
        throw new Error("Failed to extract video ID")
      }

      // Test fetching video data
      const videoData = await fetchYouTubeVideoData(testUrl)
      console.log("Fetched video data:", videoData)
      
      setTestResult(videoData)
    } catch (err) {
      console.error("Test error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold">YouTube Integration Test</h2>
          <p className="text-gray-600">Testing with: {testUrl}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runTest} disabled={loading}>
            {loading ? "Testing..." : "Run Test"}
          </Button>
          
          {error && (
            <div className="text-red-600 p-4 bg-red-50 rounded">
              Error: {error}
            </div>
          )}
          
          {testResult && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">✅ Test Results:</h3>
              <div className="bg-green-50 p-4 rounded">
                <pre className="text-sm">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Video ID:</strong> {testResult.videoId}
                </div>
                <div>
                  <strong>Title:</strong> {testResult.title}
                </div>
                <div>
                  <strong>Views:</strong> {testResult.views}
                </div>
                <div>
                  <strong>Published:</strong> {testResult.publishedDate}
                </div>
                <div>
                  <strong>Platform:</strong> {testResult.platform}
                </div>
                <div>
                  <strong>Thumbnail:</strong> 
                  <img 
                    src={testResult.thumbnail} 
                    alt="Thumbnail" 
                    className="w-20 h-20 object-cover rounded mt-2"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
