"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  title: string;
  description: string;
  points: string[];
  price: string;
};

const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Modern, responsive interfaces for landing pages, business websites, and product-focused web experiences.",
    points: ["Landing pages", "Business websites", "Dashboard UI", "Responsive redesign"],
    price: "Starting from $80",
  },
  {
    title: "Full Stack Web Apps",
    description:
      "Complete web application development with scalable frontend structure, backend logic, and deployment-ready setup.",
    points: ["Custom web apps", "Authentication", "API integration", "Database setup"],
    price: "Starting from $150",
  },
  {
    title: "Portfolio Websites",
    description:
      "Professional personal websites for students, job seekers, and creators who want a strong digital presence.",
    points: ["Personal branding", "Project showcase", "Resume integration", "Mobile-first UI"],
    price: "Starting from $60",
  },
  {
    title: "Bug Fix & UI Improvement",
    description:
      "Targeted improvements for existing projects, including layout fixes, visual polish, and better usability.",
    points: ["Responsive fixes", "UI polish", "Performance cleanup", "Small feature updates"],
    price: "Starting from $25",
  },
];

type OrderStatus = "idle" | "loading" | "success" | "error";
type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [status, setStatus] = useState<OrderStatus>("idle");
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!selectedService) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedService(null);
        setStatus("idle");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService]);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedService || status === "loading") return;

    setStatus("loading");
    const form = event.currentTarget;
    const activeService = selectedService;

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      details: formData.get("details"),
      serviceTitle: activeService.title,
      servicePrice: activeService.price,
      servicePoints: activeService.points,
    };

    try {
      const response = await fetch("/api/service-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (response.ok) {
        form.reset();
        setStatus("success");
        setToast({
          type: "success",
          message: "Order request sent successfully. I will contact you soon.",
        });
        closeModal(true);
        return;
      }

      setStatus("error");
      setToast({
        type: "error",
        message: result?.error ?? "Order request could not be sent right now.",
      });
      closeModal(true);
    } catch {
      setStatus("error");
      setToast({
        type: "error",
        message: "Order request could not be sent right now.",
      });
      closeModal(true);
    }
  }

  function closeModal(scrollToServices = false) {
    setSelectedService(null);
    setStatus("idle");

    if (scrollToServices) {
      window.setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
    }
  }

  return (
    <>
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="What I can help you build"
            description="Professional web services for clients, businesses, and personal brands looking for clear structure, practical execution, and reliable delivery."
          />
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Starting prices give a quick estimate. Final cost depends on project scope,
            feature depth, and delivery timeline.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <Card className="flex h-full flex-col rounded-[30px] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Service</p>
              <h3 className="mt-4 font-display text-xl font-medium text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {service.description}
              </p>
              <div className="mt-5 space-y-3">
                {service.points.map((point) => (
                  <div key={point} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="mt-0.5 rounded-full border border-cyan-400/15 bg-cyan-400/10 p-1 text-cyan-300">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/80">
                    Pricing
                  </p>
                  <p className="mt-2 font-display text-lg font-medium text-cyan-100">
                    {service.price}
                  </p>
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="mt-4 w-full"
                  onClick={() => {
                    setSelectedService(service);
                    setStatus("idle");
                  }}
                >
                  Request This Service
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {selectedService ? (
        <div
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-slate-950/80 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5 md:px-6 md:py-8"
          onClick={() => closeModal()}
        >
          <div
            className="flex min-h-full w-full items-start justify-center md:items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="w-full max-w-3xl py-2 sm:py-3 md:py-0"
              onClick={(event) => event.stopPropagation()}
            >
              <Card className="overflow-hidden border-white/10 bg-[#07111f]/95">
                <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                      Service Order
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">
                      {selectedService.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:leading-7">
                      {selectedService.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => closeModal()}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
                    aria-label="Close service order modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid max-h-[calc(100vh-7.5rem)] gap-4 overflow-y-auto overscroll-contain px-4 py-4 sm:max-h-[calc(100vh-8.5rem)] sm:gap-5 sm:px-6 sm:py-5 md:max-h-[min(720px,calc(100vh-11rem))] md:px-8 md:py-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
                  <div className="rounded-[26px] border border-cyan-400/10 bg-slate-950/45 p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                      Selected Package
                    </p>
                    <p className="mt-4 font-display text-lg font-medium text-white sm:text-xl">
                      {selectedService.price}
                    </p>
                    <div className="mt-5 space-y-3">
                      {selectedService.points.map((point) => (
                        <div key={point} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className="mt-0.5 rounded-full border border-cyan-400/15 bg-cyan-400/10 p-1 text-cyan-300">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-sm leading-7 text-slate-400">
                      Submit your details and I will reply by email with the next steps,
                      timeline, and a final quote based on your exact requirements.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 pb-1">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input name="name" placeholder="Your Name" required maxLength={100} />
                      <Input name="email" type="email" placeholder="Email Address" required maxLength={160} />
                    </div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      required
                      maxLength={30}
                    />
                    <Textarea
                      name="details"
                      placeholder="Tell me a little about your project, goal, or expected features..."
                      maxLength={1200}
                      className="min-h-28 sm:min-h-32"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                      {status === "loading" ? "Sending Order..." : "Submit Order Request"}
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end">
          <div
            className={`pointer-events-auto w-full max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:w-auto ${
              toast.type === "success"
                ? "border-cyan-400/25 bg-cyan-400/12 text-cyan-50"
                : "border-rose-400/25 bg-rose-400/12 text-rose-50"
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </>
  );
}
