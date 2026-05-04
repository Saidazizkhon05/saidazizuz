import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, ArrowUpRight, ArrowRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTIONS } from "@/lib/sections";

interface Props {
  onMenu?: () => void;
}

export function TopBar({ onMenu }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const section = SECTIONS.find((s) => s.path === pathname);
  const pageLabel = section?.label ?? "Overview";

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3"
    >
      {onMenu && (
        <button
          type="button"
          onClick={onMenu}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/5 bg-panel text-text hover:bg-panel-2 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" strokeWidth={1.8} />
        </button>
      )}
      <p className="font-mono text-[12px] text-muted">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="hidden transition-colors hover:text-text sm:inline"
        >
          saidaziz.uz
        </button>
        <span className="hidden sm:inline"> / </span>
        <span className="font-semibold text-text">{pageLabel}</span>
      </p>
      <div className="ml-auto hidden items-center gap-2 sm:flex">
        <ActionButton href="https://github.com/saidazizkhon05" icon={Github} label="GitHub" external />
        <ActionButton href="https://linkedin.com" icon={Linkedin} label="LinkedIn" external />
      </div>
      <ActionButton
        label="Get in touch"
        primary
        trailing={ArrowRight}
        className="ml-auto sm:ml-0"
        onClick={() => navigate("/contact")}
      />
    </motion.div>
  );
}

function ActionButton({
  href,
  label,
  icon: Icon,
  trailing: Trailing,
  external,
  primary,
  className,
  onClick,
}: {
  href?: string;
  label: string;
  icon?: typeof Github;
  trailing?: typeof ArrowRight;
  external?: boolean;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const sharedClass = cn(
    "group inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-[12.5px] font-semibold transition-colors",
    primary
      ? "bg-accent text-bg shadow-[0_18px_40px_-12px_rgba(196,255,77,0.55)] hover:bg-[#d6ff66]"
      : "border border-white/5 bg-panel text-text hover:border-white/10 hover:bg-panel-2",
    className,
  );
  const inner = (
    <>
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />}
      <span>{label}</span>
      {Trailing ? (
        <Trailing className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      ) : external ? (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={sharedClass}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={sharedClass}
    >
      {inner}
    </motion.a>
  );
}
