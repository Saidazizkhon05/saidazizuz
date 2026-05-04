import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { projects, accentVar, type Project } from "@/data/cv";
import { SectionHeader } from "./SectionHeader";
import { SpotlightCard } from "./SpotlightCard";
import { TagChip } from "./TagChip";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  return (
    <div>
      <SectionHeader title="Projects" />
      <div className="grid gap-3.5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            className={cn("min-w-0", p.featured && "sm:col-span-2")}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = accentVar[project.accent];
  return (
    <SpotlightCard accent={accent} className="p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Monogram text={project.monogram} accent={accent} />
        <div className="ml-auto shrink-0">
          <StatusPill status={project.status} accent={accent} />
        </div>
      </div>
      <h3 className="mt-4 text-[15.5px] font-semibold leading-tight text-text break-words">
        {project.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.55] text-muted">{project.description}</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-[12.5px] leading-[1.55] text-muted">
            <span
              aria-hidden
              className="mt-2 inline-block h-px w-2.5 shrink-0"
              style={{ background: accent, opacity: 0.7 }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <TagChip key={t} label={t} color={accent} />
        ))}
      </div>
      {project.storeLinks && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.storeLinks.appStore && (
            <StoreButton href={project.storeLinks.appStore} label="App Store" icon={<AppleIcon />} />
          )}
          {project.storeLinks.playStore && (
            <StoreButton href={project.storeLinks.playStore} label="Google Play" icon={<PlayStoreIcon />} />
          )}
        </div>
      )}
    </SpotlightCard>
  );
}

function Monogram({ text, accent }: { text: string; accent: string }) {
  return (
    <motion.div
      whileHover={{ rotate: -4, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="grid h-10 w-10 place-items-center rounded-xl border font-mono text-[13px] font-bold"
      style={{
        color: accent,
        borderColor: `${accent}40`,
        background: `linear-gradient(135deg, ${accent}1A, ${accent}05)`,
      }}
    >
      {text}
    </motion.div>
  );
}

function StoreButton({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-text transition-colors hover:border-white/20 hover:bg-white/10"
    >
      {icon}
      {label}
    </motion.a>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.46 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.378-3.066c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm11.207 10.99L2.088 1.712a1.49 1.49 0 0 1 .756-.196l13.069 7.396-3.37 3.002zm0 2.069l3.297 3.278-12.94 7.333a1.491 1.491 0 0 1-.802-.211l10.445-10.4z" />
    </svg>
  );
}

function StatusPill({
  status,
  accent,
}: {
  status: Project["status"];
  accent: string;
}) {
  const glow = status === "live" || status === "shipped";
  const labelMap: Record<Project["status"], string> = {
    live: "live",
    shipped: "shipped",
    sdk: "SDK",
    infra: "infra",
    archived: "archived",
  };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px]"
      style={{
        borderColor: glow ? `${accent}66` : "rgba(255,255,255,0.08)",
        background: glow ? `${accent}1A` : "rgba(255,255,255,0.025)",
        color: glow ? accent : "var(--color-muted)",
      }}
    >
      {glow && (
        <motion.span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      {labelMap[status]}
    </span>
  );
}
