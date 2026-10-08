import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Package, 
  MapPin, 
  Clock, 
  Printer, 
  Share2, 
  ArrowRight 
} from 'lucide-react';
import { Order } from '../types';
import { STORE_INFO } from '../data/catalog';

interface OrderSuccessModalProps {
  order: Order;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#171719] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.3)] text-left space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#4ade80] border-2 border-[#4ade80] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(74,222,128,0.4)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
            Payment Verified & Order Received
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Thank You, {order.address.fullName}!
          </h1>
          <p className="text-xs text-[#a39e94]">
            Order Reference: <strong className="font-mono text-[#f2ca50] text-sm">#{order.orderId}</strong>
          </p>
        </div>

        {/* Essential Action: Direct WhatsApp Trigger to Send Photos/Confirm */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-3">
          <div className="flex items-center gap-2 text-[#4ade80] font-bold text-sm">
            <MessageCircle className="w-5 h-5" />
            <span>Next Step: Confirm Customization on WhatsApp</span>
          </div>
          <p className="text-xs text-[#e5e1e4] leading-relaxed">
            Please tap below to send your order receipt and any custom photos directly to owner <strong>CHANDUSWAMY</strong> on WhatsApp. We will prepare your design proof before permanent resin casting.
          </p>
          <a
            href={order.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order Details to Chanduswamy (WhatsApp)</span>
          </a>
        </div>

        {/* Order Details & Delivery Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#b8b3a8]">
          <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Delivery Destination
            </span>
            <p className="font-bold text-white">{order.address.fullName}</p>
            <p>{order.address.street}, {order.address.city} - {order.address.pincode}</p>
            <p className="text-[#a39e94]">Phone: {order.address.phone}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Payment Summary
            </span>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <strong className="text-white font-mono">₹{order.total.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="text-[#4ade80] font-semibold">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>UTR Reference:</span>
              <span className="font-mono text-white text-[11px]">{order.utrNumber}</span>
            </div>
          </div>
        </div>

        {/* Crafting Timeline Progress */}
        <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] space-y-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> Crafting & Delivery Timeline
          </span>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="p-2 rounded-lg bg-[#201f21] border border-[#d4af37]/40 text-[#f2ca50] font-semibold">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] mx-auto mb-1" />
              1. Order Placed
            </div>
            <div className="p-2 rounded-lg bg-[#201f21] text-[#b8b3a8]">
              <div className="w-2 h-2 rounded-full bg-[#353437] mx-auto mb-1" />
              2. Resin Casting
            </div>
            <div className="p-2 rounded-lg bg-[#201f21] text-[#b8b3a8]">
              <div className="w-2 h-2 rounded-full bg-[#353437] mx-auto mb-1" />
              3. WhatsApp Proof
            </div>
            <div className="p-2 rounded-lg bg-[#201f21] text-[#b8b3a8]">
              <div className="w-2 h-2 rounded-full bg-[#353437] mx-auto mb-1" />
              4. Dispatched
            </div>
          </div>
        </div>

        {/* Modal Bottom Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="py-2.5 px-4 rounded-xl bg-[#201f21] hover:bg-[#2a2a2c] text-[#e5e1e4] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#353437]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onNewOrder}
            className="py-2.5 px-5 rounded-xl bg-[#d4af37] hover:bg-[#b89125] text-[#131315] text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow"
          >
            <span>Back to Storefront</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
