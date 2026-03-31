export default function KaiIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
    >
      <g transform="translate(256, 256)">
        <path
          d="M-8 -12 L-30 -110 Q-25 -115 -15 -112 L8 -45 L35 -108 Q42 -112 48 -105 L12 -12 Z"
          fill="#D8FB32"
          transform="rotate(0)"
        />
        <path
          d="M-8 -12 L-30 -110 Q-25 -115 -15 -112 L8 -45 L35 -108 Q42 -112 48 -105 L12 -12 Z"
          fill="#D8FB32"
          transform="rotate(72)"
        />
        <path
          d="M-8 -12 L-30 -110 Q-25 -115 -15 -112 L8 -45 L35 -108 Q42 -112 48 -105 L12 -12 Z"
          fill="#D8FB32"
          transform="rotate(144)"
        />
        <path
          d="M-8 -12 L-30 -110 Q-25 -115 -15 -112 L8 -45 L35 -108 Q42 -112 48 -105 L12 -12 Z"
          fill="#D8FB32"
          transform="rotate(216)"
        />
        <path
          d="M-8 -12 L-30 -110 Q-25 -115 -15 -112 L8 -45 L35 -108 Q42 -112 48 -105 L12 -12 Z"
          fill="#D8FB32"
          transform="rotate(288)"
        />
        <circle cx="0" cy="0" r="16" fill="#D8FB32" />
      </g>
    </svg>
  );
}
