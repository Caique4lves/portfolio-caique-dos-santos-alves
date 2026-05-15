import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
      <Header />
      <Hero />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-7xl">
        {children}
      </main>
      <footer className="bg-[#333333] py-8 text-center text-white">
        <a 
          href="https://linktr.ee/denys.kozak" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity font-medium tracking-wide"
        >
          © {new Date().getFullYear()} Denys Kozak
        </a>
      </footer>
    </div>
  );
};
