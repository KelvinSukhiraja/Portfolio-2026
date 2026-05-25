import type {
  ContactLink,
  EducationItem,
  ExperienceItem,
  HeroStat,
  NavSection,
  Project,
} from "../types/portfolio";

export const NAV_SECTIONS: NavSection[] = ["projects", "experience", "contact"];

export const PROJECTS: Project[] = [
  {
    year: "2025",
    type: "fullstack",
    name: "Imago",
    desc: "Full-stack web application with modern UI and integrated backend workflows.",
    tags: ["React", "Vite", "Full-stack"],
    href: "https://imago-kappa.vercel.app/",
  },
  {
    year: "2025",
    type: "fullstack",
    name: "VoltX",
    desc: "Company website and platform built end-to-end with a focus on performance and clear product storytelling.",
    tags: ["React", "Vite", "Tailwind"],
    href: "https://voltx.co.id/",
  },
  {
    year: "2025",
    type: "portfolio",
    name: "Vincentech",
    desc: "Brand-forward portfolio site highlighting services, team, and client work.",
    tags: ["React", "Vite", "Tailwind"],
    href: "https://vincentech.id/",
  },
  {
    year: "2025",
    type: "fullstack",
    name: "Prodsys",
    desc: "Internal production-system platform for Charoen Pokphand — supplier and workflow management with secured APIs.",
    tags: ["React", "Vite", "OAuth", "TypeScript"],
    href: "https://prodsys.cp.co.id/",
  },
  {
    year: "2025",
    type: "fullstack",
    name: "E-Supplier Portal",
    desc: "Supplier-facing portal for procurement and supplier management at Prima Mart.",
    tags: ["React", "Full-stack", "OAuth"],
    href: "https://portal.primamart.co.id/login",
  },
  {
    year: "2025",
    type: "portfolio",
    name: "Holiday Tour Travel",
    desc: "Travel agency portfolio with destination showcases and booking-oriented layout.",
    tags: ["React", "Vercel", "Tailwind"],
    href: "https://holiday-tour-travel.vercel.app/",
  },
  {
    year: "2024",
    type: "mobile",
    name: "SMASS Android App Revamp",
    desc: "Frontend revamp of an Android application — refreshed UI flows and component structure.",
    tags: ["React Native", "TypeScript", "Mobile"],
    href: "#",
  },
  {
    year: "2024",
    type: "portfolio",
    name: "KEU — Kharisma Esa Unggul",
    desc: "University portfolio and information site for Kharisma Esa Unggul.",
    tags: ["React", "Sanity", "Tailwind"],
    href: "https://kharismaesaunggul.id/",
  },
  {
    year: "2024",
    type: "portfolio",
    name: "NIREN Creative",
    desc: "Creative agency portfolio with bold typography and project showcases.",
    tags: ["React", "Vite", "Tailwind"],
    href: "https://nirencreative.com/",
  },
  {
    year: "2024",
    type: "portfolio",
    name: "WheelWorks",
    desc: "Automotive services portfolio with service listings and brand identity.",
    tags: ["React", "Vite"],
    href: "https://wheelworks.id/",
  },
  {
    year: "2024",
    type: "web app",
    name: "StreamFlix",
    desc: "Streaming-style demo app with browse and detail views — UI-focused front-end project.",
    tags: ["React", "Netlify"],
    href: "https://joyful-rolypoly-88af95.netlify.app/",
  },
  {
    year: "2024",
    type: "e-commerce",
    name: "BVKE Brownies",
    desc: "E-commerce storefront for artisan brownies with product catalog and checkout flow.",
    tags: ["React", "E-commerce", "Tailwind"],
    href: "https://bvke.shop/",
  },
  {
    year: "2023",
    type: "portfolio",
    name: "The Boardroom Partnership",
    desc: "Professional services portfolio with case studies and partnership positioning.",
    tags: ["React", "Vite", "Tailwind"],
    href: "https://theboardroompartnership.com/",
  },
  {
    year: "2024",
    type: "mobile",
    name: "Stock Counting System",
    desc: "Android stock-counting application — frontend for warehouse inventory workflows.",
    tags: ["React Native", "TypeScript", "Android"],
    href: "#",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "Nov 2024 – present",
    role: "Programmer",
    company: "Charoen Pokphand Indonesia · Full-time · Jakarta",
    desc: "Design and develop internal web and mobile apps from requirements — UI/UX in Figma through end-to-end delivery. Own the tech stack, collaborate with backend developers, and work directly with users to ship intuitive, scalable solutions.",
    tags: [
      "React",
      "React Native",
      "Next.js",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "shadcn",
      "Figma",
      "OAuth",
    ],
  },
  {
    period: "Jan 2023 – present",
    role: "Web Developer",
    company: "Freelance · Remote",
    desc: "Partner with clients to shape web products from discovery through launch — usability testing, iteration, and delivery on modern stacks. Portfolio sites, e-commerce, and full-stack builds across industries.",
    tags: ["React", "Vite", "Next.js", "TypeScript", "Tailwind", "E-commerce"],
  },
  {
    period: "Jun 2022 – Jul 2023",
    role: "Coding Teacher",
    company: "胖喵喵 · Part-time · China",
    desc: "Taught foundational programming in English to native Chinese students during university — problem solving, logic, and beginner-friendly coding concepts.",
    tags: ["Teaching", "JavaScript", "Python"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    period: "2019 – 2023",
    degree: "Bachelor of Engineering — Computer Software Engineering",
    school: "Shandong University of Science and Technology",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Email",
    handle: "kelvinsukhiraja2712@gmail.com",
    href: "mailto:kelvinsukhiraja2712@gmail.com",
  },
  {
    label: "GitHub",
    handle: "@kelvinsukhiraja",
    href: "https://github.com/kelvinsukhiraja",
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/kelvinsukhiraja",
    href: "https://linkedin.com/in/kelvinsukhiraja",
  },
];

export const HERO_STATS: HeroStat[] = [
  { value: "React", label: "primary stack" },
  { value: "Full-stack", label: "web + mobile" },
  { value: "Figma → ship", label: "design to delivery" },
];

export const OWNER_TIMEZONE = "Asia/Jakarta" as const;
export const OWNER_TIMEZONE_OFFSET = "UTC+7" as const;

export const SITE = {
  email: "kelvinsukhiraja2712@gmail.com",
  copyright: "© 2026 · Kelvin Sukhiraja",
} as const;
