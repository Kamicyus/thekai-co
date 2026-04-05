"use client";

import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { SERVICES } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function Services() {
  const t = useTranslations("services");
  return (
    <section id="hizmetler" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative pinwheel — top-right accent */}
      <div className="absolute top-12 right-8 pointer-events-none">
        <DecorativePinwheel size={80} opacity={0.06} rotate={15} />
      </div>

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

        {/* Cards Grid */}
        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          staggerDelay={0.08}
        >
          {SERVICES.map((service) => {
            const bgMap: Record<string, string> = {
              "ai-ajan-sistemi": "/images/services/ai-ajan.jpg",
              "web-sitesi-tasarimi": "/images/services/web-sitesi.jpg",
              "icerik-uretimi": "/images/services/icerik.jpg",
              "artwork-tasarim": "/images/services/artwork.jpg",
              "sesli-kitap": "/images/services/sesli-kitap.jpg",
              "muzik-produksiyon": "/images/services/muzik.jpg",
              "dijital-strateji": "/images/services/dijital-strateji.jpg",
              "telegram-bot": "/images/services/telegram-bot.jpg",
              "performans-pazarlama": "/images/services/performans-pazarlama.jpg",
              "video-produksiyon": "/images/services/video-produksiyon.jpg",
              "seo-organik-buyume": "/images/services/seo-organik-buyume.jpg",
              "e-ticaret": "/images/services/e-ticaret.jpg",
            };
            return (
            <StaggerItem key={service.title}>
              <Link href={`/hizmetler#${service.slug}`} className="block h-full">
                <div className="group relative flex flex-col h-full p-5 lg:p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-[16px] hover:border-[#D8FB32]/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(216,251,50,0.08)] hover:scale-[1.01] cursor-pointer overflow-hidden">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${bgMap[service.slug] || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* Dark gradient overlay — much darker at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/70 to-[#0A0A0A]/95" />

                  {/* Content — pushed to bottom */}
                  <div className="relative z-10 flex flex-col h-full justify-end">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A]/60 backdrop-blur-sm border border-white/[0.06] flex items-center justify-center mb-3 text-[#D8FB32] group-hover:bg-gradient-to-br group-hover:from-[#D8FB32]/15 group-hover:to-[#D8FB32]/5 transition-all duration-300">
                      <ServiceIcon icon={service.icon} size={22} />
                    </div>

                    {/* Text */}
                    <h3 className="font-sans text-base lg:text-lg font-semibold text-[#F5F5F5] mb-1.5 tracking-[-0.3px]">
                      {t(`items.${service.slug}.title`)}
                    </h3>
                    <p className="text-[#CCCCCC] text-sm leading-relaxed">
                      {t(`items.${service.slug}.description`)}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-3 text-[#D8FB32] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      {t("viewDetails")}
                    </div>
                  </div>

                  {/* Corner accent on hover — pinwheel spins */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <DecorativePinwheel
                      size={18}
                      opacity={0.4}
                      className="group-hover:animate-[spin-slow_3s_linear_infinite]"
                    />
                  </div>
                </div>
              </Link>
            </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
