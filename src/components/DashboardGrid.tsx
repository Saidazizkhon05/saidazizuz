import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Boxes,
  Zap,
  GraduationCap,
  AtSign,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { TagChip } from "./TagChip";
import {
  cv,
  roles,
  projects,
  skillGroups,
  education,
  contacts,
  accentVar,
  type AccentName,
} from "@/data/cv";
import { cn } from "@/lib/utils";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.8, 0.22, 1] as const } },
};

export function DashboardGrid() {
  const navigate = useNavigate();
  const onNavigate = (path: string) => navigate(path);
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid grid-cols-12 gap-x-4 gap-y-4"
    >
      {/* ── Identity header ──────────────────────────── */}
      <motion.div variants={fadeUp} className="col-span-12 pb-2">
        <h1 className="mt-5 text-[32px] font-semibold leading-tight tracking-tight text-text sm:text-[38px]">
          {cv.fullName}
        </h1>
        <p className="mt-1.5 text-[15px] font-medium text-muted">{cv.title}</p>
        <p className="mt-3 max-w-[44ch] text-[13px] leading-relaxed text-muted">
          {cv.tagline}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-dim">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 shrink-0" />
            {cv.location}
          </span>
        </div>
      </motion.div>

      {/* ── Experience ───────────────────────────────── */}
      <motion.div variants={fadeUp} className="col-span-12 flex sm:col-span-4">
        <NavCard
          path="/experience"
          accent="accent-blue"
          Icon={Briefcase}
          title="Experience"
          onNavigate={onNavigate}
          className="flex-1"
        >
          <p className="mt-3 font-mono text-[11px] text-dim">
            {roles.length} roles · 2+ years
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim/60">
            {roles[0].company} · current
          </p>
        </NavCard>
      </motion.div>

      {/* ── Projects ─────────────────────────────────── */}
      <motion.div variants={fadeUp} className="col-span-12 flex sm:col-span-4">
        <NavCard
          path="/projects"
          accent="accent"
          Icon={Boxes}
          title="Projects"
          onNavigate={onNavigate}
          className="flex-1"
        >
          <div className="mt-3 flex flex-wrap gap-1.5">
            {projects.map((p) => (
              <span
                key={p.monogram}
                className="grid h-8 w-8 place-items-center rounded-lg border bg-panel/80 text-[10px] font-bold"
                style={{ borderColor: "var(--color-wire)", color: accentVar[p.accent] }}
              >
                {p.monogram}
              </span>
            ))}
          </div>
          <p className="mt-2.5 font-mono text-[10px] text-dim">{projects.length} shipped</p>
        </NavCard>
      </motion.div>

      {/* ── Skills ───────────────────────────────────── */}
      <motion.div variants={fadeUp} className="col-span-12 flex sm:col-span-4">
        <NavCard
          path="/skills"
          accent="accent-teal"
          Icon={Zap}
          title="Skills"
          onNavigate={onNavigate}
          className="flex-1"
        >
          <div className="mt-3 flex flex-wrap gap-1">
            {skillGroups[0].skills.slice(0, 3).map((s) => (
              <TagChip key={s.name} label={s.name} />
            ))}
          </div>
          <p className="mt-2.5 font-mono text-[10px] text-dim">{skillGroups.length} groups</p>
        </NavCard>
      </motion.div>

      {/* ── Education ────────────────────────────────── */}
      <motion.div variants={fadeUp} className="col-span-12 flex sm:col-span-6">
        <NavCard
          path="/education"
          accent="accent-warm"
          Icon={GraduationCap}
          title="Education"
          onNavigate={onNavigate}
          className="flex-1"
        >
          <p className="mt-3 text-[12px] font-medium text-text">{education[0].school}</p>
          <p className="mt-0.5 text-[11px] text-muted">{education[0].location}</p>
          <p className="mt-1 font-mono text-[10px] text-dim">{education[0].period}</p>
        </NavCard>
      </motion.div>

      {/* ── Contact ──────────────────────────────────── */}
      <motion.div variants={fadeUp} className="col-span-12 flex sm:col-span-6">
        <NavCard
          path="/contact"
          accent="accent-rose"
          Icon={AtSign}
          title="Contact"
          onNavigate={onNavigate}
          className="flex-1"
        >
          <div className="mt-3 flex flex-col gap-2">
            {contacts.slice(0, 3).map((c) => (
              <div key={c.label} className="flex items-center gap-2 text-[12px]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                  {c.label}
                </span>
                <span className="text-muted">{c.value}</span>
              </div>
            ))}
          </div>
        </NavCard>
      </motion.div>
    </motion.div>
  );
}

// ── NavCard ────────────────────────────────────────────────────────────────────

interface NavCardProps {
  path: string;
  accent: AccentName;
  Icon: ElementType;
  title: string;
  onNavigate: (path: string) => void;
  children?: ReactNode;
  className?: string;
}

function NavCard({ path, accent, Icon, title, onNavigate, children, className }: NavCardProps) {
  const color = accentVar[accent];
  return (
    <button
      type="button"
      onClick={() => onNavigate(path)}
      className={cn("block cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl", className)}
    >
      <SpotlightCard accent={color} className="h-full p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-white/8"
              style={{ background: `${color}18`, color }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.6} />
            </span>
            <span className="text-[13px] font-semibold text-text">{title}</span>
          </div>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-dim transition-colors group-hover:text-text"
            strokeWidth={1.5}
          />
        </div>
        {children}
      </SpotlightCard>
    </button>
  );
}
