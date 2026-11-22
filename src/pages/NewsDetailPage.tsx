import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  UserCheck,
  Link2,
  Check
} from 'lucide-react';
import { NEWS_DATA as FALLBACK_NEWS } from '../data/siteData';
import { createSlug } from '../utils/slug';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = React.useState(false);
  const { news } = useAppStoreData();
  const NEWS_DATA = news && news.length > 0 ? news : FALLBACK_NEWS;

  // Hanya gunakan artikel asli dari database / news store
  const allArticles = React.useMemo(() => {
    return [...NEWS_DATA];
  }, [NEWS_DATA]);

  // Temukan artikel berdasarkan slug yang cocok
  const article = allArticles.find((item) => {
    const generatedSlug = createSlug(item.title);
    return generatedSlug === slug || item.id === slug || (item as any).slug === slug;
  }) || allArticles[0];

  // Update Dynamic Open Graph & Meta Tags for Social Media Sharing (WA, FB, IG, Twitter, dsb)
  useEffect(() => {
    if (!article) return;

    // Document Title
    document.title = `${article.title} | Sovereign Blue Foundation`;

    // Helper untuk update/insert meta tag
    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const currentUrl = window.location.href;

    // Open Graph Tags
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:title', article.title);
    setMetaTag('property', 'og:description', article.summary || article.title);
    setMetaTag('property', 'og:image', article.image);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:site_name', 'Sovereign Blue Foundation Tanggamus');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', article.title);
    setMetaTag('name', 'twitter:description', article.summary || article.title);
    setMetaTag('name', 'twitter:image', article.image);

    // Standard Description
    setMetaTag('name', 'description', article.summary || article.title);

    return () => {
      document.title = "Sovereign Blue Foundation Islamic Boarding School | Tanggamus Lampung";
    };
  }, [article]);

  // Rekomendasi berita terkait (Related Articles) selain artikel aktif
  const relatedArticles = allArticles
    .filter((item) => createSlug(item.title) !== createSlug(article.title))
    .slice(0, 5);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(article.title);
  const shareUrl = encodeURIComponent(currentUrl);

  // Link WhatsApp lengkap dengan judul dan preview URL
  const waShareUrl = `https://api.whatsapp.com/send?text=${shareTitle}%0A%0A${shareUrl}`;
  // Link Facebook Dialog Sharer
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24">
      
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-sky-700 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link to="/berita" className="hover:text-sky-700 transition-colors">Berita</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-medium truncate max-w-xs sm:max-w-md">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Layout 2 Kolom: Kiri Konten Berita (lg:col-span-8), Kanan Sidebar Share & Related Articles (lg:col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* KOLOM KIRI: MAIN ARTICLE */}
          <article className="lg:col-span-8 space-y-6">
            
            {/* Header: Judul Berita Utama */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.25]">
                {article.title}
              </h1>

              {/* Author, Kategori, Tanggal */}
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-500">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs ring-2 ring-sky-50">
                  <UserCheck className="w-3.5 h-3.5 text-sky-700" />
                </div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="font-semibold text-slate-800">Humas Sovereign Blue</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sky-700 font-medium">{article.category}</span>
                  <span className="text-slate-300">•</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>

            {/* Featured Image dengan Rounded Presisi (Tampil jika sudah diupload) */}
            {article.image && article.image.trim() !== '' && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 aspect-video md:aspect-[16/9]">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Body Content */}
            <div className="prose prose-slate max-w-none space-y-5 text-[15px] sm:text-base leading-relaxed text-slate-700 pt-2">
              {/* Tampilkan teks murni asli dari dashboard */}
              {(() => {
                const rawContent = (article as any).content || article.summary || '';
                return (
                  <div className="whitespace-pre-line text-slate-800 font-normal leading-relaxed text-[15px] sm:text-base">
                    {rawContent}
                  </div>
                );
              })()}
            </div>

            {/* Back Button */}
            <div className="pt-8 border-t border-slate-100">
              <Link 
                to="/berita"
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100/70 px-5 py-2.5 rounded-full transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Halaman Berita</span>
              </Link>
            </div>

          </article>

          {/* KOLOM KANAN: SIDEBAR (Share to + Related Articles) */}
          <aside className="lg:col-span-4 space-y-8 lg:pl-4">
            
            {/* 1. Share to Box */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Share to
              </h3>
              <div className="flex items-center gap-2.5">
                
                {/* 1. WhatsApp */}
                <a 
                  href={waShareUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke WhatsApp"
                  title="Bagikan ke WhatsApp"
                  className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center text-slate-600 hover:text-sky-700 hover:border-sky-600 hover:bg-sky-50/60 active:scale-[0.96] transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.906.533 3.69 1.458 5.215L2 22l4.908-1.428a9.98 9.98 0 0 0 5.123 1.46c5.535 0 10.031-4.496 10.031-10.031C22.062 6.496 17.566 2 12.031 2zm5.82 14.285c-.244.686-1.419 1.314-1.956 1.398-.518.082-1.187.117-3.414-.805-2.85-1.18-4.685-4.084-4.827-4.274-.141-.19-1.157-1.54-1.157-2.937 0-1.397.732-2.083.992-2.368.26-.285.57-.356.76-.356.19 0 .38 0 .546.01.178.01.417-.067.652.498.244.587.834 2.038.907 2.185.073.147.122.321.024.515-.097.194-.146.315-.29.488-.146.173-.307.387-.439.52-.147.147-.3.308-.129.602.17.294.759 1.253 1.63 2.029 1.121.998 2.066 1.308 2.36 1.455.294.147.464.122.637-.073.173-.195.74-1.077 1.036-1.546.297-.47.59-.392.993-.243.402.148 2.553 1.205 2.991 1.424.439.22.732.33.84.514.108.184.108 1.066-.136 1.752z" />
                  </svg>
                </a>

                {/* 2. Facebook */}
                <a 
                  href={fbShareUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Facebook"
                  title="Bagikan ke Facebook"
                  className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center text-slate-600 hover:text-sky-700 hover:border-sky-600 hover:bg-sky-50/60 active:scale-[0.96] transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* 3. Instagram (Direct to Instagram Web / Story Intent dengan Copy Link otomatis) */}
                <button
                  type="button"
                  onClick={() => {
                    handleCopyLink();
                    window.open('https://instagram.com', '_blank');
                  }}
                  aria-label="Bagikan ke Instagram"
                  title="Buka Instagram (Link disalin otomatis)"
                  className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center text-slate-600 hover:text-sky-700 hover:border-sky-600 hover:bg-sky-50/60 active:scale-[0.96] transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>

                {/* 4. Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Salin Tautan"
                  title="Salin Link Berita"
                  className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center text-slate-600 hover:text-sky-700 hover:border-sky-600 hover:bg-sky-50/60 active:scale-[0.96] transition-all shadow-xs relative"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-sky-600 animate-in zoom-in" />
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                </button>

              </div>

              {copied && (
                <div className="text-[11px] text-sky-700 bg-sky-50 border border-sky-200/60 px-2.5 py-1.5 rounded-lg font-medium inline-flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Tautan berita berhasil disalin!</span>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            {/* 2. Related Articles */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Related Articles
              </h3>

              <div className="space-y-4 divide-y divide-slate-100">
                {relatedArticles.map((rel, idx) => {
                  const relSlug = createSlug(rel.title);
                  return (
                    <Link 
                      key={idx} 
                      to={`/berita/${relSlug}`}
                      className="pt-3.5 first:pt-0 flex items-center gap-3.5 group block"
                    >
                      {/* Thumbnail Image (Tampil jika sudah diupload) */}
                      {rel.image && rel.image.trim() !== '' ? (
                        <div className="relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                          <img 
                            src={rel.image} 
                            alt={rel.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-800 font-bold text-xs">
                          Sovereign Blue
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-sky-700 transition-colors">
                          {rel.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 block font-medium">
                          {rel.category}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
};

