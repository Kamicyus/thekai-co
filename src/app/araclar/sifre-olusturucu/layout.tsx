import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Güvenli Şifre Oluşturucu | The Kai",
  description:
    "Güvenli, rastgele şifre oluşturun. Uzunluk ve karakter tipi seçenekleri, şifre gücü göstergesi. Reklamsız, ücretsiz, hızlı.",
  openGraph: {
    title: "Ücretsiz Güvenli Şifre Oluşturucu | The Kai",
    description:
      "Güvenli, rastgele şifre oluşturun. Uzunluk ve karakter tipi seçenekleri, şifre gücü göstergesi. Reklamsız, ücretsiz, hızlı.",
    url: "https://thekai.co/araclar/sifre-olusturucu",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Güvenli Şifre Oluşturucu",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/sifre-olusturucu",
  },
};

export default function SifreOlusturucuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
