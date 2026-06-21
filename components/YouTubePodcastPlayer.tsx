'use client';

import OfficialYouTubePlayer from './OfficialYouTubePlayer';

interface YouTubePodcastPlayerProps {
  youtubeUrl: string;
  youtubeId?: string;
  title?: string;
  description?: string;
  episodeTitle?: string;
}

export default function YouTubePodcastPlayer({
  youtubeUrl,
  youtubeId,
  title,
  description,
  episodeTitle
}: YouTubePodcastPlayerProps) {
  return (
    <OfficialYouTubePlayer
      youtubeUrl={youtubeUrl}
      youtubeId={youtubeId}
      title={title}
      description={description}
      episodeTitle={episodeTitle}
    />
  );
}
