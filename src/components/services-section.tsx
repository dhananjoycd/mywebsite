"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Wallet, 
  Banknote,
  CheckCircle2,
  Copy,
  Clock,
  ExternalLink
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type ServiceItem = {
  id?: string;
  title: string;
  description: string;
  points: string[];
  price: string;
};

export const defaultServices: ServiceItem[] = [
  {
    id: "frontend-dev",
    title: "Frontend Development",
    description: "Responsive, high-performance user interfaces built with Next.js, React, and Tailwind CSS.",
    points: [
      "Custom UI components with Tailwind & Radix UI",
      "Pixel-perfect responsive layout across devices",
      "Clean animations and micro-interactions",
      "SEO friendly and optimized Core Web Vitals",
    ],
    price: "$80",
  },
  {
    id: "fullstack-app",
    title: "Full-Stack Web App",
    description: "End-to-end web applications with database modeling, REST/tRPC APIs, authentication, and admin portals.",
    points: [
      "Next.js App Router with Server Actions",
      "PostgreSQL / Neon DB with Prisma ORM",
      "JWT / NextAuth Role-Based Access Control",
      "Stripe payment gateway integration",
    ],
    price: "$150",
  },
  {
    id: "portfolio-branding",
    title: "Portfolio & CMS Platform",
    description: "Stand-out portfolio websites with built-in admin dashboard, dynamic CMS, and booking systems.",
    points: [
      "Sellable SaaS or personal portfolio template",
      "Full admin portal to edit content & blog",
      "Live order inquiry tracking system",
      "Automated email notifications to clients",
    ],
    price: "$120",
  },
  {
    id: "performance-consulting",
    title: "Bug Fix & Architecture Review",
    description: "Targeted refactoring, performance optimization, and architectural polish for existing codebases.",
    points: [
      "Fix Next.js, React, or Tailwind rendering bugs",
      "Database query tuning with Prisma",
      "Deployment troubleshooting on Vercel",
      "Clear technical documentation",
    ],
    price: "$45",
  },
];

const PAYMENT_METHODS = [
  {
    id: "CUSTOM_QUOTE",
    title: "Pay After Review & Milestone",
    badge: "Recommended",
    desc: "No upfront payment required. Align on scope, review initial staging demo, and pay upon agreed milestones.",
    icon: ShieldCheck,
  },
  {
    id: "STRIPE_CARD",
    title: "Credit / Debit Card (Stripe)",
    badge: "Ready Soon",
    desc: "Pay securely via Visa, Mastercard, or American Express once invoice is issued.",
    icon: CreditCard,
  },
  {
    id: "LOCAL_BANKING",
    title: "bKash / Nagad / Local Bank",
    badge: "BD Clients",
    desc: "Direct local payment with instant verification for clients in Bangladesh.",
    icon: Wallet,
  },
  {
    id: "CRYPTO_USDT",
    title: "USDT / Crypto (Binance)",
    badge: "International",
    desc: "Fast international settlement with zero bank conversion hassle.",
    icon: Banknote,
  },
];

export function ServicesSection({
  initialServices,
}: {
  initialServices?: ServiceItem[];
}) {
  const displayServices =
    initialServices && initialServices.length > 0
      ? initialServices
      : defaultServices;

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("CUSTOM_QUOTE");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Success Confirmation Pop-up Modal State
  const [successOrder, setSuccessOrder] = useState<{
    trackingCode: string;
    serviceTitle: string;
    servicePrice: string;
    clientEmail: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const copyTrackingCode = () => {
    if (!successOrder?.trackingCode) return;
    navigator.clipboard.writeText(successOrder.trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedService || status === "loading") return;

    setStatus("loading");
    setErrorMessage(null);
    const form = event.currentTarget;
    const activeService = selectedService;
    const formData = new FormData(form);

    const email = String(formData.get("email") || "");

    const payload = {
      name: formData.get("name"),
      email: email,
      phone: formData.get("phone"),
      details: formData.get("details"),
      paymentMethod: selectedPayment,
      serviceTitle: activeService.title,
      servicePrice: activeService.price,
      servicePoints: activeService.points,
    };

    try {
      const response = await fetch("/api/service-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        form.reset();
        setStatus("success");
        // Trigger Point 3 Essential Confirmation Modal
        setSuccessOrder({
          trackingCode: result.trackingCode,
          serviceTitle: activeService.title,
          servicePrice: activeService.price,
          clientEmail: email,
        });
        setSelectedService(null);
        return;
      }

      setStatus("error");
      setErrorMessage(result?.error ?? "Order request could not be processed right now.");
    } catch {
      setStatus("error");
      setErrorMessage("Network error: Please try again or reach out via email directly.");
    }
  }

  function closeModal() {
    setSelectedService(null);
    setStatus("idle");
    setErrorMessage(null);
  }

  return (
    <div className="relative">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Commercial Services & Pricing"
            title="Production-grade development for your business"
            description="Transparent pricing, agile turnaround, and clean maintainable code. Choose a package or request a custom milestone quote."
          />
          <Link
            href="/track-order"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 transition hover:bg-white/10"
          >
            Track Existing Order
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      {/* Services Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayServices.map((service, index) => {
          const isFeatured = index === 1;
          return (
            <Reveal key={service.id || service.title} delay={index * 0.05}>
              <Card
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isFeatured
                    ? "border-cyan-400/40 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),rgba(2,6,23,0.7))] shadow-[0_10px_35px_rgba(34,211,238,0.12)]"
                    : "border-white/10 bg-slate-950/60 hover:border-cyan-400/25"
                }`}
              >
                {isFeatured && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                      <Sparkles className="h-3 w-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                    Package 0{index + 1}
                  </p>
                  <h3 className="mt-2.5 font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">
                    {service.description}
                  </p>

                  <div className="my-5 border-y border-white/8 py-3.5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl font-extrabold tracking-tight text-white">
                        {service.price}
                      </span>
                      <span className="text-xs text-slate-400">/ estimated starting</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {service.points.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedService(service);
                      setStatus("idle");
                    }}
                    className={`w-full gap-2 rounded-xl text-xs font-semibold uppercase tracking-wider ${
                      isFeatured ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300" : ""
                    }`}
                  >
                    Select Package
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Booking Form Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/80 p-3 sm:p-6 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="flex min-h-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-4xl overflow-hidden rounded-[28px] border-cyan-400/25 bg-[#07111f] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                    Service Inquiry & Booking
                  </span>
                  <h3 className="mt-0.5 font-display text-xl sm:text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {errorMessage && (
                <div className="mx-6 mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-5">
                <div className="grid gap-5 lg:grid-cols-2">
                  {/* Left: Contact Info */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                      1. Contact Information
                    </h4>

                    <div>
                      <Input
                        name="name"
                        placeholder="Your Full Name *"
                        required
                        className="bg-slate-900/80 border-white/10 text-white rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address *"
                        required
                        className="bg-slate-900/80 border-white/10 text-white rounded-xl text-xs sm:text-sm"
                      />
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="WhatsApp / Phone *"
                        required
                        className="bg-slate-900/80 border-white/10 text-white rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <Textarea
                        name="details"
                        rows={4}
                        placeholder="Project description, requirements, or reference links (optional)"
                        className="bg-slate-900/80 border-white/10 text-white rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Right: Payment Method Selector */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                      2. Preferred Payment Option
                    </h4>

                    <div className="space-y-2">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;
                        const isSelected = selectedPayment === method.id;
                        return (
                          <div
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                              isSelected
                                ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                                : "border-white/8 bg-slate-900/50 hover:border-white/15"
                            }`}
                          >
                            <div className={`mt-0.5 rounded-lg p-1.5 ${isSelected ? "bg-cyan-400/20 text-cyan-300" : "bg-white/5 text-slate-400"}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white">{method.title}</span>
                                <span className={`text-[9px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${
                                  isSelected ? "bg-cyan-400/20 text-cyan-300" : "bg-white/5 text-slate-400"
                                }`}>
                                  {method.badge}
                                </span>
                              </div>
                              <p className="mt-0.5 text-[11px] leading-4 text-slate-400">{method.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Submit */}
                <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-400">
                    Est. Quote: <span className="font-bold text-white">{selectedService.price}</span> • Instant tracking code provided on submit.
                  </div>
                  <div className="flex gap-2.5">
                    <Button type="button" variant="secondary" onClick={closeModal} className="text-xs">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={status === "loading"} className="gap-2 px-5 text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                      {status === "loading" ? "Processing..." : "Confirm & Send Inquiry"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* Point 3: Dedicated Essential Confirmation Pop-up Modal */}
      {successOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
          <Card className="w-full max-w-lg overflow-hidden rounded-[30px] border-emerald-400/30 bg-[#07111f] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
            <div className="text-center">
              {/* Success Animated Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                Inquiry Successfully Submitted!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Thank you! I have received your request for{" "}
                <span className="font-semibold text-cyan-300">{successOrder.serviceTitle}</span>.
              </p>

              {/* Tracking Code Highlight Box */}
              <div className="mt-5 rounded-2xl border border-cyan-400/30 bg-slate-900/90 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Your Unique Tracking Code
                </span>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-cyan-300">
                    {successOrder.trackingCode}
                  </span>
                  <button
                    onClick={copyTrackingCode}
                    className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition"
                    title="Copy code"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {copied && (
                  <p className="mt-1 text-[11px] font-medium text-emerald-300">
                    Copied to clipboard!
                  </p>
                )}
              </div>

              {/* Essential Next Steps */}
              <div className="mt-5 space-y-2.5 rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-left text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Turnaround: I usually reply within <strong>24 hours</strong>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>A copy has been recorded to: <strong>{successOrder.clientEmail}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/track-order?code=${successOrder.trackingCode}`}
                  className="flex-1"
                >
                  <Button className="w-full gap-2 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 h-10">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Track Order Live Status
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  onClick={() => setSuccessOrder(null)}
                  className="rounded-xl text-xs h-10 px-5"
                >
                  Done
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
