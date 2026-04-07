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

import { ContactForm } from "@/components/contact-form";
import { HeroOrbit } from "@/components/hero-orbit";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navigation = [
  "Home",
  "About",
  "Skills",
  "Education",
  "Experience",
  "Projects",
  "Research",
  "Contact",
  "Blog",
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js 15", "TypeScript", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Motion",
    items: ["Framer Motion", "GSAP", "Lenis", "Responsive UI"],
  },
  {
    title: "Backend Ready",
    items: ["Nodemailer", "Route Handlers", "Server Actions", "API Design"],
  },
  {
    title: "Tools",
    items: ["Git & GitHub", "VS Code", "Figma", "Vercel"],
  },
];

const projects = [
  {
    name: "TaskFlow",
    description:
      "A productivity dashboard for focused work sessions, priorities, and progress tracking.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    name: "CommerceHub",
    description:
      "An elegant e-commerce storefront with category filtering, featured items, and conversion-first UI.",
    stack: ["React", "Shadcn UI", "Framer Motion"],
  },
  {
    name: "BlogSphere",
    description:
      "A modern publishing experience with smooth transitions, highlighted articles, and readable typography.",
    stack: ["Next.js", "MDX", "GSAP"],
  },
];

const researchItems = [
  {
    title: "Research Interests",
    text: "Algorithms, optimization, machine learning, and system thinking that improves product decisions.",
    icon: Telescope,
  },
  {
    title: "Current Focus",
    text: "Building polished full-stack interfaces with strong UX, thoughtful performance, and accessible structure.",
    icon: Sparkles,
  },
  {
    title: "Future Goals",
    text: "Contributing to impactful products, growing into scalable backend architecture, and open-source collaboration.",
    icon: MoveRight,
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_38%),radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.08),transparent_26%),linear-gradient(180deg,#050b19_0%,#030816_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 mb-8 rounded-full border border-white/8 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="#home" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold tracking-wide text-white">
                  Your Name
                </p>
                <p className="text-xs text-slate-400">Full-Stack Developer</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <Button variant="secondary" className="hidden sm:inline-flex">
              Resume
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section
          id="home"
          className="grid gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Hi, I&apos;m available for internships and freelance work
            </div>

            <div className="space-y-6">
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                A Mathematics Student &amp;
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Full-Stack Web Developer
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I build clean, scalable, and user-focused web experiences with
                Next.js 15, TypeScript, Tailwind CSS, expressive motion, and a
                strong eye for usability.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg">
                Download Resume
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg">
                Visit Blog
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ["2+", "Live Projects"],
                ["5+", "Core Technologies"],
                ["100%", "Dedication"],
              ].map(([value, label]) => (
                <Card key={label} className="rounded-3xl px-5 py-4">
                  <p className="font-display text-2xl font-semibold text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </Card>
              ))}
            </div>
          </div>

          <HeroOrbit />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card id="about" className="p-6 sm:p-8">
            <SectionHeading
              eyebrow="About Me"
              title="Problem-solving mindset with product-focused execution"
              description="I enjoy turning ideas into practical digital products. My mathematics background helps me reason carefully, while web development lets me ship elegant, real-world solutions."
            />
            <p className="mt-6 text-sm leading-7 text-slate-300">
              I love building responsive interfaces, structured systems, and
              modern user journeys that feel smooth on every device. My focus
              is simple: make the experience clear, fast, and useful.
            </p>
          </Card>

          <Card id="skills" className="p-6 sm:p-8">
            <SectionHeading
              eyebrow="Skills"
              title="A modern stack for premium portfolio experiences"
              description="Built around your chosen tools so the site feels polished today and stays extendable later."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {skillGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-3xl border border-white/8 bg-slate-950/45 p-5"
                >
                  <h3 className="font-display text-lg font-medium text-white">
                    {group.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1fr_0.85fr]">
          <Card id="education" className="p-6">
            <SectionHeading eyebrow="Education" title="Academic Background" />
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-white/8 bg-slate-950/40 p-5">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-1 h-5 w-5 text-cyan-300" />
                  <div>
                    <h3 className="font-semibold text-white">B.Sc. Mathematics</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Focused on statistics, applied math, and computational thinking.
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      2022 - 2025
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/8 bg-slate-950/40 p-5">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 text-cyan-300" />
                  <div>
                    <h3 className="font-semibold text-white">Relevant Coursework</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Data structures, algorithms, DBMS, research methods, and web development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card id="experience" className="p-6">
            <SectionHeading eyebrow="Experience" title="Teaching, Building, Improving" />
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-white/8 bg-slate-950/40 p-5">
                <div className="flex items-start gap-3">
                  <BriefcaseBusiness className="mt-1 h-5 w-5 text-cyan-300" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Mathematics & Tutoring
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Guided students in calculus, algebra, and structured problem-solving with clarity and patience.
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      2023 - Present
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/8 bg-slate-950/40 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 text-cyan-300" />
                  <div>
                    <h3 className="font-semibold text-white">Independent Development</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Building modern portfolio and product-style interfaces with thoughtful motion and responsive UX.
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Ongoing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card id="research" className="p-6">
            <SectionHeading eyebrow="Research & Goals" title="Where I want to grow next" />
            <div className="mt-6 space-y-4">
              {researchItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/8 bg-slate-950/40 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-2.5 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-7 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section id="projects" className="mt-6">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Featured Projects"
                title="Selected work built for clarity, speed, and impact"
              />
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card
                  key={project.name}
                  className="overflow-hidden rounded-[30px] border-white/10 bg-slate-950/50"
                >
                  <div className="aspect-[16/10] border-b border-white/8 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(15,23,42,0.2)),radial-gradient(circle_at_top_left,rgba(59,130,246,0.32),transparent_42%),linear-gradient(180deg,#0f172a,#020617)] p-4">
                    <div className="grid h-full grid-cols-3 gap-3 rounded-[22px] border border-white/10 bg-slate-950/25 p-3">
                      <div className="rounded-2xl bg-white/10" />
                      <div className="rounded-2xl bg-white/5" />
                      <div className="rounded-2xl bg-white/10" />
                      <div className="col-span-2 rounded-2xl bg-white/5" />
                      <div className="rounded-2xl bg-cyan-400/20" />
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-medium text-white">
                        {project.name}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-slate-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="secondary" className="flex-1">
                        Live Demo
                      </Button>
                      <Button variant="secondary" className="flex-1">
                        GitHub
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Card id="contact" className="p-6 sm:p-8">
            <SectionHeading
              eyebrow="Let's Connect"
              title="Tell me about your next build"
              description="If you have an internship, freelance opportunity, or collaboration in mind, send a message and let's talk."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <SectionHeading
              eyebrow="Contact Details"
              title="Easy to reach, quick to respond"
            />
            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, value: "yourname@email.com" },
                { icon: BriefcaseBusiness, value: "linkedin.com/in/yourname" },
                { icon: BookOpen, value: "yourname.dev/blog" },
              ].map(({ icon: ItemIcon, value }) => {
                return (
                  <div
                    key={value}
                    className="flex items-center gap-4 rounded-3xl border border-white/8 bg-slate-950/40 p-4"
                  >
                    <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-300">
                      <ItemIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Direct Contact
                      </p>
                      <p className="mt-1 text-sm text-slate-200">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-[28px] border border-cyan-400/15 bg-cyan-400/10 p-5">
              <p className="font-medium text-cyan-100">
                Usually replies within 24 hours.
              </p>
              <p className="mt-2 text-sm leading-7 text-cyan-50/80">
                The architecture is intentionally future-ready, so a separate
                backend, database, or admin panel can be added later without
                redesigning the whole site.
              </p>
            </div>
          </Card>
        </section>

        <footer className="mt-10 border-t border-white/8 py-8">
          <div className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 Your Name. Crafted with Next.js, Tailwind CSS, and motion.</p>
            <div className="flex flex-wrap gap-4">
              {["Home", "About", "Skills", "Projects", "Blog", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="transition hover:text-cyan-300"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}