import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Services — AI Agent Setup, Music Production, Web Design | The Kai"
      : "Hizmetler — AI Ajan Kurulumu, Müzik Prodüksiyon, Web Tasarımı | The Kai",
    description: isEn
      ? "AI agent system setup, music production, web design, content creation, artwork and digital consultancy services. Istanbul, Turkey."
      : "AI ajan sistemi kurulumu, müzik prodüksiyon, web sitesi tasarımı, içerik üretimi, artwork ve dijital danışmanlık hizmetleri. İstanbul, Türkiye.",
    alternates: {
      canonical: isEn ? "/en/hizmetler" : "/hizmetler",
      languages: {
        tr: "https://thekai.co/hizmetler",
        en: "https://thekai.co/en/hizmetler",
      },
    },
    openGraph: {
      title: isEn
        ? "Services — AI Agent Setup, Music Production, Web Design | The Kai"
        : "Hizmetler — AI Ajan Kurulumu, Müzik Prodüksiyon, Web Tasarımı | The Kai",
      description: isEn
        ? "AI agent system setup, music production, web design, content creation and digital consultancy."
        : "AI ajan sistemi kurulumu, müzik prodüksiyon, web sitesi tasarımı, içerik üretimi ve dijital danışmanlık.",
      url: isEn ? "https://thekai.co/en/hizmetler" : "https://thekai.co/hizmetler",
      siteName: "The Kai",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@callmethekai",
      images: ["/images/og-image.png"],
    },
  };
}

export default function HizmetlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
