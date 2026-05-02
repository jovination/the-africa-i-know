import { NextRequest, NextResponse } from "next/server"
import { fetchYouTubeVideoData } from "@/lib/youtube"

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json()
    
    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400 }
      )
    }
    
    const videoData = await fetchYouTubeVideoData(videoUrl)
    
    if (!videoData) {
      return NextResponse.json(
        { error: "Failed to fetch video data" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ data: videoData })
  } catch (error) {
    console.error("YouTube API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
