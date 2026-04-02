import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Yaş Hesaplayıcı | The Kai",
  description:
    "Doğum tarihinizi girin, yaşınızı yıl, ay, gün olarak görün. Burç gösterimi ve doğum gününe kalan süre. Reklamsız, ücretsiz, hızlı.",
  openGraph: {
    title: "Ücretsiz Yaş Hesaplayıcı | The Kai",
    description:
      "Doğum tarihinizi girin, yaşınızı yıl, ay, gün olarak görün. Burç gösterimi ve doğum gününe kalan süre. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/yas-hesaplayici",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Yaş Hesaplayıcı",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/yas-hesaplayici",
  },
};

export default function YasHesaplayiciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
