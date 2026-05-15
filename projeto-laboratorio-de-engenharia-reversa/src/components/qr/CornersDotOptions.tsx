import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette, Shapes, Circle, RotateCw } from 'lucide-react';

interface CornersDotOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const CornersDotOptions: React.FC<CornersDotOptionsProps> = ({ config, onChange }) => {
  const types = ['', 'square', 'dot'];

  return (
    <div className="space-y-6">
      {/* 1. Corners Dot Style */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Corners Dot Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, type: type as any }
              })}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                config.cornersDotOptions.type === type
                  ? 'bg-[#333333] text-white border-[#333333]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {type === '' ? 'None' : type === 'dot' ? 'Dot' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Color Type */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Color Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div 
              onClick={() => onChange({
                ...config,
                cornersDotOptions: { 
                  ...config.cornersDotOptions, 
                  colorType: 'single',
                  gradient: null
                }
              })}
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                config.cornersDotOptions.colorType === 'single' || !config.cornersDotOptions.colorType
                  ? 'border-[#333333] bg-[#333333]' 
                  : 'border-gray-300 group-hover:border-gray-400'
              }`}
            >
              {(config.cornersDotOptions.colorType === 'single' || !config.cornersDotOptions.colorType) && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm text-gray-600">Single color</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div 
              onClick={() => onChange({
                ...config,
                cornersDotOptions: { 
                  ...config.cornersDotOptions, 
                  colorType: 'gradient',
                  gradient: config.cornersDotOptions.gradient || {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: config.cornersDotOptions.color || '#333333' },
                      { offset: 1, color: '#666666' }
                    ]
                  }
                }
              })}
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                config.cornersDotOptions.colorType === 'gradient'
                  ? 'border-[#333333] bg-[#333333]' 
                  : 'border-gray-300 group-hover:border-gray-400'
              }`}
            >
              {config.cornersDotOptions.colorType === 'gradient' && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm text-gray-600">Color gradient</span>
          </label>
        </div>
      </div>

          {/* 3. Corners Dot Color (Third) - Only if single color */}
       {config.cornersDotOptions.colorType !== 'gradient' ? (
         <div className="space-y-2">
           <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
             Corners Dot Color
           </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={config.cornersDotOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, color: e.target.value }
              })}
              className="w-12 h-12 rounded cursor-pointer border-none p-0"
            />
            <input
              type="text"
              value={config.cornersDotOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, color: e.target.value }
              })}
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none uppercase"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. Gradient Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Gradient Type
            </label>
            <div className="flex gap-2">
              {['linear', 'radial'].map((gType) => (
                <button
                  key={gType}
                  onClick={() => onChange({
                    ...config,
                    cornersDotOptions: {
                      ...config.cornersDotOptions,
                      gradient: { ...config.cornersDotOptions.gradient!, type: gType as any }
                    }
                  })}
                  className={`flex-1 px-4 py-2 text-xs rounded-lg border transition-all ${
                    config.cornersDotOptions.gradient?.type === gType
                      ? 'bg-[#333333] text-white border-[#333333]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {gType.charAt(0).toUpperCase() + gType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Corners Dot Gradient */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Corners Dot Gradient
            </label>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <input
                  type="color"
                  value={config.cornersDotOptions.gradient?.colorStops[0].color || '#333333'}
                  onChange={(e) => {
                    const newStops = [...(config.cornersDotOptions.gradient?.colorStops || [])];
                    if (newStops[0]) newStops[0].color = e.target.value;
                    onChange({
                      ...config,
                      cornersDotOptions: {
                        ...config.cornersDotOptions,
                        gradient: { ...config.cornersDotOptions.gradient!, colorStops: newStops }
                      }
                    });
                  }}
                  className="w-full h-10 rounded cursor-pointer border-none p-0"
                />
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="color"
                  value={config.cornersDotOptions.gradient?.colorStops[1].color || '#666666'}
                  onChange={(e) => {
                    const newStops = [...(config.cornersDotOptions.gradient?.colorStops || [])];
                    if (newStops[1]) newStops[1].color = e.target.value;
                    onChange({
                      ...config,
                      cornersDotOptions: {
                        ...config.cornersDotOptions,
                        gradient: { ...config.cornersDotOptions.gradient!, colorStops: newStops }
                      }
                    });
                  }}
                  className="w-full h-10 rounded cursor-pointer border-none p-0"
                />
              </div>
            </div>
          </div>

          {/* 3. Rotation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Rotation
              </label>
              <span className="text-xs font-mono text-gray-400">{config.cornersDotOptions.gradient?.rotation || 0}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={config.cornersDotOptions.gradient?.rotation || 0}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: {
                  ...config.cornersDotOptions,
                  gradient: { ...config.cornersDotOptions.gradient!, rotation: Number(e.target.value) }
                }
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#333333]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
