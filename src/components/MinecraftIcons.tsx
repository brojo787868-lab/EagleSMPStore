import React, { useState } from 'react';
import { MinecraftIconType } from '../types/store';

export const EAGLE_LOGO_SRC = '/assets/eagle_smp_server_logo_1791261383063-Bc_4Z0Bc.jpg';

export const MinecraftIcon: React.FC<{
  type: MinecraftIconType;
  className?: string;
  size?: number;
}> = ({ type, className = 'w-6 h-6', size = 24 }) => {
  switch (type) {
    case 'helmet':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="4" width="16" height="12" rx="2" fill="#F59E0B" />
          <rect x="6" y="6" width="12" height="4" fill="#FDE68A" />
          <rect x="4" y="14" width="4" height="6" fill="#D97706" />
          <rect x="16" y="14" width="4" height="6" fill="#D97706" />
          <rect x="8" y="10" width="8" height="2" fill="#78350F" />
          <circle cx="12" cy="7" r="1.5" fill="#DC2626" />
        </svg>
      );
    case 'mace':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="11" y="3" width="9" height="9" rx="1.5" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
          <rect x="13" y="5" width="5" height="5" fill="#334155" />
          <rect x="14" y="6" width="3" height="3" fill="#64748B" />
          <path d="M12 12L4 20" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="4" cy="20" r="1.5" fill="#D97706" />
        </svg>
      );
    case 'sword':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M19.5 4.5L14.5 9.5L13 8L8 13L9.5 14.5L4.5 19.5L3.5 18.5L3 20L4 21L5.5 20.5L4.5 19.5L9.5 14.5L11 16L16 11L14.5 9.5L19.5 4.5Z"
            fill="#8B5CF6"
          />
          <path d="M18 3L21 6L14 13L11 10L18 3Z" fill="#C4B5FD" />
          <path d="M17 5L19 7L13.5 12.5L11.5 10.5L17 5Z" fill="#F3E8FF" />
          <rect x="7" y="15" width="2" height="2" fill="#7C3AED" />
          <rect x="4" y="18" width="3" height="3" fill="#D97706" />
        </svg>
      );
    case 'key':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="8" cy="8" r="5" stroke="#F59E0B" strokeWidth="2.5" fill="#FEF3C7" />
          <rect x="11" y="7" width="9" height="2.5" fill="#F59E0B" />
          <rect x="17" y="9.5" width="2" height="3" fill="#F59E0B" />
          <rect x="14" y="9.5" width="2" height="2" fill="#F59E0B" />
          <circle cx="8" cy="8" r="2" fill="#B45309" />
        </svg>
      );
    case 'gem':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="12,2 21,9 12,22 3,9" fill="#10B981" />
          <polygon points="12,2 17,9 12,22 7,9" fill="#34D399" />
          <polygon points="12,2 14,9 12,22 10,9" fill="#A7F3D0" />
        </svg>
      );
    case 'elytra':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 4C10 4 5 7 3 13C2 16 3 20 6 20C9 20 11 15 12 12C13 15 15 20 18 20C21 20 22 16 21 13C19 7 14 4 12 4Z"
            fill="#6366F1"
          />
          <path
            d="M12 6C10 7 6 10 5 14C7 13 10 11 12 8C14 11 17 13 19 14C18 10 14 7 12 6Z"
            fill="#A5B4FC"
          />
        </svg>
      );
    case 'book':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#B91C1C" />
          <path d="M4 18C4 18 8 16 12 18C16 16 20 18 20 18" stroke="#FEF08A" strokeWidth="2" />
          <rect x="7" y="7" width="10" height="2" fill="#FEF08A" />
          <rect x="7" y="11" width="7" height="2" fill="#FEF08A" />
          <circle cx="15" cy="12" r="1.5" fill="#EF4444" />
        </svg>
      );
    case 'totem':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="7" y="3" width="10" height="8" rx="2" fill="#F59E0B" />
          <rect x="5" y="8" width="14" height="4" rx="1" fill="#D97706" />
          <rect x="8" y="11" width="8" height="10" rx="1" fill="#10B981" />
          <circle cx="9.5" cy="6.5" r="1.5" fill="#10B981" />
          <circle cx="14.5" cy="6.5" r="1.5" fill="#10B981" />
          <rect x="10.5" y="14" width="3" height="4" fill="#047857" />
        </svg>
      );
    case 'chest':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="5" width="18" height="6" rx="1" fill="#D97706" />
          <rect x="3" y="10" width="18" height="10" rx="1" fill="#B45309" />
          <rect x="10.5" y="8" width="3" height="4" rx="0.5" fill="#FDE68A" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="#78350F" strokeWidth="1.5" />
        </svg>
      );
    case 'tag':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 4H10L20 14L14 20L4 10V4Z" fill="#EC4899" />
          <circle cx="7" cy="7" r="1.5" fill="#FFFFFF" />
        </svg>
      );
    case 'compass':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="#E2E8F0" strokeWidth="2" fill="#1E293B" />
          <polygon points="12,5 15,12 12,11 9,12" fill="#EF4444" />
          <polygon points="12,19 15,12 12,13 9,12" fill="#94A3B8" />
        </svg>
      );
    case 'pickaxe':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M6 4C9 3 15 3 18 6C17 8 16 9 14 9C12 9 10 8 9 9C8 10 9 12 9 14C9 16 8 17 6 18C3 15 3 9 4 6L6 4Z"
            fill="#06B6D4"
          />
          <line x1="10" y1="10" x2="20" y2="20" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'pet':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="5" y="7" width="14" height="12" rx="2" fill="#F59E0B" />
          <polygon points="5,7 5,3 9,7" fill="#D97706" />
          <polygon points="19,7 19,3 15,7" fill="#D97706" />
          <rect x="7" y="10" width="3" height="3" rx="0.5" fill="#1E293B" />
          <rect x="14" y="10" width="3" height="3" rx="0.5" fill="#1E293B" />
          <rect x="8" y="10.5" width="1" height="1" fill="#FEF08A" />
          <rect x="15" y="10.5" width="1" height="1" fill="#FEF08A" />
          <polygon points="10,14 14,14 12,16.5" fill="#EA580C" />
          <rect x="8" y="19" width="3" height="2" rx="0.5" fill="#B45309" />
          <rect x="13" y="19" width="3" height="2" rx="0.5" fill="#B45309" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" fill="#FBBF24" />
          <polygon points="12,5 14,10 19,12 14,14 12,19 10,14 5,12 10,10" fill="#FEF08A" />
        </svg>
      );
  }
};

export const TelegramIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

export const ServerLogoBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 42,
  className = '',
}) => (
  <div
    className={`relative flex items-center justify-center shrink-0 ${className}`}
    style={{ width: size, height: size }}
  >
    <div className="absolute inset-0 bg-amber-500/30 blur-md rounded-lg" />
    <img
      src={EAGLE_LOGO_SRC}
      alt="Eagle SMP Minecraft Server Logo"
      referrerPolicy="no-referrer"
      className="relative w-full h-full object-cover rounded-lg border border-amber-400/80 shadow-lg shadow-amber-500/20"
    />
  </div>
);

export const ServerHeroBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.25)] ${className}`}
  >
    <img
      src={EAGLE_LOGO_SRC}
      alt="Eagle SMP Minecraft Server Official Logo"
      referrerPolicy="no-referrer"
      className="w-full h-auto object-cover max-h-72 transform hover:scale-102 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
  </div>
);

export const PlayerAvatar: React.FC<{
  ign: string;
  size?: number;
  className?: string;
  showStatus?: boolean;
}> = ({ ign, size = 32, className = '', showStatus = false }) => {
  const [fallbackTier, setFallbackTier] = useState<0 | 1 | 2>(0);
  const cleanIgn = ign?.trim() || 'Steve';
  const avatarUrl =
    fallbackTier === 0
      ? `https://mc-heads.net/avatar/${encodeURIComponent(cleanIgn)}/${size}`
      : `https://minotar.net/helm/${encodeURIComponent(cleanIgn)}/${size}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {fallbackTier < 2 ? (
        <img
          src={avatarUrl}
          alt={`${cleanIgn}'s Minecraft Skin`}
          width={size}
          height={size}
          referrerPolicy="no-referrer"
          className="rounded shadow-inner border border-amber-500/20 bg-slate-900 object-contain image-rendering-pixelated"
          onError={() => setFallbackTier((prev) => (prev === 0 ? 1 : 2))}
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full rounded border border-amber-500/30 bg-slate-800 flex items-center justify-center font-mono font-bold text-amber-300 uppercase select-none"
          style={{ fontSize: Math.max(10, Math.floor(size * 0.4)) }}
        >
          {cleanIgn.slice(0, 2)}
        </div>
      )}
      {showStatus && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-slate-900 rounded-full" />
      )}
    </div>
  );
};

const MC_COLOR_MAP: Record<string, string> = {
  '0': '#000000',
  '1': '#0000AA',
  '2': '#00AA00',
  '3': '#00AAAA',
  '4': '#AA0000',
  '5': '#AA00AA',
  '6': '#FFAA00',
  '7': '#AAAAAA',
  '8': '#555555',
  '9': '#5555FF',
  a: '#55FF55',
  b: '#55FFFF',
  c: '#FF5555',
  d: '#FF55FF',
  e: '#FFFF55',
  f: '#FFFFFF',
};

export function parseMinecraftText(text: string): React.ReactNode[] {
  const parts = text.split(/([&§][0-9a-fk-or])/gi);
  const nodes: React.ReactNode[] = [];
  let color = '#AAAAAA';
  let bold = false;
  let italic = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;
    if (part.startsWith('&') || part.startsWith('§')) {
      const code = part.charAt(1).toLowerCase();
      if (MC_COLOR_MAP[code]) {
        color = MC_COLOR_MAP[code];
        bold = false;
        italic = false;
      } else if (code === 'l') {
        bold = true;
      } else if (code === 'o') {
        italic = true;
      } else if (code === 'r') {
        color = '#AAAAAA';
        bold = false;
        italic = false;
      }
    } else {
      nodes.push(
        <span
          key={i}
          style={{
            color,
            fontWeight: bold ? '700' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textShadow: '1px 1px 0px rgba(0,0,0,0.85)',
          }}
        >
          {part}
        </span>
      );
    }
  }

  return nodes.length > 0 ? nodes : [<span key="empty">{text}</span>];
}

export const MinecraftTooltip: React.FC<{
  title: string;
  lore: string[];
  className?: string;
}> = ({ title, lore, className = '' }) => (
  <div className={`mc-tooltip p-3.5 rounded select-text text-sm font-mono border-2 border-purple-950 ${className}`}>
    <div className="font-bold text-base mb-1.5 text-amber-300 drop-shadow">
      {parseMinecraftText(title)}
    </div>
    <div className="space-y-1">
      {lore.map((line, idx) => (
        <div key={idx} className="leading-snug">
          {parseMinecraftText(line)}
        </div>
      ))}
    </div>
  </div>
);
