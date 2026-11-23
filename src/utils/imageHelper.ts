/**
 * Image URL Resolver & Fallback Helper
 * Memastikan gambar selalu tampil baik saat dibuka di:
 * - Localhost (dev)
 * - Vercel / Production domain
 * - Path lokal /gambar/
 */

export const FALLBACK_EMPTY_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23f1f5f9"/></svg>';

export function getImageUrl(path: string | null | undefined, fallback: string = ''): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback;
  }

  const clean = path.trim();

  // 1. Jika path lokal frontend publik (/gambar/..., /hero/..., /logo.png, dll.)
  // Utamakan langsung file di public/gambar
  const resolved = clean.startsWith('/') ? clean : `/${clean}`;
  if (
    resolved.startsWith('/gambar/') || 
    resolved.startsWith('/hero/') || 
    resolved.startsWith('/logo') || 
    resolved.startsWith('/assets/') ||
    resolved.startsWith('/card')
  ) {
    return resolved.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }

  // 2. Jika data URL base64
  if (clean.startsWith('data:image/')) {
    return clean;
  }

  // 3. Jika sudah merupakan full URL http/https
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }

  return resolved;
}
