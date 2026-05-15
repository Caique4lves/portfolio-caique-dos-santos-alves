import React from 'react';
import { QRConfig } from '../../types/qr';

interface QRSpecificOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const QRSpecificOptions: React.FC<QRSpecificOptionsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Type Number */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700">
          <span>Type Number (Version)</span>
          <span className="text-xs text-gray-400">{config.qrOptions.typeNumber === 0 ? 'Auto' : config.qrOptions.typeNumber}</span>
        </label>
        <input
          type="range"
          min={0}
          max={40}
          step={1}
          value={config.qrOptions.typeNumber}
          onChange={(e) => onChange({
            ...config,
            qrOptions: { ...config.qrOptions, typeNumber: Number(e.target.value) }
          })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#333333]"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
          <span>Auto</span>
          <span>Version 40</span>
        </div>
      </div>

      {/* Mode */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Mode
        </label>
        <select
          value={config.qrOptions.mode}
          onChange={(e) => onChange({
            ...config,
            qrOptions: { ...config.qrOptions, mode: e.target.value as any }
          })}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
        >
          <option value="Numeric">Numeric</option>
          <option value="Alphanumeric">Alphanumeric</option>
          <option value="Byte">Byte</option>
          <option value="Kanji">Kanji</option>
        </select>
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Error Correction Level
        </label>
        <select
          value={config.qrOptions.errorCorrectionLevel}
          onChange={(e) => onChange({
            ...config,
            qrOptions: { ...config.qrOptions, errorCorrectionLevel: e.target.value as any }
          })}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
        >
          <option value="L">L (7%)</option>
          <option value="M">M (15%)</option>
          <option value="Q">Q (25%)</option>
          <option value="H">H (30%)</option>
        </select>
      </div>

    </div>
  );
};
