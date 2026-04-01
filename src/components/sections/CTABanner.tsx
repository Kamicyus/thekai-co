"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function CTABanner() {
  return (
    <section
      id="cta"
      className="w-full py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #D8FB32 0%, #5532FA 100%)",
      }}
    >
      {/* Scattered dark pinwheel decorations */}
      <div className="absolute top-8 left-[10%] pointer-events-none">
        <DecorativePinwheel size={60} opacity={0.12} color="#0A0A0A" rotate={25} />
      </div>
      <div className="absolute bottom-12 right-[15%] pointer-events-none">
        <DecorativePinwheel size={90} opacity={0.1} color="#0A0A0A" rotate={-15} />
      </div>

      {/* Dark orbiting planets — "Dünyalar" theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
        {/* Dark Neptune */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -350, left: -10 }}>
            <div className="w-6 h-6 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle at 30% 30%, #1a2a4a, #0a0a2a)" }}
            />
          </div>
        </motion.div>

        {/* Dark Saturn */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -300, left: -10 }}>
            <div className="relative">
              <div className="w-5 h-5 rounded-full opacity-12"
                style={{ background: "radial-gradient(circle at 30% 30%, #3a3020, #1a1808)" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 rounded-full border border-[#0A0A0A]/15 -rotate-[25deg]" />
            </div>
          </div>
        </motion.div>

        {/* Dark Jupiter */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -250, left: -12 }}>
            <div className="w-7 h-7 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle at 30% 30%, #2a2010, #0a0a04)" }}
            />
          </div>
        </motion.div>

        {/* Dark Mars */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -200, left: -6 }}>
            <div className="w-4 h-4 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle at 30% 30%, #3a1a10, #1a0808)" }}
            />
          </div>
        </motion.div>
      </div>

      <FadeIn>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0A0A0A] tracking-[-0.02em] mb-6 max-w-3xl mx-auto leading-tight">
            Bir Sonraki Dünyanızı<br className="hidden sm:block" /> Birlikte Kuralım
          </h2>
          <p className="text-[#0A0A0A]/70 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
            Projenizi konuşalım. Müzik, teknoloji veya yaratıcı içerik — farketmez.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-[#0A0A0A] text-[#D8FB32] font-semibold rounded-[10px] text-base hover:bg-[#1A1A1A] hover:scale-[1.02] transition-all duration-200 shadow-xl"
          >
            İletişime Geç
            <span className="animate-[spin-slow_3s_linear_infinite] inline-flex">
              <DecorativePinwheel size={16} opacity={0.9} />
            </span>
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
