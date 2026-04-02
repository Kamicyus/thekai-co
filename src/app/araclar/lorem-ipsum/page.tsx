"use client";

import { useState, useCallback } from "react";

type Mode = "paragraf" | "cumle" | "kelime";

const LATIN_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
  "quas", "molestias", "excepturi", "obcaecati", "cupiditate", "provident",
  "similique", "mollitia", "animi", "perspiciatis", "unde", "omnis", "iste",
  "natus", "error", "voluptatem", "accusantium", "doloremque", "laudantium",
  "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore",
  "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo",
];

const TURKISH_WORDS = [
  "merhaba", "dunya", "guzel", "hayat", "zaman", "insan", "yol", "gece", "gun",
  "sehir", "deniz", "dag", "orman", "gokyuzu", "yildiz", "ay", "gunes", "bulut",
  "ruzgar", "yagmur", "toprak", "nehir", "cicek", "agac", "kus", "balik",
  "kitap", "muzik", "sanat", "renk", "isik", "karanlk", "sessizlik", "huzur",
  "umut", "sevgi", "dostluk", "mutluluk", "ozgurluk", "baris", "dusunce",
  "hayal", "gercek", "gelecek", "gecmis", "simdi", "burada", "orada", "beraber",
  "yalniz", "buyuk", "kucuk", "eski", "yeni", "sicak", "soguk", "uzun", "kisa",
  "derin", "yuksek", "yavas", "hizli", "sessiz", "gurultulu", "guzel", "cirkin",
  "kolay", "zor", "acik", "kapali", "bos", "dolu", "hafif", "agir", "yumusak",
  "sert", "tatli", "aci", "taze", "bayat", "temiz", "kirli", "zengin", "fakir",
  "guclu", "zayif", "akilli", "aptal", "cesur", "korkak", "sabir", "ozen",
  "emek", "basari", "bilgi", "tecrube", "anlam", "deger", "hikaye", "macera",
];

const FIRST_SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const TURKISH_FIRST = "Merhaba dunya, guzel bir gun basladi ve hayat devam ediyor.";

export default function LoremIpsumPage() {
  const [mode, setMode] = useState<Mode>("paragraf");
  const [count, setCount] = useState(3);
  const [turkish, setTurkish] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const randomWord = useCallback(
    (words: string[]) => words[Math.floor(Math.random() * words.length)],
    []
  );

  const generateSentence = useCallback(
    (words: string[], minLen: number = 6, maxLen: number = 14) => {
      const len = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
      const sentence: string[] = [];
      for (let i = 0; i < len; i++) {
        sentence.push(randomWord(words));
      }
      sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
      return sentence.join(" ") + ".";
    },
    [randomWord]
  );

  const generateParagraph = useCallback(
    (words: string[], sentenceCount: number = 5) => {
      const sentences: string[] = [];
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence(words));
      }
      return sentences.join(" ");
    },
    [generateSentence]
  );

  const handleGenerate = () => {
    const words = turkish ? TURKISH_WORDS : LATIN_WORDS;
    const firstSentence = turkish ? TURKISH_FIRST : FIRST_SENTENCE;
    let result = "";

    if (mode === "paragraf") {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0) {
          const rest = generateParagraph(words, 4);
          paragraphs.push(firstSentence + " " + rest);
        } else {
          paragraphs.push(generateParagraph(words, 4 + Math.floor(Math.random() * 3)));
        }
      }
      result = paragraphs.join("\n\n");
    } else if (mode === "cumle") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0) {
          sentences.push(firstSentence);
        } else {
          sentences.push(generateSentence(words));
        }
      }
      result = sentences.join(" ");
    } else {
      const wordList: string[] = [];
      for (let i = 0; i < count; i++) {
        wordList.push(randomWord(words));
      }
      result = wordList.join(" ");
    }

    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maxCount = mode === "paragraf" ? 20 : mode === "cumle" ? 50 : 500;

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Ücretsiz Araç
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Lorem Ipsum Üretici
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Tasarım ve geliştirme projeleri için placeholder metin üretin.
            <br />
            Türkçe Lorem Ipsum desteği ile.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6">
            {([
              { key: "paragraf", label: "Paragraf" },
              { key: "cumle", label: "Cümle" },
              { key: "kelime", label: "Kelime" },
            ] as { key: Mode; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setMode(tab.key);
                  setCount(tab.key === "paragraf" ? 3 : tab.key === "cumle" ? 5 : 50);
                  setOutput("");
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  mode === tab.key
                    ? "bg-[#D8FB32] text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Count + Turkish toggle */}
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-[#CCCCCC] text-sm font-medium mb-2">
                {mode === "paragraf" ? "Paragraf Sayısı" : mode === "cumle" ? "Cümle Sayısı" : "Kelime Sayısı"}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={maxCount}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="flex-1 h-2 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#D8FB32]"
                  style={{
                    background: `linear-gradient(to right, #D8FB32 0%, #D8FB32 ${((count - 1) / (maxCount - 1)) * 100}%, #1F2937 ${((count - 1) / (maxCount - 1)) * 100}%, #1F2937 100%)`,
                  }}
                />
                <input
                  type="number"
                  min={1}
                  max={maxCount}
                  value={count}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v >= 1 && v <= maxCount) setCount(v);
                  }}
                  className="w-16 bg-[#0A0A0A] border border-[#1F2937] rounded-lg px-2 py-1.5 text-[#F5F5F5] text-sm text-center focus:outline-none focus:border-[#D8FB32]/40"
                />
              </div>
            </div>

            <button
              onClick={() => setTurkish(!turkish)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                turkish
                  ? "bg-[#D8FB32] text-[#0A0A0A]"
                  : "bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30"
              }`}
            >
              {turkish ? "Türkçe" : "Latince"}
            </button>
          </div>

          {/* Generate Button */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleGenerate}
              className="px-6 py-3 rounded-[10px] font-semibold text-sm bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#B4F030] transition-colors"
            >
              Üret
            </button>
            {output && (
              <button
                onClick={handleCopy}
                className="px-6 py-3 rounded-[10px] font-semibold text-sm bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30 transition-colors"
              >
                {copied ? "Kopyalandı!" : "Kopyala"}
              </button>
            )}
          </div>

          {/* Output */}
          {output && (
            <div>
              <label className="block text-[#CCCCCC] text-sm font-medium mb-2">
                Sonuç
              </label>
              <div className="w-full bg-[#0A0A0A] border border-[#1F2937] rounded-xl px-4 py-4 text-[#F5F5F5] text-sm leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                {output}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Lorem Ipsum Nedir?</h2>
          <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">
            Lorem Ipsum, 1500&apos;lerden beri kullanılan standart placeholder metindir.
            Tasarım ve dizgi sektöründe içerik yerine geçici dolgu metin olarak kullanılır.
          </p>
          <ol className="space-y-2 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li>Paragraf, cümle veya kelime modunu seçin</li>
            <li>İstediğiniz miktarı ayarlayın</li>
            <li>Latince veya Türkçe seçeneğini belirleyin</li>
            <li>&quot;Üret&quot; butonuna tıklayın ve kopyalayın</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              İpucu: Türkçe modu, Türkçe projeleriniz için doğal görünen placeholder metin üretir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
