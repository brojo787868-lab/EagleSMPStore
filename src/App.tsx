/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CartItem, CurrencyCode, PackageCategory, StoreItem } from './types/store';
import { CURRENCIES } from './data/storeData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoreCatalog } from './components/StoreCatalog';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/modals/CartDrawer';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { IgnModal } from './components/modals/IgnModal';
import { ItemDetailModal } from './components/modals/ItemDetailModal';

export default function App() {
  const [playerIgn, setPlayerIgn] = useState<string>(
    () => localStorage.getItem('eagle_store_ign') || 'Steve'
  );
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('eagle_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>('all');
  const [activeSection, setActiveSection] = useState<string>('store');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isIgnModalOpen, setIsIgnModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveIgn = (ign: string) => {
    setPlayerIgn(ign);
    localStorage.setItem('eagle_store_ign', ign);
    showToast(`Welcome ${ign}! Character avatar updated.`);
  };

  useEffect(() => {
    localStorage.setItem('eagle_store_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (couponCode === 'EAGLE20') setDiscountPercent(20);
    else if (couponCode === 'SUMMER') setDiscountPercent(15);
    else if (couponCode === 'LAUNCH') setDiscountPercent(10);
    else setDiscountPercent(0);
  }, [couponCode]);

  const handleAddToCart = (item: StoreItem, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((entry) => entry.item.id === item.id);
      if (exists) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + qty } : entry
        );
      }
      return [...prev, { item, quantity: qty }];
    });
    showToast(`Added ${item.name} (x${qty}) to your basket!`);
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((entry) => (entry.item.id === itemId ? { ...entry, quantity: qty } : entry))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const cartSubtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const scrollToCatalog = () => {
    setActiveSection('store');
    const el = document.getElementById('store-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f17] text-[#e2e8f0] relative selection:bg-[#f59e0b] selection:text-[#0f172a]">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161b26] border-2 border-amber-400 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-semibold">{toastMessage}</span>
        </div>
      )}

      <Header
        playerIgn={playerIgn}
        onOpenIgnModal={() => setIsIgnModalOpen(true)}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        currentCurrency={currencyCode}
        onSelectCurrency={setCurrencyCode}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          if (sec === 'store') scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Hero onScrollToCatalog={scrollToCatalog} />

      <main className="flex-1">
        <StoreCatalog
          onSelectItem={(item) => setSelectedItem(item)}
          onAddToCart={handleAddToCart}
          currencySymbol={currency.symbol}
          currencyRate={currency.rate}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          playerIgn={playerIgn}
        />

        <div id="faq">
          <FaqSection />
        </div>
      </main>

      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        playerIgn={playerIgn}
        onOpenIgnModal={() => setIsIgnModalOpen(true)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        discountPercent={discountPercent}
        currencySymbol={currency.symbol}
        currencyRate={currency.rate}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        playerIgn={playerIgn}
        onSetPlayerIgn={handleSaveIgn}
        onClearCart={handleClearCart}
        discountPercent={discountPercent}
        couponCode={couponCode}
        currencySymbol={currency.symbol}
        currencyRate={currency.rate}
      />

      <IgnModal
        isOpen={isIgnModalOpen}
        onClose={() => setIsIgnModalOpen(false)}
        playerIgn={playerIgn}
        onSaveIgn={handleSaveIgn}
      />

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
        currencySymbol={currency.symbol}
        currencyRate={currency.rate}
        playerIgn={playerIgn}
      />
    </div>
  );
}

