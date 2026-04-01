"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  healthyMin: number;
  healthyMax: number;
  barPosition: number;
}

function calculateBMI(heightCm: number, weightKg: number): BMIResult | null {
  if (heightCm <= 0 || weightKg <= 0) return null;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  let color: string;
  let barPosition: number;

  if (bmi < 18.5) {
    category = "Zayıf";
    color = "#3B82F6";
    barPosition = (bmi / 18.5) * 25;
  } else if (bmi < 25) {
    category = "Normal";
    color = "#22C55E";
    barPosition = 25 + ((bmi - 18.5) / 6.5) * 25;
  } else if (bmi < 30) {
    category = "Kilolu";
    color = "#F59E0B";
    barPosition = 50 + ((bmi - 25) / 5) * 25;
  } else {
    category = "Obez";
    color = "#EF4444";
    barPosition = Math.min(75 + ((bmi - 30) / 10) * 25, 100);
  }

  const healthyMin = Math.round(18.5 * heightM * heightM * 10) / 10;
  const healthyMax = Math.round(24.9 * heightM * heightM * 10) / 10;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    color,
    healthyMin,
    healthyMax,
    barPosition,
  };
}

const BMI_CATEGORIES = [
  { label: "Zayıf", range: "< 18.5", color: "#3B82F6" },
  { label: "Normal", range: "18.5 - 24.9", color: "#22C55E" },
  { label: "Kilolu", range: "25 - 29.9", color: "#F59E0B" },
  { label: "Obez", range: "30+", color: "#EF4444" },
];

export default function BMIHesaplayiciPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return null;
    return calculateBMI(h, w);
  }, [height, weight]);

  const otherTools = TOOLS.filter((t) => t.slug !== "bmi-hesaplayici");

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
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
            <span className="text-[#F5F5F5]">BMI Hesaplayıcı</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            BMI Hesaplayıcı
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Boy ve kilonuzu girin, vücut kitle indeksinizi anında hesaplayın.
            Sağlıklı kilo aralığınızı öğrenin.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Input Fields */}
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    Boy (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    min={50}
                    max={250}
                    className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3.5 text-[#F5F5F5] text-lg font-mono focus:outline-none focus:border-[#D8FB32]/50 transition-colors placeholder:text-[#666666]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    Kilo (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min={10}
                    max={500}
                    className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3.5 text-[#F5F5F5] text-lg font-mono focus:outline-none focus:border-[#D8FB32]/50 transition-colors placeholder:text-[#666666]"
                  />
                </div>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 space-y-6">
                {/* BMI Value */}
                <div className="text-center">
                  <div
                    className="text-6xl sm:text-7xl font-bold font-mono mb-2"
                    style={{ color: result.color }}
                  >
                    {result.bmi}
                  </div>
                  <div
                    className="text-lg font-semibold"
                    style={{ color: result.color }}
                  >
                    {result.category}
                  </div>
                </div>

                {/* BMI Scale Bar */}
                <div>
                  <div className="relative w-full h-4 rounded-full overflow-hidden flex">
                    <div className="flex-1 bg-[#3B82F6]" />
                    <div className="flex-1 bg-[#22C55E]" />
                    <div className="flex-1 bg-[#F59E0B]" />
                    <div className="flex-1 bg-[#EF4444]" />
                  </div>
                  {/* Indicator */}
                  <div className="relative w-full h-0">
                    <div
                      className="absolute -top-[22px] transition-all duration-500"
                      style={{ left: `${result.barPosition}%`, transform: "translateX(-50%)" }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full border-2 border-[#0A0A0A] shadow-lg" />
                    </div>
                  </div>
                  {/* Labels */}
                  <div className="flex mt-3">
                    {BMI_CATEGORIES.map((cat) => (
                      <div key={cat.label} className="flex-1 text-center">
                        <div className="text-[10px] text-[#999999] font-medium">
                          {cat.label}
                        </div>
                        <div className="text-[10px] text-[#666666]">{cat.range}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Healthy Weight Range */}
                <div className="bg-[#1A1A1A] border border-[#1F2937] rounded-xl p-4">
                  <div className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    Sağlıklı Kilo Aralığı ({height} cm boy için)
                  </div>
                  <div className="text-[#F5F5F5] text-xl font-bold font-mono">
                    {result.healthyMin} kg — {result.healthyMax} kg
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v1m0 16v1m-9-9h1m16 0h1" />
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <p className="text-[#666666] text-sm">
                  Boy ve kilonuzu girin, BMI sonucunuz burada görünecek.
                </p>
              </div>
            )}

            {/* Category Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BMI_CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className="bg-[#141414] border border-[#1F2937] rounded-xl p-3 text-center"
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="text-[#F5F5F5] text-xs font-semibold">
                    {cat.label}
                  </div>
                  <div className="text-[#666666] text-[10px]">{cat.range}</div>
                </div>
              ))}
            </div>
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

        {/* Bottom Info */}
        <FadeIn className="mt-12 text-center">
          <p className="text-[#666666] text-sm">
            Bu araç bilgilendirme amaçlıdır, tıbbi tavsiye yerine geçmez.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
