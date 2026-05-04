import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  color?: string;
  dot?: boolean;
  className?: string;
}

export function TagChip({ label, color, dot, className }: Props) {
  return (
    <motion.span
      whileHover={{ y: -1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px]",
        className,
      )}
      style={{
        borderColor: color ? `${color}59` : "rgba(255,255,255,0.08)",
        backgroundColor: color ? `${color}14` : "rgba(255,255,255,0.025)",
        color: color ?? "var(--color-muted)",
      }}
    >
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: color ?? "var(--color-accent)",
            boxShadow: `0 0 8px ${color ?? "var(--color-accent)"}`,
          }}
        />
      )}
      {label}
    </motion.span>
  );
}
