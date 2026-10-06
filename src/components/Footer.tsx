import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PackageCategory } from '../types/store';
import { SERVER_CONFIG } from '../data/storeData';
import { soundFX } from '../utils/sound';
import { ServerLogoBadge, TelegramIcon } from './MinecraftIcons';

interface FooterProps {
  onSelectCategory: (cat: PackageCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
}) => (
  <footer className="bg-[#07090e] border-t border-white/10 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div className="space-y-3 md:col-span-1">
        <div className="flex items-center gap-2.5">
          <ServerLogoBadge size={36} />
          <span className="text-xl font-bold font-display text-white tracking-wider">
            EAGLE <span className="text-amber-400">SMP</span>
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The official web store for Eagle SMP Minecraft Server. Supporting players across Java
          &amp; Bedrock Edition with custom plugins and instant automated delivery.
        </p>
        <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Server Architect &amp; Developer:
          </div>
          <div className="text-xs font-bold text-white font-mono flex items-center justify-between">
            <span>{SERVER_CONFIG.developer.name}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
              Dev
            </span>
          </div>
          <a
            href={SERVER_CONFIG.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="mt-2 w-full py-1.5 px-2.5 rounded-lg bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#38bdf8] border border-[#229ED9]/30 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <TelegramIcon size={14} className="text-[#38bdf8]" />
              <span>{SERVER_CONFIG.developer.telegram}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
        <div className="font-mono text-[11px] text-amber-300">
          IP: <strong>{SERVER_CONFIG.javaIp}</strong> Port: <strong>{SERVER_CONFIG.port}</strong>
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">
          Store Categories
        </h4>
        <ul className="space-y-1.5 font-medium">
          <li>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSelectCategory('ranks');
              }}
              className="hover:text-amber-300 transition-colors"
            >
              Server Lifetime Ranks
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSelectCategory('pets');
              }}
              className="hover:text-amber-300 transition-colors"
            >
              Server Companion PET
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSelectCategory('items');
              }}
              className="hover:text-amber-300 transition-colors"
            >
              Server Items &amp; Keys
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSelectCategory('all');
              }}
              className="hover:text-amber-300 transition-colors"
            >
              All Store Packages
            </button>
          </li>
        </ul>
      </div>

      <div className="space-y-2.5">
        <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">
          Community &amp; Support
        </h4>
        <ul className="space-y-1.5 font-medium">
          <li>
            <a
              href={SERVER_CONFIG.developer.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#38bdf8] hover:text-[#7dd3fc] transition-colors flex items-center gap-1"
            >
              <TelegramIcon size={12} />
              <span>Developer Telegram: {SERVER_CONFIG.developer.telegram}</span>
            </a>
          </li>
          <li>
            <a
              href={SERVER_CONFIG.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors block"
            >
              <span className="text-white font-semibold">Community Discord Support</span>
              <span className="block text-[11px] text-slate-400 mt-0.5">
                General player community, giveaways, and ticket support in #store-support.
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className="space-y-2.5">
        <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase">
          Connection Info
        </h4>
        <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-1.5 font-mono text-[11px]">
          <div>
            Server IP: <span className="text-amber-300 font-bold">{SERVER_CONFIG.javaIp}</span>
          </div>
          <div>
            Port: <span className="text-emerald-400 font-bold">{SERVER_CONFIG.port}</span>
          </div>
          <div>
            Full Address:{' '}
            <span className="text-white font-bold">{SERVER_CONFIG.fullAddress}</span>
          </div>
          <div>
            Java &amp; Bedrock: <span className="text-slate-300">{SERVER_CONFIG.version}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
      <div>
        © 2026 Eagle SMP Minecraft Server. Developed by{' '}
        <strong className="text-slate-300">{SERVER_CONFIG.developer.name}</strong>. Not an official
        Minecraft product.
      </div>
      <div className="flex items-center gap-4">
        <a
          href={SERVER_CONFIG.developer.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#38bdf8] hover:underline"
        >
          Telegram: {SERVER_CONFIG.developer.telegram}
        </a>
        <span>·</span>
        <span>Tebex &amp; LuckPerms Sync Active</span>
        <span>·</span>
        <span>DDoS Protected</span>
      </div>
    </div>
  </footer>
);
