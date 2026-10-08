import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  AlertTriangle, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Phone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface CartScreenProps {
  onNavigateToHome: () => void;
  onNavigateToCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  onNavigateToHome,
  onNavigateToCheckout,
  onSelectProduct,
}) => {
  const { 
    cart, 
    subtotal, 
    totalSavings, 
    itemCount, 
    removeFromCart, 
    updateQuantity, 
    deliveryAddress,
    toggleWishlist,
    isInWishlist
  } = useCart();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(deliveryAddress);

  return (
    <div className="w-full pb-28 text-left space-y-6">
      {/* Top Header / Back link */}
      <div className="max-w-7xl mx-auto px-4 pt-3 flex items-center justify-between">
        <button
          data-path="home"
          onClick={onNavigateToHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b8b3a8] hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-lg bg-[#1b1b1d] border border-[#2a2a2c] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Craft Shopping</span>
        </button>

        <span className="text-xs text-[#d4af37] font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SS Craft Gallery Cart</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Warning Banner & Cart Items List */}
        <div className="lg:col-span-8 space-y-5">
          {/* Amazon-style Clear Amber Warning Box */}
          <div className="p-4 rounded-xl bg-amber-950/40 border-2 border-amber-500/60 flex items-start gap-3.5 shadow-lg">
            <AlertTriangle className="w-5 h-5 text-[#ff9900] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-[#ff9900] uppercase tracking-wide">
                Important Notice: 100% Prepaid Orders Only
              </h2>
              <p className="text-xs text-[#e5e1e4] leading-relaxed">
                SS Craft Gallery accepts <strong>100% Prepaid Orders only</strong> via PhonePe / UPI QR scan. No Cash On Delivery (COD) is available. All items are made-to-order and non-returnable. Proof preview will be shared on WhatsApp prior to dispatch.
              </p>
            </div>
          </div>

          {/* Cart Items Container */}
          <div className="bg-[#171719] border border-[#2a2a2c] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#2a2a2c] pb-3">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Shopping Cart
              </h1>
              <span className="text-xs text-[#a39e94]">Price</span>
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#353437] mx-auto" />
                <p className="text-sm font-semibold text-white">Your Craft Cart is Empty</p>
                <p className="text-xs text-[#a39e94]">Explore our bespoke 3D resin keepsakes & handmade gifts.</p>
                <button
                  onClick={onNavigateToHome}
                  className="mt-3 px-5 py-2.5 bg-[#d4af37] text-[#131315] font-bold text-xs rounded-lg hover:opacity-90"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#2a2a2c]">
                {cart.map((item, idx) => {
                  const inWish = isInWishlist(item.productId);
                  return (
                    <div
                      key={item.id}
                      id={`item-card-${idx + 1}`}
                      className="py-5 flex flex-col sm:flex-row gap-4 sm:items-start"
                    >
                      {/* Product Thumbnail */}
                      <div
                        onClick={() => onSelectProduct(item.productId)}
                        className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-[#131315] shrink-0 border border-[#353437] cursor-pointer group"
                      >
                        <ImageWithFallback
                          hotlinkSrc={item.product.hotlinkImage}
                          fallbackSrc={item.product.fallbackImage}
                          alt={item.product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            onClick={() => onSelectProduct(item.productId)}
                            className="font-sans text-sm font-bold text-white hover:text-[#f2ca50] cursor-pointer transition-colors leading-snug line-clamp-2"
                          >
                            {item.product.title}
                          </h3>
                          <span className="font-mono text-base font-extrabold text-white shrink-0">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#4ade80] font-semibold">In Stock</span>
                          <span className="text-[11px] text-[#a39e94]">· Handcrafted to order</span>
                          <span className="text-[10px] text-[#f2ca50] bg-[#d4af37]/20 border border-[#d4af37]/40 px-1.5 py-0.2 rounded font-bold uppercase">
                            Gift Customized
                          </span>
                        </div>

                        {/* Customization Details Pill/Box */}
                        {item.customization && (
                          <div className="p-2.5 rounded-lg bg-[#1b1b1d] border border-[#2a2a2c] text-[11px] text-[#b8b3a8] space-y-1">
                            {item.customization.customNames && (
                              <p>
                                <strong className="text-white">Custom Names:</strong> {item.customization.customNames}
                              </p>
                            )}
                            {item.customization.specialDate && (
                              <p>
                                <strong className="text-white">Occasion Date:</strong> {item.customization.specialDate}
                              </p>
                            )}
                            {item.customization.frameEdge && (
                              <p>
                                <strong className="text-white">Frame Edge:</strong> {item.customization.frameEdge}
                              </p>
                            )}
                            {item.customization.selectedColor && (
                              <p>
                                <strong className="text-white">Color Palette:</strong> {item.customization.selectedColor}
                              </p>
                            )}
                            {item.customization.includeLedBase && (
                              <p className="text-[#f2ca50] font-semibold">
                                + Included Warm LED Light Base (+₹299)
                              </p>
                            )}
                          </div>
                        )}

                        {/* Quantity Stepper & Actions */}
                        <div className="flex flex-wrap items-center gap-4 pt-1">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-[#353437] rounded-lg bg-[#131315] px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#a39e94] hover:text-white transition-colors"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-white font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#a39e94] hover:text-white transition-colors"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>

                          <button
                            onClick={() => toggleWishlist(item.productId)}
                            className="inline-flex items-center gap-1 text-xs text-[#a39e94] hover:text-[#ff949e] transition-colors"
                          >
                            <Heart className={`w-3.5 h-3.5 ${inWish ? 'text-[#ff949e] fill-[#ff949e]' : ''}`} />
                            <span>{inWish ? 'Saved in Wishlist' : 'Save for Later'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Delivery Address Section */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#171719] border border-[#2a2a2c] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Insured Delivery Address
                </h3>
              </div>
              <button
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-xs font-semibold text-[#f2ca50] hover:underline"
              >
                {isEditingAddress ? 'Done Editing' : 'Change Address'}
              </button>
            </div>

            {isEditingAddress ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={addressForm.fullName}
                  onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className="bg-[#1b1b1d] border border-[#353437] rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={addressForm.phone}
                  onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="bg-[#1b1b1d] border border-[#353437] rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Street / Flat"
                  value={addressForm.street}
                  onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="sm:col-span-2 bg-[#1b1b1d] border border-[#353437] rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="bg-[#1b1b1d] border border-[#353437] rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={addressForm.pincode}
                  onChange={e => setAddressForm({ ...addressForm, pincode: e.target.value })}
                  className="bg-[#1b1b1d] border border-[#353437] rounded-lg px-3 py-2 text-white"
                />
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#1b1b1d] border border-[#353437] text-xs text-[#b8b3a8] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{deliveryAddress.fullName}</p>
                  <p>{deliveryAddress.street}, {deliveryAddress.city} - {deliveryAddress.pincode}</p>
                  <p className="text-[#a39e94]">Phone: {deliveryAddress.phone}</p>
                </div>
                <span className="text-[10px] font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded border border-[#4ade80]/20">
                  STANDARD CRAFT PACK
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Trigger */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#171719] border-2 border-[#d4af37]/50 shadow-2xl space-y-4">
            <div className="border-b border-[#2a2a2c] pb-3">
              <span className="text-xs text-[#a39e94] uppercase tracking-wider font-semibold">
                Order Summary
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-medium text-white">Subtotal ({itemCount} items):</span>
                <span className="text-2xl font-black text-white font-mono">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#b8b3a8]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono text-white font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#4ade80]">
                <span>Insured Wooden Packaging:</span>
                <span className="font-bold uppercase">FREE</span>
              </div>
              <div className="flex justify-between text-[#4ade80]">
                <span>Express Craft Courier Delivery:</span>
                <span className="font-bold uppercase">FREE</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[#ff9900] pt-1 border-t border-[#2a2a2c]">
                  <span>Total Festival Discount:</span>
                  <span className="font-bold">-₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Total Amount Due */}
            <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-[#353437] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#a39e94]">Amount Payable</span>
                <p className="text-xl font-extrabold text-[#f2ca50] font-mono">
                  ₹{subtotal.toLocaleString('en-IN')}
                </p>
              </div>
              <span className="text-[10px] text-[#4ade80] font-bold uppercase tracking-wider bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
                100% Prepaid
              </span>
            </div>

            {/* Proceed to Buy Button (Amazon Style Amber Button) */}
            <button
              id="checkout-cta"
              disabled={cart.length === 0}
              onClick={onNavigateToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#ff9900] hover:bg-[#e68a00] active:scale-[0.98] text-[#131315] font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Proceed to Buy (Prepaid Only)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#7d776a]">
              Instant QR Scan via PhonePe, GPay, Paytm on the next screen.
            </p>
          </div>

          {/* Need Assistance Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1b1b1d] border border-[#353437] text-xs text-[#b8b3a8] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <MessageSquare className="w-4 h-4 text-[#d4af37]" />
              <span>Need Customization Assistance?</span>
            </div>
            <p className="leading-relaxed">
              Have questions about names, dates, or custom floral arrangements? Chat directly with owner <strong>{STORE_INFO.owner}</strong> on WhatsApp or Instagram.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={`https://wa.me/91${STORE_INFO.phone}?text=Hi%20Chanduswamy,%20I%20have%20questions%20about%20my%20cart%20customization%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-[#25D366] text-white font-bold text-center flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp: {STORE_INFO.phone}</span>
              </a>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-[#252427] text-white font-semibold text-center hover:bg-[#353437] transition-colors border border-[#353437]"
              >
                Follow on Instagram ({STORE_INFO.instagram})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
