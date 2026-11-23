import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, BookOpen, GraduationCap, 
  Building2, Users, CheckCircle2,
  Award, Compass, PhoneCall, Calendar, Sparkles, Languages,
  Library, HeartHandshake, MapPin, Check, ChevronRight, Clock,
  X, ZoomIn,
  Image as ImageIcon, MousePointerClick, Newspaper
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO, PROGRAMS as FALLBACK_PROGRAMS, FACILITIES as FALLBACK_FACILITIES, NEWS_DATA as FALLBACK_NEWS, LATEST_POSTS as FALLBACK_LATEST_POSTS, GALLERY_ITEMS as FALLBACK_GALLERY } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';
import { createSlug } from '../utils/slug';
import { getImageUrl } from '../utils/imageHelper';

const HERO_SLIDES = [
  {
    image: "/hero/hero1.webp",
    title: "Pariwisata Berkelanjutan di Pulau Terluar Nusantara",
    subtitle: "Mengembangkan potensi ekowisata berbasis komunitas yang melestarikan alam samudra dan mengangkat harkat ekonomi lokal.",
    badge: "GSTC-Aligned Ecotourism"
  },
  {
    image: "/hero/hero2.webp",
    title: "Mencerdaskan Generasi Emas Pesisir Indonesia",
    subtitle: "Fasilitas belajar modern ramah surya, kurikulum literasi maritim digital, dan beasiswa bahari penuh untuk anak-anak kepulauan terluar.",
    badge: "Marine Education & Literacy"
  },
  {
    image: "/hero/hero3.webp",
    title: "Kedaulatan Ekonomi dari Laut Kita Sendiri",
    subtitle: "Hilirisasi rumput laut regeneratif, fasilitas rantai dingin surya (Solar Cold Chain), dan koperasi nelayan modern terhubung pasar global.",
    badge: "Blue Economy & Independence"
  },
  {
    image: "/hero/hero4.webp",
    title: "Merestorasi Ekosistem Laut dan Pesisir",
    subtitle: "Perlindungan keanekaragaman hayati samudra, restorasi spider reef, dan mitigasi krisis iklim bersama komunitas adat kepulauan.",
    badge: "Marine Conservation & Blue Carbon"
  }
];

const STRIP_PILLARS = [
  {
    icon: Compass,
    title: "Pariwisata Berkelanjutan",
    desc: "Community-based ecotourism & sertifikasi GSTC",
    tag: "Ekowisata"
  },
  {
    icon: GraduationCap,
    title: "Pendidikan Maritim",
    desc: "Learning center surya & beasiswa penuh pesisir",
    tag: "Literasi Bahari"
  },
  {
    icon: Award,
    title: "Ekonomi Biru",
    desc: "Solar cold chain & budidaya rumput laut",
    tag: "Kemandirian"
  },
  {
    icon: ShieldCheck,
    title: "Konservasi Laut",
    desc: "Restorasi terumbu karang & zero plastic islands",
    tag: "Blue Carbon"
  },
  {
    icon: HeartHandshake,
    title: "Masyarakat Adat",
    desc: "Pemberdayaan kearifan lokal pesisir nusantara",
    tag: "Komunitas"
  }
];

export const HomePage: React.FC = () => {
  const { ppdbSettings, news, gallery, facilities, programs, siteInfo } = useAppStoreData();
  const NEWS_DATA = news && news.length > 0 ? news : FALLBACK_NEWS;
  const GALLERY_ITEMS = gallery && gallery.length > 0 ? gallery : FALLBACK_GALLERY;
  const FACILITIES = facilities && facilities.length > 0 ? facilities : FALLBACK_FACILITIES;
  const PROGRAMS = programs && programs.length > 0 ? programs : FALLBACK_PROGRAMS;
  const SITE_INFO = siteInfo || FALLBACK_SITE_INFO;
  const LATEST_POSTS = NEWS_DATA.slice(0, 4);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeProgram, setActiveProgram] = useState(0);
  const [newsHeroIndex, setNewsHeroIndex] = useState(0);
  const [previewModal, setPreviewModal] = useState<{
    image: string;
    title: string;
    category?: string;
    id?: string;
  } | null>(null);

  // Close preview on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

    // Ambil hanya gambar dari database galeri. Prioritaskan 5 foto favorit (isFeatured)
  const validDbGallery = (gallery || []).filter((item: any) => item.image && item.image.trim() !== '');
  const featuredDbGallery = validDbGallery.filter((item: any) => item.isFeatured);
  const nonFeaturedDbGallery = validDbGallery.filter((item: any) => !item.isFeatured);
  const prioritizedGallery = [...featuredDbGallery, ...nonFeaturedDbGallery];
  
  // Tepat 5 frame (jika belum ada/kurang dari 5 foto, slot sisanya bernilai null agar frame kosong tetap tampil rapi)
  const galleryPicks = [
    prioritizedGallery[0] || null,
    prioritizedGallery[1] || null,
    prioritizedGallery[2] || null,
    prioritizedGallery[3] || null,
    prioritizedGallery[4] || null,
  ];

  const newsHeroSlides = NEWS_DATA.slice(0, 4);
  const currentNewsSlide = newsHeroSlides[newsHeroIndex] || newsHeroSlides[0];

  const PROGRAM_DATA = [
    {
      id: "tourism",
      category: "Pilar 01",
      number: "01",
      title: "Pariwisata Berkelanjutan",
      subtitle: "Community-Based Ecotourism & Sertifikasi GSTC",
      desc: "Transformasi desa wisata ramah lingkungan, audit jejak karbon destinasi, standardisasi homestay bertenaga surya, dan sertifikasi pemandu wisata bahari.",
      highlights: [
        "Sertifikasi Ekowisata Internasional GSTC",
        "Standardisasi Homestay Berkelanjutan",
        "Akademi Pemandu Wisata & Penyelamatan Laut",
        "Revitalisasi Seni Musik Sasando & Tenun Ikat"
      ],
      link: "/program#tourism",
      linkLabel: "Pelajari Ekowisata",
      image: "/hero/hero1.webp",
      quote: "Pariwisata yang bermartabat adalah pariwisata yang menjaga kelestarian alam dan menyejahterakan warga lokal.",
      quoteSource: "Prinsip Ekowisata",
      icon: Compass,
      badge: "GSTC Certified",
      stats: { value: "180%", label: "Kenaikan Income Warga" }
    },
    {
      id: "education",
      category: "Pilar 02",
      number: "02",
      title: "Pendidikan & Literasi Maritim",
      subtitle: "Marine Learning Centers & Beasiswa Pesisir",
      desc: "Pembangunan pusat belajar mandiri bertenaga surya di pulau terpencil, kurikulum sains kelautan kontekstual, dan beasiswa penuh bagi putra-putri nelayan.",
      highlights: [
        "6 Unit Marine Learning Center Bertenaga Surya",
        "Kurikulum Literasi Maritim Kontekstual",
        "Beasiswa Penuh Jenjang SMP hingga PTN",
        "Pelatihan Vokasi Pemuda & Teknisi Perahu"
      ],
      link: "/program#education",
      linkLabel: "Lihat Program Pendidikan",
      image: "/hero/hero2.webp",
      quote: "Mendidik generasi maritim adalah mengembalikan kedaulatan masa depan bangsa di lautan.",
      quoteSource: "Visi Bahari",
      icon: GraduationCap,
      badge: "100 Siswa Lulus",
      stats: { value: "1.200+", label: "Anak Terlayani" }
    },
    {
      id: "economy",
      category: "Pilar 03",
      number: "03",
      title: "Ekonomi Biru & Rantai Dingin",
      subtitle: "Budidaya Regeneratif & Koperasi Nelayan Modern",
      desc: "Membasmi ketergantungan nelayan pada tengkulak dengan fasilitas mesin es bertenaga surya (Solar Cold Chain), budidaya rumput laut higienis, dan hilirisasi nira lontar.",
      highlights: [
        "Solar Cold Chain Mesin Es Tenaga Surya",
        "Solar Dome Dryer Rumput Laut Ekspor",
        "Hilirisasi Gula & Nira Pohon Lontar Organik",
        "Garam Laut Artisanal Alami Tunnel Kaca"
      ],
      link: "/program#economy",
      linkLabel: "Jelajahi Ekonomi Biru",
      image: "/hero/hero3.webp",
      quote: "Lautan Indonesia berlimpah, kemakmurannya harus kembali penuh kepada nelayan yang merawatnya.",
      quoteSource: "Kedaulatan Maritim",
      icon: Award,
      badge: "Solar Cold Chain",
      stats: { value: "+60%", label: "Margin Nelayan" }
    },
    {
      id: "environment",
      category: "Pilar 04",
      number: "04",
      title: "Konservasi Lingkungan Laut",
      subtitle: "Restorasi Karang, Blue Carbon & Zero-Plastic",
      desc: "Transplantasi karang tahan panas spider reef, penanaman sabuk hijau mangrove penyerap karbon, dan inisiatif Bank Sampah penukar sembako bebas plastik.",
      highlights: [
        "15.000+ Mangrove Ditanam (Survival Rate 92%)",
        "Restorasi Terumbu Karang Spider Reef",
        "5 Desa Berhasil Raih Bebas Sampah Plastik",
        "Patroli Komunitas Adat Cegah Destructive Fishing"
      ],
      link: "/program#environment",
      linkLabel: "Bersama Jaga Laut",
      image: "/hero/hero4.webp",
      quote: "Merawat karang dan mangrove adalah menjaga benteng masa depan bumi kita dari krisis iklim.",
      quoteSource: "Sains Konservasi",
      icon: ShieldCheck,
      badge: "Zero Plastic Islands",
      stats: { value: "25 Ton", label: "Sampah Diangkat" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="space-y-0 w-full overflow-x-hidden bg-white text-slate-800">
      
      {/* 1. HERO SLIDER SECTION + VALUE PILLARS MARQUEE */}
      <section className="relative w-full h-[calc(100svh-4rem)] lg:h-[calc(100vh-6.5rem)] max-h-[820px] min-h-[500px] bg-[#070c09] overflow-hidden flex flex-col justify-between">
        {/* Background Slider Images */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[8000ms]"
            />
            {/* Gradasi Elegan: Hitam Pekat & Emerald Halus di Kiri ke Transparan di Kanan */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(7, 12, 9, 0.98) 0%, rgba(6, 28, 20, 0.90) 38%, rgba(6, 28, 20, 0.45) 72%, rgba(7, 12, 9, 0.15) 100%)'
              }}
            />
            {/* Penyeimbang bayangan bawah untuk perangkat mobile */}
            <div 
              className="absolute inset-0 pointer-events-none sm:hidden"
              style={{
                background: 'linear-gradient(to top, rgba(7, 12, 9, 0.95) 0%, rgba(7, 12, 9, 0.4) 40%, transparent 80%)'
              }}
            />
          </div>
        ))}

        {/* Content Container (Center Aligned Flex Grow) */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex-1 flex flex-col justify-center pt-2 pb-0">
          <div className="max-w-4xl relative min-h-[220px] sm:min-h-[250px] lg:min-h-[260px]">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 space-y-3 sm:space-y-4 lg:space-y-4 ${
                  index === currentSlide
                    ? 'opacity-100 relative pointer-events-auto'
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                {/* Heading Modern Lebih Besar & Berbobot */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-extrabold tracking-tight text-white drop-shadow-md leading-[1.1] max-w-3xl">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-lg lg:text-xl text-stone-200/90 leading-relaxed max-w-2xl font-normal drop-shadow-sm line-clamp-3 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                {/* Modern Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-1.5">
                  <Link
                    to="/program"
                    className="bg-aurora-btn text-white font-bold px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-blue-950/20 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Pelajari Program</span>
                    <ArrowRight className="w-4 h-4 text-white/90" />
                  </Link>
                  
                  <Link
                    to="/kontak"
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                  >
                    <Compass className="w-4 h-4 text-cyan-300" />
                    <span>Hubungi Kami</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 pt-2 sm:pt-2.5 pb-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 sm:w-8 bg-gold-400' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. VALUE PILLARS MARQUEE (Posisi presisi di dalam viewport desktop tanpa terpotong taskbar) */}
        <div className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-black/40 backdrop-blur-[4px] py-1.5 sm:py-2 shrink-0">
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex w-max animate-marquee-rtl items-center">
              {[...STRIP_PILLARS, ...STRIP_PILLARS, ...STRIP_PILLARS, ...STRIP_PILLARS].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 sm:px-6 py-0.5 transition-opacity group cursor-default"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 stroke-[2] drop-shadow-sm group-hover:scale-110 transition-transform duration-150" />
                    <span className="text-xs sm:text-sm font-medium text-white drop-shadow-sm tracking-wide whitespace-nowrap">
                      {item.title}
                    </span>
                    <span className="text-white/40 ml-3.5 sm:ml-6 select-none">•</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROFIL INSTITUSI & SAMBUTAN (Layout 60/40 dengan Proporsi Ringkas & Presisi) */}
      <section className="py-12 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Foto Kolase Artistik Bertingkat (Multi-frame Slice Mosaic - Compact Scale) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end lg:pr-4">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px] h-[330px] sm:h-[360px]">
              {/* Gambar dasar / latar utama */}
              <div className="absolute inset-x-5 inset-y-4 overflow-hidden rounded-xl shadow-md border border-slate-200/80 bg-slate-100">
                <img
                  src="/hero/hero1.webp"
                  alt="Sovereign Blue Foundation"
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />
              </div>

              {/* Panel pecahan kiri atas (overlap frame dengan garis border putih) */}
              <div className="absolute -top-1 left-0 w-3/5 h-3/5 rounded-xl overflow-hidden shadow-xl border-[2.5px] border-white bg-slate-100 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/hero/hero1.webp"
                  alt=""
                  className="w-[170%] h-[170%] max-w-none object-cover -translate-x-3 -translate-y-3"
                />
              </div>

              {/* Panel pecahan vertikal kanan */}
              <div className="absolute top-5 right-0 w-[27%] h-3/5 rounded-xl overflow-hidden shadow-lg border-[2.5px] border-white bg-slate-100 transition-transform duration-500 hover:translate-y-1">
                <img
                  src="/hero/hero1.webp"
                  alt=""
                  className="w-[360%] h-[170%] max-w-none object-cover -translate-x-[68%] -translate-y-8"
                />
              </div>

              {/* Panel pecahan kanan bawah */}
              <div className="absolute bottom-0 right-2 w-7/12 h-1/2 rounded-xl overflow-hidden shadow-xl border-[2.5px] border-white bg-slate-100 transition-transform duration-500 hover:translate-x-1">
                <img
                  src="/hero/hero1.webp"
                  alt=""
                  className="w-[175%] h-[200%] max-w-none object-cover -translate-x-[42%] -translate-y-[48%]"
                />
              </div>

              {/* Aksen pecahan kecil kiri bawah */}
              <div className="absolute bottom-3 left-2 w-14 h-14 rounded-lg overflow-hidden shadow-md border-2 border-white bg-slate-100 transition-transform duration-500 hover:scale-105">
                <img
                  src="/hero/hero1.webp"
                  alt=""
                  className="w-[500%] h-[500%] max-w-none object-cover -translate-x-[15%] -translate-y-[80%]"
                />
              </div>
            </div>
          </div>

          {/* Kolom Informasi & Nilai Keunggulan */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Membangun Kemandirian Maritim & <span className="text-sky-800">Menjaga Kedaulatan Laut</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Sovereign Blue Foundation berikhtiar mewujudkan kepulauan Indonesia yang berdaya secara ekonomi, berpendidikan tinggi, dan teguh merawat keanekaragaman hayati samudra melalui model ekowisata dan energi surya terpadu.
            </p>



            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 bg-aurora-btn text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Baca Profil & Visi Misi</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROGRAM UNGGULAN & KURIKULUM (Clean White Section with Modern Glassmorphism Cards) */}
      <section className="relative pt-20 pb-10 lg:pt-24 lg:pb-12 bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Minimalist Clean Frame */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold text-sky-800 uppercase tracking-widest block">
                  Empat Pilar Utama
                </span>
                <span className="h-[2px] w-16 bg-sky-600 block rounded-full"></span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
                Program Unggulan.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Sinergi pariwisata berkelanjutan, pendidikan maritim modern, hilirisasi ekonomi biru berbasis tenaga surya, dan restorasi ekosistem laut nusantara.
              </p>
            </div>
          </div>

          {/* Interactive instruction hint positioned right above the cards */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium -mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
            <span>Klik kartu untuk membuka detail program</span>
          </div>

          {/* INTERACTIVE EXPANDING ACCORDION (Desktop: Horizontal Expansion with Emerald Glass Gradient Card) */}
          <div className="hidden lg:flex gap-3.5 h-[490px] w-full items-stretch transition-all duration-500">
            {PROGRAM_DATA.map((prog, idx) => {
              const isSelected = activeProgram === idx;
              const IconComp = prog.icon;
              
              // Heights offset sesuai estetika arsitektur Gambar 2
              const heightClass = 
                idx === 0 ? "h-[88%] self-end" :
                idx === 1 ? "h-[94%] self-end" :
                idx === 2 ? "h-full self-end" : "h-[92%] self-end";

              return (
                <div
                  key={prog.id}
                  onClick={() => setActiveProgram(idx)}
                  className={`group/card relative overflow-hidden cursor-pointer transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl ${heightClass} ${
                    isSelected 
                      ? 'flex-[3.2] bg-gradient-to-br from-[#03203c] via-[#07325b] to-[#01aafd] text-white shadow-2xl border border-sky-400/40 ring-1 ring-sky-400/30' 
                      : 'flex-1 bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] text-slate-800 border border-sky-200/60 hover:bg-sky-900/90 hover:border-sky-500 hover:shadow-lg'
                  }`}
                >
                  {/* Background Image with overlay */}
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      isSelected ? 'scale-105 opacity-40 filter contrast-125' : 'opacity-30 filter group-hover/card:opacity-45 group-hover/card:scale-105'
                    }`}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isSelected 
                      ? 'bg-gradient-to-t from-[#03203c]/95 via-[#07325b]/80 to-transparent' 
                      : 'bg-gradient-to-t from-[#021b35]/85 via-[#07325b]/60 to-transparent group-hover/card:bg-gradient-to-t group-hover/card:from-[#03203c]/95 group-hover/card:via-[#07325b]/85 group-hover/card:to-[#07325b]/70'
                  }`} />

                  {/* KONDISI EXPANDED: Melebar ke Samping dengan Emerald Gradient & Glass Tiles */}
                  {isSelected ? (
                    <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between animate-fadeIn text-white">
                      
                      {/* Top Bar: Bersih, Minimalis, Putih Terang */}
                      <div className="flex items-center justify-between border-b border-white/20 pb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl font-bold text-white">
                            {prog.number}.
                          </span>
                          <span className="text-[11px] tracking-wider uppercase text-white font-normal">
                            {prog.category}
                          </span>
                          {/* Button di samping kanan Program Inti */}
                          <Link
                            to={prog.link}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[11px] font-normal text-white hover:text-white transition-colors group/btn py-1 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md ml-1"
                          >
                            <span>{prog.linkLabel}</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform stroke-[1.75]" />
                          </Link>
                        </div>
                        {/* Icon murni tanpa shape tebal */}
                        <IconComp className="w-4 h-4 text-white stroke-[1.75]" />
                      </div>

                      {/* Middle Body: Tipografi Standar Selaras, Putih Terang */}
                      <div className="space-y-3 my-auto py-1.5">
                        <div className="space-y-0.5">
                          <p className="text-[11px] uppercase tracking-widest text-white/90 font-normal">
                            {prog.subtitle}
                          </p>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                            {prog.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13px] text-white/95 font-normal leading-relaxed max-w-xl">
                          {prog.desc}
                        </p>

                        {/* Highlights Grid: Glassmorphism Tiles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {prog.highlights.map((item, hIdx) => (
                            <div 
                              key={hIdx} 
                              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2]" />
                              <span className="text-[11px] text-white font-normal">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Bar: Quote */}
                      <div className="pt-3.5 border-t border-white/20 flex items-center justify-between gap-4">
                        <div className="max-w-md">
                          <p className="text-[11px] text-white font-normal italic">
                            "{prog.quote}"
                          </p>
                          <span className="text-[10px] text-white/80 block mt-0.5">
                            — {prog.quoteSource}
                          </span>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* KONDISI COLLAPSED: Strip Vertikal Hijau Keputihan dengan Teks Bersih & Hover State Hijau */
                    <div className="relative z-10 h-full p-5 flex flex-col justify-between items-center text-center transition-colors duration-300">
                      <div className="flex flex-col items-center gap-2.5">
                        <span className="text-sm font-bold text-sky-950 group-hover/card:text-white transition-colors">
                          {prog.number}
                        </span>
                        {/* Icon murni tanpa shape kaku */}
                        <IconComp className="w-3.5 h-3.5 text-sky-900 group-hover/card:text-sky-200 stroke-[2] transition-colors" />
                      </div>

                      {/* Icon klik murni tanpa shape bulatan, berwarna putih */}
                      <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform scale-90 group-hover/card:scale-105 flex flex-col items-center gap-1 py-1">
                        <MousePointerClick className="w-5 h-5 text-white stroke-[2] drop-shadow-md animate-bounce" />
                        <span className="text-[10px] font-medium text-white/90 tracking-wider">
                          Klik
                        </span>
                      </div>

                      {/* Teks Vertikal Reguler Selaras */}
                      <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-2.5 transition-colors">
                        <span className="text-[10px] uppercase tracking-widest text-sky-800/80 group-hover/card:text-sky-200/90 font-normal">
                          {prog.category}
                        </span>
                        <span className="text-xs font-semibold text-sky-950 group-hover/card:text-white tracking-wide whitespace-nowrap">
                          {prog.title}
                        </span>
                      </div>

                      {/* Indicator titik hijau segar */}
                      <div className="w-2 h-2 rounded-full bg-sky-700/60 group-hover/card:bg-sky-400 group-hover/card:scale-125 transition-all" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* TAMPILAN MOBILE / TABLET (Glassmorphism Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {PROGRAM_DATA.map((prog, idx) => {
              const isSelected = activeProgram === idx;
              const IconComp = prog.icon;
              return (
                <div
                  key={prog.id}
                  onClick={() => setActiveProgram(idx)}
                  className={`group/mcard rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-br from-[#03203c] via-[#07325b] to-[#01aafd] text-white border-sky-400/40 shadow-2xl' 
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-[#07325b] hover:text-white hover:border-sky-500 shadow-sm'
                  }`}
                >
                  <div className="relative overflow-hidden">
                    {/* Background image preview on mobile card */}
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isSelected ? 'opacity-25' : 'opacity-15'}`} 
                    />
                    <div className="relative z-10 p-5 sm:p-6 space-y-4">
                      <div className={`flex items-center justify-between border-b pb-3 ${isSelected ? 'border-white/20' : 'border-slate-100 group-hover/mcard:border-white/20'}`}>
                      <div className="flex items-center gap-2.5">
                        <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-400 group-hover/mcard:text-white'}`}>
                          {prog.number}.
                        </span>
                        <span className={`text-[11px] font-normal uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-500 group-hover/mcard:text-white/80'}`}>
                          {prog.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isSelected && (
                          <span className="text-[10px] py-0.5 px-2 rounded-full bg-sky-50 text-sky-800 border border-sky-200 group-hover/mcard:bg-white/20 group-hover/mcard:text-white group-hover/mcard:border-white/30 font-medium">
                            Klik kartu
                          </span>
                        )}
                        <IconComp className={`w-4 h-4 stroke-[1.75] ${isSelected ? 'text-white' : 'text-slate-500 group-hover/mcard:text-white'}`} />
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-lg font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900 group-hover/mcard:text-white'}`}>
                        {prog.title}
                      </h3>
                      <p className={`text-xs mt-1 leading-relaxed font-normal ${isSelected ? 'text-white' : 'text-slate-600 group-hover/mcard:text-white/90'}`}>
                        {prog.desc}
                      </p>
                    </div>

                    {/* Extended Details when expanded */}
                    {isSelected && (
                      <div className="space-y-4 pt-3 border-t border-white/20 animate-fadeIn">
                        <div className="space-y-2">
                          {prog.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs text-white font-normal py-1.5 px-2.5 rounded-lg bg-white/10 border border-white/20">
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-end border-t border-white/15">
                          <Link
                            to={prog.link}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-normal text-white hover:underline"
                          >
                            <span>{prog.linkLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              );
            })}
          </div>



        </div>
      </section>

      {/* 5. BERITA & CERITA MARITIM */}
      <section className="py-12 md:py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Main Featured News Card (Left - 8 cols) */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-sm border border-slate-900/10 min-h-[380px] md:min-h-[420px] flex flex-col justify-end p-5 sm:p-8 group bg-slate-900">
              {/* Background Image with Overlay */}
              {currentNewsSlide?.image && currentNewsSlide.image.trim() !== '' ? (
                <img 
                  src={getImageUrl(currentNewsSlide.image)} 
                  alt={currentNewsSlide.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
              <div className="absolute inset-0 bg-sky-950/30 mix-blend-multiply"></div>

              {/* Content Box */}
              <div className="relative z-10 space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-category-blue text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm">
                    {currentNewsSlide.category}
                  </span>
                  <span className="text-sky-300 text-[11px] font-semibold tracking-wide">
                    {currentNewsSlide.subCategory || "Kabar Pilihan"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                  {currentNewsSlide.title}
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-200 line-clamp-2 leading-relaxed">
                  {currentNewsSlide.summary}
                </p>

                {/* Bottom CTA and Dots Indicator */}
                <div className="pt-1.5 flex flex-wrap items-center justify-between gap-4">
                  <Link 
                    to={`/berita/${currentNewsSlide.slug || createSlug(currentNewsSlide.title)}`}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {newsHeroSlides.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setNewsHeroIndex(dotIdx)}
                        aria-label={`Slide ${dotIdx + 1}`}
                        className={`h-1.5 transition-all rounded-full ${
                          dotIdx === newsHeroIndex 
                            ? 'w-5 bg-sky-400' 
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Postingan Terbaru Sidebar (Right - 4 cols) */}
            <div className="lg:col-span-4 bg-white text-slate-800 rounded-2xl p-5 flex flex-col justify-between border border-slate-200/90 shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></div>
                    <h3 className="font-bold text-xs tracking-wide text-slate-900 uppercase">
                      Postingan Terbaru
                    </h3>
                  </div>
                  <Link 
                    to="/berita" 
                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 transition-colors"
                  >
                    Lihat Semua
                  </Link>
                </div>

                {/* List of Latest Posts */}
                <div className="divide-y divide-slate-100">
                  {LATEST_POSTS.map((post, idx) => {
                    const hasImg = Boolean(post.image && post.image.trim() !== '');
                    return (
                      <Link 
                        key={idx} 
                        to={`/berita/${post.slug || createSlug(post.title)}`}
                        className="py-2.5 flex items-center gap-3 group cursor-pointer block"
                      >
                        {/* Mini Thumbnail */}
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                          {hasImg ? (
                            <img 
                              src={getImageUrl(post.image)} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Newspaper className="w-5 h-5 text-slate-400" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-0.5">
                          <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-sky-700 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span className="text-sky-700 font-semibold">{post.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 text-slate-400" />
                              {post.timeAgo || (post as any).date || 'Baru saja'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 text-center">
                <Link 
                  to="/berita" 
                  className="text-xs text-sky-700 font-semibold hover:text-sky-800 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Jelajahi seluruh kabar maritim</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SECTION CARD DOKUMENTASI & GALERI ARSITEKTURAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pb-16">
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            
            {/* Galeri Mosaik Arsitektural */}
            <div className="w-full">
              <div className="space-y-3.5">
                {/* Accent mini header dengan tombol Jelajahi Galeri di kanan atas */}
                <div className="flex items-center justify-between pb-1.5 border-b border-sky-900/10">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-900/80">
                    Dokumentasi
                  </span>
                  <Link
                    to="/galeri"
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-sky-900 hover:text-sky-700 transition-colors group"
                  >
                    <span>Jelajahi Galeri</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-800 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="relative">
                  {/* Geometric notches */}
                  <div className="absolute -top-1.5 left-1/4 w-2.5 h-2.5 bg-slate-800 rounded-xs z-20 pointer-events-none hidden sm:block" />
                  <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 bg-slate-800 rounded-xs z-20 pointer-events-none hidden sm:block" />

                  <div className="grid grid-cols-12 gap-2.5">
                    {/* Baris 1: 3 Foto Berjajar (Frame 1, 2, 3) */}
                    <div 
                      onClick={() => setPreviewModal({ image: galleryPicks[0]?.image, title: galleryPicks[0]?.title || '', category: galleryPicks[0]?.category, id: galleryPicks[0]?.id })}
                      className="col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${galleryPicks[0]?.title || ''}`}
                    >
                      <img
                        src={getImageUrl(galleryPicks[0]?.image)}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                      />
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-sky-950" />
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPreviewModal({ image: galleryPicks[1]?.image, title: galleryPicks[1]?.title || '', category: galleryPicks[1]?.category, id: galleryPicks[1]?.id })}
                      className="col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${galleryPicks[1]?.title || ''}`}
                    >
                      <img
                        src={getImageUrl(galleryPicks[1]?.image)}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                      />
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-sky-950" />
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPreviewModal({ image: galleryPicks[2]?.image, title: galleryPicks[2]?.title || '', category: galleryPicks[2]?.category, id: galleryPicks[2]?.id })}
                      className="col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${galleryPicks[2]?.title || ''}`}
                    >
                      <img
                        src={getImageUrl(galleryPicks[2]?.image)}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                      />
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-sky-950" />
                        </div>
                      </div>
                    </div>

                    {/* Baris 2: Foto Kiri Melebar (Frame 4 - 8 kolom) & Frame Foto Kanan (Frame 5 - 4 kolom) */}
                    <div 
                      onClick={() => setPreviewModal({ image: galleryPicks[3]?.image, title: galleryPicks[3]?.title || '', category: galleryPicks[3]?.category, id: galleryPicks[3]?.id })}
                      className="col-span-8 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${galleryPicks[3]?.title || ''}`}
                    >
                      <img
                        src={getImageUrl(galleryPicks[3]?.image)}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                      />
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-sky-950" />
                        </div>
                      </div>
                    </div>

                    {/* Frame Foto Kanan Bawah */}
                    <div 
                      onClick={() => setPreviewModal({ image: galleryPicks[4]?.image, title: galleryPicks[4]?.title || '', category: galleryPicks[4]?.category, id: galleryPicks[4]?.id })}
                      className="col-span-4 aspect-[8/10] rounded-2xl overflow-hidden bg-slate-200 shadow-xs group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat foto ${galleryPicks[4]?.title || ''}`}
                    >
                      <img
                        src={getImageUrl(galleryPicks[4]?.image)}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                      />
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn className="w-3.5 h-3.5 text-sky-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Lightbox / Modal Kotak Foto Sesuai Desain Editorial */}
      {previewModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setPreviewModal(null)}
        >
          {/* Top Bar: close button */}
          <div className="w-full max-w-xl flex items-center justify-between pb-3 px-1 text-white">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/80">
              {previewModal.category || "Dokumentasi"}
            </span>

            <button
              onClick={() => setPreviewModal(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all active:scale-95"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Card Modal Kotak */}
          <div 
            className="relative w-full max-w-xl bg-white p-1 sm:p-1.5 rounded-[22px] sm:rounded-[26px] shadow-2xl overflow-hidden border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Image Container with Rounded Corners */}
            <div className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-stone-950">
              <img
                src={previewModal.image}
                alt={previewModal.title}
                className="w-full h-full object-cover animate-in fade-in zoom-in-[0.98] duration-200"
              />

              {/* Floating Link ke Halaman Galeri */}
              {previewModal.id && (
                <Link
                  to={`/galeri?photo=${encodeURIComponent(previewModal.id)}`}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-sky-800 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  onClick={() => setPreviewModal(null)}
                >
                  <span>Buka di Galeri</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              {/* Floating Judul Pojok Kanan Bawah */}
              <div className="absolute bottom-0 right-0 bg-white pt-2.5 pb-2 px-4 rounded-tl-[18px] shadow-sm max-w-[88%] sm:max-w-[78%]">
                <span className="text-[10px] uppercase font-bold text-sky-800 tracking-wider block">
                  Sovereign Blue
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight leading-snug truncate">
                  {previewModal.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Subtext Footer */}
          <div className="w-full max-w-xl text-center pt-3 text-[11px] text-white/60 tracking-wider">
            <span>Klik area luar atau tombol silang untuk menutup foto</span>
          </div>
        </div>
      )}

    </div>
  );
};

