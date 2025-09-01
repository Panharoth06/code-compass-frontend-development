'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin,
  ArrowUpRight,
  Globe
} from 'lucide-react';

const Footer = ({ isDarkMode = true }) => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Problemsets', href: '/problems' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy & Policy', href: '/privacy' }
  ];

  const quickLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Support Center', href: '/support' },
    { name: 'Status Page', href: '/status' }
  ];

  return (
    <footer className={`relative ${isDarkMode 
      ? 'bg-gradient-to-b from-[#0B121F] via-[#0B121F] via-70% to-[#CCF301]/15' 
      : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
    } ${isDarkMode ? 'text-white' : 'text-gray-900'} overflow-hidden`}>
      
      {/* Modern geometric background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#CCF301] rotate-45 animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-[#CCF301] rounded-full animate-pulse" style={{ animationDelay: '3s', animationDuration: '10s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-[#CCF301] rounded-full animate-pulse" style={{ animationDelay: '6s', animationDuration: '12s' }}></div>
      </div>

      {/* Glass morphism overlay */}
      <div className={`absolute inset-0 ${isDarkMode 
        ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent' 
        : 'bg-gradient-to-t from-white/30 via-transparent to-transparent'
      } backdrop-blur-sm`}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          
          {/* Header Section with Logos */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-8 mb-8">
  {/* CodeCompass Logo */}
  <div className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
    <div className="relative">
      <Image
        src="/image/logo2.svg"
        alt="CodeCompass Logo"
        width={64}
        height={64}
        className="w-16 h-16 object-contain filter drop-shadow-sm"
      />
    </div>
    <span className={`text-2xl font-bold bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 bg-clip-text text-transparent`}>
      CodeCompass
    </span>
  </div>
  
  {/* Separator */}
  <div className={`w-px h-12 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
  
  {/* Official School Logo */}
  <div className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
    <div className="relative">
      <Image
        src="/image/istad.png"
        alt="ISTAD Logo"
        width={64}
        height={64}
        className="w-16 h-16 object-contain filter drop-shadow-sm"
      />
    </div>
    <span className={`text-xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-gray-700'}`}>
      ISTAD
    </span>
  </div>
</div>
            
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg max-w-2xl mx-auto leading-relaxed`}>
              Where challenges meet growth. Empowering developers through interactive problem-solving and continuous learning.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            
            {/* Navigation Links */}
            <div className="space-y-6">
              <h5 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 relative`}>
                <span className="relative z-10">Navigation</span>
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#CCF301] to-transparent rounded-full"></div>
              </h5>
              <div className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group relative flex items-center justify-between p-3 rounded-xl transition-all duration-500 overflow-hidden ${isDarkMode ? 'hover:bg-gradient-to-r hover:from-[#CCF301]/5 hover:to-[#CCF301]/10' : 'hover:bg-gradient-to-r hover:from-[#CCF301]/5 hover:to-[#CCF301]/10'} hover:shadow-lg hover:shadow-[#CCF301]/10 hover:scale-[1.02] hover:-translate-y-0.5`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CCF301] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                      <span className={`text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {link.name}
                      </span>
                    </div>
                    
                    <ArrowUpRight className={`h-4 w-4 transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 ${isDarkMode ? 'text-[#CCF301]' : 'text-[#CCF301]'}`} />
                    
                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#CCF301]/20 transition-all duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h5 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 relative`}>
                <span className="relative z-10">Resources</span>
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#CCF301] to-transparent rounded-full"></div>
              </h5>
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group relative flex items-center justify-between p-3 rounded-xl transition-all duration-500 overflow-hidden ${isDarkMode ? 'hover:bg-gradient-to-r hover:from-[#CCF301]/5 hover:to-[#CCF301]/10' : 'hover:bg-gradient-to-r hover:from-[#CCF301]/5 hover:to-[#CCF301]/10'} hover:shadow-lg hover:shadow-[#CCF301]/10 hover:scale-[1.02] hover:-translate-y-0.5`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CCF301] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                      <span className={`text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {link.name}
                      </span>
                    </div>
                    
                    <ArrowUpRight className={`h-4 w-4 transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 ${isDarkMode ? 'text-[#CCF301]' : 'text-[#CCF301]'}`} />
                    
                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#CCF301]/20 transition-all duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h5 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 relative`}>
                <span className="relative z-10">Contact</span>
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#CCF301] to-transparent rounded-full"></div>
              </h5>
              
              <div className="space-y-3">
                {[
                  { Icon: Mail, text: 'codecompass.istad.co@gmail.com', href: 'mailto:codecompass.istad.co@gmail.com' },
                  { Icon: Phone, text: '+855 123456789', href: 'tel:+855123456789' },
                  { Icon: MapPin, text: 'Proudly built at ISTAD,\nPhnom Penh, Cambodia', href: '#' }
                ].map(({ Icon, text, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className={`group relative flex items-start space-x-4 p-4 rounded-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:-translate-y-1 ${isDarkMode ? 'hover:bg-gradient-to-br hover:from-[#CCF301]/5 hover:via-[#CCF301]/10 hover:to-[#CCF301]/5' : 'hover:bg-gradient-to-br hover:from-[#CCF301]/5 hover:via-[#CCF301]/10 hover:to-[#CCF301]/5'} hover:shadow-xl hover:shadow-[#CCF301]/20`}
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#CCF301]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon container with advanced effects - fixed sizing */}
                    <div className="relative z-10 min-w-12 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CCF301]/10 via-[#CCF301]/20 to-[#CCF301]/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#CCF301]/30 border border-[#CCF301]/10 group-hover:border-[#CCF301]/30 flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#CCF301] group-hover:scale-110 transition-all duration-300" />
                      
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-2xl bg-[#CCF301]/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 blur-sm"></div>
                    </div>
                    
                    {/* Text with advanced typography effects - improved text wrapping */}
                    <div className="relative z-10 flex-1 min-w-0">
                      <span className={`text-sm font-medium leading-relaxed transition-all duration-300 ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} group-hover:translate-x-1 block break-words`} style={{ whiteSpace: 'pre-line' }}>
                        {text}
                      </span>
                      
                      {/* Subtle underline effect */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CCF301] to-transparent group-hover:w-full transition-all duration-500 delay-100"></div>
                    </div>
                    
                    {/* Border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#CCF301]/20 transition-all duration-500"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social & Newsletter */}
            <div className="space-y-6">
              <h5 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 relative`}>
                <span className="relative z-10">Connect</span>
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#CCF301] to-transparent rounded-full"></div>
              </h5>
              
              {/* Social Links with ultra-modern effects */}
              <div className="flex items-center space-x-4">
                {[
                  { Icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
                  { Icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
                  { Icon: Globe, href: '#', label: 'Website', color: '#CCF301' }
                ].map(({ Icon, href, label, color }, index) => (
                  <Link
                    key={label}
                    href={href}
                    className={`group relative w-12 h-12 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:rotate-6 border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} hover:border-[#CCF301]/30 overflow-hidden`}
                    aria-label={label}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Multiple background layers for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#CCF301]/0 to-[#CCF301]/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    
                    {/* Icon with color transition */}
                    <Icon className={`h-5 w-5 relative z-10 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:scale-110`} 
                          style={{ color: `var(--hover-color, ${isDarkMode ? '#9CA3AF' : '#6B7280'})` }}
                          onMouseEnter={(e) => e.target.style.setProperty('--hover-color', color)}
                          onMouseLeave={(e) => e.target.style.removeProperty('--hover-color')} />
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 blur-md" style={{ backgroundColor: `${color}20` }}></div>
                    
                    {/* Shine effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                  </Link>
                ))}
              </div>

              {/* Newsletter with glassmorphism */}
              <div className="space-y-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Stay updated
                </p>
                <div className="relative group">
                  <div className="flex rounded-2xl overflow-hidden backdrop-blur-sm bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-[#CCF301]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#CCF301]/10">
                    <input
                      type="email"
                      placeholder="Enter your email..."
                      className={`flex-1 px-4 py-3 text-sm bg-transparent ${isDarkMode 
                        ? 'text-white placeholder-gray-400' 
                        : 'text-gray-900 placeholder-gray-500'
                      } focus:outline-none transition-all duration-300`}
                    />
                    <button className="relative px-6 py-3 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-black text-sm font-semibold transition-all duration-500 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 hover:scale-105 hover:shadow-lg hover:shadow-[#CCF301]/30 focus:outline-none focus:ring-2 focus:ring-[#CCF301]/50 group overflow-hidden">
                      <span className="relative z-10">Subscribe</span>
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                    </button>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/20 to-[#CCF301]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`border-t ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200'} pt-8`}>
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>
                  © {currentYear} CodeCompass — Where challenges meet growth.
                </p>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="animate-pulse">🚀</span>
                  <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Built with passion in Cambodia
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className={`group relative ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-all duration-500 text-sm font-medium hover:scale-110 hover:-translate-y-0.5`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Text with color transition */}
                    <span className="relative z-10 group-hover:text-[#CCF301] transition-colors duration-300">
                      {item}
                    </span>
                    
                    {/* Animated underline */}
                    <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/60 group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-full"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-[#CCF301]/10 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 blur-sm"></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCF301]/40 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#CCF301]/60 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-[#CCF301] rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-1 h-1 bg-[#CCF301] rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
    </footer>
  );
};

export default Footer;