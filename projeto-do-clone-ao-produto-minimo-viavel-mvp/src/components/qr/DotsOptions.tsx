import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette, Shapes } from 'lucide-react';

interface DotsOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const DotsOptions: React.FC<DotsOptionsProps> = ({ config, onChange }) => {
  const types = ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Palette size={16} className="text-blue-400" />
          Cor dos Pontos
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={config.dotsOptions.color}
            onChange={(e) => onChange({
              ...config,
              dotsOptions: { ...config.dotsOptions, color: e.target.value }
            })}
            className="w-12 h-12 rounded cursor-pointer border-none p-0 bg-transparent"
          />
          <input
            type="text"
            value={config.dotsOptions.color}
            onChange={(e) => onChange({
              ...config,
              dotsOptions: { ...config.dotsOptions, color: e.target.value }
            })}
            className="flex-1 px-4 py-2 glass-input rounded-lg outline-none"
          />
          <div className="flex gap-1">
            <button 
              onClick={() => onChange({ ...config, dotsOptions: { ...config.dotsOptions, color: '#ffffff' } })}
              className="w-8 h-8 rounded-lg bg-white border border-white/20 shadow-sm"
              title="Branco"
            />
            <button 
              onClick={() => onChange({ ...config, dotsOptions: { ...config.dotsOptions, color: '#000000' } })}
              className="w-8 h-8 rounded-lg bg-black border border-white/20 shadow-sm"
              title="Preto"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Shapes size={16} className="text-blue-400" />
          Tipo de Pontos
        </label>
        <div className="grid grid-cols-2 gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                dotsOptions: { ...config.dotsOptions, type: type as any }
              })}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                config.dotsOptions.type === type
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'glass-button text-white/60'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
