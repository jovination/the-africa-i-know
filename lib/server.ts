import express from 'express';
import cors from 'cors';
import ytdl from '@distube/ytdl-core';

const app = express();
const PORT = 3001;

// Enable CORS for Vite dev server
app.use(cors());

// YouTube audio endpoint
app.get('/api/youtube-audio', async (req, res) => {
  const youtubeUrl = req.query.url as string;

  if (!youtubeUrl) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  // Extract YouTube video ID
  const videoId = extractYouTubeId(youtubeUrl);

  if (!videoId || !ytdl.validateURL(youtubeUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    console.log('Fetching YouTube info for:', videoId);

    // Get video info
    const info = await ytdl.getInfo(youtubeUrl);

    // Find best audio format
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (!audioFormats || audioFormats.length === 0) {
      return res.status(404).json({ error: 'No audio format found' });
    }

    // Get highest quality audio
    const bestAudio = audioFormats.reduce((best, current) => {
      const bestBitrate = best.audioBitrate || 0;
      const currentBitrate = current.audioBitrate || 0;
      return currentBitrate > bestBitrate ? current : best;
    });

    // Get thumbnail
    const thumbnail = info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]?.url ||
                      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    console.log('Successfully extracted audio for:', info.videoDetails.title);

    res.json({
      audioUrl: bestAudio.url,
      title: info.videoDetails.title,
      thumbnail: thumbnail,
      duration: parseInt(info.videoDetails.lengthSeconds),
      videoId,
      author: info.videoDetails.author.name,
    });
  } catch (error) {
    console.error('Error extracting audio:', error);
    res.status(500).json({
      error: 'Failed to extract audio from YouTube. The video may be restricted or unavailable.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

function extractYouTubeId(url: string): string | null {
  // Handle various YouTube URL formats including with parameters
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,  // ?v=ID or &v=ID (handles si parameter etc)
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,  // youtu.be/ID
    /embed\/([a-zA-Z0-9_-]{11})/,  // embed/ID
    /^([a-zA-Z0-9_-]{11})$/  // Just the ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'YouTube audio server is running' });
});

app.listen(PORT, () => {
  console.log(`YouTube Audio Server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/youtube-audio?url=YOUR_YOUTUBE_URL`);
});
