'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Code, User, LogIn, Home, Puzzle, Trophy, ChevronDown, Users, Mail, Shield } from 'lucide-react';

// Your Animated Toggle Component
const SkyToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="animated-toggle">
      <label className="theme-switch">
        <input 
          type="checkbox" 
          className="theme-switch__checkbox" 
          checked={isDark}
          onChange={toggleTheme}
        />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds" />
          <div className="theme-switch__stars-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor" />
            </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
              </div>
            </div>
          </div>
        </div>
      </label>

      <style jsx>{`
        .animated-toggle .theme-switch {
          --toggle-size: 20px;
          --container-width: 5.625em;
          --container-height: 2.5em;
          --container-radius: 6.25em;
          --container-light-bg: #3D7EAE;
          --container-night-bg: #1D1F2C;
          --circle-container-diameter: 3.375em;
          --sun-moon-diameter: 2.125em;
          --sun-bg: #ECCA2F;
          --moon-bg: #C4C9D1;
          --spot-color: #959DB1;
          --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
          --stars-color: #fff;
          --clouds-color: #F3FDFF;
          --back-clouds-color: #AACADF;
          --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
          --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
        }

        .animated-toggle .theme-switch, .animated-toggle .theme-switch *, .animated-toggle .theme-switch *::before, .animated-toggle .theme-switch *::after {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: var(--toggle-size);
        }

        .animated-toggle .theme-switch__container {
          width: var(--container-width);
          height: var(--container-height);
          background-color: var(--container-light-bg);
          border-radius: var(--container-radius);
          overflow: hidden;
          cursor: pointer;
          -webkit-box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
          box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
          position: relative;
        }

        .animated-toggle .theme-switch__container::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          -webkit-box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
          box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
          border-radius: var(--container-radius)
        }

        .animated-toggle .theme-switch__checkbox {
          display: none;
        }

        .animated-toggle .theme-switch__circle-container {
          width: var(--circle-container-diameter);
          height: var(--circle-container-diameter);
          background-color: rgba(255, 255, 255, 0.1);
          position: absolute;
          left: var(--circle-container-offset);
          top: 50%;
          transform: translateY(-50%);
          border-radius: var(--container-radius);
          -webkit-box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-transition: var(--circle-transition);
          -o-transition: var(--circle-transition);
          transition: var(--circle-transition);
          pointer-events: none;
        }

        .animated-toggle .theme-switch__sun-moon-container {
          pointer-events: auto;
          position: relative;
          z-index: 2;
          width: var(--sun-moon-diameter);
          height: var(--sun-moon-diameter);
          margin: auto;
          border-radius: var(--container-radius);
          background-color: var(--sun-bg);
          -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
          box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
          -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
          filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
          overflow: hidden;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
        }

        .animated-toggle .theme-switch__moon {
          -webkit-transform: translateX(100%);
          -ms-transform: translateX(100%);
          transform: translateX(100%);
          width: 100%;
          height: 100%;
          background-color: var(--moon-bg);
          border-radius: inherit;
          -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
          box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
          position: relative;
        }

        .animated-toggle .theme-switch__spot {
          position: absolute;
          top: 0.75em;
          left: 0.312em;
          width: 0.75em;
          height: 0.75em;
          border-radius: var(--container-radius);
          background-color: var(--spot-color);
          -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
          box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
        }

        .animated-toggle .theme-switch__spot:nth-of-type(2) {
          width: 0.375em;
          height: 0.375em;
          top: 0.937em;
          left: 1.375em;
        }

        .animated-toggle .theme-switch__spot:nth-last-of-type(3) {
          width: 0.25em;
          height: 0.25em;
          top: 0.312em;
          left: 0.812em;
        }

        .animated-toggle .theme-switch__clouds {
          width: 1.25em;
          height: 1.25em;
          background-color: var(--clouds-color);
          border-radius: var(--container-radius);
          position: absolute;
          bottom: -0.625em;
          left: 0.312em;
          -webkit-box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
          box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
          -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
          -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
          transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
        }

        .animated-toggle .theme-switch__stars-container {
          position: absolute;
          color: var(--stars-color);
          top: -100%;
          left: 0.312em;
          width: 2.75em;
          height: auto;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
        }

        /* actions */
        .animated-toggle .theme-switch__checkbox:checked + .theme-switch__container {
          background-color: var(--container-night-bg);
        }

        .animated-toggle .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
          left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
          transform: translateY(-50%);
        }

        .animated-toggle .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
          left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em);
          transform: translateY(-50%);
        }

        .animated-toggle .theme-switch__circle-container:hover {
          left: calc(var(--circle-container-offset) + 0.187em);
          transform: translateY(-50%);
        }

        .animated-toggle .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
          -webkit-transform: translate(0);
          -ms-transform: translate(0);
          transform: translate(0);
        }

        .animated-toggle .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
          bottom: -4.062em;
        }

        .animated-toggle .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main navigation items
  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Problems', href: '/problems', icon: Puzzle },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  // More dropdown items
  const moreItems = [
    { name: 'About Us', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
  ];

  return (
    <>
      {/* Fixed navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-b border-gray-200/30 dark:border-gray-700/30' 
          : 'bg-transparent'
      }`}>
        {/* Gradient overlay for extra visual depth */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isScrolled 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 dark:from-gray-900/5 dark:via-transparent dark:to-gray-900/5"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Enhanced Logo with Image */}
            <Link href="/" className="flex items-center space-x-3 group relative">
              <div className="relative">
                {/* Logo without background, bigger size */}
                <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Image
                    src="/image/image/logo2.svg"
                    alt="CodeCompass Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                    priority
                  />

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-[#CCF301]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#CCF301] transition-colors duration-200">
                  CodeCompass
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-[#CCF301]/70 transition-colors duration-200 -mt-1">
                  Navigate Your Code
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                  </Link>
                );
              })}
              
              {/* More Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                >
                  <span>More</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                  <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                </button>
                
                {/* Enhanced Dropdown Menu */}
                <div 
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                  className={`absolute top-full right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${
                    isMoreOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="p-2">
                    {moreItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 transition-all duration-200 rounded-lg group"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <SkyToggle />
              
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
                <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#CCF301]/25 transform hover:scale-105">
                <User className="h-4 w-4" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 relative group"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30 shadow-xl">
            {/* Gradient overlay for mobile menu */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-gray-900/5"></div>
            
            <div className="relative px-4 py-6 space-y-1">
              
              {/* Mobile Main Navigation */}
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium group"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                    <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                  </Link>
                );
              })}

              {/* Mobile More Items */}
              <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4">
                <div className="mb-3">
                  <span className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">More</span>
                </div>
                {moreItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.name}</span>
                      <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                    </Link>
                  );
                })}
              </div>

              {/* Enhanced Mobile Actions */}
              <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4 space-y-3">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Theme</span>
                  <SkyToggle />
                </div>
                
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                  <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                </button>
                
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#CCF301]/25"
                >
                  <User className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer div to prevent content from being hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;