export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export const SITE_INFO = {
  name: "Al-Mursyid Islamic Boarding School",
  subName: "Pondok Pesantren Al-Mursyid Tanggamus",
  foundation: "Yayasan Almursyid Tanggamus Lampung",
  tagline: "Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi",
  legal: {
    kemenkumham: "SK Kemenkumham RI No. AHU-0014511.AH.01.04.Tahun 2020",
    kemenkumhamDate: "28 Agustus 2020",
    piagamKemenag: "Nomor 030299 - Kemenag RI, Ditjen Pendidikan Islam",
    nsp: "510018060046",
    establishedDate: "01 Juli 2022",
  },
  address: {
    village: "Way Lalaan Kampung Baru, Desa Kampung Baru",
    district: "Kec. Kota Agung Timur",
    regency: "Kabupaten Tanggamus",
    province: "Provinsi Lampung",
    full: "Way Lalaan Kampung Baru, Desa Kampung Baru, Kec. Kota Agung Timur, Kab. Tanggamus, Lampung 35384"
  },
  leadership: {
    pembina: {
      name: "Usman Mursyid",
      role: "Pembina Yayasan",
      image: "",
      desc: "Pondok Pesantren Al-Mursyid Tanggamus, pembina arah kebijakan strategis & kepesantrenan."
    },
    pengawas: {
      name: "Budi Setiawan",
      role: "Pengawas Yayasan",
      image: "",
      desc: "Memastikan kepatuhan tata kelola, keterbukaan manajerial, dan operasional yayasan."
    },
    founders: ["Agus Aftah", "Muhammad Al Ashimi", "Usman Mursyid"],
    pengurus: [
      { 
        name: "Pungut Sarifuddin Ash-Shajili", 
        role: "Ketua Pengurus", 
        image: "",
        highlight: true 
      },
      { 
        name: "Astoya Saimulani", 
        role: "Sekretaris",
        image: ""
      },
      { 
        name: "Muhammad Al Ashimi", 
        role: "Bendahara & Hubungan Umat",
        image: ""
      },
      { 
        name: "Agus Aftah", 
        role: "Divisi Pendidikan & Kurikulum",
        image: ""
      },
      { 
        name: "Fia Aulia", 
        role: "Kepengurusan Putri & Asrama",
        image: ""
      },
      { 
        name: "Novi Yani", 
        role: "Administrasi & Keuangan",
        image: ""
      },
    ]
  },
  contacts: {
    phone: "+62 838-4847-8150",
    whatsapp: "+62 838-4847-8150",
    email: "info@almursyidtanggamus.sch.id",
    ppdbWa: "https://wa.me/6283848478150?text=Halo%20Admin%20Pondok%20Pesantren%20Al-Mursyid,%20saya%20ingin%20konsultasi%20dan%20informasi%20pendaftaran%20santri%20baru.",
    ppdbFormUrl: "https://forms.gle/almursyid-ppdb", // Ganti dengan URL Google Form resmi
    mapsUrl: "https://maps.app.goo.gl/3FVjebPp1YaSYvom7",
    instagram: "https://www.instagram.com/ponpes_almursyid",
    instagramHandle: "@ponpes_almursyid",
    operationalHours: "Senin - Sabtu: 07.30 - 16.30 WIB"
  },
  stats: [
    { value: "510018060046", label: "NSP Kemenag RI", sub: "Terdaftar Resmi" },
    { value: "30 Juz", label: "Program Tahfidz", sub: "Bersanad Mutqin" },
    { value: "1:12", label: "Rasio Ustadz : Santri", sub: "Bimbingan Intensif" },
    { value: "100%", label: "Boarding Terpadu", sub: "Adab & Kemandirian" },
  ]
};

export const NAV_LINKS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang-kami" },
  { label: "Program", href: "/program" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Berita", href: "/berita" },
];

export const PROGRAMS = [
  {
    id: "tahfidz",
    title: "Tahfidzul Qur'an 30 Juz",
    tagline: "Metode Talaqqi, Ziyadah & Muraja'ah Harian",
    desc: "Program unggulan mencetak santri hafidz-hafidzah berjiwa Qur'ani dengan tajwid makharijul huruf yang fasih, bimbingan ustadz mutqin, serta sertifikasi syahadah resmi.",
    icon: "BookOpen",
    highlights: ["Target 30 Juz bersanad", "Muraja'ah teratur 5 waktu", "Karantina Qur'an berkala", "Halaqah intensif maks. 12 santri"]
  },
  {
    id: "diniyah",
    title: "Madrasah Diniyah & Kitab Kuning",
    tagline: "Turats Keilmuan Ulama Ahlussunnah",
    desc: "Pembelajaran mendalam kitab-kitab klasik berbahasa gundul, meliputi ilmu Nahwu, Shorof, Fiqih (Safinah, Taqrib), Aqidah, Tarikh, dan Hadits (Arba'in Nawawi).",
    icon: "Scroll",
    highlights: ["Metode bandongan & sorogan", "Penguasaan dasar bahasa Arab", "Pembentukan akhlakul karimah", "Ujian diniyah berjenjang"]
  },
  {
    id: "formal",
    title: "SMP & SMA Islam Boarding",
    tagline: "Sinergi Kurikulum Nasional & Pesantren",
    desc: "Pendidikan formal terakreditasi yang mengintegrasikan sains modern, literasi numerik, kepemimpinan, dan nilai-nilai keislaman untuk lulusan berdaya saing global.",
    icon: "GraduationCap",
    highlights: ["Ijazah resmi diakui negara", "Guru profesional & kompeten", "Laboratorium komputer & sains", "Persiapan masuk PTN & Universitas Timur Tengah"]
  },
  {
    id: "ekskul",
    title: "Bilingual & Pengembangan Bakat",
    tagline: "Bahasa Internasional & Soft Skills",
    desc: "Membekali santri kemampuan komunikasi aktif bahasa Arab dan Inggris sehari-hari, serta ekstrakurikuler kepanduan (Pramuka), seni Kaligrafi Islam, dan bela diri.",
    icon: "Languages",
    highlights: ["Yaumul Lughah (Hari Wajib Berbahasa)", "Klub Kaligrafi & Tilawah", "Pramuka Gugus Depan Pesantren", "Pelatihan Public Speaking & Khitobah"],
    image: "/gambar/ekstrakurikuler.png"
  }
];

export const FACILITIES = [
  {
    name: "Masjid Jami' Al-Mursyid",
    category: "Ibadah & Halaqah",
    desc: "Pusat spiritual santri untuk salat berjamaah 5 waktu, kajian diniyah, wirid, dan halaqah tahfidz yang sejuk dan luas.",
    image: "/gambar/masjid.png"
  },
  {
    name: "Asrama Santri Putra & Putri Terpisah",
    category: "Tempat Tinggal",
    desc: "Gedung asrama bersih, nyaman, dengan sirkulasi udara pegunungan Tanggamus yang segar, dilengkapi ranjang tingkat dan lemari mandiri.",
    image: "/gambar/asrama.png"
  },
  {
    name: "Ruang Kelas & Madrasah Diniyah",
    category: "Pendidikan",
    desc: "Ruang belajar representatif berfasilitas modern untuk pembelajaran formal, kajian kitab kuning, sains, dan literasi teknologi.",
    image: "/gambar/pendidikan.png"
  },
  {
    name: "Kawasan Lingkungan Asri & Hijau",
    category: "Lingkungan",
    desc: "Lingkungan pesantren yang asri, hijau, dan sejuk di kaki pegunungan Tanggamus untuk kenyamanan santri beraktivitas.",
    image: "/gambar/lingkungan.png"
  },
  {
    name: "Lapangan Olahraga & Area Terbuka",
    category: "Kebugaran & Bakat",
    desc: "Fasilitas olahraga futsal, bulu tangkis, voli, panahan sunnah, dan area apel upacara berlatar pemandangan alam Way Lalaan yang asri.",
    image: ""
  },
  {
    name: "Perpustakaan Islam & Maktabah Turats",
    category: "Literasi",
    desc: "Koleksi ratusan kitab turats, terjemahan tafsir Al-Qur'an, buku penunjang kurikulum nasional, ensiklopedia, dan karya sastra santri.",
    image: ""
  }
];

export const NEWS_DATA = [
  {
    id: "wisuda-akbar-tahfidz-quran-30-juz-dan-sanad-al-mursyid",
    title: "Wisuda Akbar Tahfidz Qur'an 30 Juz & Penganugerahan Sanad Santri Al-Mursyid",
    date: "28 Oktober 2026",
    timeAgo: "1 jam yang lalu",
    category: "Prestasi Santri",
    subCategory: "Tahfidz & Sanad",
    summary: "Pondok Pesantren Al-Mursyid menggelar prosesi wisuda tahfidz Al-Qur'an 30 juz dan penganugerahan sanad muttashil kepada santri yang telah menyelesaikan setoran hafalan mutqin.",
    image: "",
    isFeatured: true
  },
  {
    id: "ppdb-santri-baru-pesantren-al-mursyid-tanggamus-resmi-dibuka",
    title: "Penerimaan Santri Baru (PPDB) Pesantren Al-Mursyid Tanggamus Resmi Dibuka",
    date: "25 Oktober 2026",
    timeAgo: "3 jam yang lalu",
    category: "Informasi PPDB",
    subCategory: "Pendaftaran Santri",
    summary: "Pondok Pesantren Al-Mursyid Islamic Boarding School Tanggamus membuka pendaftaran santri baru untuk jenjang pendidikan kepesantrenan dan diniyah modern.",
    image: ""
  },
  {
    id: "kajian-akbar-bulanan-dan-muhasabah-wali-santri",
    title: "Kajian Akbar Bulanan & Muhasabah Wali Santri Bersama Majelis Asatidz",
    date: "20 Oktober 2026",
    timeAgo: "Kemarin",
    category: "Agenda Pondok",
    subCategory: "Kajian & Ukhuwah",
    summary: "Mempererat silaturahmi dan sinergi pendidikan antara asatidz dan orang tua santri dalam membina adab serta spiritualitas putra-putri di lingkungan pesantren.",
    image: ""
  },
  {
    id: "santri-al-mursyid-ukir-prestasi-mhq-lampung",
    title: "Santri Al-Mursyid Ukir Prestasi di Musabaqah Hifdzil Qur'an (MHQ) Provinsi Lampung",
    date: "15 Oktober 2026",
    timeAgo: "2 hari lalu",
    category: "Prestasi Akademik",
    subCategory: "Musabaqah Tahfidz",
    summary: "Santri Pondok Pesantren Al-Mursyid kembali meraih prestasi gemilang dalam ajang Musabaqah Hifdzil Qur'an tingkat Kabupaten Tanggamus dan Provinsi Lampung.",
    image: ""
  },
  {
    id: "program-kemandirian-santri-al-mursyid-tanggamus",
    title: "Program Kemandirian Santri: Budidaya Perikanan dan Pertanian Organik Asri di Way Lalaan",
    date: "10 Oktober 2026",
    timeAgo: "3 hari lalu",
    category: "Kewirausahaan",
    subCategory: "Agrobisnis Santri",
    summary: "Santri Al-Mursyid dibekali keterampilan hidup melalui program agrobisnis dan kemandirian pangan di kawasan sejuk lereng Tanggamus.",
    image: ""
  }
];

// Data untuk ticker strip bagian atas
export const TICKER_NEWS = [
  {
    title: "Juara 1 Musabaqah Hifdzil Qur'an Tingkat Provinsi Lampung",
    category: "Tahfidz",
    timeAgo: "1 jam lalu",
    image: ""
  },
  {
    title: "Santri Kirim Delegasi Debat Bahasa Arab Nasional",
    category: "Bahasa",
    timeAgo: "2 jam lalu",
    image: ""
  },
  {
    title: "Kunjungan Studi Banding Forum Pesantren Se-Sumbagsel",
    category: "Kelembagaan",
    timeAgo: "3 jam lalu",
    image: ""
  },
  {
    title: "Peresmian Laboratorium Komputer & Studio Multimedia Baru",
    category: "Sarpras",
    timeAgo: "4 jam lalu",
    image: ""
  },
  {
    title: "Pemberian Beasiswa Santri Berprestasi Bidang Sains & Riset",
    category: "Beasiswa",
    timeAgo: "5 jam lalu",
    image: ""
  },
  {
    title: "Klinik Santri Resmikan Layanan Konseling & Cek Medis Berkala",
    category: "Kesehatan",
    timeAgo: "6 jam lalu",
    image: ""
  }
];

// Data untuk Postingan Terbaru (Sisi Kanan Hero)
export const LATEST_POSTS = [
  {
    title: "Kunjungan Studi Banding Forum Pengasuh Pesantren Se-Sumbagsel",
    category: "Kelembagaan",
    timeAgo: "25 mnt lalu",
    image: ""
  },
  {
    title: "Peresmian Laboratorium Komputer & Studio Multimedia Baru",
    category: "Fasilitas",
    timeAgo: "1 jam lalu",
    image: ""
  },
  {
    title: "Santri Al-Mursyid Raih Medali Emas Olimpiade Sains Nasional",
    category: "Prestasi",
    timeAgo: "3 jam lalu",
    image: ""
  },
  {
    title: "Program Kemandirian: Panen Sayur Hidroponik Perdana",
    category: "Kemandirian",
    timeAgo: "5 jam lalu",
    image: ""
  },
  {
    title: "Gebyar Muhadhoroh: Festival Orasi Tiga Bahasa Santriwan",
    category: "Bahasa",
    timeAgo: "6 jam lalu",
    image: ""
  }
];

// Data Don't Miss (Bento Grid)
export const DONT_MISS_NEWS = {
  tallLead: {
    title: "Ekspedisi Santri Pecinta Alam & Tadabbur Alam Air Terjun Way Lalaan Tanggamus",
    category: "Ekstrakurikuler",
    timeAgo: "2 jam lalu",
    image: ""
  },
  gridItems: [
    {
      title: "Uji Publik Hafalan Al-Qur'an Santri Menjelang Evaluasi Tengah Semester",
      category: "Akademik",
      timeAgo: "3 jam lalu",
      image: ""
    },
    {
      title: "Pelatihan Kaligrafi Kontemporer & Pameran Karya Seni Islami",
      category: "Kesenian",
      timeAgo: "4 jam lalu",
      image: ""
    },
    {
      title: "Latihan Gabungan Pramuka Santri Gugus Depan Al-Mursyid",
      category: "Kepanduan",
      timeAgo: "5 jam lalu",
      image: ""
    },
    {
      title: "Eksplorasi Lab Komputer: Santri Ciptakan Website Karya Majalah Dinding Digital",
      category: "Digital",
      timeAgo: "6 jam lalu",
      image: ""
    }
  ]
};

// Data Top Stories (List bernomor 1-5 di sisi kanan)
export const TOP_STORIES = [
  {
    rank: 1,
    title: "Alumni Al-Mursyid Tembus Universitas Al-Azhar Kairo Jalur Beasiswa Penuh",
    timeAgo: "1 jam lalu",
    image: ""
  },
  {
    rank: 2,
    title: "Profil Ustadz Pembina: Membangun Karakter Qur'ani di Era Distraksi Digital",
    timeAgo: "2 jam lalu",
    image: ""
  },
  {
    rank: 3,
    title: "Kunjungan Silaturahmi Tokoh Masyarakat & Ulama Tanggamus",
    timeAgo: "3 jam lalu",
    image: ""
  },
  {
    title: "Tips Mendampingi Anak Masuk Pondok Pesantren Bagi Orang Tua Baru",
    rank: 4,
    timeAgo: "4 jam lalu",
    image: ""
  },
  {
    rank: 5,
    title: "Juara Umum POSPEDA Tingkat Kabupaten: Dominasi Cabor Panahan & Silat",
    timeAgo: "5 jam lalu",
    image: ""
  }
];

// Data Dokumentasi Video & Liputan (Bagian Bawah)
export const VIDEO_GALLERY = {
  main: {
    title: "Dokumentasi Khutbah Ikhtitam & Pelepasan Santri Angkatan Terbaru",
    status: "Video Utama",
    views: "1.2k tayangan",
    duration: "18:45",
    image: ""
  },
  items: [
    {
      title: "Lantunan Murottal Santri Al-Mursyid Surat Ar-Rahman di Alam Terbuka",
      duration: "04:32",
      timeAgo: "2 jam lalu",
      image: ""
    },
    {
      title: "Tur Fasilitas Asrama & Lingkungan Belajar Al-Mursyid Boarding School",
      duration: "08:15",
      timeAgo: "4 jam lalu",
      image: ""
    },
    {
      title: "Highlights Kegiatan Ekstrakurikuler Memanah & Beladiri Tapak Suci",
      duration: "05:50",
      timeAgo: "6 jam lalu",
      image: ""
    }
  ]
};

export const PPDB_FEES = [
  { item: "Infaq Pengembangan Fasilitas & Sarpras", amount: "Rp 3.500.000", note: "Dibayar sekali saat masuk" },
  { item: "Seragam Lengkap (3 Setel + Almamater)", amount: "Rp 950.000", note: "Termasuk atribut pondok" },
  { item: "Buku Paket & Modul Diniyah 1 Tahun", amount: "Rp 650.000", note: "Kitab & modul kurikulum" },
  { item: "Perlengkapan Asrama (Kasur, Sprei, Loker)", amount: "Rp 850.000", note: "Fasilitas pribadi santri" },
  { item: "Syahriah / SPP Bulanan (Makan 3x + Asrama)", amount: "Rp 950.000", note: "Per bulan (All-in)" },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Tahfidz & Ibadah" | "Akademik & Formal" | "Ekstrakurikuler" | "Kemandirian & Sosial" | "Peringatan Hari Besar" | string;
  date: string;
  location: string;
  image: string;
  desc: string;
  isFeatured?: boolean;
}

export const GALLERY_CATEGORIES = [
  "Semua",
  "Tahfidz & Ibadah",
  "Akademik & Formal",
  "Ekstrakurikuler",
  "Kemandirian & Sosial",
  "Peringatan Hari Besar",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Masjid Jami' Al-Mursyid & Halaqah Qur'ani",
    category: "Tahfidz & Ibadah",
    date: "28 Oktober 2026",
    location: "Masjid Jami' Al-Mursyid",
    image: "/gambar/masjid.png",
    desc: "Suasana syahdu santri menyetorkan ziyadah hafalan Al-Qur'an dan muraja'ah bersama asatidz pengampu tahfidz."
  },
  {
    id: "gal-2",
    title: "Gedung Asrama Santri & Pembinaan Karakter",
    category: "Kemandirian & Sosial",
    date: "24 Oktober 2026",
    location: "Kompleks Asrama Pondok",
    image: "/gambar/asrama.png",
    desc: "Kawasan asrama bersih dan tertata asri di lereng bukit Way Lalaan Tanggamus untuk kenyamanan santri beristirahat."
  },
  {
    id: "gal-3",
    title: "Kawasan & Gerbang Masuk Kampus Pesantren",
    category: "Kemandirian & Sosial",
    date: "19 Oktober 2026",
    location: "Gerbang Utama Al-Mursyid",
    image: "/gambar/gerbangmasuk.png",
    desc: "Akses gerbang utama kampus Pondok Pesantren Al-Mursyid yang tertib, asri, dan aman bagi seluruh civitas santri."
  },
  {
    id: "gal-4",
    title: "Halaman Depan & Plaza Utama Pesantren",
    category: "Peringatan Hari Besar",
    date: "15 Oktober 2026",
    location: "Plaza Utama Kampus Al-Mursyid",
    image: "/gambar/halamandepan.png",
    desc: "Halaman depan yang luas dan tertata rapi sebagai pusat aktivitas apel santri dan kegiatan outdoor."
  },
  {
    id: "gal-5",
    title: "Kegiatan Ekstrakurikuler Santri",
    category: "Ekstrakurikuler",
    date: "12 Oktober 2026",
    location: "Kawasan Pesantren Al-Mursyid",
    image: "/gambar/ekstrakurikuler.png",
    desc: "Pengembangan bakat, ketangkasan fisik, kemandirian, dan kreativitas santri melalui ragam kegiatan ekstrakurikuler."
  },
  {
    id: "gal-6",
    title: "Suasana Lingkungan Al-Mursyid Asri & Sejuk",
    category: "Kemandirian & Sosial",
    date: "22 Oktober 2026",
    location: "Area Kampus Way Lalaan",
    image: "/gambar/lingkungan.png",
    desc: "Lingkungan belajar kondusif bebas kebisingan kota, berhawa sejuk di kaki pegunungan Tanggamus."
  },
  {
    id: "gal-7",
    title: "Proses Belajar Mengajar & Madrasah Diniyah",
    category: "Akademik & Formal",
    date: "08 Oktober 2026",
    location: "Ruang Kelas & Madrasah Diniyah",
    image: "/gambar/pendidikan.png",
    desc: "Pembelajaran intensif kurikulum formal berpadu dengan kajian kitab kuning turats salafiyah secara terstruktur."
  },
  {
    id: "gal-8",
    title: "Pendidikan Karakter & Kedisiplinan Santri",
    category: "Akademik & Formal",
    date: "03 Oktober 2026",
    location: "Kampus Al-Mursyid Tanggamus",
    image: "/gambar/pedidikan.png",
    desc: "Pembiasaan adab mulia, kepemimpinan, dan kemandirian hidup berasrama 24 jam di bawah bimbingan asatidz."
  },
  {
    id: "gal-9",
    title: "Muhadhoroh Tiga Bahasa (Arab, Inggris, dan Indonesia)",
    category: "Akademik & Formal",
    date: "29 September 2026",
    location: "Aula Pertemuan Utama",
    image: "",
    desc: "Latihan rutin orasi ilmiah santri di hadapan khalayak umum guna membentuk mental kepemimpinan dan public speaking internasional."
  },
  {
    id: "gal-10",
    title: "Literasi Digital & Coding Lab Santri Masa Depan",
    category: "Akademik & Formal",
    date: "22 September 2026",
    location: "Laboratorium Komputer & Multimedia",
    image: "",
    desc: "Pengenalan teknologi digital, dasar algoritma pemrograman, dan publikasi konten dakwah santri berbasis web."
  },
  {
    id: "gal-11",
    title: "Bakti Sosial Santri Peduli Warga Kampung Sekitar Way Lalaan",
    category: "Kemandirian & Sosial",
    date: "17 September 2026",
    location: "Desa Kampung Baru, Kota Agung Timur",
    image: "",
    desc: "Penyaluran paket sembako, gotong royong kebersihan lingkungan, serta edukasi kesehatan bersama santri dan pemuda desa."
  },
  {
    id: "gal-12",
    title: "Peringatan Maulid Nabi Muhammad SAW & Gema Sholawat",
    category: "Peringatan Hari Besar",
    date: "12 September 2026",
    location: "Masjid Jami' Al-Mursyid",
    image: "",
    desc: "Malam mahabbah melantunkan qasidah Burdah dan Simthuddurar dalam suasana khusyuk berbalut cahaya pendar lampu asrama."
  }
];
