"use client";

interface DecorativePinwheelProps {
  size?: number;
  opacity?: number;
  color?: string;
  className?: string;
  rotate?: number;
  animate?: boolean;
  reverse?: boolean;
  /** Adds spin animation on parent group-hover */
  hoverSpin?: boolean;
  /** Adds scale-up on parent group-hover */
  hoverScale?: boolean;
}

export default function DecorativePinwheel({
  size = 100,
  opacity = 0.05,
  color = "#D8FB32",
  className = "",
  rotate = 0,
  animate = false,
  reverse = false,
  hoverSpin = false,
  hoverScale = false,
}: DecorativePinwheelProps) {
  const petalPath =
    "M-8 -12 L-30 -110 Q-25 -115 -15 -112 L8 -45 L35 -108 Q42 -112 48 -105 L12 -12 Z";
  const rotations = [0, 72, 144, 216, 288];

  const hoverClasses = [
    hoverSpin ? "group-hover:animate-[spin-slow_3s_linear_infinite]" : "",
    hoverScale ? "group-hover:scale-125" : "",
    (hoverSpin || hoverScale) ? "transition-transform duration-300" : "",
  ].filter(Boolean).join(" ");

  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`pointer-events-none select-none ${hoverClasses} ${className}`}
      style={{
        opacity,
        transform: `rotate(${rotate}deg)`,
        animation: animate
          ? `${reverse ? "spin-slow-reverse" : "spin-slow"} 60s linear infinite`
          : undefined,
      }}
    >
      <g transform="translate(256, 256)">
        {rotations.map((r) => (
          <path key={r} d={petalPath} fill={color} transform={`rotate(${r})`} />
        ))}
        <circle cx="0" cy="0" r="16" fill={color} />
      </g>
    </svg>
  );
}
