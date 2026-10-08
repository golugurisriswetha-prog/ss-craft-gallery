import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Search, 
  Phone, 
  Instagram, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  ChevronDown,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO, PRODUCTS } from '../data/catalog';
import { Product } from '../types';

interface HeaderProps {
  currentScreen: 'home' | 'product' | 'cart' | 'checkout';
  onNavigate: (screen: 'home' | 'product' | 'cart' | 'checkout', productId?: string) => void;
  isMobileFrameView: boolean;
  onToggleFrameView: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  isMobileFrameView,
  onToggleFrameView,
  onSelectProduct,
}) => {
  const { itemCount, subtotal, wishlist, deliveryAddress } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchResultClick = (product: Product) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    if (onSelectProduct) {
      onSelectProduct(product);
    }
    onNavigate('product', product.id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#131315]/95 backdrop-blur-md border-b border-[#2a2a2c]">
      {/* Prototype Mode Bar / Screen Quick Switcher */}
      <div className="bg-[#1b1b1d] border-b border-[#2a2a2c]/80 px-3 py-1.5 text-xs text-[#a39e94]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-[10px] mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#d4af37]" /> Screens:
            </span>
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                currentScreen === 'home'
                  ? 'bg-[#d4af37] text-[#131315] font-bold shadow-sm'
                  : 'bg-[#201f21] text-[#e5e1e4] hover:bg-[#2a2a2c]'
              }`}
            >
              1. Store Home
            </button>
            <button
              onClick={() => onNavigate('product', 'p-flagship-resin')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                currentScreen === 'product'
                  ? 'bg-[#d4af37] text-[#131315] font-bold shadow-sm'
                  : 'bg-[#201f21] text-[#e5e1e4] hover:bg-[#2a2a2c]'
              }`}
            >
              2. 3D Resin Details
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${
                currentScreen === 'cart'
                  ? 'bg-[#d4af37] text-[#131315] font-bold shadow-sm'
                  : 'bg-[#201f21] text-[#e5e1e4] hover:bg-[#2a2a2c]'
              }`}
            >
              3. Cart ({itemCount})
            </button>
            <button
              onClick={() => onNavigate('checkout')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${
                currentScreen === 'checkout'
                  ? 'bg-[#d4af37] text-[#131315] font-bold shadow-sm'
                  : 'bg-[#201f21] text-[#e5e1e4] hover:bg-[#2a2a2c]'
              }`}
            >
              4. Prepaid Checkout & QR
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onToggleFrameView}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors border ${
                isMobileFrameView
                  ? 'bg-[#d4af37]/15 text-[#f2ca50] border-[#d4af37]/40'
                  : 'bg-[#201f21] text-[#a39e94] border-[#353437] hover:text-white'
              }`}
              title="Toggle mobile device frame preview like Stitch"
            >
              {isMobileFrameView ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span className="font-semibold">Mobile Preview (390px)</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-gray-400" />
                  <span>Responsive Web View</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Bar */}
      <div className="bg-[#0e0e10] border-b border-[#201f21] px-4 py-1 text-xs text-[#b8b3a8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="text-[#a39e94]">Deliver to</span>
            <span className="font-medium text-[#e5e1e4] truncate">
              {deliveryAddress.fullName} - {deliveryAddress.city} {deliveryAddress.pincode}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <a
              href={`https://wa.me/91${STORE_INFO.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#4ade80] hover:underline"
            >
              <Phone className="w-3 h-3" />
              WhatsApp Help: 9177684263
            </a>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#ffbec2] hover:underline"
            >
              <Instagram className="w-3 h-3" />
              {STORE_INFO.instagram}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col text-left group shrink-0 focus:outline-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#f2ca50] transition-colors">
              SS Craft Gallery
            </span>
            <span className="inline-block text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/30">
              PRO
            </span>
          </div>
          <span className="text-[10px] text-[#99907c] tracking-wider uppercase">
            by Chanduswamy
          </span>
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#99907c] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search 3D Resin frames, silk bangles, explosion boxes..."
              className="w-full bg-[#1b1b1d] border border-[#353437] focus:border-[#d4af37] rounded-lg pl-9 pr-8 py-1.5 text-sm text-[#e5e1e4] placeholder-[#7d776a] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-[#99907c] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#1b1b1d] border border-[#353437] rounded-lg shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-[#2a2a2c] text-[11px] font-semibold text-[#99907c] uppercase">
                Matching Craft Products ({searchResults.length})
              </div>
              {searchResults.map(prod => (
                <button
                  key={prod.id}
                  onClick={() => handleSearchResultClick(prod)}
                  className="w-full p-2.5 flex items-center gap-3 hover:bg-[#252427] transition-colors text-left border-b border-[#201f21] last:border-none"
                >
                  <img
                    src={prod.fallbackImage}
                    alt={prod.title}
                    className="w-10 h-10 object-cover rounded bg-[#131315]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#e5e1e4] truncate">{prod.title}</p>
                    <p className="text-xs text-[#d4af37] font-bold">₹{prod.price}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions: Wishlist & Cart */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="hidden md:flex flex-col items-center text-xs text-[#b8b3a8] hover:text-[#d4af37] transition-colors"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#ff949e] fill-[#ff949e]' : 'text-gray-400'}`} />
            <span className="text-[10px] mt-0.5">Saved ({wishlist.length})</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => onNavigate('cart')}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              currentScreen === 'cart'
                ? 'bg-[#d4af37] text-[#131315] border-[#d4af37] font-bold shadow-md'
                : 'bg-[#1b1b1d] hover:bg-[#252427] text-[#e5e1e4] border-[#353437]'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#ff9900] text-[#131315] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] leading-tight opacity-75">Cart Total</span>
              <span className="text-xs font-bold leading-tight">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
