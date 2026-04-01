"use client";

import Link from "next/link";
import { ServiceIcon } from "@/components/icons/ServiceIcons";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const HIZMET_DETAYLARI = [
  {
    slug: "ai-ajan-sistemi",
    icon: "brain",
    title: "AI Ajan Sistemi Kurulumu",
    subtitle: "Claude Code tabanlı, 72+ ajan deneyimiyle.",
    description:
      "İşletmeniz için özel AI ajan ekibi kuruyoruz. Departmanlarınıza özel, birbirleriyle iletişim kurabilen, 7/24 çalışan akıllı ajan sistemleri. Orkestrasyon, hafıza yönetimi, otomasyon pipeline'ları ve MCP entegrasyonları dahil.",
    features: [
      "Departman bazlı ajan tasarımı",
      "Orkestrasyon ve yönlendirme sistemi",
      "Hafıza yönetimi ve bilgi tabanı",
      "MCP entegrasyonları (Gmail, Calendar, Slack)",
      "Telegram/Discord bot entegrasyonu",
      "Eğitim ve dokümantasyon",
    ],
    packages: [
      {
        name: "SPARK",
        label: "Başlangıç",
        features: ["3 temel ajan", "Tek orkestrasyon", "Temel hafıza sistemi", "CLAUDE.md yapılandırma", "1 hafta kurulum", "1 ay destek"],
      },
      {
        name: "ENGINE",
        label: "Profesyonel",
        features: ["10+ özel ajan", "Çoklu orkestrasyon", "Gelişmiş hafıza + bilgi tabanı", "MCP entegrasyonları (3+)", "Telegram bot dahil", "2 hafta kurulum + 3 ay destek"],
      },
      {
        name: "ARCHITECT",
        label: "Kurumsal",
        features: ["Sınırsız ajan mimarisi", "Tam orkestrasyon + model routing", "Özel MCP server geliştirme", "Cron otomasyon pipeline'ları", "Ekip eğitimi + dokümantasyon", "Sürekli destek + bakım"],
      },
    ],
  },
  {
    slug: "web-sitesi-tasarimi",
    icon: "browser",
    title: "Web Sitesi Tasarımı",
    subtitle: "Modern, hızlı, etkileyici.",
    description:
      "Next.js, Tailwind CSS ve Framer Motion ile yüksek performanslı, görsel açıdan etkileyici web siteleri. Kurumsal siteler, landing page'ler, portfolyo siteleri ve e-ticaret çözümleri. Shortlist Creative ve thekai.co referanslarıyla.",
    features: [
      "Next.js + Tailwind CSS + Framer Motion",
      "Responsive ve mobil uyumlu tasarım",
      "SEO optimizasyonu",
      "Vercel deployment",
      "CMS entegrasyonu",
      "Core Web Vitals optimizasyonu",
    ],
    packages: [
      {
        name: "STARTER",
        label: "Tek Sayfa",
        features: ["Landing page tasarımı", "Mobil responsive", "Temel SEO", "İletişim formu", "Vercel deployment", "1 revizyon turu"],
      },
      {
        name: "PRO",
        label: "Kurumsal Site",
        features: ["5+ sayfa (ana, hizmetler, hakkımızda, iletişim, blog)", "Gelişmiş SEO + sitemap", "Animasyonlar (Framer Motion)", "Sosyal medya entegrasyonu", "Analytics kurulumu", "3 revizyon turu"],
      },
      {
        name: "PREMIUM",
        label: "Tam Paket",
        features: ["Sınırsız sayfa", "E-ticaret / ödeme entegrasyonu", "Blog + CMS altyapısı", "Çoklu dil desteği", "Özel tasarım sistemi", "6 ay bakım + destek"],
      },
    ],
  },
  {
    slug: "icerik-uretimi",
    icon: "content",
    title: "İçerik Üretimi",
    subtitle: "20M+ dinlenme deneyimiyle.",
    description:
      "YouTube, sosyal medya ve marka içeriği üretimi. Video prodüksiyon, thumbnail tasarım, içerik stratejisi ve platform optimizasyonu. Echo Bazaar kanalında 20M+ dinlenme ile kanıtlanmış içerik üretim metodolojisi.",
    features: [
      "YouTube video prodüksiyon",
      "Thumbnail tasarım ve A/B test",
      "Sosyal medya içerik planı",
      "Marka içerik stratejisi",
      "Video editing ve post-prodüksiyon",
      "Platform bazlı optimizasyon",
    ],
    packages: [
      {
        name: "BASIC",
        label: "Başlangıç",
        features: ["Aylık 8 sosyal medya postu", "2 platform (seçiminize göre)", "Temel görsel tasarım", "İçerik takvimi", "Aylık performans raporu", "1 revizyon/post"],
      },
      {
        name: "GROWTH",
        label: "Büyüme",
        features: ["Aylık 20 post + 4 video", "4 platform yönetimi", "Thumbnail + görsel tasarım", "Hashtag ve SEO stratejisi", "Haftalık performans raporu", "Sınırsız revizyon"],
      },
      {
        name: "SCALE",
        label: "Ölçeklendirme",
        features: ["Sınırsız içerik üretimi", "Tüm platformlar", "Video prodüksiyon (çekim dahil)", "Influencer koordinasyonu", "Reklam kreatif üretimi", "Günlük raporlama + strateji toplantısı"],
      },
    ],
  },
  {
    slug: "artwork-tasarim",
    icon: "palette",
    title: "Artwork & Tasarım",
    subtitle: "Sinematik, understated, etkileyici.",
    description:
      "Müzik kapak fotoğrafları, görsel kimlik tasarımı ve artwork üretimi. Kim Jung Vada tasarım portföyü referansıyla, Apple marka kimliği anlayışında minimal ve güçlü görseller.",
    features: [
      "Single/albüm kapak tasarımı",
      "Görsel kimlik ve marka dili",
      "Sosyal medya görselleri",
      "Poster ve banner tasarımı",
      "AI destekli görsel üretim",
      "Baskıya hazır dosya çıktısı",
    ],
    packages: [
      {
        name: "SINGLE",
        label: "Tek Proje",
        features: ["1 kapak tasarımı veya görsel set", "3 konsept önerisi", "Tüm platform boyutları", "Kaynak dosyalar (AI/PSD)", "2 revizyon turu", "5 iş günü teslimat"],
      },
      {
        name: "BUNDLE",
        label: "Paket",
        features: ["5 kapak/görsel tasarımı", "Tutarlı görsel dil", "Sosyal medya kit", "Animasyonlu versiyon", "Sınırsız revizyon", "Öncelikli teslimat"],
      },
      {
        name: "IDENTITY",
        label: "Marka Kimliği",
        features: ["Logo + görsel kimlik sistemi", "Renk paleti + tipografi", "Sosyal medya şablonları", "Marka rehberi (brand guide)", "Kartvizit + kurumsal set", "Kapsamlı sunum dosyası"],
      },
    ],
  },
  {
    slug: "sesli-kitap",
    icon: "microphone",
    title: "Sesli Kitap Prodüksiyon",
    subtitle: "AI seslendirme ile yayıncılık.",
    description:
      "Klasik ve modern edebiyatı yapay zekâ seslendirmesiyle sesli kitaba dönüştürüyoruz. Metin bölümleme, ses seçimi, seslendirme, düzenleme ve dijital platform dağıtımı. Murmur yayınevi deneyimiyle.",
    features: [
      "AI seslendirme (ElevenLabs)",
      "Metin bölümleme ve hazırlık",
      "Ses tasarımı ve düzenleme",
      "Spotify & platformlara dağıtım",
      "Kapak tasarımı ve branding",
      "Telif hakkı danışmanlığı",
    ],
    packages: [
      {
        name: "CHAPTER",
        label: "Tek Bölüm",
        features: ["1 bölüm seslendirme (max 30 dk)", "Ses seçimi (5+ ses)", "Temel düzenleme", "MP3 + WAV çıktı", "1 revizyon", "3 iş günü teslimat"],
      },
      {
        name: "BOOK",
        label: "Tam Kitap",
        features: ["Komple kitap seslendirme", "Profesyonel ses tasarımı", "Bölüm bölüm düzenleme", "Tüm platformlara dağıtım", "Kapak tasarımı dahil", "Sınırsız revizyon"],
      },
      {
        name: "PUBLISHER",
        label: "Yayınevi",
        features: ["Aylık 3+ kitap prodüksiyon", "Özel ses kütüphanesi", "Otomatik pipeline kurulumu", "Platform yönetimi", "Gelir takibi + raporlama", "Sürekli destek + öncelik"],
      },
    ],
  },
  {
    slug: "muzik-produksiyon",
    icon: "music",
    title: "Müzik Prodüksiyon",
    subtitle: "Geleneksel ve AI destekli üretim.",
    description:
      "Beste, aranjman, mix, master ve vokal prodüksiyon hizmetleri. 15 yıllık şarkı yazma deneyimi, Echo Bazaar'da 20M+ dinlenme ile kanıtlanmış AI müzik üretim kapasitesi. Suno, ElevenLabs ve geleneksel DAW araçlarıyla hibrit prodüksiyon.",
    features: [
      "Beste ve söz yazarlığı",
      "Aranjman ve prodüksiyon",
      "Mix ve mastering",
      "Vokal kayıt ve prodüksiyon",
      "AI müzik üretimi (Suno, ElevenLabs)",
      "Spotify/Apple Music dağıtım danışmanlığı",
    ],
    packages: [
      {
        name: "TRACK",
        label: "Tek Şarkı",
        features: ["1 şarkı prodüksiyon", "Beat/aranjman", "Mix + master", "Vokal düzenleme", "Dijital dağıtım danışmanlığı", "2 revizyon turu"],
      },
      {
        name: "EP",
        label: "EP Paketi",
        features: ["4-6 şarkı prodüksiyon", "Tutarlı ses tasarımı", "Profesyonel mix + master", "Artwork tasarımı dahil", "Spotify/Apple Music dağıtım", "Sınırsız revizyon"],
      },
      {
        name: "ALBUM",
        label: "Albüm",
        features: ["10+ şarkı full prodüksiyon", "Konsept geliştirme", "AI + geleneksel hibrit üretim", "Mastering (referans eşleştirme)", "Tam artwork + video klip danışmanlık", "Lansman stratejisi"],
      },
    ],
  },
  {
    slug: "dijital-strateji",
    icon: "lightbulb",
    title: "Dijital Strateji & Danışmanlık",
    subtitle: "AI-native dönüşüm.",
    description:
      "AI danışmanlık, dijital dönüşüm stratejisi, sosyal medya planlaması ve marka konumlandırma. Ekşi Maya Sports referansıyla kurumsal düzeyde strateji geliştirme ve uygulama.",
    features: [
      "AI dönüşüm danışmanlığı",
      "Dijital pazarlama stratejisi",
      "Sosyal medya yönetimi",
      "Marka konumlandırma",
      "Rakip ve pazar analizi",
      "KPI takip ve raporlama",
    ],
    packages: [
      {
        name: "AUDIT",
        label: "Analiz",
        features: ["Mevcut durum analizi", "Rakip araştırması", "SWOT analizi", "Fırsat haritası", "Aksiyon önerileri raporu", "1 saat danışmanlık görüşmesi"],
      },
      {
        name: "STRATEGY",
        label: "Strateji",
        features: ["3 aylık strateji planı", "Platform bazlı yol haritası", "İçerik stratejisi", "KPI tanımlama + dashboard", "Haftalık check-in toplantıları", "Aylık performans raporu"],
      },
      {
        name: "PARTNER",
        label: "Ortak",
        features: ["Sürekli strateji ortağı", "Tüm platformların yönetimi", "Reklam bütçesi optimizasyonu", "Kriz yönetimi", "Ekip eğitimi", "Sınırsız danışmanlık"],
      },
    ],
  },
  {
    slug: "telegram-bot",
    icon: "robot",
    title: "Telegram Bot Geliştirme",
    subtitle: "7/24 çalışan, always-on mimari.",
    description:
      "Kişiye özel Telegram bot kurulumu. Finans danışmanı, içerik asistanı, müşteri destek botu, otomasyon araçları. Systemd servis yönetimi ile kesintisiz çalışan, Claude API entegrasyonlu akıllı botlar.",
    features: [
      "Kişiye özel bot geliştirme",
      "Claude API entegrasyonu",
      "Ses ve görsel mesaj desteği",
      "Always-on systemd mimari",
      "Bilgi tabanı ve hafıza yönetimi",
      "Webhook ve otomasyon entegrasyonu",
    ],
    packages: [
      {
        name: "BASIC BOT",
        label: "Temel Bot",
        features: ["Tek amaçlı bot (FAQ, bilgi, destek)", "Metin tabanlı etkileşim", "Temel komut sistemi", "Basit hafıza", "Always-on kurulum", "1 hafta geliştirme"],
      },
      {
        name: "SMART BOT",
        label: "Akıllı Bot",
        features: ["AI destekli konuşma (Claude API)", "Ses + görsel mesaj desteği", "Bilgi tabanı entegrasyonu", "Kullanıcı bazlı hafıza", "Webhook tetikleyiciler", "2 hafta geliştirme + 1 ay destek"],
      },
      {
        name: "ENTERPRISE",
        label: "Kurumsal Bot",
        features: ["Çoklu bot mimarisi", "CRM / veritabanı entegrasyonu", "Otomatik raporlama", "Kullanıcı yönetim paneli", "API erişimi", "Sürekli geliştirme + bakım"],
      },
    ],
  },
];

export default function HizmetlerPage() {
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
        <FadeIn className="text-center mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Hizmetlerimiz
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            Ne Yapıyoruz
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Müzik, teknoloji ve yaratıcılık kesişiminde sekiz temel alan.
            <br />
            Her biri ayrı bir uzmanlık, hepsi birlikte yaratıcı güç.
          </p>
        </FadeIn>

        {/* Service Detail Cards */}
        <div className="space-y-16 lg:space-y-24">
          {HIZMET_DETAYLARI.map((hizmet, index) => (
            <div key={hizmet.slug} id={hizmet.slug} className="scroll-mt-28">
              <FadeIn
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.1}
              >
                <div className="group relative bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8 lg:p-10 hover:border-[#D8FB32]/15 transition-all duration-500">
                  {/* Corner pinwheel */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <DecorativePinwheel
                      size={24}
                      opacity={0.3}
                      className="group-hover:animate-[spin-slow_3s_linear_infinite]"
                    />
                  </div>

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center text-[#D8FB32] shrink-0 group-hover:bg-[#D8FB32]/10 transition-colors duration-300">
                      <ServiceIcon icon={hizmet.icon} size={28} />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-2">
                        {hizmet.title}
                      </h2>
                      <p className="text-[#D8FB32]/70 text-sm font-medium">
                        {hizmet.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#CCCCCC] text-base leading-relaxed mb-8 max-w-3xl">
                    {hizmet.description}
                  </p>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h3 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-4">
                      Neler Dahil
                    </h3>
                    <StaggerChildren
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                      staggerDelay={0.05}
                    >
                      {hizmet.features.map((feature) => (
                        <StaggerItem key={feature}>
                          <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] border border-[#1F2937]/50 rounded-xl">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#D8FB32"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-[#E0E0E0] text-sm">
                              {feature}
                            </span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  </div>

                  {/* Packages */}
                  {hizmet.packages && (
                    <div className="mb-8">
                      <h3 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-4">
                        Paketler
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {hizmet.packages.map((pkg, pkgIndex) => (
                          <div
                            key={pkg.name}
                            className={`p-5 rounded-2xl border transition-all duration-300 ${
                              pkgIndex === 1
                                ? "bg-[#D8FB32]/5 border-[#D8FB32]/30"
                                : "bg-[#1A1A1A] border-[#1F2937]"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-sm font-bold tracking-wider ${
                                  pkgIndex === 1
                                    ? "text-[#D8FB32]"
                                    : "text-[#5532FA]"
                                }`}
                              >
                                {pkg.name}
                              </span>
                              {pkgIndex === 1 && (
                                <span className="text-[10px] bg-[#D8FB32]/20 text-[#D8FB32] px-2 py-0.5 rounded-full font-medium">
                                  Popüler
                                </span>
                              )}
                            </div>
                            <p className="text-[#999999] text-xs mb-4">
                              {pkg.label}
                            </p>
                            <ul className="space-y-2">
                              {pkg.features.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-center gap-2 text-[#CCCCCC] text-sm"
                                >
                                  <span className="w-1 h-1 bg-[#D8FB32] rounded-full shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Web Sitesi Showcase — mockup browser frames */}
                  {hizmet.slug === "web-sitesi-tasarimi" && (
                    <div className="mb-8">
                      <h3 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-4">
                        Yaptığımız Siteler
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { name: "Echo Bazaar", url: "o-zeta-murex.vercel.app", image: "/images/projects/mockup-ozeta.png" },
                          { name: "Shortlist Creative", url: "shortlistcreative.com", image: "/images/projects/mockup-shortlist.png" },
                          { name: "The Kai", url: "thekai.co", image: "/images/projects/mockup-thekai.png" },
                        ].map((site) => (
                          <div key={site.name} className="group/site relative rounded-2xl overflow-hidden border border-[#1F2937] hover:border-[#D8FB32]/20 transition-all duration-300 bg-[#0A0A0A]">
                            <div className="overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={site.image}
                                alt={`${site.name} web sitesi`}
                                className="w-full h-auto object-cover group-hover/site:scale-[1.02] transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <div className="p-3 flex items-center justify-between">
                              <div>
                                <p className="text-[#F5F5F5] text-sm font-medium">{site.name}</p>
                                <p className="text-[#666666] text-xs">{site.url}</p>
                              </div>
                              <span className="text-[10px] bg-[#D8FB32]/15 text-[#D8FB32] px-2 py-0.5 rounded-full font-medium">Canlı</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-sm hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.08)]"
                  >
                    İletişime Geç
                  </Link>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn className="mt-24 lg:mt-32 text-center">
          <div className="bg-gradient-to-br from-[#141414] to-[#1A1A1A] border border-[#1F2937] rounded-[20px] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-6 right-6 pointer-events-none">
              <DecorativePinwheel size={60} opacity={0.06} rotate={30} animate />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
              Projenizi Konuşalım
            </h2>
            <p className="text-[#999999] text-lg max-w-xl mx-auto mb-8">
              Hangi hizmete ihtiyacınız olursa olsun, size özel bir çözüm üretiyoruz.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-base hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.1)]"
            >
              İletişime Geç
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
