import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#333333] text-white h-16 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 font-bold tracking-tight select-none text-white">
          <span className="text-4xl font-black leading-none">QR</span>
          <div className="flex flex-col uppercase leading-none font-normal">
            <span className="text-[18px]">Code</span>
            <span className="text-[18px]">Styling</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-medium">
        <a 
          href="https://www.npmjs.com/package/qr-code-styling" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gray-300 transition-colors"
        >
          <span>npm v1.8.3</span>
        </a>
        <a 
          href="https://github.com/kozakdenys/qr-code-styling" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gray-300 transition-colors"
        >
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
};
