import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function ToastOutlet() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-24 right-6 z-50 flex flex-col gap-2"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-neutral-900 bg-[#111111] px-5 py-2.5 text-xs font-medium text-white shadow-xl"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                toast.type === 'error'
                  ? 'bg-red-400'
                  : toast.type === 'info'
                    ? 'bg-amber-300'
                    : 'bg-emerald-400'
              }`}
            />
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Bildirimi kapat"
              className="ml-1 rounded-full p-0.5 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
