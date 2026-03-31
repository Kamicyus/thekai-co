"use client";

import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";

const STEPS = [
  {
    number: "01",
    title: "Keşfet",
    description:
      "İhtiyaçlarınızı dinliyor, hedeflerinizi anlıyoruz. Derinlemesine analiz ile projenin kapsamını belirliyoruz.",
  },
  {
    number: "02",
    title: "Tasarla",
    description:
      "Strateji ve mimariyi oluşturuyoruz. Teknoloji seçimi, içerik planı, görsel kimlik — her detay planlanıyor.",
  },
  {
    number: "03",
    title: "Kur",
    description:
      "Planı hayata geçiriyoruz. Hızlı iterasyonlar, sürekli iletişim. İlerlemeyi birlikte takip ediyoruz.",
  },
  {
    number: "04",
    title: "Eğit",
    description:
      "Sistemi teslim ediyor, ekibinizi eğitiyoruz. Dokümantasyon ve video rehberlerle bağımsız kullanımı sağlıyoruz.",
  },
  {
    number: "05",
    title: "Destek",
    description:
      "Lansman sonrası yanınızdayız. Performans takibi, optimizasyon ve teknik destek.",
  },
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Nasıl Çalışıyoruz
          </h2>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            Her projeye aynı disiplinle yaklaşıyoruz.
          </p>
        </FadeIn>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 lg:gap-6"
          staggerDelay={0.1}
        >
          {STEPS.map((step, i) => (
            <StaggerItem key={step.number} className="relative">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* Number */}
                <span className="text-4xl lg:text-5xl font-black text-[#D8FB32] tracking-[-2px] mb-4 font-sans">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-semibold text-[#F5F5F5] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#999999] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (not on last item, desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 right-0 translate-x-1/2 w-full h-px">
                  <div className="w-full h-px bg-gradient-to-r from-[#1F2937] via-[#D8FB32]/20 to-[#1F2937]" />
                </div>
              )}

              {/* Connector line (mobile only, not on last item) */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <div className="w-px h-8 bg-gradient-to-b from-[#D8FB32]/30 to-[#1F2937]" />
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
