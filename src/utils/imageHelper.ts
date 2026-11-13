/**
 * Image URL Resolver & Fallback Helper
 * Memastikan gambar selalu tampil baik saat dibuka di:
 * - Vercel (almursyidtanggamus.web.id)
 * - Localhost (dev)
 * - Domain Hostinger langsung (mediumorchid-zebra-535607.hostingersite.com)
 */

export const HOSTINGER_BASE_URL = 'https://mediumorchid-zebra-535607.hostingersite.com';

// Fallback kosong transparan (tidak memunculkan foto fiktif/orang asing)
export const FALLBACK_EMPTY_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23f1f5f9"/></svg>';

export function getImageUrl(path: string | null | undefined, fallback: string = ''): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback;
  }

  const clean = path.trim();

  // Hindari gambar dummy unsplash asing
  if (clean.includes('images.unsplash.com')) {
    return fallback;
  }

  // 1. Jika sudah merupakan full URL (http:// atau https://)
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    // Jika masih mengarah ke localhost saat di production, replace ke hostinger
    let url = clean;
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      url = url.replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, HOSTINGER_BASE_URL);
    }
    if (url.includes('orange-cheetah-927765.hostingersite.com')) {
      url = url.replace('orange-cheetah-927765.hostingersite.com', 'mediumorchid-zebra-535607.hostingersite.com');
    }
    if (url.includes('almursyid.sch.id')) {
      url = url.replace('https://almursyid.sch.id', HOSTINGER_BASE_URL);
    }
    if (url.includes('almursyidtanggamus.sch.id')) {
      url = url.replace('https://almursyidtanggamus.sch.id', HOSTINGER_BASE_URL);
    }
    // Jika URL mengarah ke file.php streaming di backend Hostinger, arahkan ke proxy Vercel /api/file/ jika di Vercel atau fallback direct
    if (url.includes('/backend/endpoints/file.php?f=')) {
      const parts = url.split('f=');
      const param = parts[1] ? parts[1].split('&')[0] : '';
      if (param) {
        if (typeof window !== 'undefined' && window.location.origin.includes('almursyidtanggamus.web.id')) {
          return `/api/file/${decodeURIComponent(param)}`;
        }
        return `${HOSTINGER_BASE_URL}/backend/endpoints/file.php?f=${encodeURIComponent(decodeURIComponent(param))}`;
      }
    }
    // Jika URL lama berupa direct /uploads/nama_file.png di Hostinger, arahkan ke proxy /img/ jika di Vercel atau direct Hostinger
    if (url.includes('/uploads/abs_') || url.includes('/uploads/')) {
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      if (typeof window !== 'undefined' && window.location.origin.includes('almursyidtanggamus.web.id')) {
        return `/img/${encodeURIComponent(fileName)}`;
      }
      return `${HOSTINGER_BASE_URL}/uploads/${encodeURIComponent(fileName)}`;
    }
    return url;
  }

  // 2. Jika path adalah data URL base64
  if (clean.startsWith('data:image/')) {
    return clean;
  }

  // 3. Jika path gambar ada di uploads backend Hostinger (/uploads/... atau abs_...)
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const fileName = clean.substring(clean.lastIndexOf('/') + 1);
    if (typeof window !== 'undefined' && window.location.origin.includes('almursyidtanggamus.web.id')) {
      return `/img/${encodeURIComponent(fileName)}`;
    }
    return `${HOSTINGER_BASE_URL}/uploads/${encodeURIComponent(fileName)}`;
  }

  // Jika nama file langsung upload seperti abs_202611...
  if (clean.startsWith('abs_')) {
    if (typeof window !== 'undefined' && window.location.origin.includes('almursyidtanggamus.web.id')) {
      return `/img/${encodeURIComponent(clean)}`;
    }
    return `${HOSTINGER_BASE_URL}/uploads/${encodeURIComponent(clean)}`;
  }

  // 4. Jika aset lokal frontend publik (/gambar/..., /hero/..., /logo.png, dll.)
  // Otomatis arahkan .png/.jpg/.jpeg ke .webp untuk efisiensi loading
  const resolved = clean.startsWith('/') ? clean : `/${clean}`;
  if (resolved.startsWith('/gambar/') || resolved.startsWith('/hero/') || resolved.startsWith('/logo') || resolved.startsWith('/ppdb') || resolved.startsWith('/card') || resolved.startsWith('/interior') || resolved.startsWith('/pure-room')) {
    return resolved.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }

  return resolved;
}

