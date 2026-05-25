"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { normalizeImageUrl } from "@/lib/image-url";

type RemoteImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function RemoteImage({
  src,
  width,
  height,
  loading = "lazy",
  className,
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
    <Image
      {...props}
      src={normalizedSrc}
      width={width}
      height={height}
      loading={loading}
      className={className}
      referrerPolicy="no-referrer"
      onError={(event) => {
        setError(true);
        onError?.(event);
      }}
    />
  );
}
