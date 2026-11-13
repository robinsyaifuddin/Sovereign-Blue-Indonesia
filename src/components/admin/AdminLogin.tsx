import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Quote,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { api, setAuthToken } from '../../services/apiClient';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
}

interface QuoteSlide {
  image: string;
  quote: string;
}

const LOGIN_SLIDES: QuoteSlide[] = [
  {
    image: "/hero/Mencetak Generasi Qur'ani, Berakhlak, dan Berprestasi.webp",
    quote: "Pusat kendali santri, berita, dan pendaftaran dalam satu sistem terintegrasi yang andal, tertib, dan amanah."
  },
  {
    image: "/hero/Tahfidzul Qur'an Bersanad & Turats Keilmuan Ulama.webp",
    quote: "Mencetak generasi Qur'ani yang berkarakter mandiri, beradab, dan unggul di kancah nasional maupun global."
  },
  {
    image: "/hero/Pendidikan Holistik Berkarakter Ahlussunnah wal Jama'ah.webp",
    quote: "Memudahkan pengelolaan hafalan Quran bersanad dan arsip santri secara akurat, modern, dan real-time."
  }
];

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 15 * 60 * 1000; // 15 menit

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Periksa status rate-limit / lockout saat komponen di-load
  useEffect(() => {
    const checkLockout = () => {
      const lockUntil = Number(localStorage.getItem('admin_lockout_until') || 0);
      const now = Date.now();
      if (lockUntil > now) {
        setLockoutRemaining(Math.ceil((lockUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide secara berkala dan halus
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % LOGIN_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const recordFailedAttempt = () => {
    const currentAttempts = Number(localStorage.getItem('admin_login_fails') || 0) + 1;
    localStorage.setItem('admin_login_fails', String(currentAttempts));

    if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockUntil = Date.now() + LOCKOUT_TIME_MS;
      localStorage.setItem('admin_lockout_until', String(lockUntil));
      setLockoutRemaining(Math.ceil(LOCKOUT_TIME_MS / 1000));
      setErrorMessage(`Terlalu banyak percobaan gagal. Akses dikunci sementara selama 15 menit.`);
    } else {
      const sisa = MAX_FAILED_ATTEMPTS - currentAttempts;
      setErrorMessage(`Kredensial tidak valid. Sisa percobaan: ${sisa} kali sebelum akun dikunci sementara.`);
    }
  };

  const resetFailedAttempts = () => {
    localStorage.removeItem('admin_login_fails');
    localStorage.removeItem('admin_lockout_until');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutRemaining > 0) {
      setErrorMessage(`Sistem sedang terkunci. Tunggu ${Math.ceil(lockoutRemaining / 60)} menit lagi demi keamanan.`);
      return;
    }

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setErrorMessage('Username dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.login({ username: cleanUsername, password: cleanPassword });
      if (res && res.token) {
        resetFailedAttempts();
        setAuthToken(res.token);
        if (res.user) {
          localStorage.setItem('almursyid_admin_user', JSON.stringify(res.user));
        }
        onLoginSuccess(res.user);
        return;
      }
      throw new Error('Respon login tidak valid.');
    } catch (err: any) {

      recordFailedAttempt();
      setErrorMessage(err?.message || 'Username atau password tidak sesuai.');
    } finally {
      setLoading(false);
    }
  };

  const activeSlide = LOGIN_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#e8edf2] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans selection:bg-forest-900 selection:text-white">
      {/* Container Card Responsif */}
      <div className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[36px] shadow-[0_20px_50px_-15px_rgba(6,55,43,0.12),0_8px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden p-3 sm:p-4 lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          
          {/* KOLOM KIRI: Form Login */}
          <div className="lg:col-span-6 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full">
              {/* Header Title */}
              <div className="mb-6 sm:mb-8">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-1.5 mb-4 sm:mb-5 group text-xs font-semibold text-stone-500 hover:text-forest-950 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  <span>Kembali ke Website Utama</span>
                </Link>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Sistem Otentikasi Terenkripsi
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Masuk ke Portal
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Masukkan identitas administrator Anda dengan aman.
                </p>
              </div>

              {/* Notifikasi Error / Lockout */}
              {lockoutRemaining > 0 ? (
                <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-amber-900 text-xs sm:text-sm animate-in fade-in duration-200">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Keamanan Terpicu: Akses Ditangguhkan</strong>
                    <span className="leading-relaxed">
                      Terlalu banyak percobaan sandi salah. Coba lagi dalam{' '}
                      <strong>{Math.floor(lockoutRemaining / 60)}m {lockoutRemaining % 60}s</strong>.
                    </span>
                  </div>
                </div>
              ) : errorMessage && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200/80 flex items-start gap-2.5 text-red-800 text-xs sm:text-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                {/* Username Input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={username}
                      disabled={lockoutRemaining > 0 || loading}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username"
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-forest-900/15 focus:border-forest-900 transition-all duration-150 disabled:bg-stone-100 disabled:cursor-not-allowed"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      disabled={lockoutRemaining > 0 || loading}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi"
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-forest-900/15 focus:border-forest-900 transition-all duration-150 disabled:bg-stone-100 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      disabled={lockoutRemaining > 0 || loading}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors p-1"
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || lockoutRemaining > 0}
                  className="w-full mt-3 py-3 px-4 bg-forest-950 hover:bg-forest-900 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(6,55,43,0.35)] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Memverifikasi Akses...</span>
                    </>
                  ) : lockoutRemaining > 0 ? (
                    <>
                      <Lock className="w-4 h-4 text-amber-300" />
                      <span>Akses Ditangguhkan</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* KOLOM KANAN: Visual Hero Slider Card (Sama seperti Hero di Beranda) */}
          <div className="lg:col-span-6 relative flex flex-col justify-between min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] rounded-2xl sm:rounded-[28px] overflow-hidden p-5 sm:p-7 lg:p-8 text-white bg-[#070c09] shadow-inner">
            
            {/* Background Image Slider dengan Gradasi Elegan seperti Hero */}
            {LOGIN_SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img 
                  src={slide.image} 
                  alt="Al-Mursyid Hero Slide" 
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms]"
                />
                {/* Gradasi Khas Hero: Hitam Pekat & Emerald Halus */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(7, 12, 9, 0.95) 0%, rgba(6, 28, 20, 0.82) 45%, rgba(6, 28, 20, 0.55) 100%)'
                  }}
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(7, 12, 9, 0.95) 0%, rgba(7, 12, 9, 0.4) 50%, transparent 100%)'
                  }}
                />
              </div>
            ))}

            {/* Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

            {/* Header Brand Kanan */}
            <div className="relative z-10 flex items-center gap-3">
              <img 
                src="/logo.webp" 
                alt="Logo Al-Mursyid" 
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md" 
              />
              <div>
                <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase block text-white/95 leading-tight">
                  AL-MURSYID
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-300 font-semibold block leading-tight mt-0.5">
                  Islamic Boarding School
                </span>
              </div>
            </div>

            {/* Bagian Bawah: Glass Card Hanya Berisi Kutipan (Tanpa Nama & Jabatan) */}
            <div className="relative z-10 mt-6 sm:mt-8">
              <div className="bg-forest-950/75 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-2xl transition-all duration-300">
                <Quote className="w-5 h-5 text-emerald-400 mb-2 opacity-85" />
                <p className="text-xs sm:text-sm lg:text-base font-medium text-white/95 leading-relaxed">
                  "{activeSlide.quote}"
                </p>
                {/* Indikator titik slide di bawah kutipan */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end">
                  <div className="flex gap-1.5 shrink-0 items-center">
                    {LOGIN_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Pilih slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
