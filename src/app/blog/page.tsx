import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — The Kai | AI, Müzik ve Yaratıcılık",
  description:
    "AI ajan sistemleri, müzik prodüksiyon, dijital yaratıcılık ve teknoloji üzerine yazılar. The Kai blog.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — The Kai | AI, Müzik ve Yaratıcılık",
    description:
      "AI ajan sistemleri, müzik prodüksiyon, dijital yaratıcılık ve teknoloji üzerine yazılar.",
    url: "https://thekai.co/blog",
  },
};

export default function BlogPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Blog
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-5">
            Blog
          </h1>
          <p className="text-[#999999] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            AI, müzik, teknoloji ve yaratıcılık üzerine yazılar.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center mx-auto mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D8FB32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
              İçeriklerimiz Yakında Burada Olacak
            </h2>
            <p className="text-[#999999] text-base leading-relaxed mb-8 max-w-md mx-auto">
              AI ajan sistemleri, müzik prodüksiyon süreçleri ve dijital yaratıcılık
              üzerine derinlemesine yazılar hazırlıyoruz.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-sm hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.08)]"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
