import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm"
          />
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px]"
          >
            <Sidebar variant="drawer" onNavigate={onClose} />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg border border-white/5 bg-panel text-muted hover:text-text"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
