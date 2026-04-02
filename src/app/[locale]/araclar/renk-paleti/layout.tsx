import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Renk Paleti Üretici | Color Palette Generator | The Kai",
  description:
    "Rastgele renk paleti oluşturun. HEX, RGB, HSL kodları, renk kilitleme, tek tıkla kopyalama. Ücretsiz renk paleti üretici, color palette generator.",
  keywords: [
    "renk paleti",
    "color palette generator",
    "renk seçici",
    "renk paleti oluşturucu",
    "renk kombinasyonları",
    "hex renk kodu",
    "rgb renk",
    "renk şeması",
  ],
  openGraph: {
    title: "Ücretsiz Renk Paleti Üretici | Color Palette Generator | The Kai",
    description:
      "Rastgele renk paleti oluşturun. HEX, RGB, HSL kodları, renk kilitleme, tek tıkla kopyalama. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/renk-paleti",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Renk Paleti Üretici",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/renk-paleti",
  },
};

export default function RenkPaletiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
