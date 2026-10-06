import React, { useState, useMemo } from 'react';
import { Check, Crown, Eye, Key, Layers, Search, ShoppingCart, Sparkles } from 'lucide-react';
import { PackageCategory, PackageTier, StoreItem } from '../types/store';
import { SERVER_CONFIG, STORE_ITEMS } from '../data/storeData';
import { soundFX } from '../utils/sound';
import { MinecraftIcon, TelegramIcon } from './MinecraftIcons';

const TIER_STYLES: Record<PackageTier, string> = {
  bronze: 'hover:border-amber-700/60 shadow-amber-900/10',
  iron: 'hover:border-slate-300/60 shadow-slate-400/10',
  gold: 'border-amber-500/30 hover:border-amber-400 shadow-amber-500/15',
  emerald: 'border-emerald-500/40 hover:border-emerald-400 shadow-emerald-500/20',
  netherite: 'border-purple-500/40 hover:border-purple-400 shadow-purple-500/20',
  cosmetic: 'border-pink-500/30 hover:border-pink-400 shadow-pink-500/15',
  booster: 'border-cyan-500/30 hover:border-cyan-400 shadow-cyan-500/15',
};

interface PackageCardProps {
  item: StoreItem;
  onSelect: (item: StoreItem) => void;
  onAddToCart: (item: StoreItem) => void;
  currencySymbol: string;
  currencyRate: number;
  playerIgn?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  item,
  onSelect,
  onAddToCart,
  currencySymbol,
  currencyRate,
  playerIgn = 'Steve',
}) => {
  const priceStr = (item.price * currencyRate).toFixed(2);
  const origStr = item.originalPrice ? (item.originalPrice * currencyRate).toFixed(2) : null;
  const tierClass = TIER_STYLES[item.tier] || 'hover:border-amber-400';
  const telegramUrl = `https://t.me/TheKillerDGod?text=${encodeURIComponent(
    `Hello @TheKillerDGod! I would like to buy "${item.name}" (${currencySymbol}${priceStr}) on Eagle SMP.\nMy Minecraft IGN is: ${playerIgn}`
  )}`;

  return (
    <div
      onClick={() => {
        soundFX.playClick();
        onSelect(item);
      }}
      className={`mc-card rounded-xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer relative group border ${tierClass}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            {item.category}
          </span>
          {item.isPopular && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              ★ POPULAR
            </span>
          )}
        </div>
        {item.badge && !item.isPopular && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
            {item.badge}
          </span>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-inner">
            <MinecraftIcon type={item.minecraftIcon} size={32} />
          </div>
          <div>
            <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors font-display tracking-wide leading-tight">
              {item.name}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {item.shortDesc}
            </p>
          </div>
        </div>

        <div className="my-3 space-y-1.5 border-t border-b border-white/5 py-3">
          {item.perks.slice(0, 3).map((perk, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="truncate">{perk.replace(/&[0-9a-fk-or]/g, '')}</span>
            </div>
          ))}
          {item.perks.length > 3 && (
            <div className="text-[11px] text-amber-400/80 font-mono">
              +{item.perks.length - 3} more exclusive perks &amp; commands
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-amber-400">
                {currencySymbol}
                {priceStr}
              </span>
              {origStr && (
                <span className="text-xs font-mono text-slate-500 line-through">
                  {currencySymbol}
                  {origStr}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-mono block">Permanent Lifetime</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playClick();
                onSelect(item);
              }}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-colors"
              title={`Inspect Lore & Details for ${item.name}`}
              aria-label={`Inspect Lore & Details for ${item.name}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playClick();
                soundFX.playOrb();
                onAddToCart(item);
              }}
              aria-label={`Add ${item.name} to cart`}
              className="px-3 py-2 mc-btn-primary text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/20"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
          }}
          className="w-full py-1.5 px-3 rounded-lg bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#38bdf8] hover:text-white border border-[#229ED9]/35 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
          title={`Order ${item.name} directly via Telegram with TheKillerDGod`}
        >
          <TelegramIcon size={14} className="text-[#38bdf8]" />
          <span>Buy via Telegram (@{SERVER_CONFIG.developer.name})</span>
        </a>
      </div>
    </div>
  );
};

const CATEGORIES: { id: PackageCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Packages', icon: Layers },
  { id: 'ranks', label: 'Lifetime Ranks', icon: Crown },
  { id: 'pets', label: 'PET', icon: Sparkles },
  { id: 'items', label: 'Item', icon: Key },
];

interface StoreCatalogProps {
  onSelectItem: (item: StoreItem) => void;
  onAddToCart: (item: StoreItem) => void;
  currencySymbol: string;
  currencyRate: number;
  selectedCategory: PackageCategory;
  onSelectCategory: (cat: PackageCategory) => void;
  playerIgn?: string;
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  onSelectItem,
  onAddToCart,
  currencySymbol,
  currencyRate,
  selectedCategory,
  onSelectCategory,
  playerIgn = 'Steve',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredItems = useMemo(() => {
    return STORE_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedTier !== 'all' && item.tier !== selectedTier) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.shortDesc.toLowerCase().includes(q);
        const matchPerk = item.perks.some((p) => p.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchPerk) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, selectedTier, searchQuery, sortBy]);

  return (
    <section id="store-catalog" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSelectCategory(cat.id);
              }}
              className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 border ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900 border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-950/60 rounded-xl border border-white/5">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search perks, ranks, pets, keys, items"
            placeholder="Search perks, ranks, pets, keys, items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-white/5 text-xs font-mono">
            {['all', 'netherite', 'emerald', 'gold', 'iron', 'bronze'].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setSelectedTier(tier);
                }}
                className={`px-2.5 py-1 rounded capitalize text-[11px] font-semibold transition-colors ${
                  selectedTier === tier
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tier === 'all' ? 'All Tiers' : tier}
              </button>
            ))}
          </div>

          <select
            aria-label="Sort packages"
            value={sortBy}
            onChange={(e) => {
              soundFX.playClick();
              setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc');
            }}
            className="px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-400"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {selectedCategory === 'ranks' && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 flex items-center gap-3">
          <Crown className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs text-slate-300">
            All Eagle SMP ranks are 100% permanent lifetime purchases with instant automated delivery across all realms.
          </div>
        </div>
      )}

      {selectedCategory === 'pets' && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs text-slate-300">
            Companion PET packages (Eagle PET, Luffy PET, Oggy) follow you in-game, grant passive survival &amp; combat buffs, and stay permanently!
          </div>
        </div>
      )}

      {selectedCategory === 'items' && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/20 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs text-slate-300">
            Browse exclusive server gear, OP KEY, KEY PET, OP MACE, Money 60M, Kit PrimeEagle, Kit Eagle, Kit MVP+, and Kit VVIP+!
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
          <p className="text-base font-bold text-slate-300 font-display">
            No matching store packages found
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or reset the filters to browse the entire Eagle Store
            catalog.
          </p>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setSearchQuery('');
              setSelectedTier('all');
              onSelectCategory('all');
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-semibold rounded-lg border border-white/10"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onAddToCart={onAddToCart}
              currencySymbol={currencySymbol}
              currencyRate={currencyRate}
              playerIgn={playerIgn}
            />
          ))}
        </div>
      )}
    </section>
  );
};
