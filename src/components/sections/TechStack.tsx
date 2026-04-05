"use client";

import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { useTranslations } from "next-intl";

const TECH_ITEMS = [
  { key: "claudeAi", name: "Claude AI" },
  { key: "nextjs", name: "Next.js" },
  { key: "typescript", name: "TypeScript" },
  { key: "tailwind", name: "Tailwind CSS" },
  { key: "supabase", name: "Supabase" },
  { key: "vercel", name: "Vercel" },
  { key: "framerMotion", name: "Framer Motion" },
  { key: "telegramApi", name: "Telegram API" },
  { key: "sunoAi", name: "Suno AI" },
  { key: "elevenlabs", name: "ElevenLabs" },
  { key: "spotifyApi", name: "Spotify API" },
  { key: "youtubeApi", name: "YouTube API" },
];

export default function TechStack() {
  const t = useTranslations("techStack");

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background watermark pinwheel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <DecorativePinwheel size={560} opacity={0.02} rotate={20} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        {/* Section Title */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Tech Grid */}
        <StaggerChildren
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
          staggerDelay={0.06}
        >
          {TECH_ITEMS.map((item) => (
            <StaggerItem key={item.key}>
              <div className="group relative flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-[16px] hover:border-[#D8FB32]/30 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(216,251,50,0.08)]">
                {/* Tiny pinwheel — fades in on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <DecorativePinwheel
                    size={14}
                    opacity={0.35}
                    className="group-hover:animate-[spin-slow_4s_linear_infinite]"
                  />
                </div>
                <span className="text-[#F5F5F5] font-semibold text-base mb-1">
                  {item.name}
                </span>
                <span className="text-[#999999] text-xs lg:text-sm">
                  {t(`items.${item.key}`)}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
