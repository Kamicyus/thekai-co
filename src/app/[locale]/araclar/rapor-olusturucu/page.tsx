"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

type RaporTipi = "is" | "arastirma" | "proje" | "analiz";
type DetaySeviyesi = "kisa" | "orta" | "detayli";
type Dil = "tr" | "en";

interface RaporBolum {
  baslik: string;
  icerik: string;
}

const RAPOR_TIPLERI: { value: RaporTipi; label: string }[] = [
  { value: "is", label: "İş Raporu" },
  { value: "arastirma", label: "Araştırma Raporu" },
  { value: "proje", label: "Proje Raporu" },
  { value: "analiz", label: "Analiz Raporu" },
];

const DETAY_SEVIYELERI: {
  value: DetaySeviyesi;
  label: string;
  desc: string;
}[] = [
  { value: "kisa", label: "Kısa", desc: "~1 sayfa" },
  { value: "orta", label: "Orta", desc: "3-5 sayfa" },
  { value: "detayli", label: "Detaylı", desc: "5-10 sayfa" },
];

function raporTipiLabel(tip: RaporTipi, dil: Dil): string {
  const labels: Record<RaporTipi, Record<Dil, string>> = {
    is: { tr: "İş Raporu", en: "Business Report" },
    arastirma: { tr: "Araştırma Raporu", en: "Research Report" },
    proje: { tr: "Proje Raporu", en: "Project Report" },
    analiz: { tr: "Analiz Raporu", en: "Analysis Report" },
  };
  return labels[tip][dil];
}

function generateReport(
  konu: string,
  tip: RaporTipi,
  detay: DetaySeviyesi,
  dil: Dil
): RaporBolum[] {
  const isTr = dil === "tr";
  const tipLabel = raporTipiLabel(tip, dil);
  const tarih = new Date().toLocaleDateString(isTr ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const kisaPlaceholder = isTr
    ? "Bu bölümü kendi analizinizle doldurun veya bir AI aracına yapıştırarak detaylandırın."
    : "Fill this section with your own analysis or paste into an AI tool to expand.";

  const ortaPlaceholder = isTr
    ? "Bu bölümde konunun detaylı analizini yapın. Veriler, istatistikler ve somut örnekler ekleyerek güçlendirin. Grafikler ve tablolar kullanmayı düşünün."
    : "Provide a detailed analysis in this section. Strengthen with data, statistics, and concrete examples. Consider using charts and tables.";

  const detayliPlaceholder = isTr
    ? "Bu bölümde kapsamlı bir analiz sunun. Birden fazla perspektiften değerlendirme yapın. Sektörel karşılaştırmalar, trend analizleri, vaka çalışmaları ve uzman görüşleri ekleyin. Alt başlıklar kullanarak konuyu sistematik olarak ele alın."
    : "Present a comprehensive analysis in this section. Evaluate from multiple perspectives. Include industry comparisons, trend analyses, case studies, and expert opinions. Use subheadings to systematically address the topic.";

  const placeholder =
    detay === "kisa"
      ? kisaPlaceholder
      : detay === "orta"
      ? ortaPlaceholder
      : detayliPlaceholder;

  const bolumler: RaporBolum[] = [];

  // Yonetici Ozeti
  bolumler.push({
    baslik: isTr ? "Yönetici Özeti" : "Executive Summary",
    icerik: isTr
      ? `Bu ${tipLabel.toLowerCase()}, "${konu}" konusunu ele almaktadır. Rapor ${tarih} tarihinde hazırlanmıştır.\n\n${placeholder}`
      : `This ${tipLabel.toLowerCase()} addresses the topic of "${konu}". The report was prepared on ${tarih}.\n\n${placeholder}`,
  });

  // Giris
  bolumler.push({
    baslik: isTr ? "Giriş" : "Introduction",
    icerik: isTr
      ? `"${konu}" konusu, günümüzde giderek artan bir öneme sahiptir. Bu rapor, konunun çeşitli boyutlarını incelemeyi ve somut öneriler sunmayı amaçlamaktadır.\n\n${placeholder}`
      : `The topic of "${konu}" is of increasing importance today. This report aims to examine various dimensions of the subject and provide concrete recommendations.\n\n${placeholder}`,
  });

  // Ana Bulgular
  if (detay === "kisa") {
    bolumler.push({
      baslik: isTr ? "Ana Bulgular" : "Key Findings",
      icerik: isTr
        ? `• Bulgu 1: [Buraya ilk önemli bulgunuzu yazın]\n• Bulgu 2: [Buraya ikinci önemli bulgunuzu yazın]\n• Bulgu 3: [Buraya üçüncü önemli bulgunuzu yazın]`
        : `• Finding 1: [Write your first key finding here]\n• Finding 2: [Write your second key finding here]\n• Finding 3: [Write your third key finding here]`,
    });
  } else {
    bolumler.push({
      baslik: isTr ? "Ana Bulgular" : "Key Findings",
      icerik: isTr
        ? `1. Birinci Bulgu\n${placeholder}\n\n2. İkinci Bulgu\n${placeholder}\n\n3. Üçüncü Bulgu\n${placeholder}${
            detay === "detayli"
              ? `\n\n4. Dördüncü Bulgu\n${placeholder}\n\n5. Beşinci Bulgu\n${placeholder}`
              : ""
          }`
        : `1. First Finding\n${placeholder}\n\n2. Second Finding\n${placeholder}\n\n3. Third Finding\n${placeholder}${
            detay === "detayli"
              ? `\n\n4. Fourth Finding\n${placeholder}\n\n5. Fifth Finding\n${placeholder}`
              : ""
          }`,
    });
  }

  // Analiz
  bolumler.push({
    baslik: isTr ? "Analiz" : "Analysis",
    icerik: isTr
      ? `"${konu}" konusunun detaylı analizi aşağıda sunulmaktadır.\n\n${placeholder}${
          detay !== "kisa"
            ? `\n\n${
                isTr ? "Karşılaştırmalı Değerlendirme" : "Comparative Assessment"
              }\n${placeholder}`
            : ""
        }${
          detay === "detayli"
            ? `\n\nSWOT Analizi\n• Güçlü Yönler: [Doldurun]\n• Zayıf Yönler: [Doldurun]\n• Fırsatlar: [Doldurun]\n• Tehditler: [Doldurun]`
            : ""
        }`
      : `A detailed analysis of "${konu}" is presented below.\n\n${placeholder}${
          detay !== "kisa"
            ? `\n\nComparative Assessment\n${placeholder}`
            : ""
        }${
          detay === "detayli"
            ? `\n\nSWOT Analysis\n• Strengths: [Fill in]\n• Weaknesses: [Fill in]\n• Opportunities: [Fill in]\n• Threats: [Fill in]`
            : ""
        }`,
  });

  // Detayli icin ek bolumler
  if (detay === "detayli") {
    bolumler.push({
      baslik: isTr ? "Metodoloji" : "Methodology",
      icerik: isTr
        ? `Bu raporda kullanılan araştırma metodolojisi aşağıda açıklanmaktadır.\n\n${placeholder}`
        : `The research methodology used in this report is described below.\n\n${placeholder}`,
    });

    bolumler.push({
      baslik: isTr ? "Veri ve İstatistikler" : "Data & Statistics",
      icerik: isTr
        ? `| Metrik | Değer | Değişim |\n| --- | --- | --- |\n| [Metrik 1] | [Değer] | [%] |\n| [Metrik 2] | [Değer] | [%] |\n| [Metrik 3] | [Değer] | [%] |\n\n${placeholder}`
        : `| Metric | Value | Change |\n| --- | --- | --- |\n| [Metric 1] | [Value] | [%] |\n| [Metric 2] | [Value] | [%] |\n| [Metric 3] | [Value] | [%] |\n\n${placeholder}`,
    });
  }

  // Sonuc ve Oneriler
  bolumler.push({
    baslik: isTr ? "Sonuç ve Öneriler" : "Conclusion & Recommendations",
    icerik: isTr
      ? `"${konu}" konusundaki değerlendirmelerimiz sonucunda aşağıdaki öneriler sunulmaktadır:\n\n${
          detay === "kisa"
            ? "• Öneri 1: [Doldurun]\n• Öneri 2: [Doldurun]\n• Öneri 3: [Doldurun]"
            : `1. Kısa Vadeli Öneriler\n${placeholder}\n\n2. Orta Vadeli Öneriler\n${placeholder}\n\n3. Uzun Vadeli Öneriler\n${placeholder}`
        }`
      : `Based on our assessment of "${konu}", the following recommendations are presented:\n\n${
          detay === "kisa"
            ? "• Recommendation 1: [Fill in]\n• Recommendation 2: [Fill in]\n• Recommendation 3: [Fill in]"
            : `1. Short-term Recommendations\n${placeholder}\n\n2. Medium-term Recommendations\n${placeholder}\n\n3. Long-term Recommendations\n${placeholder}`
        }`,
  });

  return bolumler;
}

function raporToMarkdown(
  konu: string,
  tip: RaporTipi,
  dil: Dil,
  bolumler: RaporBolum[]
): string {
  const isTr = dil === "tr";
  const tipLabel = raporTipiLabel(tip, dil);
  const tarih = new Date().toLocaleDateString(isTr ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let md = `# ${konu}\n\n`;
  md += `**${isTr ? "Rapor Tipi" : "Report Type"}:** ${tipLabel}\n`;
  md += `**${isTr ? "Tarih" : "Date"}:** ${tarih}\n`;
  md += `**${isTr ? "Hazırlayan" : "Prepared by"}:** [${
    isTr ? "İsminizi yazın" : "Your name"
  }]\n\n---\n\n`;

  bolumler.forEach((b) => {
    md += `## ${b.baslik}\n\n${b.icerik}\n\n`;
  });

  md += `---\n\n*${
    isTr
      ? "Bu rapor The Kai AI Rapor Oluşturucu ile hazırlanmıştır. thekai.co"
      : "This report was generated with The Kai AI Report Generator. thekai.co"
  }*\n`;

  return md;
}

export default function RaporOlusturucuPage() {
  const [konu, setKonu] = useState("");
  const [tip, setTip] = useState<RaporTipi>("is");
  const [detay, setDetay] = useState<DetaySeviyesi>("orta");
  const [dil, setDil] = useState<Dil>("tr");
  const [rapor, setRapor] = useState<RaporBolum[] | null>(null);
  const [kopyalandi, setKopyalandi] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const otherTools = TOOLS.filter((t) => t.slug !== "rapor-olusturucu");
  const isTr = dil === "tr";
  const tipLabel = raporTipiLabel(tip, dil);
  const tarih = new Date().toLocaleDateString(isTr ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleGenerate = useCallback(() => {
    if (!konu.trim()) return;
    const result = generateReport(konu, tip, detay, dil);
    setRapor(result);
  }, [konu, tip, detay, dil]);

  const handleCopyMarkdown = useCallback(() => {
    if (!rapor) return;
    const md = raporToMarkdown(konu, tip, dil, rapor);
    navigator.clipboard.writeText(md).then(() => {
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    });
  }, [rapor, konu, tip, dil]);

  const handleDownloadPDF = useCallback(async () => {
    if (!rapor) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const marginX = 20;
    const contentW = pageW - marginX * 2;
    let y = 20;

    const checkPage = (need: number) => {
      if (y + need > pageH - 20) {
        doc.addPage();
        y = 20;
      }
    };

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(konu, contentW);
    checkPage(titleLines.length * 9 + 20);
    doc.text(titleLines, marginX, y);
    y += titleLines.length * 9 + 4;

    // Meta
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`${tipLabel}  |  ${tarih}`, marginX, y);
    y += 8;

    // Line
    doc.setDrawColor(200);
    doc.line(marginX, y, pageW - marginX, y);
    y += 10;

    // Sections
    doc.setTextColor(0);
    rapor.forEach((bolum) => {
      // Section heading
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      const headLines = doc.splitTextToSize(bolum.baslik, contentW);
      checkPage(headLines.length * 7 + 10);
      doc.text(headLines, marginX, y);
      y += headLines.length * 7 + 4;

      // Section body
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const bodyLines = doc.splitTextToSize(bolum.icerik, contentW);
      bodyLines.forEach((line: string) => {
        checkPage(6);
        doc.text(line, marginX, y);
        y += 5;
      });
      y += 8;
    });

    // Footer
    checkPage(15);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      isTr
        ? "Bu rapor The Kai AI Rapor Oluşturucu ile hazırlanmıştır. thekai.co"
        : "Generated with The Kai AI Report Generator. thekai.co",
      marginX,
      pageH - 10
    );

    const safeName = konu
      .replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s-]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
      .slice(0, 40);
    doc.save(`${safeName || "rapor"}.pdf`);
  }, [rapor, konu, tipLabel, tarih, isTr]);

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
            <span className="text-[#F5F5F5]">AI Rapor Oluşturucu</span>
          </nav>
        </FadeIn>

        {/* Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            AI Rapor Oluşturucu
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Konunuzu yazın, rapor tipini seçin — profesyonel yapıda bir rapor
            şablonu anında oluşsun. PDF veya Markdown olarak indirin.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-6">
              {/* Konu */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Konu / Başlık
                </label>
                <input
                  type="text"
                  value={konu}
                  onChange={(e) => setKonu(e.target.value)}
                  placeholder="Örn: 2024 AI Trendleri, Startup Büyüme Stratejileri"
                  className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                />
              </div>

              {/* Rapor Tipi */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Rapor Tipi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {RAPOR_TIPLERI.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTip(t.value)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        tip === t.value
                          ? "bg-[#D8FB32] text-[#0A0A0A]"
                          : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detay Seviyesi */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Detay Seviyesi
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DETAY_SEVIYELERI.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDetay(d.value)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                        detay === d.value
                          ? "bg-[#D8FB32] text-[#0A0A0A]"
                          : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                      }`}
                    >
                      <span className="block">{d.label}</span>
                      <span
                        className={`block text-[10px] mt-0.5 ${
                          detay === d.value
                            ? "text-[#0A0A0A]/60"
                            : "text-[#666666]"
                        }`}
                      >
                        {d.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dil */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Dil
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "tr" as Dil, label: "Türkçe" },
                    { value: "en" as Dil, label: "English" },
                  ].map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDil(d.value)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        dil === d.value
                          ? "bg-[#D8FB32] text-[#0A0A0A]"
                          : "bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!konu.trim()}
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Rapor Oluştur
              </button>

              {/* Action Buttons (after generation) */}
              {rapor && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-[#1F2937] text-[#F5F5F5] font-medium rounded-[10px] text-sm hover:border-[#D8FB32]/50 transition-all duration-200"
                  >
                    <svg
                      width="16"
                      height="16"
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
                    PDF İndir
                  </button>
                  <button
                    onClick={handleCopyMarkdown}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-[#1F2937] text-[#F5F5F5] font-medium rounded-[10px] text-sm hover:border-[#D8FB32]/50 transition-all duration-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    {kopyalandi ? "Kopyalandı!" : "Markdown Kopyala"}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div>
              <div
                ref={previewRef}
                className="bg-white rounded-[20px] border border-[#1F2937] overflow-hidden min-h-[500px]"
              >
                {rapor ? (
                  <div className="p-8 sm:p-10">
                    {/* Report Header */}
                    <div className="border-b border-gray-200 pb-6 mb-8">
                      <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold leading-tight mb-3">
                        {konu}
                      </h2>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
                          {tipLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
                          {tarih}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
                          {isTr ? "Hazırlayan:" : "Prepared by:"}{" "}
                          {isTr ? "[İsminiz]" : "[Your name]"}
                        </span>
                      </div>
                    </div>

                    {/* Report Sections */}
                    <div className="space-y-8">
                      {rapor.map((bolum, i) => (
                        <div key={i}>
                          <h3 className="text-gray-900 text-lg font-bold mb-3 flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold">
                              {i + 1}
                            </span>
                            {bolum.baslik}
                          </h3>
                          <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line pl-9">
                            {bolum.icerik}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-10 pt-6 border-t border-gray-200">
                      <p className="text-gray-400 text-xs text-center">
                        {isTr
                          ? "Bu rapor The Kai AI Rapor Oluşturucu ile hazırlanmıştır."
                          : "Generated with The Kai AI Report Generator."}{" "}
                        <span className="text-gray-500 font-medium">
                          thekai.co
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[500px]">
                    <div className="text-center px-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
                        📊
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {isTr
                          ? "Rapor önizlemeniz burada görünecek"
                          : "Your report preview will appear here"}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {isTr
                          ? 'Sol taraftan bilgileri doldurup "Rapor Oluştur" butonuna basın'
                          : 'Fill in the details on the left and click "Generate Report"'}
                      </p>
                    </div>
                  </div>
                )}
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
