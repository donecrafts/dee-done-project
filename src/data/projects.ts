import goremoveImg from "@/assets/goremove.png";
import doncraftsImg from "@/assets/doncrafts.png";

export type ProjectCategory = "All" | "SaaS";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techs: string[];
  category: ProjectCategory;
  live: string;
  github: string;
  features: string[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "go-remove",
    title: "GO-remove",
    description: "AI-powered background removal tool that removes image backgrounds instantly with pixel-perfect accuracy.",
    longDescription: "Built an AI-powered SaaS application that lets users remove image backgrounds in under 3 seconds. Features include HD quality output, multiple format support (PNG/JPG), transparent backgrounds, custom color/gradient backgrounds, 30-day image history, and a freemium pricing model with Pro and Enterprise tiers.",
    image: goremoveImg,
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "AI/ML"],
    category: "SaaS",
    live: "https://goremove.vercel.app/",
    github: "#",
    features: ["AI background removal in <3s", "99% accuracy with ML models", "HD quality output", "PNG transparency support", "Custom color/gradient backgrounds", "30-day image history & storage", "Freemium pricing model", "Privacy-first processing"],
    gallery: [goremoveImg],
  },
  {
    slug: "doncrafts",
    title: "DONECRAFTS",
    description: "AI-powered background removal SaaS that lets users upload images and get clean, transparent backgrounds in seconds.",
    longDescription: "Built a full-featured AI-powered background removal SaaS platform. Users can upload images and instantly get transparent backgrounds with pixel-perfect accuracy. Features include lightning-fast processing under 3 seconds, HD exports, batch processing for Pro users, smart AI that handles hair, fur, and transparent objects, freemium pricing with Free and Pro tiers, and instant watermark-free downloads.",
    image: doncraftsImg,
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "AI/ML"],
    category: "SaaS",
    live: "https://doncrafts.vercel.app/",
    github: "#",
    features: ["AI background removal in <3s", "Pixel-perfect edge detection", "HD quality exports", "Batch processing (Pro)", "Smart AI for complex subjects", "Freemium pricing model", "Instant watermark-free downloads", "7-day to full image history"],
    gallery: [doncraftsImg],
  },
];

export const categories: ProjectCategory[] = ["All", "SaaS"];
