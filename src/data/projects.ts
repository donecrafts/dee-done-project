import stepLockAppstoreArt from "@/assets/step-lock-appstore.jpg";
import instarecipeAppstoreArt from "@/assets/instarecipe-appstore.jpg";
import sauceAppstoreArt from "@/assets/sauce-appstore.jpg";
import spentzyAppstoreArt from "@/assets/spentzy-appstore.jpg";
import vojourAppstoreArt from "@/assets/vojour-appstore.jpg";

export type ProjectCategory = "All" | "SaaS" | "Web" | "Mobile";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techs: string[];
  category: ProjectCategory;
  live: string;
  /** Omit or leave empty to hide the GitHub button on project pages. */
  github?: string;
  features: string[];
  gallery: string[];
  /** Shown on home featured grid */
  featured?: boolean;
  /**
   * `contain` = square App Store artwork centered in 16:9 cards (no hard crop).
   * Default is full-bleed `cover`.
   */
  cardImageFit?: "cover" | "contain";
}

/** Portfolio grid / list — image classes inside 16:9 preview */
export function projectCardImageClass(project: Project): string {
  return project.cardImageFit === "contain"
    ? "h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.02]"
    : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105";
}

export function projectCardMediaBackdropClass(project: Project): string {
  return project.cardImageFit === "contain"
    ? "flex h-full w-full items-center justify-center bg-gradient-to-b from-[#08080b] via-[#111118] to-[#08080b]"
    : "";
}

export function projectDetailPreviewWrapClass(project: Project): string {
  return project.cardImageFit === "contain"
    ? "flex h-full w-full items-center justify-center bg-gradient-to-b from-[#08080b] via-[#111118] to-[#08080b]"
    : "";
}

export function projectDetailPreviewImgClass(project: Project): string {
  return project.cardImageFit === "contain"
    ? "h-full w-full max-h-full object-contain object-center p-6 sm:p-10"
    : "h-full w-full object-cover";
}

/** Optional ribbon above card preview (App Store, Product Hunt, …). */
export function projectLiveRibbon(project: Project): { title: string; subtitle?: string } | null {
  if (project.live.includes("apps.apple.com")) return { title: "App Store", subtitle: "iOS" };
  if (project.live.includes("producthunt.com")) return { title: "Product Hunt", subtitle: "Launch" };
  return null;
}

export const projects: Project[] = [
  {
    slug: "sauce-recipes-meal-planner",
    title: "Sauce: Recipes & Meal Planner",
    description:
      "AI-powered recipe manager for iPhone and iPad—import from links or photos, scale servings, cook step-by-step with timers, and keep groceries and collections in one place.",
    longDescription:
      "Sauce is an AI-powered recipe manager that helps you import, organize, and cook recipes from TikTok, Instagram, YouTube, blogs, or photos of cookbooks and handwritten notes. It extracts ingredients, steps, timers, and nutrition; supports custom recipes, serving-size scaling, cooking mode with notifications, grocery lists, collections, and (with premium) pantry tracking. Food & Drink on the App Store by Amari Thomas; iOS/iPadOS 18+. Listing: https://apps.apple.com/us/app/sauce-recipes-meal-planner/id6760685363",
    image: sauceAppstoreArt,
    cardImageFit: "contain",
    techs: ["Swift", "iOS", "SwiftUI"],
    category: "Mobile",
    live: "https://apps.apple.com/us/app/sauce-recipes-meal-planner/id6760685363",
    featured: true,
    features: [
      "Import recipes from URLs (social, blogs) with AI extraction",
      "Scan recipe photos—printed or handwritten—for structured cards",
      "Custom recipe builder with ingredients, steps, timing, and tags",
      "Serving-size adjustment with automatic ingredient scaling",
      "Cooking mode with step timers and background notifications",
      "Grocery list from recipes or manual items; collections and favorites",
      "Nutrition per serving; pantry tracking (premium)",
    ],
    gallery: [sauceAppstoreArt, sauceAppstoreArt],
  },
  {
    slug: "spentzy",
    title: "Spentzy",
    description:
      "Minimal expense tracker for iPhone—log spending in a few taps, see weekly and monthly patterns, and keep everything on your device with no accounts or cloud.",
    longDescription:
      "Spentzy focuses on habit-building simplicity: open the app, enter the amount and what it was for, and move on. You get instant clarity on spending patterns, weekly and monthly breakdowns, and auto-generated category insights without configuring categories or linking bank accounts. Data stays on-device—no cloud sync, no accounts, no servers. Finance app on the App Store by Max Goldenberg (Goldenmax Corp); iOS 15.1+. Listing: https://apps.apple.com/us/app/spentzy/id6758644577",
    image: spentzyAppstoreArt,
    cardImageFit: "contain",
    techs: ["Swift", "iOS", "SwiftUI"],
    category: "Mobile",
    live: "https://apps.apple.com/us/app/spentzy/id6758644577",
    featured: true,
    features: [
      "Three-tap expense logging—amount, note, done",
      "Weekly and monthly spending breakdowns",
      "Category insights generated automatically—no setup",
      "Analytics-friendly charts (e.g. six-month bar overview)",
      "On-device storage only—privacy-first, no sign-in",
      "Currency format options for international use",
    ],
    gallery: [spentzyAppstoreArt, spentzyAppstoreArt],
  },
  {
    slug: "instarecipe-ai-recipe-scanner",
    title: "InstaRecipe: AI Recipe Scanner",
    description:
      "Turn ingredients into recipes instantly—search, scan, and get personalized ideas with dietary filters and clear step-by-step instructions. Smart cooking for iPhone & iPad.",
    longDescription:
      "InstaRecipe helps you decide what to cook from what you already have: search or scan ingredients for personalized recipe ideas, smart dietary and preference filters, and step-by-step instructions. Save favorites, reduce food waste, and unlock Pro for unlimited searches, faster generation, and advanced filters. Food & Drink app by Jami Tanskanen; iOS/iPadOS 15.1+. Listing: https://apps.apple.com/us/app/instarecipe-ai-recipe-scanner/id6757855769",
    image: instarecipeAppstoreArt,
    cardImageFit: "contain",
    techs: ["Swift", "iOS", "SwiftUI"],
    category: "Mobile",
    live: "https://apps.apple.com/us/app/instarecipe-ai-recipe-scanner/id6757855769",
    features: [
      "Generate recipes from ingredients you already have",
      "Smart search with dietary and preference filters",
      "Step-by-step cooking instructions",
      "Save and revisit favorite recipes",
      "Reverse image recipe search (photo of a dish → matching recipes)",
      "Video fridge scan to detect ingredients for ideas",
    ],
    gallery: [instarecipeAppstoreArt, instarecipeAppstoreArt],
  },
  {
    slug: "step-lock",
    title: "Step Lock: Walk to Scroll",
    description:
      "Movement-first screen time for iPhone—earn unlock time by walking before social apps open. Built for people who want to move more and scroll less.",
    longDescription:
      "Step Lock blocks selected apps until you walk. Every 100 steps earns 10 minutes of screen time, you start each day with 30 free minutes, and hitting your daily step goal can unlock your phone for the rest of the day. It combines app blocking, customizable goals, streaks, and day/week/month analytics with distance and calorie context—so attention is earned, not endless. Published on the App Store by Covenant Studios, LLC (Sports, iOS 18+). Listing: https://apps.apple.com/us/app/step-lock-walk-to-scroll/id6757966505",
    image: stepLockAppstoreArt,
    cardImageFit: "contain",
    techs: ["iOS", "Swift", "HealthKit"],
    category: "Mobile",
    live: "https://apps.apple.com/us/app/step-lock-walk-to-scroll/id6757966505",
    features: [
      "App blocking for chosen apps before they open",
      "Walk to earn time (100 steps ≈ 10 minutes)",
      "Daily free minutes and step-goal unlock flow",
      "Customizable daily step goal and streak tracking",
      "Analytics at day, week, and month levels",
      "Distance and calorie burn tracking",
    ],
    gallery: [stepLockAppstoreArt, stepLockAppstoreArt],
  },
  {
    slug: "noskips",
    title: "NoSkips",
    description:
      "Music discovery web app—feed, shuffle, and profiles with Album of the Day and social following. A quiet riot against microwave music.",
    longDescription:
      "NoSkips is a focused listening experience: discover tracks and albums, follow what friends are into, and lean on curated surfaces like Album of the Day. Built by bloomy; live at noskips.co.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
    techs: ["Next.js", "React", "Web"],
    category: "Web",
    live: "https://www.noskips.co/",
    features: [
      "Feed and discovery flows for music",
      "Album of the Day spotlight",
      "Recent activity and following",
      "Shuffle and profile experiences",
      "Accessible, content-first layout",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    ],
  },
  {
    slug: "vojour-ai",
    title: "Vojour AI",
    description:
      "Voice-first wellness journal for iPhone—log workouts, meals, and reflections with voice, photos, or quick entries. No leaderboard, no comparison: just show up for yourself.",
    longDescription:
      "Vojour AI is a personal fitness and wellness journal built for real life: capture workouts, meals, milestones, and reflections without pressure to perform. Voice-first logging alongside photos and quick entries; Vojour adapts to how you live. Health & Fitness on the App Store by Avery Simms (iOS 15.1+). Listing: https://apps.apple.com/us/app/vojour-ai/id6757490773",
    image: vojourAppstoreArt,
    cardImageFit: "contain",
    techs: ["Swift", "iOS", "SwiftUI"],
    category: "Mobile",
    live: "https://apps.apple.com/us/app/vojour-ai/id6757490773",
    features: [
      "Voice, photo, and quick-entry logging for wellness",
      "Workouts, meals, reflections, and milestones in one journal",
      "Judgment-free companion framing—no leaderboards or comparison",
      "Designed for consistency over flashy metrics",
      "Premium tier (Vojour Premium) for extended use",
    ],
    gallery: [vojourAppstoreArt, vojourAppstoreArt],
  },
];

export const categories: ProjectCategory[] = ["All", "SaaS", "Web", "Mobile"];

/** Label for the primary outbound link (e.g. App Store vs generic site). */
export function projectLiveLinkLabel(url: string): string {
  if (url.includes("apps.apple.com")) return "App Store";
  if (url.includes("producthunt.com")) return "Product Hunt";
  return "Visit Site";
}
