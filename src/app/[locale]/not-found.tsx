import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-[80px] font-bold text-[#D8FB32] leading-none mb-4">404</div>
        <h1 className="text-xl font-bold text-white mb-2">Sayfa bulunamadi</h1>
        <p className="text-white/40 text-sm mb-8">
          Aradiginiz sayfa mevcut degil veya tasindi.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#D8FB32] text-[#0A0A0A] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#B4F030] transition-colors"
        >
          Ana Sayfaya Don
        </Link>
      </div>
    </div>
  );
}
