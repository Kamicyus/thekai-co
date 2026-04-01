import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ucretsiz Online Araclar | The Kai",
  description:
    "Reklamsiz, kayit gerektirmeyen ucretsiz online araclar. QR kod olusturucu, kelime sayaci ve daha fazlasi.",
  openGraph: {
    title: "Ucretsiz Online Araclar | The Kai",
    description:
      "Reklamsiz, kayit gerektirmeyen ucretsiz online araclar. QR kod olusturucu, kelime sayaci ve daha fazlasi.",
    url: "https://thekai.co/araclar",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "https://thekai.co/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Kai - Ucretsiz Online Araclar",
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
