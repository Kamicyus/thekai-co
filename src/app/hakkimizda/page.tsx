"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

/* ─── Data ─── */

const MILESTONES = [
  {
    year: "2011",
    title: "Ilk Adim",
    text: "Kamer Can Izvermez muzik yolculuguna sarki yazarak basladi.",
  },
  {
    year: "2011 \u2013 2023",
    title: "Cok Yonlu Deneyim",
    text: "Dergi editorlugu, call center, spor ajansi sosyal medya yonetimi \u2014 hep muzik yaninda.",
  },
  {
    year: "2023",
    title: "AI Donusumu",
    text: "AI araclarini is sureclerine entegre etmeye basladi. Otomasyon ve ajan sistemleri kuruldu.",
  },
  {
    year: "2024",
    title: "Echo Bazaar",
    text: "AI muzik kanali kuruldu. YouTube'da yukselis basladi.",
  },
  {
    year: "2025",
    title: "Buyume",
    text: "20M+ dinlenme, KIM? albumu Spotify Kesif playlist'inde, 72+ AI ajan sistemi.",
  },
  {
    year: "2026",
    title: "The Kai",
    text: "Sirket resmi olarak kuruldu. thekai.co yayinda. Muzik, teknoloji ve yaraticilik bir arada.",
  },
];

const STATS = [
  { value: "20M+", label: "Toplam Dinlenme" },
  { value: "72+", label: "AI Ajan" },
  { value: "9", label: "Hizmet Alani" },
  { value: "16", label: "Ucretsiz Arac" },
];

const VALUES = [
  {
    title: "Yaraticilik",
    description: "Her proje bir dunya. Kurallarini biz koyariz, hikayesini birlikte yazariz.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    title: "Teknoloji",
    description: "AI-native yaklasim. 72+ ajan, otomasyon pipeline'lari, MCP entegrasyonlari.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    title: "Kalite",
    description: "Detaylara takintili ozen. Her piksel, her nota, her satir kod \u2014 onemli.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "Seffaflik",
    description: "Net iletisim, durust fiyatlandirma. Surpriz yok, gizli maliyet yok.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
];

const SOCIAL_FOUNDER = [
  { label: "X", href: "https://x.com/kamicyus", icon: "x" },
  { label: "Instagram", href: "https://instagram.com/kamicyus", icon: "instagram" },
  { label: "Spotify", href: "https://open.spotify.com/artist/1pBLC0qVJO0GLmJgrsFVLH", icon: "spotify" },
  { label: "YouTube", href: "https://youtube.com/@kamicyus", icon: "youtube" },
];

/* ─── Component ─── */

export default function HakkimizdaPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-[10%] pointer-events-none">
          <DecorativePinwheel size={140} opacity={0.04} color="#D8FB32" rotate={15} animate />
        </div>
        <div className="absolute bottom-10 left-[5%] pointer-events-none">
          <DecorativePinwheel size={80} opacity={0.03} color="#D8FB32" rotate={-30} animate reverse />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8FB32]/20 bg-[#D8FB32]/5 mb-8">
              <DecorativePinwheel size={14} opacity={0.8} />
              <span className="text-[#D8FB32] text-sm font-medium tracking-wide">Hakkimizda</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F5F5F5] tracking-[-0.03em] mb-6 leading-[1.1]">
              The Kai Hakkinda
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#999999] text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
              Muzik, teknoloji ve yaraticilik kesisiminde bir studyo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Hikaye / Timeline ── */}
      <section className="py-24 lg:py-32 bg-[#0D0D0D]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
              Yolculuk
            </h2>
            <p className="text-[#999999] text-lg max-w-lg mx-auto">
              Bir fikrin studyoya donusme hikayesi.
            </p>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[23px] lg:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#D8FB32]/40 via-[#1F2937] to-[#1F2937]/20" />

            <div className="space-y-12">
              {MILESTONES.map((milestone, i) => (
                <FadeIn key={milestone.year + milestone.title} delay={i * 0.08}>
                  <div className="relative flex items-start gap-6 lg:gap-8">
                    <div className="relative z-10 flex-shrink-0 mt-1">
                      <div className="ring-4 ring-[#0D0D0D] rounded-full transition-transform duration-300 hover:rotate-[72deg] cursor-default">
                        <DecorativePinwheel size={14} opacity={1} />
                      </div>
                    </div>
                    <div className="pb-2">
                      <span className="inline-block text-sm font-bold text-[#D8FB32] mb-1 tracking-wide">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg lg:text-xl font-semibold text-[#F5F5F5] mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-[#999999] text-base leading-relaxed">
                        {milestone.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Rakamlar ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em]">
              Rakamlarla The Kai
            </h2>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8 text-center hover:border-[#D8FB32]/30 transition-colors duration-300">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D8FB32] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[#999999] text-sm sm:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Kurucu ── */}
      <section className="py-24 lg:py-32 bg-[#0D0D0D]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
              Kurucu
            </h2>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 lg:p-12 relative overflow-hidden">
                {/* Decorative pinwheel */}
                <div className="absolute -top-6 -right-6 pointer-events-none">
                  <DecorativePinwheel size={120} opacity={0.04} color="#D8FB32" rotate={20} />
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#D8FB32]/30 shadow-lg shadow-[#D8FB32]/5">
                      <Image
                        src="/images/kamer.png"
                        alt="Kamer Can Izvermez"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-1">
                      Kamer Can Izvermez
                    </h3>
                    <p className="text-[#D8FB32] text-sm font-medium tracking-wide mb-4">
                      Founder &amp; Creative Director
                    </p>
                    <p className="text-[#999999] text-base leading-relaxed mb-6">
                      Muzisyen, soz yazari, besteci ve AI girisimci. 15 yillik sarki
                      yazma deneyimi, 20M+ dinlenme, 72+ AI ajan sistemi. Echo Bazaar
                      kurucusu, KIM? albumunun yaraticisi. Muzik, teknoloji ve
                      yaraticiligi birlestirerek The Kai&apos;yi kurdu.
                    </p>

                    {/* Social links */}
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      {SOCIAL_FOUNDER.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#1F2937]/50 flex items-center justify-center text-[#999999] hover:text-[#D8FB32] hover:bg-[#D8FB32]/10 transition-all duration-200"
                          aria-label={social.label}
                        >
                          {social.icon === "x" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {social.icon === "instagram" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="2" width="20" height="20" rx="5" />
                              <circle cx="12" cy="12" r="5" />
                              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                          )}
                          {social.icon === "spotify" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                          )}
                          {social.icon === "youtube" && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Degerlerimiz ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16 lg:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
              Degerlerimiz
            </h2>
            <p className="text-[#999999] text-lg max-w-lg mx-auto">
              Her kararin arkasindaki dort ilke.
            </p>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {VALUES.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8 hover:border-[#D8FB32]/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#D8FB32]/10 flex items-center justify-center mb-5 group-hover:bg-[#D8FB32]/20 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#999999] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="w-full py-24 lg:py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #D8FB32 0%, #5532FA 100%)",
        }}
      >
        <div className="absolute top-8 left-[10%] pointer-events-none">
          <DecorativePinwheel size={60} opacity={0.12} color="#0A0A0A" rotate={25} />
        </div>
        <div className="absolute bottom-12 right-[15%] pointer-events-none">
          <DecorativePinwheel size={90} opacity={0.1} color="#0A0A0A" rotate={-15} />
        </div>

        <FadeIn>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0A0A0A] tracking-[-0.02em] mb-6 max-w-3xl mx-auto leading-tight">
              Bir Sonraki Projenizi{" "}
              <br className="hidden sm:block" />
              Birlikte Kuralim
            </h2>
            <p className="text-[#0A0A0A]/70 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
              Projenizi konusalim. Muzik, teknoloji veya yaratici icerik &mdash; farketmez.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-[#0A0A0A] text-[#D8FB32] font-semibold rounded-[10px] text-base hover:bg-[#1A1A1A] hover:scale-[1.02] transition-all duration-200 shadow-xl"
            >
              Iletisime Gec
              <span className="animate-[spin-slow_3s_linear_infinite] inline-flex">
                <DecorativePinwheel size={16} opacity={0.9} />
              </span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
