export default function KaiIcon({
  className = "",
  size = 40,
  color = "#D8FB32",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const id = `kai-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="Kai icon"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.65" />
        </linearGradient>
      </defs>

      <g transform="translate(50,50)">
        {/*
          5 curved petal blades — each is a bezier teardrop that sweeps
          clockwise, giving the pinwheel its sense of rotation.
          Designed to read clearly from 16px to 512px.
        */}
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M2,-7 C8,-14 12,-30 6,-40 C4,-43 0,-42 -1,-39 C-5,-29 -6,-14 -2,-7 Z"
            fill={`url(#${id}-g)`}
            transform={`rotate(${angle})`}
          />
        ))}

        {/* Center hub — solid circle */}
        <circle cx="0" cy="0" r="7" fill={color} />
      </g>
    </svg>
  );
}
