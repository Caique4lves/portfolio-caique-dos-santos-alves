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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...config,
          image: reader.result as string,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Data
        </label>
        <input
          type="text"
          name="data"
          value={config.data}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Image File Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Image File
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-full transition-all whitespace-nowrap">
              Escolher ficheiro
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-400 truncate max-w-[200px]">
              {config.fileName || "Nenhum ficheiro selecionado"}
            </span>
            {config.image && (
              <button 
                onClick={() => onChange({ ...config, image: null, fileName: undefined })}
                className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Width</label>
          <input
            type="number"
            name="width"
            value={config.width}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Height</label>
          <input
            type="number"
            name="height"
            value={config.height}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Margin</label>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{config.margin}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={config.margin}
            onChange={(e) => onChange({ ...config, margin: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#333333]"
          />
        </div>
      </div>

    </div>
  );
};
