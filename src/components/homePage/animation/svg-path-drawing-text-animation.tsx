import React, { useState, useEffect } from 'react';

const PathAnimation = ({ }) => {
  const [isDark, setIsDark] = useState(true);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Check initial theme
    checkTheme();

    // Create a MutationObserver to watch for class changes on html element
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="text-center">
      {/* Main Title with Source Code Pro font */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-2" style={{ fontFamily: '"Source Code Pro", monospace' }}>
        
        {/* "Welcome To" - Static text with theme support */}
        <div className="mb-2">
          <span className={isDark ? "text-white" : "text-black"}>Welcome To </span>
        </div>
        
        {/* CodeCompass - Reduced height SVG with center alignment */}
        <div className="mb-1">
          <div className="flex justify-center items-center">
            <svg width="100%" height="100" viewBox="0 0 1200 100" className="max-w-full">
              <defs>
                {/* Dark mode gradient: #CCF301 to white */}
                <linearGradient id="pathGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#CCF301" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                
                {/* Light mode gradient: #CCF301 to black */}
                <linearGradient id="pathGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#CCF301" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>
              
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke={isDark ? "url(#pathGradientDark)" : "url(#pathGradientLight)"}
                strokeWidth="4"
                fontSize="200"
                fontWeight="900"
                fontFamily='"Source Code Pro", monospace'
                strokeDasharray="2000"
                strokeDashoffset="2000"
              >
                CodeCompass
                <animate
                  attributeName="stroke-dashoffset"
                  values="2000;0"
                  dur="10s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.25 0.1 0.25 1"
                />
              </text>
            </svg>
          </div>
        </div>
      </h1>
      
      {/* Description with theme support */}
      <div className="mb-8">
        <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}>
          Master algorithms, and level up your programming skills with our cutting-edge coding platform designed for the next generation of developers.
        </p>
      </div>

      {/* Buttons with improved theme support */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Primary Button - Explore Problems */}
        <a
          href="#"
          className="
            inline-flex items-center justify-center
            font-bold text-lg
            rounded-xl px-8 py-4 min-h-[56px]
            bg-[#CCF301] text-black
            transition-all duration-300 ease-out
            shadow-[0_4px_14px_0_rgba(204,243,1,0.15)]
            hover:shadow-[0_6px_20px_0_rgba(204,243,1,0.25)]
            hover:-translate-y-1
            transform
          "
        >
          Explore Problems
        </a>
        
        {/* Secondary Button - View Leaderboard with theme support */}
        <a
          href="#"
          className={`
            inline-flex items-center justify-center
            font-bold text-lg
            rounded-xl px-8 py-4 min-h-[56px]
            bg-transparent border-2 transition-all duration-300 ease-out
            hover:-translate-y-1 transform
            ${isDark 
              ? "border-gray-600 text-white hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.25)] hover:border-gray-400" 
              : "border-gray-400 text-gray-800 hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)] hover:border-gray-600"
            }
          `}
        >
          View Leaderboard
        </a>
      </div>
    </div>
  );
};

export default PathAnimation;