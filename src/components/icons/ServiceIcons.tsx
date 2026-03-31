interface IconProps {
  className?: string;
  size?: number;
}

export function BrainIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3v1a3 3 0 0 1-1 5.5V18a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-1.5A3 3 0 0 1 5 11v-1a3 3 0 0 1 3-3V6a4 4 0 0 1 4-4z" />
      <path d="M12 2v20" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  );
}

export function MusicIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function ContentIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
    </svg>
  );
}

export function CodeIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );
}

export function PaletteIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a10 10 0 0 0-1 19.9c.6.1 1-.3 1-.8v-1.5c0-.8-.7-1.3-1.5-1.2a3.5 3.5 0 0 1-3.3-2.4c-.2-.5-.6-1-1-1.3-.4-.2-.5-.4-.1-.5.8-.2 1.6.5 2.3 1.4.5.7 1.5 1.2 2.4.9.1-.7.4-1.3.8-1.7C8 14.2 5.5 13 5.5 9c0-1.3.5-2.5 1.3-3.4-.1-.4-.5-1.6.2-3.1 0 0 1-.3 3.3 1.3a11.2 11.2 0 0 1 6 0c2.2-1.6 3.2-1.3 3.2-1.3.6 1.5.3 2.7.1 3.1.8.9 1.3 2.1 1.3 3.4 0 4-2.5 5.2-5 5.5.5.4.8 1.2.8 2.4v3.5c0 .5.4.9 1 .8A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function MicrophoneIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function BrowserIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <circle cx="5.5" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LightbulbIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>
  );
}

const serviceIconMap = {
  brain: BrainIcon,
  music: MusicIcon,
  content: ContentIcon,
  code: CodeIcon,
  palette: PaletteIcon,
  microphone: MicrophoneIcon,
  browser: BrowserIcon,
  lightbulb: LightbulbIcon,
};

export function ServiceIcon({ icon, ...props }: IconProps & { icon: string }) {
  const Icon = serviceIconMap[icon as keyof typeof serviceIconMap];
  if (!Icon) return null;
  return <Icon {...props} />;
}
