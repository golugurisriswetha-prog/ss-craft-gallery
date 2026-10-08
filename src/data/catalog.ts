import { Product } from '../types';

export const STORE_INFO = {
  name: 'SS Craft Gallery',
  tagline: 'Handcrafted With Love by CHANDUSWAMY',
  owner: 'CHANDUSWAMY',
  phone: '9177684263',
  whatsappUrl: 'https://wa.me/919177684263',
  instagram: '@ss_craft_gallery_',
  instagramUrl: 'https://instagram.com/ss_craft_gallery_',
  upiMerchant: 'SATHI CHANDRA MAHA LAKSHMI',
  upiId: '9177684263@ybl',
  deliveryAddress: {
    fullName: 'Chanduswamy',
    street: 'Flat 402, Craft Heights',
    area: 'Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    phone: '9177684263',
    isDefault: true,
  },
  policies: [
    {
      icon: 'AlertCircle',
      title: 'STRICT POLICY: 100% Prepaid Only',
      desc: 'No Cash On Delivery (COD) available under any circumstance.',
    },
    {
      icon: 'Ban',
      title: 'No Returns / Replacements',
      desc: 'All items are 100% custom handmade & made-to-order with real preserved florals.',
    },
    {
      icon: 'MessageSquareText',
      title: 'WhatsApp Proof Preview',
      desc: 'Photo & video proof shared on WhatsApp before packing and dispatch.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Safe Transit Box Packaging',
      desc: 'Multi-layer bubble wrap & wooden crate box ensuring zero damage in transit.',
    },
  ],
};

export const CATEGORIES = [
  {
    id: 'resin-frames',
    name: '3D Resin Frames',
    count: '24 items',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    icon: 'Sparkles',
  },
  {
    id: 'thread-bangles',
    name: 'Thread Bangles',
    count: '18 items',
    image: 'https://images.unsplash.com/photo-1611591475871-33109a96e680?w=400&q=80',
    icon: 'CircleDot',
  },
  {
    id: 'explosion-boxes',
    name: 'Explosion Boxes',
    count: '12 items',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
    icon: 'Box',
  },
  {
    id: 'scrapbooks',
    name: 'Scrapbooks',
    count: '15 items',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    icon: 'BookOpen',
  },
  {
    id: '3d-letters',
    name: '3D Letters',
    count: '9 items',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
    icon: 'Type',
  },
  {
    id: 'rakhis',
    name: 'Rakhis',
    count: '16 items',
    image: 'https://images.unsplash.com/photo-1627993077647-83329124be3f?w=400&q=80',
    icon: 'Heart',
  },
  {
    id: 'wallets',
    name: 'Wallets (Men & Women)',
    count: '14 items',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80',
    icon: 'Wallet',
  },
  {
    id: 'numbers',
    name: 'Numbers',
    count: '8 items',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&q=80',
    icon: 'Hash',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-flagship-resin',
    title: 'Custom 3D Resin Art Keepsake Frame with Real Preserved Flowers, Gold Flakes & Custom Couple Initials (Sai & Nandu Edition)',
    subtitle: 'Sai & Nandu The Beginning of Forever Edition',
    category: 'resin-frames',
    price: 1899,
    originalPrice: 2499,
    discountPercentage: 24,
    rating: 4.9,
    reviewCount: 248,
    isBestseller: true,
    isChoice: true,
    isDealOfTheDay: true,
    dealEndsInHours: 6,
    hotlinkImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UKodyrBWuwlkI7-I6vZWPFO0bewHG8laGjKYHlyZwo8wmC8V5bpCj8Ken-Yl82uCp5o573lcwabHjnu32M5S9LjbhGzCAFiQGWCT9gz7sqk8Gmj03rYzI0nX5udvqWIo2O4Zg4rrFOvobTyck9_hmD_LGnRN-47tJVbvf4230gHbpWOq90-lv3o9ZLhkjNF0ckwbD8Vehn28lNQtNNK6quSan3Xil6oQmFb6x312s6fOVQ7sA2SO9C83zT',
    fallbackImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://lh3.googleusercontent.com/aida/AEtjO1UKodyrBWuwlkI7-I6vZWPFO0bewHG8laGjKYHlyZwo8wmC8V5bpCj8Ken-Yl82uCp5o573lcwabHjnu32M5S9LjbhGzCAFiQGWCT9gz7sqk8Gmj03rYzI0nX5udvqWIo2O4Zg4rrFOvobTyck9_hmD_LGnRN-47tJVbvf4230gHbpWOq90-lv3o9ZLhkjNF0ckwbD8Vehn28lNQtNNK6quSan3Xil6oQmFb6x312s6fOVQ7sA2SO9C83zT',
        fallback: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=85',
        label: 'Main 3D Resin Front'
      },
      {
        hotlink: 'https://lh3.googleusercontent.com/aida/AEtjO1WoYuQ4IFH4QwJvogkz964lDbX5w-TeDef0ICuVD7WuWkw_J4hbJwjWdV6_WIGn9v-g0vUtsor17-6r5QmTcombH0tlp8emLuEAKu8oJU6hPy8UQkMo3qmpTAq1YcMqJ4e3OKHMYu9Gvvp_8Yz610Yc_n_sMQstDLqAhUZa_oxgbVk_U-sDd0qF2QwRrUuMpQLZlD71-01IbfbyPK3Wrt2RV7-MqF6SwZHuJ59Y-jJ2DAO1cXomklKjAxw5',
        fallback: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85',
        label: 'Gilded Geode Edge Angle'
      },
      {
        hotlink: 'https://lh3.googleusercontent.com/aida/AEtjO1WwP_pFExwnZ1d4LPKEFClEJnQGucpG2nUxxDUUc_gSxWRv8ZI17nxbY1Y-Rqbxe0Ohfi4AmNxEMaS3Cy8x6-tter6Hl0NyocTpg2aoiQw7O799pD-NWGeaDsXPAqueTDvpidGts9GB2bcbSOZYvHH4bsJ4ydv1_ihdbziA-SBbT_6RUpz16G-ZCby9Ha923TMPIIfClWAlnjBTVfj6vDfvhu_F92lvQpv5_mkPn3Lpiw',
        fallback: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=85',
        label: 'Close-up Real Flora & Gold Flakes'
      }
    ],
    description: 'Heirloom-grade 3D floral preservation art piece cast in ultra-clear optical resin. Handcrafted by Chanduswamy featuring genuine dried rose petals, baby’s breath florals, authentic 24K gold foil flakes, and engraved 3D mirror gold acrylic lettering celebrating your milestone love story.',
    features: [
      'Ultra-clear bubble-free UV stabilized epoxy resin',
      'Real organic botanicals preserved forever without discoloration',
      'Personalized with couple names and special celebration date',
      'Choose between Raw Geode Gold Gilded or Smooth Beveled edges',
      'Comes with sturdy transparent easel stand and luxury gift box packaging'
    ],
    dimensions: '9 inch x 12 inch (Depth 25mm)',
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'e.g., Sai & Nandu',
      allowsDate: true,
      dateLabel: 'Special Date (e.g. Aug 19 2026)',
      allowsFrameEdge: true,
      frameEdgeOptions: ['Raw Geode Gold Gilded', 'Smooth Beveled Edge', 'Frameless Floating Crystal'],
      allowsColors: true,
      colorOptions: [
        { name: 'Crystal Clear & Gold Flakes', hex: '#D4AF37', bgClass: 'bg-amber-400' },
        { name: 'Ocean Turquoise & Pearl', hex: '#00A896', bgClass: 'bg-teal-500' },
        { name: 'Rose Quartz & Blush Pink', hex: '#F4ACB7', bgClass: 'bg-rose-300' },
        { name: 'Emerald Velvet & Gold Leaf', hex: '#028090', bgClass: 'bg-emerald-700' },
      ],
      allowsPhotoUpload: true,
      photoUploadLabel: 'Upload Photo (Optional for Resin Embed)',
      allowsMessage: true,
      ledBasePrice: 299,
    },
  },
  {
    id: 'p-couple-wallet',
    title: 'Personalized Couple Leather Wallet Set (Men & Women) with Engraved Metal Charm',
    subtitle: 'Premium Vegan Leather Duo with Nameplate',
    category: 'wallets',
    price: 799,
    originalPrice: 1099,
    discountPercentage: 27,
    rating: 4.8,
    reviewCount: 162,
    isBestseller: true,
    isDealOfTheDay: false,
    hotlinkImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=85',
        label: 'Wallet Duo'
      }
    ],
    description: 'Complementary pair of high-grade cruelty-free leather wallets. Features personalized metallic name tags and choice of gold-tone charm (Crown, Heart, Infinity). Packaged together in a luxury matte black presentation box.',
    features: [
      'Men’s bi-fold slim wallet with RFID lining',
      'Women’s zipper clutch wallet with 8 card slots & coin pocket',
      'Laser-engraved golden metal nameplate for each wallet',
      'Choice of custom charm included at no extra cost',
    ],
    dimensions: 'Men: 4.5" x 3.5" | Women: 7.5" x 4"',
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'His Name & Her Name (e.g. Rahul & Priya)',
      allowsColors: true,
      colorOptions: [
        { name: 'Classic Tan & Blush Pink', hex: '#D27D2D', bgClass: 'bg-amber-600' },
        { name: 'Midnight Black & Maroon', hex: '#1C1C1C', bgClass: 'bg-neutral-900' },
        { name: 'Olive Green & Grey', hex: '#556B2F', bgClass: 'bg-stone-600' },
      ],
      allowsMessage: true,
    },
  },
  {
    id: 'p-thread-bangles',
    title: 'Silk Thread Bridal Bangles Set (Personalized Names & Custom Color Palette)',
    subtitle: 'Hand-wound Pure Silk Thread with Kundan Embellishments',
    category: 'thread-bangles',
    price: 899,
    originalPrice: 1199,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 94,
    isBestseller: true,
    isDealOfTheDay: true,
    dealEndsInHours: 4,
    hotlinkImage: 'https://images.unsplash.com/photo-1611591475871-33109a96e680?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1611591475871-33109a96e680?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1611591475871-33109a96e680?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1611591475871-33109a96e680?w=800&q=85',
        label: 'Bangle Set'
      }
    ],
    description: 'Traditional craftsmanship meets modern bridal aesthetics. Hand-wound silk thread bangles studded with sparkling zircon crystals and Kundan stone work, custom color-matched to your wedding saree or lehenga.',
    features: [
      'Set of 12 silk thread bangles + 2 centerpiece Kada bangles',
      'Personalized with bride/groom initials in gold mirror acrylic',
      'Available in all bangle sizes (2.2, 2.4, 2.6, 2.8)',
      'Feather-light weight with velvety interior comfort lining',
    ],
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'Names / Initials (e.g. Swetha Weds Vinay)',
      allowsColors: true,
      colorOptions: [
        { name: 'Bridal Crimson Red & Gold', hex: '#990000', bgClass: 'bg-red-700' },
        { name: 'Royal Peacock Blue & Gold', hex: '#002D62', bgClass: 'bg-sky-900' },
        { name: 'Pastel Mint Green & Rose', hex: '#98FB98', bgClass: 'bg-emerald-300' },
      ],
    },
  },
  {
    id: 'p-explosion-box',
    title: 'Luxury 3D Multi-Layer Explosion Box with Photo Popouts & Secret Gift Core',
    subtitle: 'Triple-Layered Surprise Box with 24 Photo Slots',
    category: 'explosion-boxes',
    price: 1299,
    originalPrice: 1799,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 118,
    isBestseller: true,
    isDealOfTheDay: true,
    dealEndsInHours: 8,
    hotlinkImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=85',
        label: 'Explosion Box Unfolded'
      }
    ],
    description: 'When the lid is lifted, the walls explode outward revealing 3 concentric layers of customized photo pockets, origami love waterfall cards, and a surprise mini gift chamber in the center.',
    features: [
      'Accommodates 24 custom printed and laminated photos',
      'Interactive waterfall card mechanism and accordion flaps',
      'Center compartment fits chocolates, ring, watch, or keychain',
      'Handcrafted using 300 GSM metallic imported cardstock',
    ],
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'Recipient Name & Occasion (e.g. Happy Birthday Sneha)',
      allowsPhotoUpload: true,
      photoUploadLabel: 'Upload 12-24 Photos (via WhatsApp after order)',
      allowsColors: true,
      colorOptions: [
        { name: 'Obsidian Black & Gold Glaze', hex: '#1A1A1A', bgClass: 'bg-stone-900' },
        { name: 'Blush Pink & Rose Gold', hex: '#FFB7B2', bgClass: 'bg-rose-400' },
        { name: 'Midnight Navy & Silver', hex: '#001F3F', bgClass: 'bg-indigo-900' },
      ],
    },
  },
  {
    id: 'p-3d-letters',
    title: 'Handcrafted 3D Acrylic & Resin Name Letters (Couple Monogram Decor)',
    subtitle: 'Dual Letter Monogram with Preserved Rose & Micro LED Lights',
    category: '3d-letters',
    price: 999,
    originalPrice: 1399,
    discountPercentage: 29,
    rating: 4.7,
    reviewCount: 78,
    hotlinkImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85',
        label: '3D Monogram'
      }
    ],
    description: 'Contemporary table centerpiece crafted with dual letters and ampersand (&), embedded with miniature botanical florets, micro glitter, and embedded battery-powered fairy lights.',
    features: [
      'Freestanding 6-inch thick crystal-clear resin letters',
      'Built-in micro warm-white LED string with toggle switch',
      'Smooth hand-polished finish with scratch-resistant coat',
    ],
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'Enter 2 Initials (e.g. S & C)',
      allowsColors: true,
      colorOptions: [
        { name: 'Champagne Gold & Clear', hex: '#F7E7CE', bgClass: 'bg-amber-200' },
        { name: 'Ruby Wine & Gold Flakes', hex: '#8B0000', bgClass: 'bg-rose-900' },
      ],
    },
  },
  {
    id: 'p-rakhis',
    title: 'Handmade Designer Rakhis & Artisan Gift Combo (Set of 2)',
    subtitle: 'Resin Flower & Roli-Chawal Keepsake Hamper',
    category: 'rakhis',
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    rating: 4.9,
    reviewCount: 312,
    hotlinkImage: 'https://images.unsplash.com/photo-1627993077647-83329124be3f?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1627993077647-83329124be3f?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1627993077647-83329124be3f?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1627993077647-83329124be3f?w=800&q=85',
        label: 'Designer Rakhi'
      }
    ],
    description: 'Bespoke brother-sister keepsake featuring a miniature preserved flower resin dial threaded with organic spun cotton threads and gold pearls. Includes silver glass Roli Chawal bottles.',
    features: [
      'Can be detached after festivities to use as a personalized keychain or pendant',
      'Skin-friendly organic cotton threads',
      'Includes handcrafted message greeting card',
    ],
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'Brother’s Name (e.g. Chandu / Bhaiya)',
    },
  },
  {
    id: 'p-scrapbook',
    title: 'Personalized Memory Scrapbook (Vintage Kraft Accordion Album)',
    subtitle: '40 Pages with Handmade Flaps & Embellishments',
    category: 'scrapbooks',
    price: 1149,
    originalPrice: 1599,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 65,
    hotlinkImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=85',
        label: 'Scrapbook Album'
      }
    ],
    description: 'A sentimental chronicle for anniversaries, birthdays, or friendships. Filled with envelope inserts, quote scrolls, vintage stamps, and dedicated photo corners.',
    features: [
      'Wooden laser-cut cover with customized couple name engraving',
      'High thickness 250 GSM antique kraft sheets',
      'Includes metallic marker pen and retro photo corner stickers',
    ],
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'Title for Cover (e.g. Our 5-Year Journey)',
      allowsDate: true,
      dateLabel: 'Commemoration Year / Date',
    },
  },
  {
    id: 'p-numbers',
    title: 'Milestone Birthday / Anniversary 3D Floral Resin Number Keepsake',
    subtitle: 'Custom Numbers (0-9) Embedded with Real Roses & Fairy Lights',
    category: 'numbers',
    price: 1399,
    originalPrice: 1899,
    discountPercentage: 26,
    rating: 4.9,
    reviewCount: 88,
    hotlinkImage: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=85',
    galleryImages: [
      {
        hotlink: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=85',
        fallback: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=85',
        label: 'Milestone Number'
      }
    ],
    description: 'Celebrate turning 25, 50, 1st birthday, or golden jubilees. Solid 8-inch resin numerals filled with fresh-dried blossoms and shimmering foil.',
    features: [
      'Choice of any single or double digit (e.g., "1", "18", "25", "50")',
      'Heavy weighted base for standalone shelf display',
      'Customized with miniature name banner across the center',
    ],
    customizationOptions: {
      allowsNames: true,
      namePlaceholder: 'Number (e.g. 25) & Name (e.g. Sai)',
      allowsColors: true,
      colorOptions: [
        { name: 'Golden Glow & Yellow Petals', hex: '#FFD700', bgClass: 'bg-yellow-400' },
        { name: 'Lavender Violet & Silver', hex: '#E6E6FA', bgClass: 'bg-purple-300' },
      ],
    },
  },
];

export const CUSTOMER_REVIEWS = [
  {
    name: 'Pooja Reddy',
    location: 'Hyderabad',
    rating: 5,
    date: '2 days ago',
    verified: true,
    review: 'Received the Sai & Nandu 3D Resin frame yesterday for my anniversary! The flowers look so alive and the gold leaf edges are pure luxury. Chanduswamy sent photo proofs on WhatsApp before sending. 10/10 recommend!',
    product: '3D Resin Keepsake Frame',
  },
  {
    name: 'Vikram & Ananya',
    location: 'Bangalore',
    rating: 5,
    date: '1 week ago',
    verified: true,
    review: 'Was initially hesitant about the 100% prepaid policy, but the trust and responsiveness of Chanduswamy via WhatsApp put us completely at ease. The leather wallet set and explosion box arrived in spotless wooden crated packing.',
    product: 'Couple Leather Wallet Set',
  },
  {
    name: 'Harika Naidu',
    location: 'Vijayawada',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    review: 'The silk thread bangles matched my bridal lehenga to perfection! The Kundan detailing is so neatly finished and lightweight. Thank you SS Craft Gallery!',
    product: 'Silk Thread Bridal Bangles Set',
  },
];
