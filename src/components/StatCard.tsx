import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  label: string;
  value?: string;
  suffix?: string;
  numeric?: number;
  color: string;
  visual: ReactNode;
  delay?: number;
}

export function StatCard({ label, value, suffix, numeric, color, visual, delay = 0 }: Props) {
  const hasValue = value !== undefined || numeric !== undefined;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.8, 0.22, 1] }}
      whileHover={{ y: -2 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/5 bg-panel/80 p-4"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{label}</p>
      {hasValue && (
        <div className="mt-2 flex min-w-0 items-end gap-1.5">
          {numeric !== undefined ? (
            <Counter to={numeric} className="text-[26px] font-semibold tracking-tight text-text" />
          ) : (
            <span className="min-w-0 truncate text-[18px] font-semibold tracking-tight text-text sm:text-[20px]">
              {value}
            </span>
          )}
          {suffix && <span className="mb-1 text-[11px] text-muted">{suffix}</span>}
        </div>
      )}
      <div className={hasValue ? "mt-3.5" : "mt-3"}>{visual}</div>
    </motion.div>
  );
}

function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        const formatted = Number.isInteger(to) ? Math.round(v).toString() : v.toFixed(1);
        ref.current.textContent = formatted;
      }
    });
  }, [spring, to]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
