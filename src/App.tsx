/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronRight, Truck, ShieldCheck, Bookmark, Play, ArrowUp, X, User, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import FlashSaleBanner from './components/FlashSaleBanner';
import Checkout from './components/Checkout';
import VariationModal from './components/VariationModal';
import StoreView from './components/StoreView';
import CartView from './components/CartView';
import { CartItem, ProductData } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'store' | 'product' | 'cart'>('store');
  const [activeTab, setActiveTab] = useState('Visão geral');
  const [isShippingFree, setIsShippingFree] = useState(false);
  const [isCouponRedeemed, setIsCouponRedeemed] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('23:59:58');
  const [selection, setSelection] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  const [productData, setProductData] = useState<ProductData>({
    id: '1',
    name: "Kit 3 Cropped Feminino Regata Alcinha Básico Verão Suplex",
    currentPrice: 32.90,
    originalPrice: 129.90,
    images: [
      'https://i.ibb.co/4nDy1nL0/image.png',
      'https://i.ibb.co/dsWq726G/image.png',
      'https://i.ibb.co/3mSSd651/image.png',
      'https://i.ibb.co/nMNtTydj/image.png',
      'https://i.ibb.co/WvqLM51Y/image.png',
      'https://i.ibb.co/FL2YwmG9/image.png',
      'https://i.ibb.co/8nHqG69v/image.png',
      'https://i.ibb.co/k6GN6S8D/image.png',
      'https://i.ibb.co/zV9XgkxN/image.png'
    ]
  });

  const handleProductClick = (product: any) => {
    // If it's the cropped top, use the existing images, otherwise use the product image
    if (product.id === '1') {
      setProductData({
        id: '1',
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [
          'https://i.ibb.co/4nDy1nL0/image.png',
          'https://i.ibb.co/dsWq726G/image.png',
          'https://i.ibb.co/3mSSd651/image.png',
          'https://i.ibb.co/nMNtTydj/image.png',
          'https://i.ibb.co/WvqLM51Y/image.png',
          'https://i.ibb.co/FL2YwmG9/image.png',
          'https://i.ibb.co/8nHqG69v/image.png',
          'https://i.ibb.co/k6GN6S8D/image.png',
          'https://i.ibb.co/zV9XgkxN/image.png'
        ]
      });
    } else if (product.id === '2') {
      setProductData({
        id: '2',
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [
          'https://i.ibb.co/LDsVmsyq/image.png',
          'https://i.ibb.co/WN1RfLhJ/image.png',
          'https://i.ibb.co/ymG0XXG9/image.png',
          'https://i.ibb.co/7xfDpYhf/image.png',
          'https://i.ibb.co/4wRdW3KG/image.png',
          'https://i.ibb.co/21HdTMRp/image.png',
          'https://i.ibb.co/3ytQfF3z/image.png',
          'https://i.ibb.co/MkPRMYpz/image.png',
          'https://i.ibb.co/MyWTqDH4/image.png'
        ]
      });
    } else if (product.id === '3') {
      setProductData({
        id: '3',
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [
          'https://i.ibb.co/TqL744gc/image.png',
          'https://i.ibb.co/TXfNMtb/image.png',
          'https://i.ibb.co/G4Nq7TyK/image.png',
          'https://i.ibb.co/Sw2x0bJh/image.png',
          'https://i.ibb.co/GfmPdcYy/image.png',
          'https://i.ibb.co/G4bmK92t/image.png'
        ]
      });
    } else if (product.id === '4') {
      setProductData({
        id: '4',
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [
          'https://i.ibb.co/LD2XRr3Q/image.png',
          'https://i.ibb.co/XrbHrjfM/image.png',
          'https://i.ibb.co/k2JH5qk9/image.png',
          'https://i.ibb.co/N2yLNFHF/image.png',
          'https://i.ibb.co/XZnC90Kv/image.png',
          'https://i.ibb.co/Qv3cLSQB/image.png',
          'https://i.ibb.co/qYnnXCzf/image.png',
          'https://i.ibb.co/x82b4nv7/image.png',
          'https://i.ibb.co/NdGj7qvK/image.png'
        ]
      });
    } else if (product.id === '5') {
      setProductData({
        id: '5',
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [
          'https://i.ibb.co/S74P9XG0/image.png',
          'https://i.ibb.co/ZRb3x3R0/image.png',
          'https://i.ibb.co/MkVycZ1y/image.png',
          'https://i.ibb.co/b5XJHL8s/image.png',
          'https://i.ibb.co/0bxv4rV/image.png',
          'https://i.ibb.co/cSYPKwrj/image.png',
          'https://i.ibb.co/Lhpy1Gpv/image.png',
          'https://i.ibb.co/ZRZ0Bpj7/image.png'
        ]
      });
    } else if (product.id === '6') {
      setProductData({
        id: '6',
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [
          'https://i.ibb.co/ccBqNM24/image.png',
          'https://i.ibb.co/KcN6Nd3S/image.png',
          'https://i.ibb.co/xqwqZV7f/image.png',
          'https://i.ibb.co/0pm82MJ5/image.png',
          'https://i.ibb.co/842SG8bG/image.png',
          'https://i.ibb.co/PvnN5RKZ/image.png',
          'https://i.ibb.co/nMr5PHKq/image.png',
          'https://i.ibb.co/jZ9zP7sG/image.png'
        ]
      });
    } else {
      setProductData({
        id: product.id,
        name: product.name,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        images: [product.image]
      });
    }
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const isCroppedTop = productData.name.toLowerCase().includes('cropped');

  const scrollToSection = (tab: string) => {
    setActiveTab(tab);
    let targetRef;
    switch (tab) {
      case 'Visão geral': targetRef = overviewRef; break;
      case 'Avaliações': targetRef = reviewsRef; break;
      case 'Descrição': targetRef = descriptionRef; break;
    }
    
    if (targetRef?.current) {
      const headerOffset = 88; // Header + Tabs height
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleRedeem = () => {
    setIsCouponRedeemed(true);
    setIsShippingFree(true);
  };

  const addToCart = (data: any) => {
    const cartId = `${productData.id}-${data.color}-${data.size}`;
    const existingItem = cart.find(item => item.cartId === cartId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.cartId === cartId 
          ? { ...item, quantity: item.quantity + data.quantity }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: productData.id,
        cartId,
        name: productData.name,
        currentPrice: productData.currentPrice,
        originalPrice: productData.originalPrice,
        image: data.image,
        color: data.color,
        size: data.size,
        quantity: data.quantity,
        selected: true
      };
      setCart([...cart, newItem]);
    }
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    setCart(cart.map(item => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const toggleCartItemSelect = (cartId: string) => {
    setCart(cart.map(item => item.cartId === cartId ? { ...item, selected: !item.selected } : item));
  };

  const toggleAllCartItems = (selected: boolean) => {
    setCart(cart.map(item => ({ ...item, selected })));
  };

  const handleCartCheckout = () => {
    const selectedItems = cart.filter(item => item.selected);
    const itemsToCheckout = selectedItems.length > 0 ? selectedItems : cart;

    if (itemsToCheckout.length > 0) {
      setCheckoutItems(itemsToCheckout);
      setIsCheckoutOpen(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const productImages = productData.images;

  const getDeliveryDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5);

    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    
    const minDay = minDate.getDate();
    const minMonth = months[minDate.getMonth()];
    const maxDay = maxDate.getDate();
    const maxMonth = months[maxDate.getMonth()];

    if (minMonth === maxMonth) {
      return `Receba até ${minDay} - ${maxDay} de ${minMonth}`;
    } else {
      return `Receba até ${minDay} de ${minMonth} - ${maxDay} de ${maxMonth}`;
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width) + 1;
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 font-sans text-[#222222]">
      <AnimatePresence mode="wait">
        {currentView === 'store' ? (
          <motion.div 
            key="store"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StoreView 
              onProductClick={handleProductClick} 
              cartCount={cart.length}
              onCartClick={() => setCurrentView('cart')}
            />
          </motion.div>
        ) : currentView === 'cart' ? (
          <motion.div 
            key="cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150]"
          >
            <CartView 
              items={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onToggleSelect={toggleCartItemSelect}
              onToggleSelectAll={toggleAllCartItems}
              onCheckout={handleCartCheckout}
              onBack={() => setCurrentView('product')}
            />
          </motion.div>
        ) : (
          <motion.div 
            key="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header 
              onBack={() => setCurrentView('store')} 
              cartCount={cart.length}
              onCartClick={() => setCurrentView('cart')}
            />
          
          <main className="pt-11" ref={overviewRef}>
        {/* Product Image Carousel */}
        <div className="relative aspect-square bg-white overflow-hidden">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full"
            onScroll={handleScroll}
          >
            {productImages.map((src, i) => (
              <div key={i} className="min-w-full h-full snap-center">
                <img 
                  src={src} 
                  alt={`Product ${i + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 right-3 bg-black/30 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
            {currentImageIndex}/{productImages.length}
          </div>
        </div>

        <FlashSaleBanner 
          currentPrice={productData.currentPrice} 
          originalPrice={productData.originalPrice} 
          timeLeft={timeLeft}
        />

        {/* Product Info Section */}
        <section className="bg-white px-3 py-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-[#FFEEEB] px-1.5 py-0.5 rounded-[1px]">
              <Truck className="w-3 h-3 text-[#EE4D2D]" />
              <span className="text-[11px] text-[#EE4D2D] font-bold">
                2x R$ {(productData.currentPrice / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} sem juros
              </span>
              <ChevronRight className="w-3 h-3 text-[#EE4D2D]" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#FFEEEB] px-2 py-1 rounded-[1px]">
            <span className="text-[#EE4D2D] text-[11px] font-bold">Economize 3% com bônus</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#EE4D2D]" />
          </div>

          <div className="flex justify-between items-start gap-4">
            <h1 className="text-[14px] font-medium leading-[1.3] text-[#222222] line-clamp-2">
              {productData.name}
            </h1>
            <button className="pt-0.5">
              <Bookmark className="w-5 h-5 text-[#888888]" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-[#EE4D2D] text-[#EE4D2D]" />
              <span className="text-[13px] font-bold text-[#EE4D2D] underline underline-offset-2">5.0</span>
              <span className="text-[11px] text-[#888888] ml-0.5">(3)</span>
            </div>
            <div className="w-[1px] h-3 bg-gray-200" />
            <span className="text-[12px] text-[#555555]">4.6k vendidos</span>
          </div>
        </section>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex overflow-x-auto no-scrollbar sticky top-11 z-40">
          {['Visão geral', 'Avaliações', 'Descrição'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => scrollToSection(tab)}
              className={`px-4 py-2.5 text-[13px] whitespace-nowrap relative ${activeTab === tab ? 'text-[#EE4D2D] font-bold' : 'text-[#555555]'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#EE4D2D]" />}
            </button>
          ))}
        </div>

        {/* Shipping Section */}
        <section className="bg-white mt-1.5 px-3 py-3 space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#00BFA5] mt-0.5" strokeWidth={1.5} />
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[13px] font-bold ${isShippingFree ? 'text-[#00BFA5]' : 'text-[#222222]'}`}>
                    {isShippingFree ? 'Frete grátis' : 'R$ 8,93'}
                  </span>
                  <span className="text-[11px] text-[#555555]">{getDeliveryDate()}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#888888]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#888888]">Taxa de envio: </span>
                <span className={`text-[11px] text-[#888888] ${isShippingFree ? 'line-through' : ''}`}>R$ 8,93</span>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setIsVariationModalOpen(true)}
            className="border-t border-gray-50 pt-3 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1">
                {(productData.id === '6' ? [
                  'https://i.ibb.co/ccBqNM24/image.png',
                  'https://i.ibb.co/KcN6Nd3S/image.png',
                  'https://i.ibb.co/xqwqZV7f/image.png',
                  'https://i.ibb.co/842SG8bG/image.png'
                ] : productData.id === '5' ? [
                  'https://i.ibb.co/dw1cfWnN/image.png',
                  'https://i.ibb.co/m7RVQXC/image.png',
                  'https://i.ibb.co/p6rC9tcK/image.png',
                  'https://i.ibb.co/LH7gKqK/image.png'
                ] : productData.id === '4' ? [
                  'https://i.ibb.co/9mh0Mp5w/image.png',
                  'https://i.ibb.co/Fbw1SPmH/image.png',
                  'https://i.ibb.co/7xWd7Y9x/image.png',
                  'https://i.ibb.co/MkBbvbB6/image.png'
                ] : productData.id === '3' ? [
                  'https://i.ibb.co/Lz1fqckt/image.png',
                  'https://i.ibb.co/d021LxyK/image.png',
                  'https://i.ibb.co/Zptd8Dfp/image.png',
                  'https://i.ibb.co/nqC25h7B/image.png'
                ] : productData.id === '2' ? [
                  'https://i.ibb.co/B5YDS6Bg/image.png',
                  'https://i.ibb.co/HTdbg6rN/image.png',
                  'https://i.ibb.co/392RVf4c/image.png',
                  'https://i.ibb.co/DHYH5kGV/image.png'
                ] : [
                  'https://i.ibb.co/Cp7XMv4C/image.png',
                  'https://i.ibb.co/Z1gMZtMq/image.png',
                  'https://i.ibb.co/HfVF2KGV/image.png',
                  'https://i.ibb.co/msSr5w0/image.png'
                ]).map((img, i) => (
                  <div key={i} className="w-9 h-9 border border-white rounded-[2px] overflow-hidden bg-gray-50">
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span className="text-[12px] text-[#222222]">
                {productData.id === '6' ? '7' : productData.id === '5' ? '8' : productData.id === '4' ? '6' : productData.id === '3' ? '7' : productData.id === '2' ? '5' : '8'} opções disponíveis
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </div>
        </section>

        {/* Protection Section */}
        <section className="bg-white mt-1.5 px-3 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF7A38]" strokeWidth={1.5} />
              <span className="text-[13px] font-bold">Proteção do cliente</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {[
              'Devolução gratuita',
              'Reembolso automático por danos',
              'Pagamento seguro',
              'Reembolso automático por atraso'
            ].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#EE4D2D] text-[10px] font-black">✓</span>
                <span className="text-[11px] text-[#555555] truncate">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Coupons Section */}
        <section className="bg-white mt-1.5 px-3 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold">Ofertas</span>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[1, 2].map(i => (
              <div key={i} className="min-w-[240px] border border-[#00BFA5]/20 rounded-[2px] p-2 flex items-center justify-between bg-[#F6FFFE]">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#222222]">Cupom de envio</span>
                    <span className="bg-[#00BFA5] text-white text-[9px] px-1 rounded-[1px] font-black">x3</span>
                  </div>
                  <p className="text-[9px] text-[#555555] leading-tight">Desconto de R$ 10 no frete em pedidos acima de R$ 9</p>
                </div>
                <button 
                  onClick={handleRedeem}
                  disabled={isCouponRedeemed}
                  className={`${isCouponRedeemed ? 'bg-gray-400' : 'bg-[#00BFA5]'} text-white text-[10px] px-2 py-1 rounded-[2px] font-bold ml-2 transition-colors`}
                >
                  {isCouponRedeemed ? 'Resgatado' : 'Resgatar'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section className="bg-white mt-1.5 px-3 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold">Vídeos de criadores (3)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(productData.id === '6' ? [
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772648785/ssstik.io__lariilunn_1772648685008_jqcrjh.mp4',
                title: 'Lari: Provador Manga Curta'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772648785/ssstik.io__anekaudaily_1772648651594_yc512j.mp4',
                title: 'Ane: Dicas de Look Moderna'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772648787/ssstik.io__monicamacedooficial_1772648675427_byuimn.mp4',
                title: 'Monica: Review Ajustada'
              }
            ] : productData.id === '5' ? [
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772647245/ssstik.io_1772647213024_nwfe8c.mp4',
                title: 'Review: Blusa Manga Longa'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772647246/ssstik.io__anekaudaily_1772647198620_am8ur0.mp4',
                title: 'Ane: Provador Compressão'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772647247/ssstik.io__giu.braaga_1772647190252_kd3bie.mp4',
                title: 'Giu: Look Meia Estação'
              }
            ] : productData.id === '4' ? [
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772645993/ssstik.io__nininhaprado_1772645957597_z6wmgk.mp4',
                title: 'Nininha: Provador Nula Manga'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772645993/ssstik.io__dicas_sah_1772645936896_n3jg2l.mp4',
                title: 'Sah: Dicas de Look'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772645996/ssstik.io__luanaahaas__1772645915538_jbcmqh.mp4',
                title: 'Luana: Review Canelada'
              }
            ] : productData.id === '3' ? [
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772644547/ssstik.io__joyce.indica1_1772644527725_avycj0.mp4',
                title: 'Joyce: Provador MultiForma'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772644548/ssstik.io__silvanaindica1_1772644497886_j6rukw.mp4',
                title: 'Silvana: Dicas de Amarração'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772644548/ssstik.io__segredos.da.ludi_1772644343321_oqfncm.mp4',
                title: 'Ludi: Review Completo'
              }
            ] : productData.id === '2' ? [
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772642325/ssstik.io__isa_deconto_1772642269048_acuyev.mp4',
                title: 'Isa Deconto: Provador Tube'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772642324/ssstik.io__kevelybr_1772642142097_xmrqyz.mp4',
                title: 'Kevely: Look do dia'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772642324/ssstik.io__gabbizie_1772642310541_htuxvk.mp4',
                title: 'Gabbizie: Review Premium'
              }
            ] : [
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772459125/ssstik.io__shopdaray__1772459074299_nfco9q.mp4',
                title: 'Unboxing do meu kit favorito!'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772459117/ssstik.io__dicasdaluaana_1772458688498_qghkst.mp4',
                title: 'Provador: Kit 3 Croppeds'
              },
              {
                url: 'https://res.cloudinary.com/dgokajcvg/video/upload/v1772459115/ssstik.io__shop_jeane_1772458658681_jpthpl.mp4',
                title: 'Dica de look para o verão'
              }
            ]).map((video, i) => (
              <div key={i} className="relative aspect-[9/16] rounded-[4px] overflow-hidden bg-black">
                <video 
                  src={video.url} 
                  className="w-full h-full object-cover opacity-80"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-[1px]">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 left-1.5 right-1.5 pointer-events-none">
                  <p className="text-[9px] text-white font-bold line-clamp-2 leading-tight drop-shadow-lg">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section ref={reviewsRef} className="bg-white mt-1.5 px-3 py-3 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold">Avaliações dos clientes (25)</span>
            <button className="text-[12px] text-[#EE4D2D] font-medium flex items-center gap-0.5">
              Ver mais <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-bold">4.4</span>
            <span className="text-[11px] text-[#888888]">/5</span>
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />)}
              <Star className="w-3 h-3 text-gray-200" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full border border-[#888888] flex items-center justify-center ml-1">
              <span className="text-[8px] text-[#888888] font-black">i</span>
            </div>
          </div>

          <div className="space-y-6">
            {(productData.id === '6' ? [
              { 
                user: 'L**a L.', 
                comment: 'Amei o kit! As blusas são super confortáveis e o caimento é perfeito. O tecido fluído é muito bom.', 
                images: [
                  'https://i.ibb.co/tM5P3cw7/image.png',
                  'https://i.ibb.co/rGN6YW0w/image.png'
                ] 
              },
              { 
                user: 'M**a M.', 
                comment: 'Qualidade excelente, as cores são fiéis às fotos. Veste muito bem, recomendo!', 
                images: [
                  'https://i.ibb.co/tPDFmfVJ/image.png',
                  'https://i.ibb.co/DDqRVMX6/image.png'
                ] 
              },
              { 
                user: 'A**e K.', 
                comment: 'Chegou super rápido. O tamanho M ficou ótimo em mim. Adorei as opções de cores.', 
                images: [
                  'https://i.ibb.co/mrbP3H1z/image.png'
                ] 
              }
            ] : productData.id === '5' ? [
              { 
                user: 'A**a L.', 
                comment: 'Amei a blusa! O tecido é muito gostoso e a compressão é na medida certa. Veste super bem.', 
                images: [
                  'https://i.ibb.co/99MSYHf6/image.png',
                  'https://i.ibb.co/zHStNYP9/image.png'
                ] 
              },
              { 
                user: 'G**i B.', 
                comment: 'Qualidade excelente, o tecido fluído é maravilhoso. Comprei o kit e valeu muito a pena.', 
                images: [
                  'https://i.ibb.co/jkZBH00P/image.png',
                  'https://i.ibb.co/5xggKQHr/image.png'
                ] 
              },
              { 
                user: 'M**a C.', 
                comment: 'Veste muito bem, fica justinha no corpo. Ideal para meia estação.', 
                images: [
                  'https://i.ibb.co/vvQKyG3H/image.png'
                ] 
              }
            ] : productData.id === '4' ? [
              { 
                user: 'K**y P.', 
                comment: 'Amei as regatas! O tecido canelado é muito confortável e o corte nula manga é super estiloso.', 
                images: [
                  'https://i.ibb.co/hFH9pGms/image.png',
                  'https://i.ibb.co/99M2y20k/image.png'
                ] 
              },
              { 
                user: 'L**a H.', 
                comment: 'Veste super bem, a malha é de qualidade. Comprei o kit e valeu muito a pena.', 
                images: [
                  'https://i.ibb.co/zhvTKKgz/image.png',
                  'https://i.ibb.co/nqwRWmLB/image.png'
                ] 
              },
              { 
                user: 'S**h B.', 
                comment: 'Chegou rápido e as cores são lindas. O tamanho único serviu perfeitamente.', 
                images: [
                  'https://i.ibb.co/rRHbCyp7/image.png'
                ] 
              }
            ] : productData.id === '3' ? [
              { 
                user: 'L**a M.', 
                comment: 'Gente, esse cropped é tudo! Dá pra fazer várias amarrações diferentes, parece que tenho vários modelos em um só.', 
                images: [
                  'https://i.ibb.co/Y4mznLVX/image.png',
                  'https://i.ibb.co/PvWTxQ6k/image.png'
                ] 
              },
              { 
                user: 'T**s F.', 
                comment: 'A qualidade do suplex é incrível. Veste super bem e o decote fica lindo. Perfeito para festas!', 
                images: [
                  'https://i.ibb.co/RGcpkS36/image.png'
                ] 
              }
            ] : productData.id === '2' ? [
              { 
                user: 'M**a G.', 
                comment: 'Simplesmente perfeito! O forro é ótimo e não marca nada. O suplex é de qualidade premium mesmo.', 
                images: [
                  'https://i.ibb.co/qYtnGH1K/image.png',
                  'https://i.ibb.co/gMZbhr2P/image.png'
                ] 
              },
              { 
                user: 'K**y L.', 
                comment: 'Comprei o kit e amei todas as cores. O elástico nas costas segura muito bem.', 
                images: [
                  'https://i.ibb.co/5WDm8ny0/image.png'
                ] 
              },
              { 
                user: 'B**a R.', 
                comment: 'Veste super bem, modelagem acinturada que valoriza o corpo. Recomendo demais!', 
                images: [
                  'https://i.ibb.co/5DxYVmt/image.png',
                  'https://i.ibb.co/Qvj45dzQ/image.png'
                ] 
              }
            ] : isCroppedTop ? [
              { 
                user: 'C**la B.', 
                comment: 'Amei os croppeds! O tecido suplex é maravilhoso, não fica transparente e veste super bem. Chegou rápido.', 
                images: [
                  'https://i.ibb.co/HD6j1jLq/image.png'
                ] 
              },
              { 
                user: 'A**a M.', 
                comment: 'Qualidade impecável pelo preço. As cores são lindas e o tamanho M ficou perfeito em mim. Recomendo!', 
                images: [
                  'https://i.ibb.co/d4Pq991x/image.png'
                ] 
              },
              { 
                user: 'M**a S.', 
                comment: 'Melhor custo-benefício. Uso para treinar e para sair, são muito versáteis. O forro ajuda muito no conforto.', 
                images: [
                  'https://i.ibb.co/gMGqtWwt/image.png'
                ] 
              },
              { 
                user: 'J**a P.', 
                comment: 'Comprei o kit e me surpreendi. A elasticidade é ótima e as alças são bem resistentes. Vou comprar mais cores.', 
                images: [
                  'https://i.ibb.co/cSFwZ9jS/image.png'
                ] 
              },
              { 
                user: 'R**a L.', 
                comment: 'Veste muito bem no corpo, a modelagem slim valoriza bastante. O tecido é fresquinho para o verão.', 
                images: [
                  'https://i.ibb.co/M56xHt9b/image.png'
                ] 
              }
            ] : [
              { 
                user: 'R**o S.', 
                comment: 'Tênis excelente, muito leve e confortável. Superou minhas expectativas.', 
                images: [productData.images[0]] 
              },
              { 
                user: 'L**s F.', 
                comment: 'Ótimo para corridas matinais. O amortecimento é muito bom.', 
                images: [productData.images[0]] 
              }
            ]).map((review, i) => {
              return (
                <div key={i} className="space-y-2 pb-1 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-[#888888]" />
                    </div>
                    <span className="text-[12px] font-medium text-[#222222]">{review.user}</span>
                  </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-2.5 h-2.5 fill-[#FFC107] text-[#FFC107]" />)}
                </div>
                <p className="text-[11px] text-[#888888]">Item: {isCroppedTop ? 'Kit 3 Cropped Regata' : 'Tênis Esportivo'}</p>
                <p className="text-[13px] text-[#222222] leading-relaxed">{review.comment}</p>
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {review.images.map((src, imgIdx) => (
                    <div key={imgIdx} className="relative w-[82px] h-[82px] flex-shrink-0 rounded-[2px] overflow-hidden bg-gray-50 border border-gray-100">
                      <img src={src} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

          <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
            <span className="text-[13px] font-bold">Avaliações da loja (61 mil)</span>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </div>
          <div className="flex gap-2.5">
            <div className="flex-1 bg-white rounded-[2px] py-2 px-3 flex items-center justify-center gap-2 border border-gray-200">
              <div className="w-4 h-4 rounded-full border border-[#888888] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#888888] rounded-full" />
              </div>
              <span className="text-[11px] text-[#555555] font-medium">Inclui imagens ou vídeos (7 mil)</span>
            </div>
            <div className="bg-white rounded-[2px] py-2 px-3 flex items-center justify-center gap-1 border border-gray-200">
              <span className="text-[11px] text-[#555555] font-bold">5</span>
              <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
              <span className="text-[11px] text-[#555555] font-medium">(43,2 mil)</span>
            </div>
          </div>
        </section>

        {/* Store Section */}
        <section className="bg-white mt-2 px-3 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[2px] border border-gray-100 flex items-center justify-center overflow-hidden bg-gray-50">
                <img src="https://i.ibb.co/NdqKM8MM/image.png" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#222222]">MG Outlet</h3>
                <p className="text-[11px] text-[#888888]">329.2K vendido(s)</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setCurrentView('store');
                window.scrollTo(0, 0);
              }}
              className="border border-[#EE4D2D] text-[#EE4D2D] px-4 py-1 rounded-[2px] text-[12px] font-bold"
            >
              Visitar
            </button>
          </div>
          <div className="flex items-center gap-8 text-[11px] border-b border-gray-50 pb-4">
            <div className="flex gap-1.5">
              <span className="font-black text-[#EE4D2D]">70%</span>
              <span className="text-[#555555]">responde em 24 horas</span>
            </div>
            <div className="flex gap-1.5">
              <span className="font-black text-[#EE4D2D]">96%</span>
              <span className="text-[#555555]">envios pontuais</span>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section ref={descriptionRef} className="bg-white mt-2 px-3 py-5 space-y-5">
          <h2 className="text-[13px] font-black uppercase tracking-tight text-[#222222]">Sobre este produto</h2>
          <div className="space-y-6 text-[12px] leading-relaxed text-[#555555]">
          
            {productData.id === '6' ? (
              <div className="space-y-4">
                <p className="font-bold text-[#222222]">KIT COM TRES BLUSAS - CONTÉM TRES (3) BLUSAS</p>
                <p>Você está prestes a adquirir um produto lindíssimo da marca Moderna .</p>
                
                <p>Temos mais de 200 mil estrelinhas e avaliações positivas no TikTok, mais de 1000 variações de produtos e uma ampla gama de cores e tamanhos. Na Moderna você vai encontrar, croppeds e tops, vestidos, saias, s, Borys, calças e shorts jeans, jaquetas, conjuntos, macacões, moda praia e peças esportivas esportiva.</p>

                <p>Todos os produtos são de pronta entrega para postagem imediata em até 24h. O nosso objetivo é deixar você linda (o) pagando pouco, por isso temos certeza de que estamos no caminho certo.</p>

                <p>Apresentamos a Ajustada, a peça essencial que combina estilo e conforto em perfeita harmonia. Confeccionada em tecido Tecido Fluído, esta foi ajustada para dar um realce a sua silhueta. Ideal para diversas ocasiões, desde um look casual de dia, atividades ao ar livre ou uma produção mais elaborada à noite. A ajustado oferece o equilíbrio perfeito entre estilo e praticidade e foi desenhada para se moldar suavemente ao seu corpo, proporcionando um visual moderno.</p>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Tamanhos:</p>
                  <p>(veste 36) - Tamanho P</p>
                  <p>(veste 38) - Tamanho M</p>
                  <p>(veste 40) - Tamanho G</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Modelo Veste M:</p>
                  <p>Altura: 1,77 | Busto: 90 | Cintura: 65 | Quadril: 100 | Peso: 64 | Tamanho : M</p>
                </div>

                <div className="space-y-1">
                  <p>- Sobre o material:</p>
                  <p>- ajustado Justinha</p>
                  <p>- Opções disponíveis no tecido Tecido Fluído</p>
                  <p>- Composição: 92% Poliéster 8% Elastano</p>
                  <p>- Não tem Bojo</p>
                  <p>- Manga Curta</p>
                  <p>- Justa no Corpo</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Fotos dos anúncios:</p>
                  <p>- As fotos e vídeos são reais. As modelos são contratadas pela nossa marca, portanto, as peças retratam fielmente os nossos produtos.</p>
                </div>
              </div>
            ) : productData.id === '5' ? (
              <div className="space-y-4">
                <p className="font-bold text-[#222222]">KIT COM TRÊS S - CONTÉM TRÊS (3) S</p>
                <p>Temos diversas opções em cores para o KIT.</p>
                <p>Selecione o KIT desejado ao seu carrinho e faça sempre a conferência dos itens.</p>
                <p>Você está prestes a adquirir um produto lindíssimo da marca Moderna.</p>
                
                <p>Temos mais de 200 mil estrelinhas e avaliações positivas no TikTok, mais de 1000 variações de produtos e uma ampla gama de cores e tamanhos. Na Moderna você vai encontrar, croppeds e tops, vestidos, saias, s, Borys, calças e shorts jeans, jaquetas, conjuntos, macacões, moda praia e peças esportivas esportiva.</p>

                <p>Todos os produtos são de pronta entrega para postagem imediata em até 24h. O nosso objetivo é deixar você linda (o) pagando pouco, por isso temos certeza de que estamos no caminho certo.</p>

                <p>Apresentamos a meia estação, a peça essencial que combina estilo e conforto em perfeita harmonia. Confeccionada em tecido Tecido Fluído, esta foi ajustada para dar um realce a sua silhueta. Ideal para diversas ocasiões, desde um look casual de dia, atividades ao ar livre ou uma produção mais elaborada à noite. A ajustado oferece o equilíbrio perfeito entre estilo e praticidade e foi desenhada para se moldar suavemente ao seu corpo, proporcionando um visual moderno.</p>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Tamanhos:</p>
                  <p>(veste 36) - Tamanho P</p>
                  <p>(veste 38) - Tamanho M</p>
                  <p>(veste 40) - Tamanho G</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Modelo Veste P:</p>
                  <p>Altura: 1,77 | Busto: 90 | Cintura: 65 | Quadril: 100 | Peso: 64 | Tamanho : M</p>
                </div>

                <div className="space-y-1">
                  <p>- Sobre o material:</p>
                  <p>- ajustado Justinha</p>
                  <p>- Opções disponíveis no tecido Tecido Fluído</p>
                  <p>- Composição: 92% Poliéster 8% Elastano</p>
                  <p>- Não tem Bojo</p>
                  <p>- Manga Longa</p>
                  <p>- Justa no Corpo</p>
                </div>
              </div>
            ) : productData.id === '4' ? (
              <div className="space-y-4">
                <p className="font-bold text-[#222222]">Kit 3 Blusas Regata Nula - TAMANHO ÚNICO M</p>
                <p>Kit 6 e 10 peças - Enviar cores e quantidade desejada por mensagem logo após a compra.</p>
                <p>Kit 3 peças - as cores são prontas não é possível alterar.</p>
                
                <p>✨ Regata Nula feminina, simples e linda! Perfeita para o seu guarda-roupa. Ajusta bem ao corpo, com malha ribana de qualidade. Tecido confortável, ideal como peça coringa. Combina com tudo! 💕</p>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Tamanho e Versatilidade</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>TAMANHO ÚNICO M: Adequado para tamanhos 36 ao 42. Flexibilidade em escolher o tamanho, sem comprometer o ajuste. Ideal para quem busca versatilidade em seu estilo diário.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">Qualidade e Conforto</p>
                  <p>A blusa é feita com malha canelada, garantindo um toque agradável. Ajusta bem ao corpo, proporcionando conforto durante todo o dia. Sua simplicidade permite combinações infinitas. Experimente agora! 🥳</p>
                </div>
              </div>
            ) : productData.id === '3' ? (
              <div className="space-y-4">
                <p>O Cropped Top de Amarrar é a peça perfeita para quem ama conforto, praticidade e estilo em um só look! Com diversas formas de amarração, você pode usar e reinventar seu visual — do casual ao fashion — sempre com muito charme.</p>
                <p>Confeccionado em tecido suplex leve e fresco, ele oferece toque macio, secagem rápida e caimento impecável. Conta com forro interno, não possui bojo e não desbota, garantindo conforto e durabilidade mesmo após várias lavagens.</p>
                
                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">CARACTERÍSTICAS PRINCIPAIS</p>
                  <p>• Tecido Suplex Premium: leve, elástico e de toque agradável</p>
                  <p>• Com Forro Interno: mais conforto e segurança</p>
                  <p>• Sem Bojo: liberdade e ajuste natural ao corpo</p>
                  <p>• Multiformas de Amarração: use de várias maneiras e crie looks diferentes</p>
                  <p>• Secagem Rápida e Não Desbota: ideal para o dia a dia</p>
                  <p>• Tecido Fresco: não esquenta, perfeito para dias quentes</p>
                  <p>• Veste do 36 ao 42</p>
                  <p>• Fabricação Própria – Qualidade Garantida</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">POR QUE ESCOLHER ESTE CROPPED</p>
                  <p>Versátil e moderno – combina com saias, calças, shorts e sobreposições Ideal para passeios, eventos, praia ou academia Caimento confortável e tecido resistente Crie diversos estilos com uma única peça!</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-[#222222]">ENVIO E ATENDIMENTO</p>
                  <p>Envio rápido em até 24 horas úteis após a confirmação do pagamento Produto de fabricação própria Atendimento ágil e atencioso via chat – tire todas as suas dúvidas!</p>
                </div>

                <p className="italic">Garanta já o seu Cropped Top de Amarrar e descubra como uma peça simples pode transformar seus looks com estilo e conforto! Clique em "COMPRAR AGORA" e receba no conforto da sua casa!</p>
              </div>
            ) : productData.id === '2' ? (
              <div className="space-y-4">
                <p className="font-bold text-[#222222]">Kit 3 Cropped Tubinho Top Tube Faixa Blusa Feminino Básico forrada Suplex Blogueira Premium</p>
                <p>Nosso Top Tube é feito com uma MODELAGEM ACINTURADA e DUAS CAMADAS de tecido na parte da FRENTE. Com isso, garante maior SUSTENTAÇÃO. Além do elástico embutido nas costas.</p>
                
                <div className="space-y-1">
                  <p>• Tecido suplex de alta elasticidade</p>
                  <p>• Conforto e sustentação para o dia a dia</p>
                  <p>• Secagem rápida e fácil de Versátil</p>
                  <p>• Versátil, ideal para looks casuais ou esportivos</p>
                  <p>• Toque macio e resistente, não deforma</p>
                  <p>• Elástico interno que garante firmeza</p>
                </div>

                <div className="space-y-1">
                  <p>-&gt; Não Marca os seios (justamente pela dupla camada de tecido)</p>
                  <p>-&gt; Tecido Suplex</p>
                  <p>-&gt; Alta Elasticidade</p>
                  <p>-&gt; Zero Transparência</p>
                  <p>-&gt; Peça Versátil</p>
                  <p>-&gt; Não da bolinhas</p>
                </div>

                <div className="space-y-1">
                  <p>-&gt; Cores: Preto, Branco, Marrom , azul, vinho, Verde, vermelho, azul claro, rosa bb, roxo</p>
                </div>

                <div className="pt-2 space-y-1">
                  <p>Tamanho único veste 38 ao 46</p>
                </div>
              </div>
            ) : isCroppedTop ? (
              <div className="space-y-4">
                <p className="font-bold text-[#222222]">Kit 3 Cropped Feminino Blusa Alcinhas Finas Suplex Forrado Básico Casual</p>
                
                <div className="space-y-1">
                  <p>-Tecido Suplex</p>
                  <p>-Modelagem Slim (justa ao corpo)</p>
                  <p>-Alças Finas</p>
                  <p>-Zero Transparência</p>
                  <p>-Alta Elasticidade</p>
                  <p>-Peça versátil</p>
                </div>

                <div className="space-y-1">
                  <p>Tamanho: P, M, G e GG</p>
                  <p>Composição: 92% Poliéster</p>
                  <p>08% Elastano</p>
                </div>

                <div className="pt-2 space-y-1">
                  <p className="font-bold text-[#222222]">MEDIDAS DA MODELO</p>
                  <p>Busto: 32 cm</p>
                  <p>Cintura: 28 cm</p>
                  <p>Quadril: 38 cm</p>
                  <p>Altura: 1.60</p>
                  <p>Peso: 59 kg</p>
                </div>

                <p className="pt-2 italic">
                  Ficou com dúvida? Nos mande mensagem no chat, estaremos prontas para te responder! ;)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-bold text-[#222222]">{productData.name}</p>
                <p>O calçado ideal para quem busca performance e conforto em suas corridas. Desenvolvido com as tecnologias mais avançadas do mercado para garantir o melhor amortecimento e retorno de energia.</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Tecnologia de amortecimento superior</li>
                  <li>Cabedal respirável</li>
                  <li>Solado de alta durabilidade</li>
                  <li>Design ergonômico</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>

      <BottomBar 
        onBuyNow={() => setIsVariationModalOpen(true)} 
        onAddToCart={() => setIsVariationModalOpen(true)}
      />

      <VariationModal 
        isOpen={isVariationModalOpen}
        onClose={() => setIsVariationModalOpen(false)}
        product={productData}
        onConfirm={(data) => {
          setIsVariationModalOpen(false);
          if (data.type === 'cart') {
            addToCart(data);
            setCurrentView('cart');
          } else {
            const checkoutItem: CartItem = {
              id: productData.id,
              cartId: `buy-now-${Date.now()}`,
              name: productData.name,
              currentPrice: productData.currentPrice,
              originalPrice: productData.originalPrice,
              image: data.image,
              color: data.color,
              size: data.size,
              quantity: data.quantity,
              selected: true
            };
            setCheckoutItems([checkoutItem]);
            setIsCheckoutOpen(true);
          }
        }}
      />

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-16 right-3 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm z-40 opacity-80"
      >
        <ArrowUp className="w-5 h-5 text-[#555555]" strokeWidth={1.5} />
      </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        items={checkoutItems}
        timeLeft={timeLeft}
      />
    </div>
  );
}
