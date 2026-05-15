import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRConfig } from '../../types/qr';
import { Download } from 'lucide-react';

interface QRPreviewProps {
  config: QRConfig;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ config }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = React.useState(false);
  
  // Initialize with a safe, empty config to avoid crashing during render
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling({
    width: config.width || 300,
    height: config.height || 300,
    data: " ", // Use a non-empty string as some versions might fail with totally empty
  }));

  useEffect(() => {
    if (qrRef.current) {
      try {
        qrCode.current.append(qrRef.current);
      } catch (e) {
        console.error('QR Append Error:', e);
        setIsError(true);
      }
    }
  }, []);

  useEffect(() => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    const getOptions = (options: any, isCornerSquare?: boolean) => {
      // If type is empty string (None), we want it to look like dots as per user request
      // We also try using 'dots' plural for corners as requested
      const effectiveType = options.type === '' ? (isCornerSquare ? 'dots' : 'dot') : options.type;

      if (options.colorType === 'gradient' && options.gradient) {
        return {
          type: effectiveType,
          gradient: {
            ...options.gradient,
            rotation: toRadians(options.gradient.rotation)
          }
        };
      }
      return {
        type: effectiveType,
        color: options.color,
        gradient: null // Use null to ensure it override gradient in library update
      };
    };

    try {
      // Add version-dependent spacing/size if requested
      // We adjust the margin based on the version to give a sense of "more space/smaller scale" 
      // as the version increases, as the library doesn't have direct dot-to-dot spacing.
      const version = config.qrOptions.typeNumber || 0;
      const versionSpacingBoost = version > 0 ? (version * 1.2) : 0;
      const effectiveMargin = config.margin + versionSpacingBoost;

      qrCode.current.update({
        width: config.width,
        height: config.height,
        data: config.data || " ",
        margin: effectiveMargin,
        image: config.image || undefined,
        dotsOptions: getOptions(config.dotsOptions),
        backgroundOptions: getOptions(config.backgroundOptions),
        imageOptions: {
          ...config.imageOptions,
        },
        cornersSquareOptions: getOptions(config.cornersSquareOptions, true),
        cornersDotOptions: getOptions(config.cornersDotOptions, true),
        qrOptions: config.qrOptions,
      });
      setIsError(false);
    } catch (e) {
      console.error('QR Update Error:', e);
      setIsError(true);
    }
  }, [config]);

  const onDownload = (extension: 'png' | 'jpeg' | 'webp' | 'svg') => {
    if (isError) return;
    qrCode.current.download({
      extension: extension,
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative group min-h-[300px] flex items-center justify-center">
        <div 
          ref={qrRef} 
          className={`bg-white p-4 rounded-lg shadow-inner border border-gray-50 flex items-center justify-center overflow-hidden max-w-full ${isError ? 'hidden' : 'block'}`}
        />
        {isError && (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">
              Configuração inválida para os dados fornecidos.
              <br />
              O QR Code não pôde ser gerado.
            </p>
          </div>
        )}
      </div>
      
      <div className={`flex flex-wrap justify-center gap-3 w-full ${isError ? 'opacity-50 pointer-events-none' : ''}`}>
        <button
          onClick={() => onDownload('png')}
          className="flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-black transition-colors text-sm font-medium"
        >
          PNG
        </button>
        <button
          onClick={() => onDownload('jpeg')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          JPEG
        </button>
        <button
          onClick={() => onDownload('svg')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          SVG
        </button>
      </div>
    </div>
  );
};
