"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";

const HIGHLIGHT_KEYS = ["item1", "item2", "item3", "item4"] as const;

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="hakkinda" className="py-24 lg:py-32">
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Story (3/5 width) */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.1}>
              <div className="space-y-5 text-[#999999] text-base sm:text-lg leading-relaxed">
                <p>{t("paragraph1")}</p>
                <p>{t("paragraph2")}</p>
                <p>{t("paragraph3")}</p>
              </div>
            </FadeIn>

            {/* Quote Highlight */}
            <FadeIn delay={0.2}>
              <div className="mt-10 pl-6 border-l-2 border-[#D8FB32]">
                <p className="text-xl lg:text-2xl font-medium italic leading-relaxed bg-gradient-to-b from-[#F5F5F5] to-[#666666] bg-clip-text text-transparent">
                  &ldquo;{t("quote")}&rdquo;
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: Founder Card (2/5 width) */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.3} direction="left">
              <div className="bg-[#141414] border border-transparent rounded-[20px] p-6 sm:p-8 lg:p-10 relative" style={{ backgroundImage: 'linear-gradient(#141414, #141414), linear-gradient(135deg, rgba(216,251,50,0.3), transparent 50%, rgba(216,251,50,0.05))', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', borderWidth: '1px' }}>
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full scale-150 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(216,251,50,0.15) 0%, transparent 70%)' }} />
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D8FB32]/40 shadow-[0_0_20px_rgba(216,251,50,0.15)]">
                      <Image src="/images/kamer.png" alt="Kamer" width={64} height={64} className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[#F5F5F5] font-semibold text-lg">
                      Kamer
                    </p>
                    <p className="text-[#999999] text-sm">
                      {t("founderRole")}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  {HIGHLIGHT_KEYS.map((key) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 py-3 border-b border-[#1F2937]/50 last:border-0"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D8FB32] flex-shrink-0 shadow-[0_0_8px_rgba(216,251,50,0.5)]" />
                      <span className="text-[#F5F5F5] text-base font-medium">
                        {t(`highlights.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
