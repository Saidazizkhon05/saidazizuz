import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowUpRight,
  ArrowRight,
  type LucideProps,
} from "lucide-react";
import { contacts, type ContactLink } from "@/data/cv";
import { SectionHeader } from "./SectionHeader";

function LeetCodeIcon({ className, strokeWidth = 1.6, ...rest }: LucideProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M14.5 3.5 7 11l4.4 4.4a3.5 3.5 0 0 0 5 0L18 14" />
      <path d="M9 13h11" />
      <path d="m14.5 20.5-3.1-3.1" />
    </svg>
  );
}

const ICONS = {
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
  leetcode: LeetCodeIcon,
} as const;

export function ContactSection() {
  return (
    <div>
      <SectionHeader title="Contact" meta="always open" accent="var(--color-accent-teal)" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {contacts.map((c, i) => (
          <ContactTile key={c.label} item={c} index={i} />
        ))}
      </div>
    </div>
  );
}

function ContactTile({ item, index }: { item: ContactLink; index: number }) {
  const Icon = ICONS[item.icon];
  return (
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -2 }}
      style={{ borderColor: "var(--color-panel-border)" }}
      className="panel-glass group flex min-w-0 items-center gap-3 rounded-2xl border bg-panel/80 px-4 py-3.5 transition-colors hover:bg-panel-2"
    >
      <div className="grid h-9 w-9 place-items-center rounded-[10px] border border-accent/25 bg-accent/10 text-accent">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] text-muted">{item.label}</p>
        <p className="truncate text-[13.5px] font-semibold text-text">{item.value}</p>
      </div>
      {item.external ? (
        <ArrowUpRight
          className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
          strokeWidth={1.8}
        />
      ) : (
        <ArrowRight
          className="h-4 w-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-text"
          strokeWidth={1.8}
        />
      )}
    </motion.a>
  );
}
