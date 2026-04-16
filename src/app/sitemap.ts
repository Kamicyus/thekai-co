import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog-data";

const BASE_URL = "https://thekai.co";

// Turkish routes (default locale, no prefix)
const TR_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/hizmetler", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/iletisim", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/portfolyo", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/hakkimizda", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/araclar", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/araclar/qr-kod", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/kelime-sayaci", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/sifre-olusturucu", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/renk-cevirici", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/bmi-hesaplayici", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/harf-cevirici", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/json-formatlayici", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/yuzde-hesaplayici", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/gorsel-boyutlandirma", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/yas-hesaplayici", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/tuner", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/metronom", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/bpm-bulucu", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/base64", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/lorem-ipsum", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/pomodoro", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/regex-test", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/renk-paleti", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/metin-farki", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/rapor-olusturucu", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/araclar/youtube-bpm-analiz", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/agents", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/gizlilik", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/kullanim-sartlari", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/kvkk", changeFrequency: "yearly" as const, priority: 0.3 },
];

// English routes (prefixed with /en)
const EN_ROUTES = [
  { path: "/en", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/en/hizmetler", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/en/iletisim", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/portfolyo", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/hakkimizda", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/blog", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/en/araclar", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/en/araclar/qr-kod", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/kelime-sayaci", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/sifre-olusturucu", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/renk-cevirici", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/bmi-hesaplayici", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/harf-cevirici", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/json-formatlayici", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/yuzde-hesaplayici", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/gorsel-boyutlandirma", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/yas-hesaplayici", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/tuner", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/metronom", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/bpm-bulucu", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/base64", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/lorem-ipsum", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/pomodoro", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/regex-test", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/renk-paleti", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/metin-farki", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/rapor-olusturucu", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/araclar/youtube-bpm-analiz", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/en/agents", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/en/gizlilik", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/en/kullanim-sartlari", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/en/kvkk", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();

  const trBlogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const enBlogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/en/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const trEntries: MetadataRoute.Sitemap = TR_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const enEntries: MetadataRoute.Sitemap = EN_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...trEntries, ...trBlogEntries, ...enEntries, ...enBlogEntries];
}
