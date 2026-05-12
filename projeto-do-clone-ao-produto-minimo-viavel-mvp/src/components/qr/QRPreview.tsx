import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRConfig } from '../../types/qr';
import { Download, Save, RefreshCw } from 'lucide-react';
import { useQRHistory } from '../../hooks/useQRHistory';

interface QRPreviewProps {
  config: QRConfig;
  hideUI?: boolean;
  onReset?: () => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ config, hideUI = false, onReset }) => {
  const { saveToHistory } = useQRHistory();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  // Initialize the instance only once
  useEffect(() => {
    if (!qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling({
        type: 'canvas',
        width: config.width || 300,
        height: config.height || 300,
        data: config.data || ' ',
        margin: config.margin ?? 10,
        dotsOptions: config.dotsOptions,
        backgroundOptions: config.backgroundOptions,
        imageOptions: config.imageOptions,
        cornersSquareOptions: config.cornersSquareOptions,
        cornersDotOptions: config.cornersDotOptions,
      });
    }

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCodeInstance.current.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) qrRef.current.innerHTML = '';
    };
  }, []);

  // Update the instance whenever config changes
  useEffect(() => {
    if (!qrCodeInstance.current) return;

    const isLocalImage = config.image?.startsWith('blob:') || config.image?.startsWith('data:');
    
    const options = {
      width: config.width || 300,
      height: config.height || 300,
      data: config.data || ' ',
      margin: config.margin ?? 10,
      image: config.image || '',
      dotsOptions: {
        color: config.dotsOptions?.color || '#000000',
        type: config.dotsOptions?.type || 'square'
      },
      backgroundOptions: {
        color: config.backgroundOptions?.color === 'transparent' ? 'rgba(0,0,0,0)' : (config.backgroundOptions?.color || '#ffffff')
      },
      imageOptions: {
        hideBackgroundDots: config.imageOptions?.hideBackgroundDots ?? true,
        imageSize: Math.min(config.imageOptions?.imageSize || 0.4, 1.0),
        margin: config.imageOptions?.margin ?? 20,
        crossOrigin: isLocalImage ? undefined : (config.imageOptions?.crossOrigin || 'anonymous'),
      },
      cornersSquareOptions: {
        color: config.cornersSquareOptions?.color || config.dotsOptions?.color || '#000000',
        type: config.cornersSquareOptions?.type || 'square'
      },
      cornersDotOptions: {
        color: config.cornersDotOptions?.color || config.dotsOptions?.color || '#000000',
        type: config.cornersDotOptions?.type || 'square'
      },
    };

    const timer = setTimeout(() => {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.update(options);
        
        // Safety check to ensure canvas is always attached
        if (qrRef.current && qrRef.current.innerHTML === '') {
          qrCodeInstance.current.append(qrRef.current);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [config]);

  const onDownload = (extension: 'png' | 'jpeg' | 'webp' | 'svg') => {
    qrCodeInstance.current?.download({ extension });
  };

  if (hideUI) {
    return <div ref={qrRef} className="flex items-center justify-center" />;
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div 
        ref={qrRef} 
        className="glass-card p-6 rounded-[2.5rem] flex items-center justify-center overflow-hidden min-w-[300px] min-h-[300px] border border-white/10 shadow-2xl"
      />
      
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <button
          onClick={() => {
            if (onReset) {
              onReset();
            } else if (qrRef.current) {
              // Completely re-initialize the instance
              qrRef.current.innerHTML = '';
              qrCodeInstance.current = new QRCodeStyling({
                type: 'canvas',
                width: config.width || 300,
                height: config.height || 300,
                data: config.data || ' ',
                margin: config.margin ?? 10,
                dotsOptions: config.dotsOptions,
                backgroundOptions: config.backgroundOptions,
                imageOptions: config.imageOptions,
                cornersSquareOptions: config.cornersSquareOptions,
                cornersDotOptions: config.cornersDotOptions,
              });
              qrCodeInstance.current.append(qrRef.current);
            }
          }}
          className="flex items-center gap-2 px-4 py-4 glass-button text-white/70 rounded-2xl text-xs font-bold hover:text-white transition-colors border border-white/10"
          title="Resetar para o estilo padrão (Preto e Branco)"
        >
          <RefreshCw size={14} />
          Redesenhar
        </button>
        <button
          onClick={() => onDownload('png')}
          className="flex items-center gap-2 px-8 py-4 glass-button-dark text-white rounded-2xl text-sm font-bold border border-white/10 hover:bg-white/10 transition-all"
        >
          <Download size={18} />
          PNG
        </button>
        <button
          onClick={() => onDownload('svg')}
          className="flex items-center gap-2 px-8 py-4 glass-button text-white rounded-2xl text-sm font-bold border border-white/10 hover:bg-white/10 transition-all"
        >
          <Download size={18} />
          SVG
        </button>
        <button
          onClick={() => saveToHistory(config)}
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all text-sm font-bold shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <Save size={18} />
          Salvar
        </button>
      </div>
      <p className="text-[10px] text-gray-500 max-w-[300px] text-center leading-tight opacity-60">
        Dica: Se o QR Code sumir, clique em "Redesenhar". Se a imagem não aparecer, verifique se a URL é válida ou tente enviar o arquivo novamente.
      </p>
    </div>
  );
};
