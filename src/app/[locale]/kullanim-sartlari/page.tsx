import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları — The Kai",
  description:
    "Kai Agents platformu kullanım şartları. Hizmet kapsamı, ödeme koşulları, iptal politikası ve kullanıcı sorumlulukları.",
  alternates: {
    canonical: "/kullanim-sartlari",
    languages: {
      tr: "https://thekai.co/kullanim-sartlari",
      en: "https://thekai.co/en/kullanim-sartlari",
    },
  },
  openGraph: {
    title: "Kullanım Şartları — The Kai",
    description:
      "Kai Agents platformu kullanım şartları. Hizmet kapsamı, ödeme koşulları, iptal politikası ve kullanıcı sorumlulukları.",
    url: "https://thekai.co/kullanim-sartlari",
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
    title: "1. Platform Tanımı",
    content:
      "Kai Agents, The Kai tarafından sunulan bir yapay zeka ajan orkestrasyon platformudur. Platform; AI ajanlar, departman yönetimi, görev takibi, otomasyon iş akışları ve raporlama araçlarını kapsar. Hizmet, thekai.co alan adı üzerinden sunulmakta olup bu Kullanım Şartları tüm platform bileşenlerini kapsar.",
  },
  {
    title: "2. Hizmet Kapsamı",
    content:
      "Platform aşağıdaki hizmetleri sunar: (a) Konfigüre edilebilir AI ajan profilleri ve departman yapıları. (b) Görev atama, takip ve sonuç raporlama. (c) Çoklu AI model entegrasyonu (Claude, GPT ve benzeri sağlayıcılar). (d) Kullanıcıya özel otomasyon iş akışları ve şablonlar. (e) Analitik paneller ve performans raporları. Hizmet kapsamı abonelik planına göre farklılık gösterebilir. The Kai, önceden bildirmek kaydıyla hizmet kapsamını güncelleme hakkını saklı tutar.",
  },
  {
    title: "3. Kullanıcı Sorumlulukları",
    content:
      "Platform kullanıcıları aşağıdaki yükümlülükleri kabul eder: (a) Platforma erişim için sağlanan hesap bilgilerini gizli tutmak ve yetkisiz kullanımları derhal bildirmek. (b) Platformu yürürlükteki tüm yasal düzenlemelere uygun biçimde kullanmak. (c) Zararlı, yanıltıcı veya üçüncü taraf haklarını ihlal eden içerik üretmek amacıyla platformu kullanmamak. (d) Platform altyapısına zarar verebilecek ya da aşırı yük bindiren işlemlerden kaçınmak. (e) Platform üzerinden elde edilen AI çıktılarını, yayımlamadan önce kendi sorumluluğu çerçevesinde değerlendirmek.",
  },
  {
    title: "4. Ödeme Koşulları",
    content:
      "Tüm ödemeler Paddle altyapısı üzerinden gerçekleştirilir. Fiyatlar USD cinsindendir ve aylık ya da yıllık abonelik seçenekleri mevcuttur. Yıllık aboneliklerde iki aylık ücret tutarında indirim uygulanır. Abonelik ücreti seçilen plan döngüsüne (aylık/yıllık) göre otomatik olarak yenilenir. Paddle, PCI-DSS uyumlu bir ödeme altyapısı sağlayıcısıdır; kart bilgileriniz The Kai sistemlerinde saklanmaz. Fiyat değişikliği öncesinde kullanıcılar 30 gün önceden e-posta ile bilgilendirilir.",
  },
  {
    title: "5. İptal ve İade Politikası",
    content:
      "Kullanıcılar, aboneliklerini hesap paneli üzerinden istedikleri zaman iptal edebilir. İptal işlemi, mevcut ödeme döneminin sonunda geçerli olur; kalan süre için erişim devam eder. İlk abonelik başlangıcından itibaren 30 (otuz) gün içinde yapılan iptal taleplerinde tam iade sağlanır. Sonraki dönemler için iade yapılmaz. İade talepleri info@thekai.co adresine iletilmelidir. Paddle'ın kendi iade politikası saklıdır.",
  },
  {
    title: "6. Fikri Mülkiyet",
    content:
      "Kullanıcıların platform üzerinde oluşturduğu tüm içerikler (AI çıktıları, raporlar, iş akışları dahil) kullanıcıya aittir. The Kai, kullanıcı içerikleri üzerinde herhangi bir mülkiyet hakkı talep etmez. Platform yazılımı, tasarımı, logolar, ticari markalar ve Kai Agents sistem mimarisi The Kai'nin münhasır mülkiyetindedir. Platformun kaynak kodu veya iş mantığının izinsiz kopyalanması, tersine mühendisliğe tabi tutulması veya dağıtılması yasaktır.",
  },
  {
    title: "7. AI Çıktıları Hakkında Sorumluluk Reddi",
    content:
      "Platform üzerinden üretilen AI çıktıları tavsiye niteliğinde olup herhangi bir garanti içermez. Hukuki, mali, tıbbi veya benzeri profesyonel tavsiye olarak değerlendirilemez. The Kai, AI çıktılarının doğruluğu, güncelliği veya eksiksizliği konusunda açık ya da zımni herhangi bir garanti vermez. Kullanıcı, AI çıktılarını kendi değerlendirmesiyle kullanmakla yükümlüdür.",
  },
  {
    title: "8. Hesap Askıya Alma",
    content:
      "The Kai, aşağıdaki durumlarda kullanıcı hesabını önceden bildirmeksizin askıya alma veya sonlandırma hakkını saklı tutar: (a) Bu Kullanım Şartları'nın ihlali. (b) Yasa dışı, zararlı veya platform güvenliğini tehdit eden kullanım. (c) Ödeme yükümlülüklerinin yerine getirilmemesi. (d) Üçüncü tarafların haklarını ihlal eden içerik üretimi. Askıya alınan hesaplar için iade politikası, ihlal türüne göre The Kai'nin takdirine bırakılmıştır.",
  },
  {
    title: "9. Sorumluluk Sınırlaması",
    content:
      "The Kai'nin platform kullanımından kaynaklanan doğrudan, dolaylı, tesadüfi veya sonuç niteliğindeki zararlar için toplam sorumluluğu, zararın meydana geldiği ayda ödenen abonelik ücreti ile sınırlıdır. The Kai; üçüncü taraf hizmet kesintileri (Paddle, Supabase, AI model sağlayıcıları), mücbir sebep halleri veya kullanıcının yanlış kullanımından kaynaklanan zararlar için sorumluluk üstlenmez.",
  },
  {
    title: "10. Uyuşmazlık Çözümü",
    content:
      "Bu Kullanım Şartları Türk hukukuna tabidir. Taraflar arasında doğabilecek her türlü uyuşmazlıkta İstanbul Mahkemeleri ve İcra Daireleri münhasıran yetkilidir. Uyuşmazlıklar öncelikle info@thekai.co adresi üzerinden dostane yollarla çözülmeye çalışılır.",
  },
  {
    title: "11. Şartların Güncellenmesi",
    content:
      "The Kai, bu Kullanım Şartları'nı dilediği zaman güncelleme hakkını saklı tutar. Önemli değişiklikler, yürürlük tarihinden en az 15 gün önce kayıtlı e-posta adresine bildirilir. Değişiklikten sonra platforma erişmeye devam etmek, güncel şartların kabul edildiği anlamına gelir.",
  },
  {
    title: "12. İletişim",
    content:
      "Bu Kullanım Şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz.",
    link: { href: "mailto:info@thekai.co", label: "info@thekai.co" },
  },
];

export default function KullanimSartlariPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            Yasal Belge
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kullanım Şartları
          </h1>
          <p className="text-sm text-muted-foreground">
            Son güncelleme: 4 Nisan 2026
          </p>
          <p className="text-sm text-[#999999] mt-3 leading-relaxed">
            Bu sayfayı kullanarak veya Kai Agents platformuna abone olarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Lütfen dikkatlice okuyun.
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
            Bu belge, Kai Agents platformuna ilişkin tüm kullanım şartlarını kapsamaktadır.
            Gizlilik politikamız için{" "}
            <a href="/gizlilik" className="text-[#D8FB32] hover:underline">
              Gizlilik Politikası
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
