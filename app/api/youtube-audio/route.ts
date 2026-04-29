import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const youtubeUrl = searchParams.get('url');

  if (!youtubeUrl) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  // Extract YouTube video ID
  const videoId = extractYouTubeId(youtubeUrl);

  if (!videoId || !ytdl.validateURL(youtubeUrl)) {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
  }

  try {
    console.log('Fetching YouTube info for:', videoId);

    // Try multiple approaches to get video info
    let info;
    try {
      // First attempt with basic options
      info = await ytdl.getInfo(youtubeUrl);
    } catch (firstError) {
      console.log('First attempt failed, trying with different user agent:', firstError);
      // Second attempt with user agent
      info = await ytdl.getInfo(youtubeUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }
      });
    }

    console.log('Available formats count:', info.formats.length);
    console.log('Video details:', {
      title: info.videoDetails.title,
      duration: info.videoDetails.lengthSeconds,
      isLive: info.videoDetails.isLive,
      isPrivate: info.videoDetails.isPrivate,
      isUnlisted: info.videoDetails.isUnlisted
    });

    // Try multiple approaches to find audio
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    
    // If no audio-only formats, try formats with audio and video
    if (!audioFormats || audioFormats.length === 0) {
      console.log('No audio-only formats, trying formats with audio');
      audioFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
    }

    // If still no formats, try all formats that have audio codecs
    if (!audioFormats || audioFormats.length === 0) {
      console.log('Trying all formats with audio codecs');
      audioFormats = info.formats.filter(format => 
        format.hasAudio && format.codecs && format.codecs.includes('mp4a')
      );
    }

    // Last resort: try to construct direct audio URL using common itags
    if (!audioFormats || audioFormats.length === 0) {
      console.log('Trying direct URL construction for common audio itags');
      const commonAudioItags = [140, 141, 251, 250, 249];
      audioFormats = info.formats.filter(format => 
        commonAudioItags.includes(format.itag) && format.url
      );
    }

    if (!audioFormats || audioFormats.length === 0) {
      console.log('Available formats:', info.formats.map(f => ({ 
        itag: f.itag, 
        mimeType: f.mimeType, 
        hasAudio: f.hasAudio,
        hasVideo: f.hasVideo,
        codecs: f.codecs,
        url: f.url ? 'has url' : 'no url'
      })));
      return NextResponse.json({ error: 'No audio format found' }, { status: 404 });
    }

    console.log('Found audio formats:', audioFormats.length);

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

    return NextResponse.json({
      audioUrl: bestAudio.url,
      title: info.videoDetails.title,
      thumbnail: thumbnail,
      duration: parseInt(info.videoDetails.lengthSeconds),
      videoId,
      author: info.videoDetails.author.name,
    });
  } catch (error) {
    console.error('Error extracting audio:', error);
    return NextResponse.json({
      error: 'Failed to extract audio from YouTube. The video may be restricted or unavailable.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

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
