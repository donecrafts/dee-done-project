export type HomeSkillCard = {
  title: string;
  description: string;
  tags?: string[];
  /** Background image — Unsplash (replace with your own assets anytime). */
  image: string;
};

export const homeSkillCards: HomeSkillCard[] = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end application development with React, Node.js, TypeScript, and modern databases.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&q=80",
  },
  {
    title: "Frontend Development",
    description:
      "Beautiful, responsive UIs with pixel-perfect animations and seamless user experiences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
  },
  {
    title: "Backend Development",
    description:
      "Scalable RESTful and GraphQL APIs, microservices, and cloud-native architecture.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  },
  {
    title: "Database Architecture",
    description: "SQL, NoSQL, and data modeling. PostgreSQL, MongoDB, Redis, and data optimization.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&q=80",
  },
  {
    title: "DevOps & Deployment",
    description: "CI/CD pipelines, Docker, Kubernetes, and deployment on AWS, GCP, and Vercel.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals, caching strategies, lazy loading, and scalability engineering.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
];
