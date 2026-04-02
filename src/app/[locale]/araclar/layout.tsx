import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Online Araçlar | The Kai",
  description:
    "Reklamsız, kayıt gerektirmeyen ücretsiz online araçlar. QR kod oluşturucu, kelime sayacı ve daha fazlası.",
  openGraph: {
    title: "Ücretsiz Online Araçlar | The Kai",
    description:
      "Reklamsız, kayıt gerektirmeyen ücretsiz online araçlar. QR kod oluşturucu, kelime sayacı ve daha fazlası.",
    url: "https://thekai.co/araclar",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ücretsiz Online Araçlar",
      },
    ],
  },
  alternates: {
    canonical: "/araclar",
  },
};

export default function AraclarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
