import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock,
  Newspaper
} from 'lucide-react';
import { 
  NEWS_DATA as FALLBACK_NEWS
} from '../data/siteData';
import { createSlug } from '../utils/slug';
import { useAppStoreData } from '../hooks/useAppStoreData';
import { getImageUrl } from '../utils/imageHelper';

export const NewsPage: React.FC = () => {
  const { news } = useAppStoreData();
  const NEWS_DATA = news && news.length > 0 ? news : FALLBACK_NEWS;
  const [heroIndex, setHeroIndex] = useState(0);

  // List headline pilihan untuk slide / carousel hero
  const heroSlides = NEWS_DATA.slice(0, 4);
  const currentSlide = heroSlides[heroIndex] || heroSlides[0];

  // List ticker dan postingan terbaru murni dari NEWS_DATA asli
  const tickerItems = NEWS_DATA.slice(0, 8);
  const latestPosts = NEWS_DATA.slice(0, 4);
  const hotLead = NEWS_DATA[0];
  const hotGrid = NEWS_DATA.slice(1, 5);

  return (
    <div className="bg-white text-slate-800 min-h-screen pb-20">
      
      {/* 1. TOP TICKER STRIP (Marquee Infinite Scroll - Pause on Hover) */}
      <section className="bg-white border-b border-slate-200/80 overflow-hidden py-2.5 relative group">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-rtl flex items-center">
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const hasImg = Boolean(item.image && item.image.trim() !== '');
            return (
              <Link 
                key={idx} 
                to={`/berita/${item.slug || createSlug(item.title)}`}
                className="flex items-center gap-3 pr-8 group/card cursor-pointer shrink-0 border-r border-slate-100 last:border-r-0 max-w-[320px] sm:max-w-[360px]"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                  {hasImg ? (
                    <img 
                      src={getImageUrl(item.image)} 
                      alt="" 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  ) : (
                    <Newspaper className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-semibold text-slate-800 line-clamp-1 leading-snug group-hover/card:text-sky-700 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-sky-700">{item.category}</span>
                    <span>•</span>
                    <span>{item.timeAgo || item.date || 'Baru saja'}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        
        {/* 2. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Banner (8 Col) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-sm border border-slate-800/10 min-h-[420px] md:min-h-[460px] flex flex-col justify-end p-6 sm:p-10 group bg-slate-900">
            {currentSlide?.image && currentSlide.image.trim() !== '' ? (
              <img 
                src={getImageUrl(currentSlide.image)} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
            <div className="absolute inset-0 bg-sky-950/30 mix-blend-multiply"></div>

            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="badge-category-blue text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-sm">
                  {currentSlide.category}
                </span>
                <span className="text-sky-300 text-xs font-semibold tracking-wide">
                  {currentSlide.subCategory || "Kabar Pilihan"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                {currentSlide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {currentSlide.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <Link 
                  to={`/berita/${currentSlide.slug || createSlug(currentSlide.title)}`}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-sky-500 hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_: any, dotIdx: number) => (
                    <button
                      key={dotIdx}
                      onClick={() => setHeroIndex(dotIdx)}
                      aria-label={`Slide ${dotIdx + 1}`}
                      className={`h-1.5 transition-all rounded-full ${
                        dotIdx === heroIndex 
                          ? 'w-6 bg-sky-400' 
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Post Terbaru (Right Box - 4 Col) */}
          <div className="lg:col-span-4 bg-white text-slate-800 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/90 shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></div>
                  <h3 className="font-bold text-sm tracking-wide text-slate-900 uppercase">
                    Postingan Terbaru
                  </h3>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {latestPosts.map((post, idx) => {
                  const hasImg = Boolean(post.image && post.image.trim() !== '');
                  return (
                    <Link 
                      key={idx} 
                      to={`/berita/${post.slug || createSlug(post.title)}`}
                      className="py-3 flex items-center gap-3.5 group cursor-pointer block"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                        {hasImg ? (
                          <img 
                            src={getImageUrl(post.image)} 
                            alt="" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.opacity = '0';
                            }}
                          />
                        ) : (
                          <Newspaper className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-sky-700 transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span className="text-sky-700 font-semibold">{post.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            {post.timeAgo || post.date || 'Baru saja'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </section>

        {/* 3. SECTION Kabar Terhangat */}
        {hotLead && (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-4 bg-sky-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Kabar Terhangat
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <Link 
                to={`/berita/${hotLead.slug || createSlug(hotLead.title)}`}
                className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[340px] md:min-h-[420px] group cursor-pointer border border-slate-200/90 shadow-sm flex flex-col justify-end p-6 block bg-slate-900"
              >
                {hotLead.image && hotLead.image.trim() !== '' ? (
                  <img 
                    src={getImageUrl(hotLead.image)} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30"></div>
                <div className="relative z-10 space-y-2.5">
                  <span className="inline-block badge-category-blue text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                    {hotLead.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
                    {hotLead.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{hotLead.timeAgo || hotLead.date || 'Baru saja'}</span>
                  </p>
                </div>
              </Link>

              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hotGrid.map((item, idx) => (
                  <Link 
                    key={idx}
                    to={`/berita/${item.slug || createSlug(item.title)}`}
                    className="relative rounded-2xl overflow-hidden h-48 sm:h-auto min-h-[195px] group cursor-pointer border border-slate-200/80 shadow-sm flex flex-col justify-end p-4 block bg-slate-900"
                  >
                    {item.image && item.image.trim() !== '' ? (
                      <img 
                        src={getImageUrl(item.image)} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.opacity = '0';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30"></div>
                    <div className="relative z-10 space-y-1.5">
                      <span className="inline-block bg-slate-900/80 backdrop-blur-sm border border-white/20 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-300 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-slate-400" />
                        <span>{item.timeAgo || item.date || 'Baru saja'}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
