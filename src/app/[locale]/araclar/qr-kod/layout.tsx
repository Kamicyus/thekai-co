import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz QR Kod Oluşturucu | The Kai",
  description:
    "Online QR kod oluşturun. Reklamsız, ücretsiz, hızlı. Renk ve boyut seçenekleri ile QR kodunuzu PNG olarak indirin.",
  openGraph: {
    title: "Ücretsiz QR Kod Oluşturucu | The Kai",
    description:
      "Online QR kod oluşturun. Reklamsız, ücretsiz, hızlı. Renk ve boyut seçenekleri ile QR kodunuzu PNG olarak indirin.",
    url: "https://thekai.co/araclar/qr-kod",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz QR Kod Oluşturucu",
      },
    ],
  },
  alternates: {
    canonical: "/araclar/qr-kod",
  },
};

export default function QRKodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
