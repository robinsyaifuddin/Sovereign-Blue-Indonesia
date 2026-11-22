import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, ShieldCheck, FileText, CheckCircle2, UserCheck, 
  BookOpen, HeartHandshake, Compass, MapPin, ArrowRight, X, ZoomIn,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const AboutPage: React.FC = () => {
  const { siteInfo: STORE_SITE_INFO } = useAppStoreData();
  const SITE_INFO = STORE_SITE_INFO || FALLBACK_SITE_INFO;
  const pengurusSliderRef = useRef<HTMLDivElement>(null);

  const scrollPengurus = (direction: 'left' | 'right') => {
    if (pengurusSliderRef.current) {
      const scrollAmount = 260;
      pengurusSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-sky-100 selection:text-sky-900">
      
      {/* HERO SECTION — Inspirasi Gambar 2 (Architectural Editorial Hero) */}
      <section className="relative overflow-hidden border-b border-stone-200/70 pt-8 pb-10 md:pt-12 md:pb-12">
        {/* Subtle Concentric Rings Background (Watermark arsitektural) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
          <div className="w-[600px] h-[600px] rounded-full border border-slate-900"></div>
          <div className="w-[900px] h-[900px] rounded-full border border-slate-900 absolute"></div>
          <div className="w-[1200px] h-[1200px] rounded-full border border-slate-900 absolute"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Headline Utama & Layout Konten Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Sisi Kiri: Main Editorial Headline + Subtext */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-5 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                  Membangun ekosistem Qur'ani yang tenang & beradab.
                </h1>
                
                <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal">
                  Sovereign Blue Foundation didirikan di Nusa Tenggara Timur, Lampung untuk menghadirkan lingkungan belajar bebas distraksi, berdisiplin tinggi, dan berakar pada tradisi keilmuan Ahlussunnah wal Jama'ah.
                </p>
              </div>
            </div>

            {/* Sisi Kanan: Circular Editorial Poster Grid (Inspirasi Gambar 2) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[360px] sm:max-w-[390px] relative">
                
                {/* 2-Column Exact Layout: Kolom Kiri & Kolom Kanan */}
                <div className="grid grid-cols-2 gap-3 items-start">
                  
                  {/* KOLOM KIRI */}
                  <div className="space-y-3">
                    {/* Foto Kiri Atas: Busur Lingkaran 90 Derajat Kiri-Atas */}
                    <div className="relative aspect-[3/4] rounded-tl-[145px] overflow-hidden bg-stone-200 border border-stone-200/80 shadow-2xs group">
                      <span className="absolute top-3 left-4 z-10 text-[11px] font-bold text-white drop-shadow-md tracking-wider">
                        '22
                      </span>
                      <img 
                        src="/hero/Tahfidzul Qur'an Bersanad & Turats Keilmuan Ulama.webp" 
                        alt="Konservasi Laut & Kemaritiman Sovereign Blue" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    {/* Teks Typography Grid: Pas di bawah foto kiri atas */}
                    <div className="space-y-2.5 pt-1 pr-1">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">
                        MARITIM<br />
                        AKHLAQ<br />
                        MANDIRI
                      </h3>
                    </div>
                  </div>

                  {/* KOLOM KANAN */}
                  <div className="space-y-3">
                    {/* Foto Kanan Atas: Busur Lingkaran 90 Derajat Kanan-Atas */}
                    <div className="relative aspect-[4/3] rounded-tr-[145px] overflow-hidden bg-stone-200 border border-stone-200/80 shadow-2xs group">
                      <img 
                        src="/hero/Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi.webp" 
                        alt="Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    {/* Foto Kanan Tengah: Persegi Landscape */}
                    <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-stone-200 border border-stone-200/80 shadow-2xs group">
                      <img 
                        src="/hero/Pendidikan Holistik Berkarakter Ahlussunnah wal Jama'ah.webp" 
                        alt="Pendidikan Holistik Berkarakter Ahlussunnah wal Jama'ah" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  </div>

                </div>

                {/* Teks Memanjang ke Samping di Bawah Grid Foto */}
                <div className="pt-2.5 border-t border-stone-200/80 mt-1">
                  <p className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-stone-700 leading-snug">
                    Membangun Kemandirian Maritim & Menjaga Kedaulatan Laut Nusantara di Nusa Tenggara Timur.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SAMBUTAN PIMPINAN & LEMBAGA — Editorial Split Clean (Gaya Poster Gambar 2) */}
      <section id="sambutan" className="pt-8 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-stone-100/70 p-4 sm:p-6 lg:p-8 rounded-3xl border border-stone-200/90 shadow-2xs">
          
          {/* Kolom Kiri: Poster Profil Tokoh (4 Kolom - Full Height Sejajar dengan Kolom Kanan) */}
          <div className="lg:col-span-4 flex">
              {/* Foto Tokoh Full Frame */}
              {((typeof SITE_INFO?.leadership?.pembina === 'object' && SITE_INFO?.leadership?.pembina?.image && !SITE_INFO.leadership.pembina.image.includes('unsplash.com'))) ? (
                <div className="w-full rounded-3xl overflow-hidden bg-stone-900 border border-sky-900/50 shadow-md group relative min-h-[350px] lg:min-h-full">
                  <img 
                    src={SITE_INFO.leadership.pembina.image} 
                    alt={typeof SITE_INFO?.leadership?.pembina === 'object' ? SITE_INFO?.leadership?.pembina?.name : SITE_INFO?.leadership?.pembina || 'Pembina Yayasan'} 
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent flex flex-col justify-end p-6 text-center">
                    <p className="text-lg font-bold tracking-tight text-white drop-shadow-sm">
                      {typeof SITE_INFO?.leadership?.pembina === 'object' ? SITE_INFO?.leadership?.pembina?.name : SITE_INFO?.leadership?.pembina}
                    </p>
                    <p className="text-xs text-sky-300 font-sans tracking-wide">
                      {(typeof SITE_INFO?.leadership?.pembina === 'object' && SITE_INFO?.leadership?.pembina?.role) ? SITE_INFO.leadership.pembina.role : 'Pembina & Pendiri Yayasan'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full rounded-3xl overflow-hidden bg-sky-900/30 border border-sky-800/40 shadow-inner flex flex-col items-center justify-center p-8 text-center min-h-[350px] lg:min-h-full">
                  <div className="w-20 h-20 rounded-full bg-sky-800/60 border border-sky-700/50 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-sm">
                    {((typeof SITE_INFO?.leadership?.pembina === 'object' ? SITE_INFO?.leadership?.pembina?.name : SITE_INFO?.leadership?.pembina) || 'U').charAt(0)}
                  </div>
                  <p className="text-xl font-bold tracking-tight text-sky-950">
                    {typeof SITE_INFO?.leadership?.pembina === 'object' ? SITE_INFO?.leadership?.pembina?.name : SITE_INFO?.leadership?.pembina}
                  </p>
                  <p className="text-xs text-sky-700 font-medium tracking-wide mt-1">
                    {(typeof SITE_INFO?.leadership?.pembina === 'object' && SITE_INFO?.leadership?.pembina?.role) ? SITE_INFO.leadership.pembina.role : 'Pembina & Pendiri Yayasan'}
                  </p>
                </div>
              )}
          </div>

          {/* Kolom Kanan: Slab Biru Azure Memanjang ke Samping yang Berisi Teks Sambutan (8 Kolom) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#03203c] via-[#07325b] to-[#01aafd] text-white rounded-3xl rounded-tr-[80px] rounded-bl-[80px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-lg space-y-6">
            
            {/* Header Card Biru */}
            <div className="border-b border-white/20 pb-4">
              <span className="text-[11px] uppercase tracking-widest text-sky-200 block font-medium">
                Sambutan Pimpinan
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mt-1 drop-shadow-sm">
                Membangun Kemandirian & Kedaulatan Bahari
              </h3>
            </div>

            {/* Isi Teks Sambutan Lengkap */}
            <div className="space-y-4 text-sm sm:text-base text-white/95 leading-relaxed font-normal">
              <p className="font-semibold text-white">
                Salam Hangat dari Pesisir Nusantara,
              </p>
              <p>
                Sovereign Blue Foundation (Yayasan Biru Berdaulat) didirikan atas keyakinan bahwa masa depan kejayaan Indonesia berakar pada kekuatan lautnya dan kemandirian masyarakat pulau-pulaunya.
              </p>
              <p>
                Melalui sinergi empat pilar utama — ekowisata berbasis komunitas, pendidikan & literasi bahari modern bertenaga surya, kemandirian ekonomi biru, serta sains konservasi terumbu karang dan sabuk mangrove — kami berkomitmen mendampingi masyarakat pesisir kepulauan terluar agar berdaya mandiri dan berdaulat.
              </p>
              <p className="font-semibold text-white pt-1">
                Bersama Menjaga Laut, Merawat Masa Depan Bangsa.
              </p>
            </div>

            {/* Footer Slab */}
            <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-sky-100/90">
              <p>PULAU ROTE & KAWASAN PESISIR</p>
              <p className="text-sky-200 font-bold">NUSA TENGGARA TIMUR, INDONESIA</p>
            </div>

          </div>

        </div>
      </section>

      {/* VISI & MISI — Architectural Editorial 4-Columns (Inspirasi Gambar 2) */}
      <section id="visi-misi" className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Top Row: Heading Kiri & Box Slab Visi Utama di Sebelah Kanan Atas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sisi Kiri Atas: Headline Besar */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Visi & Misi<br className="hidden sm:inline" /> Strategis
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-md pt-1">
                Arah gerak kedaulatan maritim dan langkah konkret Sovereign Blue Foundation dalam mendampingi masyarakat kepulauan nusantara.
              </p>
            </div>

            {/* Sisi Kanan Atas: Box Slab Visi Utama */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#03203c] via-[#07325b] to-[#01aafd] text-white p-7 sm:p-9 rounded-3xl border border-white/10 shadow-lg relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-[11px] uppercase tracking-widest text-sky-200 font-semibold">
                  Visi Pokok Organisasi
                </span>
                <span className="text-[11px] text-sky-300/80">
                  EST. 2021
                </span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-white">
                “Mewujudkan kedaulatan maritim dan kemandirian masyarakat pesisir kepulauan Indonesia melalui sinergi ekowisata, pendidikan, ekonomi biru, dan konservasi laut berkelanjutan.”
              </blockquote>

              <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-[11px] text-sky-200/90">
                <span>Sovereign Blue Foundation</span>
                <span className="text-white font-bold">NUSA TENGGARA TIMUR & JAKARTA</span>
              </div>
            </div>

          </div>

          {/* Bottom Row: 4 Kotak Pilar Misi Membentang Horizontal */}
          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-sky-800 font-bold block">
                  Empat Misi Strategis Yayasan
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-sky-600 block rounded-full"></span>
              </div>
              <span className="text-xs text-stone-700">01 — 04</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Kotak Misi 1 */}
              <div className="group bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-sky-700/40 transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold">Pilar I</span>
                    <span className="text-xs text-stone-700">01</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition-colors leading-snug">
                    Ekowisata Berbasis Komunitas
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Mengembangkan model pariwisata kepulauan terpadu berstandar GSTC yang menjunjung kearifan adat lokal.
                  </p>
                </div>
              </div>

              {/* Kotak Misi 2 */}
              <div className="group bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-sky-700/40 transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold">Pilar II</span>
                    <span className="text-xs text-stone-700">02</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition-colors leading-snug">
                    Pendidikan & Literasi Maritim
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Menyediakan akses Learning Center bertenaga surya, kurikulum kelautan, dan beasiswa penuh anak nelayan 3T.
                  </p>
                </div>
              </div>

              {/* Kotak Misi 3 */}
              <div className="group bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-sky-700/40 transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold">Pilar III</span>
                    <span className="text-xs text-stone-700">03</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition-colors leading-snug">
                    Infrastruktur Ekonomi Biru
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Membangun rantai dingin bertenaga surya (Solar Cold Chain), hilirisasi rumput laut, dan garam artisanal mandiri.
                  </p>
                </div>
              </div>

              {/* Kotak Misi 4 */}
              <div className="group bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-sky-700/40 transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold">Pilar IV</span>
                    <span className="text-xs text-stone-700">04</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition-colors leading-snug">
                    Sains Konservasi Kolaboratif
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Restorasi karang spider reef, penanaman mangrove Blue Carbon, dan gerakan Zero-Plastic Islands bebas sampah.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>



      {/* STRUKTUR PENGURUS & DEWAN — Editorial Bento Cards (Inspirasi Gambar 2) */}
      <section id="pengurus" className="py-20 bg-stone-50/50 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Section ala Gambar 2 (/ Label kecil, Bold Headline Kiri, Deskripsi + Links Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-sky-800 font-bold block">
                  Struktur Kepengurusan
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-sky-600 block rounded-full"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
                Amanah Dewan &amp; Pengelola Yayasan
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-4 lg:text-left">
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Sinergi dewan pembina, pengawas, dan pengurus harian dalam mengemban amanah pemberdayaan masyarakat maritim kepulauan nusantara.
              </p>
              <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-sky-800">
                <span className="inline-flex items-center gap-1 hover:text-sky-950 transition-colors cursor-default">
                  Yayasan Almursyid Nusa Tenggara Timur &rsaquo;
                </span>
                <a href={`https://wa.me/${SITE_INFO.contacts.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                  Hubungi Sekretariat &rsaquo;
                </a>
              </div>
            </div>
          </div>

          {/* Baris 1: Dewan Utama (Pembina & Pengawas) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sky-700"></div>
              <h3 className="text-xs uppercase tracking-widest text-sky-800 font-bold">
                Dewan Pembina &amp; Pengawas
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Pembina - Card Profil dengan Frame Foto Rapi & Elegan */}
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex items-start gap-5">
                  {/* Frame Foto Portrait Profil */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 shadow-2xs flex items-center justify-center">
                    {(typeof SITE_INFO.leadership.pembina === 'object' && SITE_INFO.leadership.pembina?.image && !SITE_INFO.leadership.pembina.image.includes('unsplash.com')) ? (
                      <img
                        src={SITE_INFO.leadership.pembina.image}
                        alt={typeof SITE_INFO.leadership.pembina === 'object' ? SITE_INFO.leadership.pembina?.name : SITE_INFO.leadership.pembina}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xl">
                        {((typeof SITE_INFO.leadership.pembina === 'object' ? SITE_INFO.leadership.pembina?.name : SITE_INFO.leadership.pembina) || 'U').charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                  </div>

                  {/* Informasi Profil */}
                  <div className="flex-1 space-y-2 pt-1">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-800 font-bold block">
                        {(typeof SITE_INFO.leadership.pembina === 'object' && SITE_INFO.leadership.pembina?.role) ? SITE_INFO.leadership.pembina.role : 'PEMBINA YAYASAN'}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {typeof SITE_INFO.leadership.pembina === 'object' ? SITE_INFO.leadership.pembina?.name : SITE_INFO.leadership.pembina}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {(typeof SITE_INFO.leadership.pembina === 'object' && SITE_INFO.leadership.pembina?.desc)
                        ? SITE_INFO.leadership.pembina.desc
                        : 'Sovereign Blue Foundation Nusa Tenggara Timur, pembina arah kebijakan strategis & kemaritiman.'}
                    </p>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-700">Yayasan Almursyid Nusa Tenggara Timur</span>
                  <div className="w-9 h-9 rounded-full bg-sky-800 text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-sky-900 transition-colors">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Card Pengawas - Card Profil dengan Frame Foto Rapi & Elegan */}
              <div className="group relative rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex items-start gap-5">
                  {/* Frame Foto Portrait Profil */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 shadow-2xs flex items-center justify-center">
                    {(typeof SITE_INFO.leadership.pengawas === 'object' && SITE_INFO.leadership.pengawas?.image && !SITE_INFO.leadership.pengawas.image.includes('unsplash.com')) ? (
                      <img
                        src={SITE_INFO.leadership.pengawas.image}
                        alt={typeof SITE_INFO.leadership.pengawas === 'object' ? SITE_INFO.leadership.pengawas?.name : SITE_INFO.leadership.pengawas}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xl">
                        {((typeof SITE_INFO.leadership.pengawas === 'object' ? SITE_INFO.leadership.pengawas?.name : SITE_INFO.leadership.pengawas) || 'B').charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                  </div>

                  {/* Informasi Profil */}
                  <div className="flex-1 space-y-2 pt-1">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-800 font-bold block">
                        {(typeof SITE_INFO.leadership.pengawas === 'object' && SITE_INFO.leadership.pengawas?.role) ? SITE_INFO.leadership.pengawas.role : 'PENGAWAS YAYASAN'}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {typeof SITE_INFO.leadership.pengawas === 'object' ? SITE_INFO.leadership.pengawas?.name : SITE_INFO.leadership.pengawas}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {(typeof SITE_INFO.leadership.pengawas === 'object' && SITE_INFO.leadership.pengawas?.desc)
                        ? SITE_INFO.leadership.pengawas.desc
                        : 'Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan.'}
                    </p>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-700">Pengawasan Berkala</span>
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-sky-800 transition-colors">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Baris 2: Jajaran Dewan Pengurus (Card Profil Frame Foto ala Gambar 2) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-sky-700"></div>
                <h3 className="text-xs uppercase tracking-widest text-sky-800 font-bold">
                  Dewan Pengurus Harian
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-800">
                  Total {SITE_INFO.leadership.pengurus.length} Bidang Kepengurusan
                </span>
                {/* Navigasi Panah Khusus Layar Mobile di Luar Frame Gambar */}
                <div className="flex md:hidden items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollPengurus('left')}
                    aria-label="Geser ke kiri"
                    className="w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-50 active:scale-95 shadow-2xs transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollPengurus('right')}
                    aria-label="Geser ke kanan"
                    className="w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-50 active:scale-95 shadow-2xs transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Container Cards: Slide horizontal di mobile dengan snap & panah di luar frame, Grid 3 card per baris di tablet & desktop */}
            <div
              ref={pengurusSliderRef}
              className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 pt-1 px-1 -mx-1 snap-x snap-mandatory md:snap-none scrollbar-none scroll-smooth"
            >
              {SITE_INFO.leadership.pengurus.map((item: any, idx: number) => {
                const hasRealPhoto = item.image && !item.image.includes('unsplash.com');

                return (
                  <div
                    key={idx}
                    className="w-[260px] sm:w-[280px] md:w-auto shrink-0 md:shrink group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3 sm:p-3.5 flex flex-col justify-between snap-start"
                  >
                    {/* Frame Foto Profile Rasio Aspect 3:4 */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70 flex items-center justify-center">
                      {hasRealPhoto ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xl">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Konten Teks Bawah */}
                    <div className="pt-3 px-1 flex items-end justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold block truncate">
                          {item.role}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug line-clamp-2 mt-0.5" title={item.name}>
                          {item.name}
                        </h4>
                      </div>

                      {/* Tombol Bulat Panah */}
                      <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-stone-300 text-slate-900 flex items-center justify-center font-bold shadow-2xs group-hover:bg-sky-800 group-hover:text-white group-hover:border-sky-800 transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

