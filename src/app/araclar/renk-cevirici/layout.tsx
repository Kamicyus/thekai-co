import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renk Kodu Çevirici — HEX, RGB, HSL | The Kai",
  description:
    "HEX, RGB ve HSL renk kodlarını anında çevirin. Canlı renk önizleme, renk seçici ve kopyalama. Reklamsız, ücretsiz.",
  openGraph: {
    title: "Renk Kodu Çevirici — HEX, RGB, HSL | The Kai",
    description:
      "HEX, RGB ve HSL renk kodlarını anında çevirin. Canlı renk önizleme, renk seçici ve kopyalama. Reklamsız, ücretsiz.",
    url: "https://thekai.co/araclar/renk-cevirici",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Renk Kodu Çevirici",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/renk-cevirici",
  },
};

export default function RenkCeviriciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
