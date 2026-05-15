import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section 
      className="w-full py-12 px-6 md:px-12 mb-8"
      style={{ 
        backgroundImage: 'linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(106, 26, 76) 50%, rgb(255, 255, 255) 100%)' 
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            QR Code Styling
          </h1>
          <p className="text-lg md:text-xl opacity-90">An open source JS library</p>
          <p className="text-lg md:text-xl opacity-90">For generating styled QR codes</p>
        </div>
      </div>
    </section>
  );
};
