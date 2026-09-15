import comfyuiSkillArt from "@/assets/comfyui-skill.png";
import gohighlevelSkillArt from "@/assets/gohighlevel-skill.png";
import dataDatabaseSkillArt from "@/assets/data-database-skill.png";
import cloudDeploymentSkillArt from "@/assets/cloud-deployment-skill.png";

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
      "Building intelligent backends with Python, FastAPI, and modern AI APIs to power smart, production-ready applications.",
    tags: ["Python", "FastAPI", "OpenAI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
  },
  {
    title: "ComfyUI & AI Automation",
    description:
      "Designing node-based ComfyUI workflows for AI image generation, batch processing, and automated creative pipelines that scale from prototype to production.",
    tags: ["ComfyUI", "AI Automation", "Workflows"],
    image: comfyuiSkillArt,
  },
  {
    title: "Machine Learning Integration",
    description:
      "Embedding ML models and AI workflows into real products—from recipe extraction to automation and decision support.",
    tags: ["scikit-learn", "LLMs", "Automation"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
  },
  {
    title: "Backend & API Development",
    description:
      "Designing scalable REST and GraphQL APIs, microservices, and data pipelines that connect apps, users, and AI services.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  },
  {
    title: "GoHighLevel",
    description:
      "Building CRM, funnel, and marketing automation systems with GoHighLevel—connecting lead capture, email/SMS workflows, and client pipelines in one platform.",
    tags: ["GoHighLevel", "CRM", "Marketing Automation"],
    image: gohighlevelSkillArt,
  },
  {
    title: "Data & Database Architecture",
    description: "PostgreSQL, MongoDB, Redis, and structured data modeling for reliable storage, retrieval, and analytics.",
    image: dataDatabaseSkillArt,
  },
  {
    title: "Mobile & Web Products",
    description:
      "Shipping user-facing apps and web platforms—from iOS products like Sauce to modern React frontends backed by Python.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
  },
  {
    title: "Cloud & Deployment",
    description: "Docker, CI/CD, AWS, and Vercel deployments—keeping AI-powered systems fast, secure, and maintainable.",
    image: cloudDeploymentSkillArt,
  },
];
