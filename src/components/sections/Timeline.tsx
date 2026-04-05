"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const MILESTONE_KEYS = ["m1", "m2", "m3", "m4", "m5", "m6", "m7"] as const;

export default function Timeline() {
  const t = useTranslations("timeline");

  return (
    <section className="py-24 lg:py-32 bg-[#0D0D0D]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line — gradient with lime glow */}
          <div className="absolute left-[23px] lg:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#D8FB32]/60 via-[#D8FB32]/20 to-[#1F2937]/20 shadow-[0_0_8px_rgba(216,251,50,0.15)]" />

          <div className="space-y-12">
            {MILESTONE_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="relative flex items-start gap-6 lg:gap-8">
                  {/* Pinwheel dot — snaps 72deg on hover */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div className="ring-4 ring-[#0D0D0D] rounded-full transition-transform duration-300 hover:rotate-[72deg] cursor-default">
                      <DecorativePinwheel size={14} opacity={1} />
                    </div>
                  </div>

                  {/* Content — glassmorphism card */}
                  <div className="pb-2 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 lg:p-5 hover:border-white/[0.1] transition-all duration-300">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-[#D8FB32] bg-[#D8FB32]/10 border border-[#D8FB32]/20 mb-2 tracking-wide">
                      {t(`milestones.${key}.year`)}
                    </span>
                    <h3 className="text-lg lg:text-xl font-semibold text-[#F5F5F5] mb-1">
                      {t(`milestones.${key}.title`)}
                    </h3>
                    <p className="text-[#999999] text-base leading-relaxed">
                      {t(`milestones.${key}.description`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
