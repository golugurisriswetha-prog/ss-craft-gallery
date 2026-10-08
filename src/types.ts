export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isChoice?: boolean;
  isDealOfTheDay?: boolean;
  dealEndsInHours?: number;
  hotlinkImage: string;
  fallbackImage: string;
  galleryImages: { hotlink: string; fallback: string; label: string }[];
  description: string;
  features: string[];
  dimensions?: string;
  customizationOptions: {
    allowsNames?: boolean;
    namePlaceholder?: string;
    allowsDate?: boolean;
    dateLabel?: string;
    allowsFrameEdge?: boolean;
    frameEdgeOptions?: string[];
    allowsColors?: boolean;
    colorOptions?: { name: string; hex: string; bgClass: string }[];
    allowsPhotoUpload?: boolean;
    photoUploadLabel?: string;
    allowsMessage?: boolean;
    ledBasePrice?: number;
  };
}

export interface CustomizationData {
  customNames?: string;
  specialDate?: string;
  frameEdge?: string;
  selectedColor?: string;
  photoUrl?: string;
  photoFileName?: string;
  customMessage?: string;
  includeLedBase?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  customization?: CustomizationData;
  unitPrice: number;
}

export interface DeliveryAddress {
  fullName: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  insuredPackagingFee: number;
  total: number;
  address: DeliveryAddress;
  utrNumber: string;
  paymentMethod: string;
  orderDate: string;
  status: 'PENDING_VERIFICATION' | 'CRAFTING_IN_PROGRESS' | 'PROOF_SENT_WHATSAPP' | 'DISPATCHED' | 'DELIVERED';
  whatsappLink: string;
}
