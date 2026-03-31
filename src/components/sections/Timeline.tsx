"use client";

import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const MILESTONES = [
  {
    year: "2011",
    title: "Başlangıç",
    description: "Kurucu Kamer Can İzvermez'in müzik yolculuğu başladı.",
  },
  {
    year: "2024",
    title: "Echo Bazaar",
    description:
      "The Kai'nin ilk büyük projesi: AI müzik kanalı kuruldu.",
  },
  {
    year: "2025",
    title: "15 Milyon+",
    description:
      "Echo Bazaar 15 milyon dinlenmeyi aştı. KİM? albümü yayınlandı.",
  },
  {
    year: "2025",
    title: "AI Altyapı",
    description:
      "72+ AI ajan sistemi kuruldu. Operasyonlar tamamen otomatize edildi.",
  },
  {
    year: "2026",
    title: "The Kai",
    description:
      "Şirket resmi olarak kuruldu. thekai.co yayına girdi.",
  },
  {
    year: "2026",
    title: "MURMUR",
    description:
      "Sesli kitap yayınevi projesi başlatıldı. Yeni dünyalar kurmaya devam.",
  },
];

export default function Timeline() {
  return (
    <section className="py-24 lg:py-32 bg-[#0D0D0D]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Yolculuk
          </h2>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            Bir fikrin stüdyoya dönüşme hikâyesi.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[23px] lg:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#D8FB32]/40 via-[#1F2937] to-[#1F2937]/20" />

          <div className="space-y-12">
            {MILESTONES.map((milestone, i) => (
              <FadeIn key={`${milestone.year}-${milestone.title}`} delay={i * 0.1}>
                <div className="relative flex items-start gap-6 lg:gap-8">
                  {/* Pinwheel dot — snaps 72deg on hover */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div className="ring-4 ring-[#0D0D0D] rounded-full transition-transform duration-300 hover:rotate-[72deg] cursor-default">
                      <DecorativePinwheel size={14} opacity={1} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <span className="inline-block text-sm font-bold text-[#D8FB32] mb-1 tracking-wide">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg lg:text-xl font-semibold text-[#F5F5F5] mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-[#999999] text-base leading-relaxed">
                      {milestone.description}
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
