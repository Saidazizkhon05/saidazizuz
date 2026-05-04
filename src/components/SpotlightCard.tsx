import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  accent: string;
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export function SpotlightCard({ accent, children, className, tilt = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rotateX = useSpring(rxRaw, { stiffness: 220, damping: 26 });
  const rotateY = useSpring(ryRaw, { stiffness: 220, damping: 26 });

  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotX} ${spotY}, ${accent}26, transparent 65%)`;
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${spotX} ${spotY}, ${accent}66, transparent 60%)`;

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px);
    my.set(py);
    if (tilt) {
      rxRaw.set((py - 0.5) * -1.6);
      ryRaw.set((px - 0.5) * 1.6);
    }
  }

  function onPointerLeave() {
    rxRaw.set(0);
    ryRaw.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        rotateX: tilt ? rotateX : undefined,
        rotateY: tilt ? rotateY : undefined,
        transformPerspective: tilt ? 1200 : undefined,
        borderColor: "var(--color-panel-border)",
      }}
      className={cn(
        "panel-glass group relative overflow-hidden rounded-2xl border bg-panel/80",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          padding: "1px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
