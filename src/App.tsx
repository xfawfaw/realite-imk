import React, { useState, useEffect } from 'react';
import SqueezeCarousel, { type SqueezeSlide } from '@/components/ui/carousel-squeeze';
import { 
  Search, 
  Swords, 
  ShieldAlert, 
  Ruler, 
  MessageCircle, 
  ArrowRight, 
  X, 
  Check, 
  Trash2, 
  Plus, 
  Edit3, 
  Send, 
  Camera, 
  Lock, 
  Download, 
  Upload, 
  RotateCcw,
  ZoomIn,
  MapPin,
  User,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Sun,
  Moon,
  ShoppingBag,
  Sliders,
  Zap,
  Gift,
  Info,
  ArrowUp,
  ArrowDown,
  Eye,
  Layers
} from 'lucide-react';

/* =========================================================================
   OFFICIAL CONFIGURATION & VERIFIED WHATSAPP NUMBER
   ========================================================================= */

export const OFFICIAL_WA_NUMBER = "6282114072159"; // +62 821-1407-2159

export type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  fitType: string;
  fabricMaterial: string;
  fabricGsm: number;
  printType: string;
  status: "READY" | "PREORDER" | "SOLDOUT";
  colorTheme: string;
  graphicAccent: string;
  description: string;
  image: string;
  gallery?: string[];
  sizes: { size: string; stock: number; available: boolean }[];
  measurements?: { size: string; ld: number; pb: number; pl: number }[];
};

export type CartItem = {
  id: string;
  productId: number;
  name: string;
  sku: string;
  price: number;
  size: string;
  qty: number;
  image: string;
  fitType: string;
  fabricGsm: number;
};

export type SizeMetric = {
  size: string;
  ld: number; // Lebar Dada (cm)
  pb: number; // Panjang Baju (cm)
  pl: number; // Panjang Lengan (cm)
  shoulderDrop: string;
  tbRange: string;
  bbRange: string;
  persona: string;
  desc: string;
  deltaRegular: string;
};

export const STANDARD_SIZE_METRICS: SizeMetric[] = [
  {
    size: "S",
    ld: 54,
    pb: 68,
    pl: 23,
    shoulderDrop: "2.5 cm",
    tbRange: "155 - 165 cm",
    bbRange: "45 - 55 kg",
    persona: "Compact Boxy",
    desc: "Drop shoulder 2.5 cm • Pas di pinggang • Siluet boxy proporsional.",
    deltaRegular: "+4 cm vs Reguler"
  },
  {
    size: "M",
    ld: 57,
    pb: 71,
    pl: 24,
    shoulderDrop: "3.2 cm",
    tbRange: "165 - 172 cm",
    bbRange: "55 - 65 kg",
    persona: "Street Standard",
    desc: "Drop shoulder 3.2 cm • Pas celana • Siluet streetwear harian.",
    deltaRegular: "+6 cm vs Reguler"
  },
  {
    size: "L",
    ld: 60,
    pb: 74,
    pl: 25,
    shoulderDrop: "4.0 cm",
    tbRange: "172 - 178 cm",
    bbRange: "65 - 75 kg",
    persona: "Signature Boxy",
    desc: "Drop shoulder 4.0 cm • Katun 16s/14s tebal • Drape kokoh gagah.",
    deltaRegular: "+8 cm vs Reguler"
  },
  {
    size: "XL",
    ld: 63,
    pb: 77,
    pl: 26,
    shoulderDrop: "4.8 cm",
    tbRange: "178 - 185 cm",
    bbRange: "75 - 85 kg",
    persona: "Loose Oversized",
    desc: "Drop shoulder 4.8 cm • Lengan dekat siku • Aura underground grunge.",
    deltaRegular: "+10 cm vs Reguler"
  },
  {
    size: "XXL",
    ld: 66,
    pb: 80,
    pl: 27,
    shoulderDrop: "5.5 cm",
    tbRange: "> 185 cm",
    bbRange: "> 85 kg",
    persona: "Mega Baggy",
    desc: "Lebar 66 cm • Drape ultra lebar • Siluet skater & hip-hop.",
    deltaRegular: "+12 cm vs Reguler"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "YOU ARE SICK Boxy Heavyweight Tee",
    sku: "DDC-TC-001",
    category: "Boxy Tee",
    price: 185000,
    fitType: "Boxy Fit",
    fabricMaterial: "Heavyweight Cotton Combed 16s",
    fabricGsm: 235,
    printType: "High-Density Stag Beetle Graphic Print",
    status: "READY",
    colorTheme: "#18181b",
    graphicAccent: "#7A0006",
    image: "/images/you-are-sick-front.jpg",
    gallery: [
      "/images/you-are-sick-front.jpg",
      "/images/you-are-sick-alley-bike.jpg",
      "/images/you-are-sick-detail.jpg",
      "/images/you-are-sick-front.jpg"
    ],
    description: "Signature 235 GSM boxy cut t-shirt dengan siluet drop shoulder lebar dan potongan crop hem streetwear. Menggunakan katun combed 16s berbobot 235 GSM dan sablon 'YOU ARE SICK' dengan grafis kumbang tanduk (stag beetle) khas kultur underground Jogja.",
    sizes: [
      { size: "S", stock: 6, available: true },
      { size: "M", stock: 12, available: true },
      { size: "L", stock: 18, available: true },
      { size: "XL", stock: 8, available: true },
      { size: "XXL", stock: 4, available: true }
    ]
  },
  {
    id: 2,
    name: "NERO X DEDICATE Collab Oversized Tee",
    sku: "DDC-CL-002",
    category: "Oversized Tee",
    price: 210000,
    fitType: "Loose Oversized",
    fabricMaterial: "Ultra-Combed Cotton Heavy 16s",
    fabricGsm: 240,
    printType: "High-Density Halftone Screenprint + Bold Typography",
    status: "READY",
    colorTheme: "#0d0d0f",
    graphicAccent: "#A60009",
    image: "/images/nero-front-dragon.jpg",
    gallery: [
      "/images/nero-front-dragon.jpg",
      "/images/nero-crew-studio.jpg",
      "/images/nero-dragon-print.jpg",
      "/images/nero-alley-motor.jpg"
    ],
    description: "Kolaborasi orisinal eksklusif dengan NERO CREW. Katun combed 16s seberat 240 GSM yang kokoh dengan drape jatuh sempurna. Menampilkan grafis naga ikonik 'ONLY FOR NERO HOMMIES' di bagian depan dan tipografi bold 'N.E.R.O CREW' di punggung. Sablon teknik raster dot-work tahan cuci berkali-kali.",
    sizes: [
      { size: "S", stock: 8, available: true },
      { size: "M", stock: 15, available: true },
      { size: "L", stock: 20, available: true },
      { size: "XL", stock: 12, available: true },
      { size: "XXL", stock: 6, available: true }
    ]
  },
  {
    id: 3,
    name: "SYSTEM COLLAPSE Acid Washed Boxy Tee",
    sku: "DDC-TC-003",
    category: "Boxy Tee",
    price: 195000,
    fitType: "Boxy Fit",
    fabricMaterial: "Vintage Washed Cotton 14s",
    fabricGsm: 260,
    printType: "Plastisol Curing with Grayscale Halftone",
    status: "READY",
    colorTheme: "#27272a",
    graphicAccent: "#e4e4e7",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    description: "Katun super tebal 14s seberat 260 GSM melalui pencucian acid wash manual. Tekstur warna arang vintage berkarakter dengan tipografi Y2K industrial di punggung.",
    sizes: [
      { size: "S", stock: 2, available: true },
      { size: "M", stock: 5, available: true },
      { size: "L", stock: 9, available: true },
      { size: "XL", stock: 4, available: true },
      { size: "XXL", stock: 0, available: false }
    ]
  },
  {
    id: 4,
    name: "DEDICATE SACRIFICE Red Handprint Tee",
    sku: "DDC-TC-004",
    category: "Heavyweight Tee",
    price: 185000,
    fitType: "Boxy Fit",
    fabricMaterial: "Heavyweight Cotton Combed 16s",
    fabricGsm: 235,
    printType: "High-Density Blood Red Handprint & Typography",
    status: "READY",
    colorTheme: "#1c1917",
    graphicAccent: "#b91c1c",
    image: "/images/dedicate-sacrifice-vespa.jpg",
    gallery: [
      "/images/dedicate-sacrifice-vespa.jpg",
      "/images/dedicate-sacrifice-skate.jpg",
      "/images/dedicate-sacrifice-vespa.jpg",
      "/images/dedicate-sacrifice-skate.jpg"
    ],
    description: "Edisi filosofis Dedicaterealite bertema 'Sacrifice'. Menggunakan katun combed 16s 235 GSM tebal dengan artwork sablon cap tangan merah darah dan teks manifestasi dedikasi. Dilengkapi rib leher tebal anti melar.",
    sizes: [
      { size: "S", stock: 5, available: true },
      { size: "M", stock: 10, available: true },
      { size: "L", stock: 14, available: true },
      { size: "XL", stock: 6, available: true },
      { size: "XXL", stock: 2, available: true }
    ]
  },
  {
    id: 5,
    name: "REALITE CYBERNETIC Longsleeve",
    sku: "DDC-LS-005",
    category: "Longsleeve",
    price: 225000,
    fitType: "Boxy Fit",
    fabricMaterial: "Heavyweight Cotton Combed 16s",
    fabricGsm: 235,
    printType: "High-Density Sleeve Tribal & Minimal Chest",
    status: "READY",
    colorTheme: "#3b0707",
    graphicAccent: "#f4f4f0",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    description: "Kaos lengan panjang warna deep burgundy crimson dengan sablon tribal gothic di kedua lengan serta logo minimal di dada. Dilengkapi rib elastis tebal di pergelangan tangan.",
    sizes: [
      { size: "S", stock: 3, available: true },
      { size: "M", stock: 5, available: true },
      { size: "L", stock: 7, available: true },
      { size: "XL", stock: 4, available: true },
      { size: "XXL", stock: 0, available: false }
    ]
  },
  {
    id: 6,
    name: "VOID DIVISION Heavy Boxy Zip Hoodie",
    sku: "DDC-HD-006",
    category: "Outerwear",
    price: 340000,
    fitType: "Loose Oversized",
    fabricMaterial: "Heavyweight Cotton Fleece",
    fabricGsm: 380,
    printType: "Puff Embroidery + Screenprint on Back",
    status: "SOLDOUT",
    colorTheme: "#141416",
    graphicAccent: "#7A0006",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80",
    description: "Hoodie zipper siluet oversized lebar dengan bobot katun fleece 380 GSM yang kokoh dan tebal. Bordir timbul (puff embroidery) logo Dedicaterealite di dada dan sablon punggung artistik.",
    sizes: [
      { size: "S", stock: 0, available: false },
      { size: "M", stock: 0, available: false },
      { size: "L", stock: 0, available: false },
      { size: "XL", stock: 0, available: false },
      { size: "XXL", stock: 0, available: false }
    ]
  }
];

export type ShowcaseSlideItem = {
  id: string;
  dropCode: string;
  title: string;
  description: string;
  actionText: string;
  image: string;
  linkedProductId?: number;
};

export const INITIAL_SHOWCASE_SLIDES: ShowcaseSlideItem[] = [
  {
    id: "nero-collab",
    dropCode: "DROP 01 // NERO CREW COLLAB",
    title: "NERO X DEDICATE — Heavyweight Collab Drop.",
    description: "240 GSM ultra-combed cotton with front dragon artwork & bold N.E.R.O CREW backprint. Edisi kolaborasi terbatas Yogyakarta streetwear.",
    actionText: "Lihat Detail Kaos",
    image: "/images/nero-rooftop-duo.png",
    linkedProductId: 2
  },
  {
    id: "you-are-sick",
    dropCode: "DROP 02 // 235 GSM BOXY",
    title: "YOU ARE SICK — Signature 235 GSM Boxy Cut.",
    description: "Drop shoulder silhouette dengan grafis kumbang tanduk stag beetle dan tipografi brutalist. 235 GSM heavyweight cotton combed 16s.",
    actionText: "Lihat Detail Kaos",
    image: "/images/you-are-sick-alley-bike.jpg",
    linkedProductId: 1
  },
  {
    id: "dedicate-sacrifice",
    dropCode: "DROP 03 // SACRIFICE EDITION",
    title: "DEDICATE SACRIFICE — Red Handprint Series.",
    description: "Eksplorasi kultur skate & urban Jogja dengan artwork cap tangan merah darah berfilosofi dedikasi dan pengorbanan.",
    actionText: "Lihat Detail Kaos",
    image: "/images/dedicate-sacrifice-skate.jpg",
    linkedProductId: 4
  },
  {
    id: "system-collapse",
    dropCode: "DROP 04 // ACID WASH 260 GSM",
    title: "SYSTEM COLLAPSE — 260 GSM Acid Washed Vintage Charcoal.",
    description: "14s vintage washed heavyweight cotton with industrial Y2K typography across the back and heavy drape.",
    actionText: "Buka Battle-Room",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    linkedProductId: 3
  },
  {
    id: "cybernetic-ls",
    dropCode: "DROP 05 // CYBERNETIC LS",
    title: "CYBERNETIC ARCHIVE — Burgundy Crimson Heavy Longsleeve.",
    description: "Deep burgundy wine heavyweight cotton with high-density tribal sleeves and ribbed cuffs designed for layering.",
    actionText: "Eksplor Longsleeve",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    linkedProductId: 5
  },
  {
    id: "void-hoodie",
    dropCode: "DROP 06 // 380 GSM FLEECE",
    title: "VOID DIVISION — 380 GSM Heavy Boxy Zip Hoodie.",
    description: "Substantial cotton fleece with tonal 3D puff embroidery and double-lined hood for cold Yogyakarta underground nights.",
    actionText: "Cek Ketersediaan",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80",
    linkedProductId: 6
  }
];

export type LookbookItem = {
  id: string;
  tag: string;
  title: string;
  location: string;
  specs: string;
  image: string;
  caption?: string;
  linkedProductId?: number;
};

export const INITIAL_LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "lb-01",
    tag: "DROP 01 // ROOFTOP SESSION",
    title: "NERO CREW MIDNIGHT HANGOUT",
    location: "Rooftop Lounge, Yogyakarta",
    specs: "240 GSM • Front Dragon & Back Bold Print",
    image: "/images/nero-rooftop-duo.png",
    caption: "Suasana santai malam hari menampilkan siluet depan naga dan sablon punggung N.E.R.O CREW.",
    linkedProductId: 2
  },
  {
    id: "lb-02",
    tag: "EDITORIAL // YOU ARE SICK",
    title: "ALLEYWAY MIDNIGHT RIDERS",
    location: "Lorong Bersejarah, Yogyakarta",
    specs: "235 GSM • Stag Beetle Boxy Tee",
    image: "/images/you-are-sick-alley-bike.jpg",
    caption: "Dua model mengenakan kaos hitam YOU ARE SICK di atas motor trail malam hari.",
    linkedProductId: 1
  },
  {
    id: "lb-03",
    tag: "SKATE ARCHIVE // CAR WASH",
    title: "CAR WASH SKATE SESSION",
    location: "Laxy Car Wash, Yogyakarta",
    specs: "Heavyweight Combed 16s • Balaclava Look",
    image: "/images/dedicate-sacrifice-skate.jpg",
    caption: "Sesi skate malam hari dengan balaclava dan kaos Dedicate Sacrifice cap tangan merah.",
    linkedProductId: 4
  },
  {
    id: "lb-04",
    tag: "SCOOTER CULTURE // NIGHT RUN",
    title: "VESPA SPRINT MIDNIGHT RUN",
    location: "Tugu & Malioboro Outer Circle, Yogyakarta",
    specs: "235 GSM • Red Handprint Backprint",
    image: "/images/dedicate-sacrifice-vespa.jpg",
    caption: "Riding santai malam hari mengendarai Vespa Sprint mengenakan kaos Dedicate Sacrifice.",
    linkedProductId: 4
  },
  {
    id: "lb-05",
    tag: "STUDIO ARCHIVE // CREW",
    title: "CONCRETE STUDIO & TWO-TONE CREW",
    location: "Underground Creative Studio, Yogyakarta",
    specs: "Heavy Cotton Combed 16s • Bold Back Print",
    image: "/images/nero-crew-studio.jpg",
    caption: "Dua model menampilkan artwork punggung N.E.R.O CREW dengan kontras warna merah dan hitam.",
    linkedProductId: 2
  },
  {
    id: "lb-06",
    tag: "FIT CHECK // FULL BODY",
    title: "YOU ARE SICK FIT CHECK",
    location: "Billiard Lounge, Yogyakarta",
    specs: "235 GSM Boxy Cut • Light Blue Denim",
    image: "/images/you-are-sick-front.jpg",
    caption: "Proporsi siluet boxy cut jatuh sempurna di bahu dipadukan denim biru terang.",
    linkedProductId: 1
  },
  {
    id: "lb-07",
    tag: "DETAIL // STAG BEETLE PRINT",
    title: "YOU ARE SICK TEXTURE",
    location: "Dedicate Screenprint Workshop",
    specs: "High-Density Plastisol • Glossy Beetle Overlay",
    image: "/images/you-are-sick-detail.jpg",
    caption: "Close-up tipografi YOU ARE SICK dengan overlay artwork kumbang tanduk hitam mengkilap.",
    linkedProductId: 1
  },
  {
    id: "lb-08",
    tag: "PRINT ARCHIVE // DRAGON",
    title: "HIGH-DENSITY HALFTONE DRAGON",
    location: "Screenprint Workshop, Yogyakarta",
    specs: "Plastisol Curing • Halftone Micro Dot-Work",
    image: "/images/nero-dragon-print.jpg",
    caption: "Detail ketajaman sisik naga dengan teknik raster dot-work presisi tinggi pada katun tebal.",
    linkedProductId: 2
  }
];

export default function App() {
  // Master State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dedicaterealite_react_products_v5');
      if (saved) return JSON.parse(saved);
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [waNumber, setWaNumber] = useState<string>(() => {
    return localStorage.getItem('dedicaterealite_wa_number') || OFFICIAL_WA_NUMBER;
  });

  const [announcementText, setAnnouncementText] = useState<string>(() => {
    return localStorage.getItem('dedicaterealite_announcement') || 
      "⚡ FREE SHIPPING JOGJA AREA • NEW DROP: NERO X DEDICATE 240 GSM • SQUEEZE CAROUSEL SHOWCASE • WA ORDER REDIRECTION • STREETWEAR YOGYAKARTA";
  });

  // Navigation & Filter State
  const [comparisonList, setComparisonList] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [fitFilter, setFitFilter] = useState<string>("ALL");
  const [gsmFilter, setGsmFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  // Shopping Bag / Multi-Item Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dedicaterealite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);

  // Smart Fit & Size Recommendation Calculator State
  const [userHeight, setUserHeight] = useState<number>(172); // cm
  const [userWeight, setUserWeight] = useState<number>(65); // kg
  const [fitPreference, setFitPreference] = useState<"boxy" | "baggy">("boxy");
  const [sizeGuideTab, setSizeGuideTab] = useState<"calculator" | "table">("calculator");

  // Modals State
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [inspectedSize, setInspectedSize] = useState<string>("L");
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [activeAngleIndex, setActiveAngleIndex] = useState<number>(0);
  const [isBattleRoomOpen, setIsBattleRoomOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [showDraftPreview, setShowDraftPreview] = useState<boolean>(false);

  // Buyer Info for WhatsApp Checkout
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerCity, setBuyerCity] = useState<string>("");
  const [buyerNotes, setBuyerNotes] = useState<string>("");

  // Admin CMS State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminPasscode, setAdminPasscode] = useState<string>("");
  const [adminActiveTab, setAdminActiveTab] = useState<"products" | "showcase" | "lookbook" | "settings" | "backup">("products");
  const [adminSearch, setAdminSearch] = useState<string>("");
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>("ALL");
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adminTheme, setAdminTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem('dedicaterealite_admin_theme') as "light" | "dark") || "light";
  });

  // Showcase CMS State
  const [showcaseSlides, setShowcaseSlides] = useState<ShowcaseSlideItem[]>(() => {
    try {
      const saved = localStorage.getItem('dedicaterealite_showcase_slides_v5');
      if (saved) return JSON.parse(saved);
      return INITIAL_SHOWCASE_SLIDES;
    } catch (e) {
      return INITIAL_SHOWCASE_SLIDES;
    }
  });
  const [isShowcaseFormOpen, setIsShowcaseFormOpen] = useState<boolean>(false);
  const [editingShowcase, setEditingShowcase] = useState<ShowcaseSlideItem | null>(null);
  const [showcaseDropCode, setShowcaseDropCode] = useState("");
  const [showcaseTitle, setShowcaseTitle] = useState("");
  const [showcaseDesc, setShowcaseDesc] = useState("");
  const [showcaseActionText, setShowcaseActionText] = useState("Lihat Detail Kaos");
  const [showcaseImage, setShowcaseImage] = useState("");
  const [showcaseLinkedId, setShowcaseLinkedId] = useState<number | undefined>(undefined);

  // Lookbook CMS State
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>(() => {
    try {
      const saved = localStorage.getItem('dedicaterealite_lookbook_items_v5');
      if (saved) return JSON.parse(saved);
      return INITIAL_LOOKBOOK_ITEMS;
    } catch (e) {
      return INITIAL_LOOKBOOK_ITEMS;
    }
  });
  const [isLookbookFormOpen, setIsLookbookFormOpen] = useState<boolean>(false);
  const [editingLookbook, setEditingLookbook] = useState<LookbookItem | null>(null);
  const [lookbookTag, setLookbookTag] = useState("");
  const [lookbookTitle, setLookbookTitle] = useState("");
  const [lookbookLocation, setLookbookLocation] = useState("");
  const [lookbookSpecs, setLookbookSpecs] = useState("");
  const [lookbookImage, setLookbookImage] = useState("");
  const [lookbookCaption, setLookbookCaption] = useState("");
  const [lookbookLinkedId, setLookbookLinkedId] = useState<number | undefined>(undefined);

  // Product Form Input State
  const [formName, setFormName] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formCategory, setFormCategory] = useState("Boxy Tee");
  const [formPrice, setFormPrice] = useState(185000);
  const [formGsm, setFormGsm] = useState(235);
  const [formMaterial, setFormMaterial] = useState("Heavyweight Cotton Combed 16s");
  const [formFit, setFormFit] = useState("Boxy Fit");
  const [formPrint, setFormPrint] = useState("Plastisol High-Density");
  const [formStatus, setFormStatus] = useState<"READY" | "PREORDER" | "SOLDOUT">("READY");
  const [formImage, setFormImage] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formSizesStock, setFormSizesStock] = useState<{ [key: string]: number }>({
    S: 5, M: 10, L: 15, XL: 8, XXL: 2
  });

  // Toast
  const [toastMsg, setToastMsg] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);

  const showToast = (text: string, type: "success" | "info" | "warning" = "info") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Sync LocalStorage
  useEffect(() => {
    localStorage.setItem('dedicaterealite_react_products_v5', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dedicaterealite_showcase_slides_v5', JSON.stringify(showcaseSlides));
  }, [showcaseSlides]);

  useEffect(() => {
    localStorage.setItem('dedicaterealite_lookbook_items_v5', JSON.stringify(lookbookItems));
  }, [lookbookItems]);

  useEffect(() => {
    localStorage.setItem('dedicaterealite_wa_number', waNumber);
  }, [waNumber]);

  useEffect(() => {
    localStorage.setItem('dedicaterealite_announcement', announcementText);
  }, [announcementText]);

  useEffect(() => {
    localStorage.setItem('dedicaterealite_admin_theme', adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    localStorage.setItem('dedicaterealite_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Helpers
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const mark = (text: string) => (
    <span className="text-xs font-mono font-bold tracking-wider text-white bg-black/80 px-3 py-1 rounded backdrop-blur border border-white/10 uppercase">
      {text}
    </span>
  );

  // Hero Squeeze Slides (Derived dynamically from showcaseSlides CMS state)
  const heroSlides: SqueezeSlide[] = showcaseSlides.length > 0
    ? showcaseSlides.map((slide) => ({
        id: slide.id,
        title: slide.title,
        description: slide.description,
        action: slide.actionText,
        overlay: mark(slide.dropCode),
        image: slide.image,
        onAction: () => {
          if (slide.linkedProductId) {
            const p = products.find(x => x.id === slide.linkedProductId);
            if (p) {
              openProductDetail(p);
              return;
            }
          }
          if (slide.actionText.toLowerCase().includes("battle")) {
            setIsBattleRoomOpen(true);
          } else {
            const el = document.getElementById("catalog-section");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }))
    : [
        {
          id: "empty-hero",
          title: "DEDICATEREALITE ARCHIVE",
          description: "Yogyakarta Underground Heavyweight Streetwear.",
          action: "Lihat Katalog",
          overlay: mark("OFFICIAL ARCHIVE"),
          image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80",
          onAction: () => {
            const el = document.getElementById("catalog-section");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      ];

  // Compare Toggle
  const toggleCompare = (id: number) => {
    setComparisonList(prev => {
      if (prev.includes(id)) {
        showToast("Kaos dihapus dari Battle-Room", "info");
        return prev.filter(x => x !== id);
      } else {
        if (prev.length >= 3) {
          showToast("Maksimal 3 kaos untuk Battle-Room!", "warning");
          return prev;
        }
        showToast("Kaos ditambahkan ke Battle-Room ⚔️", "success");
        return [...prev, id];
      }
    });
  };

  // Open Detail Modal
  const openProductDetail = (p: Product) => {
    setDetailProduct(p);
    setSelectedSize(p.sizes.find(s => s.available && s.stock > 0)?.size || "L");
    setSelectedQty(1);
    setActiveAngleIndex(0);
    setShowDraftPreview(false);
  };

  // Generate WA Message Payload
  const getWaPayload = (product: Product, size: string, qty: number) => {
    const total = product.price * qty;
    const url = window.location.href;

    return `Halo Admin Dedicaterealite! 🔥
Saya ingin memesan produk berikut:

• Produk : ${product.name}
• SKU    : ${product.sku}
• Varian : Regular Black / Size ${size}
• Qty    : ${qty} pcs
• Harga  : ${formatRupiah(product.price)} (Total: ${formatRupiah(total)})
• Link   : ${url}

Data Pembeli:
• Nama Lengkap : ${buyerName.trim() || "[Belum diisi]"}
• Kota / Alamat : ${buyerCity.trim() || "[Belum diisi]"}
${buyerNotes.trim() ? `• Catatan      : ${buyerNotes.trim()}\n` : ""}
Apakah varian ini masih tersedia untuk diproses? Terima kasih!`;
  };

  // Direct Checkout to WhatsApp
  const handleDirectCheckoutWA = () => {
    if (!detailProduct) return;
    const payload = getWaPayload(detailProduct, selectedSize, selectedQty);
    const encoded = encodeURIComponent(payload);
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
    showToast("Membuka WhatsApp Admin Dedicaterealite...", "success");
  };

  // Cart Actions
  const addToCart = (product: Product, size: string, qty: number) => {
    const itemId = `${product.id}-${size}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => item.id === itemId ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, {
        id: itemId,
        productId: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        size: size,
        qty: qty,
        image: product.image,
        fitType: product.fitType,
        fabricGsm: product.fabricGsm
      }];
    });
    showToast(`${product.name} (${size}) ditambahkan ke Bag!`, "success");
  };

  const updateCartQty = (itemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    showToast("Item dihapus dari Shopping Bag", "info");
  };

  const clearCart = () => {
    setCartItems([]);
    showToast("Shopping Bag telah dikosongkan", "info");
  };

  // Multi-Item Cart WhatsApp Checkout
  const handleBagCheckoutWA = () => {
    if (cartItems.length === 0) {
      showToast("Shopping Bag masih kosong!", "warning");
      return;
    }

    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const hasBundleGift = totalQty >= 2;

    const itemsText = cartItems.map((item, idx) => {
      return `${idx + 1}. *${item.name}*\n   - SKU: ${item.sku}\n   - Size: *${item.size}* | Qty: ${item.qty} pcs\n   - Subtotal: ${formatRupiah(item.price * item.qty)}`;
    }).join('\n\n');

    const msg = `Halo Admin Dedicaterealite! 🔥\n` +
      `Saya ingin checkout pesanan dari Shopping Bag web katalog:\n\n` +
      `🛍️ *DAFTAR ITEM PESANAN:*\n` +
      `${itemsText}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *TOTAL ITEM :* ${totalQty} pcs\n` +
      `💰 *TOTAL HARGA:* *${formatRupiah(totalPrice)}*\n` +
      (hasBundleGift ? `🎁 *BONUS STREETWEAR:* Free Exclusive Sticker Pack & Ziplock Bag (KLAIM)\n` : ``) +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *DATA PENGIRIMAN:*\n` +
      `• Nama Lengkap : ${buyerName.trim() || "[Belum diisi]"}\n` +
      `• Kota / Alamat : ${buyerCity.trim() || "[Belum diisi]"}\n` +
      (buyerNotes.trim() ? `• Catatan      : ${buyerNotes.trim()}\n` : "") +
      `\nMohon info ketersediaan stok & nomor rekening pembayaran. Terima kasih! 🙏`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
    showToast("Membuka WhatsApp untuk checkout Shopping Bag...", "success");
  };

  // Smart Fit & Size Recommendation Calculator Engine
  const getRecommendedSize = (h: number, w: number, pref: "boxy" | "baggy") => {
    let size = "M";
    let desc = "";

    if (h < 163 && w < 52) {
      size = pref === "baggy" ? "M" : "S";
      desc = "Proporsi bahu dan panjang baju pas di garis pinggang untuk siluet boxy clean streetwear.";
    } else if (h <= 170 && w <= 63) {
      size = pref === "baggy" ? "L" : "M";
      desc = "Lebar dada 57 cm memberikan ruang gerak nyaman tanpa terasa kepanjangan.";
    } else if (h <= 178 && w <= 75) {
      size = pref === "baggy" ? "XL" : "L";
      desc = "Lebar dada 60 cm & panjang 74 cm menghasilkan efek drop shoulder 3-4 cm khas streetwear Yogyakarta.";
    } else if (h <= 185 && w <= 86) {
      size = pref === "baggy" ? "XXL" : "XL";
      desc = "Siluet lebar 63 cm dengan drape katun tebal 16s/14s yang jatuh kokoh dan gagah.";
    } else {
      size = "XXL";
      desc = "Ukuran terbesar dengan lebar 66 cm untuk siluet maksimal bagi postur tinggi atau berisi.";
    }

    return { size, desc };
  };

  // Quick 1-Click Status Switcher in Admin
  const handleQuickStatusSwitch = (productId: number, newStatus: "READY" | "PREORDER" | "SOLDOUT") => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
    showToast(`Status produk diubah ke ${newStatus}`, "success");
  };

  // Open Add Product Form
  const openAddProductModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormSku(`DDC-TC-00${products.length + 1}`);
    setFormCategory("Boxy Tee");
    setFormPrice(185000);
    setFormGsm(235);
    setFormMaterial("Heavyweight Cotton Combed 16s");
    setFormFit("Boxy Fit");
    setFormPrint("Plastisol High-Density");
    setFormStatus("READY");
    setFormImage("https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80");
    setFormDesc("Kaos berpotongan boxy dengan drop shoulder lebar dan jahitan double-needle. Dibuat dengan katun bergramasi berat yang kokoh dan sejuk dipakai.");
    setFormSizesStock({ S: 5, M: 10, L: 15, XL: 8, XXL: 3 });
    setIsProductFormOpen(true);
  };

  // Open Edit Product Form
  const openEditProductModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormGsm(p.fabricGsm);
    setFormMaterial(p.fabricMaterial);
    setFormFit(p.fitType);
    setFormPrint(p.printType);
    setFormStatus(p.status);
    setFormImage(p.image);
    setFormDesc(p.description);

    const stocks: { [key: string]: number } = {};
    p.sizes.forEach(s => {
      stocks[s.size] = s.stock;
    });
    setFormSizesStock(stocks);
    setIsProductFormOpen(true);
  };

  // Compression helper to ensure clean local storage & fast loading
  const compressImageFile = (file: File, maxWidth = 1200, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle local image file upload in Admin CMS
  const handleLocalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await compressImageFile(file, 1200, 0.85);
      setFormImage(dataUrl);
      showToast("Foto berhasil dimuat & dikompres optimal!", "success");
    }
  };

  // Save Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSku.trim()) {
      showToast("Nama dan SKU wajib diisi!", "warning");
      return;
    }

    const sizesArray = ["S", "M", "L", "XL", "XXL"].map(size => ({
      size,
      stock: formSizesStock[size] || 0,
      available: (formSizesStock[size] || 0) > 0 || formStatus === "PREORDER"
    }));

    if (editingProduct) {
      // Update
      setProducts(prev => prev.map(p => {
        if (p.id === editingProduct.id) {
          const newImg = formImage || p.image;
          return {
            ...p,
            name: formName,
            sku: formSku,
            category: formCategory,
            price: Number(formPrice),
            fabricGsm: Number(formGsm),
            fabricMaterial: formMaterial,
            fitType: formFit,
            printType: formPrint,
            status: formStatus,
            image: newImg,
            gallery: p.gallery ? [newImg, ...p.gallery.slice(1)] : [newImg],
            description: formDesc,
            sizes: sizesArray
          };
        }
        return p;
      }));
      showToast(`Produk ${formSku} berhasil diperbarui!`, "success");
    } else {
      // Create
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProd: Product = {
        id: newId,
        name: formName,
        sku: formSku,
        category: formCategory,
        price: Number(formPrice),
        fabricGsm: Number(formGsm),
        fabricMaterial: formMaterial,
        fitType: formFit,
        printType: formPrint,
        status: formStatus,
        colorTheme: "#18181b",
        graphicAccent: "#7A0006",
        image: formImage || "/images/you-are-sick-front.jpg",
        gallery: [formImage || "/images/you-are-sick-front.jpg"],
        description: formDesc,
        sizes: sizesArray
      };
      setProducts(prev => [newProd, ...prev]);
      showToast(`Produk baru ${formSku} berhasil ditambahkan!`, "success");
    }

    setIsProductFormOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = (productId: number) => {
    if (confirm("Hapus produk ini dari katalog?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setComparisonList(prev => prev.filter(id => id !== productId));
      showToast("Produk berhasil dihapus", "info");
    }
  };

  // Showcase CMS Handlers
  const openAddShowcaseModal = () => {
    setEditingShowcase(null);
    setShowcaseDropCode(`DROP 0${showcaseSlides.length + 1} // SPECIAL DROP`);
    setShowcaseTitle("");
    setShowcaseDesc("");
    setShowcaseActionText("Lihat Detail Kaos");
    setShowcaseImage(products[0]?.image || "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80");
    setShowcaseLinkedId(products[0]?.id);
    setIsShowcaseFormOpen(true);
  };

  const openEditShowcaseModal = (slide: ShowcaseSlideItem) => {
    setEditingShowcase(slide);
    setShowcaseDropCode(slide.dropCode);
    setShowcaseTitle(slide.title);
    setShowcaseDesc(slide.description);
    setShowcaseActionText(slide.actionText);
    setShowcaseImage(slide.image);
    setShowcaseLinkedId(slide.linkedProductId);
    setIsShowcaseFormOpen(true);
  };

  const handleShowcaseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await compressImageFile(file, 1600, 0.85);
      setShowcaseImage(dataUrl);
      showToast("Foto slide showcase berhasil dimuat & dikompres!", "success");
    }
  };

  const handleSaveShowcase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showcaseTitle.trim()) {
      showToast("Judul slide showcase wajib diisi!", "warning");
      return;
    }
    if (!showcaseImage.trim()) {
      showToast("Gambar slide wajib disertakan!", "warning");
      return;
    }

    if (editingShowcase) {
      setShowcaseSlides(prev => prev.map(s => s.id === editingShowcase.id ? {
        ...s,
        dropCode: showcaseDropCode.trim() || `DROP // NEW`,
        title: showcaseTitle.trim(),
        description: showcaseDesc.trim(),
        actionText: showcaseActionText.trim() || "Lihat Detail",
        image: showcaseImage.trim(),
        linkedProductId: showcaseLinkedId ? Number(showcaseLinkedId) : undefined
      } : s));
      showToast("Slide showcase berhasil diperbarui!", "success");
    } else {
      const newSlide: ShowcaseSlideItem = {
        id: "slide-" + Date.now(),
        dropCode: showcaseDropCode.trim() || `DROP // NEW`,
        title: showcaseTitle.trim(),
        description: showcaseDesc.trim(),
        actionText: showcaseActionText.trim() || "Lihat Detail",
        image: showcaseImage.trim(),
        linkedProductId: showcaseLinkedId ? Number(showcaseLinkedId) : undefined
      };
      setShowcaseSlides(prev => [...prev, newSlide]);
      showToast("Slide showcase baru berhasil ditambahkan!", "success");
    }
    setIsShowcaseFormOpen(false);
  };

  const handleDeleteShowcase = (id: string) => {
    if (showcaseSlides.length <= 1) {
      showToast("Minimal harus menyisakan 1 slide showcase!", "warning");
      return;
    }
    if (confirm("Hapus slide showcase ini dari Hero banner?")) {
      setShowcaseSlides(prev => prev.filter(s => s.id !== id));
      showToast("Slide showcase berhasil dihapus", "info");
    }
  };

  const handleMoveShowcase = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= showcaseSlides.length) return;
    const updated = [...showcaseSlides];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setShowcaseSlides(updated);
  };

  // Lookbook CMS Handlers
  const openAddLookbookModal = () => {
    setEditingLookbook(null);
    setLookbookTag(`DROP 0${lookbookItems.length + 1} // YK STREETS`);
    setLookbookTitle("");
    setLookbookLocation("Yogyakarta, Indonesia");
    setLookbookSpecs("235 GSM • Boxy Cut");
    setLookbookCaption("");
    setLookbookImage(products[0]?.image || "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80");
    setLookbookLinkedId(products[0]?.id);
    setIsLookbookFormOpen(true);
  };

  const openEditLookbookModal = (item: LookbookItem) => {
    setEditingLookbook(item);
    setLookbookTag(item.tag);
    setLookbookTitle(item.title);
    setLookbookLocation(item.location);
    setLookbookSpecs(item.specs);
    setLookbookCaption(item.caption || "");
    setLookbookImage(item.image);
    setLookbookLinkedId(item.linkedProductId);
    setIsLookbookFormOpen(true);
  };

  const handleLookbookImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await compressImageFile(file, 1400, 0.85);
      setLookbookImage(dataUrl);
      showToast("Foto editorial lookbook berhasil dimuat & dikompres!", "success");
    }
  };

  const handleSaveLookbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookbookTitle.trim()) {
      showToast("Judul editorial lookbook wajib diisi!", "warning");
      return;
    }
    if (!lookbookImage.trim()) {
      showToast("Foto editorial lookbook wajib disertakan!", "warning");
      return;
    }

    if (editingLookbook) {
      setLookbookItems(prev => prev.map(item => item.id === editingLookbook.id ? {
        ...item,
        tag: lookbookTag.trim() || "YK STREETS",
        title: lookbookTitle.trim(),
        location: lookbookLocation.trim() || "Yogyakarta",
        specs: lookbookSpecs.trim(),
        caption: lookbookCaption.trim(),
        image: lookbookImage.trim(),
        linkedProductId: lookbookLinkedId ? Number(lookbookLinkedId) : undefined
      } : item));
      showToast("Editorial lookbook berhasil diperbarui!", "success");
    } else {
      const newItem: LookbookItem = {
        id: "lb-" + Date.now(),
        tag: lookbookTag.trim() || "YK STREETS",
        title: lookbookTitle.trim(),
        location: lookbookLocation.trim() || "Yogyakarta",
        specs: lookbookSpecs.trim(),
        caption: lookbookCaption.trim(),
        image: lookbookImage.trim(),
        linkedProductId: lookbookLinkedId ? Number(lookbookLinkedId) : undefined
      };
      setLookbookItems(prev => [...prev, newItem]);
      showToast("Foto editorial baru berhasil ditambahkan ke Lookbook!", "success");
    }
    setIsLookbookFormOpen(false);
  };

  const handleDeleteLookbook = (id: string) => {
    if (lookbookItems.length <= 1) {
      showToast("Minimal harus menyisakan 1 foto editorial lookbook!", "warning");
      return;
    }
    if (confirm("Hapus foto editorial lookbook ini?")) {
      setLookbookItems(prev => prev.filter(item => item.id !== id));
      showToast("Foto editorial lookbook berhasil dihapus", "info");
    }
  };

  const handleMoveLookbook = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lookbookItems.length) return;
    const updated = [...lookbookItems];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setLookbookItems(updated);
  };

  // Filtered Products for Catalog
  const filteredProducts = products.filter(p => {
    if (categoryFilter !== "ALL" && p.category !== categoryFilter) return false;
    if (fitFilter !== "ALL" && !p.fitType.toLowerCase().includes(fitFilter.toLowerCase())) return false;
    if (gsmFilter === "heavy" && p.fabricGsm < 235) return false;
    if (gsmFilter === "medium" && (p.fabricGsm < 180 || p.fabricGsm >= 235)) return false;
    if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchDesc) return false;
    }
    return true;
  });

  // Filtered Products for Admin
  const adminFilteredProducts = products.filter(p => {
    if (adminStatusFilter !== "ALL" && p.status !== adminStatusFilter) return false;
    if (adminSearch.trim() !== "") {
      const q = adminSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  // Admin Quick Stats
  const countReady = products.filter(p => p.status === "READY").length;
  const countPO = products.filter(p => p.status === "PREORDER").length;
  const countSold = products.filter(p => p.status === "SOLDOUT").length;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#7A0006] selection:text-white">
      
      {/* 00. MINIMAL ANNOUNCEMENT MARQUEE BAR */}
      <div className="bg-[#7A0006] text-white text-xs font-mono py-1.5 px-4 overflow-hidden border-b border-[#991b1b] flex items-center z-50">
        <div className="overflow-hidden w-full whitespace-nowrap">
          <div className="inline-block animate-marquee text-[11px] uppercase tracking-wider text-white/95 font-medium">
            {announcementText}
          </div>
        </div>
      </div>

      {/* 01. STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md px-4 lg:px-8 py-3.5 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative shrink-0">
              <img 
                src="/dedicate-logo.png" 
                alt="Logo Resmi Dedicaterealite" 
                className="w-10 h-10 rounded-full object-cover border-2 border-[#7A0006]/70 shadow-[0_0_15px_rgba(122,0,6,0.6)] group-hover:scale-105 transition-transform" 
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black" title="Official Catalog Active"></span>
            </div>
            <div>
              <span className="font-bold tracking-widest text-lg md:text-xl text-white uppercase flex items-center">
                DEDICATE<span className="text-[#A60009]">REALITE</span>
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-0.5">
                YOGYAKARTA // HEAVYWEIGHT APPAREL
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-wider uppercase text-zinc-400">
            <a href="#hero-section" className="hover:text-white transition-colors">Showcase</a>
            <a href="#catalog-section" className="hover:text-white transition-colors">Katalog</a>
            <a href="#lookbook-section" className="hover:text-white transition-colors">Lookbook</a>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-3">
            <button 
              onClick={() => setShowSearch(!showSearch)} 
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition"
              title="Cari Kaos"
            >
              <Search className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsSizeGuideOpen(true)} 
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
              title="Size Guide"
            >
              <Ruler className="w-4 h-4 text-red-500" />
            </button>

            <button 
              onClick={() => setIsBagOpen(true)} 
              className="relative p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition"
              title="Shopping Bag (Multi-Item Checkout)"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-black shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsBattleRoomOpen(true)} 
              className="relative p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition"
              title="Battle-Room Matrix"
            >
              <Swords className="w-4 h-4 text-[#A60009]" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#7A0006] text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-black">
                  {comparisonList.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsAdminOpen(true)} 
              className="p-2 rounded-lg bg-zinc-900 hover:bg-[#7A0006]/20 border border-zinc-800 hover:border-[#7A0006]/50 text-zinc-400 hover:text-[#A60009] transition flex items-center space-x-1"
              title="Admin CMS Dashboard"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] font-mono hidden sm:inline text-white/70">CMS</span>
            </button>

            <a 
              href="https://instagram.com/dedicaterealite" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white transition"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span>@dedicaterealite</span>
            </a>
          </div>
        </div>

        {showSearch && (
          <div className="max-w-7xl mx-auto pt-3 pb-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Cari kaos, kode SKU (DDC-TC-001), bahan combed 16s, atau sablon..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#7A0006] text-white pl-10 pr-10 py-2.5 rounded-lg text-xs font-mono outline-none"
              />
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
                CLEAR
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 02. HERO SECTION WITH SQUEEZE CAROUSEL INTEGRATION */}
      <section id="hero-section" className="relative bg-black border-b border-zinc-800/80 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#A60009] text-xs font-mono uppercase tracking-widest mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A60009] animate-pulse"></span>
                <span>Interactive Apparel Showcase Carousel</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                DEDICATEREALITE <span className="text-[#A60009]">SHOWCASE</span>
              </h1>
              <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1 max-w-xl">
                Eksplorasi panel geser interaktif rilisan drop terbaru dengan potongan boxy-fit & katun combed berat.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                Swipe/Hover untuk membuka panel
              </span>
            </div>
          </div>

          {/* Squeeze Carousel Component */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 shadow-2xl">
            <SqueezeCarousel 
              slides={heroSlides} 
              height={360}
              accent="#7A0006"
              accentForeground="#ffffff"
              label="Dedicaterealite Streetwear Drops"
              controls={true}
              autoplay={true}
              interval={5000}
            />
          </div>

        </div>
      </section>

      {/* 04. LIVE CATALOG & MULTI-FILTER MATRIX */}
      <section id="catalog-section" className="py-10 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#A60009] text-xs font-mono uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-[#A60009]"></span>
              <span>Koleksi Apparel Terstruktur</span>
            </div>
            <h2 className="font-black text-2xl md:text-3xl text-white tracking-tight uppercase">
              ETALASE KATALOG STREETWEAR
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-mono mt-1">
              Pilih kaos untuk melihat detail spesifikasi dan langsung memesan via WhatsApp.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
              <span className="text-white font-bold">{filteredProducts.length}</span> Kaos
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 mb-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-zinc-400 shrink-0 uppercase tracking-wider text-[11px] pr-2">Kategori:</span>
            {["ALL", "Boxy Tee", "Oversized Tee", "Heavyweight Tee", "Longsleeve", "Outerwear"].map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg shrink-0 transition font-medium ${categoryFilter === cat ? 'bg-[#7A0006] text-white border border-[#A60009] shadow-md' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'}`}
              >
                {cat === 'ALL' ? 'Semua' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-800/80 text-xs font-mono">
            <div>
              <label className="block text-[10px] text-zinc-400 uppercase mb-1">Siluet / Fit</label>
              <select 
                value={fitFilter} 
                onChange={(e) => setFitFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-lg outline-none focus:border-[#7A0006]"
              >
                <option value="ALL">Semua Siluet</option>
                <option value="Boxy Fit">Boxy Fit</option>
                <option value="Loose Oversized">Loose Oversized</option>
                <option value="Regular Boxy">Regular Boxy</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-400 uppercase mb-1">Gramasi Katun</label>
              <select 
                value={gsmFilter} 
                onChange={(e) => setGsmFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-lg outline-none focus:border-[#7A0006]"
              >
                <option value="ALL">Semua GSM</option>
                <option value="heavy">Heavy (≥ 235 GSM)</option>
                <option value="medium">Medium (180 - 200 GSM)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-400 uppercase mb-1">Status Ketersediaan</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-lg outline-none focus:border-[#7A0006]"
              >
                <option value="ALL">Semua Status</option>
                <option value="READY">Ready Stock</option>
                <option value="PREORDER">Open Fast PO</option>
                <option value="SOLDOUT">Sold Out</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => {
                  setCategoryFilter("ALL");
                  setFitFilter("ALL");
                  setGsmFilter("ALL");
                  setStatusFilter("ALL");
                  setSearchQuery("");
                  showToast("Filter katalog di-reset", "info");
                }}
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition text-xs font-mono"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isCompared = comparisonList.includes(product.id);

            return (
              <div 
                key={product.id}
                className="bg-zinc-950 hover:bg-zinc-900/60 rounded-2xl border border-zinc-800 hover:border-[#7A0006]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
              >
                {/* Image Stage */}
                <div 
                  onClick={() => openProductDetail(product)} 
                  className="relative aspect-square bg-zinc-900 overflow-hidden cursor-pointer"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
                    <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider ${product.status === 'READY' ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-700/60' : product.status === 'PREORDER' ? 'bg-amber-950/90 text-amber-300 border border-amber-700/60' : 'bg-red-950/90 text-red-400 border border-red-700/60'}`}>
                      {product.status === 'READY' ? '● READY' : product.status === 'PREORDER' ? '⚡ FAST PO' : '✕ SOLD OUT'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur font-mono text-[9px] text-zinc-300 uppercase border border-white/10">
                      {product.fabricGsm} GSM
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => toggleCompare(product.id)}
                      className={`p-2 rounded-xl backdrop-blur transition-all flex items-center space-x-1.5 text-xs font-mono border ${isCompared ? 'bg-[#7A0006] text-white border-[#7A0006] shadow-[0_0_12px_rgba(122,0,6,0.8)]' : 'bg-black/75 hover:bg-black text-zinc-300 border-white/10'}`}
                      title={isCompared ? "Hapus dari Battle-Room" : "Tambah ke Battle-Room"}
                    >
                      <Swords className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden sm:inline">{isCompared ? 'Dibandingkan' : '+ Bandingkan'}</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                      <span>{product.category}</span>
                      <span className="text-[#A60009] font-bold">{product.sku}</span>
                    </div>

                    <h3 
                      onClick={() => openProductDetail(product)} 
                      className="font-bold text-base text-white group-hover:text-zinc-200 cursor-pointer line-clamp-1 uppercase"
                    >
                      {product.name}
                    </h3>

                    <div className="text-[11px] font-mono text-zinc-400 mt-1 line-clamp-1">
                      {product.fabricMaterial} • {product.printType}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-mono text-zinc-500">Harga</span>
                      <span className="font-mono font-bold text-base text-white">{formatRupiah(product.price)}</span>
                    </div>

                    <button 
                      onClick={() => openProductDetail(product)}
                      className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-[#7A0006] text-white text-xs font-mono transition flex items-center space-x-1.5 border border-zinc-800 hover:border-[#7A0006]"
                    >
                      <span>Pilih Size</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 05. FLOATING COMPARISON BAR (STICKY) */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-2xl mx-auto z-40">
          <div className="bg-zinc-950/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-[#7A0006]/60 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-[#7A0006] flex items-center justify-center text-white shrink-0 shadow-lg">
                <Swords className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs uppercase text-white flex items-center space-x-1.5">
                  <span>BATTLE-ROOM</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/10 font-mono text-[10px] text-[#A60009] font-bold">
                    {comparisonList.length}/3 KAOS
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 mt-1 overflow-x-auto">
                  {comparisonList.map(id => {
                    const p = products.find(x => x.id === id);
                    if (!p) return null;
                    return (
                      <img key={id} src={p.image} alt={p.name} className="w-7 h-7 rounded object-cover border border-[#7A0006]" />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button 
                onClick={() => setComparisonList([])} 
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono"
                title="Hapus Semua"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsBattleRoomOpen(true)} 
                className="px-3.5 py-2 rounded-xl bg-[#7A0006] hover:bg-[#A60009] text-white font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(122,0,6,0.6)] flex items-center space-x-1.5"
              >
                <span>Buka Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         06. CLEAN, MINIMALIST STREETWEAR ORDER MODAL (UNIFIED & UNCLUTTERED)
         ========================================================================= */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setDetailProduct(null)}></div>
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10">
            <div className="w-full max-w-4xl bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setDetailProduct(null)} 
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Left Photo & Angle Strip (5 cols) */}
                <div className="md:col-span-5 bg-black p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800">
                  <div>
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                      <img 
                        src={
                          detailProduct.gallery && detailProduct.gallery[activeAngleIndex] 
                            ? detailProduct.gallery[activeAngleIndex] 
                            : detailProduct.image
                        } 
                        alt={detailProduct.name} 
                        className="w-full h-full object-cover transition duration-300" 
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur font-mono text-[10px] text-white uppercase border border-white/10">
                          {activeAngleIndex === 0 ? "Depan" : activeAngleIndex === 1 ? "Belakang" : activeAngleIndex === 2 ? "Detail Sablon" : "On-Body Look"}
                        </span>
                      </div>
                    </div>

                    {/* Minimal Thumbnail Angle Selectors */}
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {(detailProduct.gallery || [detailProduct.image, detailProduct.image, detailProduct.image, detailProduct.image]).map((thumbImg, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setActiveAngleIndex(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border transition ${activeAngleIndex === idx ? 'border-2 border-[#7A0006]' : 'border-zinc-800 opacity-60 hover:opacity-100'}`}
                        >
                          <img src={thumbImg} alt={`angle-${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center space-x-2 text-[11px] font-mono text-zinc-400">
                    <img src="/dedicate-logo.png" alt="Official Logo" className="w-5 h-5 rounded-full object-cover border border-[#7A0006]" />
                    <span>Koleksi Orisinal Dedicaterealite • Yogyakarta</span>
                  </div>
                </div>

                {/* Right Ordering Panel (7 cols - Clean Monochromatic Techwear Aesthetic) */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    
                    {/* Header Info */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                        <span>{detailProduct.category}</span>
                        <span className="text-[#A60009] font-bold">{detailProduct.sku}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">{detailProduct.name}</h2>
                      <div className="font-mono font-bold text-2xl text-white mt-1.5">
                        {formatRupiah(detailProduct.price)}
                      </div>
                    </div>

                    {/* Concise Specifications Strip (Single Line, No heavy noisy box) */}
                    <div className="py-2.5 px-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-300 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{detailProduct.fabricMaterial}</span>
                      <span className="text-zinc-600">•</span>
                      <span>{detailProduct.fabricGsm} GSM</span>
                      <span className="text-zinc-600">•</span>
                      <span>{detailProduct.fitType}</span>
                    </div>

                    {/* Size Selector with Clean Streetwear Pills */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300 font-bold uppercase text-[11px]">Pilih Ukuran:</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            setSizeGuideTab("table");
                            setIsSizeGuideOpen(true);
                          }} 
                          className="text-[#A60009] hover:underline flex items-center space-x-1 text-[11px]"
                        >
                          <Ruler className="w-3 h-3" />
                          <span>Size Chart</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {detailProduct.sizes.map(s => {
                          const isSelected = selectedSize === s.size;
                          const isOut = !s.available || s.stock <= 0;

                          return (
                            <button
                              key={s.size}
                              onClick={() => setSelectedSize(s.size)}
                              disabled={isOut}
                              className={`py-2 rounded-xl text-xs font-mono font-bold transition flex flex-col items-center justify-center border ${
                                isSelected 
                                  ? 'bg-[#7A0006] text-white border-[#A60009] shadow-md' 
                                  : isOut 
                                    ? 'bg-zinc-900/30 text-zinc-600 border-zinc-800/40 cursor-not-allowed line-through' 
                                    : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800'
                              }`}
                            >
                              <span className="text-sm">{s.size}</span>
                              <span className="text-[9px] font-normal text-zinc-400">
                                {isOut ? 'Habis' : `${s.stock} pcs`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-3 pt-1">
                      <span className="text-xs font-mono text-zinc-400">Jumlah:</span>
                      <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg">
                        <button onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))} className="px-3 py-1 font-mono text-zinc-300 hover:text-white">-</button>
                        <span className="px-3 py-1 font-mono text-xs font-bold text-white">{selectedQty}</span>
                        <button onClick={() => setSelectedQty(selectedQty + 1)} className="px-3 py-1 font-mono text-zinc-300 hover:text-white">+</button>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">pcs (Total: {formatRupiah(detailProduct.price * selectedQty)})</span>
                    </div>

                    {/* Streamlined Buyer Inputs (Right inside modal, clean & effortless) */}
                    <div className="pt-2 border-t border-zinc-800/80 space-y-2 font-mono text-xs">
                      <div className="text-[11px] text-zinc-400 uppercase font-bold">Data Pengiriman (Opsional):</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input 
                            type="text" 
                            placeholder="Nama Lengkap" 
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#7A0006] text-white pl-8 pr-3 py-2 rounded-lg outline-none text-xs"
                          />
                        </div>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input 
                            type="text" 
                            placeholder="Kota / Alamat" 
                            value={buyerCity}
                            onChange={(e) => setBuyerCity(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#7A0006] text-white pl-8 pr-3 py-2 rounded-lg outline-none text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Collapsible WhatsApp Draft Preview (Keeps view tidy) */}
                    <div className="pt-1">
                      <button 
                        type="button" 
                        onClick={() => setShowDraftPreview(!showDraftPreview)}
                        className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 flex items-center space-x-1"
                      >
                        <span>{showDraftPreview ? "Sembunyikan format pesan" : "Lihat draf pesan WhatsApp"}</span>
                        {showDraftPreview ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {showDraftPreview && (
                        <div className="mt-2 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
                          {getWaPayload(detailProduct, selectedSize, selectedQty)}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Dual Action Buttons: Add to Bag & Direct WA */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button 
                        onClick={() => addToCart(detailProduct, selectedSize, selectedQty)}
                        className="py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 active:scale-95 shadow-md"
                      >
                        <ShoppingBag className="w-4 h-4 text-emerald-400" />
                        <span>+ Masukkan ke Bag</span>
                      </button>

                      <button 
                        onClick={handleDirectCheckoutWA}
                        className="py-3.5 px-4 rounded-xl bg-[#7A0006] hover:bg-[#991b1b] text-white font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(122,0,6,0.6)] flex items-center justify-center space-x-2 active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Pesan Langsung WA</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button 
                        onClick={() => toggleCompare(detailProduct.id)}
                        className="py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5"
                      >
                        <Swords className="w-3.5 h-3.5 text-[#A60009]" />
                        <span>{comparisonList.includes(detailProduct.id) ? "Di Battle-Room" : "+ Bandingkan"}</span>
                      </button>

                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          showToast("Tautan produk disalin ke clipboard!", "success");
                        }}
                        className="py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Tautan</span>
                      </button>
                    </div>

                    <div className="text-center text-[10px] font-mono text-zinc-500">
                      Nomor admin resmi: <strong className="text-zinc-400">+62 821-1407-2159</strong>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 07. BATTLE-ROOM MATRIX MODAL */}
      {isBattleRoomOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsBattleRoomOpen(false)}></div>
          <div className="min-h-full flex items-center justify-center p-2 sm:p-6 relative z-10">
            <div className="w-full max-w-6xl bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
              
              <div className="p-4 sm:p-5 border-b border-zinc-800 bg-black/60 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="relative shrink-0">
                    <img src="/dedicate-logo.png" alt="Logo Dedicate" className="w-10 h-10 rounded-full object-cover border border-[#7A0006] shadow-md" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7A0006] flex items-center justify-center text-white text-[10px] border border-black">
                      <Swords className="w-3 h-3" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white uppercase">BATTLE-ROOM MATRIX</h3>
                    <p className="text-zinc-400 text-xs font-mono">Bandingkan spesifikasi multi-atribut kaos Dedicaterealite berdampingan.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={() => setComparisonList([])} className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300">Kosongkan</button>
                  <button onClick={() => setIsBattleRoomOpen(false)} className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white"><X className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-x-auto flex-1">
                {comparisonList.length === 0 ? (
                  <div className="text-center py-16 text-zinc-400 font-mono text-xs">
                    Belum ada kaos yang dipilih untuk komparasi.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4 min-w-[700px] text-xs font-mono">
                    <div className="space-y-6 pt-12 text-zinc-400 font-medium border-r border-zinc-800">
                      <div className="h-36 flex items-end font-bold text-white uppercase">Visual & Siluet</div>
                      <div className="h-10 flex items-center font-bold text-white">Harga & Status</div>
                      <div className="h-14 flex items-center font-bold text-white">Bahan & GSM</div>
                      <div className="h-10 flex items-center font-bold text-white">Siluet / Potongan</div>
                      <div className="h-10 flex items-center font-bold text-white">Teknik Sablon</div>
                      <div className="h-12 flex items-center font-bold text-white">Aksi Beli</div>
                    </div>

                    {comparisonList.map(id => {
                      const p = products.find(x => x.id === id);
                      if (!p) return null;

                      return (
                        <div key={id} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-6 relative">
                          <button onClick={() => toggleCompare(p.id)} className="absolute top-2 right-2 text-zinc-400 hover:text-red-400">✕</button>

                          <div className="h-36 flex flex-col justify-between">
                            <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-lg" />
                            <div>
                              <span className="text-[10px] text-[#A60009] font-bold">{p.sku}</span>
                              <h4 className="font-bold text-sm text-white uppercase line-clamp-1">{p.name}</h4>
                            </div>
                          </div>

                          <div className="h-10 flex items-center justify-between border-t border-zinc-800 pt-2">
                            <span className="font-bold text-white">{formatRupiah(p.price)}</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400">{p.status}</span>
                          </div>

                          <div className="h-14 border-t border-zinc-800 pt-2">
                            <div className="font-bold text-white">{p.fabricGsm} GSM</div>
                            <div className="text-[10px] text-zinc-400">{p.fabricMaterial}</div>
                          </div>

                          <div className="h-10 border-t border-zinc-800 pt-2 font-bold text-white">{p.fitType}</div>

                          <div className="h-10 border-t border-zinc-800 pt-2 font-bold text-white line-clamp-1">{p.printType}</div>

                          <div className="h-12 border-t border-zinc-800 pt-2">
                            <button 
                              onClick={() => {
                                setDetailProduct(p);
                                setIsBattleRoomOpen(false);
                              }}
                              className="w-full py-2 rounded-lg bg-[#7A0006] hover:bg-[#991b1b] text-white font-bold text-xs uppercase"
                            >
                              Beli via WA
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 08. REDESIGNED ATELIER SIZE GUIDE & TECHNICAL BLUEPRINT MODAL */}
      {isSizeGuideOpen && (() => {
        const recommendation = getRecommendedSize(userHeight, userWeight, fitPreference);
        const activeMetric = STANDARD_SIZE_METRICS.find(m => m.size === inspectedSize) || STANDARD_SIZE_METRICS[2]; // Default L

        return (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
              onClick={() => setIsSizeGuideOpen(false)}
            />
            
            <div className="min-h-full flex items-center justify-center p-2.5 sm:p-5 relative z-10">
              <div className="w-full max-w-4xl bg-[#0b0c10] rounded-3xl border border-zinc-700/80 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden relative text-white flex flex-col max-h-[92vh]">
                
                {/* Modal Top Atelier Bar */}
                <div className="px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-[#12141a] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400 shrink-0">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                          ATELIER METRIC SPEC
                        </span>
                        <span className="text-zinc-600 text-xs">•</span>
                        <span className="text-[11px] font-mono text-zinc-400">Pola Drop Shoulder Boxy</span>
                      </div>
                      <h3 className="font-black text-base sm:text-lg text-white uppercase tracking-tight">
                        PANDUAN & KALKULATOR UKURAN
                      </h3>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsSizeGuideOpen(false)} 
                    className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab Switcher & Specs Info */}
                <div className="px-4 sm:px-6 pt-3 pb-2.5 bg-[#0e1015] border-b border-zinc-800/80 flex flex-wrap gap-2.5 items-center justify-between">
                  <div className="flex rounded-xl bg-zinc-900/90 p-1 border border-zinc-800 w-full sm:w-auto">
                    <button
                      onClick={() => setSizeGuideTab("table")}
                      className={`flex-1 sm:flex-initial py-2 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
                        sizeGuideTab === "table"
                          ? "bg-red-700 text-white shadow-lg shadow-red-950"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Chart (cm)</span>
                    </button>
                    <button
                      onClick={() => setSizeGuideTab("calculator")}
                      className={`flex-1 sm:flex-initial py-2 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${
                        sizeGuideTab === "calculator"
                          ? "bg-red-700 text-white shadow-lg shadow-red-950"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kalkulator TB / BB</span>
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Toleransi Jahitan: ±1.5 cm</span>
                  </div>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-3.5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-[#0a0b0e]">
                  {sizeGuideTab === "table" ? (
                    /* ----------------------------------------------------
                       TAB 1: SIZE CHART & ENLARGED TECHNICAL BLUEPRINT
                       ---------------------------------------------------- */
                    <div className="space-y-5">
                      
                      {/* 1. Quick Size Inspector Bar */}
                      <div className="bg-[#12141b] border border-zinc-800/90 rounded-2xl p-3">
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Pilih Ukuran untuk Preview Skematik:</span>
                          </span>
                          <span className="text-zinc-400 text-[10px]">
                            {activeMetric.persona}
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                          {STANDARD_SIZE_METRICS.map(m => {
                            const isInspected = m.size === inspectedSize;
                            const isSelected = m.size === selectedSize;
                            return (
                              <button
                                key={m.size}
                                type="button"
                                onClick={() => setInspectedSize(m.size)}
                                className={`py-2 px-1.5 sm:px-2 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                                  isInspected 
                                    ? "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] ring-2 ring-red-400/50" 
                                    : isSelected
                                      ? "bg-zinc-800 border-zinc-600 text-white"
                                      : "bg-[#161922] border-zinc-800/80 text-zinc-300 hover:border-zinc-600 hover:text-white"
                                }`}
                              >
                                <span className="font-black text-sm sm:text-base leading-none">{m.size}</span>
                                <span className={`text-[10px] font-mono mt-1 ${isInspected ? "text-red-100 font-bold" : "text-zinc-400"}`}>
                                  {m.ld} cm
                                </span>
                                {isSelected && (
                                  <span className="text-[8px] uppercase font-bold tracking-wider mt-0.5 px-1 rounded bg-black/50 text-emerald-400">
                                    Aktif
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. ENLARGED VISUAL TECHNICAL BLUEPRINT (Prominent Showcase) */}
                      <div className="bg-[#111319] border border-zinc-800 rounded-2xl p-3 sm:p-5 relative overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-red-400 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span>SKEMATIK UKURAN [{activeMetric.size}] — {activeMetric.persona}</span>
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {activeMetric.deltaRegular}
                          </span>
                        </div>

                        {/* ENLARGED High-Definition SVG Blueprint */}
                        <div className="w-full flex items-center justify-center py-2">
                          <svg viewBox="0 0 520 380" className="w-full h-64 sm:h-80 md:h-[340px] select-none text-zinc-300">
                            <defs>
                              <pattern id="atelier-grid-large" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#atelier-grid-large)" rx="10" />

                            {/* T-Shirt Body Outline (Enlarged Geometry) */}
                            <path
                              d="M 210 50 
                                 C 230 68, 290 68, 310 50 
                                 L 385 70 
                                 L 480 128 
                                 L 445 178 
                                 L 380 150 
                                 L 380 335 
                                 L 140 335 
                                 L 140 150 
                                 L 75 178 
                                 L 40 128 
                                 L 135 70 
                                 Z"
                              fill="#151822"
                              stroke="rgba(255, 255, 255, 0.6)"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            />

                            {/* Collar Rib Accent */}
                            <path
                              d="M 210 50 C 230 72, 290 72, 310 50 C 290 58, 230 58, 210 50 Z"
                              fill="#7A0006"
                              stroke="#ef4444"
                              strokeWidth="2"
                            />

                            {/* Drop Shoulder Seam (Dotted Yellow) */}
                            <line x1="160" y1="58" x2="175" y2="110" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3" />
                            <line x1="360" y1="58" x2="345" y2="110" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3" />

                            {/* Dimension [A]: Lebar Dada (LD) */}
                            <line x1="140" y1="165" x2="380" y2="165" stroke="#ef4444" strokeWidth="2.5" />
                            <circle cx="140" cy="165" r="4.5" fill="#ef4444" />
                            <circle cx="380" cy="165" r="4.5" fill="#ef4444" />
                            <rect x="215" y="148" width="90" height="28" rx="6" fill="#0B0C0E" stroke="#ef4444" strokeWidth="2" />
                            <text x="260" y="167" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                              LD: {activeMetric.ld} CM
                            </text>

                            {/* Dimension [B]: Panjang Baju (PB) */}
                            <line x1="398" y1="52" x2="398" y2="335" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
                            <line x1="390" y1="52" x2="406" y2="52" stroke="#38bdf8" strokeWidth="2" />
                            <line x1="390" y1="335" x2="406" y2="335" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="410" y="180" width="88" height="26" rx="6" fill="#0B0C0E" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="454" y="198" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              PB: {activeMetric.pb} CM
                            </text>

                            {/* Dimension [C]: Lengan (PL) */}
                            <line x1="365" y1="65" x2="462" y2="152" stroke="#c084fc" strokeWidth="2" strokeDasharray="5 3" />
                            <rect x="412" y="96" width="82" height="24" rx="5" fill="#0B0C0E" stroke="#c084fc" strokeWidth="1.5" />
                            <text x="453" y="112" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                              PL: {activeMetric.pl} CM
                            </text>

                            {/* Drop Shoulder Tag */}
                            <rect x="25" y="25" width="160" height="24" rx="5" fill="#0B0C0E" stroke="#fbbf24" strokeWidth="1" />
                            <text x="105" y="41" fill="#fbbf24" fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                              DROP BAHU: {activeMetric.shoulderDrop}
                            </text>
                          </svg>
                        </div>

                        {/* Metric Highlights Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800 text-center font-mono">
                          <div className="bg-[#161922] p-2 rounded-xl border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Lebar Dada</span>
                            <span className="text-white font-bold text-sm text-red-400">{activeMetric.ld} cm</span>
                          </div>
                          <div className="bg-[#161922] p-2 rounded-xl border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Panjang Baju</span>
                            <span className="text-white font-bold text-sm text-sky-400">{activeMetric.pb} cm</span>
                          </div>
                          <div className="bg-[#161922] p-2 rounded-xl border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Panjang Lengan</span>
                            <span className="text-white font-bold text-sm text-purple-400">{activeMetric.pl} cm</span>
                          </div>
                          <div className="bg-[#161922] p-2 rounded-xl border border-zinc-800">
                            <span className="text-[10px] text-zinc-400 block">Saran Postur</span>
                            <span className="text-white font-bold text-xs">{activeMetric.tbRange}</span>
                          </div>
                        </div>
                      </div>

                      {/* 3. MOBILE-OPTIMIZED SIZE SPEC CARDS (Clean on Mobile Screens, No Horizontal Scroll) */}
                      <div className="space-y-2 block md:hidden">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
                            DAFTAR SEMUA UKURAN:
                          </span>
                          <span className="text-zinc-400 text-[10px]">
                            Ketuk untuk memilih
                          </span>
                        </div>

                        <div className="space-y-2">
                          {STANDARD_SIZE_METRICS.map((m) => {
                            const isInspected = m.size === inspectedSize;
                            const isSelected = m.size === selectedSize;
                            return (
                              <div
                                key={m.size}
                                onClick={() => {
                                  setInspectedSize(m.size);
                                  setSelectedSize(m.size);
                                  showToast(`Ukuran ${m.size} dipilih!`, "success");
                                }}
                                className={`p-3 rounded-2xl border transition cursor-pointer ${
                                  isSelected
                                    ? "bg-gradient-to-r from-red-950/60 to-[#161922] border-red-500 shadow-md"
                                    : isInspected
                                      ? "bg-[#181b24] border-zinc-600"
                                      : "bg-[#0e1015] border-zinc-800/80 hover:border-zinc-700"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2.5">
                                    <span className={`w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center font-mono ${
                                      isSelected ? "bg-red-600 text-white" : "bg-zinc-800 text-white"
                                    }`}>
                                      {m.size}
                                    </span>
                                    <div>
                                      <h4 className="text-white font-bold text-xs uppercase">{m.persona}</h4>
                                      <span className="text-[10px] font-mono text-zinc-400">{m.deltaRegular}</span>
                                    </div>
                                  </div>

                                  {isSelected ? (
                                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono">
                                      <Check className="w-3 h-3" />
                                      <span>Terpilih</span>
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono font-bold">
                                      Pilih
                                    </span>
                                  )}
                                </div>

                                <div className="grid grid-cols-3 gap-1.5 font-mono text-xs text-center">
                                  <div className="bg-[#12141c] p-1.5 rounded-lg border border-zinc-800/80">
                                    <span className="text-[9px] text-zinc-400 block">LD</span>
                                    <span className="text-red-400 font-bold">{m.ld} cm</span>
                                  </div>
                                  <div className="bg-[#12141c] p-1.5 rounded-lg border border-zinc-800/80">
                                    <span className="text-[9px] text-zinc-400 block">PB</span>
                                    <span className="text-sky-400 font-bold">{m.pb} cm</span>
                                  </div>
                                  <div className="bg-[#12141c] p-1.5 rounded-lg border border-zinc-800/80">
                                    <span className="text-[9px] text-zinc-400 block">Lengan</span>
                                    <span className="text-purple-400 font-bold">{m.pl} cm</span>
                                  </div>
                                </div>

                                <div className="mt-2 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                                  <span>Drop Bahu: {m.shoulderDrop}</span>
                                  <span>TB {m.tbRange} • BB {m.bbRange}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. DESKTOP FULL SPEC TABLE (High Contrast & Clear Typography) */}
                      <div className="space-y-2 hidden md:block">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-200 font-bold uppercase tracking-wider text-[11px]">
                            TABEL PERBANDINGAN UKURAN (CENTIMETER):
                          </span>
                          <span className="text-zinc-400 text-[11px]">
                            Klik baris untuk memilih langsung
                          </span>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0e1015] shadow-xl">
                          <table className="w-full text-xs font-mono text-left">
                            <thead className="bg-[#161822] text-zinc-100 border-b-2 border-zinc-700/80">
                              <tr>
                                <th className="py-3 px-3.5 text-center font-black text-white">SIZE</th>
                                <th className="py-3 px-3 text-red-400 font-bold">LEBAR DADA (LD)</th>
                                <th className="py-3 px-3 text-sky-400 font-bold">PANJANG (PB)</th>
                                <th className="py-3 px-3 text-purple-400 font-bold">LENGAN (PL)</th>
                                <th className="py-3 px-3 text-amber-400 font-bold">DROP BAHU</th>
                                <th className="py-3 px-3 text-zinc-100 font-bold">SARAN POSTUR</th>
                                <th className="py-3 px-3 text-center text-zinc-100 font-bold">STATUS</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/80">
                              {STANDARD_SIZE_METRICS.map((m) => {
                                const isInspected = m.size === inspectedSize;
                                const isSelected = m.size === selectedSize;
                                return (
                                  <tr 
                                    key={m.size}
                                    onClick={() => {
                                      setInspectedSize(m.size);
                                      setSelectedSize(m.size);
                                      showToast(`Ukuran ${m.size} dipilih!`, "success");
                                    }}
                                    className={`transition-colors cursor-pointer ${
                                      isSelected
                                        ? "bg-gradient-to-r from-red-950/70 via-red-900/25 to-[#161922] border-l-4 border-l-red-500"
                                        : isInspected
                                          ? "bg-[#181b24]"
                                          : "bg-[#0e1015] hover:bg-[#151821]"
                                    }`}
                                  >
                                    <td className="py-3 px-3.5 text-center">
                                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm ${
                                        isSelected
                                          ? "bg-red-600 text-white shadow-md shadow-red-900/60"
                                          : "bg-zinc-800 text-white border border-zinc-700"
                                      }`}>
                                        {m.size}
                                      </span>
                                    </td>
                                    <td className="py-3 px-3">
                                      <span className="text-white font-bold text-sm">{m.ld} cm</span>
                                      <span className="block text-[10px] text-zinc-400 font-normal">
                                        {m.deltaRegular}
                                      </span>
                                    </td>
                                    <td className="py-3 px-3">
                                      <span className="text-zinc-100 font-semibold text-xs">{m.pb} cm</span>
                                    </td>
                                    <td className="py-3 px-3">
                                      <span className="text-zinc-100 font-semibold text-xs">{m.pl} cm</span>
                                    </td>
                                    <td className="py-3 px-3">
                                      <span className="text-zinc-100 font-semibold text-xs">{m.shoulderDrop}</span>
                                    </td>
                                    <td className="py-3 px-3">
                                      <div className="flex flex-col">
                                        <span className="text-white font-medium text-xs">TB {m.tbRange}</span>
                                        <span className="text-zinc-400 text-[11px]">BB {m.bbRange}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-3 text-center">
                                      {isSelected ? (
                                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                                          <Check className="w-3 h-3" />
                                          <span>Terpilih</span>
                                        </span>
                                      ) : (
                                        <span className="px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white border border-zinc-700 text-[10px] font-bold transition">
                                          Pilih {m.size}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* ----------------------------------------------------
                       TAB 2: SMART FIT FINDER (TB / BB SLIDERS)
                       ---------------------------------------------------- */
                    <div className="space-y-5">
                      
                      {/* 1. Quick Posture Presets */}
                      <div className="bg-[#12141b] border border-zinc-800/90 rounded-2xl p-3 sm:p-4">
                        <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider block font-bold mb-2">
                          PRESET POSTUR (KLIK 1 KALI):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { label: "162 cm • 50 kg (S)", h: 162, w: 50 },
                            { label: "170 cm • 60 kg (M)", h: 170, w: 60 },
                            { label: "175 cm • 72 kg (L)", h: 175, w: 72 },
                            { label: "182 cm • 82 kg (XL)", h: 182, w: 82 },
                            { label: "190 cm • 92 kg (XXL)", h: 190, w: 92 },
                          ].map(p => {
                            const isMatch = userHeight === p.h && userWeight === p.w;
                            return (
                              <button
                                key={p.label}
                                type="button"
                                onClick={() => {
                                  setUserHeight(p.h);
                                  setUserWeight(p.w);
                                }}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition border ${
                                  isMatch
                                    ? "bg-red-600 border-red-500 text-white font-bold shadow-md shadow-red-950"
                                    : "bg-[#181b24] border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600"
                                }`}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Interactive Tactile Sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#12141c] border border-zinc-800 rounded-2xl p-4">
                        
                        {/* Height Slider */}
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-zinc-300 font-bold uppercase">Tinggi Badan:</span>
                            <div className="flex items-center space-x-1.5">
                              <button
                                type="button"
                                onClick={() => setUserHeight(prev => Math.max(150, prev - 1))}
                                className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="text-white font-mono font-black text-sm bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded-lg">
                                {userHeight} cm
                              </span>
                              <button
                                type="button"
                                onClick={() => setUserHeight(prev => Math.min(200, prev + 1))}
                                className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <input
                            type="range"
                            min="150"
                            max="200"
                            value={userHeight}
                            onChange={(e) => setUserHeight(Number(e.target.value))}
                            className="w-full accent-red-600 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                          />
                        </div>

                        {/* Weight Slider */}
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-zinc-300 font-bold uppercase">Berat Badan:</span>
                            <div className="flex items-center space-x-1.5">
                              <button
                                type="button"
                                onClick={() => setUserWeight(prev => Math.max(40, prev - 1))}
                                className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="text-white font-mono font-black text-sm bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded-lg">
                                {userWeight} kg
                              </span>
                              <button
                                type="button"
                                onClick={() => setUserWeight(prev => Math.min(115, prev + 1))}
                                className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <input
                            type="range"
                            min="40"
                            max="115"
                            value={userWeight}
                            onChange={(e) => setUserWeight(Number(e.target.value))}
                            className="w-full accent-red-600 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                          />
                        </div>

                      </div>

                      {/* 3. Fit Preference Radio */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block font-bold">
                          Preferensi Siluet:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setFitPreference("boxy")}
                            className={`p-3 rounded-2xl border text-left transition ${
                              fitPreference === "boxy"
                                ? "bg-gradient-to-r from-red-950/50 to-[#181b24] border-red-500 text-white shadow-sm ring-1 ring-red-500"
                                : "bg-[#12141c] border-zinc-800 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs uppercase text-white">True Boxy</span>
                              <span className={`w-2.5 h-2.5 rounded-full ${fitPreference === "boxy" ? "bg-red-500" : "bg-zinc-700"}`} />
                            </div>
                            <p className="text-[11px] text-zinc-300 font-mono">
                              Drop 3-4 cm • Pas di pinggang.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFitPreference("baggy")}
                            className={`p-3 rounded-2xl border text-left transition ${
                              fitPreference === "baggy"
                                ? "bg-gradient-to-r from-red-950/50 to-[#181b24] border-red-500 text-white shadow-sm ring-1 ring-red-500"
                                : "bg-[#12141c] border-zinc-800 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs uppercase text-white">Baggy Oversize</span>
                              <span className={`w-2.5 h-2.5 rounded-full ${fitPreference === "baggy" ? "bg-red-500" : "bg-zinc-700"}`} />
                            </div>
                            <p className="text-[11px] text-zinc-300 font-mono">
                              Ekstra longgar • Santai di bawah pinggul.
                            </p>
                          </button>
                        </div>
                      </div>

                      {/* 4. Live Recommendation Card */}
                      <div className="bg-gradient-to-r from-red-950/40 via-[#151822] to-[#12141c] border border-red-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-red-950 shrink-0 border border-red-400">
                            {recommendation.size}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono uppercase text-red-400 font-bold bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded">
                                HASIL ANALISIS
                              </span>
                              <span className="text-xs text-white font-bold">
                                {fitPreference === "boxy" ? "True Boxy Fit" : "Baggy Oversized"}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-200 mt-1 leading-relaxed">
                              {recommendation.desc}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSize(recommendation.size);
                            setInspectedSize(recommendation.size);
                            setIsSizeGuideOpen(false);
                            showToast(`Ukuran ${recommendation.size} berhasil diterapkan!`, "success");
                          }}
                          className="w-full sm:w-auto shrink-0 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center space-x-1.5 active:scale-95"
                        >
                          <Check className="w-4 h-4" />
                          <span>Gunakan Ukuran {recommendation.size}</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>

                {/* Modal Footer with Active Size Summary */}
                <div className="px-4 sm:px-6 py-3 border-t border-zinc-800 bg-[#12141a] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="text-zinc-400">Ukuran Terpilih:</span>
                    <span className="px-2 py-0.5 rounded-lg bg-red-600 text-white font-black text-xs shadow-md">
                      {selectedSize}
                    </span>
                    <span className="text-zinc-300 hidden sm:inline">
                      • {STANDARD_SIZE_METRICS.find(m => m.size === selectedSize)?.persona} ({STANDARD_SIZE_METRICS.find(m => m.size === selectedSize)?.ld} cm)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => setIsSizeGuideOpen(false)}
                      className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs transition"
                    >
                      Tutup
                    </button>
                    <button
                      onClick={() => {
                        const targetSize = sizeGuideTab === "calculator" ? recommendation.size : inspectedSize;
                        setSelectedSize(targetSize);
                        setIsSizeGuideOpen(false);
                        showToast(`Ukuran ${targetSize} berhasil diterapkan!`, "success");
                      }}
                      className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1.5 active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        Gunakan Ukuran {sizeGuideTab === "calculator" ? recommendation.size : inspectedSize}
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      {/* 08b. SHOPPING BAG / MULTI-ITEM CHECKOUT SLIDE-OVER DRAWER */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsBagOpen(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl relative">
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wider text-white">SHOPPING BAG</h3>
                    <p className="text-[11px] font-mono text-zinc-400">
                      {cartItems.reduce((acc, it) => acc + it.qty, 0)} item terpilih
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-[10px] font-mono text-zinc-400 hover:text-red-400 px-2 py-1 rounded hover:bg-zinc-800 transition"
                      title="Kosongkan Bag"
                    >
                      Kosongkan
                    </button>
                  )}
                  <button 
                    onClick={() => setIsBagOpen(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bundle Perk Notification Banner */}
              {cartItems.length > 0 && (
                <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border-b border-emerald-900/40">
                  {cartItems.reduce((acc, it) => acc + it.qty, 0) >= 2 ? (
                    <div className="flex items-center space-x-2 text-xs text-emerald-300">
                      <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-mono font-bold text-[11px]">
                        🎉 BONUS STREETWEAR: Free Exclusive Sticker Pack & Ziplock aktif!
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-xs text-zinc-400">
                      <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-mono text-[11px]">
                        Beli minimal <strong className="text-white">2 kaos</strong> untuk dapatkan <strong className="text-amber-400">Free Sticker Pack & Ziplock Bag</strong>!
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-zinc-600">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-sm text-zinc-400 uppercase">Shopping Bag Masih Kosong</p>
                    <p className="text-xs font-mono text-zinc-600 mt-1 max-w-[240px]">
                      Pilih kaos favoritmu di katalog lalu klik tombol "+ Masukkan ke Bag".
                    </p>
                    <button
                      onClick={() => setIsBagOpen(false)}
                      className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs border border-zinc-800 transition"
                    >
                      Mulai Eksplor Katalog
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div 
                      key={`${item.productId}-${item.size}`} 
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center space-x-3 group hover:border-zinc-700 transition"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-lg object-cover bg-zinc-950 shrink-0 border border-zinc-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold border border-zinc-700">
                            Size: {item.size}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400">
                            {formatRupiah(item.price)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden bg-zinc-950">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition text-xs"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-mono font-bold text-white min-w-[24px] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-white">
                            {formatRupiah(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 rounded transition opacity-60 group-hover:opacity-100"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 space-y-3">
                  {/* Optional Delivery Information Accordion */}
                  <div className="space-y-2 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                      Data Pengiriman (Opsional / Praktis):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text"
                        placeholder="Nama Pembeli"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                      />
                      <input 
                        type="text"
                        placeholder="Kota / Kecamatan"
                        value={buyerCity}
                        onChange={(e) => setBuyerCity(e.target.value)}
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Total Jumlah:</span>
                      <span className="text-white font-bold">{cartItems.reduce((acc, it) => acc + it.qty, 0)} pcs</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Total Harga:</span>
                      <span className="text-lg font-bold text-white">
                        {formatRupiah(cartItems.reduce((acc, it) => acc + (it.price * it.qty), 0))}
                      </span>
                    </div>
                  </div>

                  {/* Primary Checkout WA Button */}
                  <button
                    onClick={handleBagCheckoutWA}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Checkout Semua via WhatsApp ({cartItems.reduce((acc, it) => acc + it.qty, 0)} Pcs)</span>
                  </button>

                  <p className="text-[10px] font-mono text-center text-zinc-500">
                    Format pesanan dikirim otomatis ke WA Admin (+62 821-1407-2159)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 09. COMPREHENSIVE & RELAXED ADMIN CMS DASHBOARD */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className={`fixed inset-0 backdrop-blur-md transition-colors ${
              adminTheme === 'light' ? 'bg-slate-900/50' : 'bg-black/90'
            }`} 
            onClick={() => setIsAdminOpen(false)}
          ></div>
          <div className="min-h-full flex items-center justify-center p-2 sm:p-5 relative z-10">
            <div className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden relative h-[88vh] max-h-[820px] min-h-[560px] flex flex-col transition-colors duration-150 ${
              adminTheme === 'light' 
                ? 'bg-slate-50 text-slate-800 border-slate-200' 
                : 'bg-zinc-950 text-white border-zinc-800'
            }`}>
              
              {/* Admin Header */}
              <div className={`p-4 sm:p-5 border-b flex items-center justify-between shrink-0 transition-colors ${
                adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-black/60 border-zinc-800'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="relative shrink-0">
                    <img 
                      src="/dedicate-logo.png" 
                      alt="Logo Resmi" 
                      className="w-10 h-10 rounded-full object-cover border border-[#7A0006]/50 shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-black text-lg uppercase tracking-tight ${
                        adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        DEDICATEREALITE <span className="text-[#A60009]">CMS</span>
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold border ${
                        adminTheme === 'light' 
                          ? 'bg-slate-100 text-slate-700 border-slate-300' 
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}>
                        Admin Portal
                      </span>
                    </div>
                    <p className={`text-xs font-mono ${
                      adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                    }`}>
                      Kelola katalog apparel, ubah stok dengan 1-klik, & atur WhatsApp toko.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Theme Switcher: Rileks (Light) vs Dark */}
                  <button 
                    onClick={() => setAdminTheme(adminTheme === "light" ? "dark" : "light")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center space-x-1.5 transition ${
                      adminTheme === "light" 
                        ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" 
                        : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300"
                    }`}
                    title="Ganti Tema Dasbor"
                  >
                    {adminTheme === "light" ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="hidden sm:inline font-bold">{adminTheme === "light" ? "Mode Rileks" : "Mode Gelap"}</span>
                  </button>

                  <button 
                    onClick={() => setIsAdminOpen(false)} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      adminTheme === "light" 
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200" 
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isAdminLoggedIn ? (
                /* Auth Gate */
                <div className="max-w-md mx-auto text-center space-y-5 py-14 px-6">
                  <div className="relative inline-block mx-auto">
                    <img 
                      src="/dedicate-logo.png" 
                      alt="Logo Dedicate" 
                      className="w-20 h-20 rounded-full mx-auto shadow-lg border-2 border-[#7A0006]/40 object-cover" 
                    />
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#7A0006] text-white flex items-center justify-center border-2 border-white shadow-xs">
                      <Lock className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-black text-xl uppercase ${
                      adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Akses Dasbor Admin
                    </h4>
                    <p className={`text-xs font-mono mt-1 ${
                      adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                    }`}>
                      Masukkan passcode toko untuk mengelola katalog pakaian & pesanan secara nyaman.
                    </p>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Masukkan Passcode Admin..." 
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (adminPasscode === "dedicate2024" || adminPasscode === "admin123") {
                          setIsAdminLoggedIn(true);
                          showToast("Login Admin Berhasil", "success");
                        } else {
                          showToast("Passcode salah!", "warning");
                        }
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-xs font-mono text-center outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-[#7A0006] focus:ring-2 focus:ring-[#7A0006]/10 shadow-sm'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  />
                  <button 
                    onClick={() => {
                      if (adminPasscode === "dedicate2024" || adminPasscode === "admin123") {
                        setIsAdminLoggedIn(true);
                        showToast("Login Admin Berhasil", "success");
                      } else {
                        showToast("Passcode salah!", "warning");
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-[#7A0006] hover:bg-[#991b1b] text-white font-mono text-xs uppercase font-bold transition shadow-md shadow-[#7A0006]/20 active:scale-[0.99]"
                  >
                    Masuk ke Dasbor
                  </button>
                  <div className={`text-[11px] font-mono ${
                    adminTheme === 'light' ? 'text-slate-400' : 'text-zinc-500'
                  }`}>
                    Passcode Default: <code className="text-[#A60009] font-bold">dedicate2024</code>
                  </div>
                </div>
              ) : (
                /* Main Admin Body */
                <div className="flex-1 flex flex-col overflow-hidden">
                  
                  {/* Top Admin Navigation Tabs & Stats Bar */}
                  <div className={`p-4 sm:p-5 border-b shrink-0 space-y-3.5 transition-colors ${
                    adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-zinc-900/60 border-zinc-800'
                  }`}>
                    
                    {/* Quick Stats Pill Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      }`}>
                        <span className={adminTheme === 'light' ? 'text-slate-500 font-medium' : 'text-zinc-400'}>Total Kaos:</span>
                        <span className={`font-black text-base ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>{products.length}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                        adminTheme === 'light'
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800 shadow-xs'
                          : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300'
                      }`}>
                        <span className={adminTheme === 'light' ? 'text-emerald-700 font-medium' : 'text-emerald-400'}>Ready Stock:</span>
                        <span className="font-black text-base">{countReady}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                        adminTheme === 'light'
                          ? 'bg-amber-50/80 border-amber-200 text-amber-800 shadow-xs'
                          : 'bg-amber-950/40 border-amber-900/60 text-amber-300'
                      }`}>
                        <span className={adminTheme === 'light' ? 'text-amber-700 font-medium' : 'text-amber-400'}>Fast PO:</span>
                        <span className="font-black text-base">{countPO}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                        adminTheme === 'light'
                          ? 'bg-rose-50/80 border-rose-200 text-rose-800 shadow-xs'
                          : 'bg-red-950/40 border-red-900/60 text-red-300'
                      }`}>
                        <span className={adminTheme === 'light' ? 'text-rose-700 font-medium' : 'text-red-400'}>Sold Out:</span>
                        <span className="font-black text-base">{countSold}</span>
                      </div>
                    </div>

                    {/* Navigation Tab Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs font-mono overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        <button 
                          onClick={() => setAdminActiveTab("products")}
                          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                            adminActiveTab === "products" 
                              ? "bg-[#7A0006] text-white shadow-md shadow-[#7A0006]/20" 
                              : adminTheme === 'light'
                                ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                          }`}
                        >
                          Katalog ({products.length})
                        </button>
                        <button 
                          onClick={() => setAdminActiveTab("showcase")}
                          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                            adminActiveTab === "showcase" 
                              ? "bg-[#7A0006] text-white shadow-md shadow-[#7A0006]/20" 
                              : adminTheme === 'light'
                                ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                          }`}
                        >
                          Showcase ({showcaseSlides.length})
                        </button>
                        <button 
                          onClick={() => setAdminActiveTab("lookbook")}
                          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                            adminActiveTab === "lookbook" 
                              ? "bg-[#7A0006] text-white shadow-md shadow-[#7A0006]/20" 
                              : adminTheme === 'light'
                                ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                          }`}
                        >
                          Lookbook ({lookbookItems.length})
                        </button>
                        <button 
                          onClick={() => setAdminActiveTab("settings")}
                          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                            adminActiveTab === "settings" 
                              ? "bg-[#7A0006] text-white shadow-md shadow-[#7A0006]/20" 
                              : adminTheme === 'light'
                                ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                          }`}
                        >
                          Pengaturan WA
                        </button>
                        <button 
                          onClick={() => setAdminActiveTab("backup")}
                          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                            adminActiveTab === "backup" 
                              ? "bg-[#7A0006] text-white shadow-md shadow-[#7A0006]/20" 
                              : adminTheme === 'light'
                                ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                          }`}
                        >
                          Backup JSON
                        </button>
                      </div>

                      <div className="shrink-0 flex items-center justify-end min-h-[34px]">
                        {adminActiveTab === "products" && (
                          <button 
                            onClick={openAddProductModal}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Tambah Produk</span>
                          </button>
                        )}
                        {adminActiveTab === "showcase" && (
                          <button 
                            onClick={openAddShowcaseModal}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Tambah Slide</span>
                          </button>
                        )}
                        {adminActiveTab === "lookbook" && (
                          <button 
                            onClick={openAddLookbookModal}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Tambah Lookbook</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Tab 1: Products List with Instant Quick Switcher */}
                  {adminActiveTab === "products" && (
                    <div className={`flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-4 ${
                      adminTheme === 'light' ? 'bg-slate-50' : 'bg-transparent'
                    }`}>
                      
                      {/* Search & Filter Bar */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shrink-0">
                        <div className="relative w-full sm:w-72">
                          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                            adminTheme === 'light' ? 'text-slate-400' : 'text-zinc-500'
                          }`} />
                          <input 
                            type="text" 
                            placeholder="Cari nama atau SKU..." 
                            value={adminSearch}
                            onChange={(e) => setAdminSearch(e.target.value)}
                            className={`w-full pl-9 pr-3 py-2 rounded-xl outline-none border transition ${
                              adminTheme === 'light'
                                ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#7A0006] shadow-xs'
                                : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                            }`}
                          />
                        </div>

                        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto">
                          <span className={`text-[11px] ${
                            adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-500'
                          }`}>Status:</span>
                          {["ALL", "READY", "PREORDER", "SOLDOUT"].map(st => (
                            <button 
                              key={st}
                              onClick={() => setAdminStatusFilter(st)}
                              className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold transition ${
                                adminStatusFilter === st 
                                  ? "bg-[#7A0006] text-white shadow-xs" 
                                  : adminTheme === 'light'
                                    ? "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
                                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Products Table with Inline Switcher */}
                      <div className={`flex-1 overflow-y-auto rounded-2xl border shadow-xs transition ${
                        adminTheme === 'light' 
                          ? 'bg-white border-slate-200' 
                          : 'bg-zinc-950 border-zinc-800'
                      }`}>
                        <table className="w-full text-left text-xs font-mono">
                          <thead className={`border-b sticky top-0 z-10 backdrop-blur ${
                            adminTheme === 'light' 
                              ? 'bg-slate-100/90 text-slate-600 border-slate-200 font-bold' 
                              : 'bg-black/60 text-zinc-400 border-zinc-800'
                          }`}>
                            <tr>
                              <th className="py-3 px-4">Produk & SKU</th>
                              <th className="py-3 px-3">Gramasi / Fit</th>
                              <th className="py-3 px-3">Harga</th>
                              <th className="py-3 px-3">Quick Stock Switcher</th>
                              <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${
                            adminTheme === 'light' 
                              ? 'divide-slate-100 text-slate-800' 
                              : 'divide-zinc-800 text-white'
                          }`}>
                            {adminFilteredProducts.map(p => (
                              <tr key={p.id} className={`transition ${
                                adminTheme === 'light' ? 'hover:bg-slate-50/90' : 'hover:bg-zinc-900/40'
                              }`}>
                                <td className="py-3.5 px-4 flex items-center space-x-3">
                                  <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className={`w-11 h-11 rounded-xl object-cover border shrink-0 ${
                                      adminTheme === 'light' ? 'border-slate-200' : 'border-zinc-800'
                                    }`} 
                                  />
                                  <div>
                                    <div className={`font-bold uppercase line-clamp-1 ${
                                      adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                                    }`}>{p.name}</div>
                                    <div className="text-[10px] text-[#A60009] font-bold">{p.sku} • {p.category}</div>
                                  </div>
                                </td>

                                <td className="py-3.5 px-3">
                                  <div className={`font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>{p.fabricGsm} GSM</div>
                                  <div className={`text-[10px] ${adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>{p.fitType}</div>
                                </td>

                                <td className={`py-3.5 px-3 font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                                  {formatRupiah(p.price)}
                                </td>

                                {/* Quick Switcher Buttons */}
                                <td className="py-3.5 px-3">
                                  <div className={`inline-flex rounded-lg border overflow-hidden text-[10px] font-bold ${
                                    adminTheme === 'light' ? 'border-slate-200 bg-slate-100 p-0.5 shadow-xs' : 'border-zinc-800 bg-zinc-900'
                                  }`}>
                                    <button 
                                      onClick={() => handleQuickStatusSwitch(p.id, "READY")}
                                      className={`px-2.5 py-1 rounded-md transition ${
                                        p.status === "READY" 
                                          ? "bg-emerald-600 text-white shadow-xs" 
                                          : adminTheme === 'light' ? "text-slate-600 hover:text-slate-900 hover:bg-white/80" : "text-zinc-400 hover:text-white"
                                      }`}
                                      title="Set Ready Stock"
                                    >
                                      READY
                                    </button>
                                    <button 
                                      onClick={() => handleQuickStatusSwitch(p.id, "PREORDER")}
                                      className={`px-2.5 py-1 rounded-md transition ${
                                        p.status === "PREORDER" 
                                          ? "bg-amber-500 text-white shadow-xs" 
                                          : adminTheme === 'light' ? "text-slate-600 hover:text-slate-900 hover:bg-white/80" : "text-zinc-400 hover:text-white"
                                      }`}
                                      title="Set Open PO"
                                    >
                                      PO
                                    </button>
                                    <button 
                                      onClick={() => handleQuickStatusSwitch(p.id, "SOLDOUT")}
                                      className={`px-2.5 py-1 rounded-md transition ${
                                        p.status === "SOLDOUT" 
                                          ? "bg-rose-600 text-white shadow-xs" 
                                          : adminTheme === 'light' ? "text-slate-600 hover:text-slate-900 hover:bg-white/80" : "text-zinc-400 hover:text-white"
                                      }`}
                                      title="Set Sold Out"
                                    >
                                      SOLD
                                    </button>
                                  </div>
                                </td>

                                {/* Actions */}
                                <td className="py-3.5 px-4 text-right space-x-1.5">
                                  <button 
                                    onClick={() => openEditProductModal(p)}
                                    className={`p-2 rounded-lg border transition ${
                                      adminTheme === 'light'
                                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900'
                                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                                    }`}
                                    title="Edit Produk"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className={`p-2 rounded-lg border transition ${
                                      adminTheme === 'light'
                                        ? 'bg-slate-100 hover:bg-rose-50 border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200'
                                        : 'bg-zinc-900 hover:bg-red-950/60 border-zinc-800 text-zinc-400 hover:text-red-400'
                                    }`}
                                    title="Hapus Produk"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}

                  {/* Tab: Showcase Squeeze Carousel CMS */}
                  {adminActiveTab === "showcase" && (
                    <div className={`flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-3.5 ${
                      adminTheme === 'light' ? 'bg-slate-50' : 'bg-transparent'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono shrink-0 py-0.5">
                        <div className="flex items-center space-x-2">
                          <Layers className="w-4 h-4 text-[#A60009]" />
                          <span className={`font-bold uppercase text-xs ${
                            adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Hero Squeeze Carousel Drops
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            adminTheme === 'light' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                          }`}>
                            {showcaseSlides.length} Slide
                          </span>
                        </div>
                        <p className={`text-[11px] hidden sm:block ${
                          adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                        }`}>
                          Gunakan tombol panah untuk mengatur urutan geser carousel di beranda
                        </p>
                      </div>

                      {/* Showcase Slides Table */}
                      <div className={`flex-1 overflow-y-auto rounded-2xl border shadow-xs transition-colors ${
                        adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
                      }`}>
                        <table className="w-full text-left text-xs font-mono">
                          <thead className={`border-b sticky top-0 z-10 backdrop-blur ${
                            adminTheme === 'light' 
                              ? 'bg-slate-100/90 text-slate-600 border-slate-200 font-bold' 
                              : 'bg-black/60 text-zinc-400 border-zinc-800'
                          }`}>
                            <tr>
                              <th className="py-3 px-3 w-16 text-center">Urutan</th>
                              <th className="py-3 px-4">Slide & Drop Badge</th>
                              <th className="py-3 px-3">Tautan Produk</th>
                              <th className="py-3 px-3">Tombol Aksi</th>
                              <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${
                            adminTheme === 'light' ? 'divide-slate-100 text-slate-800' : 'divide-zinc-800 text-white'
                          }`}>
                            {showcaseSlides.map((slide, idx) => {
                              const linkedProd = products.find(p => p.id === slide.linkedProductId);
                              return (
                                <tr key={slide.id} className={`transition ${
                                  adminTheme === 'light' ? 'hover:bg-slate-50/90' : 'hover:bg-zinc-900/40'
                                }`}>
                                  {/* Reorder Buttons */}
                                  <td className="py-3.5 px-3 text-center">
                                    <div className="flex flex-col items-center space-y-1">
                                      <button 
                                        onClick={() => handleMoveShowcase(idx, "up")}
                                        disabled={idx === 0}
                                        className={`p-1 rounded hover:bg-black/10 transition disabled:opacity-20 disabled:cursor-not-allowed ${
                                          adminTheme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
                                        }`}
                                        title="Geser ke Atas"
                                      >
                                        <ArrowUp className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="font-bold text-[11px] text-[#A60009]">#{idx + 1}</span>
                                      <button 
                                        onClick={() => handleMoveShowcase(idx, "down")}
                                        disabled={idx === showcaseSlides.length - 1}
                                        className={`p-1 rounded hover:bg-black/10 transition disabled:opacity-20 disabled:cursor-not-allowed ${
                                          adminTheme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
                                        }`}
                                        title="Geser ke Bawah"
                                      >
                                        <ArrowDown className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>

                                  {/* Thumbnail & Title */}
                                  <td className="py-3.5 px-4 flex items-center space-x-3">
                                    <img 
                                      src={slide.image} 
                                      alt={slide.title} 
                                      className={`w-16 h-12 rounded-xl object-cover border shrink-0 ${
                                        adminTheme === 'light' ? 'border-slate-200' : 'border-zinc-800'
                                      }`}
                                    />
                                    <div className="min-w-0">
                                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#7A0006]/15 text-[#A60009] border border-[#7A0006]/30 mb-1">
                                        {slide.dropCode}
                                      </span>
                                      <div className={`font-bold uppercase line-clamp-1 ${
                                        adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                                      }`}>{slide.title}</div>
                                      <div className={`text-[11px] line-clamp-1 ${
                                        adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                                      }`}>{slide.description}</div>
                                    </div>
                                  </td>

                                  {/* Linked Product */}
                                  <td className="py-3.5 px-3">
                                    {linkedProd ? (
                                      <div className="flex items-center space-x-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                        <div>
                                          <div className={`font-bold line-clamp-1 ${
                                            adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                                          }`}>{linkedProd.name}</div>
                                          <div className="text-[10px] text-emerald-600 font-bold">{linkedProd.sku} • {formatRupiah(linkedProd.price)}</div>
                                        </div>
                                      </div>
                                    ) : (
                                      <span className={`text-[10px] italic ${
                                        adminTheme === 'light' ? 'text-slate-400' : 'text-zinc-500'
                                      }`}>Tanpa tautan (Scroll Katalog)</span>
                                    )}
                                  </td>

                                  {/* CTA Action */}
                                  <td className="py-3.5 px-3">
                                    <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold inline-block ${
                                      adminTheme === 'light' 
                                        ? 'border-slate-200 bg-slate-100 text-slate-700' 
                                        : 'border-zinc-800 bg-zinc-900 text-zinc-300'
                                    }`}>
                                      {slide.actionText}
                                    </span>
                                  </td>

                                  {/* Action Buttons */}
                                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                    <button 
                                      onClick={() => openEditShowcaseModal(slide)}
                                      className={`p-2 rounded-lg border transition ${
                                        adminTheme === 'light'
                                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900'
                                          : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                                      }`}
                                      title="Edit Slide"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteShowcase(slide.id)}
                                      className={`p-2 rounded-lg border transition ${
                                        adminTheme === 'light'
                                          ? 'bg-slate-100 hover:bg-rose-50 border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200'
                                          : 'bg-zinc-900 hover:bg-red-950/60 border-zinc-800 text-zinc-400 hover:text-red-400'
                                      }`}
                                      title="Hapus Slide"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Tab: Lookbook CMS */}
                  {adminActiveTab === "lookbook" && (
                    <div className={`flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-3.5 ${
                      adminTheme === 'light' ? 'bg-slate-50' : 'bg-transparent'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono shrink-0 py-0.5">
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-[#A60009]" />
                          <span className={`font-bold uppercase text-xs ${
                            adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Street Style Editorial Lookbook
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            adminTheme === 'light' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                          }`}>
                            {lookbookItems.length} Foto
                          </span>
                        </div>
                        <p className={`text-[11px] hidden sm:block ${
                          adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                        }`}>
                          Tautkan foto ke katalog pakaian untuk fitur direct shop-look
                        </p>
                      </div>

                      {/* Lookbook Cards Container */}
                      <div className={`flex-1 overflow-y-auto rounded-2xl border shadow-xs p-4 sm:p-5 transition-colors ${
                        adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
                      }`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {lookbookItems.map((item, idx) => {
                            const linkedProd = products.find(p => p.id === item.linkedProductId);
                            return (
                              <div 
                                key={item.id}
                                className={`rounded-2xl border overflow-hidden flex flex-col transition shadow-xs ${
                                  adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
                                }`}
                              >
                                <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                  <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur font-mono text-[9px] text-white uppercase border border-white/10 font-bold">
                                      {item.tag}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded bg-[#7A0006] text-white font-mono text-[9px] font-bold">
                                      #{idx + 1}
                                    </span>
                                  </div>
                                </div>

                                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                                  <div className="space-y-1">
                                    <h4 className={`font-black text-xs uppercase line-clamp-1 ${
                                      adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                                    }`}>
                                      {item.title}
                                    </h4>
                                    <div className="flex items-center space-x-1 text-[10px] text-[#A60009] font-semibold truncate">
                                      <MapPin className="w-3 h-3 shrink-0" />
                                      <span className="truncate">{item.location}</span>
                                    </div>
                                    {item.specs && (
                                      <div className={`text-[10px] font-mono ${
                                        adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                                      }`}>
                                        {item.specs}
                                      </div>
                                    )}
                                    {item.caption && (
                                      <p className={`text-[10px] line-clamp-2 italic ${
                                        adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                                      }`}>
                                        "{item.caption}"
                                      </p>
                                    )}
                                  </div>

                                  <div className={`pt-2 border-t flex items-center justify-between ${
                                    adminTheme === 'light' ? 'border-slate-100' : 'border-zinc-800'
                                  }`}>
                                    <div className="text-[10px]">
                                      {linkedProd ? (
                                        <span className="text-emerald-600 font-bold flex items-center space-x-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                          <span className="truncate max-w-[110px]">{linkedProd.sku}</span>
                                        </span>
                                      ) : (
                                        <span className={adminTheme === 'light' ? 'text-slate-400' : 'text-zinc-500'}>Tanpa link</span>
                                      )}
                                    </div>

                                    <div className="flex items-center space-x-1">
                                      <button 
                                        onClick={() => handleMoveLookbook(idx, "left")}
                                        disabled={idx === 0}
                                        className={`p-1.5 rounded-lg border transition disabled:opacity-20 ${
                                          adminTheme === 'light' ? 'border-slate-200 hover:bg-slate-100 text-slate-700' : 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
                                        }`}
                                        title="Geser ke Kiri"
                                      >
                                        <ArrowUp className="w-3 h-3 -rotate-90" />
                                      </button>
                                      <button 
                                        onClick={() => handleMoveLookbook(idx, "right")}
                                        disabled={idx === lookbookItems.length - 1}
                                        className={`p-1.5 rounded-lg border transition disabled:opacity-20 ${
                                          adminTheme === 'light' ? 'border-slate-200 hover:bg-slate-100 text-slate-700' : 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
                                        }`}
                                        title="Geser ke Kanan"
                                      >
                                        <ArrowDown className="w-3 h-3 -rotate-90" />
                                      </button>
                                      <button 
                                        onClick={() => openEditLookbookModal(item)}
                                        className={`p-1.5 rounded-lg border transition ${
                                          adminTheme === 'light' ? 'border-slate-200 hover:bg-slate-100 text-slate-700' : 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
                                        }`}
                                        title="Edit Lookbook"
                                      >
                                        <Edit3 className="w-3 h-3" />
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteLookbook(item.id)}
                                        className={`p-1.5 rounded-lg border transition ${
                                          adminTheme === 'light' ? 'border-slate-200 hover:bg-rose-50 text-rose-600' : 'border-zinc-800 hover:bg-red-950/50 text-red-400'
                                        }`}
                                        title="Hapus Lookbook"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: WhatsApp & Store Settings */}
                  {adminActiveTab === "settings" && (
                    <div className={`flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-3.5 ${
                      adminTheme === 'light' ? 'bg-slate-50' : 'bg-transparent'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono shrink-0 py-0.5">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4 text-emerald-500" />
                          <span className={`font-bold uppercase text-xs ${
                            adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Pengaturan WhatsApp & Toko
                          </span>
                        </div>
                        <p className={`text-[11px] hidden sm:block ${
                          adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                        }`}>
                          Nomor tujuan order & teks announcement bar berjalan
                        </p>
                      </div>

                      <div className={`flex-1 overflow-y-auto rounded-2xl border shadow-xs p-5 sm:p-6 transition-colors ${
                        adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
                      }`}>
                        <div className="max-w-2xl space-y-6">
                          <div className={`p-5 rounded-2xl border space-y-4 font-mono text-xs transition shadow-xs ${
                            adminTheme === 'light'
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-zinc-900/60 border-zinc-800 text-white'
                          }`}>
                            <h5 className={`font-bold text-sm uppercase flex items-center space-x-2 ${
                              adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                            }`}>
                              <MessageCircle className="w-4 h-4 text-emerald-500" />
                              <span>Nomor WhatsApp Tujuan Checkout</span>
                            </h5>
                            
                            <div>
                              <label className={`block text-[11px] mb-1.5 ${
                                adminTheme === 'light' ? 'text-slate-600' : 'text-zinc-400'
                              }`}>Nomor WhatsApp Admin (Format 62...):</label>
                              <input 
                                type="text" 
                                value={waNumber}
                                onChange={(e) => setWaNumber(e.target.value)}
                                className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                                  adminTheme === 'light'
                                    ? 'bg-white border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600'
                                    : 'bg-zinc-900 border-zinc-800 text-white focus:border-emerald-600'
                                }`}
                              />
                              <span className={`text-[10px] mt-1.5 block ${
                                adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                              }`}>
                                Nomor terverifikasi saat ini: <strong className="text-emerald-600 font-bold">+{waNumber}</strong>
                              </span>
                            </div>

                            <div className="flex items-center space-x-2 pt-1">
                              <button 
                                onClick={() => {
                                  window.open(`https://wa.me/${waNumber}?text=Halo%20Admin%20Dedicaterealite!%20Tes%20koneksi%20berhasil%20🔥`, '_blank');
                                }}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Tes Hubungkan WhatsApp</span>
                              </button>
                              <button 
                                onClick={() => {
                                  setWaNumber(OFFICIAL_WA_NUMBER);
                                  showToast("Nomor di-reset ke +62 821-1407-2159", "success");
                                }}
                                className={`px-3 py-2 rounded-xl border text-xs transition ${
                                  adminTheme === 'light'
                                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                                }`}
                              >
                                Reset ke Default
                              </button>
                            </div>
                          </div>

                          {/* Announcement Bar Marquee Editor */}
                          <div className={`p-5 rounded-2xl border space-y-3 font-mono text-xs transition shadow-xs ${
                            adminTheme === 'light'
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-zinc-900/60 border-zinc-800 text-white'
                          }`}>
                            <h5 className={`font-bold text-sm uppercase ${
                              adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                            }`}>Teks Running Announcement Bar</h5>
                            <input 
                              type="text" 
                              value={announcementText}
                              onChange={(e) => setAnnouncementText(e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                                adminTheme === 'light'
                                  ? 'bg-white border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                                  : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                              }`}
                            />
                            <button 
                              onClick={() => showToast("Teks announcement berhasil disimpan", "success")}
                              className="px-4 py-2 rounded-xl bg-[#7A0006] hover:bg-[#991b1b] text-white font-bold text-xs uppercase shadow-sm transition"
                            >
                              Simpan Pengumuman
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Tab 3: Backup & Restore JSON */}
                  {adminActiveTab === "backup" && (
                    <div className={`flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-3.5 ${
                      adminTheme === 'light' ? 'bg-slate-50' : 'bg-transparent'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono shrink-0 py-0.5">
                        <div className="flex items-center space-x-2">
                          <Download className="w-4 h-4 text-[#A60009]" />
                          <span className={`font-bold uppercase text-xs ${
                            adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Backup & Restore Master Data
                          </span>
                        </div>
                        <p className={`text-[11px] hidden sm:block ${
                          adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                        }`}>
                          Unduh arsip offline lengkap atau reset data ke konfigurasi pabrik
                        </p>
                      </div>

                      <div className={`flex-1 overflow-y-auto rounded-2xl border shadow-xs p-5 sm:p-6 transition-colors ${
                        adminTheme === 'light' ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
                      }`}>
                        <div className="max-w-2xl space-y-5">
                          <div className={`p-5 rounded-2xl border space-y-3 shadow-xs transition ${
                            adminTheme === 'light'
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-zinc-900/60 border-zinc-800 text-white'
                          }`}>
                            <div className={`font-bold uppercase ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                              Download Backup Master Data (JSON)
                            </div>
                            <p className={`text-[11px] ${adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'}`}>
                              Unduh seluruh arsip data pakaian, slide showcase hero, editorial lookbook, dan pengaturan toko sebagai cadangan JSON.
                            </p>
                            <button 
                              onClick={() => {
                                const payload = {
                                  version: "2.1",
                                  exportedAt: new Date().toISOString(),
                                  products,
                                  showcaseSlides,
                                  lookbookItems,
                                  waNumber,
                                  announcementText
                                };
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
                                const anchor = document.createElement('a');
                                anchor.setAttribute("href", dataStr);
                                anchor.setAttribute("download", `dedicaterealite_full_backup_${new Date().toISOString().slice(0, 10)}.json`);
                                anchor.click();
                                showToast("Backup JSON lengkap berhasil diunduh!", "success");
                              }}
                              className={`px-3.5 py-2.5 rounded-xl border flex items-center space-x-1.5 transition ${
                                adminTheme === 'light'
                                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800 font-semibold'
                                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                              }`}
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh File JSON Lengkap</span>
                            </button>
                          </div>

                          <div className={`p-5 rounded-2xl border space-y-3 transition ${
                            adminTheme === 'light'
                              ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                              : 'bg-red-950/20 border-red-900/50 text-white'
                          }`}>
                            <div className="font-bold text-rose-700 uppercase">Reset Data Pabrik</div>
                            <p className={`text-[11px] ${adminTheme === 'light' ? 'text-rose-600' : 'text-zinc-400'}`}>
                              Kembalikan semua item pakaian, slide showcase hero, dan editorial lookbook ke versi default streetwear Dedicaterealite.
                            </p>
                            <button 
                              onClick={() => {
                                if (confirm("Reset seluruh data produk, showcase, dan lookbook ke default?")) {
                                  setProducts(INITIAL_PRODUCTS);
                                  setShowcaseSlides(INITIAL_SHOWCASE_SLIDES);
                                  setLookbookItems(INITIAL_LOOKBOOK_ITEMS);
                                  setWaNumber(OFFICIAL_WA_NUMBER);
                                  showToast("Data katalog, showcase, & lookbook di-reset ke default", "info");
                                }
                              }}
                              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition shadow-xs"
                            >
                              Reset ke Default Pabrik
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 10. STREAMLINED ADD / EDIT PRODUCT MODAL (WITH IMAGE FILE UPLOAD SUPPORT) */}
      {isProductFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className={`fixed inset-0 backdrop-blur-sm transition-colors ${
              adminTheme === 'light' ? 'bg-slate-900/50' : 'bg-black/85'
            }`} 
            onClick={() => setIsProductFormOpen(false)}
          ></div>
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10">
            <div className={`w-full max-w-3xl rounded-3xl border shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto transition-all ${
              adminTheme === 'light' 
                ? 'bg-white text-slate-800 border-slate-200' 
                : 'bg-zinc-950 text-white border-zinc-800'
            }`}>
              
              <button 
                onClick={() => setIsProductFormOpen(false)} 
                className={`absolute top-5 right-5 transition ${
                  adminTheme === 'light' ? 'text-slate-400 hover:text-slate-700' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-5">
                <img 
                  src="/dedicate-logo.png" 
                  alt="Logo Dedicate" 
                  className="w-8 h-8 rounded-full object-cover border border-[#7A0006]/50 shadow-xs" 
                />
                <h4 className={`text-xl font-black uppercase tracking-tight ${
                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {editingProduct ? `Edit Produk // ${editingProduct.sku}` : "Tambah Produk Streetwear Baru"}
                </h4>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
                
                {/* Row 1: Name & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Nama Kaos / Item</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: ACID RAIN Boxy Tee" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006] focus:ring-2 focus:ring-[#7A0006]/10'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Kode SKU</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: DDC-TC-007" 
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006] focus:ring-2 focus:ring-[#7A0006]/10'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 2: Category, Price, Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Kategori</label>
                    <select 
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    >
                      <option value="Boxy Tee">Boxy Tee</option>
                      <option value="Oversized Tee">Oversized Tee</option>
                      <option value="Heavyweight Tee">Heavyweight Tee</option>
                      <option value="Longsleeve">Longsleeve</option>
                      <option value="Outerwear">Outerwear</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Harga (Rupiah)</label>
                    <input 
                      type="number" 
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Status Ketersediaan</label>
                    <select 
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    >
                      <option value="READY">READY STOCK</option>
                      <option value="PREORDER">OPEN FAST PO</option>
                      <option value="SOLDOUT">SOLD OUT</option>
                    </select>
                  </div>
                </div>

                {/* Fast Preset Chips for Streetwear Specs */}
                <div className={`p-3.5 rounded-2xl border space-y-2 transition ${
                  adminTheme === 'light' 
                    ? 'bg-slate-50 border-slate-200' 
                    : 'bg-zinc-900/50 border-zinc-800'
                }`}>
                  <div className={`text-[10px] uppercase font-semibold ${
                    adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-400'
                  }`}>Pilih Cepat Presets Gramasi & Bahan (1-Click Fill):</div>
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      type="button"
                      onClick={() => {
                        setFormGsm(235);
                        setFormMaterial("Heavyweight Cotton Combed 16s");
                        setFormFit("Boxy Fit");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] transition ${
                        adminTheme === 'light'
                          ? 'bg-white hover:bg-[#7A0006] text-slate-700 hover:text-white border border-slate-200 shadow-xs'
                          : 'bg-zinc-800 hover:bg-[#7A0006] text-white'
                      }`}
                    >
                      16s Heavyweight (235 GSM)
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setFormGsm(260);
                        setFormMaterial("Vintage Washed Cotton 14s");
                        setFormFit("Boxy Fit");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] transition ${
                        adminTheme === 'light'
                          ? 'bg-white hover:bg-[#7A0006] text-slate-700 hover:text-white border border-slate-200 shadow-xs'
                          : 'bg-zinc-800 hover:bg-[#7A0006] text-white'
                      }`}
                    >
                      14s Acid Washed (260 GSM)
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setFormGsm(240);
                        setFormMaterial("Ultra-Combed Cotton Heavy 16s");
                        setFormFit("Loose Oversized");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] transition ${
                        adminTheme === 'light'
                          ? 'bg-white hover:bg-[#7A0006] text-slate-700 hover:text-white border border-slate-200 shadow-xs'
                          : 'bg-zinc-800 hover:bg-[#7A0006] text-white'
                      }`}
                    >
                      Collab Oversized (240 GSM)
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setFormGsm(380);
                        setFormMaterial("Heavyweight Cotton Fleece");
                        setFormFit("Loose Oversized");
                        setFormCategory("Outerwear");
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] transition ${
                        adminTheme === 'light'
                          ? 'bg-white hover:bg-[#7A0006] text-slate-700 hover:text-white border border-slate-200 shadow-xs'
                          : 'bg-zinc-800 hover:bg-[#7A0006] text-white'
                      }`}
                    >
                      Hoodie Fleece (380 GSM)
                    </button>
                  </div>
                </div>

                {/* Image Upload from Local Computer / Instagram Save */}
                <div className={`p-4 rounded-2xl border space-y-2 transition ${
                  adminTheme === 'light'
                    ? 'bg-slate-50 border-slate-200' 
                    : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <label className={`block font-bold uppercase text-[11px] ${
                    adminTheme === 'light' ? 'text-slate-800' : 'text-zinc-300'
                  }`}>Foto Produk (Unggah Gambar dari PC/HP atau Input Link):</label>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    {/* Live Thumbnail Preview */}
                    {formImage ? (
                      <img 
                        src={formImage} 
                        alt="Preview" 
                        className={`w-16 h-16 rounded-xl object-cover border shrink-0 ${
                          adminTheme === 'light' ? 'border-slate-300 shadow-xs' : 'border-zinc-700'
                        }`} 
                      />
                    ) : (
                      <div className={`w-16 h-16 rounded-xl border flex items-center justify-center shrink-0 ${
                        adminTheme === 'light' ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                      }`}>
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}

                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs flex items-center space-x-1.5 border transition ${
                          adminTheme === 'light'
                            ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'
                        }`}>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih Foto dari Perangkat</span>
                          <input type="file" accept="image/*" onChange={handleLocalImageUpload} className="hidden" />
                        </label>
                        <span className={`text-[10px] ${adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-500'}`}>
                          atau paste link gambar di bawah
                        </span>
                      </div>
                      
                      <input 
                        type="text" 
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://... (URL gambar Instagram atau CDN)"
                        className={`w-full px-3 py-2 rounded-xl outline-none text-xs border transition ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#7A0006]'
                            : 'bg-black/60 border-zinc-800 text-white focus:border-[#7A0006]'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* GSM, Material, Fit, Print */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Gramasi Katun (GSM)</label>
                    <input 
                      type="number" 
                      value={formGsm}
                      onChange={(e) => setFormGsm(Number(e.target.value))}
                      className={`w-full px-3 py-2 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Bahan Kain</label>
                    <input 
                      type="text" 
                      value={formMaterial}
                      onChange={(e) => setFormMaterial(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Siluet / Fit Type</label>
                    <input 
                      type="text" 
                      value={formFit}
                      onChange={(e) => setFormFit(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Teknik Sablon</label>
                  <input 
                    type="text" 
                    value={formPrint}
                    onChange={(e) => setFormPrint(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  />
                </div>

                {/* Stock Quantity Per Size */}
                <div className={`p-4 rounded-2xl border space-y-2 transition ${
                  adminTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase ${
                      adminTheme === 'light' ? 'text-slate-800' : 'text-white'
                    }`}>Stok Unit Per Ukuran (Pcs):</span>
                    <button 
                      type="button"
                      onClick={() => setFormSizesStock({ S: 10, M: 10, L: 10, XL: 10, XXL: 10 })}
                      className="text-[10px] text-[#A60009] font-bold hover:underline"
                    >
                      Set Semua ke 10 pcs
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {["S", "M", "L", "XL", "XXL"].map(size => (
                      <div key={size} className="text-center">
                        <label className={`block text-[10px] mb-1 font-bold ${
                          adminTheme === 'light' ? 'text-slate-600' : 'text-zinc-400'
                        }`}>{size}</label>
                        <input 
                          type="number"
                          min="0"
                          value={formSizesStock[size] || 0}
                          onChange={(e) => setFormSizesStock({ ...formSizesStock, [size]: Number(e.target.value) })}
                          className={`w-full text-center py-1.5 rounded-xl outline-none border transition ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-[#7A0006]'
                              : 'bg-black/60 border-zinc-800 text-white focus:border-[#7A0006]'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Deskripsi Pakaian</label>
                  <textarea 
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  ></textarea>
                </div>

                {/* Form Buttons */}
                <div className={`flex justify-end space-x-2.5 pt-3 border-t ${
                  adminTheme === 'light' ? 'border-slate-200' : 'border-zinc-800'
                }`}>
                  <button 
                    type="button" 
                    onClick={() => setIsProductFormOpen(false)}
                    className={`px-4 py-2 rounded-xl border text-xs transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 rounded-xl bg-[#7A0006] hover:bg-[#991b1b] text-white font-bold uppercase shadow-md shadow-[#7A0006]/20 transition active:scale-95"
                  >
                    Simpan Produk
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

      {/* SHOWCASE SLIDE MODAL (ADD / EDIT) */}
      {isShowcaseFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className={`fixed inset-0 backdrop-blur-sm transition-colors ${
              adminTheme === 'light' ? 'bg-slate-900/50' : 'bg-black/85'
            }`} 
            onClick={() => setIsShowcaseFormOpen(false)}
          ></div>
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10">
            <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto transition-all ${
              adminTheme === 'light' 
                ? 'bg-white text-slate-800 border-slate-200' 
                : 'bg-zinc-950 text-white border-zinc-800'
            }`}>
              
              <button 
                onClick={() => setIsShowcaseFormOpen(false)} 
                className={`absolute top-5 right-5 transition ${
                  adminTheme === 'light' ? 'text-slate-400 hover:text-slate-700' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-5">
                <img 
                  src="/dedicate-logo.png" 
                  alt="Logo Dedicate" 
                  className="w-8 h-8 rounded-full object-cover border border-[#7A0006]/50 shadow-xs" 
                />
                <h4 className={`text-xl font-black uppercase tracking-tight ${
                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {editingShowcase ? `Edit Slide Showcase // ${editingShowcase.dropCode}` : "Tambah Slide Showcase Hero"}
                </h4>
              </div>

              <form onSubmit={handleSaveShowcase} className="space-y-4 text-xs font-mono">
                
                {/* Row 1: Drop Badge & Action Button Text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Drop Badge / Kode</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: DROP 01 // NERO COLLAB" 
                      value={showcaseDropCode}
                      onChange={(e) => setShowcaseDropCode(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Teks Tombol Aksi</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: Pesan via WhatsApp / Lihat Detail Kaos" 
                      value={showcaseActionText}
                      onChange={(e) => setShowcaseActionText(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>
                </div>

                {/* Judul Banner */}
                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Judul Banner Hero</label>
                  <input 
                    type="text" 
                    required
                    placeholder="cth: NERO X DEDICATE — Heavyweight Collab Drop." 
                    value={showcaseTitle}
                    onChange={(e) => setShowcaseTitle(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Deskripsi Banner</label>
                  <textarea 
                    rows={2}
                    placeholder="Deskripsi singkat spesifikasi katun, artwork sablon, atau kuota edisi..."
                    value={showcaseDesc}
                    onChange={(e) => setShowcaseDesc(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  ></textarea>
                </div>

                {/* Tautan Produk Katalog */}
                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Tautkan ke Produk Katalog (Opsional)</label>
                  <select 
                    value={showcaseLinkedId || ""}
                    onChange={(e) => setShowcaseLinkedId(e.target.value ? Number(e.target.value) : undefined)}
                    className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  >
                    <option value="">-- Tanpa Tautan Produk Langsung (Scroll Katalog) --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.sku} — {p.name} ({p.status} - {formatRupiah(p.price)})
                      </option>
                    ))}
                  </select>
                  <p className={`text-[10px] mt-1 ${
                    adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-500'
                  }`}>
                    Jika produk dipilih, saat pembeli mengklik tombol aksi di carousel hero, modal detail kaos akan langsung terbuka.
                  </p>
                </div>

                {/* Image URL & File Upload */}
                <div className="space-y-2">
                  <label className={`block font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Foto Slide Showcase</label>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="text" 
                      required
                      placeholder="https://images.unsplash.com/... atau unggah file foto"
                      value={showcaseImage}
                      onChange={(e) => setShowcaseImage(e.target.value)}
                      className={`flex-1 px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                    <label className={`px-4 py-2.5 rounded-xl border cursor-pointer font-bold flex items-center justify-center space-x-1.5 transition shrink-0 ${
                      adminTheme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                    }`}>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleShowcaseImageUpload}
                      />
                    </label>
                  </div>

                  {/* Live Preview */}
                  {showcaseImage && (
                    <div className="relative aspect-[16/9] max-h-48 rounded-2xl overflow-hidden border border-zinc-800 mt-2 bg-black">
                      <img 
                        src={showcaseImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-mono font-bold tracking-wider text-white bg-black/80 px-2.5 py-1 rounded backdrop-blur border border-white/10 uppercase">
                          {showcaseDropCode || "PREVIEW DROP"}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur p-2.5 rounded-xl">
                        <div className="font-bold text-white uppercase text-xs truncate">{showcaseTitle || "Judul Banner"}</div>
                        <div className="text-[10px] text-zinc-300 truncate">{showcaseDesc || "Deskripsi Banner"}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className={`flex justify-end space-x-2.5 pt-3 border-t ${
                  adminTheme === 'light' ? 'border-slate-200' : 'border-zinc-800'
                }`}>
                  <button 
                    type="button" 
                    onClick={() => setIsShowcaseFormOpen(false)}
                    className={`px-4 py-2 rounded-xl border text-xs transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 rounded-xl bg-[#7A0006] hover:bg-[#991b1b] text-white font-bold uppercase shadow-md shadow-[#7A0006]/20 transition active:scale-95"
                  >
                    Simpan Slide Showcase
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

      {/* LOOKBOOK EDITORIAL MODAL (ADD / EDIT) */}
      {isLookbookFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className={`fixed inset-0 backdrop-blur-sm transition-colors ${
              adminTheme === 'light' ? 'bg-slate-900/50' : 'bg-black/85'
            }`} 
            onClick={() => setIsLookbookFormOpen(false)}
          ></div>
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10">
            <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto transition-all ${
              adminTheme === 'light' 
                ? 'bg-white text-slate-800 border-slate-200' 
                : 'bg-zinc-950 text-white border-zinc-800'
            }`}>
              
              <button 
                onClick={() => setIsLookbookFormOpen(false)} 
                className={`absolute top-5 right-5 transition ${
                  adminTheme === 'light' ? 'text-slate-400 hover:text-slate-700' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-5">
                <img 
                  src="/dedicate-logo.png" 
                  alt="Logo Dedicate" 
                  className="w-8 h-8 rounded-full object-cover border border-[#7A0006]/50 shadow-xs" 
                />
                <h4 className={`text-xl font-black uppercase tracking-tight ${
                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  {editingLookbook ? `Edit Foto Editorial // ${editingLookbook.title}` : "Tambah Foto Editorial Lookbook"}
                </h4>
              </div>

              <form onSubmit={handleSaveLookbook} className="space-y-4 text-xs font-mono">
                
                {/* Row 1: Tag & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Tag / Batch</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: DROP 01 // YK STREETS" 
                      value={lookbookTag}
                      onChange={(e) => setLookbookTag(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Judul Editorial</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: UNDERGROUND ALLEY SESSION" 
                      value={lookbookTitle}
                      onChange={(e) => setLookbookTitle(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 2: Location & Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Lokasi Pemotretan</label>
                    <input 
                      type="text" 
                      required
                      placeholder="cth: Jl. Malioboro Back-Alley, Yogyakarta" 
                      value={lookbookLocation}
                      onChange={(e) => setLookbookLocation(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                    }`}>Spesifikasi / Detail Kain</label>
                    <input 
                      type="text" 
                      placeholder="cth: 235 GSM • Signature Boxy Cut" 
                      value={lookbookSpecs}
                      onChange={(e) => setLookbookSpecs(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Narasi / Caption Editorial</label>
                  <textarea 
                    rows={2}
                    placeholder="Narasi estetika street photography..."
                    value={lookbookCaption}
                    onChange={(e) => setLookbookCaption(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  ></textarea>
                </div>

                {/* Tautan Produk */}
                <div>
                  <label className={`block mb-1 font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Tautkan ke Produk Kaos (Direct Shop-Look)</label>
                  <select 
                    value={lookbookLinkedId || ""}
                    onChange={(e) => setLookbookLinkedId(e.target.value ? Number(e.target.value) : undefined)}
                    className={`w-full px-3.5 py-2.5 rounded-xl outline-none border transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                        : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                    }`}
                  >
                    <option value="">-- Tanpa Tautan Produk --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.sku} — {p.name} ({formatRupiah(p.price)})
                      </option>
                    ))}
                  </select>
                  <p className={`text-[10px] mt-1 ${
                    adminTheme === 'light' ? 'text-slate-500' : 'text-zinc-500'
                  }`}>
                    Saat pengunjung mengklik foto editorial lookbook ini di website, produk yang ditautkan dapat langsung dilihat detailnya.
                  </p>
                </div>

                {/* Foto Lookbook */}
                <div className="space-y-2">
                  <label className={`block font-semibold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-zinc-400'
                  }`}>Foto Editorial</label>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="text" 
                      required
                      placeholder="https://images.unsplash.com/... atau unggah dari perangkat"
                      value={lookbookImage}
                      onChange={(e) => setLookbookImage(e.target.value)}
                      className={`flex-1 px-3.5 py-2.5 rounded-xl outline-none border transition ${
                        adminTheme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#7A0006]'
                          : 'bg-zinc-900 border-zinc-800 text-white focus:border-[#7A0006]'
                      }`}
                    />
                    <label className={`px-4 py-2.5 rounded-xl border cursor-pointer font-bold flex items-center justify-center space-x-1.5 transition shrink-0 ${
                      adminTheme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                    }`}>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleLookbookImageUpload}
                      />
                    </label>
                  </div>

                  {/* Live Preview */}
                  {lookbookImage && (
                    <div className="relative aspect-[4/3] max-h-48 rounded-2xl overflow-hidden border border-zinc-800 mt-2 bg-black">
                      <img 
                        src={lookbookImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold text-white bg-black/80 px-2 py-0.5 rounded backdrop-blur border border-white/10 uppercase">
                          {lookbookTag || "PREVIEW TAG"}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur p-2.5 rounded-xl">
                        <div className="font-bold text-white uppercase text-xs truncate">{lookbookTitle || "Judul Editorial"}</div>
                        <div className="text-[10px] text-[#A60009] flex items-center space-x-1 truncate font-semibold">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{lookbookLocation || "Lokasi"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className={`flex justify-end space-x-2.5 pt-3 border-t ${
                  adminTheme === 'light' ? 'border-slate-200' : 'border-zinc-800'
                }`}>
                  <button 
                    type="button" 
                    onClick={() => setIsLookbookFormOpen(false)}
                    className={`px-4 py-2 rounded-xl border text-xs transition ${
                      adminTheme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 rounded-xl bg-[#7A0006] hover:bg-[#991b1b] text-white font-bold uppercase shadow-md shadow-[#7A0006]/20 transition active:scale-95"
                  >
                    Simpan Foto Lookbook
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

      {/* 11. LOOKBOOK SECTION */}
      <section id="lookbook-section" className="py-12 border-t border-zinc-800/80 bg-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-6 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#A60009] text-xs font-mono uppercase tracking-widest mb-1">
              <Camera className="w-3.5 h-3.5" />
              <span>Street Style Editorial</span>
            </div>
            <h2 className="font-black text-2xl md:text-3xl text-white uppercase">YOGYAKARTA UNDERGROUND LOOKBOOK</h2>
          </div>
          <div className="hidden sm:block text-xs font-mono text-zinc-500">
            {lookbookItems.length} Editorial Shots
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-4 px-4 lg:px-8 max-w-7xl mx-auto pb-4">
          {lookbookItems.map((item, idx) => {
            const linkedProd = products.find(p => p.id === item.linkedProductId);
            return (
              <div 
                key={item.id} 
                onClick={() => {
                  if (linkedProd) openProductDetail(linkedProd);
                }}
                className={`shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition group ${
                  linkedProd ? 'cursor-pointer' : ''
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur font-mono text-[10px] text-white uppercase border border-white/10 font-bold">
                      {item.tag || `LOOK 0${idx + 1}`}
                    </span>
                    {linkedProd && (
                      <span className="px-2 py-0.5 rounded bg-[#7A0006]/90 backdrop-blur font-mono text-[10px] text-white uppercase flex items-center space-x-1 shadow-xs border border-red-500/20">
                        <ShoppingBag className="w-2.5 h-2.5 mr-1" />
                        <span>Shop Look</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <div className="font-bold text-sm text-white uppercase tracking-tight">{item.title}</div>
                    <div className="text-[11px] font-mono text-zinc-300 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#A60009] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    {item.specs && (
                      <div className="text-[10px] font-mono text-zinc-400">{item.specs}</div>
                    )}
                    {item.caption && (
                      <p className="text-[10px] text-zinc-400 line-clamp-2 italic pt-0.5">"{item.caption}"</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FLOATING TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-zinc-950/95 border border-[#7A0006] text-xs font-mono shadow-2xl backdrop-blur-md flex items-center space-x-2.5 text-white">
          <span className={`w-2 h-2 rounded-full ${toastMsg.type === 'success' ? 'bg-emerald-400' : toastMsg.type === 'warning' ? 'bg-amber-400' : 'bg-[#A60009]'}`}></span>
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* 13. FOOTER */}
      <footer className="border-t border-zinc-800/80 bg-black py-8 px-4 lg:px-8 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/dedicate-logo.png" 
              alt="Logo Resmi Dedicaterealite" 
              className="w-9 h-9 rounded-full object-cover border border-[#7A0006]/70 shadow-sm" 
            />
            <div>
              <span className="font-bold tracking-widest text-white uppercase">DEDICATEREALITE</span>
              <span className="block text-[10px] text-zinc-400">Official WhatsApp: +62 821-1407-2159 • Yogyakarta, ID</span>
            </div>
          </div>

          <div className="text-[10px] text-center md:text-right">
            Kelompok 7 IMK • UPN "Veteran" Yogyakarta • Squeeze Carousel & WhatsApp Checkout
          </div>
        </div>
      </footer>

    </div>
  );
}
