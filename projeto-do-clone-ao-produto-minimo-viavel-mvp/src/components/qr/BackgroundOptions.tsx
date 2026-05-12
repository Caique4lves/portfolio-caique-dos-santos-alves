import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette } from 'lucide-react';

interface BackgroundOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Palette size={16} className="text-blue-400" />
          Cor de Fundo
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={config.backgroundOptions.color === 'transparent' ? '#ffffff' : config.backgroundOptions.color}
            onChange={(e) => onChange({
              ...config,
              backgroundOptions: { ...config.backgroundOptions, color: e.target.value }
            })}
            className="w-12 h-12 rounded cursor-pointer border-none p-0 bg-transparent"
          />
          <input
            type="text"
            value={config.backgroundOptions.color}
            onChange={(e) => onChange({
              ...config,
              backgroundOptions: { ...config.backgroundOptions, color: e.target.value }
            })}
            className="flex-1 px-4 py-2 glass-input rounded-lg outline-none"
          />
          <button
            onClick={() => onChange({
              ...config,
              backgroundOptions: { ...config.backgroundOptions, color: 'transparent' }
            })}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              config.backgroundOptions.color === 'transparent'
                ? 'bg-blue-600 text-white'
                : 'glass-button text-white/60'
            }`}
          >
            Transparente
          </button>
        </div>
      </div>
    </div>
  );
};
