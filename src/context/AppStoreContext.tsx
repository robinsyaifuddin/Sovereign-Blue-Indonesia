import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AppStore, PPDBApplicant, PPDBSettings } from '../services/appStore';
import { GalleryItem } from '../data/siteData';
import { api } from '../services/apiClient';

interface AppStoreContextType {
  siteInfo: ReturnType<typeof AppStore.getSiteInfo>;
  news: ReturnType<typeof AppStore.getNews>;
  gallery: GalleryItem[];
  programs: ReturnType<typeof AppStore.getPrograms>;
  facilities: ReturnType<typeof AppStore.getFacilities>;
  ppdbApplicants: PPDBApplicant[];
  ppdbSettings: PPDBSettings;
  reloadAll: () => void;
  syncAllFromDatabase: () => Promise<void>;
}

const AppStoreContext = createContext<AppStoreContextType | null>(null);

// Guard global agar tidak melakukan initial fetch berulang jika ada re-mount
let globalInitialSyncPromise: Promise<void> | null = null;

export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteInfo, setSiteInfo] = useState(() => AppStore.getSiteInfo());
  const [news, setNews] = useState(() => AppStore.getNews());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => AppStore.getGallery());
  const [programs, setPrograms] = useState(() => AppStore.getPrograms());
  const [facilities, setFacilities] = useState(() => AppStore.getFacilities());
  const [ppdbApplicants, setPPDBApplicants] = useState<PPDBApplicant[]>(() => AppStore.getPPDBApplicants());
  const [ppdbSettings, setPPDBSettings] = useState<PPDBSettings>(() => AppStore.getPPDBSettings());

  const lastEventIdRef = useRef<number>(0);
  const isSyncingRef = useRef<boolean>(false);

  const reloadAll = () => {
    setSiteInfo(AppStore.getSiteInfo());
    setNews(AppStore.getNews());
    setGallery(AppStore.getGallery());
    setPrograms(AppStore.getPrograms());
    setFacilities(AppStore.getFacilities());
    setPPDBApplicants(AppStore.getPPDBApplicants());
    setPPDBSettings(AppStore.getPPDBSettings());
  };

  const syncAllFromDatabase = async () => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    try {
      await Promise.allSettled([
        AppStore.syncNewsFromApi(),
        AppStore.syncGalleryFromApi(),
        AppStore.syncProgramsFromApi(),
        AppStore.syncFacilitiesFromApi(),
        AppStore.syncPPDBFromApi(),
        AppStore.syncPPDBSettingsFromApi(),
        AppStore.syncSiteInfoFromApi(),
      ]);
    } finally {
      isSyncingRef.current = false;
      reloadAll();
    }
  };

  useEffect(() => {
    // 1. Eksekusi initial direct fetch sekali saja secara singleton
    // Hanya lakukan initial sync database jika bukan di halaman login admin (mencegah beban rate limit saat login)
    const isLoginGate = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !localStorage.getItem('sovereignblue_auth_token');
    if (!globalInitialSyncPromise && !isLoginGate) {
      globalInitialSyncPromise = syncAllFromDatabase();
    }

    // Inisialisasi lastEventId dari server secara hening
    api.getRealtimeEvents(0)
      .then(res => {
        if (res && typeof res.latestId === 'number') {
          lastEventIdRef.current = res.latestId;
        }
      })
      .catch(() => {});

    // 2. Event listener sinkronisasi antar tab/komponen
    const handleUpdate = () => {
      reloadAll();
    };

    window.addEventListener('sovereignblue_store_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // 3. Polling event realtime berkala dengan interval sehat (30 detik)
    const pollRealtimeEvents = async () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !localStorage.getItem('sovereignblue_auth_token')) return;
      try {
        const res = await api.getRealtimeEvents(lastEventIdRef.current);
        if (res && res.events && res.events.length > 0) {
          lastEventIdRef.current = res.latestId;
          
          const entities = new Set(res.events.map((e: any) => e.entity));
          const syncTasks: Promise<any>[] = [];

          if (entities.has('news')) syncTasks.push(AppStore.syncNewsFromApi());
          if (entities.has('gallery')) syncTasks.push(AppStore.syncGalleryFromApi());
          if (entities.has('programs')) syncTasks.push(AppStore.syncProgramsFromApi());
          if (entities.has('facilities')) syncTasks.push(AppStore.syncFacilitiesFromApi());
          if (entities.has('ppdb')) syncTasks.push(AppStore.syncPPDBFromApi());
          if (entities.has('site_settings')) {
            syncTasks.push(AppStore.syncPPDBSettingsFromApi());
            syncTasks.push(AppStore.syncSiteInfoFromApi());
          }

          if (syncTasks.length > 0) {
            await Promise.allSettled(syncTasks);
            reloadAll();
          }
        }
      } catch {
        // Abaikan error jaringan sementara
      }
    };

    // Realtime ultra-cepat: cek update setiap 4 detik untuk update instan antar-perangkat
    const interval = setInterval(pollRealtimeEvents, 4000);

    return () => {
      window.removeEventListener('sovereignblue_store_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <AppStoreContext.Provider
      value={{
        siteInfo,
        news,
        gallery,
        programs,
        facilities,
        ppdbApplicants,
        ppdbSettings,
        reloadAll,
        syncAllFromDatabase
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStoreContext = (): AppStoreContextType => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStoreContext must be used within an AppStoreProvider');
  }
  return context;
};
