/**
 * Hero background — served from `/public/hero-video.mp4` (keep under ~2MB for instant load).
 */
export const HERO_BACKGROUND_VIDEO = "/hero-video.mp4";

/** Entire-site background — must not be the same file as `HERO_BACKGROUND_VIDEO`. */
export const PAGE_AMBIENT_VIDEO = "/ambient-page-background.mp4";

/**
 * Remote fallback if `ambient-page-background.mp4` is missing (not the hero asset).
 * Prefer your own file in `public/` for performance and branding.
 */
export const PAGE_AMBIENT_VIDEO_FALLBACK =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
