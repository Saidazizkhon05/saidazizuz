import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Boxes,
  Zap,
  GraduationCap,
  AtSign,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { cv } from "@/data/cv";
import { SECTIONS } from "@/lib/sections";

const iconMap = {
  dashboard: LayoutDashboard,
  briefcase: Briefcase,
  boxes: Boxes,
  zap: Zap,
  grad: GraduationCap,
  at: AtSign,
};

interface Props {
  variant?: "fixed" | "drawer";
  onNavigate?: () => void;
}

export function Sidebar({ variant = "fixed", onNavigate }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleSelect(path: string) {
    navigate(path);
    onNavigate?.();
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col gap-7 border-r border-white/5 bg-bg-2/60 px-5 py-7 backdrop-blur-xl",
        variant === "fixed" ? "w-[260px] sticky top-0 max-h-screen" : "w-[280px]",
      )}
    >
      <BrandHeader />

      <div className="flex flex-col gap-1">
        {SECTIONS.map((s, i) => (
          <MenuItem
            key={s.id}
            entry={s}
            active={pathname === s.path}
            onClick={() => handleSelect(s.path)}
            delay={i * 0.04}
          />
        ))}
      </div>

    </aside>
  );
}

function BrandHeader() {
  const navigate = useNavigate();
  return (
    <motion.button
      type="button"
      onClick={() => navigate("/")}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className="group flex flex-col gap-0.5 text-left cursor-pointer"
    >
      <span className="font-mono text-[18px] font-bold leading-none tracking-tight text-text">
        saidaziz
        <span style={{ color: "var(--color-accent)" }}>.uz</span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
        {cv.title}
      </span>
    </motion.button>
  );
}

function MenuItem({
  entry,
  active,
  onClick,
  delay,
}: {
  entry: (typeof SECTIONS)[number];
  active: boolean;
  onClick: () => void;
  delay: number;
}) {
  const Icon = iconMap[entry.icon];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13px] transition-colors",
        active ? "text-text" : "text-muted hover:text-text",
      )}
    >
      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-[10px] bg-accent/10"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span
        className={cn(
          "relative h-1.5 w-1.5 rounded-full transition-all",
          active
            ? "bg-accent shadow-[0_0_0_4px_rgba(196,255,77,0.18)]"
            : "bg-dim group-hover:bg-muted",
        )}
      />
      <Icon className="relative h-4 w-4" strokeWidth={1.6} />
      <span className="relative font-medium">{entry.label}</span>
      <AnimatePresence>
        {active && (
          <motion.span
            key="arrow"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            className="relative ml-auto text-accent"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

