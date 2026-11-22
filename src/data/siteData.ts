export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  desc: string;
  isFeatured?: boolean;
}

export const PPDB_FEES = [
  { item: "Adopsi Pohon Mangrove", amount: "Rp 50.000", note: "Per bibit dengan geotagging" },
  { item: "Beasiswa Anak Pesisir", amount: "Rp 500.000", note: "Per bulan" },
  { item: "Restorasi Fragmen Karang", amount: "Rp 250.000", note: "Per struktur spider reef" },
  { item: "Dukungan Koperasi Nelayan", amount: "Rp 1.000.000", note: "Per paket pemberdayaan" }
];

export const SITE_INFO = {
  name: "Sovereign Blue Foundation",
  subName: "Sovereign Blue Nusantara / Yayasan Biru Berdaulat",
  foundation: "Yayasan Biru Berdaulat (Sovereign Blue Nusantara)",
  tagline: "Empowering Communities, Preserving Indonesian Maritime Heritage",
  taglineId: "Membangun Kemandirian Maritim, Menjaga Kedaulatan Laut Indonesia",
  legal: {
    kemenkumham: "SK Kemenkumham RI Terdaftar Resmi",
    kemenkumhamDate: "2021",
    piagamKemenag: "Sertifikasi Maritim & Ekowisata Berkelanjutan",
    nsp: "GSTC-Aligned 2024",
    establishedDate: "2021",
  },
  address: {
    village: "Kawasan Pesisir Maritim Komunitas",
    district: "Pulau Rote & Sekitarnya",
    regency: "Nusa Tenggara Timur",
    province: "Indonesia",
    full: "Sovereign Blue Foundation Secretariat, Jakarta & Nusa Tenggara Timur (Pulau Rote & Sekitarnya), Indonesia"
  },
  leadership: {
    pembina: {
      name: "Dr. Sarah Wijaya",
      role: "Executive Director & Co-Founder",
      image: "",
      desc: "Ahli Konservasi Laut & Kebijakan Maritim Tropis, memimpin arah strategis Sovereign Blue Foundation."
    },
    pengawas: {
      name: "Prof. Made Sutrisna",
      role: "Senior Advisor & Academic Research Liaison",
      image: "",
      desc: "Pakar riset kelautan dan hubungan akademik kerja sama universitas nusantara."
    },
    founders: ["Dr. Sarah Wijaya", "Budi Santoso, M.Env", "Maria Ndoen"],
    pengurus: [
      { 
        name: "Dr. Sarah Wijaya", 
        role: "Executive Director & Co-Founder", 
        image: "",
        highlight: true 
      },
      { 
        name: "Budi Santoso, M.Env", 
        role: "Director of Marine Conservation & Environmental Science",
        image: ""
      },
      { 
        name: "Maria Ndoen", 
        role: "Community Development & Sustainable Tourism Lead",
        image: ""
      },
      { 
        name: "Prof. Made Sutrisna", 
        role: "Senior Advisor & Academic Research Liaison",
        image: ""
      }
    ]
  },
  contacts: {
    phone: "+62 812-3456-7890",
    whatsapp: "+62 812-3456-7890",
    email: "contact@sovereignblue.org",
    emailPartnership: "partnership@sovereignblue.org",
    emailPress: "press@sovereignblue.org",
    volunteerWa: "https://wa.me/6281234567890?text=Halo%20Tim%20Sovereign%20Blue%20Foundation,%20saya%20tertarik%20untuk%20bergabung%20sebagai%20relawan.",
    volunteerFormUrl: "/relawan",
    mapsUrl: "https://maps.google.com/?q=Rote+Island+East+Nusa+Tenggara",
    instagram: "https://www.instagram.com/sovereignbluefoundation",
    instagramHandle: "@sovereignblue",
    operationalHours: "Senin - Jumat: 09.00 - 17.00 WITA / WIB"
  },
  stats: [
    { value: "15,000+", label: "Pohon Mangrove", sub: "Ditanam & Terjaga (92% Hidup)" },
    { value: "1,200+", label: "Keluarga & Nelayan", sub: "Diberdayakan Mandiri" },
    { value: "500+", label: "Siswa Berbeasiswa", sub: "& Pelatihan Digital Bahari" },
    { value: "25+", label: "Komunitas Pesisir", sub: "Desa Binaan Berkelanjutan" },
  ]
};

export const NAV_LINKS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang-kami" },
  { label: "Program", href: "/program" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
];

export const PROGRAMS = [
  {
    id: "tourism",
    title: "Pariwisata Berkelanjutan (Sustainable Tourism)",
    tagline: "Community-Based Ecotourism & Pelestarian Adat Bahari",
    desc: "Menerapkan pariwisata berbasis masyarakat di mana kegiatan wisata tidak merusak daya dukung ekosistem kepulauan dan hasil ekonominya berputar langsung di kantong masyarakat lokal.",
    icon: "Compass",
    highlights: [
      "Sertifikasi Ekowisata Internasional (GSTC-Aligned) & audit jejak karbon",
      "Standardisasi homestay ramah lingkungan higienis berenergi surya",
      "Akademi pemandu wisata bahari & penyelamatan air (water rescue)",
      "Revitalisasi seni budaya musik Sasando & tenun ikat pewarna alami"
    ],
    results: "Pendapatan homestay naik 180%, 250+ pemandu tersertifikasi, 0 insiden perusakan karang."
  },
  {
    id: "education",
    title: "Pendidikan & Literasi Maritim (Marine Education & Literacy)",
    tagline: "Mencerdaskan Generasi Emas Pesisir & Pulau Terluar",
    desc: "Memastikan setiap anak di pulau-pulau terluar mendapatkan pendidikan berkualitas global tanpa tercerabut dari identitas kelautan dan kearifan nenek moyang mereka.",
    icon: "GraduationCap",
    highlights: [
      "Marine Learning Centers bertenaga surya, perpustakaan & internet satelit",
      "Kurikulum literasi maritim terpadu sains samudra & mitigasi bencana laut",
      "Program beasiswa penuh anak pesisir jenjang SMP, SMA hingga Universitas",
      "Pelatihan vokasi pemuda: digital marketing desa wisata & teknisi mesin perahu"
    ],
    results: "100 siswa perdana lulus beasiswa penuh, 6 unit Learning Center aktif melayani 1.200+ anak."
  },
  {
    id: "economy",
    title: "Ekonomi Biru & Pemberdayaan Pesisir (Blue Economy)",
    tagline: "Kedaulatan Ekonomi & Rantai Dingin Mandiri dari Laut",
    desc: "Mengembangkan potensi kekayaan laut secara sirkular dan bernilai tambah tinggi guna membebaskan masyarakat pesisir dari jerat kemiskinan struktural dan ketergantungan pada tengkulak.",
    icon: "Anchor",
    highlights: [
      "Budidaya rumput laut regeneratif & solar dome dryer standar ekspor",
      "Hilirisasi nira pohon lontar menjadi gula kristal/cair organik",
      "Koperasi nelayan modern & fasilitas mesin es surya (Solar Cold Chain)",
      "Produksi garam laut artisanal alami sistem tunnel rumah kaca higienis"
    ],
    results: "Margin pendapatan nelayan naik 40%-60%, 300+ lapangan kerja baru perempuan pesisir."
  },
  {
    id: "environment",
    title: "Konservasi Lingkungan Laut (Marine Environmental Conservation)",
    tagline: "Restorasi Terumbu Karang, Blue Carbon & Zero-Plastic Islands",
    desc: "Melindungi benteng keanekaragaman hayati samudra Indonesia dari ancaman abrasi pantai, pemanasan global, penangkapan ikan ilegal (destructive fishing), dan sampah plastik.",
    icon: "ShieldAlert",
    highlights: [
      "Restorasi terumbu karang spider reef & transplantasi fragmen karang tangguh",
      "Rehabilitasi sabuk hijau hutan mangrove penyerap emisi (Blue Carbon)",
      "Gerakan Zero-Plastic Islands & Bank Sampah pesisir penukar sembako",
      "Patroli kearifan adat bahari pengawas perikanan destruktif (bom & potas)"
    ],
    results: "15.000+ mangrove hidup 92%, 500 ha laut terlindungi hukum adat, 25+ ton sampah plastik diangkat."
  }
];

export const FACILITIES = [
  {
    name: "Marine Learning Center Surya Mandiri",
    category: "Pendidikan & Literasi",
    desc: "Pusat belajar komunal pesisir bertenaga surya mandiri dilengkapi perpustakaan literasi laut, komputer, dan satelit internet untuk anak-anak kepulauan.",
    image: "/gambar/pendidikan.webp"
  },
  {
    name: "Fasilitas Rantai Dingin Surya (Solar Cold Chain)",
    category: "Ekonomi Biru",
    desc: "Mesin es balok ramah lingkungan bertenaga panel surya di dermaga nelayan untuk menjaga kesegaran ikan tangkapan tanpa bahan bakar fosil.",
    image: "/gambar/lingkungan.webp"
  },
  {
    name: "Kawasan Konservasi & Pembibitan Mangrove",
    category: "Konservasi Hayati",
    desc: "Nursery pembibitan ribuan pohon mangrove dan stasiun observasi ilmiah terumbu karang di perairan pesisir NTT.",
    image: "/gambar/lingkungan.webp"
  },
  {
    name: "Solar Dome Dryer Rumput Laut & Lontar",
    category: "Ekonomi Biru",
    desc: "Kubah pengeringan higienis bertenaga surya untuk komoditas rumput laut merah dan pengolahan nira lontar organik berstandar internasional.",
    image: "/gambar/asrama.webp"
  },
  {
    name: "Sentra Ekowisata Komunitas & Homestay Lestari",
    category: "Pariwisata Berkelanjutan",
    desc: "Pondok informasi wisata bahari, persewaan peralatan selam ramah karang, dan homestay binaan berbasis energi terbarukan.",
    image: "/gambar/halamandepan.webp"
  },
  {
    name: "Bank Sampah Sirkular Pulau Bebas Plastik",
    category: "Sanitasi & Konservasi",
    desc: "Pusat pemilahan sampah anorganik pesisir, pencacahan plastik, dan distribusi penukaran tabungan sembako warga pulau.",
    image: "/gambar/gerbangmasuk.webp"
  }
];

export const NEWS_DATA = [
  {
    id: "pulau-indonesia-meraih-sertifikasi-ekowisata-internasional",
    title: "Pulau Indonesia Meraih Sertifikasi Ekowisata Internasional",
    date: "15 Oktober 2024",
    timeAgo: "Terbaru",
    category: "Pariwisata",
    subCategory: "Ekowisata & Konservasi",
    summary: "Raihan sertifikasi bergengsi dari Global Sustainable Tourism Council (GSTC) atas keberhasilan program ekowisata berbasis masyarakat binaan Sovereign Blue Foundation di NTT, terbukti mengangkat kedatangan turis ramah lingkungan 150% dan memulihkan 500 ha ekosistem laut.",
    image: "",
    isFeatured: true
  },
  {
    id: "program-beasiswa-sovereign-blue-meluluskan-100-siswa-pertama",
    title: "Program Beasiswa Sovereign Blue Meluluskan 100 Siswa Pertama",
    date: "28 September 2024",
    timeAgo: "2 minggu lalu",
    category: "Pendidikan",
    subCategory: "Beasiswa Bahari",
    summary: "Generasi pertama putra-putri nelayan lulus dari program beasiswa intensif, siap melanjutkan ke perguruan tinggi terkemuka berbekal ilmu sains bahari dan keterampilan digital modern.",
    image: ""
  },
  {
    id: "15000-pohon-mangrove-berhasil-ditanam-di-pesisir-indonesia",
    title: "15,000 Pohon Mangrove Berhasil Ditanam di Pesisir Indonesia",
    date: "12 September 2024",
    timeAgo: "1 bulan lalu",
    category: "Lingkungan",
    subCategory: "Blue Carbon",
    summary: "Kolaborasi warga pesisir dan relawan sukses menuntaskan penanaman 15.000 bibit mangrove pelindung abrasi lebih cepat dari target yang ditetapkan dengan survival rate 92%.",
    image: ""
  },
  {
    id: "kemitraan-strategis-dengan-universitas-nusa-cendana",
    title: "Kemitraan Strategis dengan Universitas Nusa Cendana",
    date: "5 September 2024",
    timeAgo: "1 bulan lalu",
    category: "Kemitraan",
    subCategory: "Riset Akademik",
    summary: "Penandatanganan nota kesepahaman penelitian stok karbon biru, perlindungan biota langka, dan program magang lapangan mahasiswa kelautan.",
    image: ""
  },
  {
    id: "festival-gula-lontar-indonesia-promosi-produk-lokal-berkelanjutan",
    title: "Festival Gula Lontar Indonesia: Promosi Produk Lokal Berkelanjutan",
    date: "20 Agustus 2024",
    timeAgo: "2 bulan lalu",
    category: "Ekonomi",
    subCategory: "Hilirisasi Komoditas",
    summary: "Pameran inovasi produk olahan pohon lontar higienis yang memberdayakan ratusan petani lokal serta membuka akses pasar ritel modern.",
    image: ""
  },
  {
    id: "zero-plastic-indonesia-5-desa-berhasil-bebas-sampah-plastik",
    title: "Zero Plastic Indonesia: 5 Desa Berhasil Bebas Sampah Plastik",
    date: "10 Agustus 2024",
    timeAgo: "2 bulan lalu",
    category: "Lingkungan",
    subCategory: "Bank Sampah",
    summary: "Transformasi sistem pengelolaan sampah terpadu yang membebaskan 5 desa pesisir dari timbunan sampah plastik sekali pakai melalui mekanisme Bank Sampah sirkular.",
    image: ""
  }
];

export const TICKER_NEWS = [
  {
    title: "Sertifikasi GSTC Internasional Resmi Diraih Destinasi Bahari Binaan",
    category: "Ekowisata",
    timeAgo: "Hari ini",
    image: ""
  },
  {
    title: "Pelepasan 100 Siswa Beasiswa Bahari Sovereign Blue Batch Pertama",
    category: "Pendidikan",
    timeAgo: "2 hari lalu",
    image: ""
  },
  {
    title: "Penanaman 15.000 Mangrove Tembus Target dengan Tingkat Hidup 92%",
    category: "Blue Carbon",
    timeAgo: "4 hari lalu",
    image: ""
  },
  {
    title: "Fasilitas Solar Cold Chain Nelayan Beroperasi Penuh di Pesisir Rote",
    category: "Ekonomi Biru",
    timeAgo: "1 minggu lalu",
    image: ""
  },
  {
    title: "Bank Sampah Pesisir Olah 25 Ton Sampah Plastik Menjadi Produk Sirkular",
    category: "Lingkungan",
    timeAgo: "1 minggu lalu",
    image: ""
  }
];

export const LATEST_POSTS = [
  {
    title: "Ekspedisi Riset Terumbu Karang Bersama Peneliti Internasional di NTT",
    category: "Riset Ilmiah",
    timeAgo: "1 jam lalu",
    image: ""
  },
  {
    title: "Peresmian Solar Dome Dryer untuk Petani Rumput Laut Pesisir",
    category: "Ekonomi",
    timeAgo: "3 jam lalu",
    image: ""
  },
  {
    title: "Pelatihan Water Rescue & Etika Karang Bagi 50 Pemandu Wisata Muda",
    category: "Pariwisata",
    timeAgo: "5 jam lalu",
    image: ""
  },
  {
    title: "Penyaluran Perlengkapan Belajar & Tablet Edukasi ke Learning Center",
    category: "Pendidikan",
    timeAgo: "1 hari lalu",
    image: ""
  }
];

export const DONT_MISS_NEWS = {
  tallLead: {
    title: "Perjalanan Desa Pesisir NTT: Dari Nelayan Destruktif Menuju Kawasan Ekowisata Berkelanjutan",
    category: "Transformasi Komunitas",
    timeAgo: "Hari ini",
    image: ""
  },
  gridItems: [
    {
      title: "Uji Salinitas & Kualitas Garam Artisanal Tunnel Rumah Kaca Bersama Ahli Kimia",
      category: "Ekonomi Biru",
      timeAgo: "2 hari lalu",
      image: ""
    },
    {
      title: "Lokakarya Kerajinan Tenun Pewarna Alami Daun Mangrove & Tarum",
      category: "Budaya Bahari",
      timeAgo: "3 hari lalu",
      image: ""
    },
    {
      title: "Patroli Adat Bahari: Menjaga 500 Hektar Wilayah Suaka Perairan dari Bom Ikan",
      category: "Konservasi",
      timeAgo: "4 hari lalu",
      image: ""
    },
    {
      title: "Kelas Literasi Digital Siswa Pesisir: Akses Satelit Buka Jendela Dunia",
      category: "Pendidikan",
      timeAgo: "5 hari lalu",
      image: ""
    }
  ]
};

export const TOP_STORIES = [
  {
    rank: 1,
    title: "Sertifikasi GSTC Pertama di Pulau Binaan Sovereign Blue Foundation",
    timeAgo: "1 hari lalu",
    image: ""
  },
  {
    rank: 2,
    title: "Profil Dr. Sarah Wijaya: Mengabdi untuk Masa Depan Samudra Indonesia",
    timeAgo: "2 hari lalu",
    image: ""
  },
  {
    rank: 3,
    title: "Solar Cold Chain Mandiri: Memutus Ketergantungan Nelayan pada Tengkulak",
    timeAgo: "3 hari lalu",
    image: ""
  },
  {
    rank: 4,
    title: "Inovasi Gula Lontar Organik NTT Tembus Pasar Ritel Ekspor",
    timeAgo: "4 hari lalu",
    image: ""
  },
  {
    rank: 5,
    title: "5 Desa Pesisir Berhasil Menghapus Sampah Plastik Sekali Pakai",
    timeAgo: "5 hari lalu",
    image: ""
  }
];

export const VOLUNTEER_ROLES = [
  {
    id: "guru-fasilitator",
    title: "Relawan Guru & Fasilitator Belajar",
    commitment: "1 - 3 Bulan Lapangan",
    location: "Marine Learning Centers NTT",
    desc: "Mengajar literasi dasar, sains kelautan, bahasa Inggris, dan wawasan teknologi di pusat belajar pesisir pulau terluar.",
    requirements: ["Pendidikan minimal D3/S1 segala jurusan", "Memiliki jiwa pengabdian & ramah anak", "Siap ditempatkan di pulau terluar"]
  },
  {
    id: "peneliti-sains",
    title: "Relawan Peneliti Sains Kelautan",
    commitment: "Ekspedisi Survei (2 - 4 Pekan)",
    location: "Kawasan Konservasi & Karang Binaan",
    desc: "Mendukung inventarisasi kesehatan terumbu karang, pemetaan sabuk mangrove, dan studi sosial ekonomi masyarakat pesisir.",
    requirements: ["Latar belakang Ilmu Kelautan, Biologi, atau Perikanan", "Memiliki sertifikat menyelam (SCUBA) diutamakan", "Mampu mengoperasikan data survei"]
  },
  {
    id: "relawan-digital",
    title: "Relawan Daring / Digital Campaigner",
    commitment: "Fleksibel / Remote Daring",
    location: "Daring (Seluruh Indonesia)",
    desc: "Kontribusi keahlian grafis, produksi video dokumenter, artikel publikasi sains, dan penerjemahan materi advokasi maritim internasional.",
    requirements: ["Keahlian desain grafis, editing video, atau penulisan", "Koneksi internet stabil", "Komitmen berkala minimal 3 bulan"]
  }
];

export const DONATION_PACKAGES = [
  {
    title: "Adopsi Pohon Mangrove",
    amount: "Rp 50.000",
    unit: "/ bibit",
    features: ["Bibit mangrove unggul", "Geotagging lokasi tanam", "Perawatan & monitoring 3 tahun", "Sertifikat adopsi digital"]
  },
  {
    title: "Beasiswa Anak Pesisir",
    amount: "Rp 500.000",
    unit: "/ bulan",
    features: ["Biaya SPP & buku sekolah", "Kelas literasi maritim", "Akses komputer & internet", "Laporan capaian rapor siswa"]
  },
  {
    title: "Restorasi Struktur Karang",
    amount: "Rp 250.000",
    unit: "/ struktur spider reef",
    features: ["Struktur laba-laba karang tangguh", "Transplantasi fragmen karang", "Pemantauan berkala tim selam", "Dokumentasi perkembangan karang"]
  },
  {
    title: "Dukungan Nelayan Berdaya",
    amount: "Rp 1.000.000",
    unit: "/ paket",
    features: ["Peralatan navigasi keselamatan laut", "Wadah pendingin higienis", "Pelatihan rantai dingin surya", "Dukungan koperasi nelayan"]
  }
];

export const GALLERY_CATEGORIES = [
  "Semua",
  "Pariwisata Berkelanjutan",
  "Pendidikan Bahari",
  "Ekonomi Biru",
  "Konservasi Laut",
  "Pemberdayaan Komunitas"
] as const;

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Restorasi Terumbu Karang & Spider Reef",
    category: "Konservasi Laut",
    date: "15 Oktober 2024",
    location: "Kawasan Konservasi Laut NTT",
    image: "/gambar/lingkungan.webp",
    desc: "Tim penyelam ilmiah bersama pemuda pesisir memasang struktur laba-laba karang buatan guna memulihkan ekosistem terumbu karang yang rusak."
  },
  {
    id: "gal-2",
    title: "Kegiatan Belajar di Marine Learning Center",
    category: "Pendidikan Bahari",
    date: "08 Oktober 2024",
    location: "Learning Center Pesisir",
    image: "/gambar/pendidikan.webp",
    desc: "Anak-anak pulau antusias belajar literasi maritim dan mengakses komputer edukasi bertenaga surya."
  },
  {
    id: "gal-3",
    title: "Pemberdayaan Petani Rumput Laut & Solar Dome",
    category: "Ekonomi Biru",
    date: "02 Oktober 2024",
    location: "Sentra Produksi Pesisir",
    image: "/gambar/asrama.webp",
    desc: "Proses pengeringan higienis rumput laut merah berstandar ekspor di dalam solar dome dryer ramah lingkungan."
  },
  {
    id: "gal-4",
    title: "Aksi Bersih Pantai & Bank Sampah Sirkular",
    category: "Konservasi Laut",
    date: "25 September 2024",
    location: "Desa Zero-Plastic Binaan",
    image: "/gambar/gerbangmasuk.webp",
    desc: "Warga desa bahu-membahu mengumpulkan dan memilah sampah plastik pantai untuk ditukarkan dengan insentif sembako."
  },
  {
    id: "gal-5",
    title: "Pelatihan Homestay & Pemandu Ekowisata Bahari",
    category: "Pariwisata Berkelanjutan",
    date: "18 September 2024",
    location: "Kampung Ekowisata Binaan",
    image: "/gambar/halamandepan.webp",
    desc: "Sesi sertifikasi keselamatan pelayaran dan hospitality homestay berbasis kearifan lokal."
  },
  {
    id: "gal-6",
    title: "Penanaman 15.000 Mangrove Pelindung Pesisir",
    category: "Konservasi Laut",
    date: "12 September 2024",
    location: "Sabuk Hijau Mangrove Rote",
    image: "/gambar/masjid.webp",
    desc: "Gotong royong menanam bibit mangrove rhizophora untuk meredam gelombang dan menyerap karbon biru."
  }
];
