import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CPFModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cpf: string) => void;
}

export default function CPFModal({ isOpen, onClose, onSave }: CPFModalProps) {
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');

  const validateCpf = (value: string) => {
    if (!/^\d{11}$/.test(value)) return false;
    if (/^(\d)\1{10}$/.test(value)) return false;

    const digits = value.split('').map(Number);

    const firstCheck =
      ((digits.slice(0, 9).reduce((sum, digit, index) => sum + digit * (10 - index), 0) * 10) % 11) % 10;
    const secondCheck =
      ((digits.slice(0, 10).reduce((sum, digit, index) => sum + digit * (11 - index), 0) * 10) % 11) % 10;

    return firstCheck === digits[9] && secondCheck === digits[10];
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setCpf(value);
      setCpfError('');

      if (value.length === 11 && !validateCpf(value)) {
        setCpfError('CPF inválido');
      }
    }
  };

  const handleConfirm = () => {
    if (isValid) {
      onSave(cpf);
      onClose();
    }
  };

  if (!isOpen) return null;

  const isValid = cpf.length === 11 && validateCpf(cpf);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40"
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full bg-white rounded-t-[12px] px-4 pt-4 pb-10 z-[410]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-6" /> {/* Spacer */}
            <h2 className="text-[16px] font-bold text-[#222222]">Adicionar CPF</h2>
            <button onClick={onClose} className="p-1">
              <X className="w-6 h-6 text-[#222222]" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <p className="text-[12px] text-[#888888] uppercase font-medium">
              O CPF será usado para emitir faturas
            </p>
            
            <div className="bg-[#F5F5F5] rounded-[4px] px-4 py-3.5">
              <input
                type="tel"
                placeholder="Insira o número de CPF de 11 dígitos"
                value={cpf}
                onChange={handleCpfChange}
                className="w-full bg-transparent text-[14px] text-[#222222] placeholder:text-[#CCCCCC] outline-none"
              />
            </div>
            {cpfError && <p className="text-[11px] text-[#FF2D55]">{cpfError}</p>}

            <button
              disabled={!isValid}
              onClick={handleConfirm}
              className={`w-full bg-[#FF2D55] text-white py-3.5 rounded-full text-[15px] font-bold mt-4 transition-opacity ${!isValid ? 'opacity-50' : 'opacity-100'}`}
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
