"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-2xl mx-auto mb-6">
          !
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Bir hata olustu</h1>
        <p className="text-white/40 text-sm mb-8">
          Beklenmeyen bir sorun yasandi. Lutfen tekrar deneyin.
        </p>
        <button
          onClick={reset}
          className="bg-[#D8FB32] text-[#0A0A0A] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#B4F030] transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
