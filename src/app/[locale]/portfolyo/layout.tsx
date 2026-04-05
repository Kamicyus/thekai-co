import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolyo — The Kai",
  description:
    "The Kai'nin müzik, tasarım ve dijital projelerini keşfedin. Echo Bazaar, MURMUR ve daha fazlası.",
  alternates: {
    canonical: "/portfolyo",
    languages: {
      tr: "https://thekai.co/portfolyo",
      en: "https://thekai.co/en/portfolyo",
    },
  },
  openGraph: {
    title: "Portfolyo — The Kai",
    description:
      "The Kai'nin müzik, tasarım ve dijital projelerini keşfedin.",
    url: "https://thekai.co/portfolyo",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function PortfolyoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
