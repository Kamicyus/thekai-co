export const SITE_CONFIG = {
  name: "The Kai",
  slogan: "Call Me Kai",
  domain: "thekai.co",
  handle: "@callmethekai",
  email: "hello@thekai.co",
  description: "Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo.",
} as const;

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Portfolyo", href: "/#portfolyo" },
  { label: "Hakkında", href: "/#hakkinda" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/callmethekai", icon: "x" },
  { label: "YouTube", href: "https://youtube.com/@callmethekai", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com/callmethekai", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@callmethekai", icon: "tiktok" },
  { label: "Pinterest", href: "https://pinterest.com/callmethekai", icon: "pinterest" },
  { label: "LinkedIn", href: "https://linkedin.com/company/thekai", icon: "linkedin" },
] as const;

export const SERVICES = [
  {
    title: "AI Ajan Sistemi",
    description: "İşletmeniz için özel AI ajan ekibi.",
    icon: "brain",
  },
  {
    title: "Müzik Prodüksiyon",
    description: "Beste, aranjman, mix ve master.",
    icon: "music",
  },
  {
    title: "İçerik Üretimi",
    description: "YouTube, sosyal medya, marka içeriği.",
    icon: "content",
  },
  {
    title: "Yazılım Geliştirme",
    description: "Web uygulamaları ve otomasyon.",
    icon: "code",
  },
  {
    title: "Artwork & Tasarım",
    description: "Kapak fotoğrafı, görsel kimlik, artwork.",
    icon: "palette",
  },
  {
    title: "Kayıt & Vokal",
    description: "Stüdyo kayıt, vokal prodüksiyon.",
    icon: "microphone",
  },
  {
    title: "Web Sitesi Tasarımı",
    description: "Kurumsal site, landing page, portfolyo.",
    icon: "browser",
  },
  {
    title: "Strateji & Danışmanlık",
    description: "AI danışmanlık, dijital strateji.",
    icon: "lightbulb",
  },
] as const;

export const STATS = [
  { value: "20M+", label: "Toplam Dinlenme" },
  { value: "72+", label: "AI Ajan" },
  { value: "6", label: "Aktif Proje" },
  { value: "∞", label: "Yeni Dünya" },
] as const;
