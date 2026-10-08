import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Star, 
  Heart, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  MessageCircle, 
  Instagram, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Package,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS, STORE_INFO, CUSTOMER_REVIEWS } from '../data/catalog';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCart: () => void;
  selectedCategory: string | null;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProduct,
  onNavigateToCart,
  selectedCategory,
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Live Countdown timer for Lightning Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flagshipProduct = PRODUCTS[0]; // 3D Resin Frame
  const filteredProducts = selectedCategory
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : PRODUCTS;

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToast(product.title);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="w-full pb-16 space-y-6">
      {/* Toast Notification when item added */}
      {addedToast && (
        <div id="cart-toast" className="fixed bottom-6 right-6 z-50 bg-[#1b1b1d] border-2 border-[#d4af37] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
          <div>
            <p className="text-xs font-bold text-[#f2ca50]">Added to Cart!</p>
            <p className="text-xs text-[#a39e94] max-w-xs truncate">{addedToast}</p>
          </div>
          <button
            onClick={onNavigateToCart}
            className="ml-2 px-3 py-1 bg-[#ff9900] hover:bg-[#e68a00] text-[#131315] font-extrabold text-xs rounded transition-colors"
          >
            <span className="cursor-pointer">View Cart</span>
          </button>
        </div>
      )}

      {/* Hero Promo Banner with Gold Trim */}
      <section className="px-4 pt-2">
        <div className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_30px_rgba(212,175,55,0.18)] bg-gradient-to-r from-[#171719] via-[#201f21] to-[#171719]">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-6 sm:p-8">
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f2ca50] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXQUISITE HANDMADE KEEPSAKES</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Handcrafted With Love <br />
                <span className="gold-gradient-text">by CHANDUSWAMY</span>
              </h1>
              <p className="text-sm sm:text-base text-[#b8b3a8] leading-relaxed max-w-xl">
                Preserve your eternal moments in bespoke <strong className="text-white">3D Floral Resin Frames</strong>, bridal silk bangles, explosion boxes & custom engraved couple accessories.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="order-flagship"
                  onClick={() => onSelectProduct(flagshipProduct)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#b89125] text-[#131315] font-extrabold text-sm sm:text-base shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Order Flagship Resin Frame</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-xs text-[#d4af37] font-semibold flex items-center gap-1.5 py-2 px-3 rounded-lg bg-[#252427]">
                  <span>Starting at ₹1,499</span>
                  <span className="text-[#a39e94]">· Free Express Delivery</span>
                </div>
              </div>
            </div>

            {/* Flagship Product Showcase Card in Hero */}
            <div className="md:col-span-5 flex justify-center">
              <div
                onClick={() => onSelectProduct(flagshipProduct)}
                className="relative group cursor-pointer w-full max-w-sm rounded-xl overflow-hidden border border-[#d4af37]/50 bg-[#131315] p-3 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/60">
                  <ImageWithFallback
                    hotlinkSrc={flagshipProduct.hotlinkImage}
                    fallbackSrc={flagshipProduct.fallbackImage}
                    alt={flagshipProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#ff9900] text-[#131315] text-[10px] font-black px-2 py-0.5 rounded shadow">
                    FLAGSHIP KEEPSAKE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-[#f2ca50] border border-[#d4af37]/40 text-xs font-bold px-2.5 py-1 rounded-md">
                    ₹{flagshipProduct.price} <span className="line-through text-gray-400 text-[10px]">₹{flagshipProduct.originalPrice}</span>
                  </div>
                </div>
                <div className="mt-2 text-left">
                  <p className="text-xs font-bold text-white group-hover:text-[#f2ca50] transition-colors truncate">
                    3D Resin Floral Keepsake Frame
                  </p>
                  <p className="text-[11px] text-[#a39e94]">Sai & Nandu Edition · 4.9 ★ (248 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crucial Store Policy Badges Strip */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ff9900] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-[#ff9900] uppercase tracking-wide">
                STRICT POLICY: 100% Prepaid Only
              </h2>
              <p className="text-[11px] text-[#b8b3a8] mt-0.5">
                No Cash On Delivery (COD) available for any personalized orders.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-rose-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#ff949e] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-[#ff949e] uppercase tracking-wide">
                No Returns / Replacements
              </h2>
              <p className="text-[11px] text-[#b8b3a8] mt-0.5">
                All craft items are 100% custom made-to-order with real preserved florals.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-emerald-500/30 flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-[#4ade80] uppercase tracking-wide">
                WhatsApp Proof Preview
              </h2>
              <p className="text-[11px] text-[#b8b3a8] mt-0.5">
                Photo & video proofs shared on WhatsApp (9177684263) prior to dispatch.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-yellow-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wide">
                Safe Transit Box Packaging
              </h2>
              <p className="text-[11px] text-[#b8b3a8] mt-0.5">
                Multi-layer bubble and wooden frame casing ensures zero breakage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightning Deals & Deal of the Day Section */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-[#201f21] via-[#1b1b1d] to-[#201f21] border border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 bg-[#ff9900] text-[#131315] font-black text-xs rounded uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Deal of the Day
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                Artisan Lightning Deals
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#f2ca50] bg-[#131315] px-3 py-1.5 rounded-lg border border-[#353437]">
              <Clock className="w-4 h-4 text-[#ff9900] animate-pulse" />
              <span>Ends in:</span>
              <span className="font-mono font-bold text-white bg-[#252427] px-1.5 py-0.5 rounded">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Product Cards Grid (Amazon meets Luxury Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(product => {
              const inWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group relative flex flex-col bg-[#1b1b1d] rounded-xl border border-[#2a2a2c] hover:border-[#d4af37]/60 p-3.5 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#131315] mb-3">
                    <ImageWithFallback
                      hotlinkSrc={product.hotlinkImage}
                      fallbackSrc={product.fallbackImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                      {product.isChoice && (
                        <span className="bg-[#232f3e] text-[#f2ca50] text-[9px] font-black px-2 py-0.5 rounded shadow border border-[#f2ca50]/30 uppercase tracking-wider">
                          Amazon's Choice
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-[#ff9900] text-[#131315] text-[9px] font-black px-2 py-0.5 rounded shadow uppercase">
                          SS Bestseller
                        </span>
                      )}
                      {product.isDealOfTheDay && (
                        <span className="bg-[#e05368] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          {product.discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Toggle */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#ff949e] transition-colors"
                      title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 ${inWish ? 'text-[#ff949e] fill-[#ff949e]' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Title & Amazon Ratings */}
                  <div className="flex-1 flex flex-col text-left">
                    <h3 className="font-sans text-sm font-semibold text-[#e5e1e4] line-clamp-2 group-hover:text-[#f2ca50] transition-colors">
                      {product.title}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center text-[#ff9900]">
                        <Star className="w-3.5 h-3.5 fill-[#ff9900]" />
                        <span className="text-xs font-bold ml-1 text-white">{product.rating}</span>
                      </div>
                      <span className="text-xs text-[#a39e94]">({product.reviewCount})</span>
                      <span className="text-[11px] text-[#4ade80] font-medium ml-auto">
                        In Stock
                      </span>
                    </div>

                    {/* Price Block */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#a39e94] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-[#ff9900]">
                        ({product.discountPercentage}% off)
                      </span>
                    </div>

                    <p className="text-[11px] text-[#b8b3a8] mt-1">
                      Free Insured Craft Delivery by <strong className="text-white">Friday</strong>
                    </p>

                    {/* Add to Cart Button */}
                    <div className="mt-3 pt-2 border-t border-[#2a2a2c]/60">
                      <button
                        onClick={e => handleQuickAdd(e, product)}
                        className="w-full py-2 px-3 rounded-lg bg-[#ff9900] hover:bg-[#e68a00] active:scale-[0.98] text-[#131315] font-extrabold text-xs transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artisan Profile & WhatsApp Support Card */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#1b1b1d] border border-[#d4af37]/40 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3 text-left">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4ade80] animate-ping" />
                <span className="text-xs font-bold text-[#4ade80] uppercase tracking-wider">
                  Live Artisan Workshop Online
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Meet the Creator: <span className="text-[#f2ca50]">{STORE_INFO.owner}</span>
              </h2>
              <p className="text-sm text-[#b8b3a8] leading-relaxed">
                Every keepsake at <strong>SS Craft Gallery</strong> is personally handcrafted by Chanduswamy in Hyderabad. We specialize in real floral resin casting, personalized couple gift sets, and bridal keepsakes. Have a custom design idea or specific floral palette? Talk directly with the artisan.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/91${STORE_INFO.phone}?text=Hi%20Chanduswamy!%20I%20am%20browsing%20the%20SS%20Craft%20Gallery%20website%20and%20want%20to%20discuss%20a%20custom%20gift.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {STORE_INFO.phone}</span>
                </a>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform hover:scale-105 shadow"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow {STORE_INFO.instagram}</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#131315] p-5 rounded-xl border border-[#353437] text-left space-y-3">
              <h3 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                Custom Ordering Flow
              </h3>
              <ul className="text-xs text-[#b8b3a8] space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>1. Choose product & enter couple initials / dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>2. Complete 100% prepaid order via PhonePe QR</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>3. Review live photo proof on WhatsApp before dispatch</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Love & Recent Reviews */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white text-left">
              Customer Love & Verified Reviews
            </h2>
            <div className="flex items-center text-xs text-[#f2ca50] gap-1 font-semibold">
              <Star className="w-4 h-4 fill-[#f2ca50]" />
              <span>4.9 / 5 Overall Artisan Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CUSTOMER_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{rev.name}</span>
                    <span className="text-[11px] text-[#a39e94]">{rev.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#ff9900] mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ff9900]" />
                    ))}
                    <span className="text-[10px] text-[#4ade80] ml-2 font-semibold">
                      Verified Order
                    </span>
                  </div>
                  <p className="text-xs text-[#b8b3a8] italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#2a2a2c] text-[10px] text-[#d4af37] font-semibold truncate">
                  Purchased: {rev.product}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
