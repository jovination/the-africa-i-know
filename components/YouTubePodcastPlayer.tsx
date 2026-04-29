'use client';

import OfficialYouTubePlayer from './OfficialYouTubePlayer';

interface YouTubePodcastPlayerProps {
  youtubeUrl: string;
  title?: string;
  description?: string;
  episodeTitle?: string;
}

export default function YouTubePodcastPlayer({
  youtubeUrl,
  title,
  description,
  episodeTitle
}: YouTubePodcastPlayerProps) {
  return (
    <OfficialYouTubePlayer
      youtubeUrl={youtubeUrl}
      title={title}
      description={description}
      episodeTitle={episodeTitle}
    />
  );
}
