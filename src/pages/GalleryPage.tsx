import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ZoomIn, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';
import { getImageUrl } from '../utils/imageHelper';

export const GalleryPage: React.FC = () => {
  const location = useLocation();
  const { gallery } = useAppStoreData();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 4; // Menampilkan 4 frame gambar di daftar bawahnya

  // Ambil hanya gambar yang valid dari database galeri
  const allValidItems = (gallery || []).filter(
    (item: any) => item.image && item.image.trim() !== ''
  );

  // Pisahkan 5 foto favorit untuk Top Frame
  const featuredItems = allValidItems.filter((item: any) => item.isFeatured);
  const nonFeaturedItems = allValidItems.filter((item: any) => !item.isFeatured);

  // 5 Frame Atas Utama (Tampil persis seperti di Beranda, slot kosong tetap menampilkan frame)
  const top5Items: (GalleryItem | null)[] = [
    featuredItems[0] || nonFeaturedItems[0] || null,
    featuredItems[1] || nonFeaturedItems[1] || null,
    featuredItems[2] || nonFeaturedItems[2] || null,
    featuredItems[3] || nonFeaturedItems[3] || null,
    featuredItems[4] || nonFeaturedItems[4] || null,
  ];

  // Sisa foto di luar 5 frame atas
  const top5Ids = new Set(top5Items.filter(Boolean).map(i => i!.id));
  const remainingGallery = allValidItems.filter(item => !top5Ids.has(item.id));

  // Paginasi sisa foto: 4 frame per page dengan tombol prev/next
  const totalPages = Math.ceil(remainingGallery.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRemainingPageItems = remainingGallery.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Seluruh item untuk interaksi Lightbox
  const GALLERY_ITEMS = allValidItems;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Otomatis buka foto jika ada parameter ?photo= atau ?id= di URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const photoId = params.get('photo') || params.get('id');
    if (photoId) {
      const foundIdx = GALLERY_ITEMS.findIndex(
        (item, idx) => item.id === photoId || String(idx) === photoId
      );
      if (foundIdx !== -1) {
        setActiveIndex(foundIdx);
      }
    }
  }, [location.search, GALLERY_ITEMS]);

  // Touch gesture state for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_ITEMS.length;
    });
  }, [GALLERY_ITEMS.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    });
  }, [GALLERY_ITEMS.length]);

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleNext, handlePrev]);

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeItem: GalleryItem | null = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Header editorial ala Bento */}
        <header className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-800 block">
              Kisah & Cerita Kami
            </span>
            <span className="h-[2px] w-14 sm:w-16 bg-sky-600 block rounded-full"></span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08]">
              Galeri Foto
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xs sm:text-right leading-relaxed font-normal">
              Dokumentasi visual aksi nyata dan inisiatif pergerakan maritim Sovereign Blue Foundation.
            </p>
          </div>
        </header>

        {/* BAGIAN 1: 5 FRAME UTAMA TOP FAVORIT (Persis seperti Beranda) */}
        <div className="space-y-3 sm:space-y-4 mb-14">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-900/80">
              Dokumentasi Pilihan Utama (5 Frame)
            </span>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            {/* Row 1: Frame 1 (Wide 8/12) & Frame 2 (Normal 4/12) */}
            <div className="col-span-12 md:col-span-8">
              {(() => {
                const item = top5Items[0];
                return (
                  <div
                    onClick={() => {
                      if (item) {
                        const idx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
                        if (idx !== -1) setActiveIndex(idx);
                      }
                    }}
                    className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 border border-slate-200/80 shadow-xs ${item ? 'cursor-pointer hover:shadow-md' : 'flex flex-col items-center justify-center text-slate-300'}`}
                  >
                    {item ? (
                      <>
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 select-none">
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                        <span className="text-xs font-bold text-slate-400">Frame 1</span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="col-span-12 md:col-span-4">
              {(() => {
                const item = top5Items[1];
                return (
                  <div
                    onClick={() => {
                      if (item) {
                        const idx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
                        if (idx !== -1) setActiveIndex(idx);
                      }
                    }}
                    className={`group relative aspect-[4/3] md:aspect-auto md:h-full rounded-2xl overflow-hidden bg-stone-100 border border-slate-200/80 shadow-xs ${item ? 'cursor-pointer hover:shadow-md' : 'flex flex-col items-center justify-center text-slate-300'}`}
                  >
                    {item ? (
                      <>
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 select-none py-10">
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                        <span className="text-xs font-bold text-slate-400">Frame 2</span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Row 2: 3 Frame Berjajar (Frame 3, 4, 5) */}
            {[2, 3, 4].map((fIdx) => {
              const item = top5Items[fIdx];
              return (
                <div 
                  key={fIdx}
                  className="col-span-12 sm:col-span-4"
                >
                  <div
                    onClick={() => {
                      if (item) {
                        const idx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
                        if (idx !== -1) setActiveIndex(idx);
                      }
                    }}
                    className={`group relative aspect-[4/3] sm:aspect-square lg:aspect-[4/3.5] rounded-2xl overflow-hidden bg-stone-100 border border-slate-200/80 shadow-xs ${item ? 'cursor-pointer hover:shadow-md' : 'flex flex-col items-center justify-center text-slate-300'}`}
                  >
                    {item ? (
                      <>
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 select-none py-10">
                        <ImageIcon className="w-7 h-7 text-slate-300" />
                        <span className="text-xs font-bold text-slate-400">Frame {fIdx + 1}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BAGIAN 2: DAFTAR 4 FRAME GAMBAR DI BAWAHNYA DENGAN NEXT / PREV JIKA FOTO > 5 */}
        {remainingGallery.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  Dokumentasi Lainnya
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Menampilkan {currentRemainingPageItems.length} dari {remainingGallery.length} foto dokumentasi
                </p>
              </div>
            </div>

            {/* Grid 4 Frame Gambar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentRemainingPageItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    const idx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
                    if (idx !== -1) setActiveIndex(idx);
                  }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-slate-200/80 shadow-xs cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <p className="text-xs font-bold text-white truncate drop-shadow-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Garis Pembatas dan Tombol Prev / Next ala Gambar 4 */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center gap-1.5 transition-colors ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:text-sky-700'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <span className="text-xs text-slate-400 font-normal">
                  Halaman {currentPage} dari {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center gap-1.5 transition-colors ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:text-sky-700'}`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Lightbox Instagram / Editorial Slider Card ala Gambar 2 */}
      {activeItem && activeIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setActiveIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Bar: swipe indicator & close button */}
          <div className="w-full max-w-xl flex items-center justify-between pb-3 px-1 text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-opacity active:scale-95"
            >
              <span>swipe</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setActiveIndex(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Card ala Gambar 2 (Thin White Outer Border, Clean & Modern) */}
          <div 
            className="relative w-full max-w-xl bg-white p-1 sm:p-1.5 rounded-[22px] sm:rounded-[26px] shadow-2xl overflow-hidden border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Image Container with Rounded Corners */}
            <div className="relative w-full aspect-[4/4] sm:aspect-[4/3.8] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-stone-950">
              <img
                src={getImageUrl(activeItem.image)}
                alt={activeItem.title}
                key={activeItem.id}
                className="w-full h-full object-cover animate-in fade-in zoom-in-[0.98] duration-200"
              />

              {/* Counter Badge Pojok Kiri Atas ala Gambar 2 (3/7 style) */}
              <div className="absolute top-0 left-0 bg-white pt-2 pb-1.5 px-3 sm:px-3.5 rounded-br-[16px] shadow-xs flex items-center gap-0.5">
                <span className="text-xs sm:text-sm font-extrabold text-stone-900 leading-none">
                  {activeIndex + 1}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-400 leading-none">
                  /{GALLERY_ITEMS.length}
                </span>
              </div>

              {/* Floating Judul Pojok Kanan Bawah ala Badge 'Open Living' Gambar 2 */}
              <div className="absolute bottom-0 right-0 bg-white pt-2 pb-2 px-3.5 sm:px-4 rounded-tl-[18px] shadow-sm max-w-[85%] sm:max-w-[75%]">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight leading-snug truncate">
                  {activeItem.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Subtext Footer Info di Bawah Card */}
          <div className="w-full max-w-xl text-center pt-3 text-[11px] text-white/60 tracking-wider">
            <span>Klik swipe &gt; di atas atau geser (swipe) layar untuk berpindah foto</span>
          </div>

        </div>
      )}

    </div>
  );
};
