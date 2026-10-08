import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CustomizationData, DeliveryAddress, Order } from '../types';
import { PRODUCTS, STORE_INFO } from '../data/catalog';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  activeOrder: Order | null;
  deliveryAddress: DeliveryAddress;
  addToCart: (product: Product, quantity?: number, customization?: CustomizationData) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  updateAddress: (newAddress: Partial<DeliveryAddress>) => void;
  placeOrder: (utrNumber: string) => Order;
  resetOrder: () => void;
  subtotal: number;
  totalSavings: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'initial-item-1',
    productId: 'p-flagship-resin',
    product: PRODUCTS[0],
    quantity: 1,
    unitPrice: 1899,
    customization: {
      customNames: 'Sai & Nandu',
      specialDate: 'Aug 19 2026',
      frameEdge: 'Raw Geode Gold Gilded',
      selectedColor: 'Crystal Clear & Gold Flakes',
      customMessage: 'The Beginning of Forever',
      includeLedBase: false,
    },
  },
  {
    id: 'initial-item-2',
    productId: 'p-couple-wallet',
    product: PRODUCTS[1],
    quantity: 1,
    unitPrice: 799,
    customization: {
      customNames: 'Rahul & Priya',
      selectedColor: 'Classic Tan & Blush Pink',
      customMessage: 'Engraved with Crown Charm',
    },
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ss_craft_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CART_ITEMS;
      }
    }
    return INITIAL_CART_ITEMS;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ss_craft_wishlist');
    return saved ? JSON.parse(saved) : ['p-flagship-resin'];
  });

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>(() => {
    const saved = localStorage.getItem('ss_craft_address');
    return saved ? JSON.parse(saved) : STORE_INFO.deliveryAddress;
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('ss_craft_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ss_craft_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ss_craft_address', JSON.stringify(deliveryAddress));
  }, [deliveryAddress]);

  const addToCart = (product: Product, quantity = 1, customization?: CustomizationData) => {
    let extraPrice = 0;
    if (customization?.includeLedBase && product.customizationOptions?.ledBasePrice) {
      extraPrice = product.customizationOptions.ledBasePrice;
    }
    const unitPrice = product.price + extraPrice;

    const newItem: CartItem = {
      id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      productId: product.id,
      product,
      quantity,
      customization,
      unitPrice,
    };

    setCart(prev => [newItem, ...prev]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const updateAddress = (newAddress: Partial<DeliveryAddress>) => {
    setDeliveryAddress(prev => ({ ...prev, ...newAddress }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const totalSavings = cart.reduce(
    (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (utrNumber: string): Order => {
    const orderId = 'SS-' + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const itemsSummary = cart
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.title.slice(0, 40)} (Qty: ${it.quantity}) - ₹${it.unitPrice * it.quantity}${
            it.customization?.customNames ? ` [Custom: ${it.customization.customNames}]` : ''
          }`
      )
      .join('%0A');

    const whatsappMessage = `*New Order Placed on SS Craft Gallery Website!*%0A%0A*Order ID:* ${orderId}%0A*Total Paid:* ₹${subtotal}%0A*UTR/Txn ID:* ${utrNumber}%0A*Customer:* ${deliveryAddress.fullName}%0A*Phone:* ${deliveryAddress.phone}%0A*Address:* ${deliveryAddress.street}, ${deliveryAddress.city} - ${deliveryAddress.pincode}%0A%0A*Items Ordered:*%0A${itemsSummary}%0A%0APlease confirm my order and share photo proofs before dispatch! ❤️`;

    const whatsappLink = `https://wa.me/91${STORE_INFO.phone}?text=${whatsappMessage}`;

    const newOrder: Order = {
      orderId,
      items: [...cart],
      subtotal,
      discount: totalSavings,
      deliveryFee: 0,
      insuredPackagingFee: 0,
      total: subtotal,
      address: { ...deliveryAddress },
      utrNumber,
      paymentMethod: 'PhonePe / UPI Prepaid',
      orderDate,
      status: 'PENDING_VERIFICATION',
      whatsappLink,
    };

    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const resetOrder = () => {
    setActiveOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        activeOrder,
        deliveryAddress,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        updateAddress,
        placeOrder,
        resetOrder,
        subtotal,
        totalSavings,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
