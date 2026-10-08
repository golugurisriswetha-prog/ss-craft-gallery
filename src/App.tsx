/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PRODUCTS, STORE_INFO } from './data/catalog';
import { Product } from './types';
import { Phone, Instagram, ShieldCheck, Heart, Sparkles, Smartphone, Monitor } from 'lucide-react';

function AppContent() {
  const { activeOrder, resetOrder } = useCart();
  const [currentScreen, setCurrentScreen] = useState<'home' | 'product' | 'cart' | 'checkout'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileFrameView, setIsMobileFrameView] = useState<boolean>(false);

  const handleNavigate = (screen: 'home' | 'product' | 'cart' | 'checkout', productId?: string) => {
    if (productId) {
      const prod = PRODUCTS.find(p => p.id === productId);
      if (prod) setSelectedProduct(prod);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isMobileFrameView={isMobileFrameView}
        onToggleFrameView={() => setIsMobileFrameView(!isMobileFrameView)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {isMobileFrameView ? (
          /* Mobile Device Frame Mockup (Matches Stitch 390px mobile canvas) */
          <div className="py-6 px-2 flex flex-col items-center w-full">
            <div className="text-center mb-3">
              <span className="text-[11px] font-semibold text-[#f2ca50] bg-[#252427] px-3 py-1 rounded-full border border-[#d4af37]/30">
                Stitch Mobile Canvas View (390px) · Tap "Responsive Web View" above to expand
              </span>
            </div>
            
            <div className="w-[390px] min-h-[844px] bg-[#131315] rounded-[44px] border-[10px] border-[#2a2a2c] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative">
              {/* Phone Notch / Dynamic Island */}
              <div className="w-full bg-[#131315] pt-3 pb-2 px-6 flex justify-between items-center text-[11px] font-bold text-gray-400 select-none z-30">
                <span>9:41</span>
                <div className="w-24 h-4 bg-black rounded-full" />
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded border border-gray-400 bg-white" />
                </div>
              </div>

              {/* Scrollable Mobile Screen Body */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {currentScreen === 'home' && (
                  <>
                    <CategoryBar
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                    <HomeScreen
                      onSelectProduct={handleSelectProduct}
                      onNavigateToCart={() => handleNavigate('cart')}
                      selectedCategory={selectedCategory}
                    />
                  </>
                )}

                {currentScreen === 'product' && (
                  <ProductDetailScreen
                    product={selectedProduct}
                    onBack={() => handleNavigate('home')}
                    onNavigateToCart={() => handleNavigate('cart')}
                    onNavigateToCheckout={() => handleNavigate('checkout')}
                  />
                )}

                {currentScreen === 'cart' && (
                  <CartScreen
                    onNavigateToHome={() => handleNavigate('home')}
                    onNavigateToCheckout={() => handleNavigate('checkout')}
                    onSelectProduct={id => handleNavigate('product', id)}
                  />
                )}

                {currentScreen === 'checkout' && (
                  <CheckoutScreen
                    onBackToCart={() => handleNavigate('cart')}
                    onOrderSuccess={() => {}}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Responsive Full Web Layout */
          <div className="w-full flex flex-col">
            {currentScreen === 'home' && (
              <>
                <CategoryBar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <HomeScreen
                  onSelectProduct={handleSelectProduct}
                  onNavigateToCart={() => handleNavigate('cart')}
                  selectedCategory={selectedCategory}
                />
              </>
            )}

            {currentScreen === 'product' && (
              <ProductDetailScreen
                product={selectedProduct}
                onBack={() => handleNavigate('home')}
                onNavigateToCart={() => handleNavigate('cart')}
                onNavigateToCheckout={() => handleNavigate('checkout')}
              />
            )}

            {currentScreen === 'cart' && (
              <CartScreen
                onNavigateToHome={() => handleNavigate('home')}
                onNavigateToCheckout={() => handleNavigate('checkout')}
                onSelectProduct={id => handleNavigate('product', id)}
              />
            )}

            {currentScreen === 'checkout' && (
              <CheckoutScreen
                onBackToCart={() => handleNavigate('cart')}
                onOrderSuccess={() => {}}
              />
            )}
          </div>
        )}
      </main>

      {/* Order Success Receipt Modal */}
      {activeOrder && (
        <OrderSuccessModal
          order={activeOrder}
          onClose={resetOrder}
          onNewOrder={() => {
            resetOrder();
            handleNavigate('home');
          }}
        />
      )}

      {/* Website Footer */}
      <footer className="w-full bg-[#0e0e10] border-t border-[#201f21] py-10 px-4 mt-auto text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-[#a39e94]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-white">SS Craft Gallery</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/30">
                OFFICIAL
              </span>
            </div>
            <p className="text-xs text-[#b8b3a8] leading-relaxed">
              Heirloom 3D resin floral preservation frames, bridal silk thread bangles, explosion boxes & customized keepsakes. Handcrafted by <strong>{STORE_INFO.owner}</strong> in Hyderabad.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://wa.me/91${STORE_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {STORE_INFO.phone}</span>
              </a>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201f21] text-white font-semibold text-xs border border-[#353437]"
              >
                <Instagram className="w-3.5 h-3.5 text-[#ffbec2]" />
                <span>{STORE_INFO.instagram}</span>
              </a>
            </div>
          </div>

          {/* Quick Screen Navigation */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">
              Prototype Flow
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => handleNavigate('home')}
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  Screen 1: Amazon-Style Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('product', 'p-flagship-resin')}
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  Screen 2: 3D Resin Keepsake Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('cart')}
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  Screen 3: Shopping Cart (2 items)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('checkout')}
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  Screen 4: Prepaid Checkout & PhonePe QR
                </button>
              </li>
            </ul>
          </div>

          {/* Store Policies */}
          <div className="md:col-span-5 space-y-2">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">
              Important Policies & Trust
            </p>
            <ul className="space-y-2 text-xs text-[#b8b3a8]">
              <li className="flex items-start gap-2">
                <span className="text-[#ff9900] font-bold">⚠️</span>
                <span><strong>100% Prepaid Only:</strong> Strict policy, no COD available for any custom handmade items.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">🚫</span>
                <span><strong>No Returns / Replacements:</strong> Custom resin items with names & preserved flowers are non-returnable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">✓</span>
                <span><strong>WhatsApp Proof Verification:</strong> Photo proofs shared on WhatsApp (9177684263) prior to dispatch.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#201f21] flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#7d776a]">
          <p>© {new Date().getFullYear()} SS Craft Gallery by Chanduswamy. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#d4af37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified PhonePe Merchant: {STORE_INFO.upiMerchant}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
