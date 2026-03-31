"use client";

import Link from "next/link";
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
      <div className="absolute top-1/2 left-[75%] -translate-y-1/2 pointer-events-none">
        <DecorativePinwheel size={45} opacity={0.14} color="#0A0A0A" rotate={60} />
      </div>

      <FadeIn>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
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
