import { motion } from "framer-motion";
import { projects, accentVar } from "@/data/cv";

/** Mini career timeline — 3 dots representing role progression. */
export function CareerTimeline() {
  const items = [
    { year: "'22", role: "Intern", color: "var(--color-accent-warm)", current: false },
    { year: "'24", role: "Mobile", color: "var(--color-accent-blue)", current: false },
    { year: "'25", role: "Platform", color: "var(--color-accent)", current: true },
  ];
  return (
    <div className="relative pt-1">
      <div
        aria-hidden
        className="absolute left-2 right-2 top-2.5 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
        }}
      />
      <div className="relative grid grid-cols-3 items-end">
        {items.map((it, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 240, damping: 18 }}
              className="relative h-2.5 w-2.5 rounded-full ring-2 ring-bg"
              style={{ background: it.color, boxShadow: `0 0 10px ${it.color}` }}
            >
              {it.current && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: it.color }}
                  animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
            </motion.span>
            <span className="font-mono text-[10px] text-dim">{it.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Actual list of projects with their real titles. */
export function ProjectList() {
  return (
    <div className="flex flex-col gap-1.5">
      {projects.map((p, i) => {
        const color = accentVar[p.accent];
        const shortTitle = p.title.split(" — ")[0];
        return (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
            className="flex min-w-0 items-center gap-2"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span className="min-w-0 flex-1 truncate text-[12px] text-text">{shortTitle}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

