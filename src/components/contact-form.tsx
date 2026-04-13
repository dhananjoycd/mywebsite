"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      form.reset();
      setStatus("success");
      setMessage("Message sent successfully. I usually reply within 24 hours.");
      return;
    }

    setStatus("error");
    setMessage("Message couldn't be sent right now. Please try again later.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Your Name" required />
        <Input name="email" type="email" placeholder="Email Address" required />
      </div>
      <Input name="subject" placeholder="Project Subject" required />
      <Textarea name="message" placeholder="Tell me about your idea..." required />
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
      {message ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-cyan-300" : "text-rose-300"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
