export default function KaiWordmark({
  className = "",
  height = 32,
  color = "currentColor",
  accentColor = "#D8FB32",
}: {
  className?: string;
  height?: number;
  color?: string;
  accentColor?: string;
}) {
  const aspectRatio = 280 / 100;
  const width = height * aspectRatio;
  const id = `kw-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 100"
      width={width}
      height={height}
      className={className}
      aria-label="Kai wordmark"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accentColor} stopOpacity="1" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* ── k ── */}
      <g fill={color}>
        {/* Vertical stem */}
        <rect x="20" y="15" width="11" height="70" rx="2" />
        {/* Upper diagonal */}
        <path d="M31,52 L31,46 L68,15 L76,15 L76,21 L37,49 Z" />
        {/* Lower diagonal */}
        <path d="M31,54 L37,51 L76,79 L76,85 L68,85 L31,58 Z" />
      </g>

      {/* ── a ── */}
      <g fill={color}>
        {/* Bowl — open-top rounded shape */}
        <path
          d="M120,85 L120,55 C120,39 130,30 147,30 C164,30 174,39 174,55 L174,85
             L163,85 L163,55 C163,44 157,38 147,38 C137,38 131,44 131,55 L131,85 Z"
          fillRule="evenodd"
        />
        {/* Right vertical extension */}
        <rect x="163" y="30" width="11" height="55" rx="2" />
      </g>

      {/* ── i ── */}
      <g fill={color}>
        {/* Stem */}
        <rect x="210" y="30" width="11" height="55" rx="2" />
      </g>

      {/* ── i dot: pinwheel icon ── */}
      <g transform="translate(215.5, 14)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M0.5,-2 C2,-3.5 3,-7.5 1.5,-10 C1,-11 0,-10.8 -0.2,-10
               C-1.2,-7.5 -1.5,-3.5 -0.5,-2 Z"
            fill={`url(#${id}-g)`}
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="2" fill={accentColor} />
      </g>
    </svg>
  );
}
