"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

const toolIcons: Record<string, React.ReactNode> = {
  qrcode: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="2" y="14" width="8" height="8" rx="1" />
      <rect x="5" y="5" width="2" height="2" />
      <rect x="17" y="5" width="2" height="2" />
      <rect x="5" y="17" width="2" height="2" />
      <path d="M14 14h2v2h-2z" />
      <path d="M20 14h2v2h-2z" />
      <path d="M14 20h2v2h-2z" />
      <path d="M20 20h2v2h-2z" />
      <path d="M17 17h2v2h-2z" />
    </svg>
  ),
  counter: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M4 12h12" />
      <path d="M4 17h8" />
      <circle cx="20" cy="17" r="3" />
      <path d="M20 15.5v1.5l1 1" />
    </svg>
  ),
  password: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  ),
  color: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="4.5" />
      <circle cx="17.5" cy="14.5" r="4.5" />
      <circle cx="8.5" cy="14.5" r="4.5" />
    </svg>
  ),
  bmi: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1m-9-9h1m16 0h1" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  textcase: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h7" />
      <path d="M6.5 20V4" />
      <path d="M3 4h7" />
      <path d="M14 20h7" />
      <path d="M17.5 20v-8" />
      <path d="M14 12h7" />
    </svg>
  ),
};

export default function AraclarPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Decorative pinwheels */}
      <div className="absolute top-20 right-8 pointer-events-none">
        <DecorativePinwheel size={120} opacity={0.04} rotate={15} />
      </div>
      <div className="absolute bottom-40 left-4 pointer-events-none">
        <DecorativePinwheel size={80} opacity={0.03} rotate={-20} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <FadeIn className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Ücretsiz Araçlar
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            Online Araçlar
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Reklamsız, kayıt gerektirmeyen, tamamen ücretsiz online araçlar.
            <br />
            Hızlı, güvenli ve sınırsız kullanım.
          </p>
        </FadeIn>

        {/* Tool Cards Grid */}
        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.slug}>
              <Link href={`/araclar/${tool.slug}`} className="block group">
                <div className="relative bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8 hover:border-[#D8FB32]/30 transition-all duration-500 h-full">
                  {/* Corner pinwheel */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <DecorativePinwheel
                      size={24}
                      opacity={0.3}
                      className="group-hover:animate-[spin-slow_3s_linear_infinite]"
                    />
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center text-[#D8FB32] mb-5 group-hover:bg-[#D8FB32]/10 transition-colors duration-300">
                    {toolIcons[tool.icon]}
                  </div>

                  {/* Content */}
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-3">
                    {tool.title}
                  </h2>
                  <p className="text-[#999999] text-sm leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#D8FB32] text-sm font-medium">
                    <span>Kullan</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] bg-[#D8FB32]/15 text-[#D8FB32] px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
                      Ücretsiz
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Bottom Info */}
        <FadeIn className="mt-16 lg:mt-20 text-center">
          <p className="text-[#666666] text-sm">
            Tüm araçlar tarayıcınızda çalışır. Verileriniz sunucuya gönderilmez.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
