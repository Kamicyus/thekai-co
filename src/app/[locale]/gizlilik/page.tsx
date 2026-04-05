import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — The Kai",
  description:
    "The Kai gizlilik politikası. Veri toplama, AI ajan sistemi gizliliği, çerez kullanımı ve üçüncü taraf hizmetleri hakkında bilgilendirme.",
  alternates: {
    canonical: "/gizlilik",
    languages: {
      tr: "https://thekai.co/gizlilik",
      en: "https://thekai.co/en/gizlilik",
    },
  },
  openGraph: {
    title: "Gizlilik Politikası — The Kai",
    description:
      "The Kai gizlilik politikası. Veri toplama, AI ajan sistemi gizliliği, çerez kullanımı ve üçüncü taraf hizmetleri hakkında bilgilendirme.",
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
      "Araçlarımız tamamen tarayıcınızda çalışır ve sunucuya herhangi bir veri göndermez. Girdiğiniz bilgiler cihazınızdan ayrılmaz; işlem tamamen istemci tarafında gerçekleştirilir. Kai Agents platformu kapsamında hesap açılması durumunda ad, e-posta adresi ve kullanım verileri işlenmektedir.",
  },
  {
    title: "AI Ajan Sistemi Gizliliği",
    content:
      "Kai Agents platformunda oluşturduğunuz iş akışları, ajan konfigürasyonları ve görev içerikleri yalnızca size aittir. Verileriniz diğer kullanıcılarla paylaşılmaz; her kullanıcı verisi ayrı bir tenant yapısında izole tutulur. AI modellerine (Claude, GPT vb.) iletilen içerikler yalnızca o oturuma özgüdür; kalıcı olarak saklanmaz ve model eğitimi için kullanılmaz. Platform sahibinin (Kamer Can İzvermez) kişisel verileri, bilgi tabanları veya operasyonel belgeleri hiçbir koşulda platform kullanıcılarına aktarılmaz.",
  },
  {
    title: "Kullanıcı Verilerinin İzolasyonu",
    content:
      "Her kullanıcının verileri teknik olarak birbirinden izole edilmiştir. Kullanıcı A, Kullanıcı B'nin ajanlarını, raporlarını veya görev geçmişini göremez. AI model çağrılarında bir kullanıcıya ait veriler diğer kullanıcılara sızmaz. Hesap silme talebinde, yasal saklama yükümlülüğü olmayan tüm veriler 30 gün içinde kalıcı olarak silinir.",
  },
  {
    title: "Çerezler",
    content:
      "Web sitemizde temel işlevsellik için zorunlu çerezler kullanılır: oturum yönetimi, tema tercihi ve güvenlik doğrulaması. Analitik çerezler yalnızca anonim toplu verileri işler; bireysel kullanıcıyı tanımlamaz ve kişisel veri niteliği taşımaz. Çerezleri tarayıcı ayarlarından yönetebilirsiniz. Zorunlu çerezlerin devre dışı bırakılması platform işlevselliğini olumsuz etkileyebilir.",
  },
  {
    title: "Üçüncü Taraf Hizmetleri",
    content:
      "Site trafiğini analiz etmek amacıyla Google Analytics kullanabiliriz; bu araç anonim kullanım verileri toplar ve kişisel kimliğinizi belirlemek için kullanılmaz. Kai Agents platformu; Paddle (ödeme), Supabase (veritabanı) ve AI model sağlayıcıları ile entegre çalışır. Bu entegrasyonlar yalnızca hizmet sunumu amacıyla yapılmış olup verileriniz ticari amaçla üçüncü taraflarla paylaşılmaz.",
  },
  {
    title: "İletişim Formu",
    content:
      "İletişim formu aracılığıyla gönderdiğiniz bilgiler (ad, e-posta, mesaj) yalnızca sizinle iletişim kurmak amacıyla kullanılır. Bu bilgiler üçüncü taraflarla paylaşılmaz ve talebiniz yanıtlandıktan sonra makul bir süre içinde silinir.",
  },
  {
    title: "Güncellemeler",
    content:
      "Bu gizlilik politikası, platform gelişimi veya yasal değişiklikler doğrultusunda güncellenebilir. Önemli değişiklikler, yürürlük tarihinden en az 15 gün önce kayıtlı e-posta adresine bildirilir. Politikayı düzenli olarak gözden geçirmenizi öneririz.",
  },
  {
    title: "KVKK",
    content:
      "Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.",
    link: { href: "/kvkk", label: "KVKK Aydınlatma Metni →" },
  },
  {
    title: "İletişim",
    content:
      "Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.",
    link: { href: "mailto:info@thekai.co", label: "info@thekai.co" },
  },
];

export default function GizlilikPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            Yasal Belge
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-sm text-muted-foreground">
            Son güncelleme: 4 Nisan 2026
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-white/5 pb-12 last:border-0">
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
                  {section.link.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
          <p className="text-xs text-[#666666] leading-relaxed">
            Kullanım koşullarımız için{" "}
            <a href="/kullanim-sartlari" className="text-[#D8FB32] hover:underline">
              Kullanım Şartları
            </a>{" "}
            sayfasını, kişisel veri işleme için{" "}
            <a href="/kvkk" className="text-[#D8FB32] hover:underline">
              KVKK Aydınlatma Metni
            </a>{" "}
            sayfasını inceleyebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
