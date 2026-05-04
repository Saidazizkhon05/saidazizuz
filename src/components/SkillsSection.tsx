import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups, accentVar, type SkillGroup } from "@/data/cv";
import { SectionHeader } from "./SectionHeader";

export function SkillsSection() {
  return (
    <div>
      <SectionHeader title="Skills" />
      <div className="grid gap-3.5 sm:grid-cols-2 2xl:grid-cols-4">
        {skillGroups.map((g, i) => (
          <SkillGroupCard key={g.title} group={g} index={i} />
        ))}
      </div>
    </div>
  );
}

function SkillGroupCard({ group, index }: { group: SkillGroup; index: number }) {
  const accent = accentVar[group.accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      style={{ borderColor: "var(--color-panel-border)" }}
      className="panel-glass min-w-0 rounded-2xl border bg-panel/80 p-5"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="h-2 w-2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
        <h4 className="text-[12px] font-semibold uppercase tracking-[0.10em] text-muted">
          {group.title}
        </h4>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {group.skills.map((s, i) => (
          <SkillBar
            key={s.name}
            name={s.name}
            level={s.level}
            color={accent}
            delay={0.2 + i * 0.06}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between text-[12.5px]">
        <span className="font-medium text-text">{name}</span>
        <motion.span
          className="font-mono text-[11px] text-dim"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {level}
        </motion.span>
      </div>
      <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-[var(--color-tint)]">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: inView ? `${level}%` : "0%" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 0.8, 0.22, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
