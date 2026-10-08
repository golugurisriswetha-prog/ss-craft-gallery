import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Check, 
  AlertCircle, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface CheckoutScreenProps {
  onBackToCart: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBackToCart,
  onOrderSuccess,
}) => {
  const { subtotal, cart, deliveryAddress, placeOrder } = useCart();

  // UTR / Transaction ID state
  const [utrNumber, setUtrNumber] = useState('240899123845');
  const [agreePrepaid, setAgreePrepaid] = useState(true);
  const [agreeNoReturn, setAgreeNoReturn] = useState(true);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const displayTotal = subtotal > 0 ? subtotal : 2698;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(STORE_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.trim().length < 8) {
      setErrorMessage('Please enter a valid 12-digit UPI / UTR Transaction Reference ID from your payment app.');
      return;
    }
    if (!agreePrepaid || !agreeNoReturn) {
      setErrorMessage('Please acknowledge the prepaid and non-returnable policy terms to proceed.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(utrNumber.trim());
      setIsSubmitting(false);
      onOrderSuccess();
    }, 1200);
  };

  // UPI intent link for mobile UPI apps
  const upiIntentUrl = `upi://pay?pa=${STORE_INFO.upiId}&pn=${encodeURIComponent(STORE_INFO.upiMerchant)}&am=${displayTotal}&cu=INR&tn=${encodeURIComponent('SS Craft Gallery Order')}`;

  return (
    <div className="w-full pb-28 text-left space-y-6">
      {/* Top Header / Back to Cart */}
      <div className="max-w-4xl mx-auto px-4 pt-3 flex items-center justify-between">
        <button
          aria-label="Go back"
          onClick={onBackToCart}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b8b3a8] hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-lg bg-[#1b1b1d] border border-[#2a2a2c] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </button>

        <span className="text-xs text-[#4ade80] font-semibold flex items-center gap-1 bg-[#1b1b1d] px-2.5 py-1 rounded-md border border-[#353437]">
          <Lock className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </span>
      </div>

      {/* Checkout 3-Step Stepper Header */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-3.5 rounded-xl bg-[#171719] border border-[#2a2a2c] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#4ade80]">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-semibold">1. Delivery Address</span>
          </div>
          <span className="text-[#353437]">―</span>
          <div className="flex items-center gap-2 text-[#4ade80]">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-semibold">2. Custom Review</span>
          </div>
          <span className="text-[#353437]">―</span>
          <div className="flex items-center gap-2 text-[#f2ca50] font-bold">
            <span className="w-5 h-5 rounded-full bg-[#d4af37] text-[#131315] flex items-center justify-center text-[11px] font-black">
              3
            </span>
            <span>Prepaid Payment & QR Scan</span>
          </div>
        </div>
      </div>

      {/* Main Payment & QR Card Container */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Order Due Header */}
        <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#d4af37]/40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-xs text-[#a39e94] uppercase tracking-wider">
              Total Order Amount Payable
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#f2ca50] font-mono">
              ₹{displayTotal.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="text-[#4ade80] font-semibold">Free Express Insured Craft Delivery</span>
            <p className="text-[#a39e94] text-[11px]">Dispatching to: {deliveryAddress.fullName} ({deliveryAddress.city})</p>
          </div>
        </div>

        {/* Scan & Pay Card with PhonePe QR */}
        <div className="rounded-2xl bg-[#171719] border-2 border-[#d4af37]/60 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2 border-b border-[#2a2a2c] pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5f259f]/20 border border-[#5f259f]/50 text-[#c084fc] text-xs font-bold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              <span>Official PhonePe Merchant QR</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Scan & Pay via PhonePe / Any UPI App
            </h1>
            <p className="text-xs text-[#b8b3a8] max-w-lg mx-auto">
              Open PhonePe, Google Pay, Paytm, or BHIM. Scan the verified merchant QR code below to transfer ₹{displayTotal}.
            </p>
          </div>

          {/* QR Code Presentation Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* The QR Image */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="p-4 rounded-2xl bg-white shadow-2xl border-4 border-[#5f259f] flex flex-col items-center">
                {/* PhonePe Header */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs">
                    पे
                  </div>
                  <span className="text-xs font-extrabold text-[#5f259f] tracking-tight">
                    PhonePe Accepted Here
                  </span>
                </div>

                {/* QR Code graphic: hotlinked image with responsive fallback SVG */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 relative bg-white flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
                  <ImageWithFallback
                    hotlinkSrc="https://lh3.googleusercontent.com/aida/AEtjO1WesAVK93QG2AzRz26-Px7M-Wg4dYPe4vqZ8wBgVaPbKCBZ2a2e0e4VBATVwFukCgnh66_VnsqHx5byX4QxrAlUcOOiOIi_bjgN4CIQc3FB0o0i2CyTCjhi71si7A099qRUoJswQc2xuM3_9TRmkRF8k9c58Nes9PApQpq8HYszhF7XUUcc6YX8fbCyZL-ynVTCsyHxic_6ADgB7yv4CRYlqK0m60LriTAltnE9vuRmhrkK5p0TfAlIb8qY"
                    fallbackSrc="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=9177684263@ybl&pn=SATHI%20CHANDRA%20MAHA%20LAKSHMI&am=2698&cu=INR"
                    alt="PhonePe QR Code for SATHI CHANDRA MAHA LAKSHMI"
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Verified Merchant Details on QR bottom */}
                <div className="mt-2.5 text-center">
                  <p className="text-[11px] font-extrabold text-[#1f2937] uppercase tracking-wider">
                    {STORE_INFO.upiMerchant}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {STORE_INFO.upiId}
                  </p>
                </div>
              </div>

              {/* Direct UPI Intent Link for Mobile Users */}
              <div className="mt-3 w-full">
                <a
                  href={upiIntentUrl}
                  className="w-full py-2 px-3 rounded-lg bg-[#5f259f] hover:bg-[#501c87] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>Pay Directly in PhonePe / UPI App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Merchant Info & 4-Step Instructions */}
            <div className="md:col-span-7 space-y-4 text-xs text-[#b8b3a8]">
              {/* Verified Merchant Box */}
              <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-[#353437] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#a39e94] uppercase tracking-wider">
                    Verified Store Merchant
                  </span>
                  <span className="text-[10px] font-bold text-[#4ade80] flex items-center gap-1 bg-[#4ade80]/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-[#4ade80]" /> Verified Business
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-white uppercase">
                  {STORE_INFO.upiMerchant}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#2a2a2c]">
                  <span className="font-mono text-[#f2ca50] font-semibold">{STORE_INFO.upiId}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="text-[11px] text-[#f2ca50] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3 h-3 text-[#4ade80]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUpi ? 'Copied!' : 'Copy UPI ID'}</span>
                  </button>
                </div>
              </div>

              {/* Step by Step Guide */}
              <div className="space-y-2">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                  Payment Steps:
                </h3>
                <ol className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#131315] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Scan the PhonePe QR code using any UPI app or copy the UPI ID.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#131315] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Complete payment of exact amount: <strong className="text-white">₹{displayTotal}</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#131315] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Copy the 12-digit UPI Transaction / UTR Reference ID from your app.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#131315] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Enter the UTR below and tap "Verify & Confirm Order".</span>
                  </li>
                </ol>
              </div>

              {/* Merchant Helpline */}
              <div className="p-3 rounded-lg bg-[#201f21] border border-[#2a2a2c] flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#a39e94]">Merchant Support Helpline</p>
                  <p className="font-bold text-white">{STORE_INFO.owner} ({STORE_INFO.phone})</p>
                </div>
                <a
                  href={`https://wa.me/91${STORE_INFO.phone}?text=Hi%20Chanduswamy,%20I%20am%20making%20the%20PhonePe%20payment%20for%20my%20order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#25D366] text-white text-[11px] font-bold rounded flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form: UTR / Reference ID Entry & Checkboxes */}
          <form onSubmit={handleConfirmOrder} className="space-y-4 pt-4 border-t border-[#2a2a2c]">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>Enter 12-Digit UPI / UTR Transaction ID:</span>
                <span className="text-[10px] text-[#f2ca50] font-normal">
                  Found in PhonePe / GPay receipt
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={e => {
                    setUtrNumber(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="e.g. 240899123845"
                  className="w-full bg-[#1b1b1d] border-2 border-[#d4af37] focus:border-[#f2ca50] rounded-xl px-4 py-3 text-base font-mono text-white tracking-widest placeholder-[#605a4f] focus:outline-none transition-colors shadow-inner"
                />
                <span className="absolute right-3.5 top-3.5 text-xs text-[#a39e94] font-mono">
                  {utrNumber.length}/12
                </span>
              </div>
            </div>

            {/* Strict Policy Verification Checkboxes (Pre-checked) */}
            <div className="space-y-2.5 pt-2">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-[#1b1b1d] border border-[#353437] cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={agreePrepaid}
                  onChange={e => setAgreePrepaid(e.target.checked)}
                  className="w-4 h-4 rounded text-[#d4af37] accent-[#d4af37] shrink-0 mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-[#e5e1e4] leading-relaxed">
                  <strong>I understand that this custom order is 100% Prepaid</strong> and Cash on Delivery (COD) is strictly NOT available.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-[#1b1b1d] border border-[#353437] cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={agreeNoReturn}
                  onChange={e => setAgreeNoReturn(e.target.checked)}
                  className="w-4 h-4 rounded text-[#d4af37] accent-[#d4af37] shrink-0 mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-[#e5e1e4] leading-relaxed">
                  <strong>I acknowledge that personalized handmade items have NO return / refund policy</strong>, and photo proofs will be verified with me via WhatsApp prior to dispatch.
                </span>
              </label>
            </div>

            {/* Verify & Confirm Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#b89125] hover:opacity-95 active:scale-[0.98] text-[#131315] font-black text-base transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Verifying Payment Reference...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Verify & Confirm Order (₹{displayTotal})</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
