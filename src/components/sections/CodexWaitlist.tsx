"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function CodexWaitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/codex/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "codex_landing" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus("ok");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <section className="bg-[#0A0A0A] border-t border-[#1F1F1D]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-28">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[#D8FB32] mb-6">
          Join the list
        </div>
        <h2 className="font-semibold text-[40px] sm:text-[56px] leading-[1.02] tracking-[-1.5px] text-[#F5F5F0] mb-8 max-w-[620px]">
          Get Issue №01{" "}
          <span
            className="italic font-normal text-[#D8FB32]"
            style={{ fontFamily: "'Iowan Old Style', Georgia, serif" }}
          >
            the day it drops
          </span>
          .
        </h2>
        <p className="text-[16px] leading-[1.6] text-[#A8A8A0] max-w-[560px] mb-10">
          Early readers get a free preview chapter and a price guaranteed at
          launch. We will not email you about anything else; no sales pitches,
          no tripwires.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-[540px]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@creator.email"
            disabled={status === "loading" || status === "ok"}
            className="flex-1 bg-transparent border border-[#1F1F1D] rounded-md px-4 py-3.5 text-[15px] text-[#F5F5F0] placeholder-[#5A5A55] focus:outline-none focus:border-[#D8FB32] transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "ok"}
            className="bg-[#D8FB32] text-[#0A0A0A] font-semibold text-[15px] px-6 py-3.5 rounded-md hover:bg-[#E4FF4A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading"
              ? "Adding…"
              : status === "ok"
                ? "On the list ✓"
                : "Get the issue"}
          </button>
        </form>

        {status === "error" ? (
          <p className="mt-4 font-mono text-[11px] text-[#FF6B6B]">
            {errorMsg === "invalid_email"
              ? "That does not look like a valid email."
              : `Something broke: ${errorMsg}. Try again in a minute.`}
          </p>
        ) : null}
        {status === "ok" ? (
          <p className="mt-4 font-mono text-[11px] text-[#D8FB32]">
            Added. Preview chapter hits your inbox on drop day.
          </p>
        ) : null}

        <div className="mt-16 pt-8 border-t border-[#1F1F1D] flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[1.4px] uppercase text-[#5A5A55]">
          <span>Kai</span>
          <span>·</span>
          <a
            href="mailto:hello@thekai.co"
            className="text-[#A8A8A0] border-b border-[#1F1F1D] hover:text-[#D8FB32] hover:border-[#D8FB32]"
          >
            hello@thekai.co
          </a>
          <span>·</span>
          <span>Codex takedown &lt; 72h</span>
        </div>
      </div>
    </section>
  );
}
