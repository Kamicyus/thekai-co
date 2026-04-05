import Link from "next/link";

export default function BasariliPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-[#D8FB32]/10 border border-[#D8FB32]/30 flex items-center justify-center mx-auto mb-8">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 18L14 25L29 11"
              stroke="#D8FB32"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          Ödemeniz başarıyla alındı!
        </h1>

        {/* Subtext */}
        <p className="text-white/60 text-lg leading-relaxed mb-10">
          Hesabınız aktif edildi.
          <br />
          Ajanlarınız sizi bekliyor.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="inline-block bg-[#D8FB32] text-[#0A0A0A] font-bold text-sm px-8 py-4 rounded-xl hover:bg-[#B4F030] transition-all hover:scale-[1.02]"
        >
          Dashboard&apos;a Git
        </Link>

        {/* Footer note */}
        <p className="text-white/30 text-xs mt-8">
          Bir sorun mu var?{" "}
          <a
            href="mailto:hello@thekai.co"
            className="text-[#D8FB32]/60 hover:text-[#D8FB32] transition-colors"
          >
            hello@thekai.co
          </a>{" "}
          adresine yaz.
        </p>
      </div>
    </div>
  );
}
