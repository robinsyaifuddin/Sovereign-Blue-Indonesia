import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Compass, GraduationCap, 
  Award, ShieldCheck, Anchor, Sun, Droplets, TreePine
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const ProgramPage: React.FC = () => {
  const { siteInfo } = useAppStoreData();
  const SITE_INFO = siteInfo || FALLBACK_SITE_INFO;

  return (
    <div className="space-y-16 pt-8 pb-20">
      {/* Program Showcase List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ---------------------------------------------------- */}
        {/* PROGRAM 01: PARIWISATA BERKELANJUTAN */}
        {/* ---------------------------------------------------- */}
        <article id="tourism" className="scroll-mt-24 border-b border-sky-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Pilar Utama I</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Sustainable Tourism</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Pariwisata Berkelanjutan (Sustainable Tourism)
                </h2>
                <p className="text-sm sm:text-base text-sky-800 font-medium">
                  Mengembangkan pariwisata berbasis masyarakat (Community-Based Ecotourism) berstandar GSTC yang melestarikan alam dan mengangkat ekonomi lokal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-sky-700" />
                    Sertifikasi GSTC Internasional
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pendampingan tata kelola destinasi, audit jejak karbon destinasi, dan proteksi biota laut liar dari eksploitasi berlebih.
                  </p>
                </div>
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-sky-700" />
                    Akademi Pemandu Bahari
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pelatihan navigasi perahu, teknik water rescue, etika interaksi terumbu karang/satwa liar, dan bahasa Inggris percakapan.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Inisiatif Kunci Program:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Standardisasi Homestay Ramah Lingkungan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Revitalisasi Seni Musik Sasando & Tenun Ikat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Peningkatan pendapatan warga homestay hingga 180%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>250+ Pemandu tersertifikasi standar keselamatan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-sky-200/80 shadow-md bg-slate-100">
                <img
                  src="/hero/hero1.webp"
                  alt="Desa Wisata Ekowisata"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-sky-300">Pariwisata Komunitas</p>
                    <p className="text-xs font-medium text-slate-200">GSTC Global Standards</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">01</div>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* ---------------------------------------------------- */}
        {/* PROGRAM 02: PENDIDIKAN & LITERASI MARITIM */}
        {/* ---------------------------------------------------- */}
        <article id="education" className="scroll-mt-24 border-b border-sky-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-5 order-2 lg:order-1 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-sky-200/80 shadow-md bg-slate-100">
                <img
                  src="/hero/hero2.webp"
                  alt="Marine Learning Center"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-sky-300">Pendidikan Bahari</p>
                    <p className="text-xs font-medium text-slate-200">Solar Learning Center</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">02</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <span>Pilar Utama II</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Marine Education</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Pendidikan & Literasi Maritim (Marine Education)
                </h2>
                <p className="text-sm sm:text-base text-sky-800 font-medium">
                  Memastikan setiap anak di pulau terluar mendapatkan pendidikan berkualitas global tanpa kehilangan identitas maritim nusantara.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-sky-700" />
                    Marine Learning Centers
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pusat belajar komunal bertenaga panel surya dilengkapi perpustakaan literasi laut, komputer, dan satelit internet.
                  </p>
                </div>
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-700" />
                    Beasiswa Penuh Anak Pesisir
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Beasiswa penuh bagi putra-putri keluarga nelayan berprestasi menuju jenjang SMP, SMA, hingga PTN ilmu kelautan.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Capaian Terukur:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>100 Siswa perdana resmi lulus beasiswa perguruan tinggi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>6 Unit Learning Center aktif melayani 1.200+ anak/pekan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Pelatihan vokasi digital marketing desa & mesin perahu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Kurikulum literasi maritim & mitigasi bencana sejak SD</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* ---------------------------------------------------- */}
        {/* PROGRAM 03: EKONOMI BIRU & PEMBERDAYAAN PESISIR */}
        {/* ---------------------------------------------------- */}
        <article id="economy" className="scroll-mt-24 border-b border-sky-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-2">
                <Anchor className="w-4 h-4 text-sky-600" />
                <span>Pilar Utama III</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Blue Economy</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Ekonomi Biru & Pemberdayaan Pesisir (Blue Economy)
                </h2>
                <p className="text-sm sm:text-base text-sky-800 font-medium">
                  Mengembangkan potensi kekayaan laut secara sirkular dan bernilai tambah guna membebaskan nelayan dari jerat kemiskinan dan ketergantungan tengkulak.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-sky-700" />
                    Solar Cold Chain Nelayan
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fasilitas pembuat es bertenaga surya di tepi dermaga, memotong rantai tengkulak dan menjaga kesegaran ikan tangkapan bernilai tinggi.
                  </p>
                </div>
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-sky-700" />
                    Rumput Laut & Nira Lontar
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Solar dome dryer pengeringan rumput laut ekspor higienis dan hilirisasi nira lontar organik menjadi gula kristal berdaya jual tinggi.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Dampak Terukur:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Margin pendapatan nelayan melonjak 40% – 60%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Terbuka 300+ lapangan kerja baru bagi perempuan pesisir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Produksi garam laut artisanal tunnel kaca higienis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-sky-200/80 shadow-md bg-slate-100">
                <img
                  src="/hero/hero3.webp"
                  alt="Ekonomi Biru & Cold Chain"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-sky-300">Ekonomi Pesisir</p>
                    <p className="text-xs font-medium text-slate-200">Solar Cold Chain</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">03</div>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* ---------------------------------------------------- */}
        {/* PROGRAM 04: KONSERVASI LINGKUNGAN LAUT */}
        {/* ---------------------------------------------------- */}
        <article id="environment" className="scroll-mt-24 border-b border-sky-100/70 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-5 order-2 lg:order-1 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-sky-200/80 shadow-md bg-slate-100">
                <img
                  src="/hero/hero4.webp"
                  alt="Restorasi Karang & Mangrove"
                  className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex items-end justify-between text-white pointer-events-none">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-sky-300">Konservasi Laut</p>
                    <p className="text-xs font-medium text-slate-200">Reef & Mangrove Restoration</p>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white/90">04</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Pilar Utama IV</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-semibold">Marine Conservation</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Konservasi Lingkungan Laut (Marine Conservation)
                </h2>
                <p className="text-sm sm:text-base text-sky-800 font-medium">
                  Melindungi benteng keanekaragaman hayati samudra Indonesia dari ancaman abrasi pantai, kenaikan suhu global, dan limbah plastik.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-sky-700" />
                    Restorasi Spider Reef
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pemasangan struktur laba-laba karang dan transplantasi fragmen karang tangguh suhu tinggi dengan monitoring scuba ilmiah.
                  </p>
                </div>
                <div className="space-y-1.5 bg-sky-50/40 p-4 rounded-xl border border-sky-100/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <TreePine className="w-3.5 h-3.5 text-sky-700" />
                    Hutan Mangrove Blue Carbon
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Penanaman sabuk hijau pelindung abrasi dan penyerap emisi karbon bumi terintegrasi bersama hukum adat kelautan.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Capaian Terukur:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>15.000+ Pohon mangrove tertanam (tingkat hidup 92%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>500 Hektar area konservasi terlindungi hukum adat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>5 Desa pulau capai status Zero-Plastic bebas sampah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>25+ Ton sampah plastik diangkat dan didaur ulang</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>

      </main>

    </div>
  );
};
