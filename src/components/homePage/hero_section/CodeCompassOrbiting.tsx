'use client';

import React, { useState, useEffect } from 'react';

import OrbitingAnimation from '@/components/homePage/orbiting/orbiting'
import OrbitingContent from '@/components/homePage/orbiting/orbitingContent'

const CodeCompassOrbiting = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof document === 'undefined') return;
    
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className={`relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left Side - Orbiting Animation */}
          <OrbitingAnimation isDarkMode={isDarkMode} />

          {/* Right Side - Title and Content */}
          <OrbitingContent isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Global Custom Styles */}
      <style jsx global>{`
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }

        /* Base states - elements start invisible */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: none; /* Prevent transition on initial load */
        }

        .animate-on-scroll-right {
          opacity: 0;
          transform: translateX(50px);
          transition: none; /* Prevent transition on initial load */
        }

        /* Animated states - triggered when visible */
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          opacity: 1;
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          opacity: 1;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CodeCompassOrbiting;