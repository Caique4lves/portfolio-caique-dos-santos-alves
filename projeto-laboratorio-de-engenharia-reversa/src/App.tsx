/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { QROptions } from './components/qr/QROptions';
import { DotsOptions } from './components/qr/DotsOptions';
import { CornersSquareOptions } from './components/qr/CornersSquareOptions';
import { CornersDotOptions } from './components/qr/CornersDotOptions';
import { BackgroundOptions } from './components/qr/BackgroundOptions';
import { ImageOptions } from './components/qr/ImageOptions';
import { QRSpecificOptions } from './components/qr/QRSpecificOptions';
import { QRPreview } from './components/qr/QRPreview';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { QRConfig, DEFAULT_QR_CONFIG } from './types/qr';
import { ChevronDown, ChevronRight, FileJson } from 'lucide-react';

type Section = 'main' | 'dots' | 'cornersSquare' | 'cornersDot' | 'background' | 'image' | 'qr';

export default function App() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [openSection, setOpenSection] = useState<Section | null>('main');

  const toggleSection = (section: Section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Accordion Options */}
        <div className="w-full lg:w-[600px] space-y-2">
          
          {/* Main Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('main')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Main Options</span>
              {openSection === 'main' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'main' && (
              <div className="p-6 border-t border-gray-100">
                <QROptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Dots Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('dots')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Dots Options</span>
              {openSection === 'dots' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'dots' && (
              <div className="p-6 border-t border-gray-100">
                <DotsOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Corners Square Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('cornersSquare')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Corners Square Options</span>
              {openSection === 'cornersSquare' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'cornersSquare' && (
              <div className="p-6 border-t border-gray-100">
                <CornersSquareOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Corners Dot Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('cornersDot')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Corners Dot Options</span>
              {openSection === 'cornersDot' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'cornersDot' && (
              <div className="p-6 border-t border-gray-100">
                <CornersDotOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Background Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('background')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Background Options</span>
              {openSection === 'background' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'background' && (
              <div className="p-6 border-t border-gray-100">
                <BackgroundOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Image Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('image')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Image Options</span>
              {openSection === 'image' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'image' && (
              <div className="p-6 border-t border-gray-100">
                <ImageOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* QR Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleSection('qr')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>QR Options</span>
              {openSection === 'qr' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'qr' && (
              <div className="p-6 border-t border-gray-100">
                <QRSpecificOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Export Button */}
          <div className="pt-4 pb-8 space-y-4">
            <button 
              onClick={exportToJson}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#333333] text-white rounded-lg font-bold hover:bg-black transition-all shadow-md active:scale-[0.98]"
            >
              Export Options as JSON
            </button>
            <p className="text-center text-sm text-gray-500 italic">
              If you have any questions or issues please contact me via email or GitHub Issues.
            </p>
          </div>
        </div>

        {/* Right Side: QR Code Preview */}
        <div className="flex-1 w-full sticky top-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center min-h-[500px]">
            <ErrorBoundary key={JSON.stringify(config.qrOptions)}>
              <QRPreview config={config} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
