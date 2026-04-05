"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ServiceIcon } from "@/components/icons/ServiceIcons";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

const HIZMET_DETAYLARI_TR = [
  {
    slug: "ai-ajan-sistemi",
    icon: "brain",
    title: "AI Ajan Sistemi Kurulumu",
    subtitle: "Claude Code tabanlı, 72+ ajan deneyimiyle.",
    portfolioLink: "/blog/ai-ajan-sistemi-nedir",
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
    portfolioLink: "/portfolyo#web-siteleri",
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
    portfolioLink: "/blog/dijital-icerik-stratejisi-rehberi",
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
    portfolioLink: "/portfolyo#artwork",
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
    portfolioLink: "/blog/ai-sesli-kitap",
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
    portfolioLink: "/portfolyo#artwork",
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
    portfolioLink: "/blog/claude-code-rehber",
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
    portfolioLink: "/blog/telegram-botu-isletmeler-icin",
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
  {
    slug: "performans-pazarlama",
    icon: "chart",
    title: "Performans Pazarlama",
    subtitle: "Google Ads & Meta Ads ile büyüme.",
    portfolioLink: "/blog/google-ads-kampanya-rehberi",
    description:
      "Google Ads ve Meta (Facebook/Instagram) Ads kampanya yönetimi. AI destekli optimizasyon ile reklam bütçenizden maksimum dönüşüm. Hedef kitle analizi, A/B test, dönüşüm takibi ve aylık performans raporları.",
    features: [
      "Google Ads kampanya yönetimi",
      "Meta (Facebook/Instagram) Ads",
      "AI destekli bütçe optimizasyonu",
      "Hedef kitle analizi ve segmentasyon",
      "A/B test ve dönüşüm takibi",
      "Aylık performans raporları",
    ],
    packages: [
      {
        name: "STARTER",
        label: "Başlangıç",
        features: ["1 platform (Google veya Meta)", "Aylık 10.000 TL'ye kadar reklam bütçesi", "Kampanya kurulumu + optimizasyon", "Temel hedef kitle analizi", "Aylık performans raporu", "Haftalık kontrol"],
      },
      {
        name: "PRO",
        label: "Profesyonel",
        features: ["Google + Meta Ads birlikte", "Aylık 50.000 TL'ye kadar reklam bütçesi", "Gelişmiş hedef kitle + retargeting", "A/B test stratejisi", "Dönüşüm takibi + Analytics kurulumu", "Haftalık rapor + strateji toplantısı"],
      },
      {
        name: "PREMIUM",
        label: "Kurumsal",
        features: ["Tüm platformlar (Google + Meta + YouTube)", "Sınırsız reklam bütçesi yönetimi", "AI destekli otomatik optimizasyon", "Rakip analizi + pazar araştırması", "Landing page tasarımı dahil", "Günlük izleme + 7/24 destek"],
      },
    ],
  },
  {
    slug: "video-produksiyon",
    icon: "video",
    title: "Video Prodüksiyon",
    subtitle: "Klip, tanıtım filmi, motion graphics.",
    portfolioLink: "/portfolyo#video",
    description:
      "Müzik klipleri, marka tanıtım filmleri, sosyal medya videoları ve motion graphics prodüksiyonu. Konsept geliştirmeden son rötuşa kadar tüm süreç. AI destekli post-prodüksiyon ile hızlı ve etkileyici sonuçlar.",
    features: [
      "Müzik klibi prodüksiyon",
      "Marka tanıtım filmi",
      "Motion graphics ve animasyon",
      "Sosyal medya video içerik",
      "AI destekli post-prodüksiyon",
      "Renk düzeltme ve grading",
    ],
    packages: [
      {
        name: "CLIP",
        label: "Tekil Video",
        features: ["1 video prodüksiyon (60 sn'ye kadar)", "Konsept geliştirme", "Temel düzenleme + renk grading", "2 platform formatı", "1 revizyon turu", "5 iş günü teslimat"],
      },
      {
        name: "STUDIO",
        label: "Profesyonel",
        features: ["3 video prodüksiyon", "Senaryo + storyboard", "Motion graphics dahil", "Tüm platform formatları", "Müzik ve ses tasarımı", "Sınırsız revizyon"],
      },
      {
        name: "DIRECTOR",
        label: "Yönetmen",
        features: ["Aylık video prodüksiyon paketi", "Tam yaratıcı yönetim", "Çekim organizasyonu", "VFX ve ileri post-prodüksiyon", "Sosyal medya kesim optimizasyonu", "Sürekli destek + öncelik"],
      },
    ],
  },
  {
    slug: "seo-organik-buyume",
    icon: "search",
    title: "SEO & Organik Büyüme",
    subtitle: "Google'da üst sıralara çıkın.",
    portfolioLink: "/blog/seo-rehberi",
    description:
      "Arama motoru optimizasyonu ile organik trafiğinizi artırın. Teknik SEO, içerik stratejisi, anahtar kelime araştırması ve backlink yönetimi. Google'da üst sıralara çıkarak sürdürülebilir büyüme sağlayın.",
    features: [
      "Teknik SEO audit ve optimizasyon",
      "Anahtar kelime araştırması",
      "İçerik SEO stratejisi",
      "Backlink yönetimi",
      "Google Search Console yönetimi",
      "Aylık SEO performans raporu",
    ],
    packages: [
      {
        name: "AUDIT",
        label: "SEO Analiz",
        features: ["Teknik SEO audit raporu", "Anahtar kelime analizi", "Rakip SEO araştırması", "Aksiyon önerileri listesi", "1 saat danışmanlık", "5 iş günü teslimat"],
      },
      {
        name: "GROWTH",
        label: "Büyüme",
        features: ["3 aylık SEO stratejisi", "Aylık 4 SEO uyumlu içerik", "Teknik optimizasyonlar", "Backlink geliştirme", "Haftalık sıralama takibi", "Aylık performans raporu"],
      },
      {
        name: "DOMINATE",
        label: "Hakimiyet",
        features: ["6 aylık kapsamlı SEO planı", "Sınırsız SEO içerik üretimi", "Gelişmiş backlink stratejisi", "Yerel SEO optimizasyonu", "Schema markup implementasyonu", "Günlük izleme + haftalık strateji"],
      },
    ],
  },
  {
    slug: "e-ticaret",
    icon: "cart",
    title: "E-Ticaret Çözümleri",
    subtitle: "Online mağaza kurulumu ve yönetimi.",
    portfolioLink: "/portfolyo#e-ticaret",
    description:
      "Online mağaza kurulumu, ödeme entegrasyonu, ürün yönetimi ve e-ticaret stratejisi. Shopify, WooCommerce veya custom Next.js çözümleriyle satışa hazır dijital mağazalar.",
    features: [
      "E-ticaret sitesi kurulumu",
      "Ödeme sistemi entegrasyonu",
      "Ürün ve stok yönetimi",
      "Kargo entegrasyonu",
      "Mobil uyumlu tasarım",
      "Analytics ve dönüşüm takibi",
    ],
    packages: [
      {
        name: "STARTER",
        label: "Başlangıç",
        features: ["50 ürüne kadar mağaza", "Temel ödeme entegrasyonu", "Mobil responsive tasarım", "Standart kargo ayarları", "Temel SEO", "1 hafta kurulum"],
      },
      {
        name: "PRO",
        label: "Profesyonel",
        features: ["Sınırsız ürün", "Çoklu ödeme yöntemi", "Gelişmiş filtreleme + arama", "Kargo API entegrasyonu", "E-posta otomasyon", "2 hafta kurulum + 3 ay destek"],
      },
      {
        name: "ENTERPRISE",
        label: "Kurumsal",
        features: ["Custom Next.js e-ticaret", "ERP / muhasebe entegrasyonu", "Çoklu dil + para birimi", "Gelişmiş analytics dashboard", "A/B test altyapısı", "Sürekli geliştirme + bakım"],
      },
    ],
  },
];

const HIZMET_DETAYLARI_EN = [
  {
    slug: "ai-ajan-sistemi",
    icon: "brain",
    title: "AI Agent System Setup",
    subtitle: "Claude Code based, with 72+ agent experience.",
    portfolioLink: "/blog/ai-ajan-sistemi-nedir",
    description:
      "We build custom AI agent teams for your business. Department-specific, interconnected, 24/7 intelligent agent systems. Includes orchestration, memory management, automation pipelines and MCP integrations.",
    features: [
      "Department-based agent design",
      "Orchestration & routing system",
      "Memory management & knowledge base",
      "MCP integrations (Gmail, Calendar, Slack)",
      "Telegram/Discord bot integration",
      "Training & documentation",
    ],
    packages: [
      {
        name: "SPARK",
        label: "Starter",
        features: ["3 core agents", "Single orchestration", "Basic memory system", "CLAUDE.md configuration", "1 week setup", "1 month support"],
      },
      {
        name: "ENGINE",
        label: "Professional",
        features: ["10+ custom agents", "Multi-orchestration", "Advanced memory + knowledge base", "MCP integrations (3+)", "Telegram bot included", "2 week setup + 3 month support"],
      },
      {
        name: "ARCHITECT",
        label: "Enterprise",
        features: ["Unlimited agent architecture", "Full orchestration + model routing", "Custom MCP server development", "Cron automation pipelines", "Team training + documentation", "Ongoing support + maintenance"],
      },
    ],
  },
  {
    slug: "web-sitesi-tasarimi",
    icon: "browser",
    title: "Web Design",
    subtitle: "Modern, fast, stunning.",
    portfolioLink: "/portfolyo#web-siteleri",
    description:
      "High-performance, visually stunning websites with Next.js, Tailwind CSS and Framer Motion. Corporate sites, landing pages, portfolios and e-commerce solutions. References include Shortlist Creative and thekai.co.",
    features: [
      "Next.js + Tailwind CSS + Framer Motion",
      "Responsive & mobile-friendly design",
      "SEO optimization",
      "Vercel deployment",
      "CMS integration",
      "Core Web Vitals optimization",
    ],
    packages: [
      {
        name: "STARTER",
        label: "Single Page",
        features: ["Landing page design", "Mobile responsive", "Basic SEO", "Contact form", "Vercel deployment", "1 revision round"],
      },
      {
        name: "PRO",
        label: "Corporate Site",
        features: ["5+ pages (home, services, about, contact, blog)", "Advanced SEO + sitemap", "Animations (Framer Motion)", "Social media integration", "Analytics setup", "3 revision rounds"],
      },
      {
        name: "PREMIUM",
        label: "Full Package",
        features: ["Unlimited pages", "E-commerce / payment integration", "Blog + CMS infrastructure", "Multi-language support", "Custom design system", "6 months maintenance + support"],
      },
    ],
  },
  {
    slug: "icerik-uretimi",
    icon: "content",
    title: "Content Production",
    subtitle: "With 20M+ streams experience.",
    portfolioLink: "/blog/dijital-icerik-stratejisi-rehberi",
    description:
      "YouTube, social media and brand content production. Video production, thumbnail design, content strategy and platform optimization. Proven content production methodology with 20M+ streams on Echo Bazaar.",
    features: [
      "YouTube video production",
      "Thumbnail design & A/B testing",
      "Social media content plan",
      "Brand content strategy",
      "Video editing & post-production",
      "Platform-based optimization",
    ],
    packages: [
      {
        name: "BASIC",
        label: "Starter",
        features: ["8 social media posts/month", "2 platforms (your choice)", "Basic visual design", "Content calendar", "Monthly performance report", "1 revision/post"],
      },
      {
        name: "GROWTH",
        label: "Growth",
        features: ["20 posts + 4 videos/month", "4 platform management", "Thumbnail + visual design", "Hashtag & SEO strategy", "Weekly performance report", "Unlimited revisions"],
      },
      {
        name: "SCALE",
        label: "Scale",
        features: ["Unlimited content production", "All platforms", "Video production (filming included)", "Influencer coordination", "Ad creative production", "Daily reporting + strategy meetings"],
      },
    ],
  },
  {
    slug: "artwork-tasarim",
    icon: "palette",
    title: "Artwork & Design",
    subtitle: "Cinematic, understated, impactful.",
    portfolioLink: "/portfolyo#artwork",
    description:
      "Music cover art, visual identity design and artwork production. Minimal and powerful visuals with an Apple-like brand identity approach, referencing the Kim Jung Vada design portfolio.",
    features: [
      "Single/album cover design",
      "Visual identity & brand language",
      "Social media visuals",
      "Poster & banner design",
      "AI-powered visual production",
      "Print-ready file output",
    ],
    packages: [
      {
        name: "SINGLE",
        label: "Single Project",
        features: ["1 cover design or visual set", "3 concept proposals", "All platform sizes", "Source files (AI/PSD)", "2 revision rounds", "5 business days delivery"],
      },
      {
        name: "BUNDLE",
        label: "Bundle",
        features: ["5 cover/visual designs", "Consistent visual language", "Social media kit", "Animated version", "Unlimited revisions", "Priority delivery"],
      },
      {
        name: "IDENTITY",
        label: "Brand Identity",
        features: ["Logo + visual identity system", "Color palette + typography", "Social media templates", "Brand guide", "Business card + corporate set", "Comprehensive presentation file"],
      },
    ],
  },
  {
    slug: "sesli-kitap",
    icon: "microphone",
    title: "Audiobook Production",
    subtitle: "Publishing with AI narration.",
    portfolioLink: "/blog/ai-sesli-kitap",
    description:
      "We transform classic and modern literature into audiobooks with AI narration. Text segmentation, voice selection, narration, editing and digital platform distribution. With Murmur publishing experience.",
    features: [
      "AI narration (ElevenLabs)",
      "Text segmentation & preparation",
      "Sound design & editing",
      "Spotify & platform distribution",
      "Cover design & branding",
      "Copyright consulting",
    ],
    packages: [
      {
        name: "CHAPTER",
        label: "Single Chapter",
        features: ["1 chapter narration (max 30 min)", "Voice selection (5+ voices)", "Basic editing", "MP3 + WAV output", "1 revision", "3 business days delivery"],
      },
      {
        name: "BOOK",
        label: "Full Book",
        features: ["Complete book narration", "Professional sound design", "Chapter-by-chapter editing", "All platform distribution", "Cover design included", "Unlimited revisions"],
      },
      {
        name: "PUBLISHER",
        label: "Publisher",
        features: ["3+ books/month production", "Custom voice library", "Automated pipeline setup", "Platform management", "Revenue tracking + reporting", "Ongoing support + priority"],
      },
    ],
  },
  {
    slug: "muzik-produksiyon",
    icon: "music",
    title: "Music Production",
    subtitle: "Traditional and AI-powered production.",
    portfolioLink: "/portfolyo#artwork",
    description:
      "Composition, arrangement, mix, master and vocal production services. 15 years of songwriting experience, proven AI music production capacity with 20M+ streams on Echo Bazaar. Hybrid production with Suno, ElevenLabs and traditional DAW tools.",
    features: [
      "Composition & songwriting",
      "Arrangement & production",
      "Mix & mastering",
      "Vocal recording & production",
      "AI music production (Suno, ElevenLabs)",
      "Spotify/Apple Music distribution consulting",
    ],
    packages: [
      {
        name: "TRACK",
        label: "Single Track",
        features: ["1 song production", "Beat/arrangement", "Mix + master", "Vocal editing", "Digital distribution consulting", "2 revision rounds"],
      },
      {
        name: "EP",
        label: "EP Package",
        features: ["4-6 song production", "Consistent sound design", "Professional mix + master", "Artwork design included", "Spotify/Apple Music distribution", "Unlimited revisions"],
      },
      {
        name: "ALBUM",
        label: "Album",
        features: ["10+ songs full production", "Concept development", "AI + traditional hybrid production", "Mastering (reference matching)", "Full artwork + music video consulting", "Launch strategy"],
      },
    ],
  },
  {
    slug: "dijital-strateji",
    icon: "lightbulb",
    title: "Digital Strategy & Consulting",
    subtitle: "AI-native transformation.",
    portfolioLink: "/blog/claude-code-rehber",
    description:
      "AI consulting, digital transformation strategy, social media planning and brand positioning. Enterprise-level strategy development and execution with references from projects like Eksi Maya Sports.",
    features: [
      "AI transformation consulting",
      "Digital marketing strategy",
      "Social media management",
      "Brand positioning",
      "Competitor & market analysis",
      "KPI tracking & reporting",
    ],
    packages: [
      {
        name: "AUDIT",
        label: "Analysis",
        features: ["Current state analysis", "Competitor research", "SWOT analysis", "Opportunity mapping", "Action recommendations report", "1 hour consulting session"],
      },
      {
        name: "STRATEGY",
        label: "Strategy",
        features: ["3-month strategy plan", "Platform-based roadmap", "Content strategy", "KPI definition + dashboard", "Weekly check-in meetings", "Monthly performance report"],
      },
      {
        name: "PARTNER",
        label: "Partner",
        features: ["Ongoing strategy partner", "All platform management", "Ad budget optimization", "Crisis management", "Team training", "Unlimited consulting"],
      },
    ],
  },
  {
    slug: "telegram-bot",
    icon: "robot",
    title: "Telegram Bot Development",
    subtitle: "24/7, always-on architecture.",
    portfolioLink: "/blog/telegram-botu-isletmeler-icin",
    description:
      "Custom Telegram bot setup. Finance advisor, content assistant, customer support bot, automation tools. Smart bots with Claude API integration, running uninterrupted with systemd service management.",
    features: [
      "Custom bot development",
      "Claude API integration",
      "Voice & image message support",
      "Always-on systemd architecture",
      "Knowledge base & memory management",
      "Webhook & automation integration",
    ],
    packages: [
      {
        name: "BASIC BOT",
        label: "Basic Bot",
        features: ["Single-purpose bot (FAQ, info, support)", "Text-based interaction", "Basic command system", "Simple memory", "Always-on setup", "1 week development"],
      },
      {
        name: "SMART BOT",
        label: "Smart Bot",
        features: ["AI-powered conversation (Claude API)", "Voice + image message support", "Knowledge base integration", "User-based memory", "Webhook triggers", "2 week development + 1 month support"],
      },
      {
        name: "ENTERPRISE",
        label: "Enterprise Bot",
        features: ["Multi-bot architecture", "CRM / database integration", "Automated reporting", "User management panel", "API access", "Ongoing development + maintenance"],
      },
    ],
  },
  {
    slug: "performans-pazarlama",
    icon: "chart",
    title: "Performance Marketing",
    subtitle: "Growth with Google Ads & Meta Ads.",
    portfolioLink: "/blog/google-ads-kampanya-rehberi",
    description:
      "Google Ads and Meta (Facebook/Instagram) Ads campaign management. Maximum conversion from your ad budget with AI-powered optimization. Audience analysis, A/B testing, conversion tracking and monthly performance reports.",
    features: [
      "Google Ads campaign management",
      "Meta (Facebook/Instagram) Ads",
      "AI-powered budget optimization",
      "Audience analysis & segmentation",
      "A/B testing & conversion tracking",
      "Monthly performance reports",
    ],
    packages: [
      {
        name: "STARTER",
        label: "Starter",
        features: ["1 platform (Google or Meta)", "Up to $300/month ad budget", "Campaign setup + optimization", "Basic audience analysis", "Monthly performance report", "Weekly check-ins"],
      },
      {
        name: "PRO",
        label: "Professional",
        features: ["Google + Meta Ads together", "Up to $1,500/month ad budget", "Advanced audience + retargeting", "A/B test strategy", "Conversion tracking + Analytics setup", "Weekly report + strategy meeting"],
      },
      {
        name: "PREMIUM",
        label: "Enterprise",
        features: ["All platforms (Google + Meta + YouTube)", "Unlimited ad budget management", "AI-powered auto optimization", "Competitor analysis + market research", "Landing page design included", "Daily monitoring + 24/7 support"],
      },
    ],
  },
  {
    slug: "video-produksiyon",
    icon: "video",
    title: "Video Production",
    subtitle: "Music videos, promo films, motion graphics.",
    portfolioLink: "/portfolyo#video",
    description:
      "Music video production, brand promo films, social media videos and motion graphics. From concept development to final touches. Fast and impactful results with AI-powered post-production.",
    features: [
      "Music video production",
      "Brand promo films",
      "Motion graphics & animation",
      "Social media video content",
      "AI-powered post-production",
      "Color correction & grading",
    ],
    packages: [
      {
        name: "CLIP",
        label: "Single Video",
        features: ["1 video production (up to 60s)", "Concept development", "Basic editing + color grading", "2 platform formats", "1 revision round", "5 business days delivery"],
      },
      {
        name: "STUDIO",
        label: "Professional",
        features: ["3 video productions", "Script + storyboard", "Motion graphics included", "All platform formats", "Music & sound design", "Unlimited revisions"],
      },
      {
        name: "DIRECTOR",
        label: "Director",
        features: ["Monthly video production package", "Full creative direction", "Shoot organization", "VFX & advanced post-production", "Social media cut optimization", "Ongoing support + priority"],
      },
    ],
  },
  {
    slug: "seo-organik-buyume",
    icon: "search",
    title: "SEO & Organic Growth",
    subtitle: "Rank higher on Google.",
    portfolioLink: "/blog/seo-rehberi",
    description:
      "Increase your organic traffic with search engine optimization. Technical SEO, content strategy, keyword research and backlink management. Achieve sustainable growth by ranking higher on Google.",
    features: [
      "Technical SEO audit & optimization",
      "Keyword research",
      "Content SEO strategy",
      "Backlink management",
      "Google Search Console management",
      "Monthly SEO performance report",
    ],
    packages: [
      {
        name: "AUDIT",
        label: "SEO Analysis",
        features: ["Technical SEO audit report", "Keyword analysis", "Competitor SEO research", "Action recommendations list", "1 hour consulting", "5 business days delivery"],
      },
      {
        name: "GROWTH",
        label: "Growth",
        features: ["3-month SEO strategy", "4 SEO-optimized articles/month", "Technical optimizations", "Backlink development", "Weekly ranking tracking", "Monthly performance report"],
      },
      {
        name: "DOMINATE",
        label: "Domination",
        features: ["6-month comprehensive SEO plan", "Unlimited SEO content production", "Advanced backlink strategy", "Local SEO optimization", "Schema markup implementation", "Daily monitoring + weekly strategy"],
      },
    ],
  },
  {
    slug: "e-ticaret",
    icon: "cart",
    title: "E-Commerce Solutions",
    subtitle: "Online store setup & management.",
    portfolioLink: "/portfolyo#e-ticaret",
    description:
      "Online store setup, payment integration, product management and e-commerce strategy. Sales-ready digital stores with Shopify, WooCommerce or custom Next.js solutions.",
    features: [
      "E-commerce site setup",
      "Payment system integration",
      "Product & inventory management",
      "Shipping integration",
      "Mobile-responsive design",
      "Analytics & conversion tracking",
    ],
    packages: [
      {
        name: "STARTER",
        label: "Starter",
        features: ["Up to 50 products", "Basic payment integration", "Mobile responsive design", "Standard shipping settings", "Basic SEO", "1 week setup"],
      },
      {
        name: "PRO",
        label: "Professional",
        features: ["Unlimited products", "Multiple payment methods", "Advanced filtering + search", "Shipping API integration", "Email automation", "2 week setup + 3 month support"],
      },
      {
        name: "ENTERPRISE",
        label: "Enterprise",
        features: ["Custom Next.js e-commerce", "ERP / accounting integration", "Multi-language + currency", "Advanced analytics dashboard", "A/B testing infrastructure", "Ongoing development + maintenance"],
      },
    ],
  },
];

export default function HizmetlerPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const HIZMET_DETAYLARI = isEn ? HIZMET_DETAYLARI_EN : HIZMET_DETAYLARI_TR;

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
              {isEn ? "Our Services" : "Hizmetlerimiz"}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            {isEn ? "What We Do" : "Ne Yapıyoruz"}
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {isEn ? (
              <>
                Twelve core disciplines at the intersection of music, technology and creativity.
                <br />
                Each one a specialty, together a creative force.
              </>
            ) : (
              <>
                Müzik, teknoloji ve yaratıcılık kesişiminde on iki temel alan.
                <br />
                Her biri ayrı bir uzmanlık, hepsi birlikte yaratıcı güç.
              </>
            )}
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
                      {isEn ? "What's Included" : "Neler Dahil"}
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
                        {isEn ? "Packages" : "Paketler"}
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
                                  {isEn ? "Popular" : "Popüler"}
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

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-sm hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.08)]"
                    >
                      {isEn ? "Get in Touch" : "İletişime Geç"}
                    </Link>
                    {hizmet.portfolioLink && (
                      <Link
                        href={hizmet.portfolioLink}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#1F2937] text-[#F5F5F5] font-semibold rounded-[10px] text-sm hover:border-[#D8FB32]/30 hover:bg-[#D8FB32]/5 transition-all duration-200"
                      >
                        {isEn ? "See Examples" : "Örnekleri Gör"}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      </Link>
                    )}
                  </div>
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
              {isEn ? "Let's Talk About Your Project" : "Projenizi Konuşalım"}
            </h2>
            <p className="text-[#999999] text-lg max-w-xl mx-auto mb-8">
              {isEn
                ? "Whatever service you need, we'll create a custom solution for you."
                : "Hangi hizmete ihtiyacınız olursa olsun, size özel bir çözüm üretiyoruz."}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-base hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.1)]"
            >
              {isEn ? "Get in Touch" : "İletişime Geç"}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
