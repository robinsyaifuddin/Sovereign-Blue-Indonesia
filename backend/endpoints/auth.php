<?php
/**
 * Auth API: Login & Session Check
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cors.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    $input = getJsonInput();
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (empty($username) || empty($password)) {
        jsonResponse(false, null, 'Username dan password wajib diisi.', 400);
    }

    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $rateLimitFile = sys_get_temp_dir() . '/almursyid_login_rate_' . md5($clientIp);

    // Rate Limiting: Maksimal 5 percobaan gagal (lockout 30 detik)
    if (file_exists($rateLimitFile)) {
        $rateData = @json_decode(file_get_contents($rateLimitFile), true);
        if ($rateData && isset($rateData['lock_until']) && time() < $rateData['lock_until']) {
            $remaining = max(1, $rateData['lock_until'] - time());
            jsonResponse(false, null, "Terlalu banyak percobaan login gagal. Demi keamanan, akun terkunci sementara. Coba lagi dalam {$remaining} detik.", 429);
        }
    }

    $stmt = $pdo->prepare("SELECT id, username, password_hash, name, role FROM users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        // Catat kegagalan login untuk IP ini
        $attempts = 1;
        if (file_exists($rateLimitFile)) {
            $rateData = @json_decode(file_get_contents($rateLimitFile), true) ?: [];
            $attempts = ($rateData['attempts'] ?? 0) + 1;
        }
        $lockUntil = ($attempts >= 5) ? (time() + 30) : 0; // Kunci 30 detik jika 5x gagal
        @file_put_contents($rateLimitFile, json_encode([
            'attempts' => $attempts,
            'lock_until' => $lockUntil,
            'last_attempt' => time()
        ]));

        if ($lockUntil > 0) {
            jsonResponse(false, null, 'Terlalu banyak percobaan gagal. Akses ditangguhkan selama 30 detik demi keamanan sistem.', 429);
        }

        $sisa = 5 - $attempts;
        jsonResponse(false, null, "Username atau kata sandi tidak valid. Sisa percobaan: {$sisa}.", 401);
    }

    // Reset rate limiter setelah login sukses
    if (file_exists($rateLimitFile)) {
        @unlink($rateLimitFile);
    }

    // Generate secure token (valid 30 hari agar admin tidak sering logout)
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+30 days'));

    $updateStmt = $pdo->prepare("UPDATE users SET token = ?, token_expires = ? WHERE id = ?");
    $updateStmt->execute([$token, $expires, $user['id']]);

    jsonResponse(true, [
        'token' => $token,
        'user'  => [
            'id'       => $user['id'],
            'username' => $user['username'],
            'name'     => $user['name'],
            'role'     => $user['role'],
        ],
        'expires' => $expires
    ], 'Login berhasil.');
}

jsonResponse(false, null, 'Metode HTTP tidak didukung.', 405);
