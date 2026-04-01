import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkimizda — Kurucu, Hikaye ve Vizyon | The Kai",
  description:
    "The Kai'nin hikayesi, kurucu Kamer Can Izvermez ve AI-native yaratici studyo vizyonu. 72+ AI ajan, 20M+ dinlenme, 15 yil muzik deneyimi.",
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: "Hakkimizda — Kurucu, Hikaye ve Vizyon | The Kai",
    description:
      "The Kai'nin hikayesi, kurucu Kamer Can Izvermez ve AI-native yaratici studyo vizyonu. 72+ AI ajan, 20M+ dinlenme, 15 yil muzik deneyimi.",
    url: "https://thekai.co/hakkimizda",
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
