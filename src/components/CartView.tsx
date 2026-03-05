import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Minus, Plus, Trash2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onToggleSelect: (cartId: string) => void;
  onToggleSelectAll: (selected: boolean) => void;
  onCheckout: () => void;
  onBack: () => void;
}

export default function CartView({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onToggleSelect, 
  onToggleSelectAll, 
  onCheckout, 
  onBack 
}: CartViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const selectedItems = items.filter(item => item.selected);
  const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.currentPrice * item.quantity), 0);
  const shippingFee = 0;
  const allSelected = items.length > 0 && items.every(item => item.selected);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#F8F8F8] flex flex-col font-sans w-full h-full">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#222222]" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold text-[#222222]">Carrinho ({items.length})</h1>
            <div className="flex items-center gap-1 text-[#888888]">
              <MapPin className="w-3 h-3" />
              <span className="text-[11px]">Adicionar endereço</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-[14px] font-medium text-[#222222]"
        >
          {isEditing ? 'Concluído' : 'Editar'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-40">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-[14px] text-gray-500">Seu carrinho está vazio</p>
            <button 
              onClick={onBack}
              className="bg-[#FF2D55] text-white px-6 py-2 rounded-full text-[14px] font-bold"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <div className="mt-2 space-y-2">
            {/* Shop Group (Assuming all items from same shop for now) */}
            <div className="bg-white px-4 py-4">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => onToggleSelectAll(!allSelected)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${allSelected ? 'bg-[#FF2D55] border-[#FF2D55]' : 'border-gray-300'}`}
                >
                  {allSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-bold text-[#222222]">Jeans Livre</span>
                  <ChevronRight className="w-4 h-4 text-[#888888]" />
                </div>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <div className="flex items-center">
                      <button 
                        onClick={() => onToggleSelect(item.cartId)}
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${item.selected ? 'bg-[#FF2D55] border-[#FF2D55]' : 'border-gray-300'}`}
                      >
                        {item.selected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </button>
                    </div>
                    
                    <div className="relative w-24 h-24 rounded-[4px] overflow-hidden bg-gray-50 flex-shrink-0">
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[13px] text-[#222222] line-clamp-2 leading-tight mb-1">
                          {item.name}
                        </h3>
                        <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-[2px] mb-2">
                          <span className="text-[11px] text-[#222222]">{item.quantity}un {item.color}, {item.size}</span>
                          <ChevronRight className="w-3 h-3 text-[#888888] rotate-90" />
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-[15px] font-bold text-[#FF2D55]">R$ {formatPrice(item.currentPrice)}</div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] text-[#888888] line-through">R$ {formatPrice(item.originalPrice)}</span>
                            <span className="text-[#FF2D55] text-[11px] font-bold">-{Math.round((1 - item.currentPrice / item.originalPrice) * 100)}%</span>
                          </div>
                        </div>

                        {isEditing ? (
                          <button 
                            onClick={() => onRemoveItem(item.cartId)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        ) : (
                          <div className="flex items-center border border-gray-200 rounded-[2px]">
                            <button 
                              onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-[#888888] text-[14px] border-r border-gray-200"
                            >
                              －
                            </button>
                            <span className="px-3 py-1 text-[13px] font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                              className="px-2 py-1 text-[#222222] text-[14px] border-l border-gray-200"
                            >
                              ＋
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proteção do Cliente */}
            <section className="bg-white px-4 py-4 mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#8B5E3C]" strokeWidth={1.5} />
                  <span className="text-[13px] font-bold text-[#8B5E3C]">Proteção do cliente</span>
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
                    <span className="text-[#8B5E3C] text-[10px] font-black">✓</span>
                    <span className="text-[11px] text-[#555555] truncate">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Bottom Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-[160] shrink-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onToggleSelectAll(!allSelected)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${allSelected ? 'bg-[#FF2D55] border-[#FF2D55]' : 'border-gray-300'}`}
                >
                  {allSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
                <span className="text-[14px] text-[#222222]">Tudo</span>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-[13px] text-[#888888]">Total:</span>
                  <span className="text-[16px] font-bold text-[#FF2D55]">R$ {formatPrice(totalPrice + shippingFee)}</span>
                </div>
                <div className="text-[10px] text-[#00B578] font-semibold">Frete: Grátis</div>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              disabled={items.length === 0}
              className={`w-full py-3.5 rounded-full text-white text-[16px] font-bold shadow-lg active:scale-[0.98] transition-all ${items.length === 0 ? 'bg-gray-300' : 'bg-[#FF2D55]'}`}
            >
              Finalizar compra ({selectedItems.length > 0 ? totalItems : items.reduce((acc, item) => acc + item.quantity, 0)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
