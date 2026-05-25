/**
 * Converts pasted sharing links (Google Drive, Imgur, etc.) into direct image URLs
 * that Next.js Image can load.
 */
export function normalizeImageUrl(url: string, width = 1000): string {
  if (!url || url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname === "drive.google.com") {
      const fileId =
        url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] ??
        parsed.searchParams.get("id");

      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
      }
    }

    if (parsed.hostname.endsWith("googleusercontent.com")) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (fileId && !url.includes("=w")) {
        return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
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
    }

    if (parsed.hostname === "i.imgur.com" && !parsed.pathname.includes(".")) {
      return `${url}.jpg`;
    }

    return url;
  } catch {
    return url;
  }
}
