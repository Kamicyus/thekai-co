import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — The Kai",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında The Kai / Kai Agents platformuna ilişkin aydınlatma metni.",
  alternates: {
    canonical: "/kvkk",
    languages: {
      tr: "https://thekai.co/kvkk",
      en: "https://thekai.co/en/kvkk",
    },
  },
  openGraph: {
    title: "KVKK Aydınlatma Metni — The Kai",
    description:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında The Kai / Kai Agents platformuna ilişkin aydınlatma metni.",
    url: "https://thekai.co/kvkk",
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
    title: "1. Veri Sorumlusu",
    content:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca veri sorumlusu sıfatını taşıyan kişi ve kuruluş: Kamer Can İzvermez / The Kai, İstanbul, Türkiye. İletişim: info@thekai.co",
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    content:
      "Platform kullanımı kapsamında aşağıdaki kişisel veriler işlenmektedir: (a) Kimlik Verileri: Ad, soyad, kullanıcı adı. (b) İletişim Verileri: E-posta adresi. (c) Ödeme Verileri: Abonelik ve fatura bilgileri (kart numarası gibi hassas ödeme bilgileri Paddle tarafından tutulur; The Kai bu verilere doğrudan erişemez). (d) Kullanım Verileri: Platform içi etkileşimler, ajan kullanım istatistikleri, oturum bilgileri, IP adresi. (e) İletişim Verileri: Destek talepleri ve e-posta yazışmaları.",
  },
  {
    title: "3. Kişisel Verilerin İşlenme Amaçları",
    content:
      "Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir: (a) Kai Agents platformu hizmetinin sunulması ve sürdürülmesi. (b) Abonelik ve ödeme süreçlerinin yönetilmesi. (c) Hesap güvenliği ve erişim kontrolünün sağlanması. (d) Kullanıcı desteği ve teknik yardım hizmetlerinin verilmesi. (e) Platform performansının ölçülmesi ve iyileştirilmesi. (f) Yasal yükümlülüklerin yerine getirilmesi. (g) Kullanıcının açık rızası ile pazarlama ve bilgilendirme iletişimi yapılması.",
  },
  {
    title: "4. Kişisel Verilerin Aktarıldığı Taraflar",
    content:
      "Kişisel verileriniz aşağıdaki üçüncü taraflarla, yalnızca belirtilen amaçlarla paylaşılmaktadır: (a) Paddle (paddle.com) — Ödeme işleme ve abonelik yönetimi. Paddle, PCI-DSS Level 1 uyumlu bir Kayıtlı Satıcı (Merchant of Record) olarak hareket eder. (b) Supabase — Veritabanı barındırma ve kimlik doğrulama altyapısı. (c) AI Model Sağlayıcıları (Anthropic/Claude, OpenAI/GPT ve benzerleri) — Yalnızca kullanıcının kendi görev içerikleri iletilir; başka kullanıcıların verileri aktarılmaz; AI sağlayıcıları bu veriler üzerinde eğitim yapmaz. (d) Analitik araçları — Anonim kullanım istatistikleri. Platform sahibinin (Kamer Can İzvermez) kişisel verileri hiçbir koşulda platform kullanıcılarıyla paylaşılmaz.",
  },
  {
    title: "5. Veri Saklama Süresi",
    content:
      "Kişisel verileriniz aşağıdaki sürelerle saklanır: (a) Aktif hesap verileri: Hesabınız aktif olduğu sürece. (b) Ödeme ve fatura kayıtları: Yasal yükümlülük gereği 10 yıl. (c) Destek yazışmaları: Son iletişimden itibaren 2 yıl. (d) Kullanım logları: 12 ay. Hesap silme talebinde, yasal saklama yükümlülüğü olmayan tüm veriler 30 gün içinde kalıcı olarak silinir.",
  },
  {
    title: "6. Kişisel Verilerin Korunmasına İlişkin Teknik Tedbirler",
    content:
      "Verilerinizin güvenliği için aşağıdaki teknik tedbirler uygulanmaktadır: (a) Tüm veri iletimi HTTPS/TLS şifrelemesi ile korunmaktadır. (b) Her kullanıcının verileri ayrı bir tenant yapısında izole edilmektedir. (c) Kullanıcı A, Kullanıcı B'nin verilerine erişemez. (d) Şifreler hiçbir zaman düz metin olarak saklanmaz, güçlü hash algoritmaları kullanılır. (e) Veritabanı erişimleri en az ayrıcalık ilkesine göre kısıtlanmıştır.",
  },
  {
    title: "7. İlgili Kişi Hakları",
    content:
      "KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz: (a) Kişisel verilerinizin işlenip işlenmediğini öğrenme hakkı. (b) İşlenmişse buna ilişkin bilgi talep etme hakkı. (c) İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme hakkı. (d) Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme hakkı. (e) Eksik veya yanlış işlenmişse düzeltilmesini isteme hakkı. (f) Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme hakkı. (g) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme hakkı. (h) Kanuna aykırı işleme sebebiyle zarara uğranması halinde zararın giderilmesini talep etme hakkı.",
  },
  {
    title: "8. Hakların Kullanımı",
    content:
      "Yukarıda sayılan haklarınızı kullanmak için info@thekai.co adresine yazılı başvuruda bulunabilirsiniz. Başvurunuz kimlik doğrulaması yapıldıktan sonra en geç 30 gün içinde yanıtlanır. Haklarınızı kullanmanız ücretsizdir; ancak talebin aşırı veya tekrarlı nitelik taşıması durumunda makul bir işlem ücreti talep edilebilir.",
    link: { href: "mailto:info@thekai.co", label: "info@thekai.co" },
  },
  {
    title: "9. Çerez Politikası",
    content:
      "Platform, temel işlevsellik için zorunlu çerezler kullanır. Bu çerezler: oturum yönetimi, tema tercihi (açık/koyu mod) ve güvenlik doğrulama amacıyla kullanılır. Analitik çerezler yalnızca anonim toplu verileri işler; bireysel kullanıcıyı tanımlamaz. Çerezleri tarayıcı ayarlarından yönetebilirsiniz; ancak zorunlu çerezlerin devre dışı bırakılması platform işlevselliğini etkileyebilir.",
  },
  {
    title: "10. Güncelleme",
    content:
      "Bu aydınlatma metni, yasal değişiklikler veya platform güncellemeleri doğrultusunda revize edilebilir. Önemli değişiklikler kayıtlı e-posta adresine bildirilir ve bu sayfada yayımlanır.",
  },
];

export default function KvkkPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            Yasal Belge
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-sm text-muted-foreground">
            Son güncelleme: 4 Nisan 2026
          </p>
          <p className="text-sm text-[#999999] mt-3 leading-relaxed">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin nasıl işlendiğine ilişkin bilgilendirme metnidir.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-white/5 pb-12 last:border-0">
              <h2 className="text-lg font-semibold text-foreground mb-3">
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

        {/* Footer note */}
        <div className="mt-16 p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
          <p className="text-xs text-[#666666] leading-relaxed">
            Kullanım koşullarımız için{" "}
            <a href="/kullanim-sartlari" className="text-[#D8FB32] hover:underline">
              Kullanım Şartları
            </a>{" "}
            sayfasını, gizlilik politikamız için{" "}
            <a href="/gizlilik" className="text-[#D8FB32] hover:underline">
              Gizlilik Politikası
            </a>{" "}
            sayfasını inceleyebilirsiniz. Kişisel Verileri Koruma Kurumu hakkında bilgi için:{" "}
            <a
              href="https://www.kvkk.gov.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8FB32] hover:underline"
            >
              kvkk.gov.tr
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
