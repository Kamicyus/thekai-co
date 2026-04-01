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
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Portfolyo", href: "/portfolyo" },
  { label: "Blog", href: "/blog" },
  { label: "Araçlar", href: "/araclar" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/callmethekai", icon: "x" },
  { label: "YouTube", href: "https://youtube.com/@callmethekai", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com/callmethekai", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@callmethekai", icon: "tiktok" },
  { label: "Pinterest", href: "https://pinterest.com/callmethekai", icon: "pinterest" },
  { label: "LinkedIn", href: "https://linkedin.com/company/the-kai", icon: "linkedin" },
] as const;

export const SERVICES = [
  {
    title: "AI Ajan Sistemi",
    description: "İşletmeniz için özel AI ajan ekibi.",
    icon: "brain",
    slug: "ai-ajan-sistemi",
  },
  {
    title: "Web Sitesi Tasarımı",
    description: "Kurumsal site, landing page, portfolyo.",
    icon: "browser",
    slug: "web-sitesi-tasarimi",
  },
  {
    title: "İçerik Üretimi",
    description: "YouTube, sosyal medya, marka içeriği.",
    icon: "content",
    slug: "icerik-uretimi",
  },
  {
    title: "Artwork & Tasarım",
    description: "Kapak fotoğrafı, görsel kimlik, artwork.",
    icon: "palette",
    slug: "artwork-tasarim",
  },
  {
    title: "Sesli Kitap Prodüksiyon",
    description: "AI seslendirme ile yayıncılık.",
    icon: "microphone",
    slug: "sesli-kitap",
  },
  {
    title: "Müzik Prodüksiyon",
    description: "Beste, aranjman, mix ve master.",
    icon: "music",
    slug: "muzik-produksiyon",
  },
  {
    title: "Dijital Strateji & Danışmanlık",
    description: "AI danışmanlık, dijital dönüşüm.",
    icon: "lightbulb",
    slug: "dijital-strateji",
  },
  {
    title: "Telegram Bot Geliştirme",
    description: "Kişiye özel bot kurulumu ve otomasyon.",
    icon: "robot",
    slug: "telegram-bot",
  },
] as const;

export const TOOLS = [
  {
    title: "QR Kod Oluşturucu",
    description: "URL veya metin girin, anında QR kod oluşturun. Renk ve boyut özelleştirme. PNG olarak indirin.",
    icon: "qrcode",
    slug: "qr-kod",
  },
  {
    title: "Kelime & Karakter Sayacı",
    description: "Metin yapıştırın, kelime, karakter, cümle ve paragraf sayısını anında görün. Okuma süresi tahmini.",
    icon: "counter",
    slug: "kelime-sayaci",
  },
  {
    title: "Şifre Oluşturucu",
    description: "Güvenli, rastgele şifre oluşturun. Uzunluk, karakter tipi seçenekleri ve şifre gücü göstergesi.",
    icon: "password",
    slug: "sifre-olusturucu",
  },
  {
    title: "Renk Kodu Çevirici",
    description: "HEX, RGB ve HSL renk kodlarını anında çevirin. Canlı önizleme ve kopyalama.",
    icon: "color",
    slug: "renk-cevirici",
  },
  {
    title: "BMI Hesaplayıcı",
    description: "Boy ve kilonuzu girin, vücut kitle indeksinizi anında hesaplayın. Sağlıklı kilo aralığı göstergesi.",
    icon: "bmi",
    slug: "bmi-hesaplayici",
  },
  {
    title: "Büyük/Küçük Harf Çevirici",
    description: "Metni büyük harfe, küçük harfe, başlık düzenine veya cümle düzenine anında çevirin.",
    icon: "textcase",
    slug: "harf-cevirici",
  },
  {
    title: "JSON Formatlayıcı",
    description: "JSON verilerinizi otomatik formatlayın, syntax hatalarını tespit edin, sıkıştırın veya güzelleştirin.",
    icon: "json",
    slug: "json-formatlayici",
  },
  {
    title: "Yüzde Hesaplayıcı",
    description: "Yüzde hesaplama, oran bulma ve yüzde değişim hesaplama. 3 farklı hesaplama modu.",
    icon: "percent",
    slug: "yuzde-hesaplayici",
  },
  {
    title: "Görsel Boyutlandırıcı",
    description: "Görsellerinizi sosyal medya boyutlarına uyarlayın. Instagram, YouTube, Twitter ve özel boyutlar.",
    icon: "image",
    slug: "gorsel-boyutlandirma",
  },
  {
    title: "Yaş Hesaplayıcı",
    description: "Doğum tarihinizi girin, yaşınızı yıl, ay, gün olarak görün. Burç ve doğum gününe kalan süre.",
    icon: "cake",
    slug: "yas-hesaplayici",
  },
  {
    title: "Online Gitar Akort",
    description: "Mikrofonunuzu kullanarak gitarınızı akort edin. Standart akort (EADGBE), referans notalar ve cent göstergesi.",
    icon: "music",
    slug: "tuner",
  },
] as const;

export const STATS = [
  { value: "20M+", label: "Toplam Dinlenme" },
  { value: "72+", label: "AI Ajan" },
  { value: "6", label: "Aktif Proje" },
  { value: "∞", label: "Yeni Dünya" },
] as const;
