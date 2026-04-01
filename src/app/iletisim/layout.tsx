import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim — The Kai | AI-Native Creative Studio",
  description:
    "The Kai ile iletişime geçin. AI ajan sistemi, müzik prodüksiyon, web tasarımı projeleriniz için görüşelim.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "İletişim — The Kai | AI-Native Creative Studio",
    description:
      "The Kai ile iletişime geçin. AI ajan sistemi, müzik prodüksiyon, web tasarımı projeleriniz için görüşelim.",
    url: "https://thekai.co/iletisim",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
