import Link from "next/link";
import {
  ArrowRight,
  Download,
  Eye,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { ClickRipple } from "@/components/click-ripple";
import { ContactForm } from "@/components/contact-form";
import { HeroOrbit } from "@/components/hero-orbit";
import { HeroTyping } from "@/components/hero-typing";
import { Reveal } from "@/components/reveal";
import { ScrollBackground } from "@/components/scroll-background";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { TimelineSection } from "@/components/timeline-section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getProfileData,
  getSkillGroups,
  getExperiences,
  getEducations,
  getProjects,
  getActiveServices,
  getPublishedBlogPosts,
} from "@/lib/data";

export const dynamic = "force-dynamic";

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
      className={`scroll-mt-24 ${compact ? "py-6 sm:py-8 lg:py-10" : "py-10 sm:py-14 lg:py-18"} ${className}`}
    >
      {children}
    </section>
  );
}

// Point 1: Custom Animated Circular Social Icons
function SocialCircle({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 p-2 text-slate-300 transition duration-300 hover:scale-110 hover:border-cyan-400/50 hover:text-white"
    >
      <span className="absolute -inset-0.5 rounded-full bg-cyan-400/20 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export default async function Home() {
  const [
    profile,
    skillGroups,
    experiences,
    academicItems,
    projects,
    services,
    blogPosts,
  ] = await Promise.all([
    getProfileData(),
    getSkillGroups(),
    getExperiences(),
    getEducations(),
    getProjects(),
    getActiveServices(),
    getPublishedBlogPosts(),
  ]);

  const currentYear = new Date().getFullYear();
  const yearsExperience = Math.max(1, currentYear - (profile.experienceStartYear || 2023) + 1);
  const heroStats = [
    [String(projects.length), "Completed Projects"],
    [`${yearsExperience}+`, "Years Practice"],
    [profile.responseTime || "24/7", "Reply Turnaround"],
  ] as const;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050b19_0%,#030816_100%)]">
      <ScrollBackground variant="home" />
      <ClickRipple />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* Hero Section */}
        <SectionShell id="home" compact>
          <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-[minmax(0,1.03fr)_minmax(320px,0.92fr)] lg:items-center">
            {/* Left Column: Photo & Orbit */}
            <Reveal delay={0.12} className="flex flex-col items-center justify-center gap-3 w-full">
              <HeroOrbit />

              {/* Status Pill Card */}
              <div className="w-full max-w-sm sm:max-w-md rounded-[24px] sm:rounded-[28px] border border-cyan-400/20 bg-slate-950/60 px-4 py-3 sm:px-5 sm:py-3.5 text-center shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                <p className="text-center text-xs sm:text-sm font-semibold leading-relaxed tracking-wide text-cyan-50">
                  {profile.heroLabel}
                </p>
                <div className="mt-2 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)] animate-pulse" />
                    {profile.availabilityLabel}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Bio, Short 3 CTAs, & Social Media Underneath */}
            <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left w-full">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-0.5 text-xs font-semibold text-cyan-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Milestone Delivery Guarantee
                </div>

                <h1 className="mx-auto max-w-3xl font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:mx-0 lg:text-5xl">
                  <span className="block text-slate-100">Hello, I&apos;m {profile.name}</span>
                  <HeroTyping
                    items={profile.rotatingRoles}
                    className="mt-1.5 inline-flex min-h-[1.15em] min-w-[14ch] items-center whitespace-nowrap text-cyan-300 text-xl sm:text-3xl lg:text-4xl"
                  />
                </h1>

                <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-300 sm:text-base lg:mx-0">
                  {profile.bio}
                </p>
              </div>

              {/* Point 1: Short Meaningful 3 CTAs (Hire Me, Projects, Resume) */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:justify-start">
                <Link href="#services">
                  <Button size="lg" className="rounded-full shadow-lg shadow-cyan-400/20 font-bold gap-1.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300 px-5 text-xs sm:text-sm h-10 sm:h-11">
                    Hire Me
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="#projects">
                  <Button size="lg" variant="secondary" className="rounded-full gap-1.5 border border-white/10 px-5 text-xs sm:text-sm h-10 sm:h-11">
                    <Eye className="h-4 w-4 text-cyan-400" />
                    Projects
                  </Button>
                </Link>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 text-xs sm:text-sm font-semibold text-slate-100 transition duration-300 hover:border-cyan-400/40 hover:bg-white/10"
                >
                  Resume
                  <Download className="h-4 w-4" />
                </a>
              </div>

              {/* Point 1: Social Media Icons Centered Right Below the 3 CTAs */}
              <div className="mt-5 flex items-center justify-center lg:justify-start gap-3 w-full">
                {/* GitHub */}
                <SocialCircle href={profile.githubUrl || "https://github.com/dhananjoycd"} label="GitHub">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </SocialCircle>

                {/* LinkedIn */}
                <SocialCircle href={profile.linkedinUrl || "https://linkedin.com/in/dhananjoycd"} label="LinkedIn">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-sky-400" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </SocialCircle>

                {/* Facebook */}
                <SocialCircle href="https://facebook.com/dhananjoycd" label="Facebook">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-blue-500" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </SocialCircle>

                {/* YouTube */}
                <SocialCircle href="https://youtube.com/@dhananjoycd" label="YouTube">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-rose-500" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </SocialCircle>
              </div>

              {/* Hero Stats */}
              <div className="mt-7 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3 lg:mx-0">
                {heroStats.map(([value, label]) => (
                  <Card key={label} className="rounded-2xl border-white/8 bg-slate-950/60 p-2.5 sm:p-4 text-center">
                    <p className="font-display text-lg sm:text-2xl font-bold text-white">{value}</p>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-slate-400">{label}</p>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </SectionShell>

        {/* About Section */}
        <SectionShell id="about">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Engineering Mindset"
                  title="Mathematics-driven precision meets modern web development"
                  description="I turn complex logic into structured, beautiful, and scalable user interfaces that convert users into long-term clients."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "B.Sc. (Hons.) Mathematics at University of Rajshahi",
                    "Full stack web development for scalable enterprise apps",
                    "Biomathematics research with mathematical modeling",
                    "Production-ready architecture, clean UI, & zero bloat",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-slate-900/60 px-4 py-3 text-xs leading-5 text-slate-200 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="grid gap-4 rounded-3xl border-white/8 bg-slate-950/60 p-6 lg:p-8">
                <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/60 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 font-semibold">
                    What I Deliver
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    High Performance Web Platforms
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    Fast, responsive, and secure full-stack applications. From customer portals to e-commerce, I build solutions with high conversion and clean maintainability in mind.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-900/60 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 font-semibold">
                    Workflow & Turnaround
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    Milestone Progress & Direct Communication
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    Direct access to staging links, rapid revisions, automated tracking codes, and complete transparency from inception to deployment.
                  </p>
                </div>
              </Card>
            </div>
          </Reveal>
        </SectionShell>

        {/* Commercial Services & Pricing */}
        <SectionShell id="services">
          <ServicesSection
            initialServices={services.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              points: s.points,
              price: s.price,
            }))}
          />
        </SectionShell>

        {/* Skills Section */}
        <SectionShell id="skills">
          <Reveal>
            <SectionHeading
              eyebrow="Core Competencies"
              title="A battle-tested stack with room to scale"
              description="Modern frameworks, robust typing, and enterprise styling standards tailored for high-speed products."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05}>
                <Card className="h-full rounded-2xl border-white/8 bg-slate-950/60 p-5 hover:border-cyan-400/25 transition">
                  <h3 className="font-display text-sm font-bold text-white">{group.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
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

        {/* Point 3: Commercial Projects Showcase with Equal Height Cards */}
        <SectionShell id="projects">
          <ProjectsSection projects={projects} />
        </SectionShell>

        {/* Modern Vertical Timeline (Experience & Education) */}
        <SectionShell id="timeline">
          <TimelineSection
            experiences={experiences}
            educations={academicItems}
          />
        </SectionShell>

        {/* Blog Preview Section */}
        <SectionShell id="blog">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Technical Writing"
                title="Engineering notes, design systems, & architecture"
                description="Writing that shows problem-solving clarity, frontend choices, and systems thinking."
              />
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white">
                View all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {blogPosts.slice(0, 2).map((post, index) => (
              <Reveal key={post.slug || post.title} delay={index * 0.05}>
                <Card className="flex h-full flex-col justify-between rounded-3xl border-white/8 bg-slate-950/60 p-6 transition hover:border-cyan-400/30">
                  <div>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase text-cyan-300">
                      {post.category} • {post.readTime}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold text-white">{post.title}</h3>
                    <p className="mt-3 text-xs leading-6 text-slate-300">{post.excerpt}</p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:text-white"
                  >
                    Read full article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        {/* Contact Section */}
        <SectionShell id="contact">
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <Reveal>
              <Card className="h-full rounded-[24px] sm:rounded-3xl border-white/8 bg-slate-950/60 p-4 sm:p-7 lg:p-8">
                <SectionHeading
                  eyebrow="Direct Inquiry"
                  title="Let's build your next high-converting platform"
                  description="Share your requirements, budget, or timeline. I reply to all client inquiries within 24 hours."
                />
                <div className="mt-6 sm:mt-8">
                  <ContactForm />
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card className="h-full flex flex-col justify-between rounded-[24px] sm:rounded-3xl border-white/8 bg-slate-950/60 p-4 sm:p-7 lg:p-8">
                <div>
                  <SectionHeading
                    eyebrow="Direct Channels"
                    title="Get in touch directly"
                  />
                  <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
                    {[
                      { icon: Mail, value: profile.contactEmail, label: "Email", href: `mailto:${profile.contactEmail}` },
                      { icon: ShieldCheck, value: profile.linkedinUrl, label: "LinkedIn", href: profile.linkedinUrl },
                    ].map(({ icon: ItemIcon, value, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-white/8 bg-slate-900/60 p-3 sm:p-4 transition hover:border-cyan-400/30"
                      >
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shrink-0">
                          <ItemIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400">{label}</p>
                          <p className="mt-0.5 truncate text-xs sm:text-sm font-medium text-white">{value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-950/30 p-4 sm:p-5">
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300">Client Guarantee</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Transparent pricing • Full intellectual property rights on delivery • 14 days free support after deployment.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </SectionShell>

        {/* Clean Footer */}
        <footer className="mt-12 border-t border-white/8 pt-8">
          <div className="flex flex-col gap-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#home" className="hover:text-white transition">Home</Link>
              <Link href="#services" className="hover:text-white transition">Services</Link>
              <Link href="#projects" className="hover:text-white transition">Works</Link>
              <Link href="/track-order" className="hover:text-white transition">Track Order</Link>
              <Link href="/admin" className="hover:text-white transition">Admin Portal</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
