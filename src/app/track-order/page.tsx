"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Loader2, ArrowLeft, CheckCircle2, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClickRipple } from "@/components/click-ripple";
import { ScrollBackground } from "@/components/scroll-background";

type TrackedOrder = {
  trackingCode: string;
  clientName: string;
  serviceTitle: string;
  servicePrice: string;
  status: string;
  quotationAmount: string | null;
  quotationNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

const STATUS_STEPS = ["PENDING", "REVIEWED", "IN_PROGRESS", "COMPLETED"];

export default function TrackOrderPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/track-order?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Order not found");
      setOrder(data.order);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to find order";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050b19_0%,#030816_100%)] text-slate-100">
      <ScrollBackground variant="home" />
      <ClickRipple />

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="secondary" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            <Clock className="h-3.5 w-3.5" />
            Live Client Portal
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Track Service Order & Quote
          </h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Enter the unique tracking code you received upon booking your project to view live development status and delivery updates.
          </p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-8 flex gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. ORD-1741234567-ABCD"
            className="flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 font-mono text-sm uppercase text-white placeholder-slate-500 backdrop-blur-xl focus:border-cyan-400 focus:outline-none"
            required
          />
          <Button type="submit" disabled={isLoading} className="gap-2 px-6">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Track
          </Button>
        </form>

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-200">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <Card className="mt-8 overflow-hidden rounded-3xl border-cyan-400/20 bg-slate-950/80 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-2 border-b border-white/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-xs text-cyan-300">TRACKING CODE: {order.trackingCode}</span>
                <h2 className="mt-1 font-display text-2xl font-bold text-white">{order.serviceTitle}</h2>
                <p className="text-xs text-slate-400">Client: {order.clientName}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {order.status.replace("_", " ")}
                </span>
                <p className="mt-2 text-xs text-slate-400">
                  Updated: {new Date(order.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">Milestone Progress</p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {STATUS_STEPS.map((step, idx) => {
                  const stepIndex = STATUS_STEPS.indexOf(order.status);
                  const isDone = stepIndex >= idx;
                  const isCurrent = order.status === step;

                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition ${
                          isDone
                            ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                            : "border-white/10 bg-white/5 text-slate-500"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span className={`mt-2 text-[10px] uppercase tracking-wider ${isCurrent ? "font-semibold text-cyan-300" : "text-slate-400"}`}>
                        {step.replace("_", " ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quote and Notes Section */}
            {(order.quotationAmount || order.quotationNotes) && (
              <div className="mt-8 rounded-2xl border border-white/8 bg-slate-900/60 p-5">
                <h3 className="font-display font-semibold text-white">Developer Note & Quotation</h3>
                {order.quotationAmount && (
                  <p className="mt-2 text-sm text-cyan-300">
                    Official Quote: <span className="font-semibold text-white">{order.quotationAmount}</span>
                  </p>
                )}
                {order.quotationNotes && (
                  <p className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-slate-300 border-t border-white/6 pt-3">
                    {order.quotationNotes}
                  </p>
                )}
              </div>
            )}
          </Card>
        )}
      </div>
    </main>
  );
}

