"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { IMAGE_PLACEHOLDER, normalizeImageUrl } from "@/lib/image-url";

type RemoteImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function RemoteImage({
  src,
  width,
  height,
  loading = "lazy",
  onError,
  ...props
}: RemoteImageProps) {
  const imageWidth = typeof width === "number" ? width : 1200;
  const [imgSrc, setImgSrc] = useState(() => normalizeImageUrl(src, imageWidth));

  return (
    <Image
      {...props}
      src={imgSrc}
      width={width}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={(event) => {
        if (imgSrc !== IMAGE_PLACEHOLDER) {
          setImgSrc(IMAGE_PLACEHOLDER);
        }
        onError?.(event);
      }}
    />
  );
}
