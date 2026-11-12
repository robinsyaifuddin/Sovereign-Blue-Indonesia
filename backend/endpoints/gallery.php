<?php
/**
 * Gallery API: Read Fast + Admin Add & Delete
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// GET: Galeri
if ($method === 'GET') {
    // Pastikan kolom is_featured ada
    try {
        $pdo->query("SELECT is_featured FROM gallery LIMIT 1");
    } catch (\Throwable $e) {
        $pdo->exec("ALTER TABLE gallery ADD COLUMN is_featured TINYINT(1) DEFAULT 0");
    }

    $stmt = $pdo->query("SELECT id, title, category, image_url as imageUrl, COALESCE(is_featured, 0) as isFeatured FROM gallery ORDER BY is_featured DESC, id DESC");
    $items = $stmt->fetchAll();

    foreach ($items as &$it) {
        $it['isFeatured'] = (bool)($it['isFeatured'] ?? 0);
    }

    jsonResponse(true, $items, 'Galeri berhasil dimuat.', 200, [
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0'
    ]);
}

// POST: Tambah atau Update Foto Galeri (Admin Only)
if ($method === 'POST') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    // Pastikan kolom is_featured ada
    try {
        $pdo->query("SELECT is_featured FROM gallery LIMIT 1");
    } catch (\Throwable $e) {
        $pdo->exec("ALTER TABLE gallery ADD COLUMN is_featured TINYINT(1) DEFAULT 0");
    }

    $input = getJsonInput();
    $id         = !empty($input['id']) ? (int)$input['id'] : null;
    $title      = trim($input['title'] ?? '');
    $category   = trim($input['category'] ?? 'Kegiatan');
    $imageUrl   = trim($input['imageUrl'] ?? $input['image_url'] ?? $input['image'] ?? '');
    $isFeatured = !empty($input['isFeatured']) || !empty($input['is_featured']) ? 1 : 0;

    if (empty($title) || empty($imageUrl)) {
        jsonResponse(false, null, 'Judul dan URL Foto wajib diisi.', 400);
    }

    // Jika difavoritkan, pastikan total favorit tidak lebih dari 5
    if ($isFeatured === 1) {
        $countStmt = $pdo->prepare("SELECT COUNT(*) as c FROM gallery WHERE is_featured = 1 AND id != ?");
        $countStmt->execute([$id ?? 0]);
        $totalFav = (int)($countStmt->fetch()['c'] ?? 0);
        if ($totalFav >= 5) {
            jsonResponse(false, null, 'Maksimal hanya 5 foto yang dapat dijadikan Favorit (Top Frame).', 400);
        }
    }

    if ($id) {
        $stmt = $pdo->prepare("UPDATE gallery SET title = ?, category = ?, image_url = ?, is_featured = ? WHERE id = ?");
        $stmt->execute([$title, $category, $imageUrl, $isFeatured, $id]);
        recordRealtimeEvent($pdo, 'GALLERY_ITEM_UPDATED', 'gallery', (string)$id, ['title' => $title]);
        jsonResponse(true, ['id' => $id], 'Item galeri berhasil diperbarui.', 200);
    } else {
        $stmt = $pdo->prepare("INSERT INTO gallery (title, category, image_url, is_featured) VALUES (?, ?, ?, ?)");
        $stmt->execute([$title, $category, $imageUrl, $isFeatured]);

        $newId = $pdo->lastInsertId();
        recordRealtimeEvent($pdo, 'GALLERY_ITEM_ADDED', 'gallery', (string)$newId, ['title' => $title]);

        jsonResponse(true, ['id' => (int)$newId], 'Item galeri berhasil ditambahkan.', 201);
    }
}

// DELETE: Hapus Foto Galeri
if ($method === 'DELETE') {
    require_once __DIR__ . '/../middleware/auth.php';
    requireAuth();

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(false, null, 'ID foto galeri wajib disertakan.', 400);
    }

    $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = ?");
    $stmt->execute([$id]);

    recordRealtimeEvent($pdo, 'GALLERY_ITEM_DELETED', 'gallery', (string)$id);

    jsonResponse(true, null, 'Foto galeri berhasil dihapus.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
