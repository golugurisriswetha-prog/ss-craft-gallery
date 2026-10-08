import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  ShieldAlert, 
  Lock, 
  Sparkles, 
  Check, 
  Upload, 
  MessageSquare, 
  Calendar, 
  Layers, 
  Info, 
  ShoppingBag, 
  Zap, 
  Phone,
  ZoomIn
} from 'lucide-react';
import { Product, CustomizationData } from '../types';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onNavigateToCart: () => void;
  onNavigateToCheckout: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onNavigateToCart,
  onNavigateToCheckout,
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Customization state
  const [customNames, setCustomNames] = useState('Sai & Nandu');
  const [specialDate, setSpecialDate] = useState('Aug 19 2026');
  const [selectedFrameEdge, setSelectedFrameEdge] = useState(
    product.customizationOptions?.frameEdgeOptions?.[0] || 'Raw Geode Gold Gilded'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.customizationOptions?.colorOptions?.[0]?.name || 'Crystal Clear & Gold Flakes'
  );
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('The Beginning of Forever');
  const [includeLedBase, setIncludeLedBase] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeImage = product.galleryImages[selectedImageIndex] || {
    hotlink: product.hotlinkImage,
    fallback: product.fallbackImage,
    label: product.title,
  };

  const calculatedPrice = product.price + (includeLedBase ? (product.customizationOptions?.ledBasePrice || 299) : 0);

  const handleAddToCart = () => {
    const customization: CustomizationData = {
      customNames,
      specialDate,
      frameEdge: selectedFrameEdge,
      selectedColor,
      photoFileName: uploadedPhotoName || undefined,
      customMessage: customNote,
      includeLedBase,
    };
    addToCart(product, 1, customization);
    setToastMessage('Added to Cart! Customize more or proceed to Checkout.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    const customization: CustomizationData = {
      customNames,
      specialDate,
      frameEdge: selectedFrameEdge,
      selectedColor,
      photoFileName: uploadedPhotoName || undefined,
      customMessage: customNote,
      includeLedBase,
    };
    addToCart(product, 1, customization);
    onNavigateToCheckout();
  };

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedPhotoName(e.target.files[0].name);
    }
  };

  return (
    <div className="w-full pb-28 text-left space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1b1b1d] border-2 border-[#d4af37] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#f2ca50]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={onNavigateToCart}
            className="px-2.5 py-1 bg-[#ff9900] text-[#131315] font-bold text-xs rounded hover:bg-[#e68a00]"
          >
            Go to Cart
          </button>
        </div>
      )}

      {/* Breadcrumb & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-3 flex items-center justify-between">
        <button
          aria-label="Go back"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b8b3a8] hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-lg bg-[#1b1b1d] border border-[#2a2a2c] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-2 rounded-lg bg-[#1b1b1d] border border-[#2a2a2c] text-[#b8b3a8] hover:text-[#ff949e] transition-colors"
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'text-[#ff949e] fill-[#ff949e]' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Product link copied to clipboard!');
              }
            }}
            className="p-2 rounded-lg bg-[#1b1b1d] border border-[#2a2a2c] text-[#b8b3a8] hover:text-[#d4af37] transition-colors"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Product Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[3/4] sm:aspect-square w-full rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 bg-[#171719] shadow-2xl group">
            <ImageWithFallback
              hotlinkSrc={activeImage.hotlink}
              fallbackSrc={activeImage.fallback}
              alt={activeImage.label}
              className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            <div className="absolute top-3 left-3 bg-[#ff9900] text-[#131315] text-[10px] font-black px-2.5 py-1 rounded shadow uppercase">
              #1 Best Seller in Resin Art Crafts
            </div>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/20 hover:bg-black"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Click to reset' : 'Hover / Click to Zoom'}</span>
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {product.galleryImages.map((img, idx) => {
              const isActive = selectedImageIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    isActive
                      ? 'border-[#d4af37] ring-2 ring-[#d4af37]/40 scale-105'
                      : 'border-[#2a2a2c] opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    hotlinkSrc={img.hotlink}
                    fallbackSrc={img.fallback}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Artisan Authenticity Guarantee Strip */}
          <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#d4af37] font-bold">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Artisan Direct Guarantee · SS Craft Gallery</span>
            </div>
            <p className="text-[#a39e94] leading-relaxed">
              Every flower petal in this frame is harvested at peak bloom, desiccated using silica crystals over 14 days, and embedded in optical UV-resistant epoxy. Personally crafted by <strong>CHANDUSWAMY</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Customization Studio, Policies */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Title */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              SS Craft Gallery Flagship Collection
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {product.title}
            </h1>

            {/* Ratings & Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center text-[#ff9900]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff9900]" />
                ))}
                <span className="ml-1.5 text-xs font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-xs text-[#a39e94]">({product.reviewCount} customer reviews)</span>
              <span className="text-xs text-[#d4af37]">· Verified Artisan Piece</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#d4af37]/40 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-[#a39e94] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-bold text-[#ff9900]">
                ({product.discountPercentage}% OFF)
              </span>
            </div>
            <p className="text-[11px] text-[#4ade80] font-medium">
              Inclusive of all taxes · Free Express Insured Delivery included
            </p>
          </div>

          {/* Interactive Customization Studio */}
          <div className="p-5 rounded-xl bg-[#171719] border border-[#2a2a2c] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2a2a2c] pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Personalization Studio
                </h2>
              </div>
              <span className="text-[10px] text-[#f2ca50] bg-[#d4af37]/20 px-2 py-0.5 rounded font-semibold">
                REQUIRED
              </span>
            </div>

            {/* Couple Initials / Names Input */}
            {product.customizationOptions?.allowsNames && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#b8b3a8] flex items-center justify-between">
                  <span>Enter Custom Couple Names / Initials:</span>
                  <span className="text-[10px] text-[#7d776a]">e.g. Sai & Nandu</span>
                </label>
                <input
                  type="text"
                  value={customNames}
                  onChange={e => setCustomNames(e.target.value)}
                  placeholder="e.g. Sai & Nandu"
                  className="w-full bg-[#1b1b1d] border border-[#353437] focus:border-[#d4af37] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* Special Celebration Date */}
            {product.customizationOptions?.allowsDate && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#b8b3a8] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Wedding / Anniversary Date:</span>
                </label>
                <input
                  type="text"
                  value={specialDate}
                  onChange={e => setSpecialDate(e.target.value)}
                  placeholder="e.g. Aug 19 2026"
                  className="w-full bg-[#1b1b1d] border border-[#353437] focus:border-[#d4af37] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* Frame Edge Selector */}
            {product.customizationOptions?.allowsFrameEdge && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#b8b3a8] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Choice of Frame Edge:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.customizationOptions.frameEdgeOptions?.map(edge => {
                    const isSelected = selectedFrameEdge === edge;
                    return (
                      <button
                        key={edge}
                        type="button"
                        onClick={() => setSelectedFrameEdge(edge)}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f2ca50]'
                            : 'border-[#353437] bg-[#1b1b1d] text-[#b8b3a8] hover:border-[#4d4635]'
                        }`}
                      >
                        <span>{edge}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            {product.customizationOptions?.allowsColors && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b8b3a8]">
                  Resin Botanical Color Palette: <span className="text-[#f2ca50]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.customizationOptions.colorOptions?.map(c => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#252427] text-white ring-2 ring-[#d4af37]/40'
                            : 'border-[#353437] bg-[#1b1b1d] text-[#a39e94] hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/50"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Inscription / Subtitle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#b8b3a8] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Custom Banner Quote / Subtitle:</span>
              </label>
              <input
                type="text"
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                placeholder="e.g. The Beginning of Forever"
                className="w-full bg-[#1b1b1d] border border-[#353437] focus:border-[#d4af37] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            {/* Photo Upload Option */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-[#b8b3a8] flex items-center justify-between">
                <span>Couple Photo Embedding:</span>
                <span className="text-[10px] text-[#a39e94]">Optional</span>
              </label>
              <div className="border border-dashed border-[#353437] hover:border-[#d4af37] rounded-xl p-3 text-center bg-[#1b1b1d] transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSimulatePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-1">
                  <Upload className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs text-white font-medium">
                    {uploadedPhotoName ? `Uploaded: ${uploadedPhotoName}` : 'Click to select photo for resin embed'}
                  </span>
                  <span className="text-[10px] text-[#7d776a]">
                    Or send photos directly on WhatsApp to Chanduswamy after order confirmation
                  </span>
                </div>
              </div>
            </div>

            {/* LED Base Addon Toggle */}
            <div className="pt-2">
              <label className="flex items-center justify-between p-3 rounded-lg bg-[#1b1b1d] border border-[#353437] cursor-pointer hover:border-[#d4af37]/60 transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeLedBase}
                    onChange={e => setIncludeLedBase(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ff9900] accent-[#ff9900]"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">Add Warm Wooden LED Light Base (+₹299)</p>
                    <p className="text-[10px] text-[#a39e94]">USB-powered illuminated nightstand display</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#f2ca50]">+₹299</span>
              </label>
            </div>
          </div>

          {/* Prominent Store Policy Notice Cards */}
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-amber-500/40 flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#ff9900] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#ff9900] uppercase tracking-wide">
                  Prepaid Order Only — No COD Available
                </h3>
                <p className="text-[11px] text-[#b8b3a8] mt-0.5 leading-relaxed">
                  Due to the customized nature and materials involved, SS Craft Gallery processes 100% prepaid orders exclusively via PhonePe / UPI QR payment.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-rose-500/40 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#ff949e] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#ff949e] uppercase tracking-wide">
                  Non-Returnable & Non-Refundable
                </h3>
                <p className="text-[11px] text-[#b8b3a8] mt-0.5 leading-relaxed">
                  Being personalized with custom names and real botanicals, this product cannot be cancelled or returned once casting has begun.
                </p>
              </div>
            </div>
          </div>

          {/* Artisan Badge */}
          <div className="p-4 rounded-xl bg-[#131315] border border-[#2a2a2c] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs">
              <p className="text-white font-bold">Handcrafted by {STORE_INFO.owner}</p>
              <p className="text-[#a39e94] text-[11px]">Helpline: {STORE_INFO.phone} · Instagram: {STORE_INFO.instagram}</p>
            </div>
            <a
              href={`https://wa.me/91${STORE_INFO.phone}?text=Hi%20Chanduswamy,%20I%20have%20questions%20about%20the%20Sai%20%26%20Nandu%20Resin%20Keepsake%20Frame.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#252427] hover:bg-[#20ba59] text-white text-xs font-medium transition-colors border border-[#353437]"
            >
              <Phone className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="py-3.5 px-4 rounded-xl bg-[#ff9900] hover:bg-[#e68a00] active:scale-[0.98] text-[#131315] font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#b89125] hover:opacity-95 active:scale-[0.98] text-[#131315] font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-[#131315]" />
              <span>Buy Now (Prepaid)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
