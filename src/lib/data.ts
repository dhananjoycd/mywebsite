import { prisma } from "@/lib/prisma";

export type ProfileData = {
  name: string;
  heroLabel: string;
  availabilityLabel: string;
  rotatingRoles: string[];
  resumeUrl: string;
  bio: string;
  responseTime: string;
  experienceStartYear: number;
  contactEmail: string;
  linkedinUrl: string;
  githubUrl: string;
};

export const DEFAULT_PROFILE: ProfileData = {
  name: "Dhananjoy Chandra Das",
  heroLabel: "Web Developer | Educator | Research Enthusiast",
  availabilityLabel: "Open to internships, jobs, and freelance work",
  rotatingRoles: [
    "Full Stack web Developer",
    "Next.js Developer",
    "React Developer",
  ],
  resumeUrl: "https://drive.google.com/uc?export=download&id=14wDMPhN_NincwEaMl_3B3ikaeJ2Z9Ir1",
  bio: "I am a B.Sc. (Hons.) student in Mathematics at the University of Rajshahi and a passionate Full-Stack Web Developer. I specialize in building modern, scalable web applications using technologies like Next.js, React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, and Tailwind CSS. In addition, I am actively engaged in research in biomathematics, applying mathematical modeling to real-world biological and health challenges.",
  responseTime: "24/7",
  experienceStartYear: 2023,
  contactEmail: "dhananjoychandradas@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/dhananjoycd",
  githubUrl: "https://github.com/dhananjoycd",
};

export const DEFAULT_SKILL_GROUPS = [
  {
    id: "sk-1",
    title: "Frontend",
    items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    orderIndex: 1,
  },
  {
    id: "sk-2",
    title: "Motion",
    items: ["Framer Motion", "GSAP", "Lenis", "Micro interactions"],
    orderIndex: 2,
  },
  {
    id: "sk-3",
    title: "Backend Ready",
    items: ["Nodemailer", "Route Handlers", "Server Actions", "API Design"],
    orderIndex: 3,
  },
  {
    id: "sk-4",
    title: "Workflow",
    items: ["Git & GitHub", "Responsive Design", "Performance", "Vercel"],
    orderIndex: 4,
  },
];

export const DEFAULT_EXPERIENCES = [
  {
    id: "exp-1",
    title: "Full-Stack Web Developer",
    period: "2022 - Present",
    text: "Building full-stack applications with Next.js, Node.js, PostgreSQL, and Prisma, with strong attention to scalability, clean UI, and production-ready structure.",
    highlights: [
      "Built projects such as FoodHub (E-commerce) and a University Club Management System",
      "Implemented authentication, Stripe payment integration, and role-based access control",
      "Focused on scalable architecture, maintainable code, and polished UI using Tailwind CSS and ShadCN",
    ],
    featured: true,
    orderIndex: 1,
  },
  {
    id: "exp-2",
    title: "Mathematics Instructor",
    period: "2023 - Present",
    text: "Teaching Mathematics at Anirban Coaching Center by turning complex concepts into clear, structured explanations for students.",
    highlights: [
      "Teach mathematics in a way that is approachable, organized, and concept-driven",
      "Help students strengthen analytical thinking and step-by-step problem-solving",
      "Built strong communication skills through regular classroom guidance and mentoring",
    ],
    featured: false,
    orderIndex: 2,
  },
  {
    id: "exp-3",
    title: "Research Enthusiast",
    period: "2025 - Present",
    text: "Exploring biomathematics through mathematical modeling, computational methods, and real-world disease spread analysis.",
    highlights: [
      "Working on disease modeling with SEIRS-based frameworks",
      "Applying differential equations and computational techniques to biological systems",
      "Studying the intersection of mathematics, biology, and practical health-related challenges",
    ],
    featured: false,
    orderIndex: 3,
  },
];

export const DEFAULT_EDUCATIONS = [
  {
    id: "edu-1",
    title: "B.Sc. (Hons.) in Mathematics",
    institution: "University of Rajshahi",
    period: "2022 - Present",
    summary:
      "Building a strong foundation in advanced mathematics while developing a research-oriented approach to real-world problem solving.",
    highlights: [
      "Focus on Real Analysis, Linear Algebra, Differential Equations, and Mathematical Modeling",
      "Conducting biomathematics research, including disease modeling and SEIRS-based frameworks",
      "Strengthening analytical thinking, statistics, and computational problem-solving skills",
    ],
    meta: "CGPA: pending / 4.00",
    orderIndex: 1,
  },
  {
    id: "edu-2",
    title: "Higher Secondary Certificate (Science)",
    institution: "Dhaka Imperial College",
    period: "2017 - 2019",
    summary:
      "Completed higher secondary studies with a strong quantitative base that shaped my interest in technology, logic, and structured reasoning.",
    highlights: [
      "Major subjects included Mathematics, Physics, and ICT",
      "Developed an early interest in programming and logical problem solving",
      "Built a strong base in science, abstraction, and quantitative reasoning",
    ],
    meta: "GPA: 5.00 / 5.00",
    orderIndex: 2,
  },
];

export const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    name: "FoodHub",
    slug: "foodhub",
    image: "/images/projects/foodhub.jpg",
    summary:
      "A full-stack meal ordering platform built for customers, food providers, and administrators.",
    highlights: [
      "Built with Next.js App Router, TypeScript, Node.js, PostgreSQL, and Prisma",
      "Implemented authentication, role-based access control, and Stripe payments",
      "Focused on production-ready architecture, clean UI, and real-world usability",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Cloudinary",
    ],
    tone: "Platform",
    liveClientUrl: "https://foodhub-client-mauve.vercel.app",
    liveServerUrl: null,
    githubClientUrl: "https://github.com/dhananjoycd/nextjs_Client",
    githubServerUrl: "https://github.com/dhananjoycd/prisma_express_server",
    featured: true,
    orderIndex: 1,
  },
  {
    id: "proj-2",
    name: "University Club Management System",
    slug: "university-club-management-system",
    image: "/images/projects/university-club-management-system.jpg",
    summary:
      "A role-based management system for university clubs, events, memberships, and payments.",
    highlights: [
      "Developed with React, Node.js, Express.js, MongoDB, and Tailwind CSS",
      "Included secure authentication, event management, and admin dashboard workflows",
      "Handled role-based permissions and payment operations for organizational efficiency",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Stripe",
    ],
    tone: "Management",
    liveClientUrl: "https://xyztechclub.vercel.app",
    liveServerUrl: null,
    githubClientUrl: "https://github.com/dhananjoycd/client_Club_Management",
    githubServerUrl: "https://github.com/dhananjoycd/server_UniversityClubManagement",
    featured: true,
    orderIndex: 2,
  },
  {
    id: "proj-3",
    name: "AmrKrishiBD",
    slug: "amrkrishibd",
    image: "/images/projects/amrkrishibd.jpg",
    summary:
      "A content platform focused on agriculture knowledge sharing and structured publishing.",
    highlights: [
      "Built with React, Node.js, Express.js, MongoDB, and Tailwind CSS",
      "Supports structured content management, responsive layouts, and efficient data handling",
      "Optimized for readability, scalability, and future content expansion",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Cloudinary",
    ],
    tone: "Content",
    liveClientUrl: "https://amarkrishi.vercel.app",
    liveServerUrl: null,
    githubClientUrl: "https://github.com/dhananjoycd/client_amrKrishiBD",
    githubServerUrl: "https://github.com/dhananjoycd/server_amrKrishiBD",
    featured: true,
    orderIndex: 3,
  },
];

export const DEFAULT_SERVICES = [
  {
    id: "srv-1",
    title: "Frontend Development",
    slug: "frontend-development",
    description:
      "Modern, responsive interfaces for landing pages, business websites, and product-focused web experiences.",
    points: [
      "Landing pages",
      "Business websites",
      "Dashboard UI",
      "Responsive redesign",
    ],
    price: "Starting from $80",
    orderIndex: 1,
    active: true,
  },
  {
    id: "srv-2",
    title: "Full Stack Web Apps",
    slug: "full-stack-web-apps",
    description:
      "Complete web application development with scalable frontend structure, backend logic, and deployment-ready setup.",
    points: [
      "Custom web apps",
      "Authentication",
      "API integration",
      "Database setup",
    ],
    price: "Starting from $150",
    orderIndex: 2,
    active: true,
  },
  {
    id: "srv-3",
    title: "Portfolio Websites",
    slug: "portfolio-websites",
    description:
      "Professional personal websites for students, job seekers, and creators who want a strong digital presence.",
    points: [
      "Personal branding",
      "Project showcase",
      "Resume integration",
      "Mobile-first UI",
    ],
    price: "Starting from $60",
    orderIndex: 3,
    active: true,
  },
  {
    id: "srv-4",
    title: "Bug Fix & UI Improvement",
    slug: "bug-fix-ui-improvement",
    description:
      "Targeted improvements for existing projects, including layout fixes, visual polish, and better usability.",
    points: [
      "Responsive fixes",
      "UI polish",
      "Performance cleanup",
      "Small feature updates",
    ],
    price: "Starting from $25",
    orderIndex: 4,
    active: true,
  },
];

export const DEFAULT_BLOG_POSTS = [
  {
    id: "blg-1",
    title: "How I Think About Responsive Portfolio Layouts",
    slug: "how-i-think-about-responsive-portfolio-layouts",
    excerpt:
      "A practical breakdown of spacing, content hierarchy, and scroll behavior for clean portfolio experiences.",
    content:
      "Responsive design is not simply about shrinking containers or rearranging grid columns. In this article, we explore the mental model of content hierarchy, spacing density, and user focus across viewport transitions.",
    category: "Design Systems",
    readTime: "4 min read",
    published: true,
    publishedAt: new Date("2026-01-15"),
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: "blg-2",
    title: "Building Motion That Supports UX Instead of Distracting From It",
    slug: "building-motion-that-supports-ux-instead-of-distracting-from-it",
    excerpt:
      "Using subtle transitions, hover states, and reveal timing to make interfaces feel polished and intentional.",
    content:
      "Animation should serve context, orientation, and subtle feedback. Over-animating slows down user navigation, whereas purposeful micro-interactions build delight and credibility.",
    category: "Frontend",
    readTime: "6 min read",
    published: true,
    publishedAt: new Date("2026-02-01"),
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-01"),
  },
  {
    id: "blg-3",
    title: "Keeping UI Clean While Planning for Future Backend Growth",
    slug: "keeping-ui-clean-while-planning-for-future-backend-growth",
    excerpt:
      "How to build lightweight portfolio architecture now without blocking future database, auth, or CMS expansion later.",
    content:
      "A solid architecture decouples UI presentational components from the persistence layer. By establishing data contracts early, you can effortlessly plug in databases and headless CMS layers without rewriting your frontend.",
    category: "Architecture",
    readTime: "6 min read",
    published: true,
    publishedAt: new Date("2026-02-20"),
    createdAt: new Date("2026-02-20"),
    updatedAt: new Date("2026-02-20"),
  },
];

export async function getProfileData(): Promise<ProfileData> {
  try {
    const settings = await prisma.siteSetting.findMany();
    if (!settings || settings.length === 0) return DEFAULT_PROFILE;

    const map = new Map<string, string>();
    for (const item of settings) {
      map.set(item.key, item.value);
    }

    let roles = DEFAULT_PROFILE.rotatingRoles;
    const rolesJson = map.get("rotatingRoles");
    if (rolesJson) {
      try {
        const parsed = JSON.parse(rolesJson);
        if (Array.isArray(parsed) && parsed.length > 0) roles = parsed;
      } catch {
        // fallback
      }
    }

    return {
      name: map.get("name") || DEFAULT_PROFILE.name,
      heroLabel: map.get("heroLabel") || DEFAULT_PROFILE.heroLabel,
      availabilityLabel: map.get("availabilityLabel") || DEFAULT_PROFILE.availabilityLabel,
      rotatingRoles: roles,
      resumeUrl: map.get("resumeUrl") || DEFAULT_PROFILE.resumeUrl,
      bio: map.get("bio") || DEFAULT_PROFILE.bio,
      responseTime: map.get("responseTime") || DEFAULT_PROFILE.responseTime,
      experienceStartYear: Number(map.get("experienceStartYear")) || DEFAULT_PROFILE.experienceStartYear,
      contactEmail: map.get("contactEmail") || DEFAULT_PROFILE.contactEmail,
      linkedinUrl: map.get("linkedinUrl") || DEFAULT_PROFILE.linkedinUrl,
      githubUrl: map.get("githubUrl") || DEFAULT_PROFILE.githubUrl,
    };
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    return DEFAULT_PROFILE;
  }
}

export async function getSkillGroups() {
  try {
    const groups = await prisma.skillGroup.findMany({
      orderBy: { orderIndex: "asc" },
    });
    if (!groups || groups.length === 0) return DEFAULT_SKILL_GROUPS;
    return groups;
  } catch (error) {
    console.error("Error fetching skill groups:", error);
    return DEFAULT_SKILL_GROUPS;
  }
}

export async function getExperiences() {
  try {
    const list = await prisma.experience.findMany({
      orderBy: { orderIndex: "asc" },
    });
    if (!list || list.length === 0) return DEFAULT_EXPERIENCES;
    return list;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return DEFAULT_EXPERIENCES;
  }
}

export async function getEducations() {
  try {
    const list = await prisma.education.findMany({
      orderBy: { orderIndex: "asc" },
    });
    if (!list || list.length === 0) return DEFAULT_EDUCATIONS;
    return list;
  } catch (error) {
    console.error("Error fetching educations:", error);
    return DEFAULT_EDUCATIONS;
  }
}

export async function getProjects() {
  try {
    const list = await prisma.project.findMany({
      orderBy: { orderIndex: "asc" },
    });
    if (!list || list.length === 0) return DEFAULT_PROJECTS;
    return list;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return DEFAULT_PROJECTS;
  }
}

export async function getActiveServices() {
  try {
    const list = await prisma.service.findMany({
      where: { active: true },
      orderBy: { orderIndex: "asc" },
    });
    if (!list || list.length === 0) return DEFAULT_SERVICES;
    return list;
  } catch (error) {
    console.error("Error fetching services:", error);
    return DEFAULT_SERVICES;
  }
}

export async function getPublishedBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (!posts || posts.length === 0) return DEFAULT_BLOG_POSTS;
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return DEFAULT_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!post) {
      return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) || null;
    }
    return post;
  } catch (error) {
    console.error(`Error fetching blog post by slug (${slug}):`, error);
    return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) || null;
  }
}
