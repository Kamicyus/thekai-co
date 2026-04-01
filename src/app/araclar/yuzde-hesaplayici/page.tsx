"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

type Mode = "percentOf" | "whatPercent" | "percentChange";

export default function YuzdeHesaplayiciPage() {
  const [mode, setMode] = useState<Mode>("percentOf");
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");

  const calculate = (): string | null => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    if (isNaN(a) || isNaN(b)) return null;

    switch (mode) {
      case "percentOf":
        return (b * a / 100).toFixed(4).replace(/\.?0+$/, "");
      case "whatPercent":
        if (b === 0) return "Sıfıra bölünemez";
        return ("%" + (a / b * 100).toFixed(4).replace(/\.?0+$/, ""));
      case "percentChange":
        if (a === 0) return "Başlangıç değeri 0 olamaz";
        const change = ((b - a) / Math.abs(a)) * 100;
        const prefix = change >= 0 ? "+" : "";
        return prefix + change.toFixed(2).replace(/\.?0+$/, "") + "%";
      default:
        return null;
    }
  };

  const result = calculate();

  const modes: { key: Mode; label: string; desc: string }[] = [
    {
      key: "percentOf",
      label: "Yüzdesi Kaçtır?",
      desc: "X'in Y%'si kaçtır?",
    },
    {
      key: "whatPercent",
      label: "Yüzde Kaçıdır?",
      desc: "X, Y'nin yüzde kaçıdır?",
    },
    {
      key: "percentChange",
      label: "Yüzde Değişim",
      desc: "X'ten Y'ye yüzde değişim",
    },
  ];

  const getLabels = (): { labelA: string; labelB: string; formula: string } => {
    switch (mode) {
      case "percentOf":
        return {
          labelA: "Yüzde (%)",
          labelB: "Sayı",
          formula: `${valueA || "Y"}% x ${valueB || "X"} = ?`,
        };
      case "whatPercent":
        return {
          labelA: "Sayı (parça)",
          labelB: "Sayı (bütün)",
          formula: `${valueA || "X"} / ${valueB || "Y"} x 100 = ?`,
        };
      case "percentChange":
        return {
          labelA: "Eski Değer",
          labelB: "Yeni Değer",
          formula: `(${valueB || "Y"} - ${valueA || "X"}) / ${valueA || "X"} x 100 = ?`,
        };
    }
  };

  const labels = getLabels();

  const otherTools = TOOLS.filter((t) => t.slug !== "yuzde-hesaplayici");

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
            <span className="text-[#F5F5F5]">Yüzde Hesaplayıcı</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Yüzde Hesaplayıcı
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Yüzde hesaplama, oran bulma ve yüzde değişim hesaplama. 3 farklı mod ile anında sonuç alın. Reklamsız, ücretsiz, hızlı.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="max-w-xl mx-auto">
            {/* Mode Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {modes.map((m) => (
                <button
                  key={m.key}
                  onClick={() => {
                    setMode(m.key);
                    setValueA("");
                    setValueB("");
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === m.key
                      ? "bg-[#D8FB32] text-[#0A0A0A]"
                      : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="text-[#666666] text-sm mb-6">
              {modes.find((m) => m.key === mode)?.desc}
            </p>

            {/* Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  {labels.labelA}
                </label>
                <input
                  type="number"
                  value={valueA}
                  onChange={(e) => setValueA(e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-lg font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  {labels.labelB}
                </label>
                <input
                  type="number"
                  value={valueB}
                  onChange={(e) => setValueB(e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-lg font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                />
              </div>
            </div>

            {/* Formula */}
            <div className="bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 mb-6">
              <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-1">
                Formül
              </p>
              <p className="text-[#999999] text-sm font-mono">
                {labels.formula}
              </p>
            </div>

            {/* Result */}
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 text-center">
              <p className="text-[#666666] text-xs uppercase tracking-wider font-medium mb-3">
                Sonuç
              </p>
              {result ? (
                <p className="text-[#D8FB32] text-4xl sm:text-5xl font-bold font-mono">
                  {result}
                </p>
              ) : (
                <p className="text-[#666666] text-lg">
                  Değerleri girin
                </p>
              )}
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
      </div>
    </section>
  );
}
