import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface AccessibilityContextType {
  highContrast: boolean;
  colorBlindMode: ColorBlindMode;
  fontSize: number;
  toggleHighContrast: () => void;
  setColorBlindMode: (mode: ColorBlindMode) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>('none');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply High Contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply Colorblind Mode
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
    if (colorBlindMode !== 'none') {
      root.classList.add(colorBlindMode);
    }

    // Apply Font Size
    root.style.fontSize = `${fontSize}px`;
  }, [highContrast, colorBlindMode, fontSize]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const resetAccessibility = () => {
    setHighContrast(false);
    setColorBlindMode('none');
    setFontSize(16);
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      colorBlindMode,
      fontSize,
      toggleHighContrast,
      setColorBlindMode,
      increaseFontSize,
      decreaseFontSize,
      resetAccessibility
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
