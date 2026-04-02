import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | The Kai — AI-Native Creative Studio",
  description:
    "The Kai, müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo. 2011'den bu yana müzik, 2023'ten bu yana AI. 20M+ dinlenme, 72+ AI ajan, 9 hizmet alanı.",
  keywords: [
    "The Kai hakkında",
    "Kamer Can İzvermez",
    "AI stüdyo",
    "müzik prodüksiyon",
    "AI ajan sistemi",
    "Echo Bazaar",
    "dijital yaratıcılık",
    "İstanbul",
  ],
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | The Kai — AI-Native Creative Studio",
    description:
      "Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo. 20M+ dinlenme, 72+ AI ajan. Kurucu: Kamer Can İzvermez.",
    url: "https://thekai.co/hakkimizda",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai Hakkında",
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

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
