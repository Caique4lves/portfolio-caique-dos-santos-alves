import React, { useState } from 'react';
import { useAccessibility } from './AccessibilityProvider';
import { 
  Eye, 
  Type, 
  Contrast, 
  RotateCcw, 
  X, 
  Check,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    highContrast, 
    colorBlindMode, 
    toggleHighContrast, 
    setColorBlindMode,
    increaseFontSize,
    decreaseFontSize,
    resetAccessibility
  } = useAccessibility();

  const colorBlindOptions = [
    { id: 'none', label: 'Padrão' },
    { id: 'protanopia', label: 'Protanopia (Vermelho)' },
    { id: 'deuteranopia', label: 'Deuteranopia (Verde)' },
    { id: 'tritanopia', label: 'Tritanopia (Azul)' },
    { id: 'achromatopsia', label: 'Acromatopsia (Cinza)' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 group"
        aria-label="Menu de Acessibilidade"
      >
        {isOpen ? <X size={28} /> : <Eye size={28} className="group-hover:scale-110 transition-transform" />}
      </button>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-5 bg-blue-600 text-white">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Eye size={20} />
                Acessibilidade Visual
              </h3>
              <p className="text-blue-100 text-xs mt-1">Personalize sua experiência de visualização</p>
            </div>

            <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* High Contrast */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Contrast size={16} />
                  Contraste
                </label>
                <button
                  onClick={toggleHighContrast}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    highContrast 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">Alto Contraste</span>
                  {highContrast && <Check size={18} />}
                </button>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Type size={16} />
                  Tamanho do Texto
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={decreaseFontSize}
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    A-
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Colorblind Modes */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Eye size={16} />
                  Modo para Daltônicos
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {colorBlindOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setColorBlindMode(option.id as any)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        colorBlindMode === option.id 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-medium">{option.label}</span>
                      {colorBlindMode === option.id && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={resetAccessibility}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                <RotateCcw size={16} />
                Resetar Configurações
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
