import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans relative overflow-x-hidden text-white">
      {/* Background blobs for glassmorphism effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="fixed top-[30%] right-[5%] w-[40%] h-[40%] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      
      <Header />
      <Hero />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-7xl relative z-10">
        {children}
      </main>
      <footer className="py-8 text-center text-gray-500 text-xs relative z-10 border-t border-white/5">
        © {new Date().getFullYear()} QRLab PRO • Desenvolvido com React & Tailwind
      </footer>
    </div>
  );
};
