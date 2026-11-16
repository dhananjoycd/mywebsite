import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const profileSettings = [
  { key: "name", value: "Dhananjoy Chandra Das" },
  { key: "heroLabel", value: "Web Developer | Educator | Research Enthusiast" },
  { key: "availabilityLabel", value: "Open to internships, jobs, and freelance work" },
  {
    key: "rotatingRoles",
    value: JSON.stringify([
      "Full Stack web Developer",
      "Next.js Developer",
      "React Developer",
    ]),
  },
  {
    key: "resumeUrl",
    value: "https://drive.google.com/uc?export=download&id=14wDMPhN_NincwEaMl_3B3ikaeJ2Z9Ir1",
  },
  {
    key: "bio",
    value:
      "I am a B.Sc. (Hons.) student in Mathematics at the University of Rajshahi and a passionate Full-Stack Web Developer. I specialize in building modern, scalable web applications using technologies like Next.js, React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, and Tailwind CSS. In addition, I am actively engaged in research in biomathematics, applying mathematical modeling to real-world biological and health challenges.",
  },
  { key: "responseTime", value: "24/7" },
  { key: "experienceStartYear", value: "2023" },
  { key: "contactEmail", value: "dhananjoychandradas@gmail.com" },
  { key: "linkedinUrl", value: "https://www.linkedin.com/in/dhananjoycd" },
  { key: "githubUrl", value: "https://github.com/dhananjoycd" },
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    orderIndex: 1,
  },
  {
    title: "Motion",
    items: ["Framer Motion", "GSAP", "Lenis", "Micro interactions"],
    orderIndex: 2,
  },
  {
    title: "Backend Ready",
    items: ["Nodemailer", "Route Handlers", "Server Actions", "API Design"],
    orderIndex: 3,
  },
  {
    title: "Workflow",
    items: ["Git & GitHub", "Responsive Design", "Performance", "Vercel"],
    orderIndex: 4,
  },
];

const experiences = [
  {
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

const educations = [
  {
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

const projects = [
  {
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

const services = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const blogPosts = [
  {
    title: "How I Think About Responsive Portfolio Layouts",
    slug: "how-i-think-about-responsive-portfolio-layouts",
    excerpt:
      "A practical breakdown of spacing, content hierarchy, and scroll behavior for clean portfolio experiences.",
    content:
      "Responsive design is not simply about shrinking containers or rearranging grid columns. In this article, we explore the mental model of content hierarchy, spacing density, and user focus across viewport transitions.",
    category: "Design Systems",
    readTime: "4 min read",
    published: true,
    publishedAt: new Date(),
  },
  {
    title: "Building Motion That Supports UX Instead of Distracting From It",
    slug: "building-motion-that-supports-ux-instead-of-distracting-from-it",
    excerpt:
      "Using subtle transitions, hover states, and reveal timing to make interfaces feel polished and intentional.",
    content:
      "Animation should serve context, orientation, and subtle feedback. Over-animating slows down user navigation, whereas purposeful micro-interactions build delight and credibility.",
    category: "Frontend",
    readTime: "6 min read",
    published: true,
    publishedAt: new Date(),
  },
  {
    title: "Keeping UI Clean While Planning for Future Backend Growth",
    slug: "keeping-ui-clean-while-planning-for-future-backend-growth",
    excerpt:
      "How to build lightweight portfolio architecture now without blocking future database, auth, or CMS expansion later.",
    content:
      "A solid architecture decouples UI presentational components from the persistence layer. By establishing data contracts early, you can effortlessly plug in databases and headless CMS layers without rewriting your frontend.",
    category: "Architecture",
    readTime: "6 min read",
    published: true,
    publishedAt: new Date(),
  },
];

async function main() {
  console.log("Seeding database...");

  // Seed Default Admin User
  const defaultAdminEmail = "dhananjoychandradas@gmail.com";
  const defaultAdminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@2026!";
  const passwordHash = await bcrypt.hash(defaultAdminPassword, 12);

  await prisma.user.upsert({
    where: { email: defaultAdminEmail },
    update: {},
    create: {
      email: defaultAdminEmail,
      name: "Dhananjoy Chandra Das",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log("Admin user seeded.");

  // Seed Site Settings
  for (const setting of profileSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("Site settings seeded.");

  // Seed Skill Groups
  for (const group of skillGroups) {
    await prisma.skillGroup.upsert({
      where: { title: group.title },
      update: { items: group.items, orderIndex: group.orderIndex },
      create: group,
    });
  }
  console.log("Skill groups seeded.");

  // Seed Experiences
  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { title: exp.title, period: exp.period },
    });
    if (!existing) {
      await prisma.experience.create({ data: exp });
    }
  }
  console.log("Experiences seeded.");

  // Seed Education
  for (const edu of educations) {
    const existing = await prisma.education.findFirst({
      where: { title: edu.title, institution: edu.institution },
    });
    if (!existing) {
      await prisma.education.create({ data: edu });
    }
  }
  console.log("Education seeded.");

  // Seed Projects
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log("Projects seeded.");

  // Seed Services
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log("Services seeded.");

  // Seed Blog Posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log("Blog posts seeded.");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

