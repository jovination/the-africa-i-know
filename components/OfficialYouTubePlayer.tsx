'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface OfficialYouTubePlayerProps {
  youtubeUrl: string;
  title?: string;
  description?: string;
  episodeTitle?: string;
  coverImage?: string;
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setPlaybackRate: (rate: number) => void;
}

declare global {
  interface Window {
    YT: {
      Player: unknown;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function OfficialYouTubePlayer({
  youtubeUrl,
  title,
  description,
  episodeTitle,
  coverImage
}: OfficialYouTubePlayerProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [videoTitle, setVideoTitle] = useState<string>(title || '');
  const [videoAuthor, setVideoAuthor] = useState<string>(description || '');
  const playerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Extract video ID from URL
  const extractVideoId = useCallback((url: string): string => {
    const patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /embed\/([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return '';
  }, []);

  const videoId = extractVideoId(youtubeUrl);

  // Fetch video metadata from YouTube oEmbed
  useEffect(() => {
    async function fetchVideoMetadata() {
      if (!videoId) return;

      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

        if (response.ok) {
          const data = await response.json();
          setVideoTitle(data.title || title || '');
          setVideoAuthor(data.author_name || description || '');
        }
      } catch (err) {
        console.error('Error fetching video metadata:', err);
      }
    }

    fetchVideoMetadata();
  }, [videoId, title, description]);

  const generateWaveform = useCallback(() => {
    // Responsive number of bars based on screen size
    const getBarCount = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 768) return 30;     // Tablet
        if (width < 1024) return 70;    // Small desktop
        return 165;                      // Large desktop
      }
      return 170; // Default
    };

    const bars = getBarCount();
    const wave: number[] = [];
    for (let i = 0; i < bars; i++) {
      const height = Math.random() * 0.8 + 0.2;
      wave.push(height);
    }
    setWaveformData(wave);
  }, []);

  const initializePlayer = useCallback(() => {
    if (!videoId || !playerRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (window.YT.Player as any)(playerRef.current, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event: { target: YouTubePlayer }) => {
          setPlayer(event.target);
          setDuration(event.target.getDuration());
          generateWaveform();
        },
        onStateChange: (event: { data: number }) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        }
      }
    });
  }, [videoId, generateWaveform]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!videoId) return;

    // Load API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }
  }, [videoId, initializePlayer]);

  // Update time periodically
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player && player.getCurrentTime) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const togglePlayPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const skip = (seconds: number) => {
    if (!player) return;
    const newTime = Math.max(0, Math.min(player.getCurrentTime() + seconds, duration));
    player.seekTo(newTime, true);
  };

  const toggleSpeed = () => {
    if (!player) return;
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    player.setPlaybackRate(nextSpeed);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player) return;
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    player.seekTo(percentage * duration, true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const finalCoverImage = coverImage || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!videoId) {
    return (
      <div className="bg-white rounded-2xl p-8 w-full max-w-5xl border border-gray-200">
        <p className="text-center text-gray-600">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-6xl border border-gray-200">
      {/* Hidden YouTube Player */}
      <div ref={playerRef} className="hidden" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Image */}
        <div className="shrink-0 w-full md:w-auto">
          <div className="relative w-full md:w-48 h-64 rounded-2xl overflow-hidden">
            <Image
              src={finalCoverImage}
              alt={title || 'Video'}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Title and Description */}
          <div>
            <p className="text-xl font-bold text-black mb-2 m-0">{videoTitle || title || 'YouTube Video'}</p>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {videoAuthor || description || 'Watch this video from YouTube'}
            </p>
          </div>

          {/* Play/Pause Button */}
          <div className="flex items-center gap-6 my-4">
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-black" />
              ) : (
                <Play className="w-8 h-8 text-black ml-1" />
              )}
            </button>

            {/* Waveform / Progress Bar */}
            <div className="relative h-15 flex-1">
              <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="absolute inset-0 cursor-pointer group"
              >
                {/* Waveform visualization */}
                <div className="absolute inset-0 hidden md:flex items-center justify-center gap-px px-2">
                  {waveformData.map((height, index) => {
                    const barProgress = (index / waveformData.length) * 100;
                    const isPlayed = barProgress <= progress;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center"
                        style={{ width: '3px', flex: '0 0 3px' }}
                      >
                        <div
                          className={`w-full rounded-sm transition-colors ${
                            isPlayed ? 'bg-green-500' : 'bg-black'
                          }`}
                          style={{
                            height: `${height * 60}px`,
                            minHeight: '4px'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Simple progress bar for mobile */}
                <div className="absolute inset-0 md:hidden flex items-center">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Time indicators */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
                  <p className="bg-green-400 text-black px-3 py-1 rounded-full text-sm font-medium shadow-md m-0">
                    {formatTime(currentTime)}
                  </p>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
                  <p className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md m-0">
                    {formatTime(duration)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Speed Control */}
              <button
                onClick={toggleSpeed}
                className="px-4 py-2 border border-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-semibold text-black m-0">{playbackSpeed}×</p>
              </button>

              {/* Skip Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => skip(-15)}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  <SkipBack className="w-6 h-6 text-black" />
                  <p className="text-black m-0">15</p>
                </button>

                <button
                  onClick={() => skip(15)}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  <p className="text-black m-0">15</p>
                  <SkipForward className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>

            {/* Share & Subscribe */}
            <div className="flex gap-6 text-black">
              <button className="hover:text-blue-600 transition-colors font-medium">
                <p className="m-0 text-sm">Share</p>
              </button>
              <button className="hover:text-blue-600 transition-colors font-medium">
                <p className="m-0 text-sm">Subscribe</p>
              </button>
            </div>
          </div>

          {/* Episode Title */}
          <p className="text-gray-700 text-sm mt-4">{episodeTitle || 'YouTube Episode'}</p>
        </div>
      </div>

      {/* Transcript Toggle */}
      <button
        onClick={() => setShowTranscript(!showTranscript)}
        className="flex items-center justify-between w-full mt-6 pt-6 border-t border-gray-200"
      >
        <p className="text-blue-600 font-bold text-sm m-0">Read Transcript</p>
        <ChevronDown
          className={`w-5 h-5 text-blue-600 transition-transform ${showTranscript ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Transcript Content */}
      {showTranscript && (
        <div className="mt-4 p-6 bg-gray-50 rounded-xl max-h-64 overflow-y-auto">
          <p className="text-gray-700 leading-relaxed text-sm">
            Transcript content is not available for this video.
          </p>
        </div>
      )}
    </div>
  );
}
