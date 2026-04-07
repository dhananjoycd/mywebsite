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
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    title: "Mathematics Tutor",
    period: "2023 - Present",
    text: "Guiding students through calculus, algebra, and problem-solving with clarity, structure, and patience.",
  },
  {
    title: "Independent Frontend Developer",
    period: "Ongoing",
    text: "Designing responsive product-style interfaces with accessible layouts, clean code, and polished motion.",
  },
];

const projects = [
  {
    name: "TaskFlow",
    summary: "Productivity app focused on planning, priorities, and progress visibility.",
    details: "Built with a structured dashboard mindset, clean information hierarchy, and fast-loading UI patterns.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    name: "CommerceHub",
    summary: "Modern storefront interface with conversion-aware sections and polished browsing experience.",
    details: "Focused on real-world e-commerce layout patterns, mobile responsiveness, and user-friendly navigation.",
    stack: ["React", "Shadcn UI", "Framer Motion"],
  },
  {
    name: "BlogSphere",
    summary: "Readable publishing experience with balanced typography and smooth section flow.",
    details: "Designed for future content expansion while keeping performance and clarity at the center.",
    stack: ["Next.js", "MDX", "GSAP"],
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
  role: "Mathematics Student & Full-Stack MERN Developer",
  availability: "Open to internships, freelance work, and collaborative projects",
  intro: "Hello! I'm a",
  rotatingRoles: [
    "Full-Stack Developer",
    "Next.js Developer",
    "Frontend Developer",
    "React Developer",
    "Responsive Web Designer",
  ],
  fixedTitle: "I develop clean, responsive, and modern websites for brands, businesses, and real-world needs.",
  resumeUrl: "https://drive.google.com/uc?export=download&id=14wDMPhN_NincwEaMl_3B3ikaeJ2Z9Ir1",
  bio:
    "I am Dhananjoy Chandra Das, a B.Sc. (Hons.) Mathematics student at the University of Rajshahi and a passionate developer who enjoys building structured, user-focused digital experiences with modern web technologies.",
  responseTime: "Within 24 hours",
  experienceStartYear: 2023,
};
function SectionShell({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 sm:py-20 lg:py-24 ${className}`}>
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

        <SectionShell id="home" className="pt-8 sm:pt-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="flex flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">
                  {profile.role}
                </p>
                <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:mx-0 lg:text-6xl">
                  <span className="block text-slate-100">{profile.intro}</span>
                  <HeroTyping
                    items={profile.rotatingRoles}
                    className="mt-3 block min-h-[1.2em] text-cyan-300"
                  />
                </h1>
                <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-slate-100 lg:mx-0">
                  {profile.fixedTitle}
                </p>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
                  {profile.bio}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
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
                <Link href="/blog">
                  <Button variant="secondary" size="lg">
                    Visit Blog
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 transition hover:border-emerald-300/35 hover:bg-emerald-400/16"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                {profile.availability}
              </Link>

              <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-3 lg:mx-0">
                {heroStats.map(([value, label]) => (
                  <Card key={label} className="rounded-3xl px-5 py-4">
                    <p className="font-display text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </Card>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <HeroOrbit />
            </Reveal>
          </div>
        </SectionShell>

        <SectionShell id="about">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="p-6 sm:p-8">
                <SectionHeading
                  eyebrow="About"
                  title="Organized thinking, product-minded execution"
                  description="I enjoy turning ideas into structured digital experiences that feel clean, fast, and easy to use on any device."
                />
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  My mathematics background helps me think carefully about logic, systems,
                  and problem solving. In frontend work, that translates into thoughtful
                  layout decisions, readable content flow, and interfaces that feel stable
                  instead of noisy.
                </p>
              </Card>

              <Card className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Focus</p>
                  <p className="mt-3 text-base leading-7 text-slate-200">
                    Responsive interfaces, strong section hierarchy, accessible layouts, and recruiter-friendly presentation.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Approach</p>
                  <p className="mt-3 text-base leading-7 text-slate-200">
                    Keep the structure clear, the visuals disciplined, and the interactions subtle enough to support trust.
                  </p>
                </div>
              </Card>
            </div>
          </Reveal>
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
          <div className="grid gap-6 xl:grid-cols-[0.8fr_1fr_0.9fr]">
            <Reveal>
              <Card className="p-6 sm:p-8">
                <SectionHeading eyebrow="Education" title="Academic Foundation" />
                <div className="mt-6 rounded-3xl border border-white/8 bg-slate-950/35 p-5">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-1 h-5 w-5 text-cyan-300" />
                    <div>
                      <h3 className="font-semibold text-white">B.Sc. in Mathematics</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Focused on statistics, applied mathematics, analytical reasoning, and computational thinking.
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">2022 - 2025</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="p-6 sm:p-8">
                <SectionHeading eyebrow="Experience" title="Clear communication and practical building" />
                <div className="mt-6 space-y-4">
                  {experiences.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
                      <div className="flex items-start gap-3">
                        <BriefcaseBusiness className="mt-1 h-5 w-5 text-cyan-300" />
                        <div>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-semibold text-white">{item.title}</h3>
                            <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.period}</span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
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
            </Reveal>
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
                <Card className="h-full overflow-hidden rounded-[30px] border-white/10 bg-slate-950/45 transition hover:-translate-y-1 hover:border-white/15">
                  <div className="aspect-16/10 border-b border-white/8 bg-[linear-gradient(180deg,rgba(56,189,248,0.10),rgba(15,23,42,0.1)),linear-gradient(135deg,#0f172a,#020617)] p-4">
                    <div className="grid h-full grid-cols-3 gap-3 rounded-[22px] border border-white/10 bg-slate-950/35 p-3">
                      <div className="rounded-2xl bg-white/10" />
                      <div className="rounded-2xl bg-white/6" />
                      <div className="rounded-2xl bg-white/10" />
                      <div className="col-span-2 rounded-2xl bg-white/6" />
                      <div className="rounded-2xl bg-cyan-400/15" />
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-xl font-medium text-white">{project.name}</h3>
                      <span className="text-xs uppercase tracking-[0.25em] text-slate-500">0{index + 1}</span>
                    </div>
                    <p className="text-sm font-medium leading-7 text-slate-200">{project.summary}</p>
                    <p className="text-sm leading-7 text-slate-400">{project.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="secondary" className="flex-1">Live Demo</Button>
                      <Button variant="secondary" className="flex-1">GitHub</Button>
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
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <Reveal>
              <Card className="p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Contact"
                  title="Tell me about your next build"
                  description="If you have an internship, freelance opportunity, or collaboration in mind, send a message and I will get back to you as soon as possible."
                />
                <div className="mt-8">
                  <ContactForm />
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card className="p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Direct Contact"
                  title="Easy to reach, simple to navigate"
                />
                <div className="mt-8 space-y-4">
                  {[
                    { icon: Mail, value: "yourname@email.com", label: "Email" },
                    { icon: BriefcaseBusiness, value: "linkedin.com/in/yourname", label: "LinkedIn" },
                    { icon: BookOpen, value: "yourname.dev/blog", label: "Blog" },
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
                    The current architecture stays lightweight for performance, but it is ready for a future database, admin panel, or separate backend when needed.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </SectionShell>

        <footer className="border-t border-white/8 py-8">
          <div className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 Your Name. Built with Next.js, Tailwind CSS, and purposeful motion.</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
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
