<?php
/**
 * Seeder Berita & Reset Galeri
 * Menghapus data berita dummy lama dan memasukkan berita otentik Pondok Pesantren Al-Mursyid Tanggamus
 * Gambar berita dikosongkan agar admin bisa mengunggah sendiri secara bertahap.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();

// 1. Kosongkan tabel berita lama
$pdo->exec("TRUNCATE TABLE news");

// 2. Data Berita Otentik Pondok Pesantren Al-Mursyid Modern Tanggamus (Gambar Kosong)
$authenticNews = [
    [
        'title' => "Wisuda Akbar Tahfidz Qur'an 30 Juz & Penganugerahan Sanad Santri Al-Mursyid",
        'slug' => "wisuda-akbar-tahfidz-quran-30-juz-dan-sanad-al-mursyid",
        'category' => "Prestasi Santri",
        'excerpt' => "Pondok Pesantren Al-Mursyid menggelar prosesi wisuda tahfidz Al-Qur'an 30 juz dan penganugerahan sanad muttashil kepada para santri yang telah menyelesaikan setoran hafalan mutqin.",
        'content' => "Alhamdulillah, rasa syukur mendalam dipanjatkan ke hadirat Allah SWT. Pondok Pesantren Al-Mursyid Tanggamus resmi mewisuda santriwan dan santriwati penghafal Al-Qur'an 30 juz. Dalam prosesi wisuda yang berlangsung khidmat di aula pesantren di Way Lalaan Tanggamus, para santri menerima syahadah kelulusan tahfidz dan sanad hafalan yang bersambung kepada Rasulullah SAW. Acara ini dihadiri oleh jajaran pembina yayasan, dewan asatidz, ulama setempat, dan para wali santri dengan penuh haru dan bangga.",
        'author' => "Humas Al-Mursyid",
        'published_at' => "2026-10-28",
        'image_url' => "", // Dikosongkan agar admin upload foto asli
        'status' => "published"
    ],
    [
        'title' => "Penerimaan Santri Baru (PPDB) Pesantren Al-Mursyid Tanggamus Resmi Dibuka",
        'slug' => "ppdb-santri-baru-pesantren-al-mursyid-tanggamus-resmi-dibuka",
        'category' => "Informasi PPDB",
        'excerpt' => "Pondok Pesantren Al-Mursyid Islamic Boarding School Tanggamus membuka pendaftaran santri baru untuk jenjang pendidikan kepesantrenan dan diniyah modern.",
        'content' => "Pondok Pesantren Al-Mursyid Islamic Boarding School Tanggamus secara resmi membuka pendaftaran santri baru (PPDB). Mengusung visi mencetak generasi Qur'ani yang berakhlak mulia, cerdas, dan mandiri, Al-Mursyid menyediakan kurikulum terpadu antara penguatan tahfidz Al-Qur'an 30 juz, pendalaman kitab kuning, dan pendidikan formal. Pendaftaran dapat dilakukan secara online melalui website resmi atau langsung datang ke sekretariat panitia di Way Lalaan, Tanggamus.",
        'author' => "Panitia PPDB",
        'published_at' => "2026-10-25",
        'image_url' => "", // Dikosongkan agar admin upload foto asli
        'status' => "published"
    ],
    [
        'title' => "Kajian Akbar Bulanan & Muhasabah Wali Santri Bersama Majelis Asatidz",
        'slug' => "kajian-akbar-bulanan-dan-muhasabah-wali-santri",
        'category' => "Agenda Pondok",
        'excerpt' => "Mempererat silaturahmi dan sinergi pendidikan antara asatidz dan orang tua santri dalam membina adab serta spiritualitas putra-putri di lingkungan pesantren.",
        'content' => "Sinergi antara orang tua dan pesantren merupakan pilar utama keberhasilan pendidikan santri. Dalam rangka mewujudkan hal tersebut, Pesantren Al-Mursyid Tanggamus secara rutin menggelar Kajian Akbar Bulanan dan Muhasabah bersama wali santri. Majelis ini menjadi wadah musyawarah, penyampaian progres hafalan santri, serta tausiyah penguatan ketahanan keluarga Islami oleh dewan pimpinan pondok.",
        'author' => "Bidang Kesantrian",
        'published_at' => "2026-10-20",
        'image_url' => "", // Dikosongkan agar admin upload foto asli
        'status' => "published"
    ],
    [
        'title' => "Santri Al-Mursyid Ukir Prestasi di Musabaqah Hifdzil Qur'an (MHQ) Provinsi Lampung",
        'slug' => "santri-al-mursyid-ukir-prestasi-mhq-lampung",
        'category' => "Prestasi Akademik",
        'excerpt' => "Santri Pondok Pesantren Al-Mursyid kembali meraih prestasi gemilang dalam ajang Musabaqah Hifdzil Qur'an tingkat Kabupaten Tanggamus dan Provinsi Lampung.",
        'content' => "Dedikasi para santri dalam membiasakan tilawah dan muraja'ah Al-Qur'an setiap ba'da subuh dan ashar membuahkan hasil membanggakan. Delegasi santri Al-Mursyid berhasil menyabet juara pada ajang Musabaqah Hifdzil Qur'an (MHQ). Prestasi ini menjadi motivasi bagi seluruh santri untuk terus menjaga ketekunan dan keikhlasan dalam berinteraksi dengan kalamullah.",
        'author' => "Divisi Tahfidz",
        'published_at' => "2026-10-15",
        'image_url' => "", // Dikosongkan agar admin upload foto asli
        'status' => "published"
    ],
    [
        'title' => "Program Kemandirian Santri: Budidaya Perikanan dan Pertanian Organik Asri di Way Lalaan",
        'slug' => "program-kemandirian-santri-al-mursyid-tanggamus",
        'category' => "Kewirausahaan",
        'excerpt' => "Santri Al-Mursyid dibekali keterampilan hidup melalui program agrobisnis dan kemandirian pangan di kawasan sejuk lereng Tanggamus.",
        'content' => "Selain menimba ilmu agama dan menghafal Al-Qur'an, santri Al-Mursyid juga dididik menjadi pribadi yang mandiri dan beretos kerja tinggi. Melalui kegiatan ekstrakurikuler kepanduan dan wirausaha santri, mereka diajarkan teknik budidaya perikanan air tawar serta berkebun sayur organik di lahan pesantren Way Lalaan yang subur dan asri.",
        'author' => "Humas Al-Mursyid",
        'published_at' => "2026-10-10",
        'image_url' => "", // Dikosongkan agar admin upload foto asli
        'status' => "published"
    ]
];

$stmt = $pdo->prepare("INSERT INTO news (title, slug, category, excerpt, content, author, published_at, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
foreach ($authenticNews as $n) {
    $stmt->execute([
        $n['title'],
        $n['slug'],
        $n['category'],
        $n['excerpt'],
        $n['content'],
        $n['author'],
        $n['published_at'],
        $n['image_url'],
        $n['status']
    ]);
}

jsonResponse(true, [
    'news_count' => count($authenticNews),
    'message' => 'Berita Al-Mursyid Tanggamus berhasil di-seed ulang dengan gambar kosong.'
], 'Seeder berita sukses.');
