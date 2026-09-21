import comfyuiSkillArt from "@/assets/comfyui-skill.png";
import gohighlevelSkillArt from "@/assets/gohighlevel-skill.png";
import dataDatabaseSkillArt from "@/assets/data-database-skill.png";
import cloudDeploymentSkillArt from "@/assets/cloud-deployment-skill.png";
import qrBarcodeSkillArt from "@/assets/qr-barcode-skill.jpg";
import loyaltyCardsSkillArt from "@/assets/skill-loyalty-cards.jpg";
import ecommerceSkillArt from "@/assets/skill-ecommerce.jpg";

export type HomeSkillCard = {
  title: string;
  description: string;
  tags?: string[];
  /** Background image — local asset or remote URL. */
  image: string;
};

export const homeSkillCards: HomeSkillCard[] = [
  {
    title: "Python & AI Engineering",
    description:
      "I use Python, FastAPI, and modern AI tools to build smart backends that power real products.",
    tags: ["Python", "FastAPI", "OpenAI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
  },
  {
    title: "QR Codes & Barcodes",
    description:
      "I design and ship scannable QR and barcode systems for gyms, loyalty wallets, signage, and product flows that look branded and still scan cleanly.",
    tags: ["QR Design", "Barcodes", "Wallet Passes", "Print"],
    image: qrBarcodeSkillArt,
  },
  {
    title: "Loyalty Card Creation",
    description:
      "I build digital loyalty and stamp cards for Apple Wallet and Google Wallet—QR signup, real-time stamps, pushes, and rewards that bring customers back.",
    tags: ["Apple Wallet", "Google Wallet", "Stamp Cards", "Rewards"],
    image: loyaltyCardsSkillArt,
  },
  {
    title: "E-Commerce Platforms",
    description:
      "I build and ship online stores and trade catalogues—product discovery, checkout, multi-branch stock, and growth-ready storefronts.",
    tags: ["E-Commerce", "Checkout", "Catalogues", "Retail"],
    image: ecommerceSkillArt,
  },
  {
    title: "ComfyUI & AI Automation",
    description:
      "I design ComfyUI workflows for image generation, batch jobs, and creative automation that can scale.",
    tags: ["ComfyUI", "AI Automation", "Workflows"],
    image: comfyuiSkillArt,
  },
  {
    title: "Machine Learning Integration",
    description:
      "I add machine learning and AI features into apps so they solve real problems for real users.",
    tags: ["scikit-learn", "LLMs", "Automation"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
  },
  {
    title: "Backend & API Development",
    description:
      "I build clean backends and APIs that connect apps, data, and AI services in a reliable way.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  },
  {
    title: "GoHighLevel",
    description:
      "I set up GoHighLevel CRM, funnels, and marketing automation so leads and clients stay in one place.",
    tags: ["GoHighLevel", "CRM", "Marketing Automation"],
    image: gohighlevelSkillArt,
  },
  {
    title: "Data & Database Architecture",
    description:
      "I design solid data storage with PostgreSQL, MongoDB, and Redis for apps that need to stay fast and reliable.",
    image: dataDatabaseSkillArt,
  },
  {
    title: "Mobile & Web Products",
    description:
      "I ship mobile apps and web platforms that are clean, easy to use, and ready for real people.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
  },
  {
    title: "Cloud & Deployment",
    description:
      "I deploy with Docker, CI/CD, AWS, and Vercel so products stay fast, secure, and easy to maintain.",
    image: cloudDeploymentSkillArt,
  },
];
