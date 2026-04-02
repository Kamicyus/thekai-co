"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

function getZodiacSign(day: number, month: number): { sign: string; emoji: string } {
  const signs = [
    { sign: "Oğlak", emoji: "♑", start: [1, 1], end: [1, 19] },
    { sign: "Kova", emoji: "♒", start: [1, 20], end: [2, 18] },
    { sign: "Balık", emoji: "♓", start: [2, 19], end: [3, 20] },
    { sign: "Koç", emoji: "♈", start: [3, 21], end: [4, 19] },
    { sign: "Boğa", emoji: "♉", start: [4, 20], end: [5, 20] },
    { sign: "İkizler", emoji: "♊", start: [5, 21], end: [6, 20] },
    { sign: "Yengeç", emoji: "♋", start: [6, 21], end: [7, 22] },
    { sign: "Aslan", emoji: "♌", start: [7, 23], end: [8, 22] },
    { sign: "Başak", emoji: "♍", start: [8, 23], end: [9, 22] },
    { sign: "Terazi", emoji: "♎", start: [9, 23], end: [10, 22] },
    { sign: "Akrep", emoji: "♏", start: [10, 23], end: [11, 21] },
    { sign: "Yay", emoji: "♐", start: [11, 22], end: [12, 21] },
    { sign: "Oğlak", emoji: "♑", start: [12, 22], end: [12, 31] },
  ];

  for (const z of signs) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if (
      (month === sm && day >= sd) ||
      (month === em && day <= ed)
    ) {
      return { sign: z.sign, emoji: z.emoji };
    }
  }
  return { sign: "Oğlak", emoji: "♑" };
}

export default function YasHesaplayiciPage() {
  const [birthDate, setBirthDate] = useState("");

  const results = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) return null;
    if (isNaN(birth.getTime())) return null;

    // Calculate age in years, months, days
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));

    // Next birthday
    let nextBirthday = new Date(
      now.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    if (nextBirthday <= now) {
      nextBirthday = new Date(
        now.getFullYear() + 1,
        birth.getMonth(),
        birth.getDate()
      );
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Zodiac
    const zodiac = getZodiacSign(birth.getDate(), birth.getMonth() + 1);

    // Day of week born
    const dayNames = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const bornDay = dayNames[birth.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      daysUntilBirthday,
      zodiac,
      bornDay,
    };
  }, [birthDate]);

  const otherTools = TOOLS.filter((t) => t.slug !== "yas-hesaplayici");

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Decorative pinwheels */}
      <div className="absolute top-20 right-8 pointer-events-none">
        <DecorativePinwheel size={100} opacity={0.04} rotate={15} />
      </div>
      <div className="absolute bottom-40 left-4 pointer-events-none">
        <DecorativePinwheel size={70} opacity={0.03} rotate={-20} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <FadeIn>
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link
              href="/araclar"
              className="text-[#999999] hover:text-[#D8FB32] transition-colors"
            >
              Araçlar
            </Link>
            <span className="text-[#666666]">/</span>
            <span className="text-[#F5F5F5]">Yaş Hesaplayıcı</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Yaş Hesaplayıcı
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Doğum tarihinizi girin, yaşınızı yıl, ay ve gün olarak görün. Burç, toplam gün, toplam saat ve bir sonraki doğum gününe kalan süre.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto">
            {/* Date Input */}
            <div className="mb-8">
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                Doğum Tarihi
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-lg focus:outline-none focus:border-[#D8FB32]/50 transition-colors [color-scheme:dark]"
              />
            </div>

            {results ? (
              <div className="space-y-6">
                {/* Main Age Display */}
                <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 text-center">
                  <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-4">
                    Yaşınız
                  </p>
                  <div className="flex items-center justify-center gap-6 sm:gap-10">
                    <div>
                      <p className="text-[#D8FB32] text-4xl sm:text-5xl font-bold font-mono">
                        {results.years}
                      </p>
                      <p className="text-[#666666] text-xs mt-1">Yıl</p>
                    </div>
                    <div>
                      <p className="text-[#F5F5F5] text-4xl sm:text-5xl font-bold font-mono">
                        {results.months}
                      </p>
                      <p className="text-[#666666] text-xs mt-1">Ay</p>
                    </div>
                    <div>
                      <p className="text-[#F5F5F5] text-4xl sm:text-5xl font-bold font-mono">
                        {results.days}
                      </p>
                      <p className="text-[#666666] text-xs mt-1">Gün</p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#141414] border border-[#1F2937] rounded-xl p-5">
                    <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-2">
                      Toplam Gün
                    </p>
                    <p className="text-[#F5F5F5] text-2xl font-bold font-mono">
                      {results.totalDays.toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <div className="bg-[#141414] border border-[#1F2937] rounded-xl p-5">
                    <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-2">
                      Toplam Saat
                    </p>
                    <p className="text-[#F5F5F5] text-2xl font-bold font-mono">
                      {results.totalHours.toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <div className="bg-[#141414] border border-[#1F2937] rounded-xl p-5">
                    <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-2">
                      Doğum Gününe Kalan
                    </p>
                    <p className="text-[#D8FB32] text-2xl font-bold font-mono">
                      {results.daysUntilBirthday}{" "}
                      <span className="text-sm text-[#666666] font-normal">gün</span>
                    </p>
                  </div>
                  <div className="bg-[#141414] border border-[#1F2937] rounded-xl p-5">
                    <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-2">
                      Doğduğunuz Gün
                    </p>
                    <p className="text-[#F5F5F5] text-2xl font-bold">
                      {results.bornDay}
                    </p>
                  </div>
                </div>

                {/* Zodiac */}
                <div className="bg-[#141414] border border-[#1F2937] rounded-xl p-5 flex items-center gap-4">
                  <span className="text-4xl">{results.zodiac.emoji}</span>
                  <div>
                    <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-1">
                      Burcunuz
                    </p>
                    <p className="text-[#F5F5F5] text-xl font-bold">
                      {results.zodiac.sign}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-12 text-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-4"
                >
                  <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                  <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                  <path d="M2 21h20" />
                  <path d="M7 8v3" />
                  <path d="M12 8v3" />
                  <path d="M17 8v3" />
                  <path d="M7 4h.01" />
                  <path d="M12 4h.01" />
                  <path d="M17 4h.01" />
                </svg>
                <p className="text-[#666666] text-sm">
                  Doğum tarihinizi girin, yaşınızı hesaplayalım
                </p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Other Tools */}
        {otherTools.length > 0 && (
          <FadeIn className="mt-20 lg:mt-28">
            <h2 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-6">
              Diğer Araçlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/araclar/${tool.slug}`}
                  className="group bg-[#141414] border border-[#1F2937] rounded-xl p-5 hover:border-[#D8FB32]/30 transition-all duration-300"
                >
                  <h3 className="text-[#F5F5F5] font-semibold text-sm mb-1 group-hover:text-[#D8FB32] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#666666] text-xs">{tool.description}</p>
                </Link>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
