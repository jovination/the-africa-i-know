// Test YouTube integration
const { extractVideoId, fetchYouTubeVideoData } = require('./lib/youtube.ts');

async function testYouTubeIntegration() {
  const testUrl = "https://youtu.be/4TjMG4KuDXc?si=1UdyYUQiYYn3GCL-";
  
  console.log("Testing YouTube URL:", testUrl);
  
  // Test video ID extraction
  const videoId = extractVideoId(testUrl);
  console.log("Extracted video ID:", videoId);
  
  if (videoId) {
    // Test fetching video data
    try {
      const videoData = await fetchYouTubeVideoData(testUrl);
      console.log("Fetched video data:", videoData);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  } else {
    console.error("Failed to extract video ID");
  }
}

testYouTubeIntegration();
