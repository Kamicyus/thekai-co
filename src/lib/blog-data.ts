export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  author: string;
  keywords: string[];
  content: BlogSection[];
}

export interface BlogSection {
  type: "h2" | "h3" | "p" | "ul" | "cta";
  text?: string;
  items?: string[];
  href?: string;
  label?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-ajan-sistemi-nedir",
    title: "AI Ajan Sistemi Nedir? İşletmeniz İçin Neden İhtiyacınız Var?",
    description:
      "AI ajan sistemi kavramını, tek ajan ile çoklu ajan mimarisi arasındaki farkları ve işletmeniz için neden bir AI ajan sistemine ihtiyaç duyduğunuzu gerçek örneklerle açıklıyoruz.",
    date: "2026-04-01",
    readingTime: "8 dk",
    author: "Kamer Can İzvermez",
    keywords: [
      "AI ajan sistemi nedir",
      "AI ajan sistemi kurulumu",
      "yapay zeka ajan Türkiye",
      "işletmeler için AI otomasyon",
      "çoklu ajan mimarisi",
      "AI orkestrasyon",
    ],
    content: [
      {
        type: "p",
        text: "2026 yılında yapay zeka artık sadece bir chatbot değil. Bir metne cevap yazmaktan çok daha fazlasını yapabilen, görevleri planlayan, kararlar alan, araçları kullanan ve birbirleriyle iletişim kuran AI sistemleri iş dünyasını dönüştürüyor. Bu sistemlerin adı: AI ajan sistemleri.",
      },
      {
        type: "h2",
        text: "AI Ajan Nedir?",
      },
      {
        type: "p",
        text: "Bir AI ajan, belirli bir görevi yerine getirmek üzere tasarlanmış, otonom çalışabilen yapay zeka bileşenidir. Geleneksel chatbot'lardan farkı şudur: bir chatbot sadece gelen mesaja yanıt üretir; bir ajan ise hedef doğrultusunda planlama yapar, araçlar kullanır (e-posta gönderir, dosya okur, API çağrısı yapar), hafızasını kullanır ve gerektiğinde diğer ajanlara iş delege eder.",
      },
      {
        type: "p",
        text: "Bir AI ajan, tek bir komutla birden fazla adımı sırayla yürütebilir. Örneğin \"bu müşteriyle ilgili son 5 e-postayı özetle ve takvime bir takip toplantısı ekle\" gibi bir talimat, doğru yapılandırılmış bir ajan için tek bir iş akışıdır.",
      },
      {
        type: "h2",
        text: "Tek Ajan mı, Çoklu Ajan mı?",
      },
      {
        type: "p",
        text: "Basit ihtiyaçlar için tek bir AI ajan yeterli olabilir. Ancak gerçek dünyada işler nadiren bu kadar basittir. Bir şirketin pazarlama, satış, müşteri hizmetleri, finans ve operasyon gibi farklı departmanları vardır. Her departmanın farklı araçlara, farklı bilgi tabanlarına ve farklı karar mekanizmalarına ihtiyacı vardır.",
      },
      {
        type: "p",
        text: "Çoklu ajan mimarisi (multi-agent architecture), her departman veya fonksiyon için uzmanlaşmış ajanlar oluşturup bunları bir orkestratör ajan aracılığıyla koordine etme yaklaşımıdır. Bu mimari, her ajanın kendi alanında derinleşmesini sağlarken, sistemin bütünlüklü çalışmasını garanti eder.",
      },
      {
        type: "h3",
        text: "Çoklu Ajan Mimarisinin Avantajları",
      },
      {
        type: "ul",
        items: [
          "Uzmanlık: Her ajan kendi alanında derinleşir, genel bir yapay zekadan çok daha isabetli sonuçlar üretir",
          "Ölçeklenebilirlik: Yeni bir departman veya ihtiyaç ortaya çıktığında sisteme yeni bir ajan eklemek yeterlidir",
          "Hata izolasyonu: Bir ajan hata yapsa bile diğer ajanlar etkilenmez",
          "Hafıza yönetimi: Her ajan sadece kendi alanıyla ilgili bilgileri taşır, context window verimli kullanılır",
          "Maliyet optimizasyonu: Basit görevler için küçük modeller, kritik kararlar için güçlü modeller kullanılabilir",
        ],
      },
      {
        type: "h2",
        text: "Orkestrasyon: Ajanları Kim Yönetir?",
      },
      {
        type: "p",
        text: "Çoklu ajan sistemlerinin kalbi orkestrasyon katmanıdır. Orkestratör ajan, gelen talepleri analiz eder, doğru ajana yönlendirir ve sonuçları kullanıcıya sunar. Bunu bir şirketin CEO'su gibi düşünebilirsiniz: her departmanın işini bilir, kimin ne yapacağını belirler ve büyük resmi görür.",
      },
      {
        type: "p",
        text: "İyi bir orkestrasyon sistemi anahtar kelime tetikleyicileri, bağlam analizi ve öncelik kuralları kullanarak talepleri yönlendirir. Belirsiz durumlarda ise kullanıcıya sormak yerine en olası ajana yönlendirip sonucu doğrular.",
      },
      {
        type: "h2",
        text: "Gerçek Dünya Örneği: The Kai'nin 72+ Ajan Sistemi",
      },
      {
        type: "p",
        text: "The Kai olarak, Claude Code tabanlı 72'den fazla AI ajan içeren bir sistem geliştirdik ve günlük operasyonlarımızda aktif olarak kullanıyoruz. Bu sistem 10 departmana yayılmış uzman ajanlardan oluşuyor:",
      },
      {
        type: "ul",
        items: [
          "Müzik Departmanı: Prodüksiyon, söz yazma, mix-master, dağıtım ajanları",
          "Pazarlama Departmanı: Sosyal medya, içerik üretimi, SEO ajanları",
          "Teknoloji Departmanı: Web geliştirme, bot kurulumu, otomasyon ajanları",
          "İstihbarat Departmanı: Trend analizi, rakip takibi, veri besleme ajanları",
          "Yaratıcı Departman: Görsel tasarım, video prodüksiyon, copywriting ajanları",
          "Destek Departmanı: Finans, hukuk, psikoloji danışmanlık ajanları",
        ],
      },
      {
        type: "p",
        text: "Her ajan kendi AGENT.md dosyasıyla tanımlanmış, kendi hafıza sistemine sahip ve MCP (Model Context Protocol) entegrasyonlarıyla Gmail, Google Calendar, Canva gibi gerçek araçlara bağlı. Sistem, tek bir konuşma noktasından (orkestratör) yönetiliyor — kullanıcı ne istediğini söylüyor, orkestratör doğru ajana yönlendiriyor.",
      },
      {
        type: "h2",
        text: "Kimler AI Ajan Sistemi Kullanmalı?",
      },
      {
        type: "p",
        text: "AI ajan sistemleri her ölçekten işletmeye fayda sağlayabilir. Ancak özellikle şu profillerdeki işletmeler için çarpıcı sonuçlar üretiyor:",
      },
      {
        type: "ul",
        items: [
          "Tekrarlayan görevlere fazla zaman harcayan küçük ekipler",
          "Birden fazla dijital platformda varlık gösteren markalar",
          "İçerik üretimi sürecini hızlandırmak isteyen yaratıcı ajanslar",
          "Müşteri iletişimini otomatize etmek isteyen e-ticaret şirketleri",
          "Tek kişilik veya küçük ekipli girişimler (solopreneur/freelancer)",
          "Dijital dönüşüm sürecindeki orta ve büyük ölçekli şirketler",
        ],
      },
      {
        type: "h2",
        text: "AI Ajan Sistemi Nasıl Kurulur?",
      },
      {
        type: "p",
        text: "Bir AI ajan sistemi kurmak, bir chatbot açmaktan farklı bir süreçtir. Doğru yapılandırma için şu adımlar izlenir:",
      },
      {
        type: "h3",
        text: "1. İhtiyaç Analizi",
      },
      {
        type: "p",
        text: "Önce işletmenizin hangi süreçlerinde yapay zeka desteğine ihtiyacı olduğu belirlenir. Hangi görevler tekrarlayan? Hangi kararlar veri odaklı alınabilir? Hangi iletişim kanalları otomatize edilebilir?",
      },
      {
        type: "h3",
        text: "2. Ajan Tasarımı",
      },
      {
        type: "p",
        text: "Her ajan için görev tanımı, yetkinlik alanı, kullanacağı araçlar ve hafıza yapısı belirlenir. Bu aşamada AGENT.md dosyaları oluşturulur — her ajan için bir kimlik belgesi gibi düşünebilirsiniz.",
      },
      {
        type: "h3",
        text: "3. Orkestrasyon Kurulumu",
      },
      {
        type: "p",
        text: "Ajanlar arası yönlendirme kuralları, öncelik sıralamaları ve tetikleyiciler tanımlanır. CLAUDE.md dosyası, orkestratörün beyni gibi çalışır.",
      },
      {
        type: "h3",
        text: "4. Entegrasyon",
      },
      {
        type: "p",
        text: "Ajanlar, işletmenizin mevcut araçlarına bağlanır: Gmail, Google Calendar, Slack, Telegram, CRM sistemleri, e-ticaret platformları ve daha fazlası. MCP (Model Context Protocol) bu entegrasyonları standart bir şekilde sağlar.",
      },
      {
        type: "h3",
        text: "5. Test ve İterasyon",
      },
      {
        type: "p",
        text: "Sistem gerçek senaryolarla test edilir, hafıza dosyaları beslenir ve ajan davranışları ince ayarlanır. Bu süreç süreklidir — sistem kullandıkça öğrenir ve gelişir.",
      },
      {
        type: "h2",
        text: "Türkiye'de AI Ajan Sistemleri",
      },
      {
        type: "p",
        text: "Türkiye'de AI ajan sistemi kurulumu henüz erken aşamada. Çoğu şirket hâlâ temel chatbot çözümlerinde takılı kalıyor. Bu, erken hareket eden işletmeler için büyük bir rekabet avantajı anlamına geliyor. The Kai olarak, Türkiye'deki ilk kapsamlı AI ajan sistemi kurulum hizmetini sunuyoruz — 72+ ajan deneyimimizle.",
      },
      {
        type: "p",
        text: "İşletmenizin AI dönüşümünü başlatmak, tekrarlayan görevleri otomatize etmek ve ekibinizi güçlendirmek istiyorsanız, size özel bir ajan mimarisi tasarlayabiliriz.",
      },
      {
        type: "cta",
        label: "AI Ajan Sisteminizi Kuralım",
        href: "/iletisim",
      },
    ],
  },
  {
    slug: "yapay-zeka-ile-muzik-yapmak",
    title:
      "2026'da Yapay Zeka ile Müzik Yapmak: Araçlar, Teknikler ve Gerçekler",
    description:
      "Suno, ElevenLabs, RVC ve Logic Pro ile AI destekli müzik üretim sürecini, Echo Bazaar'ın 20M+ dinlenme deneyimini ve telif haklarını gerçeklerle anlatıyoruz.",
    date: "2026-04-01",
    readingTime: "9 dk",
    author: "Kamer Can İzvermez",
    keywords: [
      "yapay zeka ile müzik yapma",
      "AI müzik prodüksiyon",
      "Suno müzik",
      "AI müzik araçları",
      "yapay zeka müzik üretimi 2026",
      "AI müzik telif",
    ],
    content: [
      {
        type: "p",
        text: "Yapay zeka ile müzik üretimi 2024'te deneysel bir merak konusuydu, 2025'te ciddi bir üretim aracına dönüştü, 2026'da ise endüstrinin ayrılmaz bir parçası haline geldi. Peki gerçekte neler mümkün, sınırlar nerede ve bu araçlarla nasıl profesyonel sonuçlar elde ediliyor? Echo Bazaar kanalında 20 milyondan fazla dinlenme elde etmiş bir ekip olarak, deneyimlerimizi paylaşıyoruz.",
      },
      {
        type: "h2",
        text: "2026'nın AI Müzik Araçları",
      },
      {
        type: "p",
        text: "AI müzik üretim ekosistemi hızla büyüyor. Her aracın kendine özgü güçlü yanları ve sınırlamaları var. İşte günlük üretimde aktif olarak kullandığımız araçlar:",
      },
      {
        type: "h3",
        text: "Suno",
      },
      {
        type: "p",
        text: "Suno, metin tabanlı müzik üretiminin lider platformu. Bir prompt yazıyorsunuz — söz, tarz, tempo bilgisi veriyorsunuz — ve dakikalar içinde tam bir şarkı üretiyor. Güçlü yanı, farklı türlerde tutarlı ve dinlenebilir çıktılar üretebilmesi. Sınırlaması ise mix kalitesinin henüz profesyonel stüdyo seviyesinde olmaması. Echo Bazaar'daki içeriklerin büyük çoğunluğu Suno tabanlı üretimlerle başlıyor, ardından post-prodüksiyon sürecinden geçiyor.",
      },
      {
        type: "h3",
        text: "ElevenLabs",
      },
      {
        type: "p",
        text: "ElevenLabs, ses klonlama ve text-to-speech alanında sektör lideri. Müzik prodüksiyonda vokal üretimi, ses değiştirme ve seslendirme için kullanıyoruz. Özellikle sesli kitap prodüksiyonunda da kritik bir araç. Türkçe dahil birçok dilde doğal ses üretebiliyor.",
      },
      {
        type: "h3",
        text: "RVC (Retrieval-based Voice Conversion)",
      },
      {
        type: "p",
        text: "RVC, mevcut bir vokal performansını başka bir ses karakterine dönüştüren açık kaynak bir araç. AI müzik topluluğunda \"AI cover\" olarak bilinen içeriklerin temelini oluşturuyor. Bir şarkıyı farklı bir sanatçının ses karakteriyle yeniden yorumlayabiliyorsunuz. Kalitesi eğitim verisine ve model ayarlarına doğrudan bağlı.",
      },
      {
        type: "h3",
        text: "Logic Pro ve Geleneksel DAW'lar",
      },
      {
        type: "p",
        text: "AI araçları tek başına yeterli değil. Profesyonel sonuçlar için geleneksel DAW'lar (Digital Audio Workstation) hâlâ vazgeçilmez. Logic Pro, Ableton Live veya FL Studio ile AI üretimlerini düzenliyor, mix yapıyor ve mastering uyguluyoruz. AI ham malzemeyi üretiyor, insan dokunuşu onu profesyonel hale getiriyor.",
      },
      {
        type: "h2",
        text: "Hibrit Üretim: AI + İnsan Dokunuşu",
      },
      {
        type: "p",
        text: "En iyi sonuçlar, AI'ı bir araç olarak kullanıp insan yaratıcılığıyla birleştirdiğinizde ortaya çıkıyor. Biz buna \"hibrit üretim\" diyoruz ve Echo Bazaar'daki tüm içerikleri bu yaklaşımla üretiyoruz.",
      },
      {
        type: "p",
        text: "Tipik bir hibrit üretim süreci şöyle işliyor:",
      },
      {
        type: "ul",
        items: [
          "Konsept ve söz yazımı: İnsan yaratıcılığı ile başlıyoruz. Tema, hikaye, duygusal ton belirleniyor",
          "AI üretimi: Suno veya benzeri araçlarla ham müzik üretiliyor. Birden fazla versiyon deneniyor",
          "Seçim ve düzenleme: En iyi versiyonlar seçilip DAW'a aktarılıyor. Yapı, arrangement düzenleniyor",
          "Vokal işleme: Gerekiyorsa RVC veya ElevenLabs ile vokal dönüşümü yapılıyor",
          "Mix ve master: Logic Pro'da profesyonel mix ve mastering uygulanıyor",
          "Görsel prodüksiyon: Kapak tasarımı, thumbnail ve video içeriği hazırlanıyor",
          "Dağıtım: Spotify, Apple Music, YouTube ve diğer platformlara dağıtılıyor",
        ],
      },
      {
        type: "h2",
        text: "Echo Bazaar Deneyimi: 20M+ Dinlenme Nasıl Oldu?",
      },
      {
        type: "p",
        text: "Echo Bazaar, AI müzik içeriği üreten bir YouTube kanalı olarak başladı ve bugün 20 milyonun üzerinde toplam dinlenmeye ulaştı. Bu başarının arkasında birkaç temel strateji var:",
      },
      {
        type: "ul",
        items: [
          "Niş odak: Belirli müzik türlerinde (Ortadoğu melodileri, Türk hip-hop, lo-fi) uzmanlaştık",
          "Tutarlılık: Düzenli yayın takvimi ve tutarlı kalite standardı",
          "Thumbnail ve başlık optimizasyonu: Her video için A/B testleri yaparak CTR'ı sürekli iyileştirdik",
          "Topluluk: Dinleyici geri bildirimleri doğrudan üretim sürecine yansıdı",
          "Hibrit yaklaşım: Tamamen AI'a bırakmadık, her adımda insan kontrolü ve yaratıcılığı devam etti",
        ],
      },
      {
        type: "h2",
        text: "Telif Hakları ve Hukuki Durum",
      },
      {
        type: "p",
        text: "AI ile üretilen müziğin telif hakları, 2026 itibarıyla hâlâ netleşme sürecinde olan bir alan. Genel çerçeveyi şöyle özetleyebiliriz:",
      },
      {
        type: "ul",
        items: [
          "Suno gibi platformlarda ticari lisansla üretilen içerikler, platformun kullanım şartlarına göre ticari olarak kullanılabiliyor",
          "Tamamen AI tarafından üretilmiş bir eserin telif hakkı birçok ülkede henüz netleşmemiş durumda",
          "İnsan müdahalesi içeren hibrit üretimler, geleneksel telif korumasına daha yakın bir konumda",
          "Her platformun (Spotify, Apple Music, YouTube) AI içerikle ilgili kendi politikaları var ve bunlar sık güncelleniyor",
          "Mevcut bir sanatçının sesini izinsiz kullanmak (deepfake) hukuki risk taşıyor",
        ],
      },
      {
        type: "p",
        text: "Bizim tavsiyemiz: AI müzik üretirken her zaman orijinal içerik oluşturmaya odaklanın, platform kurallarını düzenli takip edin ve ticari kullanım öncesi lisans koşullarını mutlaka kontrol edin.",
      },
      {
        type: "h2",
        text: "AI Müzik Üretiminin Geleceği",
      },
      {
        type: "p",
        text: "2026 sonrası AI müzik araçlarının kalitesi artmaya, maliyetleri düşmeye devam edecek. Stem ayrıştırma (vokal, enstrüman ayrımı), gerçek zamanlı üretim ve kişiselleştirilmiş müzik deneyimleri gibi alanlar hızla gelişiyor. Ancak müziğin özü — duygu, hikaye, insani bağlantı — hâlâ insan yaratıcılığına dayanıyor.",
      },
      {
        type: "p",
        text: "AI, müzik üretimini demokratikleştiriyor. Daha önce bir stüdyo, enstrüman bilgisi ve binlerce dolarlık ekipman gerektiren süreçler, şimdi bir bilgisayar ve doğru araçlarla mümkün hale geliyor. Bu, tehdit değil fırsat — ve bu fırsatı en iyi değerlendiren, AI'ı bir araç olarak kullanıp yaratıcılığını katanlar olacak.",
      },
      {
        type: "p",
        text: "AI destekli müzik prodüksiyon sürecinizi başlatmak veya mevcut üretiminizi AI ile güçlendirmek istiyorsanız, deneyimlerimizi sizinle paylaşmak isteriz.",
      },
      {
        type: "cta",
        label: "Müzik Prodüksiyon Hizmetimizi İnceleyin",
        href: "/hizmetler#muzik-produksiyon",
      },
    ],
  },
  {
    slug: "claude-code-rehber",
    title: "Claude Code ile Neler Yapabilirsiniz? Kapsamlı Rehber",
    description:
      "Claude Code nedir, nasıl kullanılır, MCP entegrasyonu, skill sistemi, hook'lar ve ajan oluşturma rehberi. Gerçek kullanım senaryoları ve The Kai deneyimi.",
    date: "2026-04-01",
    readingTime: "12 dk",
    author: "Kamer Can İzvermez",
    keywords: [
      "Claude Code nedir",
      "Claude Code nasıl kullanılır",
      "Claude Code rehber",
      "MCP nedir",
      "Claude Code ajan",
      "Claude Code Türkçe",
    ],
    content: [
      {
        type: "p",
        text: "Claude Code, Anthropic'in geliştirdiği CLI (komut satırı arayüzü) tabanlı bir AI geliştirme aracıdır. Terminalde çalışır, dosyalarınızı okuyabilir ve düzenleyebilir, shell komutları çalıştırabilir, Git işlemleri yapabilir ve MCP sunucuları aracılığıyla dış araçlara bağlanabilir. 2026 itibarıyla, yazılım geliştirme ve AI otomasyon dünyasında en güçlü araçlardan biri haline geldi.",
      },
      {
        type: "h2",
        text: "Claude Code Nedir?",
      },
      {
        type: "p",
        text: "Claude Code, geleneksel bir chatbot değildir. Bilgisayarınızda, projenizin içinde çalışan bir AI asistanıdır. Dosyalarınızı okuyabilir, yeni dosyalar oluşturabilir, kod yazabilir, mevcut kodu düzenleyebilir, terminal komutları çalıştırabilir ve projenizin tamamını anlayabilir. Bu onu, bir chatbot'tan çok bir \"AI takım arkadaşı\" yapıyor.",
      },
      {
        type: "p",
        text: "Claude Code'un temel yetenekleri şunlardır:",
      },
      {
        type: "ul",
        items: [
          "Dosya okuma ve yazma (Read, Write, Edit araçları)",
          "Shell komutu çalıştırma (Bash aracı)",
          "Dosya arama ve içerik arama (Glob, Grep araçları)",
          "Git entegrasyonu (commit, PR oluşturma, branch yönetimi)",
          "MCP sunucularına bağlanma (Gmail, Calendar, Canva ve daha fazlası)",
          "Sub-agent başlatma (arka planda görevler çalıştırma)",
          "1 milyona kadar token context window (büyük projeleri anlama kapasitesi)",
        ],
      },
      {
        type: "h2",
        text: "CLAUDE.md: Projenizin Beyni",
      },
      {
        type: "p",
        text: "Claude Code'un en güçlü özelliklerinden biri CLAUDE.md dosyasıdır. Bu dosya, projenizin kök dizinine yerleştirilen bir konfigürasyon ve talimat dosyasıdır. Claude Code her oturum başında bu dosyayı okur ve içindeki talimatlara göre davranır.",
      },
      {
        type: "p",
        text: "CLAUDE.md dosyasında şunları tanımlayabilirsiniz:",
      },
      {
        type: "ul",
        items: [
          "Projenin genel açıklaması ve amacı",
          "Kullanılan teknolojiler ve mimari kararlar",
          "Kodlama standartları ve stil kuralları",
          "Dosya yapısı ve klasör açıklamaları",
          "Test ve deployment süreçleri",
          "Ajan tanımları ve yönlendirme kuralları",
          "İletişim dili ve ton tercihleri",
        ],
      },
      {
        type: "p",
        text: "Biz The Kai olarak, CLAUDE.md dosyamızda 72'den fazla ajanın yönlendirme kurallarını, departman yapısını, hafıza protokollerini ve iletişim standartlarını tanımlıyoruz. Bu dosya, tüm sistemimizin orkestrasyon merkezidir.",
      },
      {
        type: "h2",
        text: "MCP (Model Context Protocol) Nedir?",
      },
      {
        type: "p",
        text: "MCP, Claude Code'un dış dünyayla iletişim kurmasını sağlayan standart bir protokoldür. Bir MCP sunucusu, belirli bir servise (Gmail, Google Calendar, Slack, Canva vb.) bağlantı sağlar ve Claude Code'a bu servislerin araçlarını kullanma yeteneği kazandırır.",
      },
      {
        type: "p",
        text: "Örneğin Gmail MCP sunucusu kurduğunuzda, Claude Code doğrudan e-postalarınızı okuyabilir, taslak oluşturabilir ve gönderim yapabilir. Google Calendar MCP'si ile takvim etkinliklerinizi görebilir, yeni etkinlikler oluşturabilir. Canva MCP'si ile tasarım oluşturabilir.",
      },
      {
        type: "h3",
        text: "Yaygın MCP Entegrasyonları",
      },
      {
        type: "ul",
        items: [
          "Gmail MCP: E-posta okuma, taslak yazma, gönderim",
          "Google Calendar MCP: Takvim yönetimi, etkinlik oluşturma",
          "Canva MCP: Tasarım oluşturma ve düzenleme",
          "YouTube Transcript MCP: Video transkriptleri çekme",
          "Context7 MCP: Güncel kütüphane ve framework dokümantasyonu",
          "PubMed MCP: Akademik makale araştırma",
          "Slack / Discord MCP: Mesajlaşma platformu entegrasyonu",
        ],
      },
      {
        type: "h2",
        text: "Skill Sistemi",
      },
      {
        type: "p",
        text: "Claude Code'un skill sistemi, tekrar eden görevleri paketlenmiş komutlar haline getirmenizi sağlar. Bir skill, belirli bir görev için optimize edilmiş talimatlar ve iş akışları içerir. Slash command (/komut) formatıyla çağrılır.",
      },
      {
        type: "p",
        text: "Örneğin bir \"deploy\" skill'i oluşturabilirsiniz: /deploy komutu çalıştığında, otomatik olarak testleri çalıştırır, build alır, Vercel'e deploy eder ve sonucu raporlar. Ya da bir \"blog-yaz\" skill'i oluşturup, SEO optimizasyonlu blog yazısı üretim sürecini otomatize edebilirsiniz.",
      },
      {
        type: "p",
        text: "Bizim sistemimizde 50'den fazla aktif skill var — sesli kitap üretiminden tweet işlemeye, günlük rapor oluşturmadan müzik prodüksiyona kadar her alan için özelleştirilmiş skill'ler kullanıyoruz.",
      },
      {
        type: "h2",
        text: "Hook Sistemi",
      },
      {
        type: "p",
        text: "Hook'lar, Claude Code'un yaşam döngüsünün belirli anlarında otomatik olarak çalışan script'lerdir. Üç temel hook türü vardır:",
      },
      {
        type: "ul",
        items: [
          "PreCompact: Context sıkıştırma başlamadan önce çalışır. Mevcut durumu kaydetmek için kullanılır",
          "Stop: Claude her yanıt sonrası çalışır. Bildirim göndermek veya log tutmak için idealdir",
          "SessionStart: Yeni oturum başladığında çalışır. Ortam hazırlığı ve durum kontrolü için kullanılır",
        ],
      },
      {
        type: "p",
        text: "Hook'lar, ~/.claude/settings.json dosyasında tanımlanır. Örneğin, her görev tamamlandığında Telegram üzerinden bildirim gönderen bir Stop hook'u oluşturabilirsiniz.",
      },
      {
        type: "h2",
        text: "AI Ajan Oluşturma",
      },
      {
        type: "p",
        text: "Claude Code ile AI ajan oluşturmak, bir AGENT.md dosyası yazmakla başlar. Bu dosyada ajanın kim olduğu, ne yaptığı, hangi araçlara erişebildiği ve nasıl iletişim kurduğu tanımlanır. Ardından orkestratör CLAUDE.md dosyasında bu ajanın tetikleyicileri belirlenir.",
      },
      {
        type: "p",
        text: "Bir ajan tanımı tipik olarak şu bileşenleri içerir:",
      },
      {
        type: "ul",
        items: [
          "Kimlik: Ajanın adı, departmanı ve görevi",
          "Yetkinlikler: Ne yapabilir, ne yapamaz",
          "Araçlar: Hangi MCP sunucularına ve dosyalara erişebilir",
          "Hafıza: Hangi bilgi dosyalarını okur ve yazar",
          "İletişim: Hangi dilde, hangi tonda, hangi formatta çıktı üretir",
          "Tetikleyiciler: Hangi anahtar kelimeler bu ajanı aktive eder",
        ],
      },
      {
        type: "h2",
        text: "Gerçek Kullanım Senaryoları",
      },
      {
        type: "p",
        text: "Claude Code'u günlük hayatta nasıl kullanıyoruz? İşte The Kai'nin gerçek kullanım senaryolarından bazıları:",
      },
      {
        type: "h3",
        text: "Web Sitesi Geliştirme",
      },
      {
        type: "p",
        text: "Bu web sitesi (thekai.co) tamamen Claude Code ile geliştirildi. Next.js, Tailwind CSS ve Framer Motion stack'i kullanıyoruz. Yeni sayfa ekleme, SEO optimizasyonu, blog yazısı oluşturma gibi tüm işlemler Claude Code üzerinden yapılıyor. Tek bir komutla yeni bir hizmet sayfası ekleyebilir, sitemap'i güncelleyebilir ve Vercel'e deploy edebiliyoruz.",
      },
      {
        type: "h3",
        text: "Telegram Bot Geliştirme",
      },
      {
        type: "p",
        text: "Claude Code ile always-on Telegram botları geliştiriyoruz. Ses kaydı alma, transkript çıkarma, AI destekli yanıt üretme, dosya işleme gibi gelişmiş özellikler içeren botlar dakikalar içinde kurulabiliyor. Systemd servis yönetimi ile kesintisiz çalışma sağlanıyor.",
      },
      {
        type: "h3",
        text: "İçerik Üretim Otomasyonu",
      },
      {
        type: "p",
        text: "Sosyal medya içerikleri, blog yazıları, e-posta taslakları ve raporlar Claude Code ile üretiliyor. Her platform için özelleştirilmiş içerik ajanları var — Twitter ajanı tweet formatında, LinkedIn ajanı profesyonel tonda, Instagram ajanı görsel odaklı içerik üretiyor.",
      },
      {
        type: "h3",
        text: "Müzik Prodüksiyon Desteği",
      },
      {
        type: "p",
        text: "Söz yazma, BPM hesaplama, ton analizi, şarkı künye oluşturma, Spotify dağıtım yönetimi gibi müzik prodüksiyon süreçlerinde Claude Code aktif olarak kullanılıyor. Suno prompt'larının optimize edilmesi bile Claude Code ajanları tarafından yapılıyor.",
      },
      {
        type: "h2",
        text: "Claude Code ile Başlamak",
      },
      {
        type: "p",
        text: "Claude Code'u kullanmaya başlamak için Anthropic hesabı ve terminal erişimi yeterli. Ancak gerçek gücünü ortaya çıkarmak için doğru yapılandırma, CLAUDE.md dosyası oluşturma, MCP entegrasyonları kurma ve ajan mimarisi tasarlama gerekiyor.",
      },
      {
        type: "p",
        text: "Eğer Claude Code ile kendi AI ajan sisteminizi kurmak istiyorsanız — ister kişisel kullanım, ister işletmeniz için — bu süreci sizin yerinize planlayıp hayata geçirebiliriz.",
      },
      {
        type: "cta",
        label: "AI Ajan Sistemi Hizmetimizi İnceleyin",
        href: "/hizmetler#ai-ajan-sistemi",
      },
    ],
  },
  {
    slug: "ai-sesli-kitap",
    title:
      "AI Sesli Kitap: Klasik Edebiyatı Yapay Zeka ile Yeniden Canlandırmak",
    description:
      "Yapay zeka seslendirme teknolojisiyle sesli kitap üretimi, ElevenLabs TTS, maliyet analizi ve Spotify sesli kitap pazarı hakkında kapsamlı rehber.",
    date: "2026-04-01",
    readingTime: "7 dk",
    author: "Kamer Can İzvermez",
    keywords: [
      "AI sesli kitap",
      "yapay zeka seslendirme",
      "ElevenLabs TTS",
      "sesli kitap üretimi",
      "sesli kitap Spotify",
      "AI audiobook",
    ],
    content: [
      {
        type: "p",
        text: "Sesli kitap pazarı dünya genelinde hızla büyüyor. Spotify'ın sesli kitap entegrasyonu, Audible'ın genişleyen kütüphanesi ve yeni platformların ortaya çıkması, bu alanda büyük fırsatlar yaratıyor. Ancak geleneksel sesli kitap üretimi pahalı ve yavaş bir süreç. İşte tam bu noktada yapay zeka seslendirme teknolojisi devreye giriyor.",
      },
      {
        type: "h2",
        text: "Murmur: AI Sesli Kitap Yayınevi",
      },
      {
        type: "p",
        text: "Murmur, The Kai bünyesinde kurulan AI sesli kitap yayınevimizdir. Amacımız, klasik ve modern Türk edebiyatını yapay zeka seslendirmesiyle sesli kitaba dönüştürmek ve dijital platformlarda yayınlamak. Telif süresi dolmuş klasik eserlerden başlayıp, izinli modern eserlere doğru genişleme stratejisi izliyoruz.",
      },
      {
        type: "p",
        text: "Neden \"Murmur\"? Fısıltı, mırıltı anlamına gelen bu kelime, edebiyatın sessiz harflerini sese dönüştürme misyonumuzu yansıtıyor. Kitaplar artık sadece okunan değil, dinlenen eserler.",
      },
      {
        type: "h2",
        text: "ElevenLabs TTS: Teknolojinin Kalbi",
      },
      {
        type: "p",
        text: "ElevenLabs'in text-to-speech teknolojisi, AI sesli kitap üretiminin temelini oluşturuyor. Geleneksel TTS sistemlerinden farklı olarak, ElevenLabs doğal intonasyon, duygusal ifade ve tutarlı ses karakteri sunuyor. 2026 itibarıyla Türkçe desteği de oldukça gelişmiş durumda.",
      },
      {
        type: "h3",
        text: "ElevenLabs'in Güçlü Yanları",
      },
      {
        type: "ul",
        items: [
          "Doğal ses kalitesi: Robotik hissettirmeyen, neredeyse insan sesine yakın çıktılar",
          "Ses klonlama: Belirli bir ses karakterini klonlayıp tutarlı seslendirme yapabilme",
          "Çoklu dil desteği: Türkçe dahil 30'dan fazla dilde seslendirme",
          "Duygusal ton kontrolü: Üzgün, heyecanlı, sakin gibi farklı tonlarda seslendirme",
          "API erişimi: Otomasyon pipeline'larına entegrasyon imkanı",
        ],
      },
      {
        type: "h2",
        text: "Sesli Kitap Üretim Süreci",
      },
      {
        type: "p",
        text: "Bir kitabı sesli kitaba dönüştürmek, sadece metni TTS motoruna vermekten ibaret değil. Kaliteli bir sesli kitap üretimi için sistematik bir süreç izliyoruz:",
      },
      {
        type: "h3",
        text: "1. Metin Hazırlığı",
      },
      {
        type: "p",
        text: "Kaynak metin dijitalleştirilir, OCR hataları düzeltilir, noktalama işaretleri kontrol edilir. Bölüm yapısı belirlenir. Diyalog, anlatıcı ve iç monolog bölümleri işaretlenir.",
      },
      {
        type: "h3",
        text: "2. Ses Seçimi ve Tasarımı",
      },
      {
        type: "p",
        text: "Kitabın karakterine uygun ses seçilir. Anlatıcı sesi, diyalog karakterleri ve genel ton belirlenir. ElevenLabs'in ses kütüphanesinden seçim yapılır veya özel ses klonlama uygulanır.",
      },
      {
        type: "h3",
        text: "3. Bölüm Bölüm Seslendirme",
      },
      {
        type: "p",
        text: "Her bölüm ayrı ayrı seslendirilir, kalite kontrolden geçirilir. Telaffuz hataları, ritim bozuklukları ve doğal olmayan geçişler düzeltilir. Bu aşamada insan kulağıyla denetim kritik önem taşıyor.",
      },
      {
        type: "h3",
        text: "4. Post-Prodüksiyon",
      },
      {
        type: "p",
        text: "Ses dosyaları düzenlenir, sessizlik süreleri ayarlanır, bölüm geçişleri eklenir. Gerekirse arka plan müziği veya ses efektleri entegre edilir. Final mastering uygulanır.",
      },
      {
        type: "h3",
        text: "5. Dağıtım",
      },
      {
        type: "p",
        text: "Tamamlanan sesli kitap Spotify, Apple Books, Google Play Books ve diğer platformlara dağıtılır. Kapak tasarımı, metadata ve kategori bilgileri hazırlanır.",
      },
      {
        type: "h2",
        text: "Maliyet Analizi: Geleneksel vs AI",
      },
      {
        type: "p",
        text: "Geleneksel sesli kitap üretiminde profesyonel bir seslendirme sanatçısı, stüdyo kirası, ses mühendisi ve post-prodüksiyon ekibi gerekiyor. 10 saatlik bir kitap için toplam maliyet kolayca 30.000-100.000 TL arasına çıkabiliyor. Üretim süresi ise haftalar alabiliyor.",
      },
      {
        type: "p",
        text: "AI seslendirme ile aynı kitap, ElevenLabs API maliyeti olarak birkaç bin TL'ye ve birkaç güne indirgenebiliyor. Bu, özellikle küçük yayınevleri ve bağımsız yazarlar için devrim niteliğinde bir fark. Tabii ki kalite kontrolü ve post-prodüksiyon sürecine yatırım yapmak hâlâ gerekiyor — ancak toplam maliyet geleneksel yöntemin çok altında kalıyor.",
      },
      {
        type: "h2",
        text: "Spotify Sesli Kitap Pazarı",
      },
      {
        type: "p",
        text: "Spotify'ın sesli kitap pazarına girişi, bu alanı tamamen değiştirdi. Premium abonelere aylık sesli kitap dinleme hakkı sunulması, sesli kitap tüketimini demokratikleştirdi. Türkiye'de sesli kitap pazarı henüz gelişme aşamasında — bu, erken giren üreticiler için büyük bir fırsat penceresi açıyor.",
      },
      {
        type: "p",
        text: "Murmur olarak hedefimiz, Türk edebiyatının klasiklerini (Sabahattin Ali, Ömer Seyfettin, Reşat Nuri Güntekin gibi telif süresi dolmuş eserleri) sesli kitaba dönüştürüp bu büyüyen pazarda yer almak. İlk eserimiz olan \"Kürk Mantolu Madonna\" prodüksiyon aşamasında.",
      },
      {
        type: "h2",
        text: "Nasıl Başlanır?",
      },
      {
        type: "p",
        text: "Sesli kitap üretim sürecinizi başlatmak istiyorsanız — ister bir yayınevi olun, ister bağımsız bir yazar, ister içerik üreticisi — Murmur'un altyapısını ve deneyimimizi sizinle paylaşabiliriz. Tek bölümden başlayıp tam kitap prodüksiyonuna kadar ölçeklenen paketlerimiz mevcut.",
      },
      {
        type: "cta",
        label: "Sesli Kitap Prodüksiyon Hizmetimizi İnceleyin",
        href: "/hizmetler#sesli-kitap",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
