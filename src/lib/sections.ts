export const SECTIONS = [
  { id: "overview",   label: "Overview",   icon: "dashboard" as const, path: "/" },
  { id: "experience", label: "Experience", icon: "briefcase" as const, path: "/experience" },
  { id: "projects",   label: "Projects",   icon: "boxes"     as const, path: "/projects" },
  { id: "skills",     label: "Skills",     icon: "zap"       as const, path: "/skills" },
  { id: "education",  label: "Education",  icon: "grad"      as const, path: "/education" },
  { id: "contact",    label: "Contact",    icon: "at"        as const, path: "/contact" },
] as const;

export type SectionPath = (typeof SECTIONS)[number]["path"];
