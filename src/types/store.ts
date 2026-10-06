export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number;
}

export type PackageCategory = 'all' | 'ranks' | 'pets' | 'items';

export type PackageTier = 'bronze' | 'iron' | 'gold' | 'emerald' | 'netherite' | 'cosmetic' | 'booster';

export type MinecraftIconType =
  | 'helmet'
  | 'mace'
  | 'sword'
  | 'key'
  | 'gem'
  | 'elytra'
  | 'book'
  | 'totem'
  | 'chest'
  | 'tag'
  | 'compass'
  | 'pickaxe'
  | 'pet'
  | 'star';

export interface CrateRewardDrop {
  name: string;
  chance: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'ranks' | 'pets' | 'items';
  price: number;
  originalPrice?: number;
  tier: PackageTier;
  badge?: string;
  isPopular?: boolean;
  shortDesc: string;
  minecraftIcon: MinecraftIconType;
  perks: string[];
  lore: string[];
  crateRewards?: CrateRewardDrop[];
  serverCommands: string[];
}

export interface CartItem {
  item: StoreItem;
  quantity: number;
}

export interface RecentPurchase {
  id: string;
  ign: string;
  item: string;
  amount: number;
  timeAgo: string;
  server: string;
}

export interface TopDonator {
  rank: number;
  ign: string;
  amount: number;
  title: string;
}

export interface RankComparisonRow {
  perk: string;
  vip: string;
  vvipPlus: string;
  mvpPlus: string;
  eagle: string;
  primeEagle: string;
  primeEaglePlus: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CratePoolItem {
  id: string;
  name: string;
  rarity: string;
  color: string;
  icon: MinecraftIconType;
}

export interface CrateSimConfig {
  id: string;
  title: string;
  desc: string;
  tier: PackageTier;
  cost: string;
  storeId: string;
  pool: CratePoolItem[];
}

export interface RankHeaderInfo {
  id: string;
  name: string;
  color: string;
  border: string;
  badge: string;
}
