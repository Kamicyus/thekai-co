"use client";

import { useState, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

const SIZE_OPTIONS = [128, 256, 512, 1024];

export default function QRKodPage() {
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#0A0A0A");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qr-kod.png";
    link.href = url;
    link.click();
  }, []);

  const otherTools = TOOLS.filter((t) => t.slug !== "qr-kod");

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
              Araclar
            </Link>
            <span className="text-[#666666]">/</span>
            <span className="text-[#F5F5F5]">QR Kod Olusturucu</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            QR Kod Olusturucu
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            URL veya metin girin, aninda QR kod olusturun. Renk ve boyut secin, PNG olarak indirin. Reklamsiz, ucretsiz, hizli.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Input Controls */}
            <div className="space-y-6">
              {/* Text Input */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Metin veya URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://thekai.co"
                  rows={4}
                  className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-none"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    QR Rengi
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-[#1F2937] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2 text-[#F5F5F5] text-sm font-mono focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    Arka Plan Rengi
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-[#1F2937] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2 text-[#F5F5F5] text-sm font-mono focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Boyut
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        size === s
                          ? "bg-[#D8FB32] text-[#0A0A0A]"
                          : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                      }`}
                    >
                      {s}x{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Hizli Renk Sablonlari
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Koyu Tema", fg: "#FFFFFF", bg: "#0A0A0A" },
                    { label: "Acik Tema", fg: "#000000", bg: "#FFFFFF" },
                    { label: "The Kai", fg: "#D8FB32", bg: "#0A0A0A" },
                    { label: "Mor", fg: "#5532FA", bg: "#F5F5F5" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setFgColor(preset.fg);
                        setBgColor(preset.bg);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all duration-200"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!text.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-sm hover:bg-[#B4F030] hover:scale-[1.01] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.08)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PNG Olarak Indir
              </button>
            </div>

            {/* Right: QR Preview */}
            <div className="flex items-center justify-center">
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-12 w-full max-w-md">
                <div
                  ref={canvasRef}
                  className="flex items-center justify-center"
                >
                  {text.trim() ? (
                    <QRCodeCanvas
                      value={text}
                      size={Math.min(size, 400)}
                      fgColor={fgColor}
                      bgColor={bgColor}
                      level="H"
                      marginSize={2}
                    />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-[#1F2937] rounded-2xl">
                      <p className="text-[#666666] text-sm text-center px-4">
                        QR kodunuz burada gorunecek
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Other Tools */}
        {otherTools.length > 0 && (
          <FadeIn className="mt-20 lg:mt-28">
            <h2 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-6">
              Diger Araclar
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
