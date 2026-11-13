import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Newspaper, 
  Image as ImageIcon, 
  Users, 
  BookOpen, 
  Building2, 
  Menu,
  X,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../../services/apiClient';
import { useToast } from './ToastContext';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast, confirm } = useToast();

  const handleLogout = async () => {
    const isConfirmed = await confirm({
      title: 'Keluar Sesi Admin',
      message: 'Apakah Anda yakin ingin keluar dari sesi Dashboard Admin?',
      confirmText: 'Ya, Keluar',
      cancelText: 'Batal',
      type: 'warning'
    });

    if (isConfirmed) {
      clearAuthToken();
      toast.info('Sesi Ditutup', 'Anda telah keluar dari dashboard admin.');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'ppdb', label: 'PPDB Online', icon: UserCheck, badge: null },
    { id: 'news', label: 'Berita & Artikel', icon: Newspaper, badge: null },
    { id: 'gallery', label: 'Galeri Kegiatan', icon: ImageIcon, badge: null },
    { id: 'pengurus', label: 'Profil Pengurus', icon: Users, badge: null },
    { id: 'program', label: 'Program Unggulan', icon: BookOpen, badge: null },
    { id: 'facilities', label: 'Fasilitas Pondok', icon: Building2, badge: null },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans antialiased flex flex-col justify-start">
      {/* Top Bar Floating / Rounded App Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.webp" 
                alt="Logo Al-Mursyid" 
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" 
              />
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Al-Mursyid
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 block">
                  Admin CMS & PPDB
                </span>
              </div>
            </Link>
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              Panel Pengelola
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Nav (Desktop & Mobile) */}
        <aside className={`
          lg:w-64 shrink-0 
          ${mobileMenuOpen ? 'block' : 'hidden lg:block'}
        `}>
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 sticky top-20">
            <div className="px-3 pt-2 pb-3">
              <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Menu Utama</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150
                      ${isActive 
                        ? 'bg-forest-950 text-white shadow-sm shadow-forest-950/20' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-forest-800 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400/70" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              {/* Profile Card */}
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-full bg-forest-950 text-white flex items-center justify-center text-xs font-bold ring-2 ring-forest-900/10 shrink-0">
                  AD
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-slate-800 leading-tight truncate">Admin Mursyid</p>
                  <p className="text-[10px] text-slate-400 truncate">Pengelola Web</p>
                </div>
              </div>

              {/* Quick Actions: Lihat Web & Keluar */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Lihat website publik"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Lihat Web</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                  title="Keluar / Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};
