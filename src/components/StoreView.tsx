import React from 'react';
import { Search, ShoppingCart, ChevronLeft, Share2, Star, ShoppingBag, MessageSquare, ChevronRight, ListFilter, Home, ClipboardList, User as UserIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  discount: string;
  rating: number;
  sold: string;
}

interface StoreViewProps {
  onProductClick: (product: any) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Kit 3 Cropped Feminino Regata Alcinha Básico Verão Suplex',
    currentPrice: 32.90,
    originalPrice: 129.90,
    image: 'https://i.ibb.co/4nDy1nL0/image.png',
    discount: '70% OFF',
    rating: 5,
    sold: '4.6k'
  },
  {
    id: '2',
    name: 'Kits 3 Tube Cropped Tomara Que Caia Blusa Feminino Suplex Premium Forrada',
    currentPrice: 28.90,
    originalPrice: 89.90,
    image: 'https://i.ibb.co/LDsVmsyq/image.png',
    discount: '67% OFF',
    rating: 5,
    sold: '1.2k'
  },
  {
    id: '3',
    name: 'Kit 3 Blusas Cropped Amarraçao Feminina MultiForma Decote Festa Suplex Premium Elegante Sexy Moda Gringa',
    currentPrice: 38.90,
    originalPrice: 119.90,
    image: 'https://i.ibb.co/TqL744gc/image.png',
    discount: '68% OFF',
    rating: 5,
    sold: '2.8k'
  },
  {
    id: '4',
    name: 'Kit 3 Blusas Regata Nula manga feminina canelada Mula Manca',
    currentPrice: 34.90,
    originalPrice: 119.90,
    image: 'https://i.ibb.co/LD2XRr3Q/image.png',
    discount: '71% OFF',
    rating: 5,
    sold: '3.1k'
  },
  {
    id: '5',
    name: 'KIT 3: Blusa Feminina de Manga Longa - Meia Estação de Compressão Colada',
    currentPrice: 46.90,
    originalPrice: 149.90,
    image: 'https://i.ibb.co/S74P9XG0/image.png',
    discount: '69% OFF',
    rating: 5,
    sold: '1.8k'
  },
  {
    id: '6',
    name: 'Kit 3 Blusas Femininas Manga Curta Ajustada Moderna',
    currentPrice: 36.90,
    originalPrice: 119.90,
    image: 'https://i.ibb.co/ccBqNM24/image.png',
    discount: '69% OFF',
    rating: 5,
    sold: '2.4k'
  }
];

export default function StoreView({ onProductClick, cartCount = 0, onCartClick }: StoreViewProps) {
  const [isCouponRedeemed, setIsCouponRedeemed] = React.useState(false);

  return (
    <div className="bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white px-1 py-1 flex items-center h-11 sticky top-0 z-50">
        <button className="p-2">
          <ChevronLeft className="w-6 h-6 text-[#222222]" strokeWidth={1.5} />
        </button>
        
        <div className="flex-1 bg-[#F5F5F5] rounded-[2px] flex items-center px-2 py-1.5 gap-2 h-8">
          <Search className="w-4 h-4 text-[#888888]" />
          <input 
            type="text" 
            placeholder="Pesquisar" 
            className="bg-transparent text-[13px] outline-none w-full text-[#222222] placeholder-[#888888]"
            readOnly
          />
        </div>

        <div className="flex items-center gap-1 px-1">
          <button className="p-2">
            <Share2 className="w-5 h-5 text-[#222222]" strokeWidth={1.5} />
          </button>
          <button className="p-2 relative" onClick={onCartClick}>
            <ShoppingCart className="w-5 h-5 text-[#222222]" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#EE4D2D] text-white text-[8px] min-w-[14px] h-[14px] flex items-center justify-center rounded-full border border-white font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Store Info */}
      <div className="bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-[4px] border border-gray-100 overflow-hidden bg-gray-50">
            <img src="https://i.ibb.co/NdqKM8MM/image.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h1 className="text-[16px] font-bold text-[#222222]">MG Outlet</h1>
            <p className="text-[12px] text-[#888888]">329.2K vendido(s)</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-[#EE4D2D] text-white px-4 py-1.5 rounded-[2px] text-[13px] font-bold">
            Seguir
          </button>
          <button className="flex-1 sm:flex-none border border-gray-200 text-[#222222] px-4 py-1.5 rounded-[2px] text-[13px] font-medium">
            Mensagem
          </button>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="bg-white px-4 py-2 flex gap-3 overflow-x-auto no-scrollbar">
        <div className="min-w-[200px] border border-[#00BFA5]/20 rounded-[4px] p-2 flex items-center justify-between bg-[#F6FFFE]">
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-[#222222]">Cupom de frete grátis</p>
            <p className="text-[10px] text-[#555555]">Sem gasto mínimo</p>
          </div>
          <button 
            onClick={() => setIsCouponRedeemed(true)}
            disabled={isCouponRedeemed}
            className={`${isCouponRedeemed ? 'bg-gray-400' : 'bg-[#00BFA5]'} text-white text-[10px] px-3 py-1 rounded-[2px] font-bold transition-colors`}
          >
            {isCouponRedeemed ? 'Resgatado' : 'Resgatar'}
          </button>
        </div>
        <div className="min-w-[200px] border border-[#EE4D2D]/20 rounded-[4px] p-2 flex items-center justify-between bg-[#FFF5F5]">
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-[#222222]">Até 85% OFF</p>
            <p className="text-[10px] text-[#555555]">Em produtos selecionados</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 flex mt-1">
        {['Página inicial', 'Produtos', 'Categorias'].map((tab, i) => (
          <button 
            key={tab} 
            className={`flex-1 py-3 text-[14px] relative ${i === 1 ? 'text-[#EE4D2D] font-bold' : 'text-[#555555]'}`}
          >
            {tab}
            {i === 1 && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EE4D2D]" />}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-50">
        <div className="flex gap-6">
          <button className="text-[13px] font-bold text-[#EE4D2D]">Recomendado</button>
          <button className="text-[13px] text-[#555555]">Mais vendidos</button>
          <button className="text-[13px] text-[#555555]">Lançamentos</button>
        </div>
        <ListFilter className="w-5 h-5 text-[#222222]" />
      </div>

      {/* Product List */}
      <div className="bg-white">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex p-4 gap-3 border-b border-gray-50 active:bg-gray-50"
            onClick={() => onProductClick(product)}
          >
            <div className="w-28 h-28 rounded-[4px] overflow-hidden bg-gray-50 flex-shrink-0">
              <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div className="space-y-1">
                <h3 className="text-[14px] text-[#222222] line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="flex gap-1.5">
                  <span className="bg-[#FFF5F5] text-[#EE4D2D] text-[10px] px-1 py-0.5 rounded-[1px] font-bold border border-[#EE4D2D]/20">
                    {product.discount}
                  </span>
                  <span className="bg-[#F6FFFE] text-[#00BFA5] text-[10px] px-1 py-0.5 rounded-[1px] font-bold border border-[#00BFA5]/20">
                    Frete grátis
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
                  <span className="text-[11px] text-[#555555]">{product.rating} | {product.sold} vendido(s)</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[12px] text-[#EE4D2D] font-bold">R$</span>
                    <span className="text-[18px] text-[#EE4D2D] font-bold leading-none">
                      {product.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#888888] line-through">
                    R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-9 h-9 border border-[#EE4D2D]/20 rounded-[2px] flex items-center justify-center bg-[#FFF5F5]">
                    <ShoppingCart className="w-4 h-4 text-[#EE4D2D]" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                    className="bg-[#EE4D2D] text-white px-4 h-9 rounded-[2px] text-[13px] font-bold"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TikTok Shop Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around h-16 z-50 px-2">
        <button className="flex flex-col items-center gap-1 text-[#888888]">
          <Home className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px]">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#EE4D2D]">
          <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-bold">Loja</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#888888]">
          <ClipboardList className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px]">Pedidos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#888888]">
          <UserIcon className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px]">Perfil</span>
        </button>
      </footer>
    </div>
  );
}
