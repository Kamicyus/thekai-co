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
      ? "About Us | The Kai — AI-Native Creative Studio"
      : "Hakkımızda | The Kai — AI-Native Creative Studio",
    description: isEn
      ? "The Kai is a studio at the intersection of music, technology and creativity. 20M+ plays, 72+ AI agents, 9 service areas."
      : "The Kai, müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo. 2011'den bu yana müzik, 2023'ten bu yana AI. 20M+ dinlenme, 72+ AI ajan, 9 hizmet alanı.",
    keywords: isEn
      ? ["About The Kai", "Kamer Can İzvermez", "AI studio", "music production", "AI agent system", "Echo Bazaar", "digital creativity", "Istanbul"]
      : ["The Kai hakkında", "Kamer Can İzvermez", "AI stüdyo", "müzik prodüksiyon", "AI ajan sistemi", "Echo Bazaar", "dijital yaratıcılık", "İstanbul"],
    alternates: {
      canonical: isEn ? "/en/hakkimizda" : "/hakkimizda",
      languages: {
        tr: "https://thekai.co/hakkimizda",
        en: "https://thekai.co/en/hakkimizda",
      },
    },
    openGraph: {
      title: isEn
        ? "About Us | The Kai — AI-Native Creative Studio"
        : "Hakkımızda | The Kai — AI-Native Creative Studio",
      description: isEn
        ? "A studio at the intersection of music, technology and creativity. 20M+ plays, 72+ AI agents."
        : "Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo. 20M+ dinlenme, 72+ AI ajan. Kurucu: Kamer Can İzvermez.",
      url: isEn ? "https://thekai.co/en/hakkimizda" : "https://thekai.co/hakkimizda",
      siteName: "The Kai",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [
        {
          url: "https://thekai.co/images/og-image.png",
          width: 1200,
          height: 630,
          alt: isEn ? "About The Kai" : "The Kai Hakkında",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@callmethekai",
      creator: "@callmethekai",
      images: ["https://thekai.co/images/og-image.png"],
    },
  };
}

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
