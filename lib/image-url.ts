export const IMAGE_PLACEHOLDER = "/Africa-new.png";

export const GOOGLE_DRIVE_IMAGE_SIZE = "w1200";

export function extractGoogleDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns = [
    /drive\.google\.com\/file\/d\/([^/?#]+)/i,
    /drive\.google\.com\/open\?id=([^&]+)/i,
    /drive\.google\.com\/uc(?:\?|\/)(?:[^#]*&)?id=([^&]+)/i,
    /drive\.google\.com\/thumbnail\?id=([^&]+)/i,
    /drive\.usercontent\.google\.com\/(?:download|uc)\?(?:[^#]*&)?id=([^&]+)/i,
    /lh3\.googleusercontent\.com\/d\/([^=/?#]+)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function toGoogleDriveImageUrl(fileId: string, size = GOOGLE_DRIVE_IMAGE_SIZE): string {
  return `https://lh3.googleusercontent.com/d/${fileId}=${size}-rw`;
}

/**
 * Converts pasted sharing links (Google Drive, Imgur, etc.) into direct image URLs.
 * Returns a local placeholder for invalid or empty links.
 */
export function normalizeImageUrl(url: string, width?: number): string {
  if (!url) {
    return IMAGE_PLACEHOLDER;
  }

  if (url.startsWith("/")) {
    return url;
  }

  const size = width ? `w${width}` : GOOGLE_DRIVE_IMAGE_SIZE;

  const fileId = extractGoogleDriveFileId(url);
  if (fileId) {
    return toGoogleDriveImageUrl(fileId, size);
  }

  try {
    const parsed = new URL(url);

    if (parsed.pathname.includes("/folders/")) {
      return IMAGE_PLACEHOLDER;
    }

    if (parsed.hostname.endsWith("googleusercontent.com") && !url.includes("=w")) {
      const id = url.match(/\/d\/([^=/?#]+)/)?.[1];
      if (id) {
        return toGoogleDriveImageUrl(id, size);
      }
    }

    if (parsed.hostname === "imgur.com" || parsed.hostname === "www.imgur.com") {
      const hashId = url.match(/#([a-zA-Z0-9]+)/)?.[1];
      if (hashId) {
        return `https://i.imgur.com/${hashId}.jpg`;
      }

      const pathId = parsed.pathname.match(/^\/(?:gallery|a)\/[^/]+\/([a-zA-Z0-9]+)/)?.[1];
      if (pathId) {
        return `https://i.imgur.com/${pathId}.jpg`;
      }

      const directId = parsed.pathname.match(/^\/([a-zA-Z0-9]{5,})\/?$/)?.[1];
      if (directId && directId !== "gallery" && directId !== "a") {
        return `https://i.imgur.com/${directId}.jpg`;
      }

      return IMAGE_PLACEHOLDER;
    }

    if (parsed.hostname === "i.imgur.com" && !parsed.pathname.includes(".")) {
      return `${url}.jpg`;
    }

    return url;
  } catch {
    return IMAGE_PLACEHOLDER;
  }
}
