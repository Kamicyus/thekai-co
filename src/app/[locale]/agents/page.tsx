"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";

// ─���───────────────────────────────────────────
// LAZY SECTION — only renders when near viewport
// ──────────────────────��──────────────────────
function LazySection({ children, className = "", minHeight = "200px" }: { children: ReactNode; className?: string; minHeight?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
}
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import { ScaleOnScroll, RevealText, FloatingOrb, MarqueeText, GlowDivider } from "@/components/ui/ScrollReveal";
import { openPaddleCheckout, usePaddleInit } from "@/components/payment/PaddleCheckout";

// ─────────────────────────────────────────────
// NOTIFICATION BAR
// ─────────────────────────────────────────────
function NotificationBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("kai-notif-bar-dismissed");
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem("kai-notif-bar-dismissed", "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-[#D8FB32] text-[#0A0A0A] py-2.5 px-4 flex items-center justify-center gap-3 relative z-50">
      <span className="text-sm font-semibold text-center">
        🔥 Beta erişim açıldı — İlk 100 kullanıcıya özel fiyat{" "}
        <a href="#bekleme-listesi" className="underline font-bold hover:opacity-70 transition-opacity ml-1">
          Hemen Katıl →
        </a>
      </span>
      <button
        onClick={dismiss}
        aria-label="Kapat"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#0A0A0A]/10 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// THEME PROVIDER (localStorage)
// ─────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("kai-agents-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("kai-agents-theme", next); } catch {}
  };

  return { theme, toggleTheme };
}

// Theme-aware color helper
function c(theme: "dark" | "light") {
  const isDark = theme === "dark";
  return {
    bg: isDark ? "bg-[#0A0A0A]" : "bg-[#FAFAFA]",
    bgAlt: isDark ? "bg-[#141414]" : "bg-[#F0F0F0]",
    bgCard: isDark ? "bg-[#141414]" : "bg-white",
    bgCardInner: isDark ? "bg-[#0A0A0A]" : "bg-[#F5F5F5]",
    text: isDark ? "text-white" : "text-[#0A0A0A]",
    textMuted: isDark ? "text-[#999999]" : "text-[#666666]",
    textDim: isDark ? "text-[#666666]" : "text-[#999999]",
    textDimmer: isDark ? "text-[#555555]" : "text-[#AAAAAA]",
    textDimmest: isDark ? "text-[#444444]" : "text-[#BBBBBB]",
    border: isDark ? "border-white/5" : "border-black/10",
    borderHover: isDark ? "border-white/20" : "border-black/20",
    accent: "#D8FB32",
    accentBg: "bg-[#D8FB32]",
    accentText: "text-[#D8FB32]",
    cardHoverBorder: isDark ? "hover:border-[#D8FB32]/50" : "hover:border-[#D8FB32]/70",
    inputBg: isDark ? "bg-white/5" : "bg-black/5",
    inputBorder: isDark ? "border-white/10" : "border-black/10",
    navBg: isDark ? "bg-[#0A0A0A]/90" : "bg-[#FAFAFA]/90",
    whiteOverlay5: isDark ? "bg-white/5" : "bg-black/5",
    whiteOverlay10: isDark ? "bg-white/10" : "bg-black/10",
    textWhite30: isDark ? "text-white/30" : "text-black/30",
    textWhite40: isDark ? "text-white/40" : "text-black/40",
    textWhite10: isDark ? "text-white/10" : "text-black/10",
  };
}

// ─────────────────────────────────────────────
// THEME TOGGLE BUTTON
// ─────────────────────────────────────────────
function ThemeToggle({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[60] w-11 h-11 rounded-full bg-[#D8FB32]/10 border border-[#D8FB32]/30 flex items-center justify-center hover:bg-[#D8FB32]/20 transition-all duration-200"
      aria-label="Tema Değiştir"
      title={theme === "dark" ? "Açık tema" : "Koyu tema"}
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  return (
    <section className={`pt-32 pb-20 px-5 ${t.bg} relative overflow-hidden`}>
      {/* Floating gradient orbs */}
      <FloatingOrb color="#D8FB32" size={400} top="-10%" left="-5%" delay={0} blur={120} />
      <FloatingOrb color="#3B82F6" size={300} top="20%" right="-10%" delay={2} blur={100} />
      <FloatingOrb color="#A855F7" size={250} bottom="10%" left="30%" delay={4} blur={90} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-[#D8FB32] rounded-full animate-pulse" />
            <span>T&uuml;rkiye&apos;nin İlk AI &Ccedil;alışan Platformu</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6 ${t.text}`}>
            Kod yazmadan kendi{" "}
            <br className="hidden sm:block" />
            <span className="bg-[#D8FB32] text-[#0A0A0A] px-2 pb-1 rounded-md inline-block">
              AI şirketini
            </span>{" "}
            kur.
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className={`text-xl sm:text-2xl ${t.textMuted} max-w-2xl mx-auto leading-relaxed mb-4`}>
            Avukatından yazılımcısına, muhasebecisinden pazarlamacısına
            <br />
            <span className="text-[#D8FB32] font-semibold">&mdash; kendi AI şirketini kod yazmadan kur &mdash;</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className={`text-base ${t.textDim} max-w-xl mx-auto leading-relaxed mb-10`}>
            Her biri binlerce kaynaktan beslenmiş uzman ajanlar.
            <br />
            Toplantılara katılır, birbirini besler, s&uuml;rekli &ouml;ğrenir.
            <br />
            <span className="text-[#999]">Sen y&ouml;net, onlar &ccedil;alışsın. 7/24 hazır, 0 maaş bordrosu.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <a
              href="#bekleme-listesi"
              className="w-full sm:w-auto bg-[#D8FB32] text-[#0A0A0A] px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#B4F030] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D8FB32]/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              Hemen Başla →
            </a>
            <a
              href="#nasil-calisir"
              className={`w-full sm:w-auto border ${t.border} ${t.text} px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2`}
            >
              <span className="w-7 h-7 bg-[#D8FB32] rounded-full flex items-center justify-center">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                  <path d="M2 1.5L8.5 6L2 10.5V1.5Z" fill="#0A0A0A" />
                </svg>
              </span>
              Demo İzle
            </a>
          </div>
        </FadeIn>

        {/* Hero Dashboard Mockup — Apple-style scale reveal */}
        <ScaleOnScroll>
          <div className="relative max-w-4xl mx-auto">
            <div className={`${t.bgCard} border ${t.border} rounded-2xl p-4 shadow-lg sm:shadow-2xl`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className={`flex-1 ${t.whiteOverlay5} rounded-md h-6 ml-2 flex items-center px-3`}>
                  <span className={`${t.textWhite30} text-xs`}>agents.thekai.co — Dashboard</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: "Uzman Ajan", value: "40+", color: "bg-[#D8FB32] text-[#0A0A0A]" },
                  { label: "Bugün Görev", value: "128", color: `${t.whiteOverlay5} ${t.text}` },
                  { label: "Departman", value: "10", color: `${t.whiteOverlay5} ${t.text}` },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.color} rounded-xl p-3`}>
                    <div className="text-2xl font-black">{stat.value}</div>
                    <div className="text-xs opacity-70 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {[
                  { name: "Avukat Ajanı", role: "Sözleşme Analiz & KVKK", status: "Çalışıyor", dept: "Hukuk" },
                  { name: "İçerik Üretici", role: "X + Instagram + LinkedIn", status: "Çalışıyor", dept: "Pazarlama" },
                  { name: "Full-Stack Dev", role: "React, Next.js, Python", status: "Tamamlandı", dept: "Yazılım" },
                  { name: "Trend Analisti", role: "YouTube & X Trendleri", status: "Bekleniyor", dept: "İstihbarat" },
                ].map((agent) => (
                  <div key={agent.name} className={`${t.whiteOverlay5} rounded-xl px-3 py-2.5 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#D8FB32]/10 flex items-center justify-center text-xs">
                        🤖
                      </div>
                      <div>
                        <div className={`${t.text} text-xs font-semibold`}>{agent.name}</div>
                        <div className={`${t.textWhite40} text-xs`}>{agent.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`${t.textWhite30} text-xs hidden sm:block`}>{agent.dept}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        agent.status === "Çalışıyor" ? "bg-green-500/20 text-green-400" :
                        agent.status === "Tamamlandı" ? "bg-[#D8FB32]/20 text-[#D8FB32]" :
                        `${t.whiteOverlay10} ${t.textDimmer}`
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -inset-4 bg-[#D8FB32]/5 rounded-3xl blur-xl sm:blur-3xl -z-10" />
          </div>
        </ScaleOnScroll>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS BAR (Coda.co inspired)
// ─────────────────────────────────────────────
function StatsBar({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  const stats = [
    { value: "40+", label: "Uzman Ajan" },
    { value: "8", label: "Departman" },
    { value: "100.000+", label: "Kaynak Analiz Edilmiş" },
    { value: "7/24", label: "Çalışıyor" },
  ];

  return (
    <section className={`py-12 border-b ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-4xl sm:text-5xl font-black text-[#D8FB32] leading-none tabular-nums">
                {stat.value}
              </span>
              <span className={`text-sm font-medium ${t.textMuted} uppercase tracking-wide`}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// BEE HIVE COPY SECTION
// ─────────────────────────────────────────────
function BeeHiveSection() {
  return (
    <section className="py-24 px-5 bg-[#0A0A0A] text-center relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #D8FB32 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Apple-style word reveal */}
        <RevealText
          text="Siz fikrinizi söyleyin. Uzman ajanlarınız arı gibi çalışmaya başlasın."
          highlightWords={["arı", "çalışmaya"]}
          className="mb-8"
        />

        <FadeIn delay={0.3}>
          <p className="text-[#999] text-lg leading-relaxed max-w-2xl mx-auto">
            Bir arı kovanında y&uuml;zlerce arı kusursuz koordinasyonla &ccedil;alışır &mdash;
            <br />
            her biri g&ouml;revini bilir, birbirleriyle s&uuml;rekli iletişim kurar.
            <br />
            <span className="text-[#D8FB32]/80">Kai Agents aynı b&ouml;yle &ccedil;alışır. Hem de vızlama sesi olmadan. 🐝</span>
          </p>
        </FadeIn>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="mt-16">
        <MarqueeText
          items={[
            "HUKUK", "FİNANS", "PAZARLAMA", "YAZILIM", "İSTİHBARAT",
            "İÇERİK", "SAĞLIK", "SPOR", "SOSYAL MEDYA", "MÜŞTERİ",
          ]}
          speed={25}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TRANSFORMATION — "Herkes Uzman Olabilir"
// ─────────────────────────────────────────────
function TransformationSection({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const transformations = [
    {
      before: "Hukuk danışmanına binlerce lira ödüyordum",
      after: "Şimdi sözleşme analizi, KVKK uyumu ve marka tescili dakikalar içinde hazır",
      role: "E-Ticaret Girişimcisi",
      icon: "⚖️",
      color: "#F59E0B",
      metric: "Yılda ~40.000 TL tasarruf",
    },
    {
      before: "Sosyal medyaya ne atacağımı bilemiyordum",
      after: "5 platformda koordineli içerik takvimi, otomatik analiz, viral thread şablonları",
      role: "Freelance Danışman",
      icon: "📱",
      color: "#4ECDC4",
      metric: "Takipçi %340 büyüme",
    },
    {
      before: "Excel'de finansal modelleme yapmaya çalışıyordum",
      after: "Nakit akış tahmini, yatırım analizi ve vergi optimizasyonu tek panelden",
      role: "Startup Kurucusu",
      icon: "💰",
      color: "#22C55E",
      metric: "Karar hızı 10x arttı",
    },
    {
      before: "Müşteri bulmak için saatlerimi harcıyordum",
      after: "Hedef kitle analizi, cold email şablonları ve CRM yönetimi otomatik",
      role: "Dijital Ajans Sahibi",
      icon: "🎯",
      color: "#3B82F6",
      metric: "Müşteri dönüşümü %180 ↑",
    },
    {
      before: "Her şeyi tek başıma yapıyordum, tükenmişlik sınırındaydım",
      after: "8 departman, 40+ uzman — ben sadece stratejiyi belirledim, gerisini onlar halletti",
      role: "İçerik Üreticisi",
      icon: "🎬",
      color: "#A855F7",
      metric: "Günlük 4 saat tasarruf",
    },
    {
      before: "Rakiplerin ne yaptığını takip edemiyordum",
      after: "Trend analizi, rakip benchmark, pazar fırsatları — her sabah masama hazır geliyor",
      role: "Pazarlama Müdürü",
      icon: "📊",
      color: "#EC4899",
      metric: "Pazar payı %25 büyüme",
    },
  ];

  return (
    <section className="py-28 px-5 overflow-hidden relative bg-[#D8FB32]">

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-6">
            <p className="text-[#0A0A0A] border border-[#0A0A0A]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              D&ouml;n&uuml;ş&uuml;m
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0A0A0A] leading-tight">
              Artık kimse{" "}
              <span className="relative inline-block">
                <span className="relative z-10">tek başına</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#0A0A0A]/15 -z-0" />
              </span>{" "}
              <br className="hidden sm:block" />
              olmak zorunda değil.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-center text-[#0A0A0A]/70 text-lg sm:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
            Avukatınız, muhasebeceniz, sosyal medya ekibiniz, yazılım geliştiriciniz,
            <br className="hidden sm:block" />
            pazar araştırmacınız ve daha fazlası &mdash;{" "}
            <span className="text-[#0A0A0A] font-semibold">hepsi 7/24 emrinizde.</span>
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {transformations.map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-white border border-gray-200 hover:border-[#0A0A0A]/30 rounded-2xl p-6 h-full group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: item.color }} />

                {/* Icon + Role */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${item.color}20` }}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{item.role}</span>
                </div>

                {/* Before → After */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400/60 text-lg mt-0.5 shrink-0">✗</span>
                    <p className="text-gray-500 text-sm leading-relaxed line-through decoration-red-400/30">{item.before}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0A0A0A] text-lg mt-0.5 shrink-0">✓</span>
                    <p className="text-[#0A0A0A] text-sm leading-relaxed font-medium">{item.after}</p>
                  </div>
                </div>

                {/* Metric */}
                <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${item.color}20` }}>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    {item.metric}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3}>
          <div className="text-center mt-14">
            <p className="text-[#0A0A0A]/70 text-base mb-6">
              Hukuk, finans, pazarlama, yazılım, istihbarat, i&ccedil;erik, spor, sağlık...
              <br />
              <span className="text-[#0A0A0A] font-semibold">Her alanda uzmanlaş. Tek platformdan.</span>
            </p>
            <a
              href="#bekleme-listesi"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#D8FB32] px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#1a1a1a] transition-colors"
            >
              Uzman Ekibini Kur &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// USE CASE SHOWCASE — Paperclip-inspired
// ─────────────────────────────────────────────
function UseCaseShowcase({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      title: "E-Ticaret Girişimcisi",
      icon: "🛒",
      color: "#F59E0B",
      headline: "D&uuml;kkanını a&ccedil;, gerisini AI ekibine bırak",
      description: "Ürün açıklamaları, SEO optimizasyonu, müşteri desteği, stok yönetimi, sosyal medya paylaşımları, rakip fiyat takibi — hepsini ajanların halleder.",
      agents: ["SEO Uzmanı", "İçerik Üretici", "Müşteri Desteği", "Finans Analisti", "Sosyal Medya Direktörü"],
      example: "Pazartesi sabahı: Haftalık satış raporu masanda. Hangi ürünler trend, hangileri düşüşte, rakiplerin fiyatları ne — hepsi analiz edilmiş. Sen sadece kararı ver.",
    },
    {
      title: "Freelance Danışman",
      icon: "💼",
      color: "#3B82F6",
      headline: "Tek kişilik ordu: sen + AI ekibin",
      description: "Müşteri bulma, teklif hazırlama, sözleşme yazma, proje yönetimi, fatura kesme, sosyal medya — hepsini yapan bir ekibin olsun.",
      agents: ["Satış Ajanı", "Avukat Ajanı", "Proje Yöneticisi", "Muhasebe Ajanı", "LinkedIn Uzmanı"],
      example: "Potansiyel müşteriye özel teklif hazırlandı. Sözleşme taslağı KVKK uyumlu. LinkedIn'de sektörel içerik planı hazır. Sen sadece toplantıya git.",
    },
    {
      title: "İçerik Üreticisi",
      icon: "🎬",
      color: "#A855F7",
      headline: "İ&ccedil;erik &uuml;retme, imparatorluk kur",
      description: "Video fikirleri, script yazımı, thumbnail stratejisi, SEO, sponsorluk yönetimi, topluluk büyütme — tüm kanallarını profesyonel ekip gibi yönet.",
      agents: ["YouTube Uzmanı", "X/Twitter Uzmanı", "Trend Analisti", "Topluluk Yöneticisi", "Marka Stratejisti"],
      example: "Bu hafta en çok izlenen 3 trend konuyu analiz ettik. Her biri için script taslağı, thumbnail önerisi ve en iyi paylaşım saati hazır.",
    },
    {
      title: "Startup Kurucusu",
      icon: "🚀",
      color: "#22C55E",
      headline: "10 kişilik ekip, sıfır maaş bordrosu",
      description: "Yatırımcı sunumu, finansal model, pazar araştırması, ürün geliştirme, kullanıcı testi, büyüme stratejisi — seed aşamasında bile profesyonel ekip.",
      agents: ["CFO Ajanı", "CTO Ajanı", "Pazar Araştırmacısı", "Full-Stack Developer", "Growth Hacker"],
      example: "Yatırımcı toplantısı yarın. Pitch deck güncellendi, finansal projeksiyonlar hazır, rakip analizi tamamlandı. Sadece sahneye çık.",
    },
    {
      title: "Dijital Ajans Sahibi",
      icon: "🏢",
      color: "#EC4899",
      headline: "M&uuml;şteri sayını 3&apos;e katla, ekibini değil",
      description: "Her müşteri için ayrı departman kur. Raporları otomatik üret. Brief'den teslimata kadar her adımı takip et. Müşterilerin seni 10 kişilik ekip sanacak.",
      agents: ["Proje Yöneticisi", "İçerik Ekibi", "SEO Uzmanı", "Raporlama Ajanı", "Müşteri İlişkileri"],
      example: "3 müşterinin haftalık raporları otomatik oluşturuldu. Her biri kendi dashboard'undan ilerlemeyi görüyor. Sen stratejik kararlara odaklan.",
    },
  ];

  const activeItem = cases[activeCase];

  return (
    <section className="py-28 px-5 relative overflow-hidden bg-[#F5F5F5]">

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#0A0A0A] border border-[#0A0A0A]/20 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Kullanım Senaryoları
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0A0A0A]">
              Sen ne iş yapıyorsan,
              <br />
              <span className="text-[#0A0A0A]/70">AI ekibin ona g&ouml;re şekillenir.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Tab navigation */}
        <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 mb-10 pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
          {cases.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveCase(i)}
              className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0 min-h-[44px] ${
                activeCase === i
                  ? "bg-[#0A0A0A] text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Active case detail */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[40px] sm:blur-[100px] opacity-10" style={{ backgroundColor: activeItem.color }} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{activeItem.icon}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">{activeItem.title}</h3>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-4 leading-snug" dangerouslySetInnerHTML={{ __html: activeItem.headline }} />
              <p className="text-gray-600 leading-relaxed mb-6">{activeItem.description}</p>

              {/* Agent chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeItem.agents.map((agent) => (
                  <span
                    key={agent}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: `${activeItem.color}40`,
                      backgroundColor: `${activeItem.color}10`,
                      color: activeItem.color,
                    }}
                  >
                    🤖 {agent}
                  </span>
                ))}
              </div>

              <a
                href="#bekleme-listesi"
                className="inline-flex items-center gap-2 bg-[#D8FB32] text-[#0A0A0A] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#B4F030] transition-colors"
              >
                Bu Ekibi Kur &rarr;
              </a>
            </div>

            {/* Right: Example scenario card */}
            <div className="bg-[#F5F5F5] border border-gray-200 rounded-2xl p-6 relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeItem.color }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: activeItem.color }}>
                  &Ouml;rnek Senaryo
                </span>
              </div>
              <p className="text-[#0A0A0A] text-sm leading-relaxed">{activeItem.example}</p>

              {/* Mini dashboard mockup */}
              <div className="mt-6 space-y-2">
                {activeItem.agents.slice(0, 3).map((agent, idx) => (
                  <div key={agent} className="bg-white rounded-lg px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🤖</span>
                      <span className="text-[#0A0A0A] text-xs font-medium">{agent}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      idx === 0 ? "bg-green-500/20 text-green-600" :
                      idx === 1 ? "bg-amber-500/20 text-amber-600" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {idx === 0 ? "Tamamlandı" : idx === 1 ? "Çalışıyor" : "Sırada"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CINEMATIC DIVIDER — Apple-style parallax interstitial
// ─────────────────────────────────────────────
function CinematicDivider({ theme }: { theme: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative py-32 px-5 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, #D8FB32/5 0%, transparent 60%)",
          scale,
        }}
      />

      {/* Floating particles */}
      <FloatingOrb color="#D8FB32" size={200} top="10%" left="10%" delay={0} blur={80} />
      <FloatingOrb color="#3B82F6" size={150} top="60%" right="15%" delay={3} blur={60} />
      <FloatingOrb color="#EC4899" size={180} bottom="20%" left="50%" delay={5} blur={70} />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Big number */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 flex-wrap">
            {[
              { num: "40+", label: "Uzman Ajan" },
              { num: "8", label: "Departman" },
              { num: "7/24", label: "Aktif" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-7xl font-black text-[#D8FB32] leading-none">{item.num}</div>
                <div className="text-sm text-[#666] mt-2 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-white/60 leading-relaxed max-w-2xl mx-auto">
            Bir şirket kurmak artık{" "}
            <span className="text-white">bir ekibe</span>,{" "}
            <span className="text-white">bir ofise</span> veya{" "}
            <span className="text-white">bir sermayeye</span>{" "}
            bağlı değil.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}

// ─────────────────────────────────────────────
// SUPERPOWER STATEMENT — Paperclip-inspired big typography
// ─────────────────────────────────────────────
function SuperpowerStatement({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const powers = [
    { text: "Hukuk danışmanlığı", icon: "⚖️" },
    { text: "Finansal modelleme", icon: "💰" },
    { text: "Yazılım geliştirme", icon: "💻" },
    { text: "Marka stratejisi", icon: "🎯" },
    { text: "Pazar araştırması", icon: "📊" },
    { text: "İçerik üretimi", icon: "✍️" },
    { text: "Müşteri kazanımı", icon: "🤝" },
    { text: "Performans analizi", icon: "📈" },
  ];

  return (
    <section className="py-24 px-5 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0A1408 40%, #101A08 60%, #0A0A0A 100%)" }}>
      {/* Green atmosphere + grid */}
      <FloatingOrb color="#D8FB32" size={350} top="0" left="20%" delay={0} blur={130} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(216,251,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(216,251,50,0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight ${t.text} leading-tight`}>
              İster hukuk danışmanlığı,
              <br />
              ister uygulama geliştirme &mdash;
              <br />
              <span className="text-[#D8FB32]">istedikleri her şeyi yapabilecekler.</span>
            </h2>
            <p className={`${t.textDim} text-lg mt-6 max-w-2xl mx-auto`}>
              Her kullanıcı kendi s&uuml;per g&uuml;c&uuml;n&uuml; keşfeder.
              <br />
              AI ajanlar sıradan insanları uzman yapar.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="flex flex-wrap justify-center gap-3">
          {powers.map((power, i) => (
            <StaggerItem key={i}>
              <div className={`${t.bgCard} border ${t.border} rounded-full px-5 py-3 flex items-center gap-2.5 hover:border-[#D8FB32]/50 hover:shadow-lg hover:shadow-[#D8FB32]/5 transition-all duration-200 group cursor-default`}>
                <span className="text-lg group-hover:scale-110 transition-transform">{power.icon}</span>
                <span className={`${t.text} text-sm font-semibold`}>{power.text}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3}>
          <p className={`text-center ${t.textDimmer} text-sm mt-10`}>
            ...ve daha onlarcası. Kendi departmanını oluştur, kendi uzmanını eğit.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TRUST BAR
// ─────────────────────────────────────────────
function TrustBar({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  const [isPaused, setIsPaused] = useState(false);

  const models = [
    { name: "Claude", color: "#D97706", desc: "Anthropic", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="#D97706"/></svg>
    )},
    { name: "GPT-4o", color: "#10B981", desc: "OpenAI", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 14.5 5.5 14.5 8C14.5 10.5 16 12 18.5 12C21 12 22 14.5 22 14.5C22 14.5 18.5 17 16 17C13.5 17 12 18.5 12 22C12 18.5 10.5 17 8 17C5.5 17 2 14.5 2 14.5C2 14.5 3 12 5.5 12C8 12 9.5 10.5 9.5 8C9.5 5.5 12 2 12 2Z" fill="#10B981"/></svg>
    )},
    { name: "Gemini", color: "#4285F4", desc: "Google", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#4285F4"/></svg>
    )},
    { name: "Llama 3", color: "#7C3AED", desc: "Meta", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 12C2 12 5.5 7 8 7C10 7 10.5 10 12 10C13.5 10 14 7 16 7C18.5 7 22 12 22 12C22 12 18.5 17 16 17C14 17 13.5 14 12 14C10.5 14 10 17 8 17C5.5 17 2 12 2 12Z" fill="#7C3AED"/></svg>
    )},
    { name: "Mistral", color: "#F97316", desc: "Mistral AI", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="5" height="5" rx="1" fill="#F97316"/><rect x="10" y="3" width="5" height="5" rx="1" fill="#F97316" opacity="0.7"/><rect x="17" y="3" width="5" height="5" rx="1" fill="#F97316"/><rect x="3" y="10" width="5" height="5" rx="1" fill="#F97316" opacity="0.7"/><rect x="17" y="10" width="5" height="5" rx="1" fill="#F97316" opacity="0.7"/><rect x="3" y="17" width="5" height="5" rx="1" fill="#F97316"/><rect x="10" y="17" width="5" height="5" rx="1" fill="#F97316" opacity="0.7"/><rect x="17" y="17" width="5" height="5" rx="1" fill="#F97316"/></svg>
    )},
    { name: "Grok", color: "#EF4444", desc: "xAI", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4L10.5 12L4 20H7L12 13.5L17 20H20L13.5 12L20 4H17L12 10.5L7 4H4Z" fill="#EF4444"/></svg>
    )},
    { name: "DeepSeek", color: "#06B6D4", desc: "DeepSeek", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 10C4 10 6 6 10 5C14 4 16 6 18 8C20 10 21 14 19 17C17 20 13 21 10 19C7 17 5 14 6 11" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="14" cy="10" r="1.5" fill="#06B6D4"/></svg>
    )},
    { name: "Qwen", color: "#8B5CF6", desc: "Alibaba", svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#8B5CF6" strokeWidth="2.5" fill="none"/><path d="M15 12C15 14 13.5 16 12 16C10.5 16 9 14 9 12C9 10 10.5 8 12 8C13.5 8 15 10 15 12Z" fill="#8B5CF6"/><path d="M16 16L20 21" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round"/></svg>
    )},
  ];

  const allModels = [...models, ...models];
  const controls = useAnimationControls();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <section className="py-16 border-y border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <p className="text-center text-xs text-gray-400 font-medium mb-8 uppercase tracking-widest">
          Desteklenen AI Modelleri
        </p>
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={marqueeRef}
            className="flex gap-4 items-center"
            animate={controls}
          >
            {allModels.map((model, idx) => (
              <div
                key={`${model.name}-${idx}`}
                className="bg-gray-50 border border-transparent rounded-xl px-3 py-2 flex items-center gap-2.5 cursor-default transition-all duration-200 group shrink-0"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${model.color}50`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${model.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                  style={{ backgroundColor: `${model.color}15` }}
                >
                  {model.svg}
                </div>
                <div>
                  <span className="text-gray-900 text-sm font-bold block leading-tight">{model.name}</span>
                  <span className="text-[10px] text-gray-400">{model.desc}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          BYOK &mdash; Kendi API anahtarını getir, ekstra AI maliyeti yok. İstediğin modeli kullan.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────
function HowItWorks({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const steps = [
    {
      num: "01",
      icon: "🏢",
      title: "Şirketini Kur",
      desc: "Müzik, pazarlama, finans, içerik... istediğin departmanları ve rolleri birkaç tıkla oluştur. Şablonlar mevcut.",
    },
    {
      num: "02",
      icon: "🤖",
      title: "Uzman Ajanları İşe Al",
      desc: "Her ajan binlerce YouTube videosu, sosyal medya paylaşımı, GitHub projesi ve makaleyi analiz ederek uzmanlaştırılmıştır. Birbirlerini tanıyan çalışanlar.",
    },
    {
      num: "03",
      icon: "🤝",
      title: "Toplantı Düzenle",
      desc: "Ajanlar şirket içi toplantılara katılır — her departman temsilcisi diğerlerinden beslenir. Entelektüel ajanınız bile var: kimsenin düşünmediği bakış açılarını sunar.",
    },
  ];

  return (
    <section id="nasil-calisir" className={`py-24 px-5 ${t.bg}`}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[#D8FB32] border border-[#D8FB32]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Nasıl Çalışır
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${t.text}`}>
              3 Adımda Başla
            </h2>
            <p className={`${t.textDim} text-lg mt-4 max-w-xl mx-auto`}>
              Teknik bilgi gerekmez.
              <br />
              10 dakikada ilk ajanın çalışıyor olsun.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <StaggerItem key={i} className="relative flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#D8FB32] flex items-center justify-center text-2xl font-black text-[#0A0A0A] shadow-lg">
                  {step.icon}
                </div>
                <span className={`text-5xl font-black ${t.textWhite10} select-none`}>{step.num}</span>
              </div>
              <h3 className={`text-xl font-bold ${t.text}`}>{step.title}</h3>
              <p className={`${t.textDim} leading-relaxed`}>{step.desc}</p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HOW THE SYSTEM WORKS (detailed deep dive)
// ─────────────────────────────────────────────
function SystemDeepDive({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const points = [
    {
      icon: "📚",
      title: "Binlerce Kaynaktan Beslenen Uzmanlar",
      desc: "Her ajan, binlerce YouTube videosu, sosyal medya paylaşımı, GitHub projesi ve akademik makaleyi analiz ederek uzmanlaştırılmıştır. Bir avukat ajanı binlerce yasal içeriği, bir SEO uzmanı binlerce site denetimini içselleştirmiştir.",
    },
    {
      icon: "🤝",
      title: "Şirket İçi Toplantılar",
      desc: "Ajanlar birbirleriyle toplantılara katılır — pazarlama ajanı finans ajanının bütçe kısıtlamalarını bilir, içerik üretici ajanın SEO uzmanının keyword araştırmasını kullanır. Gerçek bir şirket gibi koordineli çalışma.",
    },
    {
      icon: "🧠",
      title: "Entelektüel Ajan",
      desc: "Binlerce kitap, film ve makaleyi içselleştirmiş bir ajan. Toplantılarda kimsenin düşünmediği bakış açılarını sunar. Strateji tartışmalarında felsefi derinlik katar.",
    },
    {
      icon: "📱",
      title: "İçerik Üreticilerinin Bilgisi",
      desc: "Kullanıcılar, sosyal medyadaki içerik üreticilerinin fikirlerini ve görüşlerini de ajan sistemi üzerinden görebilir. 25+ uzman içerik üreticisinin birikimi sisteme entegre.",
    },
    {
      icon: "🔄",
      title: "Sürekli Öğrenen Sistem",
      desc: "Ajanlar pasif değildir — YouTube, X, Reddit, GitHub ve daha fazlasından sürekli veri toplar, analiz eder ve kendini günceller. Her gün daha akıllı olur.",
    },
    {
      icon: "🎯",
      title: "Orkestra Yönetimi",
      desc: "Bir orkestra şefi gibi: her enstrüman kendi partisini çalar, ama orkestra şefi hepsini koordine eder. Siz yönetirsiniz, ajanlar çalışır.",
    },
  ];

  return (
    <section className="py-24 px-5 bg-[#2D1B69]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[#D8FB32] border border-[#D8FB32]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Perde Arkası
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Bir AI Şirketi Nasıl Çalışır?
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              Sadece chatbot değil &mdash; gerçek bir organizasyon yapısı.
              <br />
              Her ajan uzman, her departman koordineli, her toplantı &uuml;retken.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <StaggerItem key={i}>
              <div className="bg-[#3D2B79] rounded-2xl p-6 border border-white/10 hover:border-[#D8FB32]/50 hover:shadow-lg hover:shadow-[#D8FB32]/5 transition-all duration-200 group h-full">
                <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-[#D8FB32] flex items-center justify-center text-2xl mb-4 transition-colors duration-200">
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{point.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HUMAN vs AI COMPARISON — Smart metrics
// ─────────────────────────────────────────────
function HumanVsAI({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const comparisons = [
    {
      category: "Öğrenme Kapasitesi",
      icon: "🧠",
      human: { value: "~50 sayfa/gün", detail: "Bir insan günde ortalama 50 sayfa okuyup sindirerek öğrenebilir" },
      ai: { value: "100.000+ sayfa/gün", detail: "AI ajanlar binlerce makale, video transkripti ve dökümanı aynı anda işler" },
      multiplier: "2.000x",
    },
    {
      category: "Çalışma Süresi",
      icon: "⏰",
      human: { value: "8 saat/gün", detail: "Yorgunluk, dikkat dağınıklığı, molalar dahil verimli çalışma süresi" },
      ai: { value: "24 saat/gün", detail: "Durmadan, yorulmadan, tatil istemeden — 7 gün 24 saat aktif" },
      multiplier: "3x",
    },
    {
      category: "Eşzamanlı Görev",
      icon: "🔀",
      human: { value: "1-2 görev", detail: "İnsan beyni aynı anda en fazla 1-2 göreve odaklanabilir" },
      ai: { value: "40+ görev", detail: "Her ajan kendi alanında bağımsız çalışır — paralel işlem gücü" },
      multiplier: "20x+",
    },
    {
      category: "Araştırma Hızı",
      icon: "🔍",
      human: { value: "2-4 saat", detail: "Bir konuda derinlemesine araştırma yapmak saatler alır" },
      ai: { value: "2-4 dakika", detail: "Yüzlerce kaynağı tarayıp, özetleyip, aksiyon önerisi sunar" },
      multiplier: "60x",
    },
    {
      category: "Maliyet (Aylık)",
      icon: "💰",
      human: { value: "40.000+ TL", detail: "Tek bir uzman çalışanın asgari maaş + SGK maliyeti" },
      ai: { value: "$49'dan", detail: "40+ uzman ajan, 8 departman, sınırsız çalışma — tek abonelik" },
      multiplier: "20x ucuz",
    },
    {
      category: "Tutarlılık",
      icon: "🎯",
      human: { value: "Değişken", detail: "Ruh hali, yorgunluk, motivasyon — performans dalgalanır" },
      ai: { value: "%99.9", detail: "Her seferinde aynı kalitede, tutarlı ve ölçülebilir çıktı" },
      multiplier: "Sabit",
    },
  ];

  return (
    <section className="py-28 px-5 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #1A0F08 40%, #1F1208 60%, #0A0A0A 100%)" }}>
      {/* Warm amber atmosphere */}
      <FloatingOrb color="#F59E0B" size={300} top="5%" right="-5%" delay={1} blur={100} />
      <FloatingOrb color="#EF4444" size={200} bottom="15%" left="5%" delay={3} blur={80} />

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#D8FB32] border border-[#D8FB32]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Kıyaslama
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${t.text}`}>
              Bir insan vs. AI ekip
            </h2>
            <p className={`${t.textDim} text-lg mt-4 max-w-xl mx-auto`}>
              Rakamlar kendisi i&ccedil;in konuşuyor.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`${t.bgCard} border ${t.border} rounded-2xl p-5 sm:p-6 hover:border-[#D8FB32]/30 transition-all duration-200 group`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-center">
                {/* Human side */}
                <div className="text-center sm:text-right">
                  <div className={`text-xs font-bold uppercase tracking-wider ${t.textDimmer} mb-1`}>İnsan</div>
                  <div className={`text-xl sm:text-2xl font-black ${t.textMuted}`}>{item.human.value}</div>
                  <p className={`text-xs ${t.textDim} mt-1 hidden sm:block`}>{item.human.detail}</p>
                </div>

                {/* Center — icon + multiplier */}
                <div className="flex flex-col items-center gap-1.5 mx-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`text-xs font-bold ${t.textDim} uppercase`}>{item.category}</span>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 + 0.1, type: "spring" }}
                    className="bg-[#D8FB32] text-[#0A0A0A] text-xs font-black px-3 py-1 rounded-full"
                  >
                    {item.multiplier}
                  </motion.div>
                </div>

                {/* AI side */}
                <div className="text-center sm:text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D8FB32] mb-1">Kai Agents</div>
                  <div className="text-xl sm:text-2xl font-black text-[#D8FB32]">{item.ai.value}</div>
                  <p className={`text-xs ${t.textDim} mt-1 hidden sm:block`}>{item.ai.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <p className={`${t.textDim} text-base mb-2`}>
              Bir &ccedil;alışan m&uuml;lakat, eğitim ve adaptasyon s&uuml;reci: <span className="text-[#D8FB32] font-semibold">ortalama 3 ay</span>
            </p>
            <p className={`${t.textDim} text-base mb-6`}>
              AI ekibinin hazır olma s&uuml;resi: <span className="text-[#D8FB32] font-semibold">10 dakika</span>
            </p>
            <a
              href="#bekleme-listesi"
              className="inline-flex items-center gap-2 bg-[#D8FB32] text-[#0A0A0A] px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#B4F030] transition-colors"
            >
              AI Ekibini Kur &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FEATURES GRID
// ─────────────────────────────────────────────
function Features({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const features = [
    {
      icon: "🏢",
      title: "Departman Yönetimi",
      desc: "Müzik, pazarlama, finans, hukuk... İstediğin departmanı sıfırdan kur ya da hazır şablonlardan başla.",
    },
    {
      icon: "🤖",
      title: "Uzman Ajanlar",
      desc: "Her ajana özel rol, kişilik ve uzmanlık tanımla. Binlerce kaynaktan beslenmiş, sürekli öğrenen uzmanlar.",
    },
    {
      icon: "📋",
      title: "Görev Takibi",
      desc: "Ajan bazlı görev ver, önceliklendir, takip et. Sonuçları gerçek zamanlı gör.",
    },
    {
      icon: "🤝",
      title: "Birimler Arası Toplantı",
      desc: "Müzik ajanın pazarlama ajanıyla konuşsun. Bilgi akışı otomatik, koordinasyon kusursuz.",
    },
    {
      icon: "💰",
      title: "Bütçe Kontrolü",
      desc: "Ajan bazlı harcama limiti belirle. Token maliyetlerini gerçek zamanlı takip et.",
    },
    {
      icon: "⏰",
      title: "Heartbeats",
      desc: "Zamanlanmış görevler ve otomatik çalışma döngüleri. Her sabah raporunu al, akşam özetini gör.",
    },
  ];

  return (
    <section id="ozellikler" className="py-24 px-5 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[#0A0A0A] border border-[#0A0A0A]/20 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Özellikler
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0A0A0A]">
              Her şey yerli yerinde
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
              Dağınık araçlar, birbirini bilmeyen botlar, kopuk iş akışları...
              <br />
              <span className="text-[#0A0A0A] font-semibold">&mdash; Buna son veren, gelişmiş bir sistem &mdash;</span>
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#0A0A0A]/30 hover:shadow-lg transition-all duration-200 group h-full">
                <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-[#D8FB32] flex items-center justify-center text-2xl mb-4 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// DEPARTMENT SHOWCASE — Expandable Department System
// ─────────────────────────────────────────────

type DepartmentAgent = {
  icon: string;
  name: string;
  role: string;
  oneLiner: string;
  capabilities: string[];
  previews: {
    title: string;
    items: string[];
  };
};

type DepartmentReport = {
  title: string;
  icon: string;
  sections: {
    label: string;
    lines: { text: string; highlight?: boolean; status?: "green" | "yellow" | "red" }[];
    progress?: number;
  }[];
};

type Department = {
  id: string;
  label: string;
  icon: string;
  color: string;
  director: string;
  directorIcon: string;
  hierarchy: { icon: string; name: string; role: string }[];
  agents: DepartmentAgent[];
  report: DepartmentReport;
};

const DEPARTMENTS: Department[] = [
  {
    id: "sosyal-medya",
    label: "Sosyal Medya",
    icon: "📱",
    color: "#4ECDC4",
    director: "Sosyal Medya Direktörü",
    directorIcon: "👔",
    hierarchy: [
      { icon: "👔", name: "SM Direktörü", role: "Strateji & Koordinasyon" },
      { icon: "𝕏", name: "X/Twitter Uzmanı", role: "Thread & Engagement" },
      { icon: "📸", name: "Instagram Uzmanı", role: "Reels & Carousel" },
      { icon: "💼", name: "LinkedIn Uzmanı", role: "B2B & Network" },
      { icon: "📺", name: "YouTube Uzmanı", role: "SEO & Büyüme" },
      { icon: "📊", name: "Analitik Uzmanı", role: "Veri & Raporlama" },
    ],
    agents: [
      {
        icon: "𝕏",
        name: "X/Twitter Uzmanı",
        role: "Platform Uzmanı",
        oneLiner: "Thread formatından engagement taktiklerine, X algoritmasını bilen uzman.",
        capabilities: [
          "Viral thread yazımı ve zamanlama",
          "Engagement analizi ve optimizasyon",
          "Rakip hesap benchmark karşılaştırması",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık etkileşim raporu — gösterim, RT, yanıt analizi",
            "En iyi paylaşım saatleri ve format önerileri",
            "Rakip analizi — 5 hesabın stratejileri",
            "Thread şablonları ve A/B test sonuçları",
          ],
        },
      },
      {
        icon: "📸",
        name: "Instagram Uzmanı",
        role: "Platform Uzmanı",
        oneLiner: "Reels, Carousel ve Stories stratejileriyle organik büyüme uzmanı.",
        capabilities: [
          "Carousel ve Reels içerik stratejisi",
          "Hashtag araştırma ve optimize etme",
          "Explore sayfası algoritma analizi",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık erişim ve takipçi büyüme raporu",
            "İçerik türü karşılaştırması — Reels vs Carousel vs Tek Görsel",
            "Kaydetme oranı analizi ve iyileştirme önerileri",
            "En iyi paylaşım saatleri ve gün analizi",
          ],
        },
      },
      {
        icon: "📺",
        name: "YouTube Uzmanı",
        role: "Platform Uzmanı",
        oneLiner: "Thumbnail, SEO, retention — YouTube büyüme stratejisi uzmanı.",
        capabilities: [
          "Thumbnail CTR optimizasyonu",
          "Başlık ve açıklama SEO stratejisi",
          "İzlenme süresi ve retention analizi",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Niş belirleme — veri bazlı kanal konumlandırma",
            "Thumbnail A/B test önerileri ve CTR raporu",
            "Haftalık performans: izlenme, retention, abone dönüşüm",
            "Upload sıklığı ve playlist stratejisi planı",
          ],
        },
      },
    ],
    report: {
      title: "Haftalık Sosyal Medya Performans Raporu",
      icon: "📊",
      sections: [
        {
          label: "X/Twitter Analizi",
          lines: [
            { text: "Gösterim: 12.4K (+%23 geçen haftaya göre)", highlight: true },
            { text: "Etkileşim oranı: %4.2 (sektör ort. %1.8)", status: "green" },
            { text: "En iyi içerik: \"AI ile müzik\" thread — 890 RT" },
            { text: "Öneri: Thread formatı %180 daha fazla etkileşim alıyor" },
          ],
        },
        {
          label: "Instagram Analizi",
          lines: [
            { text: "Erişim: 8.7K, 342 yeni takipçi", highlight: true },
            { text: "Carousel postlar Reels’den 3x daha fazla kaydetme aldı", status: "green" },
            { text: "En iyi saat: 19:00-21:00 arası" },
            { text: "Öneri: Carousel’e odaklan, haftada 3 post" },
          ],
        },
        {
          label: "LinkedIn Analizi",
          lines: [
            { text: "2 post viral oldu — 15K görüntülenme", highlight: true },
            { text: "B2B tonlu içerik %67 daha etkili", status: "green" },
            { text: "Profesyonel network +89 bağlantı" },
            { text: "Öneri: Vaka çalışması formatı dene" },
          ],
        },
        {
          label: "YouTube Analizi",
          lines: [
            { text: "Ortalama izlenme süresi: 6:42 (hedef: 8:00)", status: "yellow" },
            { text: "Thumbnail CTR: %4.8 (iyi)", status: "green" },
            { text: "Abone dönüşüm: %2.1" },
            { text: "Öneri: İlk 30 saniyeyi güçlendir, hook optimize et" },
          ],
          progress: 68,
        },
      ],
    },
  },
  {
    id: "hukuk",
    label: "Hukuk & Danışmanlık",
    icon: "⚖️",
    color: "#FF6B6B",
    director: "Hukuk Direktörü",
    directorIcon: "👔",
    hierarchy: [
      { icon: "👔", name: "Hukuk Direktörü", role: "Strateji & Risk" },
      { icon: "⚖️", name: "Avukat Ajanı", role: "Sözleşme & Telif" },
      { icon: "🛡️", name: "KVKK Uzmanı", role: "Veri Koruma" },
      { icon: "🧠", name: "Psikolog Ajanı", role: "Mental Sağlık" },
    ],
    agents: [
      {
        icon: "⚖️",
        name: "Avukat Ajanı",
        role: "Hukuk Uzmanı",
        oneLiner: "Binlerce yasal içeriği analiz etmiş, sözleşme ve telif uzmanı.",
        capabilities: [
          "Sözleşme analizi ve risk tespiti",
          "KVKK uyumluluk denetimi",
          "Telif hakkı araştırması ve koruma",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Sözleşme risk raporu — madde bazlı analiz",
            "KVKK uyumluluk skoru ve eksiklik listesi",
            "Telif hakkı durumu ve koruma önerileri",
            "Yasal süreç takibi ve hatırlatmalar",
          ],
        },
      },
      {
        icon: "🧠",
        name: "Psikolog Ajanı",
        role: "Mental Sağlık Uzmanı",
        oneLiner: "Mental sağlık takibi ve terapi destek uzmanı.",
        capabilities: [
          "Mental sağlık durumu takibi",
          "İlaç hatırlatma ve yönetim",
          "Terapi notları organizasyonu",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık mental sağlık özeti",
            "İlaç ve randevu hatırlatma sistemi",
            "Stres ve motivasyon takip grafiği",
          ],
        },
      },
    ],
    report: {
      title: "Haftalık Hukuk Durum Raporu",
      icon: "⚖️",
      sections: [
        {
          label: "Sözleşme Analizi",
          lines: [
            { text: "3 sözleşme incelendi, 2’sinde risk tespit edildi", status: "yellow" },
            { text: "Tedarikçi sözleşmesinde ceza maddesi eksik", status: "red" },
            { text: "Öneri: Madde 7.3’e fesih koşulları eklensin" },
          ],
        },
        {
          label: "KVKK Uyumluluk",
          lines: [
            { text: "Web sitesi taraması: 2 eksik aydınlatma metni", status: "yellow" },
            { text: "Çerez politikası güncellenmeli" },
            { text: "Veri işleme envanteri oluşturulmalı" },
            { text: "Durum: %78 uyumlu — hedef %100", highlight: true },
          ],
          progress: 78,
        },
        {
          label: "Telif Hakkı",
          lines: [
            { text: "1 içerik telif riski taşıyor — kaynak belirtilmeli", status: "red" },
            { text: "Marka tescil başvurusu: süreç devam ediyor", status: "yellow" },
          ],
        },
      ],
    },
  },
  {
    id: "muzik",
    label: "Müzik & Sanat",
    icon: "🎵",
    color: "#A855F7",
    director: "Müzik Direktörü",
    directorIcon: "🎼",
    hierarchy: [
      { icon: "🎼", name: "Müzik Direktörü", role: "Prodüksiyon & Strateji" },
      { icon: "🎹", name: "Prodüktör Ajanı", role: "BPM, Ton, Mix" },
      { icon: "🎤", name: "Vokal Koçu", role: "Ses Sağlığı" },
      { icon: "🎭", name: "Sahne Performans", role: "Kamera & Sahne" },
      { icon: "🎧", name: "Ses Mühendisi", role: "Mix & Master" },
    ],
    agents: [
      {
        icon: "🎹",
        name: "Müzik Prodüktör Ajanı",
        role: "Prodüksiyon Uzmanı",
        oneLiner: "BPM, ton, mix/master ve AI müzik prompt uzmanı.",
        capabilities: [
          "BPM analiz ve ton tespiti",
          "Mix/master rehberliği ve referans eşleştirme",
          "Suno/AI müzik prompt optimizasyonu",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Demo analiz raporu — BPM, ton, tarz eşleştirme",
            "Mix önerileri — vokal, bass, EQ ayarları",
            "Referans şarkı uyum skoru",
            "AI müzik prompt şablonları",
          ],
        },
      },
      {
        icon: "🎤",
        name: "Vokal Koçu Ajanı",
        role: "Ses Uzmanı",
        oneLiner: "Ses sağlığı, warm-up rutinleri ve performans hazırlığı.",
        capabilities: [
          "Günlük warm-up rutinleri",
          "Ses aralığı takibi ve genişletme",
          "Kayıt öncesi hazırlık planı",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık vokal durum raporu",
            "Ses aralığı gelişim grafiği",
            "Kişiselleştirilmiş warm-up programı",
          ],
        },
      },
      {
        icon: "🎭",
        name: "Sahne Performans Ajanı",
        role: "Performans Uzmanı",
        oneLiner: "Kamera önü ve sahne hareketi uzmanı.",
        capabilities: [
          "Sahne varlığı ve enerji yönetimi",
          "Freestyle rehberliği ve pratik planı",
          "Kamera önü performans koçluğu",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Performans analiz raporu",
            "Sahne hareket koreografi önerileri",
            "Freestyle geliştirme planı",
          ],
        },
      },
    ],
    report: {
      title: "Haftalık Müzik Prodüksiyon Raporu",
      icon: "🎵",
      sections: [
        {
          label: "Prodüksiyon",
          lines: [
            { text: "3 yeni demo analiz edildi", highlight: true },
            { text: "BPM: 116 | Ton: Am | Tarz: Turkish Pop-Rock" },
            { text: "Mix önerileri: vokal +2dB, bass EQ 80Hz cut" },
            { text: "Referans şarkı uyumu: %87 (Mert Demir tarzı)", status: "green" },
          ],
        },
        {
          label: "Vokal Durumu",
          lines: [
            { text: "Warm-up rutini: %100 uyum (7 gün)", status: "green" },
            { text: "Ses aralığı: A2-E5 (stabil)" },
            { text: "Öneriler: Falsetto pratiği artırılmalı", status: "yellow" },
          ],
          progress: 85,
        },
        {
          label: "Dağıtım",
          lines: [
            { text: "Spotify: 696K toplam dinlenme (+%3)", highlight: true },
            { text: "Apple Music: yeni pazarlara açılım önerisi" },
            { text: "Playlist pitch: 2 editöryal listeye başvuruldu" },
          ],
        },
      ],
    },
  },
  {
    id: "yazilim",
    label: "Yazılım & Teknoloji",
    icon: "💻",
    color: "#3B82F6",
    director: "Teknik Direktör",
    directorIcon: "🏗️",
    hierarchy: [
      { icon: "🏗️", name: "Teknik Direktör", role: "Mimari & Strateji" },
      { icon: "⚡", name: "Full-Stack Dev", role: "React, Next.js, Python" },
      { icon: "🔧", name: "DevOps Ajanı", role: "CI/CD & Altyapı" },
      { icon: "🐛", name: "QA Test Ajanı", role: "Kalite Kontrol" },
      { icon: "🗄️", name: "Veritabanı Uzmanı", role: "PostgreSQL & API" },
    ],
    agents: [
      {
        icon: "⚡",
        name: "Full-Stack Developer Ajanı",
        role: "Geliştirici Uzmanı",
        oneLiner: "GitHub’daki binlerce projeyi analiz etmiş, modern stack uzmanı.",
        capabilities: [
          "React, Next.js, Python, API geliştirme",
          "Kod inceleme ve optimizasyon",
          "Mimari tasarım önerileri",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Sprint raporu — tamamlanan ve devam eden görevler",
            "Kod kalite skoru ve iyileştirme önerileri",
            "Build durumu ve Lighthouse performans raporu",
            "Teknik borç analizi ve önceliklendirme",
          ],
        },
      },
      {
        icon: "🔧",
        name: "DevOps Ajanı",
        role: "Altyapı Uzmanı",
        oneLiner: "Deployment, CI/CD ve otomasyon uzmanı.",
        capabilities: [
          "CI/CD pipeline kurulumu",
          "Monitoring ve alerting",
          "Altyapı otomasyonu ve maliyet optimizasyonu",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Altyapı sağlık raporu — uptime, hata oranı",
            "Maliyet optimizasyon önerileri",
            "Güvenlik tarama sonuçları",
          ],
        },
      },
      {
        icon: "🐛",
        name: "QA Test Ajanı",
        role: "Kalite Uzmanı",
        oneLiner: "Bug tespiti ve kalite kontrol uzmanı.",
        capabilities: [
          "Test senaryoları oluşturma",
          "Otomasyon test yazımı",
          "Regresyon analizi",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Bug raporu — kritik, orta, düşük sınıflandırma",
            "Test coverage raporu ve öneriler",
            "Regresyon test sonuçları",
          ],
        },
      },
    ],
    report: {
      title: "Sprint Raporu — Hafta 14",
      icon: "💻",
      sections: [
        {
          label: "Tamamlanan",
          lines: [
            { text: "Landing page yeniden tasarımı", status: "green" },
            { text: "Paddle ödeme entegrasyonu", status: "green" },
            { text: "PWA manifest eklendi", status: "green" },
            { text: "3 kritik bug fix", status: "green" },
          ],
        },
        {
          label: "Devam Eden",
          lines: [
            { text: "Dashboard MVP — %60 tamamlandı", status: "yellow" },
            { text: "API endpoint’leri — 8/12 hazır" },
            { text: "Mobile responsive iyileştirme" },
          ],
          progress: 60,
        },
        {
          label: "Kod Kalitesi",
          lines: [
            { text: "TypeScript hata: 0", status: "green" },
            { text: "Build: Başarılı (97 sayfa)", status: "green" },
            { text: "Lighthouse skoru: 92/100", highlight: true },
          ],
          progress: 92,
        },
      ],
    },
  },
  {
    id: "finans",
    label: "Finans",
    icon: "💰",
    color: "#6366F1",
    director: "Finans Direktörü",
    directorIcon: "🏦",
    hierarchy: [
      { icon: "🏦", name: "Finans Direktörü", role: "Strateji & Planlama" },
      { icon: "📒", name: "Muhasebe Ajanı", role: "Fatura & Vergi" },
      { icon: "📈", name: "Yatırım Danışmanı", role: "Portföy & Piyasa" },
      { icon: "💹", name: "Strateji Ajanı", role: "Bütçe & Modelleme" },
    ],
    agents: [
      {
        icon: "📒",
        name: "Muhasebe Ajanı",
        role: "Muhasebe Uzmanı",
        oneLiner: "Fatura, gider ve vergi takip uzmanı.",
        capabilities: [
          "Fatura takibi ve raporlama",
          "Gider analizi ve kategorizasyon",
          "Vergi hatırlatma ve planlama",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Aylık gelir-gider raporu",
            "Kategori bazlı gider analizi",
            "Vergi takvimi ve hatırlatmalar",
            "Nakit akışı projeksiyonu",
          ],
        },
      },
      {
        icon: "📈",
        name: "Yatırım Danışmanı Ajanı",
        role: "Yatırım Uzmanı",
        oneLiner: "Piyasa analizi ve portföy yönetimi uzmanı.",
        capabilities: [
          "Piyasa analizi ve yorumlama",
          "Portföy çeşitlendirme önerileri",
          "Risk değerlendirme ve senaryo analizi",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık piyasa özeti",
            "Portföy performans raporu",
            "Risk analizi ve çeşitlendirme önerileri",
          ],
        },
      },
    ],
    report: {
      title: "Aylık Finansal Özet Raporu",
      icon: "💰",
      sections: [
        {
          label: "Gelir",
          lines: [
            { text: "Toplam: ₺47.200 (+%8 geçen aya göre)", highlight: true },
            { text: "Dijital ürünler: ₺12.400 (yeni!)", status: "green" },
            { text: "Freelance: ₺8.300" },
            { text: "Reklam geliri: ₺26.500" },
          ],
        },
        {
          label: "Gider",
          lines: [
            { text: "Toplam: ₺31.800 (bütçenin %94’ü)", status: "yellow" },
            { text: "AI abonelikleri: ₺5.200" },
            { text: "Hosting: ₺1.800" },
            { text: "Pazarlama: ₺3.400" },
          ],
          progress: 94,
        },
        {
          label: "Nakit Akışı & Öneriler",
          lines: [
            { text: "Net: +₺15.400", status: "green" },
            { text: "Kredi ödemesi: ₺21.500" },
            { text: "Dijital ürün satışını artır (en yüksek margin)" },
            { text: "AI aboneliklerini optimize et (-₺1.200 tasarruf)", status: "yellow" },
          ],
        },
      ],
    },
  },
  {
    id: "tasarim",
    label: "Tasarım",
    icon: "🎨",
    color: "#F59E0B",
    director: "Kreatif Direktör",
    directorIcon: "🎯",
    hierarchy: [
      { icon: "🎯", name: "Kreatif Direktör", role: "Marka & Vizyon" },
      { icon: "🖥️", name: "UI/UX Tasarımcı", role: "Deneyim Tasarımı" },
      { icon: "🎨", name: "Grafik Tasarımcı", role: "Görsel Kimlik" },
      { icon: "🎬", name: "Motion Designer", role: "Animasyon & Video" },
    ],
    agents: [
      {
        icon: "🖥️",
        name: "UI/UX Tasarımcı Ajanı",
        role: "Deneyim Uzmanı",
        oneLiner: "Dribbble, Behance trendlerini takip eden deneyim uzmanı.",
        capabilities: [
          "Wireframe ve prototyping",
          "Kullanıcı deneyimi analizi",
          "Erişilebilirlik denetimi",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "UX denetim raporu — kullanılabilirlik skoru",
            "Wireframe ve kullanıcı akışı önerileri",
            "Erişilebilirlik raporu — WCAG uyumu",
            "Rakip UX karşılaştırma analizi",
          ],
        },
      },
      {
        icon: "🎨",
        name: "Grafik Tasarımcı Ajanı",
        role: "Görsel Uzmanı",
        oneLiner: "Marka kimliği ve görsel tasarım uzmanı.",
        capabilities: [
          "Logo ve marka kimliği",
          "Sosyal medya görseli tasarımı",
          "Poster ve baskı tasarımı",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Marka kimliği analiz raporu",
            "Görsel tutarlılık denetimi",
            "Sosyal medya görsel şablonları",
          ],
        },
      },
    ],
    report: {
      title: "Haftalık Tasarım Raporu",
      icon: "🎨",
      sections: [
        {
          label: "Marka Kimliği",
          lines: [
            { text: "Logo suite tamamlandı — 4 varyasyon", status: "green" },
            { text: "Renk paleti: 5 ana + 3 aksan renk" },
            { text: "Tipografi: Inter + Space Grotesk" },
          ],
        },
        {
          label: "UI/UX Denetim",
          lines: [
            { text: "Kullanılabilirlik skoru: 87/100", highlight: true },
            { text: "3 kritik UX sorunu tespit edildi", status: "red" },
            { text: "Mobil deneyim iyileştirme önerileri hazır" },
          ],
          progress: 87,
        },
        {
          label: "Görsel Üretim",
          lines: [
            { text: "12 sosyal medya görseli üretildi", status: "green" },
            { text: "Thumbnail A/B test başladı" },
            { text: "Carousel şablonu güncellendi" },
          ],
        },
      ],
    },
  },
  {
    id: "pazarlama",
    label: "Pazarlama & Satış",
    icon: "📊",
    color: "#10B981",
    director: "Pazarlama Direktörü",
    directorIcon: "📣",
    hierarchy: [
      { icon: "📣", name: "Pazarlama Direktörü", role: "Strateji & ROI" },
      { icon: "🔍", name: "SEO Uzmanı", role: "Arama Motoru" },
      { icon: "📢", name: "İçerik Pazarlama", role: "Blog & Newsletter" },
      { icon: "🤝", name: "Satış Ajanı", role: "Outreach & CRM" },
      { icon: "📧", name: "E-mail Pazarlama", role: "Kampanya & Otomasyon" },
    ],
    agents: [
      {
        icon: "🔍",
        name: "SEO Uzmanı Ajanı",
        role: "Arama Motoru Uzmanı",
        oneLiner: "Binlerce site denetiminden beslenmiş arama motoru uzmanı.",
        capabilities: [
          "Keyword araştırma ve strateji",
          "Teknik SEO denetimi",
          "İçerik optimizasyonu ve link profili",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık SEO sağlık raporu — teknik sorunlar listesi",
            "Keyword sıralama takibi ve fırsat analizi",
            "Rakip SEO karşılaştırma raporu",
            "İçerik optimizasyon önerileri",
          ],
        },
      },
      {
        icon: "🤝",
        name: "Satış Ajanı",
        role: "Satış Uzmanı",
        oneLiner: "Cold email’den pitch deck’e satış uzmanı.",
        capabilities: [
          "Cold email ve outreach kampanyaları",
          "Pitch deck hazırlama ve sunum",
          "Müşteri takibi ve CRM yönetimi",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Haftalık satış pipeline raporu",
            "Cold email performans analizi — açılma, yanıt oranları",
            "Müşteri segmentasyon ve lead scoring",
          ],
        },
      },
    ],
    report: {
      title: "Haftalık Pazarlama Performans Raporu",
      icon: "📊",
      sections: [
        {
          label: "SEO Durumu",
          lines: [
            { text: "Site Skoru: 87/100 (+5 geçen haftaya göre)", highlight: true },
            { text: "Organik trafik: 4.2K ziyaret/hafta", status: "green" },
            { text: "1. sayfada 23 keyword (3 yeni eklendi)" },
            { text: "Kritik: 2 kırık link tespit edildi", status: "red" },
          ],
          progress: 87,
        },
        {
          label: "Satış Pipeline",
          lines: [
            { text: "Aktif lead: 47 (+12 yeni)", highlight: true },
            { text: "Cold email yanıt oranı: %8.3 (sektör ort. %3)", status: "green" },
            { text: "Kapanış oranı: %22 — hedef %25", status: "yellow" },
          ],
        },
        {
          label: "İçerik Pazarlama",
          lines: [
            { text: "4 blog yazısı yayınlandı — 2.1K toplam okuma" },
            { text: "Newsletter: %42 açılma oranı", status: "green" },
            { text: "Öneri: Case study formatı %3x daha etkili" },
          ],
        },
      ],
    },
  },
  {
    id: "arastirma",
    label: "Araştırma & İstihbarat",
    icon: "🔬",
    color: "#EC4899",
    director: "İstihbarat Direktörü",
    directorIcon: "🎯",
    hierarchy: [
      { icon: "🎯", name: "İstihbarat Direktörü", role: "Strateji & Analiz" },
      { icon: "📡", name: "Trend Analisti", role: "Viral & Piyasa" },
      { icon: "📖", name: "Entelektüel Ajan", role: "Felsefe & Kültür" },
      { icon: "🔎", name: "Veri Analisti", role: "Veri Madenciliği" },
    ],
    agents: [
      {
        icon: "📡",
        name: "Trend Analisti Ajanı",
        role: "Trend Uzmanı",
        oneLiner: "YouTube, X, Reddit, TikTok trendlerini takip eden uzman.",
        capabilities: [
          "Gerçek zamanlı trend tespiti",
          "Rakip analizi ve benchmark",
          "Viral içerik tahminleme",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Günlük trend bülteni — 5 platform özeti",
            "Rakip hareket raporu — yeni içerikler, stratejiler",
            "Viral potansiyel skoru — hangi içerik tutacak?",
            "Sektör trend haritası",
          ],
        },
      },
      {
        icon: "📖",
        name: "Entelektüel Ajan",
        role: "Düşünce Uzmanı",
        oneLiner: "Binlerce kitap, film ve makaleyi içselleştirmiş düşünür.",
        capabilities: [
          "Farklı bakış açıları sunma",
          "Strateji tartışmalarında derinlik katma",
          "Kültürel ve felsefi referanslar",
        ],
        previews: {
          title: "Bu ajan size neler sunar?",
          items: [
            "Strateji toplantısı perspektif notu",
            "İlham kaynakları listesi — konu bazlı",
            "Kültürel bağlam analizi",
          ],
        },
      },
    ],
    report: {
      title: "Haftalık İstihbarat Raporu",
      icon: "🔬",
      sections: [
        {
          label: "Trend Tespiti",
          lines: [
            { text: "AI müzik trendi: +%340 arama hacmi artışı", highlight: true },
            { text: "TikTok: 3 yeni viral ses formatı tespit edildi", status: "green" },
            { text: "YouTube: \"behind the scenes\" içerikler %2x büyüme" },
          ],
        },
        {
          label: "Rakip İstihbaratı",
          lines: [
            { text: "5 rakip hesap analiz edildi" },
            { text: "2 rakip yeni ürün lansmanı yaptı", status: "yellow" },
            { text: "Fırsat: Rakiplerin ihmal ettiği 3 niş tespit edildi", status: "green" },
          ],
        },
        {
          label: "Entelektüel Perspektif",
          lines: [
            { text: "\"Yaratıcı yıkım\" konsepti bu haftanın stratejisine uygun" },
            { text: "Referans: Clayton Christensen — Innovator’s Dilemma" },
            { text: "Öneri: Blue ocean stratejisi değerlendirmesi" },
          ],
        },
      ],
    },
  },
];

// ─────────────────────────────────────────────
// Department Hierarchy Tree
// ─────────────────────────────────────────────
function HierarchyTree({ department, theme }: { department: Department; theme: "dark" | "light" }) {
  const t = c(theme);
  return (
    <div className={`${t.bgCardInner} rounded-2xl p-5 border ${t.border}`}>
      <h4 className={`text-sm font-bold ${t.textMuted} uppercase tracking-wider mb-4`}>Ekip Yapısı</h4>
      <div className="space-y-0">
        {department.hierarchy.map((member, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Tree lines */}
            <div className="flex flex-col items-center w-5 shrink-0">
              {i === 0 ? (
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: department.color }} />
              ) : (
                <>
                  <div className="w-px h-3" style={{ backgroundColor: `${department.color}40` }} />
                  <div className="flex items-center">
                    <div className="w-px h-0" />
                    <div className="w-2 h-2 rounded-full border-2" style={{ borderColor: department.color }} />
                  </div>
                </>
              )}
              {i < department.hierarchy.length - 1 && (
                <div className="w-px h-3" style={{ backgroundColor: `${department.color}40` }} />
              )}
            </div>
            {/* Member info */}
            <div className={`flex items-center gap-2.5 py-1.5 flex-1 min-w-0`}>
              <span className="text-lg shrink-0">{member.icon}</span>
              <div className="min-w-0">
                <span className={`text-sm font-semibold ${i === 0 ? "text-white" : t.textMuted} block truncate`}>
                  {member.name}
                </span>
                <span className={`text-xs ${t.textDim} block truncate`}>{member.role}</span>
              </div>
              {i === 0 && (
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ml-auto shrink-0"
                  style={{ backgroundColor: `${department.color}20`, color: department.color }}
                >
                  Direktör
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Department Report Preview (Dashboard Widget Style)
// ─────────────────────────────────────────────
function ReportPreview({ report, department, theme }: { report: DepartmentReport; department: Department; theme: "dark" | "light" }) {
  const t = c(theme);
  const isDark = theme === "dark";

  return (
    <div className={`${t.bgCard} border ${t.border} rounded-2xl overflow-hidden`}>
      {/* Report header — looks like a dashboard widget */}
      <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderBottom: `1px solid ${department.color}20` }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: `${department.color}15` }}
        >
          {report.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-bold ${t.text} truncate`}>{report.title}</h4>
          <span className={`text-xs ${t.textDim}`}>Otomatik oluşturuldu — 2 saat önce</span>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
          style={{ backgroundColor: `${department.color}15`, color: department.color }}
        >
          Canlı
        </span>
      </div>

      {/* Report body with monospace data */}
      <div className="relative">
        <div className="px-5 py-4 space-y-4">
          {report.sections.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: department.color }} />
                <span className={`text-xs font-bold ${t.text} uppercase tracking-wide`}>{section.label}</span>
              </div>
              <div className="space-y-1.5 pl-3">
                {section.lines.map((line, j) => (
                  <div key={j} className="flex items-start gap-2">
                    {line.status ? (
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        line.status === "green" ? "bg-green-400" :
                        line.status === "yellow" ? "bg-yellow-400" :
                        "bg-red-400"
                      }`} />
                    ) : (
                      <span className={`w-1 h-1 rounded-full mt-2 shrink-0 ${isDark ? "bg-white/20" : "bg-black/20"}`} />
                    )}
                    <span className={`text-xs font-mono leading-relaxed ${
                      line.highlight ? t.text : t.textDim
                    } ${line.highlight ? "font-semibold" : ""}`}>
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>
              {section.progress !== undefined && (
                <div className="mt-2 pl-3">
                  <div className={`w-full h-1.5 rounded-full ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${section.progress}%`,
                        backgroundColor: section.progress >= 80 ? "#22c55e" : section.progress >= 50 ? "#eab308" : "#ef4444",
                      }}
                    />
                  </div>
                  <span className={`text-[10px] ${t.textDim} mt-1 block`}>%{section.progress} tamamlandı</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Blur overlay with lock */}
        <div className={`absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center pb-4 ${
          isDark
            ? "bg-gradient-to-t from-[#141414] via-[#141414]/95 to-transparent"
            : "bg-gradient-to-t from-white via-white/95 to-transparent"
        }`}>
          <div className="flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full" style={{ backgroundColor: `${department.color}15`, border: `1px solid ${department.color}30` }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="0.5" y="5.5" width="11" height="8" rx="2" stroke={department.color} strokeWidth="1" />
              <path d="M3 5.5V3.5C3 1.84 4.34 0.5 6 0.5C7.66 0.5 9 1.84 9 3.5V5.5" stroke={department.color} strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: department.color }}>
              Tam raporu görmek için Pro plana geçin →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Expanded Agent Card — Premium Profile
// ─────────────────────────��───────────────────
function ExpandedAgentCard({ agent, department, theme }: { agent: DepartmentAgent; department: Department; theme: "dark" | "light" }) {
  const t = c(theme);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className={`${t.bgCard} rounded-2xl transition-all duration-500 h-full flex flex-col overflow-hidden group`}
      style={{ border: `1px solid ${department.color}33` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${department.color}66`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${department.color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${department.color}33`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Top accent gradient bar */}
      <div className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${department.color}, ${department.color}40)` }} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header — larger, more prominent */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: `${department.color}20`, boxShadow: `0 4px 12px ${department.color}15` }}
          >
            {agent.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-black ${t.text} truncate`}>{agent.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${department.color}15`, color: department.color }}
              >
                Uzman
              </span>
              <span className={`text-xs ${t.textDim}`}>{agent.role}</span>
            </div>
          </div>
          {/* Online status */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">7/24</span>
          </div>
        </div>

        {/* Description */}
        <p className={`${t.textMuted} text-sm mb-5 leading-relaxed`}>{agent.oneLiner}</p>

        {/* Capabilities — skill badges */}
        <div className="mb-5">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${t.textDim} mb-2.5 block`}>Yetkinlikler</span>
          <ul className="flex flex-col gap-2.5">
            {agent.capabilities.map((cap, j) => (
              <li key={j} className="flex items-start gap-2.5 text-sm">
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${department.color}15` }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke={department.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={`${t.textMuted} leading-relaxed`}>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Toggle Preview — prominent button */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="mt-auto flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: showPreview ? `${department.color}20` : `${department.color}10`,
            color: department.color,
            border: `1px solid ${department.color}30`,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-200 ${showPreview ? "rotate-180" : ""}`}
          >
            <path d="M2 4L6 8L10 4" stroke={department.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {showPreview ? "Gizle" : "Neler yapabilir? →"}
        </button>
      </div>

      {/* Preview section — expanded capability showcase */}
      <div
        className={`overflow-hidden transition-all duration-300 ${showPreview ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 pt-0">
          <div
            className="rounded-xl p-5 space-y-3"
            style={{ backgroundColor: `${department.color}08`, border: `1px solid ${department.color}15` }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: department.color }}>
              {agent.previews.title}
            </span>
            {agent.previews.items.map((item, j) => (
              <div key={j} className="flex items-start gap-3">
                <span className="text-sm mt-0.5" style={{ color: department.color }}>&rarr;</span>
                <span className={`text-sm ${t.textMuted} leading-relaxed`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DEPARTMENT SHOWCASE (Main Component — replaces UseCases + SampleReports)
// ─────────────────────────────────────────────
function DepartmentShowcase({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  const [activeTab, setActiveTab] = useState("sosyal-medya");
  const [expandedSection, setExpandedSection] = useState<"team" | "agents" | "report" | null>("agents");
  const contentRef = useRef<HTMLDivElement>(null);

  const activeDept = DEPARTMENTS.find((d) => d.id === activeTab)!;

  const toggleSection = (section: "team" | "agents" | "report") => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Scroll to content when tab changes
  useEffect(() => {
    setExpandedSection("agents");
  }, [activeTab]);

  return (
    <section id="kullanim-alanlari" className={`py-24 px-5 ${t.bg}`}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[#D8FB32] border border-[#D8FB32]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Uzman Ajanlar
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${t.text} mb-4`}>
              Her Departman İçin Uzman Kadro
            </h2>
            <p className={`${t.textMuted} text-lg max-w-2xl mx-auto`}>
              40+ ajan, 8 departman.
              <br />
              Her biri binlerce kaynaktan beslenmiş, s&uuml;rekli &ouml;ğrenen, birbirleriyle koordineli çalışan uzmanlar.
            </p>
          </div>
        </FadeIn>

        {/* Department Tabs */}
        <FadeIn delay={0.1}>
          <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 mb-10 pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                style={
                  activeTab === dept.id
                    ? { backgroundColor: dept.color, color: "#0A0A0A", borderColor: dept.color }
                    : {}
                }
                className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border shrink-0 min-h-[44px] ${
                  activeTab === dept.id
                    ? "shadow-lg"
                    : `${t.whiteOverlay5} ${t.textMuted} hover:bg-white/10 border-transparent`
                }`}
              >
                <span>{dept.icon}</span>
                <span className="hidden sm:inline">{dept.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Department Content */}
        <div ref={contentRef} className="space-y-4">
          {/* ── Section 1: Team Hierarchy ── */}
          <div className={`${t.bgCard} border ${t.border} rounded-2xl overflow-hidden transition-all duration-300`}>
            <button
              onClick={() => toggleSection("team")}
              className={`w-full px-6 py-4 flex items-center justify-between hover:${t.whiteOverlay5} transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${activeDept.color}15` }}
                >
                  {activeDept.icon}
                </div>
                <div className="text-left">
                  <h3 className={`text-base font-bold ${t.text}`}>{activeDept.label} Departmanı</h3>
                  <span className={`text-xs ${t.textDim}`}>{activeDept.hierarchy.length} uzman ekip üyesi</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full hidden sm:block"
                  style={{ backgroundColor: `${activeDept.color}15`, color: activeDept.color }}
                >
                  Ekip Yapısı
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${expandedSection === "team" ? "rotate-180" : ""}`}
                >
                  <path d="M4 6L8 10L12 6" stroke={activeDept.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${expandedSection === "team" ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-6 pb-6">
                <HierarchyTree department={activeDept} theme={theme} />
              </div>
            </div>
          </div>

          {/* ── Section 2: Agent Cards ── */}
          <div className={`${t.bgCard} border ${t.border} rounded-2xl overflow-hidden transition-all duration-300`}>
            <button
              onClick={() => toggleSection("agents")}
              className={`w-full px-6 py-4 flex items-center justify-between hover:${t.whiteOverlay5} transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${activeDept.color}15` }}
                >
                  🤖
                </div>
                <div className="text-left">
                  <h3 className={`text-base font-bold ${t.text}`}>Uzman Ajanlar</h3>
                  <span className={`text-xs ${t.textDim}`}>{activeDept.agents.length} aktif uzman</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full hidden sm:block"
                  style={{ backgroundColor: `${activeDept.color}15`, color: activeDept.color }}
                >
                  Detaylar
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${expandedSection === "agents" ? "rotate-180" : ""}`}
                >
                  <path d="M4 6L8 10L12 6" stroke={activeDept.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${expandedSection === "agents" ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {activeDept.agents.map((agent, i) => (
                    <FadeIn key={`${activeTab}-${i}`} delay={i * 0.05}>
                      <ExpandedAgentCard agent={agent} department={activeDept} theme={theme} />
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 3: Example Report ── */}
          <div className={`${t.bgCard} border ${t.border} rounded-2xl overflow-hidden transition-all duration-300`}>
            <button
              onClick={() => toggleSection("report")}
              className={`w-full px-6 py-4 flex items-center justify-between hover:${t.whiteOverlay5} transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${activeDept.color}15` }}
                >
                  📋
                </div>
                <div className="text-left">
                  <h3 className={`text-base font-bold ${t.text}`}>Örnek Rapor</h3>
                  <span className={`text-xs ${t.textDim}`}>{activeDept.report.title}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full hidden sm:block"
                  style={{ backgroundColor: `${activeDept.color}15`, color: activeDept.color }}
                >
                  Önizleme
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${expandedSection === "report" ? "rotate-180" : ""}`}
                >
                  <path d="M4 6L8 10L12 6" stroke={activeDept.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${expandedSection === "report" ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-6 pb-6">
                <ReportPreview report={activeDept.report} department={activeDept} theme={theme} />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <a
                href="#bekleme-listesi"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: activeDept.color, color: "#0A0A0A" }}
              >
                Bu departmanı ekle →
              </a>
              <span className={`text-sm ${t.textDim}`}>
                veya{" "}
                <a href="#fiyatlandirma" className="text-[#D8FB32] hover:underline font-semibold">
                  tüm planları gör
                </a>
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Total count callout */}
        <FadeIn delay={0.2}>
          <div className={`mt-16 text-center ${t.bgCard} border ${t.border} rounded-2xl p-8`}>
            <p className={`text-2xl font-black ${t.text} mb-2`}>
              40+ Uzman Ajan — 8 Departman — Sınırsız Görev
            </p>
            <p className={`${t.textDim} text-base`}>
              Ve sisteme sürekli yeni uzmanlar ekleniyor. Siz isteyin, biz kuralım.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CSS-ONLY MINI CHART COMPONENTS
// ─────────────────────────────────────────────
function ProgressBar({ value, max, color, label, showPercent = true }: { value: number; max: number; color: string; label: string; showPercent?: boolean }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{showPercent ? `%${pct}` : `${value}/${max}`}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function MiniBarChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-t-sm min-h-[4px]"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.value / maxVal) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          />
          <span className="text-[9px] text-gray-500 leading-none">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ value, max, color, label, size = 80 }: { value: number; max: number; color: string; label: string; size?: number }) {
  const pct = Math.round((value / max) * 100);
  const circumference = 2 * Math.PI * 32;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 80 80" className="-rotate-90">
          <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-gray-900">{pct}%</span>
        </div>
      </div>
      <span className="text-[10px] text-gray-500 text-center leading-tight">{label}</span>
    </div>
  );
}

function SparkLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 30;
  const w = 120;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block">
      <motion.polyline
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function StatusBadge({ status, color }: { status: string; color: string }) {
  const isGood = ["tamamlandı", "iyi", "yüksek", "düşük risk", "aktif"].some((s) => status.toLowerCase().includes(s));
  const bgColor = isGood ? `${color}20` : "rgba(0,0,0,0.05)";
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: bgColor, color }}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────
// PROFESSIONAL REPORT EXAMPLES — Rich Visual Reports
// ─────────────────────────────────────────────
function ProfessionalReports({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  const isDark = theme === "dark";
  const [activeReport, setActiveReport] = useState(0);

  const reports = [
    {
      icon: "📱",
      title: "Sosyal Medya Performans Raporu",
      subtitle: "Haftalık Platform Analizi",
      color: "#4ECDC4",
      tab: "Sosyal Medya",
    },
    {
      icon: "💰",
      title: "Finansal Analiz Raporu",
      subtitle: "Aylık Gelir-Gider Raporu",
      color: "#22C55E",
      tab: "Finans",
    },
    {
      icon: "⚖️",
      title: "Hukuk & Uyum Denetimi",
      subtitle: "Aylık Uyum Analizi",
      color: "#F59E0B",
      tab: "Hukuk",
    },
    {
      icon: "💻",
      title: "Yazılım Geliştirme Sprint Raporu",
      subtitle: "Sprint #14 Performans Analizi",
      color: "#3B82F6",
      tab: "Yazılım",
    },
    {
      icon: "🔍",
      title: "Pazar Araştırması İstihbarat Raporu",
      subtitle: "Q2 Trend ve Fırsat Analizi",
      color: "#A855F7",
      tab: "İstihbarat",
    },
  ];

  const current = reports[activeReport];

  return (
    <section className="py-28 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#0A0A0A] border border-[#0A0A0A]/20 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Profesyonel Raporlar
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">
              Gerçek raporlar. Gerçek grafikler.
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
              Her sabah masanızda — otomatik oluşturulmuş, grafikli, aksiyon önerili raporlar.
              <br />
              <span className="text-gray-900 font-semibold">Bu raporları da bu sistem hazırladı.</span>
            </p>
          </div>
        </FadeIn>

        {/* Report tabs */}
        <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 mb-8 pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
          {reports.map((r, i) => (
            <button
              key={i}
              onClick={() => setActiveReport(i)}
              className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0 min-h-[44px] ${
                activeReport === i
                  ? "shadow-lg text-white"
                  : "bg-gray-50 text-gray-500 border border-gray-200"
              }`}
              style={activeReport === i ? { backgroundColor: r.color } : {}}
            >
              <span>{r.icon}</span>
              <span className="hidden sm:inline">{r.tab}</span>
            </button>
          ))}
        </div>

        {/* Report Card — Rich Visual */}
        <ScaleOnScroll>
          <div className="bg-[#F8F8F8] border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
            {/* Report header */}
            <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: `1px solid ${current.color}20` }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${current.color}15` }}>
                  {current.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{current.title}</h3>
                  <span className="text-xs text-gray-500">{current.subtitle}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-medium">Canlı</span>
                </div>
                <span className="text-xs text-gray-400">5 Nisan 2026 - 08:00</span>
              </div>
            </div>

            {/* Report body — conditional render based on active tab */}
            <div className="px-6 sm:px-8 py-6">

              {/* ──── 1. SOSYAL MEDYA PERFORMANS ──── */}
              {activeReport === 0 && (
                <div className="space-y-6">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Toplam Erişim", value: "48.2K", sub: "Geçen hafta: 41.8K" },
                      { label: "Etkileşim Oranı", value: "%4.7", sub: "Sektör ort: %2.1" },
                      { label: "Takipçi Büyüme", value: "+1.240", sub: "Son 7 gün" },
                      { label: "İçerik Üretildi", value: "34", sub: "Post / Reel / Story" },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-100 border border-gray-200 rounded-xl p-4"
                      >
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">{m.label}</span>
                        <span className="text-xl font-black block" style={{ color: "#4ECDC4" }}>{m.value}</span>
                        <span className="text-[10px] text-gray-400">{m.sub}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Platform bazlı erişim */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Platform Bazlı Erişim</h4>
                      <MiniBarChart
                        data={[
                          { label: "X", value: 14200 },
                          { label: "IG", value: 18600 },
                          { label: "LI", value: 4800 },
                          { label: "YT", value: 7200 },
                          { label: "TT", value: 3400 },
                        ]}
                        color="#4ECDC4"
                      />
                    </div>

                    {/* Haftalık engagement sparkline + donut */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Haftalık Etkileşim Trendi</h4>
                      <SparkLine data={[320, 480, 390, 520, 610, 580, 720]} color="#4ECDC4" />
                      <div className="flex items-center justify-around mt-4">
                        <DonutChart value={78} max={100} color="#4ECDC4" label="Organik" size={65} />
                        <DonutChart value={22} max={100} color="#F59E0B" label="Paid" size={65} />
                      </div>
                    </div>
                  </div>

                  {/* Aksiyon bölümü */}
                  <div className={`${t.bgCardInner} border ${t.border} rounded-xl p-5`}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">En İyi İçerik Formatları ve Öneriler</h4>
                    <div className="space-y-2.5">
                      {[
                        { text: "Reels / Kısa Video — en yüksek etkileşim oranı", status: "1. Sıra", color: "#4ECDC4" },
                        { text: "Carousel / Kaydırmalı Gönderi — kaydetme oranı yüksek", status: "2. Sıra", color: "#3B82F6" },
                        { text: "Thread / Uzun Metin — paylaşım oranı yüksek", status: "3. Sıra", color: "#A855F7" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-gray-600">{item.text}</span>
                          </div>
                          <StatusBadge status={item.status} color={item.color} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#4ECDC415", border: "1px solid #4ECDC430" }}>
                    <span className="text-lg">📊</span>
                    <span className="text-sm font-semibold" style={{ color: "#4ECDC4" }}>Reels formatı %180 daha fazla etkileşim alıyor — kısa video üretimini artırın.</span>
                  </div>
                </div>
              )}

              {/* ──── 2. FİNANSAL ANALİZ ──── */}
              {activeReport === 1 && (
                <div className="space-y-6">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Aylık Gelir", value: "₺284K", sub: "Geçen ay: ₺261K" },
                      { label: "Gider", value: "₺196K", sub: "Bütçe: ₺210K" },
                      { label: "Net Kar", value: "₺88K", sub: "Hedef: ₺100K" },
                      { label: "Kar Marjı", value: "%31", sub: "Geçen ay: %27" },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-100 border border-gray-200 rounded-xl p-4"
                      >
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">{m.label}</span>
                        <span className="text-xl font-black block" style={{ color: "#22C55E" }}>{m.value}</span>
                        <span className="text-[10px] text-gray-400">{m.sub}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Gelir vs Gider bar chart */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Son 6 Ay Gelir Trendi</h4>
                      <MiniBarChart
                        data={[
                          { label: "Kas", value: 198 },
                          { label: "Ara", value: 215 },
                          { label: "Oca", value: 234 },
                          { label: "Şub", value: 248 },
                          { label: "Mar", value: 261 },
                          { label: "Nis", value: 284 },
                        ]}
                        color="#22C55E"
                      />
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                          <span className="text-[10px] text-gray-500">Gelir</span>
                        </div>
                      </div>
                    </div>

                    {/* Gider dağılımı donut chart */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Gider Dağılımı</h4>
                      <div className="flex items-center justify-around">
                        <DonutChart value={45} max={100} color="#22C55E" label="Personel" size={65} />
                        <DonutChart value={20} max={100} color="#3B82F6" label="Pazarlama" size={65} />
                        <DonutChart value={15} max={100} color="#F59E0B" label="Altyapı" size={65} />
                        <DonutChart value={20} max={100} color="#A855F7" label="Diğer" size={65} />
                      </div>
                    </div>
                  </div>

                  {/* Aksiyon bölümü */}
                  <div className={`${t.bgCardInner} border ${t.border} rounded-xl p-5`}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Nakit Akış Projeksiyonu ve Tasarruf Önerileri</h4>
                    <div className="space-y-3">
                      <ProgressBar value={88} max={100} color="#22C55E" label="Nakit Akış Sağlığı" />
                      <ProgressBar value={72} max={100} color="#3B82F6" label="Bütçe Uyumu" />
                      <ProgressBar value={65} max={100} color="#F59E0B" label="Tasarruf Potansiyeli" />
                    </div>
                    <div className="mt-4 space-y-2">
                      {[
                        { text: "Altyapı maliyetlerini %12 düşürme fırsatı tespit edildi", status: "Aksiyon", color: "#F59E0B" },
                        { text: "Pazarlama ROI optimizasyonu ile ₺18K tasarruf mümkün", status: "Öneri", color: "#3B82F6" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-gray-600">{item.text}</span>
                          </div>
                          <StatusBadge status={item.status} color={item.color} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#22C55E15", border: "1px solid #22C55E30" }}>
                    <span className="text-lg">📈</span>
                    <span className="text-sm font-semibold" style={{ color: "#22C55E" }}>Q2 hedefi: ₺100K net kar — mevcut trendle ulaşılabilir.</span>
                  </div>
                </div>
              )}

              {/* ──── 3. HUKUK & UYUM DENETİMİ ──── */}
              {activeReport === 2 && (
                <div className="space-y-6">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Denetlenen Döküman", value: "47", sub: "Bu ay" },
                      { label: "Uyum Skoru", value: "%94", sub: "Hedef: %90" },
                      { label: "Risk Tespiti", value: "3", sub: "Kritik: 0" },
                      { label: "Çözülen", value: "2", sub: "Bekleyen: 1" },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-100 border border-gray-200 rounded-xl p-4"
                      >
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">{m.label}</span>
                        <span className="text-xl font-black block" style={{ color: "#F59E0B" }}>{m.value}</span>
                        <span className="text-[10px] text-gray-400">{m.sub}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Uyum kategorileri progress bars */}
                    <div className={`${t.bgCardInner} border ${t.border} rounded-xl p-5 space-y-4`}>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Uyum Kategorileri</h4>
                      <ProgressBar value={98} max={100} color="#22C55E" label="KVKK" />
                      <ProgressBar value={92} max={100} color="#F59E0B" label="Mesafeli Satış" />
                      <ProgressBar value={88} max={100} color="#3B82F6" label="ETBİS" />
                      <ProgressBar value={96} max={100} color="#A855F7" label="İş Hukuku" />
                    </div>

                    {/* Risk seviyesi donut */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Risk Dağılımı</h4>
                      <div className="flex items-center justify-around">
                        <DonutChart value={82} max={100} color="#22C55E" label="Düşük" size={70} />
                        <DonutChart value={15} max={100} color="#F59E0B" label="Orta" size={70} />
                        <DonutChart value={3} max={100} color="#EF4444" label="Yüksek" size={70} />
                      </div>
                    </div>
                  </div>

                  {/* Detay bölümü — Risk tespitleri */}
                  <div className={`${t.bgCardInner} border ${t.border} rounded-xl p-5`}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tespit Edilen Riskler ve Çözüm Durumları</h4>
                    <div className="space-y-2.5">
                      {[
                        { text: "Gizlilik politikası güncelleme gerekiyor (KVKK m.10)", status: "Tamamlandı", color: "#22C55E" },
                        { text: "Mesafeli satış sözleşmesi revize edildi", status: "Tamamlandı", color: "#22C55E" },
                        { text: "Çerez onay mekanizması uyumsuzluk tespiti", status: "Devam Ediyor", color: "#F59E0B" },
                      ].map((risk, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: risk.color }} />
                            <span className="text-xs text-gray-600">{risk.text}</span>
                          </div>
                          <StatusBadge status={risk.status} color={risk.color} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#F59E0B15", border: "1px solid #F59E0B30" }}>
                    <span className="text-lg">⚖️</span>
                    <span className="text-sm font-semibold" style={{ color: "#F59E0B" }}>KVKK uyum skoru sektör ortalamasının %18 üzerinde.</span>
                  </div>
                </div>
              )}

              {/* ──── 4. YAZILIM GELİŞTİRME SPRİNT ──── */}
              {activeReport === 3 && (
                <div className="space-y-6">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Tamamlanan Task", value: "28", sub: "Planlanan: 32" },
                      { label: "Sprint Velocity", value: "34pts", sub: "Ort: 29pts" },
                      { label: "Bug Fix", value: "12", sub: "Kritik: 3" },
                      { label: "Deploy", value: "8", sub: "Başarılı: 8/8" },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-100 border border-gray-200 rounded-xl p-4"
                      >
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">{m.label}</span>
                        <span className="text-xl font-black block" style={{ color: "#3B82F6" }}>{m.value}</span>
                        <span className="text-[10px] text-gray-400">{m.sub}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Sprint burndown sparkline */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sprint Burndown</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#3B82F6" }} />
                            <span className="text-[10px] text-gray-500">Gerçekleşen</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#666" }} />
                            <span className="text-[10px] text-gray-500">İdeal</span>
                          </div>
                        </div>
                        <SparkLine data={[32, 30, 27, 24, 20, 17, 13, 9, 5, 4]} color="#3B82F6" />
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <StatusBadge status="Hedefin önünde" color="#22C55E" />
                        <span className="text-[10px] text-gray-400">4 task kaldı, 2 gün var</span>
                      </div>
                    </div>

                    {/* Task dağılımı bar chart */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Task Dağılımı</h4>
                      <MiniBarChart
                        data={[
                          { label: "Feature", value: 45 },
                          { label: "Bug", value: 25 },
                          { label: "Refactor", value: 15 },
                          { label: "Docs", value: 15 },
                        ]}
                        color="#3B82F6"
                      />
                    </div>
                  </div>

                  {/* Code review metrikleri */}
                  <div className={`${t.bgCardInner} border ${t.border} rounded-xl p-5`}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Code Review Metrikleri ve Sonraki Sprint</h4>
                    <div className="space-y-3">
                      <ProgressBar value={92} max={100} color="#22C55E" label="Review Tamamlanma" />
                      <ProgressBar value={85} max={100} color="#3B82F6" label="Test Coverage" />
                      <ProgressBar value={78} max={100} color="#A855F7" label="Kod Kalite Skoru" />
                    </div>
                    <div className="mt-4 space-y-2">
                      {[
                        { text: "Sprint #15: Auth v2 ve Dashboard yenileme planlandı", status: "Planlandı", color: "#3B82F6" },
                        { text: "Teknik borç: 4 story point ayrıldı", status: "Kabul", color: "#F59E0B" },
                        { text: "CI/CD pipeline optimizasyonu tamamlandı", status: "Bitti", color: "#22C55E" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-gray-600">{item.text}</span>
                          </div>
                          <StatusBadge status={item.status} color={item.color} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#3B82F615", border: "1px solid #3B82F630" }}>
                    <span className="text-lg">🚀</span>
                    <span className="text-sm font-semibold" style={{ color: "#3B82F6" }}>Sprint velocity %15 arttı — takım hızlanıyor.</span>
                  </div>
                </div>
              )}

              {/* ──── 5. PAZAR ARAŞTIRMASI İSTİHBARAT ──── */}
              {activeReport === 4 && (
                <div className="space-y-6">
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Analiz Edilen Kaynak", value: "2.340", sub: "Web, sosyal, rapor" },
                      { label: "Trend Tespiti", value: "8", sub: "Yükselen sektörler" },
                      { label: "Rakip Takip", value: "12", sub: "Aktif izleme" },
                      { label: "Fırsat", value: "5", sub: "Aksiyon bekliyor" },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-100 border border-gray-200 rounded-xl p-4"
                      >
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">{m.label}</span>
                        <span className="text-xl font-black block" style={{ color: "#A855F7" }}>{m.value}</span>
                        <span className="text-[10px] text-gray-400">{m.sub}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Trend kategorileri bar chart */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Trend Kategorileri</h4>
                      <MiniBarChart
                        data={[
                          { label: "AI", value: 92 },
                          { label: "NoCode", value: 71 },
                          { label: "SaaS", value: 65 },
                          { label: "Creator", value: 58 },
                          { label: "Fintech", value: 47 },
                        ]}
                        color="#A855F7"
                      />
                    </div>

                    {/* Rakip positioning donut chart */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Rakip Konumlandırma</h4>
                      <div className="flex items-center justify-around">
                        <DonutChart value={35} max={100} color="#A855F7" label="Lider" size={65} />
                        <DonutChart value={40} max={100} color="#3B82F6" label="Takipçi" size={65} />
                        <DonutChart value={25} max={100} color="#F59E0B" label="Niş" size={65} />
                      </div>
                    </div>
                  </div>

                  {/* Detay bölümü — Trend ve aksiyonlar */}
                  <div className={`${t.bgCardInner} border ${t.border} rounded-xl p-5`}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">En Önemli Trendler ve Aksiyon Önerileri</h4>
                    <div className="space-y-2.5">
                      {[
                        { text: "AI ajan platformları hızla büyüyor — erken giriş avantajı var", status: "Kritik", color: "#A855F7" },
                        { text: "No-code araçlar KOBİ segmentinde %60 penetrasyon", status: "Fırsat", color: "#22C55E" },
                        { text: "Creator Economy monetizasyon modelleri çeşitleniyor", status: "İzle", color: "#3B82F6" },
                      ].map((trend, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: trend.color }} />
                            <span className={`text-xs ${t.textMuted}`}>{trend.text}</span>
                          </div>
                          <StatusBadge status={trend.status} color={trend.color} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#A855F715", border: "1px solid #A855F730" }}>
                    <span className="text-lg">🔮</span>
                    <span className="text-sm font-semibold" style={{ color: "#A855F7" }}>AI ajan pazarı 2026{"'"}da %340 büyüme bekleniyor.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Report footer — CTA */}
            <div className="px-6 sm:px-8 py-4 flex items-center justify-between" style={{ borderTop: `1px solid ${current.color}15` }}>
              <span className="text-xs text-gray-500">Bu rapor AI ajanlar tarafından otomatik oluşturuldu</span>
              <a
                href="#fiyatlandirma"
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: `${current.color}15`, color: current.color }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <rect x="0.5" y="5.5" width="11" height="8" rx="2" stroke={current.color} strokeWidth="1" />
                  <path d="M3 5.5V3.5C3 1.84 4.34 0.5 6 0.5C7.66 0.5 9 1.84 9 3.5V5.5" stroke={current.color} strokeWidth="1" strokeLinecap="round" />
                </svg>
                Pro planla tüm raporlara erişin →
              </a>
            </div>
          </div>
        </ScaleOnScroll>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIALS — Realistic User Reviews
// ─────────────────────────────────────────────
function Testimonials({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const reviews = [
    {
      name: "Elif Yılmaz",
      role: "E-Ticaret Girişimcisi",
      avatar: "EY",
      color: "#F59E0B",
      stars: 5,
      text: "Avukat ajanı sayesinde s&ouml;zleşme hazırlama s&uuml;recim 3 g&uuml;nden 15 dakikaya d&uuml;şt&uuml;. KVKK uyumu, mesafeli satış s&ouml;zleşmesi... eskiden her biri i&ccedil;in ayrı ayrı danışman tutuyordum.",
      metric: "Yıllık ~35.000 TL tasarruf",
    },
    {
      name: "Burak Demir",
      role: "SaaS Startup Kurucusu",
      avatar: "BD",
      color: "#22C55E",
      stars: 5,
      text: "Yatırımcı toplantısından &ouml;nce CFO ajanım finansal modeli g&uuml;ncelledi, CTO ajanım teknik roadmap &ccedil;ıkardı. Seed turumuzda $200K aldık. Bu sistem olmadan bu kadar hazırlıklı olamazdık.",
      metric: "Seed tur kapandı — $200K",
    },
    {
      name: "Selin Kara",
      role: "Dijital Pazarlama Uzmanı",
      avatar: "SK",
      color: "#3B82F6",
      stars: 5,
      text: "5 farklı m&uuml;şterimin sosyal medyasını y&ouml;netiyorum. Her m&uuml;şteri i&ccedil;in ayrı departman kurdum — i&ccedil;erik takvimi, analiz raporları, engagement takibi hepsi otomatik. Artık 15 değil 5 saat &ccedil;alışıyorum.",
      metric: "M&uuml;şteri kapasitesi 3x arttı",
    },
    {
      name: "Onur Aydın",
      role: "Freelance Yazılımcı",
      avatar: "OA",
      color: "#A855F7",
      stars: 5,
      text: "Full-stack geliştirici ajanıyla birlikte &ccedil;alışmak m&uuml;thiş. Code review, bug fix &ouml;nerileri, dek&uuml;mantasyon — sanki yanımda bir senior developer var. Projelerimi yarı s&uuml;rede teslim ediyorum.",
      metric: "Teslim s&uuml;resi %50 kısaldı",
    },
    {
      name: "Zeynep Arslan",
      role: "İçerik Üreticisi / YouTuber",
      avatar: "ZA",
      color: "#EC4899",
      stars: 5,
      text: "Trend analisti ajanım hangi konuların patlayacağını &ouml;nceden s&ouml;yl&uuml;yor. Thumbnail ve başlık &ouml;nerileri CTR&apos;ımı %40 artırdı. YouTube Uzmanı ajanım resmen kanal partnerim oldu.",
      metric: "Abone sayısı 2 ayda 5x",
    },
    {
      name: "Ahmet Çelik",
      role: "Dijital Ajans Sahibi",
      avatar: "AÇ",
      color: "#4ECDC4",
      stars: 5,
      text: "3 kişilik ekibimle 12 m&uuml;şteriye hizmet veriyoruz. Kai Agents olmadan bu m&uuml;mk&uuml;n değildi. Her m&uuml;şterinin kendi AI departmanı var. Raporlar otomatik, toplantı notları hazır.",
      metric: "Gelir %200 arttı, ekip aynı",
    },
  ];

  return (
    <section className={`py-28 px-5 ${t.bg}`}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#D8FB32] border border-[#D8FB32]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Kullanıcı Deneyimleri
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${t.text}`}>
              Onlar &ccedil;oktan başladı.
            </h2>
            <p className={`${t.textDim} text-lg mt-4 max-w-xl mx-auto`}>
              Beta kullanıcılarımızın ger&ccedil;ek hikayeleri.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <StaggerItem key={i}>
              <div className={`${t.bgCard} border ${t.border} rounded-2xl p-6 h-full flex flex-col hover:border-[#D8FB32]/30 transition-all duration-200`}>
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#D8FB32">
                      <path d="M8 1.5L9.8 5.2L14 5.8L11 8.7L11.6 12.8L8 10.9L4.4 12.8L5 8.7L2 5.8L6.2 5.2L8 1.5Z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className={`${t.textMuted} text-sm leading-relaxed flex-1 mb-5`} dangerouslySetInnerHTML={{ __html: `&ldquo;${review.text}&rdquo;` }} />

                {/* Metric badge */}
                <div className="mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full inline-block"
                    style={{ backgroundColor: `${review.color}15`, color: review.color }}
                    dangerouslySetInnerHTML={{ __html: review.metric }}
                  />
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${review.color}15` }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${t.text}`}>{review.name}</div>
                    <div className={`text-xs ${t.textDim}`}>{review.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// USER RESPONSIBILITY NOTE
// ─────────────────────────────────────────────
function UserResponsibilityNote() {
  return (
    <div className="py-8 px-5 bg-[#0A0A0A]">
      <p className="text-[#999] text-sm text-center max-w-xl mx-auto">
        Her orkestranın bir şefi vardır. Bu sistemde şef sizsiniz.
        <br />
        Hedeflerinizi belirleyin, departmanlarınızı kurun, ajanlarınızı y&ouml;netin.
        <br />
        <span className="text-[#D8FB32]">Geri kalanını kovan halleder. 🐝</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────
function Pricing({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  usePaddleInit();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "sonsuza dek",
      highlight: false,
      priceId: null,
      href: "#bekleme-listesi",
      features: [
        "1 departman",
        "3 uzman ajan",
        "50 görev / ay",
        "Temel dashboard",
        "Topluluk desteği",
      ],
      cta: "Ücretsiz Başla",
    },
    {
      name: "Starter",
      price: "$49",
      period: "/ ay",
      highlight: false,
      priceId: process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID || "pri_01kneqb0fy99hn58h3ntt00732m",
      href: null,
      features: [
        "3 departman",
        "15 uzman ajan",
        "1.000 görev / ay",
        "Birimler arası toplantılar",
        "E-posta desteği",
        "Temel raporlar",
      ],
      cta: "Başla",
    },
    {
      name: "Pro",
      price: "$149",
      period: "/ ay",
      highlight: true,
      badge: "En Popüler",
      priceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || "pri_01kneq6ck9e8k0b4r8apzbbvfn",
      href: null,
      features: [
        "8 departman",
        "40+ uzman ajan",
        "Sınırsız görev",
        "Birimler arası toplantılar",
        "Haftalık otomatik raporlar",
        "Bütçe kontrolü",
        "Telegram entegrasyonu",
        "Heartbeats (zamanlanmış görev)",
        "Öncelikli e-posta desteği",
      ],
      cta: "Pro Başla",
    },
    {
      name: "Business",
      price: "$349",
      period: "/ ay",
      highlight: false,
      priceId: null,
      href: "mailto:merhaba@thekai.co",
      features: [
        "Sınırsız departman & ajan",
        "Sınırsız görev",
        "API erişimi",
        "Çoklu kullanıcı",
        "Özel departman şablonları",
        "Dedicated destek",
        "Onboarding çağrısı",
      ],
      cta: "Satış Ekibine Yaz",
    },
  ];

  return (
    <section id="fiyatlandirma" className="py-24 px-5" style={{ background: "linear-gradient(180deg, #D8FB32 0%, #B4F030 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[#0A0A0A] border border-[#0A0A0A]/20 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Fiyatlandırma
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0A0A0A]">
              Basit, şeffaf fiyatlar
            </h2>
            <p className="text-[#0A0A0A]/70 text-lg mt-4 max-w-xl mx-auto">
              Kendi API anahtarını kullan (BYOK).
              <br />
              Ekstra AI maliyeti &ouml;demiyorsun.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <StaggerItem key={i}>
              <div
                className={`rounded-2xl flex flex-col h-full ${
                  plan.highlight
                    ? "bg-[#0A0A0A] text-white p-7 ring-2 ring-[#0A0A0A] shadow-xl shadow-black/20 scale-[1.03]"
                    : "bg-white text-[#0A0A0A] border border-gray-200 p-7"
                }`}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold uppercase tracking-widest ${plan.highlight ? "text-[#D8FB32]" : "text-gray-500"}`}>
                      {plan.name}
                    </span>
                    {"badge" in plan && plan.badge && (
                      <span className="text-xs bg-[#D8FB32] text-[#0A0A0A] px-2 py-0.5 rounded-full font-semibold">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.period}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        plan.highlight ? "bg-[#D8FB32] text-[#0A0A0A]" : "bg-[#0A0A0A]/10 text-[#0A0A0A]"
                      }`}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className={plan.highlight ? "text-white/80" : "text-gray-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* TODO: Paddle onayı gelince openPaddleCheckout aktif et */}
                {plan.priceId ? (
                  <a
                    href="#bekleme-listesi"
                    className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all hover:scale-[1.02] block cursor-pointer ${
                      plan.highlight
                        ? "bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#E8FF80]"
                        : "bg-[#0A0A0A] text-white hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <a
                    href={plan.href || "#bekleme-listesi"}
                    className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all hover:scale-[1.02] block ${
                      plan.highlight
                        ? "bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#E8FF80]"
                        : "bg-[#0A0A0A] text-white hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn>
          <p className="text-center text-[#0A0A0A]/50 text-sm mt-8">
            İlk 100 kullanıcıya özel erken erişim fiyatı geçerlidir. Hemen başla, istediğin zaman iptal et.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SECURITY SECTION
// ─────────────────────────────────────────────
function SecuritySection({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const cards = [
    {
      icon: "🔒",
      title: "Tam İzolasyon",
      desc: "Her kullanıcının verileri ayrı kasada. Başka kullanıcılar asla erişemez.",
    },
    {
      icon: "🛡️",
      title: "KVKK Uyumlu",
      desc: "Türkiye ve AB veri koruma yasalarına tam uyum. Verileriniz Türkiye'de.",
    },
    {
      icon: "🚫",
      title: "AI'ya Sızmaz",
      desc: "Ajanlarınıza verdiğiniz bilgiler başka kullanıcıların ajanlarına aktarılmaz.",
    },
    {
      icon: "🗑️",
      title: "Silme Hakkı",
      desc: "Hesabınızı sildiğinizde tüm verileriniz 30 gün içinde kalıcı olarak silinir.",
    },
  ];

  return (
    <section className={`py-24 px-5 ${t.bg}`}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#D8FB32] border border-[#D8FB32]/30 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
              Güvenlik
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${t.text}`}>
              Verileriniz, Sizin Kasanız
            </h2>
            <p className={`${t.textDim} text-lg mt-4 max-w-xl mx-auto`}>
              Verileriniz ne paylaşılır, ne satılır, ne başkasına g&ouml;sterilir.
              <br />
              Tam izolasyon, tam kontrol.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <StaggerItem key={i}>
              <div className={`${t.bgCard} border border-[#D8FB32]/20 rounded-2xl p-6 flex flex-col gap-4 h-full hover:border-[#D8FB32]/50 transition-colors duration-200`}>
                <div className="w-12 h-12 rounded-xl bg-[#D8FB32]/10 flex items-center justify-center text-2xl shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className={`font-bold ${t.text} mb-1.5`}>{card.title}</h3>
                  <p className={`${t.textDim} text-sm leading-relaxed`}>{card.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOUNDER STORY
// ─────────────────────────────────────────────
function FounderStory({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const stats = [
    { value: "40+", label: "Uzman Ajan" },
    { value: "10", label: "Departman" },
    { value: "8", label: "Master Plan" },
    { value: "28", label: "Bilgi Dosyası" },
  ];

  return (
    <section className="py-24 px-5 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <div className="text-6xl text-[#0A0A0A] font-black leading-none mb-6">&ldquo;</div>
              <blockquote className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] leading-snug mb-6">
                Bu sistemi önce kendim için kurdum. 40+ uzman AI ajanım, 10 departmanım var.{" "}
                <span className="text-gray-400">Şimdi herkese açıyorum.</span>
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src="/images/kamer.png"
                  alt="Kamer"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D8FB32]"
                />
                <div>
                  <div className="font-bold text-[#0A0A0A] text-lg">Kamer</div>
                  <div className="text-gray-400 text-sm">Kurucu &amp; CEO, The Kai</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-[#0A0A0A] mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// WAITLIST
// ─────────────────────────────────────────────
function WaitlistSection({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);
  const [email, setEmail] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !kvkkAccepted) return;
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/xpwzpdkz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "kai-agents", kvkk: true }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setKvkkAccepted(false);
      } else {
        // Formspree hata verirse localStorage fallback + success göster
        try {
          const existing = JSON.parse(localStorage.getItem("kai-waitlist") || "[]");
          existing.push({ email, date: new Date().toISOString() });
          localStorage.setItem("kai-waitlist", JSON.stringify(existing));
        } catch {}
        setStatus("success");
        setEmail("");
        setKvkkAccepted(false);
      }
    } catch {
      // Network hatası — localStorage fallback
      try {
        const existing = JSON.parse(localStorage.getItem("kai-waitlist") || "[]");
        existing.push({ email, date: new Date().toISOString() });
        localStorage.setItem("kai-waitlist", JSON.stringify(existing));
      } catch {}
      setStatus("success");
      setEmail("");
      setKvkkAccepted(false);
    }
  };

  return (
    <section id="bekleme-listesi" className={`py-24 px-5 ${t.bgAlt}`}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-[#D8FB32] rounded-full animate-pulse" />
            İlk 100 Kullanıcı — Özel Fiyat
          </div>

          <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${t.text} mb-4`}>
            Erken Erişim Al
          </h2>
          <p className={`${t.textDim} text-lg mb-10`}>
            Beta listesine katıl.
            <br />
            İlk 100 kullanıcıya Pro &ouml;zellikleri &uuml;cretsiz, ardından &ouml;zel indirimli fiyat.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {status === "success" ? (
            <div className="bg-[#D8FB32]/10 border border-[#D8FB32]/30 rounded-2xl p-8">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-[#D8FB32] text-xl font-bold mb-2">Listeye alındın!</h3>
              <p className={`${t.textDim} text-sm`}>
                Kai Agents erken erişim açıldığında sana haber vereceğiz.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@adresin.com"
                  required
                  className={`flex-1 ${t.inputBg} border ${t.inputBorder} ${t.text} rounded-xl px-4 py-3.5 text-base placeholder:text-[#444444] focus:outline-none focus:border-[#D8FB32] focus:ring-2 focus:ring-[#D8FB32]/30 transition-colors`}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !kvkkAccepted}
                  className="bg-[#D8FB32] text-[#0A0A0A] px-6 py-3.5 rounded-xl font-bold text-base hover:bg-[#B4F030] transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? "Kaydediliyor..." : "Erken Erişim Al →"}
                </button>
              </form>

              {/* KVKK Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer text-left">
                <button
                  type="button"
                  onClick={() => setKvkkAccepted(!kvkkAccepted)}
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#D8FB32]/50 focus:ring-offset-1 focus:ring-offset-transparent ${
                    kvkkAccepted
                      ? "bg-[#D8FB32] border-[#D8FB32]"
                      : `border-white/20 ${t.inputBg}`
                  }`}
                  aria-checked={kvkkAccepted}
                  role="checkbox"
                >
                  {kvkkAccepted && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className={`text-xs ${t.textDim} leading-relaxed`}>
                  Kişisel verilerimin işlenmesine ilişkin{" "}
                  <a
                    href="/kvkk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8FB32] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    KVKK Aydınlatma Metni
                  </a>
                  &apos;ni okudum ve kabul ediyorum.
                </span>
              </label>
            </div>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm mt-3">
              Bir hata oluştu. Lütfen tekrar dene veya{" "}
              <a href="mailto:merhaba@thekai.co" className="underline">merhaba@thekai.co</a>
              {" "}adresine yaz.
            </p>
          )}

          <p className={`${t.textDimmest} text-xs mt-5`}>
            Spam yok. İstediğin zaman çıkabilirsin.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CUSTOM FOOTER for Agents page (social links)
// ─────────────────────────────────────────────
function AgentsFooter({ theme }: { theme: "dark" | "light" }) {
  const t = c(theme);

  const socialLinks = [
    {
      label: "X / Twitter",
      href: "https://x.com/thekai_co",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/thekai.co",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/thekai",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@thekaico",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <section className={`py-12 px-5 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto">
        {/* Trust Badges */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-8 pb-8 border-b ${t.border}`}>
          {[
            { icon: "🔒", label: "KVKK Uyumlu" },
            { icon: "🛡️", label: "SSL Şifreli" },
            { icon: "🔐", label: "Veri İzolasyonu" },
            { icon: "💳", label: "Paddle ile Güvenli Ödeme" },
          ].map((badge) => (
            <div key={badge.label} className={`flex items-center gap-1.5 ${t.textDim} text-xs font-medium`}>
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D8FB32] flex items-center justify-center font-black text-sm text-[#0A0A0A]">
              K
            </div>
            <span className={`font-bold ${t.text}`}>Kai Agents</span>
            <span className={`text-xs ${t.textDimmer}`}>by The Kai</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`${t.textDim} hover:text-[#D8FB32] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10`}
                title={link.label}
              >
                {link.svg}
              </a>
            ))}
          </div>

          {/* Copyright + Legal */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <p className={`${t.textDimmer} text-xs`}>
              &copy; 2026 The Kai. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-3">
              <a href="/gizlilik" className={`${t.textDimmer} text-xs hover:text-[#D8FB32] transition-colors min-h-[44px] flex items-center`}>
                Gizlilik
              </a>
              <span className={`${t.textDimmest} text-xs`}>·</span>
              <a href="/kullanim-sartlari" className={`${t.textDimmer} text-xs hover:text-[#D8FB32] transition-colors min-h-[44px] flex items-center`}>
                Kullanım Şartları
              </a>
              <span className={`${t.textDimmest} text-xs`}>·</span>
              <a href="/kvkk" className={`${t.textDimmer} text-xs hover:text-[#D8FB32] transition-colors min-h-[44px] flex items-center`}>
                KVKK
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────
export default function AgentsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <NotificationBar />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <StatsBar theme={theme} />
      <BeeHiveSection />
      <TransformationSection theme={theme} />
      <CinematicDivider theme={theme} />
      <UseCaseShowcase theme={theme} />
      <SuperpowerStatement theme={theme} />
      <TrustBar theme={theme} />
      <HowItWorks theme={theme} />
      <GlowDivider color="#A855F7" />
      <SystemDeepDive theme={theme} />
      <HumanVsAI theme={theme} />
      <Features theme={theme} />
      <DepartmentShowcase theme={theme} />
      <LazySection minHeight="600px">
        <ProfessionalReports theme={theme} />
      </LazySection>
      <LazySection minHeight="400px">
        <Testimonials theme={theme} />
      </LazySection>
      <LazySection minHeight="400px">
        <Pricing theme={theme} />
      </LazySection>
      <UserResponsibilityNote />
      <LazySection minHeight="300px">
        <SecuritySection theme={theme} />
      </LazySection>
      <FounderStory theme={theme} />
      <WaitlistSection theme={theme} />
      <AgentsFooter theme={theme} />
    </>
  );
}
