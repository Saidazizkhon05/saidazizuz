import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-grid" />

      <motion.div
        className="absolute -top-40 right-0 h-[640px] w-[640px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent-blue) 0%, transparent 60%)", opacity: 0.18 }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)", opacity: 0.16 }}
        animate={{ x: [0, -40, 50, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 right-1/4 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent-teal) 0%, transparent 60%)", opacity: 0.12 }}
        animate={{ x: [0, 30, -50, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(0,0,0,0) 0%, rgba(10,10,12,0.65) 70%, rgba(10,10,12,0.95) 100%)",
        }}
      />
    </div>
  );
}
