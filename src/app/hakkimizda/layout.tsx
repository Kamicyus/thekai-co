import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkimizda | The Kai - AI-Native Creative Studio",
  description:
    "The Kai, muzik, teknoloji ve yaraticilik kesisiminde bir studyo. 2011'den bu yana muzik, 2023'ten bu yana AI. 20M+ dinlenme, 72+ AI ajan, 9 hizmet alani.",
  keywords: [
    "The Kai hakkinda",
    "Kamer Can Izvermez",
    "AI studyo",
    "muzik produksiyon",
    "AI ajan sistemi",
    "Echo Bazaar",
    "dijital yaraticilik",
    "Istanbul",
  ],
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: "Hakkimizda | The Kai - AI-Native Creative Studio",
    description:
      "Muzik, teknoloji ve yaraticilik kesisiminde bir studyo. 20M+ dinlenme, 72+ AI ajan. Kurucu: Kamer Can Izvermez.",
    url: "https://thekai.co/hakkimizda",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai Hakkinda",
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
