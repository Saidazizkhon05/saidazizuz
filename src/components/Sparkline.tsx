import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  values: number[];
  color: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export function Sparkline({
  values,
  color,
  width = 120,
  height = 40,
  fill = true,
}: Props) {
  const { path, area, last } = useMemo(() => {
    if (values.length < 2) return { path: "", area: "", last: { x: 0, y: 0 } };
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;

    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / span) * (height - 6) - 3;
      return { x, y };
    });

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      d += ` C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
    }
    const a = `${d} L ${width},${height} L 0,${height} Z`;
    return { path: d, area: a, last: points[points.length - 1] };
  }, [values, width, height]);

  const gradId = `spark-grad-${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && (
        <motion.path
          d={area}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />
      )}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <motion.circle
        cx={last.x}
        cy={last.y}
        r="2.6"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
      <motion.circle
        cx={last.x}
        cy={last.y}
        r="6"
        fill={color}
        opacity="0.25"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.4, 1] }}
        transition={{ duration: 0.8, delay: 1.5 }}
      />
    </svg>
  );
}
