import React, { useState, useEffect, useRef } from 'react';
import { QRConfig } from '../../types/qr';
import { Move, Image as ImageIcon, Upload, X, Loader2, AlertCircle, Maximize } from 'lucide-react';
import { uploadQRImage } from '../../services/storageService';
import { useAuth } from '../auth/AuthProvider';
import { UploadTask } from 'firebase/storage';

interface ImageOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const ImageOptions: React.FC<ImageOptionsProps> = ({ config, onChange }) => {
  const { user, signIn } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const uploadTaskRef = useRef<UploadTask | null>(null);

  // Sync isUploading state with config changes
  useEffect(() => {
    if (!config.image) {
      setIsUploading(false);
      setUploadProgress(0);
      if (uploadTaskRef.current) {
        uploadTaskRef.current.cancel();
        uploadTaskRef.current = null;
      }
    }
  }, [config.image]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (uploadTaskRef.current) uploadTaskRef.current.cancel();
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Create local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);
    setError(null);
    
    onChange({
      ...config,
      image: previewUrl
    });

    // 2. Only attempt upload if user is logged in
    if (!user) {
      setError('Imagem adicionada localmente. Faça login para salvar permanentemente na nuvem.');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 2. Start upload in background
      const { promise, task } = uploadQRImage(file, (progress) => {
        setUploadProgress(Math.round(progress));
      });
      
      uploadTaskRef.current = task;
      
      // Add a timeout of 30 seconds to the upload
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 30000)
      );

      const permanentUrl = await Promise.race([promise, timeoutPromise]) as string;

      // 3. Update with permanent URL once finished
      onChange({
        ...config,
        image: permanentUrl
      });
      setLocalPreview(null);
    } catch (err: any) {
      if (err.message === 'timeout') {
        setError('O upload demorou muito tempo. A imagem continuará funcionando localmente, mas não será salva na nuvem.');
        if (uploadTaskRef.current) uploadTaskRef.current.cancel();
      } else if (err.code === 'storage/canceled') {
        console.log('Upload canceled by user');
        return;
      } else {
        console.error('Upload failed:', err);
        setError('Erro ao salvar na nuvem. A imagem funcionará apenas nesta sessão.');
      }
    } finally {
      setIsUploading(false);
      uploadTaskRef.current = null;
    }
  };

  const cancelUpload = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
    }
    removeImage();
  };

  const removeImage = () => {
    onChange({
      ...config,
      image: null
    });
    setLocalPreview(null);
    setError(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
          <ImageIcon size={16} className="text-blue-400" />
          Imagem da Logo
        </label>
        
        {config.image ? (
          <div className="relative group w-32 h-32 mx-auto">
            <img 
              src={config.image} 
              alt="QR Logo" 
              className="w-full h-full object-contain glass-card p-2"
              referrerPolicy="no-referrer"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="relative w-10 h-10 mb-1">
                  <Loader2 size={40} className="text-white animate-spin opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                    {uploadProgress}%
                  </div>
                </div>
                <button 
                  onClick={cancelUpload}
                  className="text-[10px] text-white bg-red-500/80 px-2 py-0.5 rounded hover:bg-red-600 transition-colors font-bold"
                >
                  CANCELAR
                </button>
              </div>
            )}
            {!isUploading && (
              <button 
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors z-10"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center glass-card rounded-2xl p-8 hover:bg-white/50 transition-all cursor-pointer relative min-h-[160px]">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-12 h-12 mb-2">
                    <Loader2 size={48} className="text-blue-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-600">
                      {uploadProgress}%
                    </div>
                  </div>
                  <p className="text-xs text-blue-500 font-medium mb-2">Enviando imagem...</p>
                  <button 
                    onClick={cancelUpload}
                    className="px-3 py-1 glass-button text-gray-700 rounded-lg text-[10px] font-bold"
                  >
                    CANCELAR
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Clique ou arraste para enviar</p>
                  {!user && <p className="text-[10px] text-blue-500 mt-2 font-bold uppercase tracking-wider">Login necessário para salvar na nuvem</p>}
                </>
              )}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#0a0a0a] px-2 text-gray-500">ou use uma URL</span>
              </div>
            </div>

            <input 
              type="text"
              placeholder="https://exemplo.com/logo.png"
              className="w-full px-4 py-2 glass-input rounded-lg text-sm"
              onBlur={(e) => {
                if (e.target.value) {
                  onChange({ ...config, image: e.target.value });
                }
              }}
            />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl text-red-600 text-xs animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Erro no Upload</p>
              <p>{error}</p>
              <p className="mt-2 text-[10px] opacity-80">
                Dica: Se o upload falhar mas a imagem aparecer no QR, você ainda pode baixar o QR code, mas não poderá salvar este estilo na nuvem com a imagem.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Maximize size={16} className="text-blue-400" />
              Tamanho da Imagem
            </label>
            <span className="text-xs font-mono text-white/40">{(config.imageOptions.imageSize * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={config.imageOptions.imageSize}
            onChange={(e) => onChange({
              ...config,
              imageOptions: { ...config.imageOptions, imageSize: Number(e.target.value) }
            })}
            className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-[10px] text-gray-500 italic">Nota: Tamanhos acima de 50% podem dificultar a leitura do QR Code.</p>
        </div>

        <div className="flex items-center justify-between p-3 glass-card rounded-xl border-white/5">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white/80">Ocultar pontos atrás</span>
            <span className="text-[10px] text-gray-500">Remove os pontos cobertos pela logo</span>
          </div>
          <button
            onClick={() => onChange({
              ...config,
              imageOptions: { ...config.imageOptions, hideBackgroundDots: !config.imageOptions.hideBackgroundDots }
            })}
            className={`w-10 h-5 rounded-full transition-all relative ${
              config.imageOptions.hideBackgroundDots ? 'bg-blue-600' : 'bg-white/10'
            }`}
          >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${
              config.imageOptions.hideBackgroundDots ? 'left-6' : 'left-1'
            }`} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Move size={16} className="text-blue-400" />
            Margem da Imagem
          </label>
          <input
            type="number"
            value={config.imageOptions.margin}
            onChange={(e) => onChange({
              ...config,
              imageOptions: { ...config.imageOptions, margin: Number(e.target.value) }
            })}
            className="w-full px-4 py-2 glass-input rounded-lg outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/80">
            <ImageIcon size={16} className="text-blue-400" />
            Origem Cruzada (CORS)
          </label>
          <select
            value={config.imageOptions.crossOrigin}
            onChange={(e) => onChange({
              ...config,
              imageOptions: { ...config.imageOptions, crossOrigin: e.target.value }
            })}
            className="w-full px-4 py-2 glass-input rounded-lg outline-none transition-all"
          >
            <option value="anonymous">Anônimo</option>
            <option value="use-credentials">Usar Credenciais</option>
          </select>
        </div>
      </div>
    </div>
  );
};
