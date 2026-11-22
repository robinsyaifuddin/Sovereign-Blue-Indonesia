import React from 'react';
import { 
  MapPin, Phone, Mail
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

export const Footer: React.FC = () => {
  const { siteInfo } = useAppStoreData();
  const SITE_INFO = siteInfo || FALLBACK_SITE_INFO;
  return (
    <footer className="bg-[#03203c] text-sky-100/90 pt-14 pb-8 border-t border-sky-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-sky-900/40">
          
          {/* Kolom 1: Profil Organisasi */}
          <div className="md:col-span-7 space-y-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.webp" 
                alt="Logo Sovereign Blue" 
                className="w-10 h-10 object-contain rounded-lg shrink-0" 
              />
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight">
                  {SITE_INFO.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-sky-200/80 leading-relaxed max-w-xl">
              Sovereign Blue Foundation berkomitmen membangun kedaulatan wilayah pesisir dan pulau-pulau di Indonesia melalui program terintegrasi yang memberdayakan masyarakat lokal dan melestarikan ekosistem laut nusantara.
            </p>
          </div>

          {/* Kolom 2: Kontak & Wilayah Kerja */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-sky-900/50 pb-2">
              Sekretariat & Wilayah Kerja
            </h4>
            <ul className="space-y-2.5 text-xs text-sky-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Jakarta & Nusa Tenggara Timur (Pulau Rote & Sekitarnya), Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:contact@sovereignblue.org" className="hover:text-white transition-colors">
                  contact@sovereignblue.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright Tengah */}
        <div className="pt-6 flex items-center justify-center text-center text-xs text-sky-300/70">
          <div>
            &copy; {new Date().getFullYear()} Sovereign Blue Foundation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
