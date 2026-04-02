import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — The Kai",
  description:
    "The Kai gizlilik politikası. Veri toplama, cerez kullanimi ve ucuncu taraf hizmetleri hakkinda bilgilendirme.",
  alternates: {
    canonical: "/gizlilik",
  },
  openGraph: {
    title: "Gizlilik Politikası — The Kai",
    description:
      "The Kai gizlilik politikası. Veri toplama, cerez kullanimi ve ucuncu taraf hizmetleri hakkinda bilgilendirme.",
    url: "https://thekai.co/gizlilik",
    siteName: "The Kai",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Veri Toplama",
    content:
      "Araçlarımız tamamen tarayıcınızda çalışır ve sunucuya herhangi bir veri göndermez. Girdiğiniz bilgiler cihazınızdan ayrılmaz; işlem tamamen istemci tarafında gerçekleştirilir.",
  },
  {
    title: "Çerezler",
    content:
      "Web sitemizde temel işlevsellik için minimal düzeyde çerez kullanılır. Bu çerezler, site deneyiminizi iyileştirmek amacıyla kullanılır ve kişisel verilerinizi saklamaz.",
  },
  {
    title: "Üçüncü Taraf Hizmetleri",
    content:
      "Site trafiğini analiz etmek amacıyla Google Analytics kullanabiliriz. Google Analytics, anonim kullanım verileri toplar ve bu veriler kişisel kimliğinizi belirlemek için kullanılmaz. Daha fazla bilgi için Google'ın gizlilik politikasını inceleyebilirsiniz.",
  },
  {
    title: "İletişim Formu",
    content:
      "İletişim formu aracılığıyla gönderdiğiniz bilgiler (ad, e-posta, mesaj) yalnızca sizinle iletişim kurmak amacıyla kullanılır. Bu bilgiler üçüncü taraflarla paylaşılmaz ve talebiniz yanıtlandıktan sonra makul bir süre içinde silinir.",
  },
  {
    title: "Güncellemeler",
    content:
      "Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayımlanır. Politikayı düzenli olarak gözden geçirmenizi öneririz.",
  },
  {
    title: "İletişim",
    content:
      "Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.",
    link: { href: "/iletisim", label: "thekai.co/iletisim" },
  },
];

export default function GizlilikPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-sm text-muted-foreground">
            Son güncelleme: 1 Nisan 2026
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <p className="text-[#999999] leading-relaxed text-sm">
                {section.content}
              </p>
              {section.link && (
                <a
                  href={section.link.href}
                  className="inline-block mt-3 text-sm text-[#D8FB32] hover:underline transition-colors"
                >
                  {section.link.label} &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
