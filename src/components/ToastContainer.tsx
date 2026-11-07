import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map(toast => {
        let bgStyle = 'bg-white border-slate-200 text-slate-800';
        let icon = <Info className="w-5 h-5 text-sky-500 shrink-0" />;

        if (toast.type === 'coin') {
          bgStyle = 'bg-amber-500 text-amber-950 border-amber-300 shadow-amber-500/30';
          icon = <span className="text-2xl animate-bounce" role="img" aria-label="coin">🪙</span>;
        } else if (toast.type === 'success') {
          bgStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/20';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-100 shrink-0" />;
        } else if (toast.type === 'error') {
          bgStyle = 'bg-rose-600 text-white border-rose-400 shadow-rose-600/20';
          icon = <AlertCircle className="w-5 h-5 text-rose-100 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-lg border text-sm font-semibold transition-all transform animate-in slide-in-from-bottom-3 duration-200 ${bgStyle}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="leading-snug pr-2">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
