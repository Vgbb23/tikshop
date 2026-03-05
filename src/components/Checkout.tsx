import React, { useState } from 'react';
import { ChevronLeft, MapPin, User, Plus, ChevronRight, ShieldCheck, CreditCard, Circle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AddressForm from './AddressForm';
import CPFModal from './CPFModal';
import PixPayment from './PixPayment';

import { CartItem } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  timeLeft: string;
}

export default function Checkout({ isOpen, onClose, items, timeLeft }: CheckoutProps) {
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isCPFModalOpen, setIsCPFModalOpen] = useState(false);
  const [isPixPageOpen, setIsPixPageOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState<any | null>(null);
  const [savedCPF, setSavedCPF] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'pix' | 'credit_card'>('pix');
  const [isCreatingPix, setIsCreatingPix] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState('');
  const [pixError, setPixError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.currentPrice * item.quantity), 0);
  const originalSubtotal = items.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const savings = originalSubtotal - subtotal;
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;
  const canPlaceOrder = Boolean(savedAddress && savedCPF);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const maskPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    const ddd = digits.slice(0, 2);
    const last2 = digits.slice(-2);
    return `${ddd}*******${last2}`;
  };

  const onlyDigits = (value: string) => value.replace(/\D/g, '');
  const sanitizeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
  const isValidQrCodeSource = (value: string) => value.startsWith('data:image/') || value.startsWith('https://');

  const readApiResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();

    if (contentType.includes('application/json')) {
      try {
        return JSON.parse(raw);
      } catch {
        return { success: false, message: 'Resposta JSON inválida da API.' };
      }
    }

    return {
      success: false,
      message: raw?.slice(0, 140) || 'A API retornou um formato inesperado.',
    };
  };

  const handleCreatePixCharge = async () => {
    if (!savedAddress) {
      setPixError('Adicione um endereço antes de gerar o PIX.');
      setIsPixPageOpen(true);
      return;
    }

    if (!savedCPF) {
      setPixError('Adicione um CPF válido antes de gerar o PIX.');
      setIsPixPageOpen(true);
      return;
    }

    const phoneDigits = onlyDigits(savedAddress.phone || '');
    const cpfDigits = onlyDigits(savedCPF);
    const email = savedAddress.email?.trim() || 'cliente@exemplo.com';

    if (phoneDigits.length < 10 || cpfDigits.length !== 11) {
      setPixError('Verifique telefone e CPF para continuar.');
      setIsPixPageOpen(true);
      return;
    }

    setPixError('');
    setPixCode('');
    setPixQrCodeBase64('');
    setIsCreatingPix(true);
    setIsPixPageOpen(true);

    try {
      const response = await fetch('/api/fruitfy/pix/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: savedAddress.name,
          email,
          phone: `55${phoneDigits}`,
          cpf: cpfDigits,
          valueCents: Math.round(total * 100),
        }),
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data?.message || 'Falha ao criar cobrança PIX');
      }

      const code = sanitizeString(data?.data?.pix?.code || data?.pix?.code || '');
      const qrCodeRaw = sanitizeString(data?.data?.pix?.qr_code_base64 || data?.pix?.qr_code_base64 || '');
      const qrCode = isValidQrCodeSource(qrCodeRaw) ? qrCodeRaw : '';

      if (!code) {
        throw new Error('A API não retornou um código PIX válido.');
      }

      setPixCode(code);
      setPixQrCodeBase64(qrCode);
    } catch (error) {
      setPixError(error instanceof Error ? error.message : 'Erro ao gerar o código PIX.');
    } finally {
      setIsCreatingPix(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[200] bg-[#F8F8F8] flex flex-col font-sans w-full h-full"
      >
        {/* Header */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shrink-0">
          <button onClick={onClose} className="p-1">
            <ChevronLeft className="w-6 h-6 text-[#222222]" />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-[16px] font-bold text-[#222222]">Resumo do pedido</h1>
            <div className="flex items-center gap-1 text-[#00BFA5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Finalização da compra segura garantida</span>
            </div>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </header>

        <main className="flex-1 overflow-y-auto pb-48">
          {/* Shipping Address */}
          <section className="bg-white px-4 py-4 flex items-start justify-between mt-0.5">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <MapPin className="w-5 h-5 text-[#222222] mt-0.5" strokeWidth={1.5} />
              {savedAddress ? (
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-[#222222] truncate">
                    {savedAddress.name}, (+55){maskPhone(savedAddress.phone)}
                  </p>
                  <p className="text-[13px] text-[#222222] leading-tight mt-1">
                    {savedAddress.address}, {savedAddress.number}, {savedAddress.neighborhood}, {savedAddress.city}, {savedAddress.state}, {savedAddress.cep}
                  </p>
                </div>
              ) : (
                <span className="text-[14px] font-medium text-[#222222]">Endereço de envio</span>
              )}
            </div>
            <button 
              onClick={() => setIsAddressFormOpen(true)}
              className="text-[#FF2D55] text-[14px] font-bold flex items-center gap-1 shrink-0 ml-2"
            >
              {savedAddress ? (
                <ChevronRight className="w-5 h-5 text-[#888888]" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Adicionar endereço
                </>
              )}
            </button>
          </section>

          {/* CPF Section */}
          <section className="bg-white px-4 py-4 flex items-center justify-between mt-0.5">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#222222]" strokeWidth={1.5} />
              <span className="text-[14px] font-medium text-[#222222]">
                {savedCPF ? `CPF: ${formatCPF(savedCPF)}` : 'CPF'}
              </span>
            </div>
            <button 
              onClick={() => setIsCPFModalOpen(true)}
              className="text-[#FF2D55] text-[14px] font-bold flex items-center gap-1"
            >
              {savedCPF ? (
                <ChevronRight className="w-5 h-5 text-[#888888]" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Adicionar CPF
                </>
              )}
            </button>
          </section>

          {/* Decorative Line */}
          <div className="h-1 w-full flex shrink-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-[#FF2D55]' : 'bg-[#00BFA5]'}`} />
            ))}
          </div>

          {/* Product Section */}
          <section className="bg-white px-4 py-4 mt-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-[#222222]">Jeans Livre</h2>
              <button className="text-[#888888] text-[12px] flex items-center gap-0.5">
                Adicionar nota <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {items.map((item) => (
              <div key={item.cartId} className="flex gap-3">
                <div className="relative w-24 h-24 rounded-[4px] overflow-hidden bg-gray-50 flex-shrink-0">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[9px] py-0.5 text-center">
                    Apenas 7 resta...
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] text-[#222222] line-clamp-2 leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#888888] mb-2">{item.color}, {item.size}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="bg-[#FF2D55] text-white text-[10px] px-1.5 py-0.5 rounded-[2px] flex items-center gap-1 font-bold">
                      <span className="text-[12px]">⚡</span> Oferta Relâmpago
                    </div>
                    <span className="text-[#FF2D55] text-[10px] font-bold">{timeLeft}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#00BFA5] mb-2">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px] font-medium">Devolução gratuita</span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[16px] font-bold text-[#FF2D55]">R$ {formatPrice(item.currentPrice)}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-[#888888] line-through">R$ {formatPrice(item.originalPrice)}</span>
                        <span className="text-[#FF2D55] text-[11px] font-bold">-{Math.round((1 - item.currentPrice / item.originalPrice) * 100)}%</span>
                      </div>
                    </div>
                    <div className="text-[13px] font-medium text-[#222222]">x{item.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* TikTok Shop Discount */}
          <section className="bg-white px-4 py-4 mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#FF2D55] rounded-[2px] flex items-center justify-center">
                <span className="text-white text-[10px] font-black">✓</span>
              </div>
              <span className="text-[14px] font-medium text-[#222222]">Desconto do TikTok Shop</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </section>

          {/* Order Summary */}
          <section className="bg-white px-4 py-4 mt-2 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222222]">Resumo do pedido</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-1">
                  <span className="text-[#222222]">Subtotal do produto</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#222222] rotate-90" strokeWidth={3} />
                </div>
                <span className="font-bold text-[#222222]">R$ {formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex items-center justify-between text-[13px] pl-4">
                <span className="text-[#555555]">Preço original</span>
                <span className="text-[#222222]">R$ {formatPrice(originalSubtotal)}</span>
              </div>
              
              <div className="flex items-center justify-between text-[13px] pl-4">
                <span className="text-[#555555]">Desconto no produto</span>
                <span className="text-[#FF2D55]">- R$ {formatPrice(savings)}</span>
              </div>

              <div className="flex items-center justify-between text-[13px] pt-1">
                <div className="flex items-center gap-1">
                  <span className="text-[#222222]">Subtotal do envio</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#222222] rotate-90" strokeWidth={3} />
                </div>
                <span className="font-bold text-[#00B578]">Grátis</span>
              </div>
              
              <div className="flex items-center justify-between text-[13px] pl-4">
                <span className="text-[#555555]">Taxa de envio</span>
                <span className="text-[#888888] line-through">R$ 9,60</span>
              </div>
              
              <div className="flex items-center justify-between text-[13px] pl-4">
                <span className="text-[#555555]">Desconto de envio</span>
                <span className="text-[#00B578]">- R$ 9,60</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#222222]">Total</span>
                <div className="text-right">
                  <div className="text-[16px] font-bold text-[#222222]">R$ {formatPrice(total)}</div>
                  <div className="text-[11px] text-[#888888]">Impostos inclusos</div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white px-4 py-4 mt-2 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222222]">Forma de pagamento</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-[#888888]" />
                  <div className="space-y-1">
                    <span className="text-[14px] text-[#222222] font-medium">Cartão de crédito</span>
                    <div className="flex items-center gap-1">
                      <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-[2px] font-bold border border-gray-200 flex items-center gap-1">
                        Indisponível no momento
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                      <div className="bg-[#0070BA] text-white text-[7px] px-1 py-0.5 rounded-[1px] font-black italic">elo</div>
                      <div className="bg-[#0070BA] text-white text-[7px] px-1 py-0.5 rounded-[1px] font-black uppercase italic">Amex</div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#888888]" />
              </div>

              <button 
                onClick={() => setSelectedPayment('pix')}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <img src="https://i.ibb.co/Rpv6M6B6/pix.png" className="h-4" />
                  </div>
                  <span className="text-[14px] text-[#222222]">Pix</span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === 'pix' ? 'border-[#FF2D55] bg-[#FF2D55]' : 'border-gray-200'}`}>
                  {selectedPayment === 'pix' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>

              <button className="w-full flex items-center justify-between text-[14px] text-[#222222] pt-2">
                <span>Ver todos</span>
                <ChevronRight className="w-4 h-4 text-[#888888]" />
              </button>
            </div>
          </section>

          {/* Terms */}
          <section className="px-4 py-6 text-[11px] text-[#888888] leading-tight">
            Ao fazer um pedido, você concorda com <span className="text-[#222222] font-medium">Termos de uso e venda do TikTok Shop</span> e reconhece que leu e concordou com a <span className="text-[#222222] font-medium">Política de privacidade do TikTok</span>.
          </section>
        </main>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 space-y-3 z-[210] pb-8 shrink-0">
          <div className="bg-[#FFF0F3] text-[#FF2D55] text-[12px] py-2.5 px-4 rounded-[4px] flex items-center gap-2">
            <span className="text-[16px]">😊</span>
            <span className="font-medium">Você está economizando R$ {formatPrice(savings)} nesse pedido.</span>
          </div>
          
          <div className="flex items-center justify-between px-1">
            <span className="text-[15px] font-bold text-[#222222]">Total ({totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'})</span>
            <span className="text-[18px] font-bold text-[#FF2D55]">R$ {formatPrice(total)}</span>
          </div>

          <button 
            onClick={handleCreatePixCharge}
            disabled={!canPlaceOrder || isCreatingPix}
            className={`w-full py-3 rounded-[4px] flex flex-col items-center justify-center leading-none shadow-lg transition-transform ${!canPlaceOrder || isCreatingPix ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-[#FF2D55] text-white active:scale-[0.98]'}`}
          >
            <span className="text-[16px] font-bold mb-1">Fazer pedido</span>
            <span className="text-[11px] font-medium opacity-90">A oferta acaba em {timeLeft} | Restam 7</span>
          </button>
          {!canPlaceOrder && (
            <p className="text-[11px] text-[#888888] text-center">
              Preencha CPF e endereço de envio para continuar.
            </p>
          )}
        </div>
        
        <AddressForm 
          isOpen={isAddressFormOpen} 
          onClose={() => setIsAddressFormOpen(false)} 
          onSave={(data) => setSavedAddress(data)}
        />

        <CPFModal 
          isOpen={isCPFModalOpen} 
          onClose={() => setIsCPFModalOpen(false)} 
          onSave={(cpf) => setSavedCPF(cpf)}
        />

        <PixPayment 
          isOpen={isPixPageOpen} 
          onClose={() => setIsPixPageOpen(false)} 
          price={total}
          pixCode={pixCode}
          qrCodeBase64={pixQrCodeBase64}
          isCreating={isCreatingPix}
          errorMessage={pixError}
        />
      </motion.div>
    </AnimatePresence>
  );
}
