import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { subscribeToUserQRCodes, deleteQRCode, SavedQR } from '../../services/qrService';
import { QRConfig } from '../../types/qr';
import { Trash2, Play, Clock, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SavedConfigsProps {
  onApply: (config: QRConfig) => void;
}

export function SavedConfigs({ onApply }: SavedConfigsProps) {
  const { user } = useAuth();
  const [savedQRs, setSavedQRs] = useState<SavedQR[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setSavedQRs([]);
      return;
    }

    const unsubscribe = subscribeToUserQRCodes((qrs) => {
      setSavedQRs(qrs);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 glass-card rounded-xl font-semibold text-white/80 hover:bg-white/10 transition-all border-white/5"
      >
        <div className="flex items-center gap-2">
          <History size={20} className="text-blue-500" />
          <span>Seus Estilos Salvos ({savedQRs.length})</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Clock size={18} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {savedQRs.length === 0 ? (
                <div className="p-8 text-center glass-card rounded-xl border-white/5">
                  <p className="text-sm text-gray-500">Nenhum estilo salvo ainda. Crie um e salve-o!</p>
                </div>
              ) : (
                savedQRs.map((qr) => (
                  <div
                    key={qr.id}
                    className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/10 transition-all group border-white/5"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-white/90">{qr.name}</span>
                      <span className="text-xs text-gray-500">
                        {qr.createdAt?.toDate().toLocaleDateString()} {qr.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApply(JSON.parse(JSON.stringify(qr.config)))}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Aplicar este estilo"
                      >
                        <Play size={18} fill="currentColor" />
                      </button>
                      <button
                        onClick={() => deleteQRCode(qr.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
