"use client";

import { useEffect, useState } from 'react';

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  gridOpacity?: number;
  fadeEdges?: boolean;
  fadeDistance?: string;
}

export default function GridBackground({ 
  className = "",
  gridSize = 40,
  gridOpacity = 0.15,
  fadeEdges = true,
}: GridBackgroundProps) {
  const [isDark, setIsDark] = useState(true);

  // Listen for theme changes from your existing navbar toggle
  useEffect(() => {
    const checkTheme = () => {
      // Check if document has dark class (your current system)
      const hasThemeClass = document.documentElement.classList.contains('dark');
      setIsDark(hasThemeClass);
    };

    // Initial check
    checkTheme();

    // Listen for changes to the document's class attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const gridColor = isDark 
    ? `rgba(255, 255, 255, ${gridOpacity})` 
    : `rgba(0, 0, 0, ${gridOpacity})`;


  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: '0 0, 0 0',
  };

  const maskStyle: React.CSSProperties = fadeEdges ? {
    maskImage: `radial-gradient(ellipse at center, black 40%, transparent 70%)`,
    WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent 70%)`,
  } : {};

  return (
    <div 
      className={`absolute inset-0 transition-all duration-500 ${className}`}
      style={{
        ...backgroundStyle,
        ...maskStyle
      }}
    />
  );
}