import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Yüzde Hesaplayıcı | The Kai",
  description:
    "Yüzde hesaplama, oran bulma ve yüzde değişim hesaplama. 3 farklı hesaplama modu. Reklamsız, ücretsiz, hızlı.",
  openGraph: {
    title: "Ücretsiz Yüzde Hesaplayıcı | The Kai",
    description:
      "Yüzde hesaplama, oran bulma ve yüzde değişim hesaplama. 3 farklı hesaplama modu. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/yuzde-hesaplayici",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Yüzde Hesaplayıcı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/yuzde-hesaplayici",
  },
};

export default function YuzdeHesaplayiciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
