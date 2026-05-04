import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, ArrowUpRight, ArrowRight, Menu, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTIONS } from "@/lib/sections";
import { useTheme } from "@/lib/theme";

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
      className="mb-6 flex items-center gap-3"
    >
      {onMenu && (
        <button
          type="button"
          onClick={onMenu}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--color-wire)] bg-panel text-text hover:bg-panel-2 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" strokeWidth={1.8} />
        </button>
      )}

      {/* Brand — always visible on every page */}
      <motion.button
        type="button"
        onClick={() => navigate("/")}
        whileTap={{ scale: 0.97 }}
        className="flex cursor-pointer flex-col gap-0.5 text-left"
      >
        <span className="font-mono text-[15px] font-bold leading-none tracking-tight text-text">
          saidaziz<span style={{ color: "var(--color-accent)" }}>.uz</span>
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
          Software Engineer
        </span>
      </motion.button>

      {pathname !== "/" && (
        <span className="hidden items-center gap-1.5 font-mono text-[12px] sm:flex">
          <span className="text-dim">/</span>
          <span className="text-muted">{pageLabel}</span>
        </span>
      )}

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          <ActionButton href="https://github.com/saidazizkhon05" icon={Github} label="GitHub" external />
          <ActionButton href="https://linkedin.com" icon={Linkedin} label="LinkedIn" external />
        </div>
        <ThemeToggle />
        <ActionButton
          label="Get in touch"
          primary
          trailing={ArrowRight}
          onClick={() => navigate("/contact")}
        />
      </div>
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
      : "border border-[var(--color-wire)] bg-panel text-text hover:border-[var(--color-wire-2)] hover:bg-panel-2",
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

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[var(--color-wire)] bg-panel text-muted transition-colors hover:text-text"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.6} />
      )}
    </motion.button>
  );
}
