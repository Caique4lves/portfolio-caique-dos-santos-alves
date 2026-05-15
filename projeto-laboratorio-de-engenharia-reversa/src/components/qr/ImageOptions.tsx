import React from 'react';
import { QRConfig } from '../../types/qr';

interface ImageOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const ImageOptions: React.FC<ImageOptionsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Hide Background Dots */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
        <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="hide-dots">
          Hide Background Dots
        </label>
        <div 
          onClick={() => onChange({
            ...config,
            imageOptions: { ...config.imageOptions, hideBackgroundDots: !config.imageOptions.hideBackgroundDots }
          })}
          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
            config.imageOptions.hideBackgroundDots ? 'bg-[#333333]' : 'bg-gray-300'
          }`}
        >
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
            config.imageOptions.hideBackgroundDots ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </div>
      </div>

      {/* Image Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Image Size
          </label>
          <span className="text-xs font-mono text-gray-400">{Math.round(config.imageOptions.imageSize * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={config.imageOptions.imageSize}
          onChange={(e) => onChange({
            ...config,
            imageOptions: { ...config.imageOptions, imageSize: Number(e.target.value) }
          })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#333333]"
        />
      </div>

      {/* Margin */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Margin
        </label>
        <input
          type="number"
          value={config.imageOptions.margin}
          onChange={(e) => onChange({
            ...config,
            imageOptions: { ...config.imageOptions, margin: Number(e.target.value) }
          })}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
        />
      </div>
    </div>
  );
};
