"use client";

import { useState, useRef } from "react";

type Mode = "encode" | "decode" | "file";

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = () => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(encoded);
      } else if (mode === "decode") {
        const decoded = decodeURIComponent(
          Array.prototype.map
            .call(atob(input.trim()), (c: string) => {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        setOutput(decoded);
      }
    } catch {
      setError(
        mode === "decode"
          ? "Gecersiz Base64 formati. Lutfen gecerli bir Base64 metni girin."
          : "Donusturulemedi. Lutfen girdiyi kontrol edin."
      );
      setOutput("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 512 * 1024) {
      setError("Dosya boyutu 512 KB'den buyuk olamaz.");
      return;
    }

    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setOutput(result);
      setInput(`[Dosya: ${file.name}]`);
    };
    reader.onerror = () => {
      setError("Dosya okunamadi.");
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
            Base64 Encoder / Decoder
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Metin veya dosyalarınızı Base64 formatına dönüştürün.
            <br />
            Base64 kodunu tekrar metne çevirin.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          {/* Mode Tabs */}
          <div className="flex gap-2 mb-8">
            {([
              { key: "encode", label: "Encode" },
              { key: "decode", label: "Decode" },
              { key: "file", label: "Dosya" },
            ] as { key: Mode; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setMode(tab.key);
                  handleClear();
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

          {/* Input */}
          {mode !== "file" ? (
            <div className="mb-6">
              <label className="block text-[#CCCCCC] text-sm font-medium mb-2">
                {mode === "encode" ? "Metin" : "Base64 Kodu"}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Encode edilecek metni yapıştırın..."
                    : "Base64 kodunu yapıştırın..."
                }
                rows={5}
                className="w-full bg-[#0A0A0A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono placeholder-[#666] focus:outline-none focus:border-[#D8FB32]/40 resize-none"
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-[#CCCCCC] text-sm font-medium mb-2">
                Dosya Seç (maks. 512 KB)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#0A0A0A] border-2 border-dashed border-[#1F2937] rounded-xl px-4 py-8 text-center cursor-pointer hover:border-[#D8FB32]/30 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mx-auto mb-2 text-[#666]"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-[#666] text-sm">
                  {fileName || "Dosya seçmek için tıklayın"}
                </p>
              </div>
            </div>
          )}

          {/* Convert Button */}
          {mode !== "file" && (
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleConvert}
                className="px-6 py-3 rounded-[10px] font-semibold text-sm bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#B4F030] transition-colors"
              >
                {mode === "encode" ? "Encode Et" : "Decode Et"}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 rounded-[10px] font-semibold text-sm bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30 transition-colors"
              >
                Temizle
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl">
              <p className="text-[#EF4444] text-sm">{error}</p>
            </div>
          )}

          {/* Output */}
          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#CCCCCC] text-sm font-medium">
                  Sonuç
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1A1A1A] text-[#D8FB32] border border-[#1F2937] hover:border-[#D8FB32]/30 transition-colors"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Kopyalandı
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                rows={5}
                className="w-full bg-[#0A0A0A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono resize-none focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Base64 Nedir?</h2>
          <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">
            Base64, binary veriyi ASCII karakterleriyle temsil etmeye yarayan bir kodlama yöntemidir.
            E-posta ekleri, API istekleri ve veri URI&apos;lerinde yaygın olarak kullanılır.
          </p>
          <ol className="space-y-2 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li><strong>Encode:</strong> Metni Base64 formatına dönüştürür</li>
            <li><strong>Decode:</strong> Base64 kodunu orijinal metne çevirir</li>
            <li><strong>Dosya:</strong> Küçük dosyaları Base64 Data URI&apos;ye çevirir</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              İpucu: Tüm işlemler tarayıcınızda yapılır. Verileriniz hiçbir sunucuya gönderilmez.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
