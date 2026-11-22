import React, { useState } from 'react';
import { 
  ArrowUpRight, ChevronDown, Check,
  Send, Clock
} from 'lucide-react';
import { SITE_INFO as FALLBACK_SITE_INFO } from '../data/siteData';
import { useAppStoreData } from '../hooks/useAppStoreData';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "01",
    question: "Bagaimana cara berkolaborasi atau bermitra dengan Sovereign Blue Foundation?",
    answer: "Kami menyambut baik kemitraan institusi pendidikan, universitas (KKN Tematik & riset sains), korporasi (CSR & ESG Blue Carbon), maupun lembaga nirlaba. Anda dapat mengisi formulir kontak atau mengirim proposal ke partnership@sovereignblue.org."
  },
  {
    id: "02",
    question: "Di mana saja wilayah kerja operasional yayasan saat ini?",
    answer: "Sekretariat utama berkedudukan di Jakarta dan wilayah kerja lapangan terpadu berfokus di kawasan pesisir kepulauan Nusa Tenggara Timur (Pulau Rote dan pulau-pulau sekitarnya) bersama komunitas adat bahari setempat."
  },
  {
    id: "03",
    question: "Bagaimana alur donasi program dan akuntabilitasnya?",
    answer: "Seluruh donasi untuk adopsi pohon mangrove, beasiswa anak pesisir, maupun restorasi karang spider reef disalurkan secara transparan dengan laporan perkembangan dan geotagging periodik yang dapat diakses oleh donatur."
  },
  {
    id: "04",
    question: "Apakah masyarakat umum bisa berkunjung ke Learning Center atau sentra ekowisata binaan?",
    answer: "Tentu. Kami memfasilitasi program visitasi ekowisata bertanggung jawab, studi lapangan mahasiswa, dan keterlibatan komunitas. Silakan konfirmasi rencana kedatangan via WhatsApp sekretariat terlebih dahulu."
  },
  {
    id: "05",
    question: "Apakah tersedia program beasiswa pendidikan maritim?",
    answer: "Ya, Sovereign Blue Foundation menyediakan beasiswa penuh bagi putra-putri keluarga nelayan berprestasi di wilayah pesisir binaan untuk jenjang sekolah hingga perguruan tinggi bidang kelautan dan teknologi."
  }
];

export const ContactPage: React.FC = () => {
  const { siteInfo } = useAppStoreData();
  const SITE_INFO = siteInfo || FALLBACK_SITE_INFO;
  const [openFaq, setOpenFaq] = useState<string | null>("01");
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Kemitraan & Kolaborasi Program',
    schedule: 'Segera',
    message: ''
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white text-stone-900 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 pb-10 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-800 block">
                  Hubungi Kami &middot; 01
                </span>
                <span className="h-[2px] w-14 sm:w-16 bg-sky-600 block rounded-full"></span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.08]">
                Mari Terhubung <br />
                <span className="font-normal">Dengan Sovereign Blue</span>
              </h1>
            </div>
            <div className="lg:col-span-5 pb-1">
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                Punya pertanyaan seputar program kemaritiman, kemitraan CSR/ESG, penelitian universitas, atau donasi konservasi laut di Nusa Tenggara Timur? Tim sekretariat kami siap menyambut Anda.
              </p>
            </div>
          </div>

          {/* Panoramic Campus Hero Visual */}
          <div className="mt-10 sm:mt-12 rounded-xl sm:rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] relative bg-stone-200 border border-stone-300/70 shadow-sm">
            <img 
              src="/gambar/halamandepan.webp" 
              alt="Kampus Sovereign Blue Foundation Nusa Tenggara Timur" 
              className="w-full h-full object-cover contrast-[1.02] hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1.5 rounded bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] ">
              Kampus Sovereign Blue &bull; Kota Agung Timur, Nusa Tenggara Timur
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT: CONTACT INFO + FORM */}
      <section className="py-16 sm:py-24 border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Side: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                    Kontak Resmi
                  </h2>
                  <span className="text-[11px] font-mono text-sky-800 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60">02</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-light">
                  {SITE_INFO.foundation} &bull; Way Lalaan, Nusa Tenggara Timur
                </p>
              </div>

              {/* Boxed cards with green accent accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-sky-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    Email
                  </span>
                  <a 
                    href={`mailto:${SITE_INFO.contacts.email}`} 
                    className="text-xs sm:text-sm font-medium text-stone-900 hover:text-sky-700 transition-colors block break-words"
                  >
                    {SITE_INFO.contacts.email}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-sky-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    Telepon & WhatsApp
                  </span>
                  <a 
                    href={`tel:${SITE_INFO.contacts.phone}`} 
                    className="text-xs sm:text-sm font-medium text-stone-900 hover:text-sky-700 transition-colors block"
                  >
                    {SITE_INFO.contacts.phone}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:col-span-2 hover:border-sky-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    Alamat Kampus
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {SITE_INFO.address.full}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:col-span-2 hover:border-sky-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    Jam Pelayanan
                  </span>
                  <p className="text-xs text-stone-700 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                    <span>{SITE_INFO.contacts.operationalHours}</span>
                  </p>
                </div>
              </div>

              {/* Social Link & Maps Shortcut */}
              <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
                <a 
                  href={SITE_INFO.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-sky-800 hover:border-sky-300 transition-colors shadow-2xs"
                >
                  <span>Instagram {SITE_INFO.contacts.instagramHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-700" />
                </a>

                <a 
                  href={SITE_INFO.contacts.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-sky-800 hover:border-sky-300 transition-colors shadow-2xs"
                >
                  <span>Buka di Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-700" />
                </a>
              </div>
            </div>

            {/* Right Side: Form Card with Boxed Inputs */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
                {sent ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-800 mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900">
                      Pesan Berhasil Terkirim
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      Terima kasih, <strong>{formData.name}</strong>. Tim sekretariat Sovereign Blue akan segera meninjau pesan Anda dan merespons via WhatsApp atau telepon dalam kurun waktu 1x24 jam.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 hover:text-sky-950 underline underline-offset-4"
                    >
                      Kirim pesan lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-5">
                    
                    {/* Row 1: Nama & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          Nama Lengkap *
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="Contoh: Fulan bin Fulan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/10 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          Email
                        </label>
                        <input 
                          type="email"
                          placeholder="nama@email.com (opsional)"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: WhatsApp & Topik */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          No. WhatsApp / HP *
                        </label>
                        <input 
                          type="tel"
                          required
                          placeholder="08xxxxxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/10 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                          Topik Kebutuhan
                        </label>
                        <select
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/10 transition-all cursor-pointer"
                        >
                          <option value="Kemitraan & Kolaborasi Program">Kemitraan & Kolaborasi Program</option>
                          <option value="Program Ekowisata & Homestay">Program Ekowisata & Homestay</option>
                          <option value="Konservasi Laut & Blue Carbon">Konservasi Laut & Blue Carbon</option>
                          <option value="Beasiswa Pendidikan Bahari">Beasiswa Pendidikan Bahari</option>
                          <option value="Donasi & Sponsorship">Donasi & Sponsorship</option>
                          <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                          <option value="Wakaf & Infaq Sarana">Wakaf & Infaq Sarana</option>
                          <option value="Pertanyaan Umum">Pertanyaan Umum Lainnya</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Rencana Kunjungan / Timeline */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                        Waktu Respons / Jadwal Kunjungan yang Diharapkan
                      </label>
                      <input 
                        type="text"
                        placeholder="Contoh: Akhir pekan ini / Bulan depan / Segera"
                        value={formData.schedule}
                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/10 transition-all"
                      />
                    </div>

                    {/* Row 4: Pesan / Keterangan */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                        Tuliskan Pesan / Pertanyaan *
                      </label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Jelaskan secara singkat kebutuhan atau pertanyaan Anda..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-lg placeholder:text-stone-400 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/10 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button: Aurora Green Pill Button sesuai tema web */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-aurora-btn text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                      >
                        <span>Kirim Pesan</span>
                        <Send className="w-3.5 h-3.5 text-white/90" />
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EDITORIAL ACCORDION FAQ SECTION */}
      <section className="py-16 sm:py-24 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FAQ Title */}
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                  FAQ
                </h2>
                <span className="text-[11px] text-stone-700">03</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-light max-w-xs">
                Pertanyaan yang paling sering diajukan seputar kemitraan program, donasi, dan inisiatif kemaritiman.
              </p>
            </div>

            {/* FAQ Accordion List */}
            <div className="lg:col-span-8 divide-y divide-stone-200 border-t border-b border-stone-200">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        <span className="text-xs text-stone-700 pt-0.5 select-none">
                          {faq.id}
                        </span>
                        <span className="text-sm sm:text-base font-normal text-stone-900 group-hover:text-stone-600 transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <span className="text-stone-700 group-hover:text-stone-700 transition-transform duration-200 shrink-0 pt-0.5">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pl-8 sm:pl-12 pr-4 pt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. MAP SECTION (CLEAN & INTEGRATED) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-[11px] tracking-widest uppercase text-stone-700 block mb-1">
                Lokasi &middot; 04
              </span>
              <h3 className="text-2xl font-light text-stone-900">
                Peta Kampus Sovereign Blue
              </h3>
            </div>
            <a
              href={SITE_INFO.contacts.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 underline underline-offset-4"
            >
              <span>Petunjuk Arah Lengkap di Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-stone-300/80 h-[380px] sm:h-[440px] w-full bg-stone-200">
            <iframe
              title="Peta Lokasi Sovereign Blue Secretariat Nusa Tenggara Timur"
              src={`https://maps.google.com/maps?q=Ponpes+Sovereign Blue,+Kp.+Baru,+Kota+Agung+Barat,+Nusa Tenggara Timur&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
};


