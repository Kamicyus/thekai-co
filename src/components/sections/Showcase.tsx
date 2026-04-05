"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const PROJECT_KEYS = [
  "echo-bazaar",
  "prime-beats",
  "lofi-reworks",
  "kim-jung-vada",
  "eksi-maya-sports",
  "murmur",
] as const;

const PROJECT_META: Record<string, {
  title: string;
  accentFrom: string;
  accentTo: string;
  decoration: "pinwheel" | "waves" | "circuit";
  image: string;
  href?: string;
}> = {
  "echo-bazaar": {
    title: "Echo Bazaar",
    accentFrom: "#D8FB32",
    accentTo: "#2DD4BF",
    decoration: "pinwheel",
    image: "/images/projects/echo-bazaar-logo.jpg",
  },
  "prime-beats": {
    title: "Prime Beats",
    accentFrom: "#F59E0B",
    accentTo: "#EC4899",
    decoration: "waves",
    image: "/images/projects/prime-beats.jpg",
  },
  "lofi-reworks": {
    title: "Lofi Reworks",
    accentFrom: "#8B5CF6",
    accentTo: "#EC4899",
    decoration: "waves",
    image: "/images/projects/lofi-reworks.jpg",
  },
  "kim-jung-vada": {
    title: "Kim Jung Vada",
    accentFrom: "#EF4444",
    accentTo: "#F59E0B",
    decoration: "waves",
    image: "/images/projects/kimjungvada.jpg",
    href: "/portfolyo",
  },
  "eksi-maya-sports": {
    title: "Eksi Maya Sports",
    accentFrom: "#06B6D4",
    accentTo: "#D8FB32",
    decoration: "circuit",
    image: "/images/projects/eksi-maya-sports.jpg",
  },
  "murmur": {
    title: "Murmur",
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
    decoration: "waves",
    image: "/images/projects/murmur.jpg",
  },
};

export default function Showcase() {
  const t = useTranslations("showcase");

  return (
    <section id="portfolyo" className="py-24 lg:py-32 bg-[#0D0D0D]">
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

        {/* Project Grid */}
        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          staggerDelay={0.12}
        >
          {PROJECT_KEYS.map((key) => {
            const project = PROJECT_META[key];
            const category = t(`projects.${key}.category`);
            const description = t(`projects.${key}.description`);
            const metric = t(`projects.${key}.metric`);
            const Wrapper = project.href ? ({ children, className }: { children: React.ReactNode; className: string }) => <Link href={project.href!} className={className}>{children}</Link> : ({ children, className }: { children: React.ReactNode; className: string }) => <div className={className}>{children}</div>;
            return (
            <StaggerItem key={key}>
              <Wrapper className="group relative flex flex-col h-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-[20px] overflow-hidden hover:border-[#D8FB32]/40 transition-all duration-300 hover:shadow-[0_16px_50px_rgba(216,251,50,0.12),0_0_0_1px_rgba(216,251,50,0.08)] hover:-translate-y-1">
                {/* Header Area — Image or Gradient */}
                {project.image ? (
                  <div className="relative h-[160px] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Subtle dark overlay for badge readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/30" />
                    {/* Category badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0A0A0A]/60 backdrop-blur-lg text-[#D8FB32] border border-white/[0.08]">
                        {category}
                      </span>
                    </div>
                    {/* Metric badge */}
                    <div className="absolute bottom-6 right-6 z-10">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold text-[#F5F5F5] bg-white/[0.08] backdrop-blur-lg border border-white/[0.1] shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                        {metric}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="h-[160px] w-full relative"
                    style={{
                      background: `linear-gradient(135deg, ${project.accentFrom}15 0%, ${project.accentTo}15 100%)`,
                    }}
                  >
                    {/* Floating accent orb */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle, ${project.accentFrom} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Card-specific decorative element */}
                    {project.decoration === "waves" && (
                      <svg className="absolute bottom-4 left-0 w-full pointer-events-none" height="40" viewBox="0 0 300 40" preserveAspectRatio="none" style={{ opacity: 0.1 }}>
                        <path d="M0 20 Q30 5 60 20 T120 20 T180 20 T240 20 T300 20" fill="none" stroke={project.accentFrom} strokeWidth="1.5" />
                        <path d="M0 28 Q30 15 60 28 T120 28 T180 28 T240 28 T300 28" fill="none" stroke={project.accentTo} strokeWidth="1" />
                      </svg>
                    )}
                    {project.decoration === "circuit" && (
                      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.1 }}>
                        <circle cx="20" cy="20" r="3" fill={project.accentFrom} />
                        <circle cx="60" cy="20" r="3" fill={project.accentTo} />
                        <circle cx="40" cy="60" r="3" fill={project.accentFrom} />
                        <circle cx="40" cy="40" r="4" fill={project.accentTo} />
                        <line x1="20" y1="20" x2="40" y2="40" stroke={project.accentFrom} strokeWidth="0.8" />
                        <line x1="60" y1="20" x2="40" y2="40" stroke={project.accentTo} strokeWidth="0.8" />
                        <line x1="40" y1="40" x2="40" y2="60" stroke={project.accentFrom} strokeWidth="0.8" />
                        <line x1="20" y1="20" x2="60" y2="20" stroke={project.accentFrom} strokeWidth="0.5" strokeDasharray="4 3" />
                      </svg>
                    )}
                    {/* Hover pinwheel — fades in and spins on card hover */}
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <DecorativePinwheel
                        size={28}
                        opacity={0.25}
                        className="animate-[spin-slow_4s_linear_infinite]"
                      />
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0A0A0A]/60 backdrop-blur-lg text-[#D8FB32] border border-white/[0.08]">
                        {category}
                      </span>
                    </div>
                    {/* Metric badge */}
                    <div className="absolute bottom-6 right-6">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold text-[#F5F5F5] bg-white/[0.08] backdrop-blur-lg border border-white/[0.1] shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                        {metric}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 sm:p-8 flex flex-col flex-1">
                  <h3 className="font-sans text-xl lg:text-2xl font-semibold text-[#F5F5F5] mb-3 tracking-[-0.5px]">
                    {project.title}
                  </h3>
                  <p className="text-[#999999] text-base leading-relaxed flex-1">
                    {description}
                  </p>
                  <div className="mt-4 text-[#D8FB32] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    View Project <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </Wrapper>
            </StaggerItem>
            );
          })}
        </StaggerChildren>

      </div>
    </section>
  );
}
