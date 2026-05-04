import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/cv";
import { SectionHeader } from "./SectionHeader";

export function EducationSection() {
  return (
    <div>
      <SectionHeader
        title="Education"
        meta={`${education.length} institutions`}
        accent="var(--color-accent-blue)"
      />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {education.map((e, i) => (
          <motion.div
            key={e.school}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            style={{ borderColor: "var(--color-panel-border)" }}
            className="panel-glass min-w-0 rounded-2xl border bg-panel/80 p-5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-[10px] border border-accent-blue/25 bg-accent-blue/10">
                <GraduationCap
                  className="h-4 w-4 text-accent-blue"
                  strokeWidth={1.6}
                />
              </div>
              <span className="ml-auto font-mono text-[11px] text-dim">{e.kind}</span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-text">{e.school}</h3>
            <p className="mt-1 text-[13px] text-muted">{e.program}</p>
            <div className="mt-3 flex justify-between font-mono text-[11px]">
              <span className="text-muted">{e.location}</span>
              <span className="text-dim">{e.period}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
