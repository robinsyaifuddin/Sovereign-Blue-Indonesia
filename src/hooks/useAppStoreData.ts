import { useAppStoreContext } from '../context/AppStoreContext';

/**
 * Hook Facade untuk mengakses AppStore data.
 * Menggunakan data tersentralisasi dari AppStoreContext (Singleton),
 * mencegah multi-trigger fetch berulang yang menyebabkan HTTP 429 Too Many Requests.
 */
export function useAppStoreData() {
  return useAppStoreContext();
}
