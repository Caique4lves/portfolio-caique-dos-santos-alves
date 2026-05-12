import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette, Square } from 'lucide-react';

interface CornersOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const CornersOptions: React.FC<CornersOptionsProps> = ({ config, onChange }) => {
  const squareTypes = ['square', 'dot', 'extra-rounded'];
  const dotTypes = ['square', 'dot'];

  return (
    <div className="space-y-8">
      {/* Corners Square */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quadrado dos Cantos</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Palette size={16} className="text-blue-400" />
            Cor
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={config.cornersSquareOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersSquareOptions: { ...config.cornersSquareOptions, color: e.target.value }
              })}
              className="w-10 h-10 rounded cursor-pointer border-none p-0 bg-transparent"
            />
            <input
              type="text"
              value={config.cornersSquareOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersSquareOptions: { ...config.cornersSquareOptions, color: e.target.value }
              })}
              className="flex-1 px-4 py-2 glass-input rounded-lg outline-none text-sm"
            />
            <div className="flex gap-1">
              <button 
                onClick={() => onChange({ ...config, cornersSquareOptions: { ...config.cornersSquareOptions, color: '#ffffff' } })}
                className="w-8 h-8 rounded-lg bg-white border border-white/20 shadow-sm"
              />
              <button 
                onClick={() => onChange({ ...config, cornersSquareOptions: { ...config.cornersSquareOptions, color: '#000000' } })}
                className="w-8 h-8 rounded-lg bg-black border border-white/20 shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {squareTypes.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                cornersSquareOptions: { ...config.cornersSquareOptions, type: type as any }
              })}
              className={`px-3 py-2 text-xs rounded-lg transition-all ${
                config.cornersSquareOptions.type === type
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'glass-button text-white/60'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Corners Dot */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ponto dos Cantos</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Palette size={16} className="text-blue-400" />
            Cor
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={config.cornersDotOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, color: e.target.value }
              })}
              className="w-10 h-10 rounded cursor-pointer border-none p-0 bg-transparent"
            />
            <input
              type="text"
              value={config.cornersDotOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, color: e.target.value }
              })}
              className="flex-1 px-4 py-2 glass-input rounded-lg outline-none text-sm"
            />
            <div className="flex gap-1">
              <button 
                onClick={() => onChange({ ...config, cornersDotOptions: { ...config.cornersDotOptions, color: '#ffffff' } })}
                className="w-8 h-8 rounded-lg bg-white border border-white/20 shadow-sm"
              />
              <button 
                onClick={() => onChange({ ...config, cornersDotOptions: { ...config.cornersDotOptions, color: '#000000' } })}
                className="w-8 h-8 rounded-lg bg-black border border-white/20 shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {dotTypes.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, type: type as any }
              })}
              className={`px-3 py-2 text-xs rounded-lg transition-all ${
                config.cornersDotOptions.type === type
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
