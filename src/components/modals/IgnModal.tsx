import React, { useState } from 'react';
import { Sparkles, User, X } from 'lucide-react';
import { soundFX } from '../../utils/sound';
import { PlayerAvatar } from '../MinecraftIcons';

interface IgnModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerIgn: string;
  onSaveIgn: (ign: string) => void;
}

export const IgnModal: React.FC<IgnModalProps> = ({ isOpen, onClose, playerIgn, onSaveIgn }) => {
  const [ign, setIgn] = useState(playerIgn);
  const [edition, setEdition] = useState<'java' | 'bedrock'>('java');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-label="Enter Minecraft Username"
    >
      <div className="relative w-full max-w-md bg-[#0f1420] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white tracking-wide">
                ENTER MINECRAFT USERNAME
              </h2>
              <p className="text-xs text-slate-400">
                Sync your player avatar and enable 1-click checkout.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            aria-label="Close username modal"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-white/10 bg-slate-950/60 p-1">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setEdition('java');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              edition === 'java'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Java Edition
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setEdition('bedrock');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              edition === 'bedrock'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bedrock Edition (Geyser)
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = ign.trim();
            if (trimmed) {
              soundFX.playClick();
              soundFX.playOrb();
              onSaveIgn(trimmed);
              onClose();
            }
          }}
          className="p-6 space-y-5"
        >
          <div>
            <label
              htmlFor="minecraft-ign-input"
              className="block text-xs font-mono text-slate-300 mb-2 font-semibold"
            >
              {edition === 'java' ? 'Minecraft Java IGN:' : 'Xbox Gamertag / Bedrock Name:'}
            </label>
            <input
              id="minecraft-ign-input"
              type="text"
              required
              placeholder={
                edition === 'java' ? 'e.g. Dream, Technoblade, Steve' : 'e.g. MasterGamer44'
              }
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm font-mono text-emerald-400 focus:outline-none focus:border-amber-400 uppercase tracking-wider"
            />
            {edition === 'bedrock' && (
              <p className="text-[11px] text-slate-400 mt-1.5">
                Note: Bedrock accounts automatically sync with the GeyserMC bridge.
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 p-3.5 bg-slate-950/80 rounded-xl border border-white/5">
            <PlayerAvatar ign={ign || 'Steve'} size={48} showStatus={true} />
            <div>
              <div className="text-xs font-bold text-white font-mono">
                {ign || 'Steve (Default)'}
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                <span>Ready to receive ranks &amp; items</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 mc-btn-primary text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md"
            >
              Save Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
