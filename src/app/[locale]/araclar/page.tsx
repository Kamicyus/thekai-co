"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

const TOOLS_EN: Record<string, { title: string; description: string }> = {
  "qr-kod": { title: "QR Code Generator", description: "Enter a URL or text, generate a QR code instantly. Color and size customization. Download as PNG." },
  "kelime-sayaci": { title: "Word & Character Counter", description: "Paste text to instantly see word, character, sentence and paragraph counts. Reading time estimate." },
  "sifre-olusturucu": { title: "Password Generator", description: "Generate secure, random passwords. Length, character type options and password strength indicator." },
  "renk-cevirici": { title: "Color Code Converter", description: "Instantly convert between HEX, RGB and HSL color codes. Live preview and copy." },
  "bmi-hesaplayici": { title: "BMI Calculator", description: "Enter your height and weight, instantly calculate your body mass index. Healthy weight range indicator." },
  "harf-cevirici": { title: "Case Converter", description: "Instantly convert text to uppercase, lowercase, title case or sentence case." },
  "json-formatlayici": { title: "JSON Formatter", description: "Auto-format your JSON data, detect syntax errors, minify or beautify." },
  "yuzde-hesaplayici": { title: "Percentage Calculator", description: "Percentage calculation, ratio finding and percentage change. 3 different calculation modes." },
  "gorsel-boyutlandirma": { title: "Image Resizer", description: "Resize your images for social media dimensions. Instagram, YouTube, Twitter and custom sizes." },
  "yas-hesaplayici": { title: "Age Calculator", description: "Enter your birth date, see your age in years, months, days. Zodiac sign and days until birthday." },
  "tuner": { title: "Online Guitar Tuner", description: "Tune your guitar using your microphone. Standard tuning (EADGBE), reference notes and cent indicator." },
  "metronom": { title: "Online Metronome", description: "Metronome powered by Web Audio API. BPM adjustment, tap tempo, beat selection and visual beat indicator." },
  "bpm-bulucu": { title: "BPM Finder", description: "Calculate a song's BPM by tapping to the rhythm. Average, minimum and maximum BPM display." },
  "base64": { title: "Base64 Encoder / Decoder", description: "Convert text or files to Base64 format. Decode Base64 back to text." },
  "lorem-ipsum": { title: "Lorem Ipsum Generator", description: "Generate placeholder text for design projects. Paragraph, sentence, word mode with Turkish support." },
  "pomodoro": { title: "Pomodoro Timer", description: "Work productively with 25 min work, 5 min break cycles. Duration customization and session tracking." },
  "regex-test": { title: "Regex Tester", description: "Write regex patterns and test them live on text. See matches highlighted, inspect groups." },
  "renk-paleti": { title: "Color Palette Generator", description: "Generate random color palettes. HEX, RGB, HSL codes, color locking and one-click copy." },
  "metin-farki": { title: "Text Diff Comparator", description: "Compare two texts side by side. Added lines in green, removed lines in red. Line-by-line diff view." },
};

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
  json: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
      <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
    </svg>
  ),
  percent: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
  image: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  cake: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  ),
  music: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  clock: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  regex: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6m0 0l3-3m-3 3L9 5" />
      <path d="M17.5 7.5L12 12m0 0L6.5 7.5" />
      <circle cx="5" cy="17" r="3" />
      <path d="M14 14l4 4m0-4l-4 4" />
    </svg>
  ),
  palette: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="16" cy="9" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
      <path d="M14 17a2 2 0 0 0 2-2c0-1.5-2-3-2-3s-2 1.5-2 3a2 2 0 0 0 2 2z" />
    </svg>
  ),
  diff: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="18" rx="1" />
      <rect x="13" y="3" width="8" height="18" rx="1" />
      <path d="M6 8h2" />
      <path d="M6 12h2" />
      <path d="M16 8h2" />
      <path d="M15 12h4" />
      <path d="M17 10v4" />
    </svg>
  ),
};

export default function AraclarPage() {
  const locale = useLocale();
  const isEn = locale === "en";

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
              {isEn ? "Free Tools" : "Ücretsiz Araçlar"}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            {isEn ? "Online Tools" : "Online Araçlar"}
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {isEn ? (
              <>
                Ad-free, no registration required, completely free online tools.
                <br />
                Fast, secure and unlimited usage.
              </>
            ) : (
              <>
                Reklamsız, kayıt gerektirmeyen, tamamen ücretsiz online araçlar.
                <br />
                Hızlı, güvenli ve sınırsız kullanım.
              </>
            )}
          </p>
        </FadeIn>

        {/* Tool Cards Grid */}
        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {TOOLS.map((tool) => {
            const enTool = TOOLS_EN[tool.slug];
            return (
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
                      {isEn && enTool ? enTool.title : tool.title}
                    </h2>
                    <p className="text-[#999999] text-sm leading-relaxed mb-5">
                      {isEn && enTool ? enTool.description : tool.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[#D8FB32] text-sm font-medium">
                      <span>{isEn ? "Use" : "Kullan"}</span>
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
                        {isEn ? "Free" : "Ücretsiz"}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* Bottom Info */}
        <FadeIn className="mt-16 lg:mt-20 text-center">
          <p className="text-[#666666] text-sm">
            {isEn
              ? "All tools run in your browser. Your data is never sent to a server."
              : "Tüm araçlar tarayıcınızda çalışır. Verileriniz sunucuya gönderilmez."}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
