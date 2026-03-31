export default function KaiWordmark({ className = "", height = 32 }: { className?: string; height?: number }) {
  const aspectRatio = 600 / 200;
  const width = height * aspectRatio;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 200"
      width={width}
      height={height}
      className={className}
    >
      {/* k */}
      <g fill="#F5F5F5">
        <rect x="30" y="20" width="32" height="160" rx="1" />
        <rect x="18" y="20" width="56" height="12" rx="1" />
        <rect x="18" y="168" width="56" height="12" rx="1" />
        <polygon points="62,95 62,82 140,20 158,20 158,32 75,90" />
        <rect x="134" y="20" width="36" height="12" rx="1" />
        <polygon points="62,105 80,105 158,168 158,180 134,180 62,118" />
        <rect x="134" y="168" width="36" height="12" rx="1" />
      </g>

      {/* a */}
      <g fill="#F5F5F5">
        <path d="M200,180 L200,168 Q200,80 270,80 Q340,80 340,140 L340,180 L352,180 L352,168 L308,168 L308,140 Q308,100 270,100 Q232,100 232,140 L232,168 L200,168 Z" />
        <rect x="188" y="168" width="56" height="12" rx="1" />
        <rect x="296" y="168" width="56" height="12" rx="1" />
        <rect x="255" y="120" width="40" height="48" rx="4" fill="#0A0A0A" />
        <rect x="308" y="80" width="32" height="100" rx="1" />
      </g>

      {/* i */}
      <g fill="#F5F5F5">
        <rect x="395" y="80" width="32" height="100" rx="1" />
        <rect x="383" y="80" width="56" height="12" rx="1" />
        <rect x="383" y="168" width="56" height="12" rx="1" />
      </g>

      {/* i dot: K-Pinwheel */}
      <g transform="translate(411, 45)">
        <path d="M-3 -5 L-10 -25 L-5 -23 L3 -12 L10 -24 L14 -22 L5 -5 Z" fill="#D8FB32" transform="rotate(0) scale(0.9)" />
        <path d="M-3 -5 L-10 -25 L-5 -23 L3 -12 L10 -24 L14 -22 L5 -5 Z" fill="#D8FB32" transform="rotate(72) scale(0.9)" />
        <path d="M-3 -5 L-10 -25 L-5 -23 L3 -12 L10 -24 L14 -22 L5 -5 Z" fill="#D8FB32" transform="rotate(144) scale(0.9)" />
        <path d="M-3 -5 L-10 -25 L-5 -23 L3 -12 L10 -24 L14 -22 L5 -5 Z" fill="#D8FB32" transform="rotate(216) scale(0.9)" />
        <path d="M-3 -5 L-10 -25 L-5 -23 L3 -12 L10 -24 L14 -22 L5 -5 Z" fill="#D8FB32" transform="rotate(288) scale(0.9)" />
        <circle cx="0" cy="0" r="4" fill="#D8FB32" />
      </g>
    </svg>
  );
}
