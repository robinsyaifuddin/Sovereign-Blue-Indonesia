import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, Anchor, ChevronDown
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO, NAV_LINKS } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const Navbar: React.FC = () => {
  const { siteInfo } = useAppStoreData();
  const SITE_INFO = siteInfo || FALLBACK_SITE_INFO;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Institusi Branding */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1">
            <img 
              src="/logo.webp" 
              alt="Logo Sovereign Blue" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-lg group-hover:opacity-90 transition-opacity" 
            />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-blue-950 leading-tight transition-colors">
                Sovereign Blue Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              const hasChildren = Boolean(item.children && item.children.length > 0);
              
              if (hasChildren) {
                return (
                  <div 
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      to={item.href}
                      className={`group inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold tracking-normal transition-colors duration-200 ${
                        isActive 
                          ? 'text-blue-950 font-bold' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full mt-1 w-64 rounded-2xl bg-white border border-slate-200/90 shadow-lg py-2 z-50 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200">
                      {item.children?.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-4 py-2 hover:bg-slate-50 transition-colors"
                        >
                          <div className="text-xs font-bold text-slate-900">{sub.label}</div>
                          {sub.desc && <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{sub.desc}</div>}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group relative px-3 py-2 text-sm font-semibold tracking-normal transition-colors duration-200 ${
                    isActive 
                      ? 'text-blue-950 font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle Underline */}
                  <span 
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-900 scale-x-100 opacity-100' 
                        : 'bg-cyan-500 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Button: Hubungi Kami */}
          <div className="hidden lg:flex items-center gap-2">
            <Link 
              to="/kontak"
              className="text-xs font-bold bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-xs hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <div key={item.label} className="space-y-1">
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-2">
                    {item.children.map(sub => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2 py-1 text-xs text-slate-600 hover:text-blue-900"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="pt-3">
            <Link
              to="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block text-xs font-bold bg-blue-900 text-white px-4 py-2.5 rounded-xl shadow-xs"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
