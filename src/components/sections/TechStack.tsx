"use client";

import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const TECH_ITEMS = [
  { name: "Claude AI", description: "AI ajan orkestrasyon" },
  { name: "Next.js", description: "Modern web framework" },
  { name: "TypeScript", description: "Tip güvenli kod" },
  { name: "Tailwind CSS", description: "Utility-first stil" },
  { name: "Supabase", description: "Veritabanı & auth" },
  { name: "Vercel", description: "Deploy & hosting" },
  { name: "Framer Motion", description: "Animasyonlar" },
  { name: "Telegram API", description: "Bot entegrasyonu" },
  { name: "Suno AI", description: "AI müzik üretimi" },
  { name: "ElevenLabs", description: "AI seslendirme" },
  { name: "Spotify API", description: "Müzik dağıtım" },
  { name: "YouTube API", description: "İçerik yönetimi" },
];

export default function TechStack() {
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
            Teknoloji Yığınımız
          </h2>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            En iyi araçlarla, en iyi sonuçlar.
          </p>
        </FadeIn>

        {/* Tech Grid */}
        <StaggerChildren
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5"
          staggerDelay={0.06}
        >
          {TECH_ITEMS.map((item) => (
            <StaggerItem key={item.name}>
              <div className="group relative flex flex-col items-center justify-center text-center p-6 lg:p-8 bg-[#141414] border border-[#1F2937] rounded-[16px] hover:border-[#D8FB32]/20 transition-all duration-300 hover:bg-[#1A1A1A]">
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
                  {item.description}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
