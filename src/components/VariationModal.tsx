import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: any) => void;
  product: {
    name: string;
    currentPrice: number;
    originalPrice: number;
    images: string[];
  };
}

export default function VariationModal({ isOpen, onClose, onConfirm, product }: VariationModalProps) {
  const isCropped = product.name.toLowerCase().includes('cropped');
  const isTubeCropped = product.name.toLowerCase().includes('tube');
  const isWrapCropped = product.name.toLowerCase().includes('amarraçao');
  const isOneShoulder = product.name.toLowerCase().includes('nula');
  const isLongSleeve = product.name.toLowerCase().includes('manga longa');
  const isShortSleeve = product.name.toLowerCase().includes('manga curta');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(isTubeCropped ? 'Tamanho Único (38-46)' : isWrapCropped ? 'Tamanho Único (36-42)' : isOneShoulder ? 'Tamanho Único (M)' : isLongSleeve ? 'M' : isShortSleeve ? 'M' : isCropped ? 'M' : '40');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedColorIndex(0);
    setSelectedSize(isTubeCropped ? 'Tamanho Único (38-46)' : isWrapCropped ? 'Tamanho Único (36-42)' : isOneShoulder ? 'Tamanho Único (M)' : isLongSleeve ? 'M' : isShortSleeve ? 'M' : isCropped ? 'M' : '40');
    setQuantity(1);
  }, [product.name, isCropped, isTubeCropped, isWrapCropped, isOneShoulder, isLongSleeve, isShortSleeve]);

  const colors = isShortSleeve ? [
    { name: 'nude/preto/cinza', img: 'https://i.ibb.co/ccBqNM24/image.png' },
    { name: 'nude/preto/azul', img: 'https://i.ibb.co/KcN6Nd3S/image.png' },
    { name: 'nude/preto/rosa', img: 'https://i.ibb.co/xqwqZV7f/image.png' },
    { name: 'nude/preto/branco', img: 'https://i.ibb.co/842SG8bG/image.png' },
    { name: 'nude/preto/vermelho', img: 'https://i.ibb.co/PvnN5RKZ/image.png' },
    { name: 'nude/preto/verde', img: 'https://i.ibb.co/nMr5PHKq/image.png' },
    { name: 'nude/preto/petroleo', img: 'https://i.ibb.co/jZ9zP7sG/image.png' },
  ] : isLongSleeve ? [
    { name: 'preto/marrom/nude', img: 'https://i.ibb.co/dw1cfWnN/image.png' },
    { name: 'preto/marrom/petroleo', img: 'https://i.ibb.co/m7RVQXC/image.png' },
    { name: 'preto/marrom/cinza', img: 'https://i.ibb.co/p6rC9tcK/image.png' },
    { name: 'preto/marrom/branca', img: 'https://i.ibb.co/LH7gKqK/image.png' },
    { name: 'preto/marrom/verde', img: 'https://i.ibb.co/ks0M4dXG/image.png' },
    { name: 'preto/marrom/bordo', img: 'https://i.ibb.co/DHx57CjH/image.png' },
    { name: 'preto/verde/petroleo', img: 'https://i.ibb.co/RGpHcmrL/image.png' },
    { name: 'preto/verde/nude', img: 'https://i.ibb.co/R4j38PJf/image.png' },
  ] : isOneShoulder ? [
    { name: 'preto/bege/marrom', img: 'https://i.ibb.co/9mh0Mp5w/image.png' },
    { name: 'preto/branco/azul', img: 'https://i.ibb.co/Fbw1SPmH/image.png' },
    { name: 'preto/branco/verde', img: 'https://i.ibb.co/7xWd7Y9x/image.png' },
    { name: 'preto/branco/marrom', img: 'https://i.ibb.co/MkBbvbB6/image.png' },
    { name: 'preto/branco/bege', img: 'https://i.ibb.co/Kpy7QSzZ/image.png' },
    { name: 'azul/verde/preto', img: 'https://i.ibb.co/dJxDr1rd/image.png' },
  ] : isWrapCropped ? [
    { name: 'branco/preto/marrom', img: 'https://i.ibb.co/Lz1fqckt/image.png' },
    { name: 'branco/preto/marsala', img: 'https://i.ibb.co/d021LxyK/image.png' },
    { name: 'preto/marrom/marsala', img: 'https://i.ibb.co/Zptd8Dfp/image.png' },
    { name: 'branco/marrom/marsala', img: 'https://i.ibb.co/nqC25h7B/image.png' },
    { name: 'marrom/preto/vermelho', img: 'https://i.ibb.co/VcYmcFG6/image.png' },
    { name: 'preto/branco/vermelho', img: 'https://i.ibb.co/Cp7tDBn2/image.png' },
    { name: 'marrom/branco/vermelho', img: 'https://i.ibb.co/Pz0XcCtx/image.png' },
  ] : isTubeCropped ? [
    { name: 'preto/branco/vinho', img: 'https://i.ibb.co/B5YDS6Bg/image.png' },
    { name: 'preto/branco/azul', img: 'https://i.ibb.co/HTdbg6rN/image.png' },
    { name: 'preto/branco/marrom', img: 'https://i.ibb.co/392RVf4c/image.png' },
    { name: 'preto/vinho/azul', img: 'https://i.ibb.co/DHYH5kGV/image.png' },
    { name: 'preto/vinho/marrom', img: 'https://i.ibb.co/pjYswM3F/image.png' },
  ] : isCropped ? [
    { name: 'preto/nude/branco', img: 'https://i.ibb.co/Cp7XMv4C/image.png' },
    { name: 'Preto/Azul/branco', img: 'https://i.ibb.co/Z1gMZtMq/image.png' },
    { name: 'rosa/preto/azul', img: 'https://i.ibb.co/HfVF2KGV/image.png' },
    { name: 'preto/rosa/branco', img: 'https://i.ibb.co/msSr5w0/image.png' },
    { name: 'preto/fúcsia/branco', img: 'https://i.ibb.co/v4YNbP1M/image.png' },
    { name: 'rosa/nude/azul', img: 'https://i.ibb.co/cKF9YCLZ/image.png' },
    { name: 'rosa/branco/azul', img: 'https://i.ibb.co/ccSjxjc3/image.png' },
    { name: 'preto/chocolate/branco', img: 'https://i.ibb.co/RTbz6R0T/image.png' },
  ] : [
    { name: 'Original', img: product.images[0] }
  ];

  const selectedColorData = colors[selectedColorIndex] || colors[0];

  const sizes = isTubeCropped 
    ? ['Tamanho Único (38-46)']
    : isWrapCropped
      ? ['Tamanho Único (36-42)']
      : isOneShoulder
        ? ['Tamanho Único (M)']
        : isLongSleeve
          ? ['P', 'M', 'G']
          : isShortSleeve
            ? ['P', 'M', 'G']
            : isCropped 
            ? ['P', 'M', 'G', 'GG'] 
            : ['38', '39', '40', '41', '42', '43', '44'];

  const totalCurrentPrice = product.currentPrice * quantity;

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white rounded-t-[20px] overflow-hidden z-[610] flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-1 z-20 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto flex-1 px-4 pt-5 pb-32">
            {/* Product Header */}
            <div className="flex gap-4 mb-6">
              <div className="w-24 h-24 rounded-[8px] overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                <img 
                  src={selectedColorData.img} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[14px] font-bold text-[#FF2D55]">R$</span>
                  <span className="text-[28px] font-black text-[#FF2D55] leading-none">{formatPrice(totalCurrentPrice).split(',')[0]}</span>
                  <span className="text-[16px] font-bold text-[#FF2D55]">,{formatPrice(totalCurrentPrice).split(',')[1]}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-1 bg-[#E6F8F2] px-1.5 py-0.5 rounded-[2px]">
                    <Truck className="w-3 h-3 text-[#00B578]" />
                    <span className="text-[10px] text-[#00B578] font-bold">Frete grátis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-[14px] font-bold text-[#222222] mb-4">Cor ({colors.length})</p>
              <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
                <div className="inline-grid grid-rows-2 grid-flow-col gap-2 pb-1">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorIndex(index)}
                      className={`flex flex-col items-center rounded-[8px] border overflow-hidden transition-all w-[92px] ${
                        selectedColorIndex === index 
                          ? 'border-[#FF2D55] ring-1 ring-[#FF2D55]' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="w-full aspect-square bg-gray-50 shrink-0 relative">
                        <img src={color.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        {selectedColorIndex === index && (
                          <div className="absolute top-1 left-1">
                            <div className="w-4 h-4 bg-[#FF2D55] rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-1.5 w-full bg-white flex-1 flex items-center justify-center">
                        <span className={`text-[10px] leading-[1.1] block text-center break-words ${selectedColorIndex === index ? 'text-[#FF2D55] font-bold' : 'text-[#888888]'}`}>
                          {color.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-[14px] font-bold text-[#222222] mb-4">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-9 flex items-center justify-center rounded-[6px] border text-[13px] transition-all ${
                      selectedSize === size 
                        ? 'border-[#FF2D55] bg-white text-[#FF2D55] font-bold' 
                        : 'border-gray-200 bg-white text-[#222222]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[14px] font-bold text-[#222222]">Quantidade</span>
              <div className="flex items-center border border-gray-200 rounded-[4px] overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 active:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-[14px] font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 active:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-100 z-30 flex gap-2">
            <button 
              onClick={() => onConfirm({ 
                color: selectedColorData.name, 
                size: selectedSize, 
                quantity,
                image: selectedColorData.img,
                type: 'cart'
              })}
              className="flex-1 border border-gray-200 text-[#222222] py-3 rounded-full text-[14px] font-bold active:scale-[0.98] transition-transform"
            >
              Adicionar ao carrinho
            </button>
            <button 
              onClick={() => onConfirm({ 
                color: selectedColorData.name, 
                size: selectedSize, 
                quantity,
                image: selectedColorData.img,
                type: 'buy'
              })}
              className="flex-1 bg-[#FF2D55] text-white py-3 rounded-full text-[14px] font-bold flex flex-col items-center leading-none active:scale-[0.98] transition-transform"
            >
              <span>Comprar agora</span>
              <span className="text-[10px] opacity-80 mt-0.5">Frete grátis</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
