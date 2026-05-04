export type AccentName =
  | "accent"
  | "accent-blue"
  | "accent-teal"
  | "accent-warm"
  | "accent-rose";

export interface Role {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
  accent: AccentName;
}

export type ProjectStatus = "live" | "shipped" | "sdk" | "infra" | "archived";

export interface Project {
  monogram: string;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  status: ProjectStatus;
  accent: AccentName;
  featured?: boolean;
  storeLinks?: {
    appStore?: string;
    playStore?: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  accent: AccentName;
  skills: Skill[];
}

export interface Education {
  school: string;
  program: string;
  location: string;
  period: string;
  kind: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external: boolean;
  icon:
    | "mail"
    | "phone"
    | "linkedin"
    | "github"
    | "leetcode";
}

export const cv = {
  fullName: "Saidazizkhon Yuldashev",
  shortName: "Saidazizkhon Y.",
  initials: "SY",
  title: "Software Engineer",
  location: "Seoul · KST · UTC+9",
  tagline: "Building production-grade mobile apps.",
  summary:
    "Mobile-first software engineer with 2+ years shipping production iOS & Android apps and platform automation — Flutter / native SDKs, Docker-based deploys, and CI/CD pipelines. I integrate ML / vision tooling when projects call for it.",
};

export const roles: Role[] = [
  {
    title: "Mobile Developer",
    company: "Humblebee",
    period: "11/2024 — Current",
    accent: "accent-blue",
    bullets: [
      "Shipped Enlighten Qalb — Flutter chatbot live on App Store & Play Store.",
      "Architected a native iOS / Android device-intelligence SDK with feature parity across both platforms.",
      "Built IV Drip — Flutter + Unity hybrid app integrating an existing ONNX vision pipeline on-device.",
      "Ported model inference to Unity / C# for performance — ML / vision was integrated tooling, not the focus.",
    ],
    tags: ["Flutter", "iOS", "Android", "Native SDK", "Unity / C#"],
  },
  {
    title: "Platform Engineer",
    company: "Humblebee",
    period: "08/2025 — 02/2026",
    accent: "accent",
    bullets: [
      "Managed Docker-based deployment of full-stack and vision services to local production.",
      "Configured secure SSH remote access with public-token auth across multi-user prod servers.",
      "Built CI/CD with GitHub Actions; daily Python automation of dev & ops workflows.",
      "Resolved cross-project bottlenecks, accelerating delivery speed.",
    ],
    tags: ["Docker", "SSH", "GitHub Actions", "Python", "Linux"],
  },
  {
    title: "Flutter Developer (Intern)",
    company: "Optikom",
    period: "07/2022 — 10/2022",
    accent: "accent-warm",
    bullets: [
      "Developed Optimedia — high-performance VOD & live TV streaming for global channels.",
      "Worked on real-time playback, channel switching, and streaming reliability.",
    ],
    tags: ["Flutter", "Streaming", "VOD"],
  },
];

export const projects: Project[] = [
  {
    monogram: "EQ",
    title: "Enlighten Qalb — Mobile Chatbot",
    description:
      "Flutter chatbot grounded in works of Imam Al-Ghazali. Shipped on App Store & Play Store.",
    bullets: [
      "Designed and built a polished real-time chat UX in Flutter",
      "Integrated a RAG backend for context-aware responses",
      "Delivered end-to-end — store builds, releases, telemetry",
    ],
    tags: ["Flutter", "iOS", "Android", "Firebase", "RAG"],
    status: "shipped",
    accent: "accent-blue",
    featured: true,
    storeLinks: {
      appStore: "https://apps.apple.com/us/app/enlighten-qalb/id6747300896",
      playStore: "https://play.google.com/store/apps/details?id=ai.humblebee.enlightenQalb&pcampaignid=web_share",
    },
  },
  {
    monogram: "ID",
    title: "Identity SDK — Native iOS / Android",
    description:
      "Native device-intelligence SDK for security & analytical fingerprinting.",
    bullets: [
      "Architected the SDK across iOS and Android with parity",
      "Hardened with binary-level logic + anti-reverse-engineering",
      "Managed core telemetry via low-level binary files",
    ],
    tags: ["iOS", "Android", "Native SDK", "Security"],
    status: "sdk",
    accent: "accent-warm",
  },
  {
    monogram: "OM",
    title: "Optimedia — Global Streaming App",
    description:
      "Mobile streaming app for international live TV channels and on-demand content.",
    bullets: [
      "Built high-performance VOD & media playback in Flutter",
      "Implemented live TV streaming with reliable channel switching",
    ],
    tags: ["Flutter", "Streaming", "Live TV", "VOD"],
    status: "archived",
    accent: "accent-rose",
  },
  {
    monogram: "IV",
    title: "IV Drip — Flutter + Unity Mobile App",
    description:
      "Real-time IV drip monitoring app — Flutter shell with embedded Unity for the camera pipeline. Vision was integrated tooling, not the focus of my role.",
    bullets: [
      "Engineered the Flutter ↔ Unity bridge and native camera handling",
      "Wired up an on-device pipeline using existing ONNX models",
      "Ported model inference to Unity / C# for performance",
      "Implemented drip-fall timing logic for chamber precision",
    ],
    tags: ["Flutter", "Unity", "C#", "iOS", "Android"],
    status: "live",
    accent: "accent",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile  ·  primary",
    accent: "accent",
    skills: [
      { name: "Flutter / Dart", level: 95 },
      { name: "Native SDK (iOS / Android)", level: 80 },
      { name: "Bloc / Cubit", level: 90 },
      { name: "Hive · Firebase", level: 85 },
      { name: "RESTful API", level: 90 },
    ],
  },
  {
    title: "Software Engineering",
    accent: "accent-teal",
    skills: [
      { name: "Docker", level: 85 },
      { name: "GitHub Actions", level: 85 },
      { name: "Python", level: 80 },
      { name: "Linux · SSH", level: 80 },
      { name: "Google Cloud Storage", level: 70 },
    ],
  },
  {
    title: "Principles",
    accent: "accent-warm",
    skills: [
      { name: "SOLID · DRY · KISS", level: 90 },
      { name: "Production problem-solving", level: 90 },
      { name: "Teamwork", level: 90 },
      { name: "Self-learning", level: 95 },
    ],
  },
  {
    title: "AI / Vision  ·  additional",
    accent: "accent-blue",
    skills: [
      { name: "LLM / RAG integration", level: 65 },
      { name: "ONNX runtime (integration)", level: 60 },
      { name: "CoreML · TFLite (integration)", level: 50 },
      { name: "Vision pipeline (integration)", level: 55 },
    ],
  },
];

export const education: Education[] = [
  {
    school: "Sejong University",
    program: "Business Administration",
    location: "Seoul, South Korea",
    period: "2024 — 2028",
    kind: "Undergraduate",
  },
  {
    school: "Cambridge International College",
    program: "Private high school",
    location: "Tashkent, Uzbekistan",
    period: "2021 — 2023",
    kind: "Diploma",
  },
  {
    school: "Najot Ta'lim",
    program: "Foundation & Flutter Bootcamp",
    location: "Tashkent, Uzbekistan",
    period: "2021 — 2022",
    kind: "Bootcamp",
  },
];

export const contacts: ContactLink[] = [
  {
    label: "Email",
    value: "me@saidaziz.uz",
    href: "mailto:me@saidaziz.uz",
    external: false,
    icon: "mail",
  },
  {
    label: "Phone",
    value: "+82 10-5199-1771",
    href: "tel:+821051991771",
    external: false,
    icon: "phone",
  },
  {
    label: "LinkedIn",
    value: "/in/saidazizkhon",
    href: "https://linkedin.com",
    external: true,
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "@saidazizkhon05",
    href: "https://github.com/saidazizkhon05",
    external: true,
    icon: "github",
  },
  {
    label: "LeetCode",
    value: "@saidazizkhon",
    href: "https://leetcode.com/u/saidazizkhon/",
    external: true,
    icon: "leetcode",
  },
];

export const accentVar: Record<AccentName, string> = {
  accent: "var(--color-accent)",
  "accent-blue": "var(--color-accent-blue)",
  "accent-teal": "var(--color-accent-teal)",
  "accent-warm": "var(--color-accent-warm)",
  "accent-rose": "var(--color-accent-rose)",
};
