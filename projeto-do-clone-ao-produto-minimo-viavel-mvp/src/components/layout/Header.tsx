import React from 'react';
import { Github } from 'lucide-react';
import { LoginButton } from '../auth/LoginButton';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/60 backdrop-blur-xl text-white h-20 flex items-center justify-between px-8 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-[#0a0a0a] text-[10px] font-black">QR</div>
          </div>
          <span className="text-white">QRLab <span className="text-blue-500">PRO</span></span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 text-sm font-medium">
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="https://github.com/Caique4lves/QRLab-PRO" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </div>
        <LoginButton />
      </div>
    </header>
  );
};
