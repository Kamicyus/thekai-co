"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

const PRESETS = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
  { label: "Twitter Post", width: 1200, height: 675 },
  { label: "LinkedIn", width: 1200, height: 627 },
  { label: "Facebook Cover", width: 820, height: 312 },
];

export default function GorselBoyutlandirmaPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<"png" | "jpeg">("jpeg");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const mimeType = format === "png" ? "image/png" : "image/jpeg";
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);
      const link = document.createElement("a");
      const ext = format === "png" ? "png" : "jpg";
      link.download = `gorsel-${width}x${height}.${ext}`;
      link.href = dataUrl;
      link.click();
    };
    img.src = imageSrc;
  }, [imageSrc, width, height, quality, format]);

  const otherTools = TOOLS.filter((t) => t.slug !== "gorsel-boyutlandirma");

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

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
            <span className="text-[#F5F5F5]">Görsel Boyutlandırıcı</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Görsel Boyutlandırıcı
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Görsellerinizi sosyal medya boyutlarına uyarlayın. Drag & drop ile yükleyin, hazır şablonlar veya özel boyutlar seçin, indirin. Reklamsız, ücretsiz.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Upload & Controls */}
            <div className="space-y-6">
              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-full min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                  dragActive
                    ? "border-[#D8FB32] bg-[#D8FB32]/5"
                    : "border-[#1F2937] hover:border-[#D8FB32]/30 bg-[#1A1A1A]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0]);
                  }}
                  className="hidden"
                />
                {imageSrc ? (
                  <div className="p-4 w-full">
                    <img
                      src={imageSrc}
                      alt="Yüklenen görsel"
                      className="max-h-[180px] mx-auto object-contain rounded-lg"
                    />
                    <p className="text-[#666666] text-xs text-center mt-2">
                      {imageFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto mb-3"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-[#999999] text-sm mb-1">
                      Görsel sürükleyin veya tıklayın
                    </p>
                    <p className="text-[#666666] text-xs">
                      PNG, JPG, WEBP desteklenir
                    </p>
                  </div>
                )}
              </div>

              {/* Presets */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Hazır Boyutlar
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setWidth(preset.width);
                        setHeight(preset.height);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 text-left ${
                        width === preset.width && height === preset.height
                          ? "bg-[#D8FB32] text-[#0A0A0A]"
                          : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                      }`}
                    >
                      <span className="block">{preset.label}</span>
                      <span className="text-[10px] opacity-70">
                        {preset.width}x{preset.height}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Size */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Özel Boyut
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">
                      Genişlik (px)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2 text-[#F5F5F5] text-sm font-mono focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#666666] mb-1">
                      Yükseklik (px)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2 text-[#F5F5F5] text-sm font-mono focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Format & Quality */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    Format
                  </label>
                  <div className="flex gap-2">
                    {(["jpeg", "png"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          format === f
                            ? "bg-[#D8FB32] text-[#0A0A0A]"
                            : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                        }`}
                      >
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                    Kalite: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#D8FB32]"
                  />
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!imageSrc}
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
                {format.toUpperCase()} Olarak İndir ({width}x{height})
              </button>
            </div>

            {/* Right: Preview */}
            <div className="flex items-start justify-center">
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 w-full">
                <p className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-4">
                  Önizleme ({width}x{height})
                </p>
                <div
                  className="relative bg-[#0A0A0A] rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: `${width}/${height}`,
                    maxHeight: "500px",
                  }}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="Önizleme"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto mb-3"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p className="text-[#666666] text-sm">
                        Önizleme burada görünecek
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
