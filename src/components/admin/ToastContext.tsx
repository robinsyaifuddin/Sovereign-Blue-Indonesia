import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X, 
  Loader2,
  Trash2,
  HelpCircle
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'primary';
}

interface ToastContextType {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
  };
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Memproses...');

  // State untuk Dialog Konfirmasi Modal Modern
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    type: 'danger' | 'warning' | 'primary';
  }>({
    isOpen: false,
    title: 'Konfirmasi Tindakan',
    message: '',
    confirmText: 'Ya, Lanjutkan',
    cancelText: 'Batal',
    type: 'danger',
  });

  const confirmResolverRef = useRef<((value: boolean) => void) | null>(null);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, title: string, message?: string, duration = 3800) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const confirm = useCallback((options: ConfirmOptions | string): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmResolverRef.current = resolve;

      if (typeof options === 'string') {
        const isDelete = options.toLowerCase().includes('hapus');
        setConfirmState({
          isOpen: true,
          title: isDelete ? 'Konfirmasi Hapus' : 'Konfirmasi Tindakan',
          message: options,
          confirmText: isDelete ? 'Ya, Hapus' : 'Ya, Lanjutkan',
          cancelText: 'Batal',
          type: isDelete ? 'danger' : 'primary',
        });
      } else {
        setConfirmState({
          isOpen: true,
          title: options.title || (options.type === 'danger' ? 'Konfirmasi Hapus' : 'Konfirmasi Tindakan'),
          message: options.message,
          confirmText: options.confirmText || (options.type === 'danger' ? 'Ya, Hapus' : 'Ya, Lanjutkan'),
          cancelText: options.cancelText || 'Batal',
          type: options.type || 'danger',
        });
      }
    });
  }, []);

  const handleConfirmDecision = (result: boolean) => {
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
    if (confirmResolverRef.current) {
      confirmResolverRef.current(result);
      confirmResolverRef.current = null;
    }
  };

  const startLoading = useCallback((msg = 'Memproses permintaan...') => {
    setLoadingMessage(msg);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toastMethods = {
    success: (title: string, message?: string) => addToast('success', title, message),
    error: (title: string, message?: string) => addToast('error', title, message),
    warning: (title: string, message?: string) => addToast('warning', title, message),
    info: (title: string, message?: string) => addToast('info', title, message),
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods, confirm, isLoading, loadingMessage, startLoading, stopLoading }}>
      {children}

      {/* Top Loading Progress Line & Badge di Tengah */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex flex-col items-center">
          <div className="h-1 w-full bg-emerald-950/20 overflow-hidden">
            <div className="h-full bg-emerald-600 animate-pulse w-full"></div>
          </div>
          <div className="pt-4 px-4">
            <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/60 flex items-center gap-2.5 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400 shrink-0" />
              <span className="font-medium tracking-wide text-slate-100">{loadingMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Center Floating Toast Notifications Container */}
      <div 
        role="region" 
        aria-label="Notifikasi Sistem" 
        className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-[92vw] sm:max-w-md z-[90] flex flex-col items-center gap-2.5 pointer-events-none px-2 sm:px-0"
      >
        {toasts.map((item) => {
          const isSuccess = item.type === 'success';
          const isError = item.type === 'error';
          const isWarning = item.type === 'warning';

          return (
            <div
              key={item.id}
              role="alert"
              className={`
                pointer-events-auto relative w-full overflow-hidden rounded-2xl p-4 shadow-2xl border backdrop-blur-xl transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-3
                ${
                  isSuccess 
                    ? 'bg-white/95 border-emerald-500/30 text-slate-900 shadow-emerald-950/10' 
                    : isError 
                    ? 'bg-white/95 border-rose-500/30 text-slate-900 shadow-rose-950/10' 
                    : isWarning 
                    ? 'bg-white/95 border-amber-500/30 text-slate-900 shadow-amber-950/10' 
                    : 'bg-white/95 border-slate-300/80 text-slate-900 shadow-slate-900/10'
                }
              `}
            >
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 mt-0.5">
                  <div className={`p-2 rounded-xl ${
                    isSuccess ? 'bg-emerald-50 text-emerald-600' :
                    isError ? 'bg-rose-50 text-rose-600' :
                    isWarning ? 'bg-amber-50 text-amber-600' :
                    'bg-sky-50 text-sky-600'
                  }`}>
                    {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                    {isError && <AlertCircle className="w-5 h-5" />}
                    {isWarning && <AlertTriangle className="w-5 h-5" />}
                    {item.type === 'info' && <Info className="w-5 h-5" />}
                  </div>
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-sm font-bold tracking-tight text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  {item.message && (
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                      {item.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeToast(item.id)}
                  className="shrink-0 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                  aria-label="Tutup notifikasi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tactical subtle bottom accent line */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                  isSuccess ? 'bg-emerald-500' : isError ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-sky-500'
                }`} 
              />
            </div>
          );
        })}
      </div>

      {/* Modern Center Modal Confirmation Dialog (Ya / Tidak) */}
      {confirmState.isOpen && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => handleConfirmDecision(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header / Icon Header */}
            <div className="p-6 pb-4 flex items-start gap-4">
              <div className={`p-3 rounded-2xl shrink-0 ${
                confirmState.type === 'danger' 
                  ? 'bg-rose-50 text-rose-600 ring-4 ring-rose-50/50' 
                  : confirmState.type === 'warning'
                  ? 'bg-amber-50 text-amber-600 ring-4 ring-amber-50/50'
                  : 'bg-emerald-50 text-emerald-700 ring-4 ring-emerald-50/50'
              }`}>
                {confirmState.type === 'danger' ? (
                  <Trash2 className="w-6 h-6" />
                ) : confirmState.type === 'warning' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <HelpCircle className="w-6 h-6" />
                )}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <h3 id="modal-title" className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {confirmState.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed font-normal">
                  {confirmState.message}
                </p>
              </div>
            </div>

            {/* Actions / Tombol Ya & Batal Responsif Mobile */}
            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => handleConfirmDecision(false)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                {confirmState.cancelText}
              </button>

              <button
                type="button"
                onClick={() => handleConfirmDecision(true)}
                className={`w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                  confirmState.type === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                    : confirmState.type === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                    : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20'
                }`}
              >
                {confirmState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast harus digunakan di dalam ToastProvider');
  }
  return context;
};
