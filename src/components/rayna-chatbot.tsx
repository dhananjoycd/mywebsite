"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  Wrench, 
  Mail, 
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Formats text cleanly so raw asterisks (**) never appear on screen
function renderFormattedMessage(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function RaynaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello there! 👋 I'm Rayna, Dhananjoy's personal AI assistant.\n\n" +
        "⚡ Notice: Training in Progress\n" +
        "My custom AI neural engine is currently undergoing fine-tuning to better assist you. While I am calibrating, please feel free to browse the portfolio, book a project, or contact Dhananjoy directly!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "🤖 My AI engine is currently in calibration. Please reach out to Dhananjoy directly via email at dhananjoychandradas@gmail.com!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.5)] transition duration-300 hover:scale-110 focus:outline-none"
          aria-label="Open Rayna AI Assistant"
        >
          <span className="absolute -inset-1 animate-ping rounded-full bg-cyan-400 opacity-20 duration-1000" />
          <Bot className="h-6 w-6 text-slate-950 group-hover:rotate-12 transition-transform" />
          {/* Amber badge showing "In Training" */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 border border-slate-900" />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="flex h-[520px] w-[340px] sm:w-[380px] flex-col overflow-hidden rounded-[28px] border-amber-400/30 bg-[#07111f]/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-cyan-500 text-slate-950 font-bold">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-amber-400 border border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm font-bold text-white">Rayna AI</h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.2 text-[9px] font-bold text-amber-300">
                    <Wrench className="h-2.5 w-2.5" /> Training
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Dhananjoy&apos;s Assistant (Beta)</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Training Notification Banner */}
          <div className="bg-amber-400/10 border-b border-amber-400/20 px-4 py-2 flex items-center justify-between text-[11px] text-amber-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
              Model calibration in progress
            </span>
            <span className="text-[10px] opacity-75">v0.9 Beta</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-cyan-400 text-slate-950 font-medium"
                      : "bg-slate-900/90 border border-white/8 text-slate-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{renderFormattedMessage(msg.content)}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-8">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Rayna is consulting model...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Direct Quick Action Buttons for Clients */}
          <div className="p-3 bg-slate-950/80 border-t border-white/8 flex gap-2">
            <a
              href="mailto:dhananjoychandradas@gmail.com"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-white/10 transition"
            >
              <Mail className="h-3 w-3 text-cyan-300" /> Email Direct
            </a>
            <Link
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 py-1.5 text-[11px] font-bold text-slate-950 hover:bg-cyan-300 transition"
            >
              <ShoppingBag className="h-3 w-3" /> Book Service
            </Link>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="border-t border-white/10 p-2.5 bg-slate-900/90 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Rayna (Beta)..."
              className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-8 w-8 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
