import stepLockAppstoreArt from "@/assets/step-lock-appstore.jpg";
import instarecipeAppstoreArt from "@/assets/instarecipe-appstore.jpg";
import sauceAppstoreArt from "@/assets/sauce-appstore.jpg";
import spentzyAppstoreArt from "@/assets/spentzy-appstore.jpg";
import vojourAppstoreArt from "@/assets/vojour-appstore.jpg";
import bluffingMonkeysArt from "@/assets/bluffing-monkeys.jpg";
import pokerbrosAppstoreArt from "@/assets/pokerbros-appstore.jpg";
import comfyuiWorkflowArt from "@/assets/comfyui-skill.png";
import artvizualGymQrArt from "@/assets/artvizual-gym-qr.jpg";
import artvizualGymQrArt2 from "@/assets/artvizual-gym-qr-2.jpg";
import artvizualGymQrArt3 from "@/assets/artvizual-gym-qr-3.jpg";
import gpassLoyaltyArt from "@/assets/gpass-loyalty.jpg";
import reloopCardsArt from "@/assets/reloop-cards.png";
import reloopFlyerArt from "@/assets/reloop-flyer.png";
import reloopCafeArt from "@/assets/reloop-cafe.jpg";
import bluebirdRewardsArt from "@/assets/project-bluebird-rewards.jpg";
import gustoArt from "@/assets/project-gusto.jpg";
import francoMancaArt from "@/assets/project-franco-manca.jpg";
import gymhqArt from "@/assets/project-gymhq.jpg";
import fithqArt from "@/assets/project-fithq.jpg";
import msacArt from "@/assets/project-msac.jpg";
import kartleArt from "@/assets/project-kartle.jpg";
import egenActiveArt from "@/assets/project-egen-active.jpg";
import kygaArt from "@/assets/project-kyga.jpg";
import mkmArt from "@/assets/project-mkm.jpg";
import materialsMarketArt from "@/assets/project-materials-market.jpg";

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
    slug: "artvizual-gym-fitness-qr",
    title: "Artvizual — Branded QR for Gyms",
    description:
      "Premium fitness QR code artwork for gyms, trainers, and studios—custom designs that scan cleanly and look like they belong on gym floors, not generic black squares.",
    longDescription:
      "Artvizual's branded fitness QR code pairs a scannable QR pattern with dumbbells, weight plates, and strength-equipment detail so gyms and studios get a marketing tool that fits their brand. Use it for class bookings, Google reviews, free trials, memberships, websites, training apps, and social growth. Built for print and digital: reception desks, mirrors, lockers, class boards, flyers, and online campaigns. Live product: https://artvizual.com/branded-qr-code-for-gyms-and-fitness-studios",
    image: artvizualGymQrArt,
    techs: ["Branding", "QR Design", "Print", "Web"],
    category: "Web",
    live: "https://artvizual.com/branded-qr-code-for-gyms-and-fitness-studios",
    featured: true,
    features: [
      "Fitness-themed QR artwork with dumbbells, plates, and strength details",
      "Links to bookings, reviews, trials, memberships, websites, or apps",
      "Designed to scan while looking like part of the gym brand",
      "High-resolution files for print and digital marketing",
      "Fits gyms, CrossFit boxes, trainers, yoga/Pilates, and athletic clubs",
      "Works on signage, mirrors, lockers, flyers, and social graphics",
    ],
    gallery: [artvizualGymQrArt, artvizualGymQrArt2, artvizualGymQrArt3],
  },
  {
    slug: "gpass-loyalty",
    title: "GPASS — Loyalty, Simple",
    description:
      "Digital loyalty cards for Apple Wallet and Google Wallet—no app download, no login friction. Scan a QR, add to Wallet, and stamp rewards in real time.",
    longDescription:
      "GPASS replaces paper stamp cards with wallet passes for cafés, salons, restaurants, and local shops. Customers scan a QR at the counter, enter a name, and tap Add to Wallet in about 30 seconds. Merchants punch stamps from a web app; cards update live, with geo lock-screen pushes, custom branding, and analytics. Live product: https://www.gpass.es/",
    image: gpassLoyaltyArt,
    techs: ["SaaS", "Apple Wallet", "Google Wallet", "QR", "Web"],
    category: "SaaS",
    live: "https://www.gpass.es/",
    featured: true,
    features: [
      "QR signup into Apple Wallet and Google Wallet—no customer app",
      "Real-time stamps and reward redemptions from a web merchant tool",
      "Fully branded passes: colors, logo, strip, and reward copy",
      "Free geo-aware lock-screen push notifications",
      "Built-in analytics for visits, redemptions, and cohorts",
      "Fits coffee shops, salons, restaurants, bakeries, fitness, and retail",
    ],
    gallery: [gpassLoyaltyArt, gpassLoyaltyArt],
  },
  {
    slug: "reloop-cards",
    title: "reloop — Digital Stamp Cards",
    description:
      "Digital stamp cards for Apple & Google Wallet—turn first-time guests into regulars with QR signup, live stamps, push reminders, and AI flyer generation.",
    longDescription:
      "reloop (reloop.cards) is a digital stempelkarte system for cafés, salons, food trucks, and local businesses. Guests scan a QR and save the card to Apple Wallet or Google Wallet—no native customer app. Merchants stamp in seconds, send wallet pushes and location reminders, manage multi-location programs, and generate print-ready AI flyers with logo and QR. EU-hosted (Frankfurt). Live product: https://www.reloop.cards/",
    image: reloopCardsArt,
    cardImageFit: "contain",
    techs: ["SaaS", "Apple Wallet", "Google Wallet", "QR", "AI Flyer"],
    category: "SaaS",
    live: "https://www.reloop.cards/",
    featured: true,
    features: [
      "Stamp cards live in Apple Wallet and Google Wallet—no guest app",
      "QR scan to join; staff stamp with QR or NFC in seconds",
      "Push notifications and near-store location reminders",
      "Multi-location dashboard, campaigns, and double-stamp promos",
      "AI flyer generator for print-ready table stands with real QR",
      "Plans from free trial to multi-site Premium / Enterprise",
    ],
    gallery: [reloopCardsArt, reloopFlyerArt, reloopCafeArt],
  },
  {
    slug: "bluebird-evolv-rewards",
    title: "Bluebird — Evolv Rewards",
    description:
      "Restaurant loyalty for Bluebird Chelsea and The Evolv Collection—earn 10% back in points, birthday gifts, and redeem dining rewards across UK sister restaurants.",
    longDescription:
      "Evolv Rewards is the loyalty programme for Bluebird Chelsea and The Evolv Collection UK restaurants. Members join via the Evolv Rewards app, earn 10% back in points when dining, unlock birthday gifts and exclusive offers, and redeem for dining, experiences, or gift cards. Live: https://bluebird-restaurant.co.uk/rewards/",
    image: bluebirdRewardsArt,
    techs: ["Loyalty", "Mobile App", "Restaurants", "Rewards"],
    category: "SaaS",
    live: "https://bluebird-restaurant.co.uk/rewards/",
    featured: true,
    features: [
      "10% back in points across Bluebird and UK sister restaurants",
      "Digital loyalty membership via iOS and Android app",
      "Birthday gifts, double points days, and member-only offers",
      "Redeem points for dining, experiences, and gift cards",
      "Works for walk-ins, bookings, and group / private events",
    ],
    gallery: [bluebirdRewardsArt],
  },
  {
    slug: "gusto-italian",
    title: "Gusto Italian",
    description:
      "Multi-location Italian restaurant brand across the UK—menus, bars, private dining, and Gold Club loyalty for regular guests.",
    longDescription:
      "Gusto Italian is a collection of Italian restaurants and bars across Birmingham, Manchester, Liverpool, Nottingham, Oxford, Knutsford, and Cheadle Hulme. The site covers menus, bookings, events, bottomless brunch, private dining, and Gold Club loyalty. Live: https://gustorestaurants.com/",
    image: gustoArt,
    techs: ["Hospitality", "Loyalty", "Multi-location", "Web"],
    category: "Web",
    live: "https://gustorestaurants.com/",
    featured: true,
    features: [
      "Seven UK restaurant locations with local menus and events",
      "Gold Club loyalty for returning guests",
      "Private dining, supper club, and festive booking flows",
      "Bars, lounges, and experience-led dining",
    ],
    gallery: [gustoArt],
  },
  {
    slug: "franco-manca",
    title: "Franco Manca",
    description:
      "Neighbourhood sourdough pizzerias with loyalty and rewards—book tables, order, and join Friends of Franco Manca across the UK.",
    longDescription:
      "Franco Manca serves Neapolitan-style sourdough pizza from neighbourhood pizzerias across the UK. The digital experience covers store finder, menu, bookings, delivery partners, student offers, gift cards, and a loyalty and rewards programme. Live: https://www.francomanca.co.uk/",
    image: francoMancaArt,
    techs: ["Hospitality", "Loyalty", "Multi-location", "Web"],
    category: "Web",
    live: "https://www.francomanca.co.uk/",
    featured: true,
    features: [
      "National pizzeria finder with bookings and walk-ins",
      "Loyalty and rewards plus Friends of Franco Manca perks",
      "Order and collect plus major delivery partners",
      "Student offers, gift cards, and event / group bookings",
    ],
    gallery: [francoMancaArt],
  },
  {
    slug: "gymhq",
    title: "GymHQ",
    description:
      "Membership management for Nigerian gyms—members check in with QR, track streaks and workouts, while owners run the gym from one dashboard.",
    longDescription:
      "GymHQ is a membership platform for gyms in Nigeria. Members find their gym, check in with a QR code, track workouts and streaks, and manage membership on their phone. Owners get member management, live check-ins, payments, and announcements in one dashboard. Live: https://www.gymhq.ng/",
    image: gymhqArt,
    techs: ["SaaS", "QR Check-in", "Mobile", "Gym Ops"],
    category: "SaaS",
    live: "https://www.gymhq.ng/",
    featured: true,
    features: [
      "QR check-in at the front desk—no paper logs",
      "Member app for workouts, streaks, and renewals",
      "Owner dashboard for members, payments, and announcements",
      "Built for Nigerian gym operations",
    ],
    gallery: [gymhqArt],
  },
  {
    slug: "fithq",
    title: "FitHQ",
    description:
      "Gym operations platform—members, QR check-ins, payments, classes, and a branded member app in one place.",
    longDescription:
      "FitHQ (by MOAA TECH) helps gyms track members, memberships, check-ins, classes, and payments. Staff scan member QR codes, auto-match bank/card/cash payments, run SMS/email communication, and offer a branded member app. Pricing scales with active members. Live: https://fithq.ng/",
    image: fithqArt,
    techs: ["SaaS", "QR Check-in", "Payments", "Gym Ops"],
    category: "SaaS",
    live: "https://fithq.ng/",
    featured: true,
    features: [
      "QR and manual check-ins with live member status",
      "Bank transfer, card, and cash payments with audit trail",
      "Branded member app for bookings and membership QR",
      "Classes, waitlists, renewals, and retention insights",
    ],
    gallery: [fithqArt],
  },
  {
    slug: "mysmartaccesscard",
    title: "mySmartAccessCard (mSAC)",
    description:
      "QR and NFC identity cards for attendance—schools, gyms, hospitals, and businesses across Nigeria, without biometric hardware.",
    longDescription:
      "mySmartAccessCard replaces paper registers and expensive biometric terminals with digital QR and NFC identity cards. Institutions verify attendance in under a second, work offline with queued taps, and use the same cards for event gate entry. Built for schools, gyms, clinics, businesses, and churches in Nigeria and Africa. Live: https://mysmartaccesscard.com/",
    image: msacArt,
    cardImageFit: "contain",
    techs: ["QR", "NFC", "Attendance", "SaaS"],
    category: "SaaS",
    live: "https://mysmartaccesscard.com/",
    featured: true,
    features: [
      "QR and NFC verification in under one second",
      "No biometric hardware—any smartphone can scan",
      "Offline queue for hundreds of taps",
      "Built for schools, gyms, hospitals, businesses, and events",
    ],
    gallery: [msacArt],
  },
  {
    slug: "kartle",
    title: "KARTLE — Digital Loyalty Cards",
    description:
      "Digital loyalty cards for Apple and Google Wallet—stamps, push deals, nearby reminders, and a merchant scanner app.",
    longDescription:
      "KARTLE helps local businesses double retention with wallet loyalty cards. Design branded stamp cards, share a print-ready flyer or link, and stamp customers with the KARTLE scanner app. Customers need no app—cards live in Apple Wallet and Google Wallet with push offers and geo reminders. Live: https://www.kartle.io/en",
    image: kartleArt,
    techs: ["SaaS", "Apple Wallet", "Google Wallet", "Loyalty"],
    category: "SaaS",
    live: "https://www.kartle.io/en",
    featured: true,
    features: [
      "Wallet loyalty cards with no customer app download",
      "Merchant scanner app (online and offline stamping)",
      "Push deals, nearby reminders, and product reviews",
      "Multi-language cards and unlimited customers on all plans",
    ],
    gallery: [kartleArt],
  },
  {
    slug: "egen-active",
    title: "Egen Active",
    description:
      "One fitness wallet across partner facilities—book lanes and courts, check in with QR, and move with community groups.",
    longDescription:
      "Egen Active is a Lagos-built fitness platform: one QR membership card across partner pools, clubs, and gyms. Individuals book sessions, check in, track activity, and join community groups. Organizations fund team fitness from a single wallet with exportable visit reports. Live: https://egenactive.com/",
    image: egenActiveArt,
    techs: ["Mobile", "QR", "Fitness", "Community"],
    category: "Mobile",
    live: "https://egenactive.com/",
    featured: true,
    features: [
      "One QR card across partner facilities",
      "Fast bookings for lanes, courts, and classes",
      "Community feed, groups, and events",
      "Org wallets with single invoicing for teams",
    ],
    gallery: [egenActiveArt],
  },
  {
    slug: "kyga-digital",
    title: "KYGA Digital",
    description:
      "Birmingham digital marketing and web agency—websites, apps, SEO, and e-commerce growth campaigns for UK brands.",
    longDescription:
      "KYGA Digital is a Birmingham-based agency building websites, mobile apps, loyalty schemes, and performance marketing. Their work spans WordPress, bespoke web apps, SEO, PPC, and brand sites for clients from talent to construction. Live: https://kyga.co.uk/",
    image: kygaArt,
    techs: ["Web", "E-Commerce", "SEO", "Apps"],
    category: "Web",
    live: "https://kyga.co.uk/",
    featured: true,
    features: [
      "Website and web application development",
      "Mobile app design and loyalty product builds",
      "SEO, PPC, and conversion-focused campaigns",
      "E-commerce and lead-generation platforms",
    ],
    gallery: [kygaArt],
  },
  {
    slug: "mkm-building-supplies",
    title: "MKM Building Supplies",
    description:
      "National builders’ merchant e-commerce—branch stock, trade accounts, click and collect, and free local delivery across 140+ UK branches.",
    longDescription:
      "MKM is a major UK building supplies retailer with online catalogue, branch selection, trade discounts, click and collect, and free local delivery. Customers shop timber, cement, kitchens, bathrooms, tools, and more with local pricing by branch. Live: https://mkm.com/",
    image: mkmArt,
    techs: ["E-Commerce", "Retail", "Trade", "Web"],
    category: "Web",
    live: "https://mkm.com/",
    featured: true,
    features: [
      "Multi-branch e-commerce with local stock and pricing",
      "Trade accounts, discounts, and credit options",
      "Click and collect plus free local delivery",
      "Full building materials catalogue online",
    ],
    gallery: [mkmArt],
  },
  {
    slug: "materials-market",
    title: "Materials Market",
    description:
      "Building materials e-commerce platform—compare and buy construction products online for trade and projects.",
    longDescription:
      "Materials Market is an online marketplace for building and construction materials. Buyers browse categories, compare products, and order materials for delivery—built as a modern e-commerce experience for the trade and DIY. Live: https://materialsmarket.com/",
    image: materialsMarketArt,
    techs: ["E-Commerce", "Marketplace", "Construction", "Web"],
    category: "Web",
    live: "https://materialsmarket.com/",
    featured: true,
    features: [
      "Online catalogue of building and construction materials",
      "E-commerce checkout and delivery flows",
      "Built for trade buyers and project procurement",
      "Product discovery across major materials categories",
    ],
    gallery: [materialsMarketArt],
  },
  {
    slug: "pokerbros-your-poker-app",
    title: "PokerBROS - Your Poker App",
    description:
      "Social poker app for iPhone and iPad play Texas Hold'em, Omaha, Short Deck, and more with friends in private clubs, MTTs, Sit & Gos, and customizable tables.",
    longDescription:
      "PokerBROS lets players of every level enjoy poker online with friends anytime. Create private clubs and poker rooms, run tournaments, join the global lobby, and choose from NLH, PLO, fixed-limit formats, Short Deck, and Open Face Chinese. Features include Kill Pot modes, in-table chat, avatar emotes, certified RNG, and 24/7 support. Social Networking on the App Store by Thinklean Limited (iOS 9+). Listing: https://apps.apple.com/gb/app/pokerbros-your-poker-app/id1463376042",
    image: pokerbrosAppstoreArt,
    cardImageFit: "contain",
    techs: ["iOS", "iPad", "Mobile"],
    category: "Mobile",
    live: "https://apps.apple.com/gb/app/pokerbros-your-poker-app/id1463376042",
    featured: true,
    features: [
      "No Limit & Fixed Limit Texas Hold'em, PLO, Short Deck, and OFC",
      "Private clubs with custom tables, rules, and invited players",
      "Multi Table Tournaments and Sit & Go formats",
      "Kill Pot option for fixed-limit games",
      "In-table chat, emotes, and customizable avatars and themes",
      "Certified RNG with audited game integrity",
    ],
    gallery: [pokerbrosAppstoreArt, pokerbrosAppstoreArt],
  },
  {
    slug: "comfy-ui-workflow",
    title: "Wan 2.2 LoRA Training Pipeline",
    description:
      "End-to-end ComfyUI-ready pipeline for training Wan 2.2 dual-expert LoRAs—dataset prep scripts, RunPod configs, and revision fine-tuning for consistent AI character generation.",
    longDescription:
      "Open-source workflow for training a Wan 2.2 dual-expert LoRA (high/low noise) for AI influencer and character consistency, built with Ostris AI Toolkit on RunPod. Includes Python dataset tools (merge sources, split turnaround sheets, crop overlays, captions), RunPod deployment steps, YAML training configs for v1 and revision passes, and recommended ComfyUI settings for loading both safetensors experts. Code and configs are MIT; client training data and weights stay private. Repository: https://github.com/donecrafts/comfy-ui-workflow",
    image: comfyuiWorkflowArt,
    cardImageFit: "contain",
    techs: ["ComfyUI", "Python", "Wan 2.2", "LoRA", "RunPod"],
    category: "Web",
    live: "https://github.com/donecrafts/comfy-ui-workflow",
    github: "https://github.com/donecrafts/comfy-ui-workflow",
    featured: true,
    features: [
      "Dataset prep: merge sources, split sheets, crop overlays, auto-captions",
      "Wan 2.2 T2V A14B dual-expert LoRA training (rank 32, flow-match)",
      "RunPod A40 configs with step-by-step deployment guide",
      "Revision fine-tune pass from v1 weights for tighter character consistency",
      "ComfyUI settings for high/low noise safetensors (0.75–0.85 strength)",
      "MIT-licensed scripts and YAML configs on GitHub",
    ],
    gallery: [comfyuiWorkflowArt, comfyuiWorkflowArt],
  },
  {
    slug: "spentzy",
    title: "Spentzy",
    description:
      "Minimal expense tracker for iPhone log spending in a few taps, see weekly and monthly patterns, and keep everything on your device with no accounts or cloud.",
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
    slug: "sauce-recipes-meal-planner",
    title: "Sauce: Recipes & Meal Planner",
    description:
      "AI-powered recipe manager for iPhone and iPad import from links or photos, scale servings, cook step-by-step with timers, and keep groceries and collections in one place.",
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
    slug: "bluffing-monkeys",
    title: "Bluffing Monkeys",
    description:
      "Discovery platform for private online poker clubs on ClubGG and PokerBros browse vetted clubs by stake, match via quiz, and get seated through 24/7 Telegram support.",
    longDescription:
      "Bluffing Monkeys helps players find the right private online poker club without forms or waiting rooms. The site surfaces thirteen active clubs from micro stakes to high-stakes action, a club-matching quiz, free player tools, strategy blog content, and human support on Telegram—usually seated within minutes. Live at bluffingmonkeys.com.",
    image: bluffingMonkeysArt,
    techs: ["WordPress", "JavaScript", "SEO", "Web"],
    category: "Web",
    live: "https://bluffingmonkeys.com/",
    featured: true,
    features: [
      "Browse 13+ vetted poker clubs with stake and game filters",
      "60-second club-matching quiz for personalized recommendations",
      "Telegram-first onboarding—message support and get seated fast",
      "Free player toolbox, blog, and trust & safety content",
      "Live club carousel, promotions, and player testimonials",
      "24/7 human support channel for club access and questions",
    ],
    gallery: [bluffingMonkeysArt, bluffingMonkeysArt],
  },
  {
    slug: "instarecipe-ai-recipe-scanner",
    title: "InstaRecipe: AI Recipe Scanner",
    description:
      "Turn ingredients into recipes instantly search, scan, and get personalized ideas with dietary filters and clear step by step instructions. Smart cooking for iPhone & iPad.",
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
      "Movement-first screen time for iPhone earn unlock time by walking before social apps open. Built for people who want to move more and scroll less.",
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
      "Music discovery web app feed, shuffle, and profiles with Album of the Day and social following. A quiet riot against microwave music.",
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
  if (url.includes("github.com")) return "View on GitHub";
  return "Visit Site";
}

/** Hide duplicate GitHub CTA when live and github point to the same repo. */
export function projectGithubLink(project: Project): string | null {
  if (!project.github) return null;
  if (project.github === project.live) return null;
  return project.github;
}
