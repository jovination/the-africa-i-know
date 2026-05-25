type StoryImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
};

/** Direct <img> — never uses /_next/image (Google Drive URLs fail Vercel optimization). */
export function StoryImage({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
}: StoryImageProps) {
  if (!src?.trim()) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      referrerPolicy="no-referrer"
      decoding="async"
    />
  );
}
