import { motion } from "framer-motion";
import { roles, accentVar, type Role } from "@/data/cv";
import { SectionHeader } from "./SectionHeader";
import { SpotlightCard } from "./SpotlightCard";
import { TagChip } from "./TagChip";

export function ExperienceSection() {
  return (
    <div>
      <SectionHeader title="Experience" meta={`${roles.length} roles · timeline`} />
      <div className="relative pl-5 sm:pl-7">
        <div
          aria-hidden
          className="absolute left-1.5 top-2 bottom-2 w-px sm:left-2.5"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)",
          }}
        />
        {roles.map((role, i) => (
          <RoleRow key={`${role.title}-${role.company}`} role={role} index={i} />
        ))}
      </div>
    </div>
  );
}

function RoleRow({ role, index }: { role: Role; index: number }) {
  const accent = accentVar[role.accent];
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative pb-5"
    >
      <motion.span
        aria-hidden
        className="absolute -left-[18px] top-4 grid h-[14px] w-[14px] place-items-center rounded-full bg-bg sm:-left-[26px]"
        style={{ border: `2px solid ${accent}`, boxShadow: `0 0 14px ${accent}` }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <SpotlightCard accent={accent} className="p-5 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-2">
          <h3 className="text-[15.5px] font-semibold leading-tight text-text">
            {role.title}
            <span className="ml-1.5 text-[12.5px] font-normal text-muted">· {role.company}</span>
          </h3>
          <span className="font-mono text-[12px] text-dim sm:ml-auto">{role.period}</span>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {role.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-[1.55] text-muted">
              <span
                aria-hidden
                className="mt-2 inline-block h-px w-2.5 shrink-0"
                style={{ background: accent, opacity: 0.6 }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {role.tags.map((t) => (
            <TagChip key={t} label={t} color={accent} />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
