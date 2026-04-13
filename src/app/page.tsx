import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Download,
  GraduationCap,
  Mail,
  MoveRight,
  Sparkles,
  Telescope,
} from "lucide-react";

import { ClickRipple } from "@/components/click-ripple";
import { ContactForm } from "@/components/contact-form";
import { HeroOrbit } from "@/components/hero-orbit";
import { HeroTyping } from "@/components/hero-typing";
import { Reveal } from "@/components/reveal";
import { ScrollBackground } from "@/components/scroll-background";
import { ServicesSection } from "@/components/services-section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function GitHubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.54-1.4-1.33-1.77-1.33-1.77-1.09-.76.08-.75.08-.75 1.2.09 1.84 1.25 1.84 1.25 1.08 1.86 2.82 1.32 3.5 1.01.11-.79.42-1.32.76-1.63-2.67-.31-5.47-1.36-5.47-6.04 0-1.33.46-2.41 1.22-3.26-.12-.31-.53-1.56.12-3.24 0 0 1-.33 3.3 1.24a11.3 11.3 0 0 1 6 0c2.29-1.57 3.29-1.24 3.29-1.24.65 1.68.24 2.93.12 3.24.76.85 1.22 1.93 1.22 3.26 0 4.69-2.8 5.73-5.48 6.03.43.38.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Motion",
    items: ["Framer Motion", "GSAP", "Lenis", "Micro interactions"],
  },
  {
    title: "Backend Ready",
    items: ["Nodemailer", "Route Handlers", "Server Actions", "API Design"],
  },
  {
    title: "Workflow",
    items: ["Git & GitHub", "Responsive Design", "Performance", "Vercel"],
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
  },
];

const academicItems = [
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
  },
];

const projects = [
  {
    name: "FoodHub",
    image: "/images/projects/foodhub.jpg",
    summary: "A full-stack meal ordering platform built for customers, food providers, and administrators.",
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
      "Cloudinary"
    ],
    tone: "Platform",
    liveClientUrl: "https://foodhub-client-mauve.vercel.app",
    liveServerUrl: "#",
 githubClientUrl: "https://github.com/dhananjoycd/nextjs_Client",
    githubServerUrl: "https://github.com/dhananjoycd/prisma_express_server",
  },
  {
    name: "University Club Management System",
    image: "/images/projects/university-club-management-system.jpg",
    summary: "A role-based management system for university clubs, events, memberships, and payments.",
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
      "Stripe"
    ],
    tone: "Management",
    liveClientUrl: "https://xyztechclub.vercel.app",
    liveServerUrl: "#",
 githubClientUrl: "https://github.com/dhananjoycd/client_Club_Management",
    githubServerUrl: "https://github.com/dhananjoycd/server_UniversityClubManagement",
  },
  {
    name: "AmrKrishiBD",
    image: "/images/projects/amrkrishibd.jpg",
    summary: "A content platform focused on agriculture knowledge sharing and structured publishing.",
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
         "Cloudinary"
      
    ],
    tone: "Content",
    liveClientUrl: "https://amarkrishi.vercel.app",
    liveServerUrl: "#",
    githubClientUrl: "https://github.com/dhananjoycd/client_amrKrishiBD",
    githubServerUrl: "https://github.com/dhananjoycd/server_amrKrishiBD",
  },
];

const researchItems = [
  {
    title: "Research Interests",
    text: "Algorithms, optimization, and systems thinking that influence practical product decisions.",
    icon: Telescope,
  },
  {
    title: "Current Focus",
    text: "Building responsive interfaces that feel organized, readable, and production-ready across devices.",
    icon: Sparkles,
  },
  {
    title: "Future Goals",
    text: "Growing into scalable backend architecture and contributing to real-world applications with measurable impact.",
    icon: MoveRight,
  },
];

const blogPreview = [
  {
    title: "How I Think About Responsive Portfolio Layouts",
    description: "A practical breakdown of spacing, content hierarchy, and scroll behavior for clean portfolio experiences.",
    meta: "Design Systems | 4 min read",
  },
  {
    title: "Building Motion That Supports UX Instead of Distracting From It",
    description: "Using subtle transitions, hover states, and reveal timing to make interfaces feel polished and intentional.",
    meta: "Frontend | 6 min read",
  },
];

const profile = {
  name: "Dhananjoy Chandra Das",
  role: "Portfolio Overview",
  heroLabel:
    "Web Developer | Educator | Research Enthusiast",
  availabilityLabel: "Open to internships, jobs, and freelance work",
  rotatingRoles: [
    "Full Stack web Developer",
    "Next.js Developer",
    "React Developer",
  ],

  resumeUrl: "https://drive.google.com/uc?export=download&id=14wDMPhN_NincwEaMl_3B3ikaeJ2Z9Ir1",
  bio:
    "I am a B.Sc. (Hons.) student in Mathematics at the University of Rajshahi and a passionate Full-Stack Web Developer. I specialize in building modern, scalable web applications using technologies like Next.js, React, TypeScript, Node.js, Express.js PostgreSQL, Prisma, and Tailwind CSS. In addition, I am actively engaged in research in biomathematics, applying mathematical modeling to real-world biological and health challenges.",
  responseTime: "24/7",
  experienceStartYear: 2023,
};
function SectionShell({
  id,
  children,
  className = "",
  compact = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 ${compact ? "py-8 sm:py-10 lg:py-12" : "py-12 sm:py-16 lg:py-20"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const currentYear = new Date().getFullYear();
  const yearsExperience = Math.max(1, currentYear - profile.experienceStartYear + 1);
  const heroStats = [
    [String(projects.length), "Featured Projects"],
    [`${yearsExperience}+`, "Years Practice"],
    [profile.responseTime, "Typical Reply Time"],
  ] as const;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050b19_0%,#030816_100%)]">
      <ScrollBackground variant="home" />
      <ClickRipple />


      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">

        <SectionShell id="home" compact>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.03fr)_minmax(320px,0.92fr)] lg:items-center">
               <Reveal delay={0.12} className="flex flex-col items-center justify-center gap-5">
              <HeroOrbit />
              <div className="w-full max-w-152 rounded-[30px] px-5 py-4 text-center shadow-[0_18px_55px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:px-6 sm:py-5 lg:text-center">
                <p className="text-center text-sm font-semibold leading-7 tracking-[0.12em] text-cyan-50 sm:text-[0.95rem] lg:leading-8">
                  {profile.heroLabel}
                </p>
                <div className="mt-4 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" />
                    {profile.availabilityLabel}
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="space-y-5 sm:space-y-6">
          
                <h1 className="mx-auto max-w-3xl font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:mx-0 lg:text-4xl">
                  <span className="block text-slate-100">Hello! I&apos;m {profile.name}</span>
                  <HeroTyping
                    items={profile.rotatingRoles}
                    className="mt-3 inline-flex min-h-[1.15em] min-w-[14ch] items-center whitespace-nowrap text-cyan-300"
                  />
                </h1>
             
                <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
                  {profile.bio}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link href="#projects">
                  <Button size="lg">
                    View Projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-semibold text-slate-100 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-[0_12px_28px_rgba(2,6,23,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80"
                >
                  Download Resume
                  <Download className="h-4 w-4" />
                </a>
            
              </div>

              <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-3 lg:mx-0">
                {heroStats.map(([value, label]) => (
                  <Card key={label} className="rounded-3xl px-5 py-4">
                    <p className="font-display text-xl font-semibold text-white sm:text-2xl">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell id="about">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="p-6 sm:p-8">
                <SectionHeading
                  eyebrow="About Me"
                  title="A Full Stack Web Developer with a research mindset"
                  description="I build practical, scalable web applications and bring a structured, problem-solving mindse to both software and research."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "B.Sc. (Hons.) in Mathematics at the University of Rajshahi",
                    "Full stack web development for business and organizational platforms",
                    "Biomathematics research with modeling and computational methods",
                    "Focused on clear UX, stable structure, and real-world usefulness",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3 text-sm leading-6 text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            My background in Mathematics gives me a strong foundation in analytical thinking and structured problem-solving. I apply this mindset to web development, focusing on building applications that are efficient, maintainable, and valuable in real-world use cases.
                </p>
              </Card>

              <Card className="grid gap-4 p-5 sm:gap-5 sm:p-6 lg:p-8">
                <div className="rounded-3xl border border-cyan-400/10 bg-slate-950/35 p-4 sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 sm:text-xs">
                    What I Build
                  </p>
                  <h3 className="mt-3 font-display text-lg font-medium text-white sm:text-xl">
          Building Scalable Web Applications
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">
                I develop full-stack web applications that are fast, responsive, and built for real-world use. From dashboards to e-commerce platforms, I focus on creating solutions that deliver both performance and usability.
                  </p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">
                    Next.js • React.js • TypeScript • FULL-STACK
                  </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4 sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300 sm:text-xs">
                    How I Work
                  </p>
                  <h3 className="mt-3 font-display text-lg font-medium text-white sm:text-xl">
           Clean Process, Reliable Results
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">
               My workflow is focused on clarity, structure, and efficiency. I write clean, maintainable code, design intuitive user experiences, and ensure performance across all devices.
                  </p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">
             CLEAN CODE • Usability • Performance
                  </p>
                </div>
              </Card>
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell id="services">
          <ServicesSection />
        </SectionShell>

        <SectionShell id="skills">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="A modern stack with room to scale"
              description="Built around your chosen tools, while keeping the architecture clean enough for future backend growth."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05}>
                <Card className="h-full p-6">
                  <h3 className="font-display text-lg font-medium text-white">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="experience">
          <div className="grid gap-6">
            <Reveal>
              <Card className="p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Education"
                  title="My Academic Journey"
                  description="A concise view of the academic background that supports my development work, research interests, and analytical approach to solving real problems."
                />
                <div className="mt-6 space-y-5">
                  {academicItems.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[30px] border border-white/8 bg-slate-950/35 p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-300">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="font-display text-xl font-medium text-white">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-sm font-medium text-cyan-200">
                                {item.institution}
                              </p>
                            </div>
                            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                              {item.period}
                            </span>
                          </div>

                          <p className="mt-4 text-sm leading-7 text-slate-300">
                            {item.summary}
                          </p>

                          <div className="mt-5 space-y-3">
                            {item.highlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/2 px-4 py-3"
                              >
                                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.55)]" />
                                <p className="text-sm leading-6 text-slate-200">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 rounded-2xl border border-cyan-400/12 bg-cyan-400/8 px-4 py-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/80">
                              Academic Note
                            </p>
                            <p className="mt-2 text-sm text-cyan-50">
                              {item.meta}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Experience"
                  title="Practical work shaped by building, teaching, and research"
                  description="A blend of software development, mathematics instruction, and research-driven exploration that reflects both technical execution and clear communication."
                />
                <div className="mt-6 space-y-4">
                  {experiences.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-[30px] border p-5 sm:p-6 ${
                        item.featured
                          ? "border-cyan-400/18 bg-[linear-gradient(180deg,rgba(34,211,238,0.10),rgba(2,6,23,0.32))]"
                          : "border-white/8 bg-slate-950/35"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-2xl border p-2.5 ${
                            item.featured
                              ? "border-cyan-400/20 bg-cyan-400/12 text-cyan-200"
                              : "border-cyan-400/15 bg-cyan-400/10 text-cyan-300"
                          }`}
                        >
                          <BriefcaseBusiness className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="font-display text-xl font-medium text-white">
                                {item.title}
                              </h3>
                              {item.featured ? (
                                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-cyan-300/80">
                                  Main professional experience
                                </p>
                              ) : null}
                            </div>
                            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                              {item.period}
                            </span>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-slate-300">
                            {item.text}
                          </p>
                          <div className="mt-5 space-y-3">
                            {item.highlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/2 px-4 py-3"
                              >
                                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.55)]" />
                                <p className="text-sm leading-6 text-slate-200">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
{/* now no need this section */}
{/*             <Reveal delay={0.1}>
              <Card className="p-6 sm:p-8">
                <SectionHeading eyebrow="Research & Goals" title="Direction for long-term growth" />
                <div className="mt-6 space-y-4">
                  {researchItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-2.5 text-cyan-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Reveal> */}
          </div>
        </SectionShell>

        <SectionShell id="projects">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Projects"
                title="Selected work with practical structure"
                description="Each project is presented with clear purpose, balanced layout, and real-world UI thinking."
              />
              <Link href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white">
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.06}>
                <Card className="flex h-full flex-col overflow-hidden rounded-[30px] border-white/10 bg-slate-950/45 transition hover:-translate-y-1 hover:border-cyan-400/18">
                  <div className="aspect-16/10 border-b border-white/8 bg-[linear-gradient(180deg,rgba(34,211,238,0.10),rgba(15,23,42,0.1)),linear-gradient(135deg,#0f172a,#020617)] p-4">
                    <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/35">
                      <Image
                        src={project.image}
                        alt={`${project.name} project preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.10),rgba(2,6,23,0.46))]" />
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                        <span className="inline-flex rounded-full border border-cyan-400/18 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-sm">
                          {project.tone}
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-slate-300">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div>
                      <h3 className="font-display text-[1.45rem] font-medium leading-tight text-white">
                        {project.name}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {project.summary}
                      </p>
                    </div>
                    <div className="mt-5 space-y-3">
                      {project.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.55)]" />
                          <p className="text-sm leading-6 text-slate-200">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto space-y-3 pt-6">
                      {project.liveClientUrl !== "#" ? (
                        <a
                          href={project.liveClientUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full"
                        >
                          <Button className="w-full">
                            Live Client
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      ) : (
                        <Button className="w-full opacity">
                          Live Client
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}

                      <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Client", href: project.githubClientUrl },
                        { label: "Server", href: project.githubServerUrl },
                      ].map((linkItem) =>
                        linkItem.href !== "#" ? (
                          <a
                            key={linkItem.label}
                            href={linkItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                          >
                            <Button variant="secondary" className="w-full">
                              <GitHubMark className="h-4 w-4" />
                              {linkItem.label}
                            </Button>
                          </a>
                        ) : (
                          <Button
                            key={linkItem.label}
                            variant="secondary"
                            className="w-full opacity-60"
                            disabled
                          >
                            <GitHubMark className="h-4 w-4" />
                            {linkItem.label}
                          </Button>
                        ),
                      )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="blog">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Blog"
                title="Writing that can grow with the portfolio"
                description="A clean content section helps show process, technical thinking, and communication skills without cluttering the homepage."
              />
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white">
                Open blog page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {blogPreview.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.05}>
                <Card className="h-full p-6 transition hover:-translate-y-1 hover:border-white/15">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{post.meta}</p>
                  <h3 className="mt-4 font-display text-2xl font-medium text-white">{post.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{post.description}</p>
                  <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="contact">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
            <Reveal>
              <Card className="h-full p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Contact"
                  title="Share your project ideas"
                  description="If you have an internship, freelance opportunity, or collaboration in mind, send a message and I will get back to you as soon as possible."
                />
                <div className="mt-8 flex-1">
                  <ContactForm />
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card className="h-full flex flex-col p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Direct Contact"
                  title="Feel Free to Reach Out"
                />
                <div className="mt-8 flex-1 space-y-4">
                  {[
                    { icon: Mail, value: "dhananjoychandradas@gmail.com", label: "Email" },
                    { icon: BriefcaseBusiness, value: "https://www.linkedin.com/in/dhananjoycd", label: "LinkedIn" },
                    { icon: BookOpen, value: "dhananjoy.dev/blog", label: "Blog" },
                  ].map(({ icon: ItemIcon, value, label }) => (
                    <div key={value} className="flex items-center gap-4 rounded-3xl border border-white/8 bg-slate-950/35 p-4">
                      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-300">
                        <ItemIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                        <p className="mt-1 text-sm text-slate-200">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-[28px] border border-cyan-400/15 bg-cyan-400/10 p-5">
                  <p className="font-medium text-cyan-100">Usually replies within 24 hours.</p>
                  <p className="mt-2 text-sm leading-7 text-cyan-50/80">
                    Whether you have a question about my experience, want to discuss a project idea, or just want to say hi, feel free to reach out. I look forward to connecting with you!
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </SectionShell>

        <footer className="border-t border-white/8 py-5 sm:py-6">
          <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p>© {currentYear} personal website. All rights reserved by {""} 
              <a
                href="https://github.com/dhananjoycd"
                target="_blank"

                className="text-cyan-300 transition hover:text-white"
              >
                Dhananjoy Chandra Das
              </a> </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
