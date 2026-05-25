"use client";

import { useState, type ImgHTMLAttributes } from "react";
import {
  extractGoogleDriveFileId,
  normalizeImageUrl,
  toGoogleDriveExportUrl,
} from "@/lib/image-url";

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
  const fileId = extractGoogleDriveFileId(src);
  const primarySrc = normalizeImageUrl(src, imageWidth);
  const [imgSrc, setImgSrc] = useState(primarySrc);
  const [failed, setFailed] = useState(false);

  if (!primarySrc || failed) {
    return null;
  }

  return (
    // Plain img bypasses /_next/image — Google Drive URLs break Next.js image optimization on Vercel.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      referrerPolicy="no-referrer"
      decoding="async"
      onError={(event) => {
        if (fileId && imgSrc !== toGoogleDriveExportUrl(fileId)) {
          setImgSrc(toGoogleDriveExportUrl(fileId));
          return;
        }
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
