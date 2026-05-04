import { motion } from "framer-motion";

interface Props {
  title: string;
  meta?: string;
  accent?: string;
  index?: number;
}

export function SectionHeader({ title, meta, accent = "var(--color-accent)", index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="mb-5 flex items-end gap-3"
    >
      <motion.div
        className="h-6 w-1 rounded-sm"
        style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-text">
        {title}
      </h2>
      {meta && <span className="ml-auto font-mono text-[12px] text-muted">{meta}</span>}
    </motion.div>
  );
}
