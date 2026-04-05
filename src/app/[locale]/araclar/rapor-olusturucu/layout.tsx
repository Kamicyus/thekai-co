import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Rapor Oluşturucu — Ücretsiz Online Rapor Hazırlama | The Kai",
  description:
    "AI destekli ücretsiz rapor oluşturucu. Konunuzu yazın, profesyonel HTML rapor anında hazırlansın. PDF ve HTML olarak indirin.",
  keywords: [
    "rapor oluşturucu",
    "online rapor hazırlama",
    "AI rapor",
    "otomatik rapor",
    "rapor şablonu",
    "ücretsiz rapor",
  ],
  openGraph: {
    title: "AI Rapor Oluşturucu — Ücretsiz Online Rapor Hazırlama | The Kai",
    description:
      "AI destekli ücretsiz rapor oluşturucu. Konunuzu yazın, profesyonel HTML rapor anında hazırlansın. PDF ve HTML olarak indirin.",
    url: "https://thekai.co/araclar/rapor-olusturucu",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - AI Rapor Oluşturucu",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/rapor-olusturucu",
  },
};

export default function RaporOlusturucuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
