<?php
/**
 * Safe Image & File Streamer Endpoint
 * Menampilkan file dari folder uploads dengan Content-Type yang benar
 * Contoh akses: /backend/endpoints/file.php?f=abs_20261110_135342_8500f058.png
 */

declare(strict_types=1);

// CORS headers agar bisa diakses dari frontend Vercel (almursyidtanggamus.web.id)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: {$origin}");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$filename = basename($_GET['f'] ?? '');
if (empty($filename)) {
    http_response_code(400);
    echo 'Parameter f (filename) wajib diisi.';
    exit;
}

// Cari letak fisik file uploads di server Hostinger
$possibleDirs = [
    dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    dirname(__DIR__, 1) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'public_html' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    dirname(__DIR__, 1) . DIRECTORY_SEPARATOR . 'public_html' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'public_html' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    dirname($_SERVER['DOCUMENT_ROOT']) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
    dirname($_SERVER['DOCUMENT_ROOT']) . DIRECTORY_SEPARATOR . 'public_html' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR,
];

$filePath = null;
foreach ($possibleDirs as $dir) {
    if (file_exists($dir . $filename)) {
        $filePath = $dir . $filename;
        break;
    }
}

if (!$filePath) {
    http_response_code(404);
    echo 'File tidak ditemukan.';
    exit;
}

// Cek MIME type
$ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
$mimes = [
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png'  => 'image/png',
    'webp' => 'image/webp',
    'gif'  => 'image/gif',
    'pdf'  => 'application/pdf',
    'svg'  => 'image/svg+xml'
];

$mime = $mimes[$ext] ?? 'application/octet-stream';

// Header Cache & Content-Type
header("Content-Type: {$mime}");
header("Content-Length: " . filesize($filePath));
header("Cache-Control: public, max-age=31536000, immutable");

// Stream file
readfile($filePath);
exit;
