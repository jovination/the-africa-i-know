"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { normalizeImageUrl } from "@/lib/image-url";

type RemoteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  width?: number;
  height?: number;
};

export function RemoteImage({
  src,
  width,
  height,
  loading = "lazy",
  className,
  alt = "",
  onError,
  ...props
}: RemoteImageProps) {
  const imageWidth = typeof width === "number" ? width : 1200;
  const normalizedSrc = normalizeImageUrl(src, imageWidth);
  const [error, setError] = useState(false);

  if (!normalizedSrc || error) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={normalizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      referrerPolicy="no-referrer"
      decoding="async"
      onError={(event) => {
        setError(true);
        onError?.(event);
      }}
    />
  );
}
