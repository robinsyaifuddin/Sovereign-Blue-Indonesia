import { useState, useEffect, useRef } from 'react';
import { AppStore, PPDBApplicant, PPDBSettings } from '../services/appStore';
import { GalleryItem } from '../data/siteData';
import { api } from '../services/apiClient';

export function useAppStoreData() {
  const [siteInfo, setSiteInfo] = useState(AppStore.getSiteInfo());
  const [news, setNews] = useState(AppStore.getNews());
  const [gallery, setGallery] = useState<GalleryItem[]>(AppStore.getGallery());
  const [programs, setPrograms] = useState(AppStore.getPrograms());
  const [facilities, setFacilities] = useState(AppStore.getFacilities());
  const [ppdbApplicants, setPPDBApplicants] = useState<PPDBApplicant[]>(AppStore.getPPDBApplicants());
  const [ppdbSettings, setPPDBSettings] = useState<PPDBSettings>(AppStore.getPPDBSettings());

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
    // 1. Initial direct fetch dari Server Database Hostinger
    syncAllFromDatabase();

    // Inisialisasi lastEventId dari server
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

    window.addEventListener('almursyid_store_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // 3. Ultra Fast & Lightweight Realtime Polling (cek event setiap 3.5 detik)
    // Jika ada event perubahan dari admin/perangkat manapun, langsung tarik data terbaru
    const pollRealtimeEvents = async () => {
      try {
        const res = await api.getRealtimeEvents(lastEventIdRef.current);
        if (res && res.events && res.events.length > 0) {
          lastEventIdRef.current = res.latestId;
          
          // Trigger sync entities yang berubah
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
        // Fallback hening jika koneksi terputus sesaat
      }
    };

    const interval = setInterval(pollRealtimeEvents, 3500);

    // Polling backup menyeluruh setiap 25 detik
    const fullBackupInterval = setInterval(() => {
      syncAllFromDatabase();
    }, 25000);

    return () => {
      window.removeEventListener('almursyid_store_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      clearInterval(interval);
      clearInterval(fullBackupInterval);
    };
  }, []);

  return {
    siteInfo,
    news,
    gallery,
    programs,
    facilities,
    ppdbApplicants,
    ppdbSettings,
    reloadAll
  };
}
