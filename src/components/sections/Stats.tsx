"use client";

import { useTranslations } from "next-intl";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const STAT_ITEMS = [
  { value: "20M+", key: "streams" },
  { value: "72+", key: "agents" },
  { value: "6", key: "services" },
  { value: "\u221E", key: "tools" },
] as const;

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="w-full bg-[#111111] border-y border-white/[0.06] relative overflow-hidden">
      {/* Subtle radial lime glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(216,251,50,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <StaggerChildren
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          staggerDelay={0.1}
        >
          {STAT_ITEMS.map((stat, i) => (
            <StaggerItem key={stat.key} className="text-center relative">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#D8FB32] tracking-[-2px] mb-2 font-sans" style={{ textShadow: '0 0 40px rgba(216,251,50,0.3)' }}>
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-[#999999] font-medium">
                {t(stat.key)}
              </div>
              {/* Pinwheel divider (not on last item) */}
              {i < STAT_ITEMS.length - 1 && (
                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex-col items-center gap-1">
                  <div className="w-px h-4 bg-white/[0.06]" />
                  <div className="hover:scale-125 transition-transform duration-300 cursor-default">
                    <DecorativePinwheel size={16} opacity={0.3} />
                  </div>
                  <div className="w-px h-4 bg-white/[0.06]" />
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
