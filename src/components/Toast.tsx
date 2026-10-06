import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export function Toast() {
  const { toast, hideToast } = useStore();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-cyan-500 shrink-0" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-toast pointer-events-auto">
      <div className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 p-4 rounded-2xl shadow-2xl border border-slate-800 dark:border-slate-200 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="text-xs sm:text-sm font-bold leading-snug">
            {toast.message}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {toast.actionLabel && toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                hideToast();
              }}
              className="text-xs font-black underline hover:opacity-80 whitespace-nowrap text-rose-400 dark:text-rose-600"
            >
              {toast.actionLabel}
            </button>
          )}

          <button 
            onClick={hideToast}
            className="p-1 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-400 hover:text-white dark:hover:text-slate-950"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
