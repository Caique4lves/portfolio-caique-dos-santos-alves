import React from 'react';
import { QRConfig } from '../../types/qr';
import { Link, Image as ImageIcon, Maximize, Move } from 'lucide-react';

interface QROptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const QROptions: React.FC<QROptionsProps> = ({ config, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    onChange({
      ...config,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Data Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Link size={16} className="text-blue-400" />
          Dados
        </label>
        <input
          type="text"
          name="data"
          value={config.data}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 glass-input rounded-lg outline-none transition-all"
        />
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Width */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Maximize size={16} className="text-blue-400" />
            Largura
          </label>
          <input
            type="number"
            name="width"
            value={config.width}
            onChange={handleInputChange}
            className="w-full px-4 py-2 glass-input rounded-lg outline-none transition-all"
          />
        </div>

        {/* Height */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Maximize size={16} className="text-blue-400" />
            Altura
          </label>
          <input
            type="number"
            name="height"
            value={config.height}
            onChange={handleInputChange}
            className="w-full px-4 py-2 glass-input rounded-lg outline-none transition-all"
          />
        </div>

        {/* Margin */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Move size={16} className="text-blue-400" />
            Margem
          </label>
          <input
            type="number"
            name="margin"
            value={config.margin}
            onChange={handleInputChange}
            className="w-full px-4 py-2 glass-input rounded-lg outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};
