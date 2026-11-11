/**
 * Image URL Resolver & Fallback Helper
 * Memastikan gambar selalu tampil baik saat dibuka di:
 * - Vercel (almursyidtanggamus.web.id)
 * - Localhost (dev)
 * - Domain Hostinger langsung (orange-cheetah-927765.hostingersite.com)
 */

export const HOSTINGER_BASE_URL = 'https://orange-cheetah-927765.hostingersite.com';

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

export function getImageUrl(path: string | null | undefined, fallback: string = FALLBACK_IMAGE): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback;
  }

  const clean = path.trim();

  // 1. Jika sudah merupakan full URL (http:// atau https://), gunakan langsung
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    // Jika masih mengarah ke localhost saat di production, replace ke hostinger
    if (clean.includes('localhost') || clean.includes('127.0.0.1')) {
      return clean.replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, HOSTINGER_BASE_URL);
    }
    return clean;
  }

  // 2. Jika path adalah data URL base64
  if (clean.startsWith('data:image/')) {
    return clean;
  }

  // 3. Jika path gambar ada di uploads backend Hostinger (/uploads/...)
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const relative = clean.startsWith('/') ? clean : `/${clean}`;
    return `${HOSTINGER_BASE_URL}${relative}`;
  }

  // 4. Jika aset lokal frontend publik (/gambar/..., /hero/..., /logo.png, dll.)
  if (clean.startsWith('/')) {
    return clean;
  }

  return `/${clean}`;
}
