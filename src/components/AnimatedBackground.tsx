import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-grid" />

      <motion.div
        className="absolute -top-40 right-0 h-[640px] w-[640px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #7c8cff 0%, transparent 60%)", opacity: dark ? 0.18 : 0.22 }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #c4ff4d 0%, transparent 60%)", opacity: dark ? 0.16 : 0.18 }}
        animate={{ x: [0, -40, 50, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 right-1/4 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #5be0c5 0%, transparent 60%)", opacity: dark ? 0.12 : 0.15 }}
        animate={{ x: [0, 30, -50, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, transparent 0%, var(--color-vignette) 70%, var(--color-vignette-end) 100%)",
        }}
      />
    </div>
  );
}
