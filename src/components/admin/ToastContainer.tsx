import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

const toneClasses = {
  success: 'border-green-500 bg-green-600 text-white',
  error: 'border-red-500 bg-red-600 text-white',
  info: 'border-stone-700 bg-stone-800 text-white',
};

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 left-6 z-[10002] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`pointer-events-auto flex min-w-[280px] items-center gap-3 rounded-xl border px-4 py-3 shadow-xl ${toneClasses[toast.type]}`}
          >
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
              type="button"
              onClick={() => onRemove(toast.id)}
              className="rounded-full px-2 py-1 text-xs opacity-80 transition-all hover:bg-white/15 hover:opacity-100"
            >
              Fermer
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
