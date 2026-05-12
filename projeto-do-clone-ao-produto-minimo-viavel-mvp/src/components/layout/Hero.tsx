import React from 'react';
import { QRPreview } from '../qr/QRPreview';
import { QRConfig } from '../../types/qr';
import { motion } from 'motion/react';

const DECORATIVE_QR_LEFT: QRConfig = {
  data: 'https://qr-code-styling.com',
  image: null,
  width: 200,
  height: 200,
  margin: 10,
  dotsOptions: { color: '#3b82f6', type: 'rounded' },
  cornersSquareOptions: { color: '#60a5fa', type: 'extra-rounded' },
  cornersDotOptions: { color: '#ffffff', type: 'dot' },
  backgroundOptions: { color: '#1a1a1a' },
  imageOptions: { crossOrigin: 'anonymous', margin: 0, imageSize: 0.4, hideBackgroundDots: true },
};

const DECORATIVE_QR_RIGHT: QRConfig = {
  data: 'https://qr-code-styling.com',
  image: null,
  width: 200,
  height: 200,
  margin: 10,
  dotsOptions: { color: '#ffffff', type: 'classy' },
  cornersSquareOptions: { color: '#3b82f6', type: 'dot' },
  cornersDotOptions: { color: '#60a5fa', type: 'square' },
  backgroundOptions: { color: '#1a1a1a' },
  imageOptions: { crossOrigin: 'anonymous', margin: 0, imageSize: 0.4, hideBackgroundDots: true },
};

export const Hero: React.FC = () => {
  return (
    <section 
      className="w-full py-20 px-6 md:px-12 mb-8 relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' 
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Decorative QR */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            animate={{ opacity: 0.8, x: 0, rotate: -15 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block glass-card-dark p-2 rounded-2xl shadow-2xl"
          >
            <QRPreview config={DECORATIVE_QR_LEFT} hideUI />
          </motion.div>

          {/* Centered Content */}
          <div className="flex-1 text-center relative">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-20 blur-3xl pointer-events-none z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fill="#3b82f6" 
                  d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.5C87.4,-33.8,90,-18.5,88.5,-3.6C87,11.3,81.4,25.7,73.1,38.7C64.8,51.7,53.8,63.2,40.6,71.1C27.4,79,12,83.3,-2.4,87.4C-16.8,91.5,-30.2,95.4,-42.6,90.4C-55,85.4,-66.4,71.5,-74.2,56.8C-82,42.1,-86.2,26.6,-88.1,10.8C-90,-5,-89.6,-21.1,-83.8,-35.1C-78,-49.1,-66.8,-61,-53.6,-68.7C-40.4,-76.4,-25.2,-79.9,-10.2,-81.7C4.8,-83.5,19.6,-83.6,44.7,-76.4Z" 
                  transform="translate(100 100)" 
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
                QRLab <span className="text-blue-500">PRO</span>
              </h1>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-light text-gray-300">
                  Uma biblioteca JS de código aberto
                </p>
                <p className="text-xl md:text-2xl font-medium text-blue-400/80 italic">
                  Para gerar QR codes estilizados
                </p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <div className="h-1 w-32 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
              </div>
            </motion.div>
          </div>

          {/* Right Decorative QR */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            animate={{ opacity: 0.8, x: 0, rotate: 15 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block glass-card-dark p-2 rounded-2xl shadow-2xl"
          >
            <QRPreview config={DECORATIVE_QR_RIGHT} hideUI />
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
    </section>
  );
};
