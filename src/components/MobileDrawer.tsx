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
            className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[var(--color-wire)] bg-[var(--color-sidebar-bg)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-mono text-[15px] font-bold leading-none tracking-tight text-text">
                saidaziz<span style={{ color: "var(--color-accent)" }}>.uz</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-wire)] bg-panel text-muted hover:text-text"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar variant="drawer" onNavigate={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
