import project1Img from "@/assets/project-1.jpg";
import project2Img from "@/assets/project-2.jpg";
import project3Img from "@/assets/project-3.jpg";
import goremoveImg from "@/assets/goremove.png";
import doncraftsImg from "@/assets/doncrafts.png";

export type ProjectCategory = "All" | "Web Apps" | "Mobile Apps" | "SaaS" | "Dashboards";

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
    gallery: [goremoveImg, project1Img, project2Img],
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
    gallery: [doncraftsImg, project1Img, project2Img],
  },


  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce dashboard with real-time analytics, inventory management, and payment processing.",
    longDescription: "Built a comprehensive e-commerce platform from the ground up featuring real-time analytics dashboards, automated inventory management, Stripe payment processing, and a fully responsive storefront. The platform handles thousands of concurrent users with optimized database queries and Redis caching.",
    image: project1Img,
    techs: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web Apps",
    live: "#",
    github: "#",
    features: ["Real-time analytics dashboard", "Inventory management system", "Stripe payment integration", "Order tracking & notifications", "Admin panel with role-based access", "SEO-optimized storefront"],
    gallery: [project1Img, project2Img, project3Img],
  },
  {
    slug: "real-time-chat-app",
    title: "Real-Time Chat App",
    description: "End-to-end encrypted messaging platform with group chats, file sharing, and video calling capabilities.",
    longDescription: "Developed a scalable real-time messaging platform with WebSocket-based communication, end-to-end encryption, and peer-to-peer video calling using WebRTC. Features include group chats, file sharing, message reactions, and push notifications across web and mobile.",
    image: project2Img,
    techs: ["Next.js", "WebSocket", "PostgreSQL", "Redis"],
    category: "SaaS",
    live: "#",
    github: "#",
    features: ["End-to-end encryption", "Group chat with admin controls", "File & media sharing", "Video & voice calling", "Push notifications", "Message search & history"],
    gallery: [project2Img, project1Img, project3Img],
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Comprehensive business analytics platform with customizable widgets, real-time data streams, and AI insights.",
    longDescription: "Created an enterprise-grade analytics dashboard that processes millions of data points in real-time. Features customizable widget layouts, AI-powered insights, automated reporting, and integration with multiple data sources including REST APIs, databases, and streaming platforms.",
    image: project3Img,
    techs: ["TypeScript", "D3.js", "Python", "AWS"],
    category: "Dashboards",
    live: "#",
    github: "#",
    features: ["Customizable widget layouts", "Real-time data streaming", "AI-powered insights", "Automated PDF reports", "Multi-source data integration", "Role-based dashboards"],
    gallery: [project3Img, project1Img, project2Img],
  },
  {
    slug: "fitness-tracker-app",
    title: "Fitness Tracker App",
    description: "Cross-platform mobile fitness application with workout tracking, meal planning, and progress analytics.",
    longDescription: "Built a cross-platform fitness application that helps users track workouts, plan meals, and monitor progress with detailed analytics. Includes a social features for sharing achievements and competing with friends.",
    image: project1Img,
    techs: ["React Native", "Firebase", "Node.js", "TensorFlow"],
    category: "Mobile Apps",
    live: "#",
    github: "#",
    features: ["Workout tracking & logging", "Meal planning with macros", "Progress charts & analytics", "Social sharing & leaderboards", "AI exercise recommendations", "Apple Health & Google Fit sync"],
    gallery: [project1Img, project2Img, project3Img],
  },
  {
    slug: "saas-project-manager",
    title: "SaaS Project Manager",
    description: "Team collaboration and project management tool with Kanban boards, time tracking, and automated workflows.",
    longDescription: "Designed and developed a SaaS project management tool featuring Kanban boards, Gantt charts, time tracking, and automated workflow triggers. Built for teams of all sizes with real-time collaboration and integrations with popular tools.",
    image: project2Img,
    techs: ["React", "GraphQL", "PostgreSQL", "Docker"],
    category: "SaaS",
    live: "#",
    github: "#",
    features: ["Kanban & Gantt views", "Time tracking & reporting", "Automated workflows", "Team collaboration", "Third-party integrations", "Custom fields & templates"],
    gallery: [project2Img, project3Img, project1Img],
  },
  {
    slug: "iot-monitoring-dashboard",
    title: "IoT Monitoring Dashboard",
    description: "Real-time IoT device monitoring dashboard with alerts, device management, and data visualization.",
    longDescription: "Created an IoT monitoring platform that handles thousands of connected devices with real-time data visualization, automated alerting, and predictive maintenance capabilities using machine learning models.",
    image: project3Img,
    techs: ["Vue.js", "MQTT", "InfluxDB", "Kubernetes"],
    category: "Dashboards",
    live: "#",
    github: "#",
    features: ["Real-time device monitoring", "Automated alerting system", "Data visualization & charts", "Device management portal", "Predictive maintenance AI", "API gateway & webhooks"],
    gallery: [project3Img, project2Img, project1Img],
  },
];

export const categories: ProjectCategory[] = ["All", "Web Apps", "Mobile Apps", "SaaS", "Dashboards"];
