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
  Globe
} from 'lucide-react';

import codecompasslogo from "../../public/codecompass-2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Problemsets', href: '/problems' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy & Policy', href: '/privacy' }
  ];

  return (
    <footer className="font-barlow relative bg-gradient-to-b from-[#0B121F] via-[#0B121F] via-70% to-[#CCF301]/15 text-white overflow-hidden">
      
      {/* Modern geometric background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-24 h-24 border border-[#CCF301] rotate-45 animate-pulse"></div>
        <div className="absolute top-16 right-32 w-16 h-16 border border-[#CCF301] rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 left-1/3 w-12 h-12 bg-[#CCF301] rounded-full animate-pulse"></div>
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          
          {/* Header Section with Logos */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-8 mb-6">
              {/* CodeCompass Logo */}
              <div className="group flex items-center space-x-3 transition-all duration-300">
                <div className="relative w-40 h-40">
                  <Image
                    src={codecompasslogo}
                    alt="CodeCompass Logo"
                    fill
                    className="w-12 h-12 object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>
              
              {/* Separator */}
              <div className="w-px h-8 bg-gray-700"></div>
              
              {/* Official School Logo */}
              <div className="group flex items-center space-x-3 transition-all duration-300">
                <div className="relative w-52 h-52">
                  <Image
                    src="/New Logo iSTAD-06.png"
                    alt="ISTAD Logo"
                    fill
                    className=" object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
              Where challenges meet growth. Empowering developers through interactive problem-solving.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
            
            {/* Navigation Links */}
        <div className="space-y-4">
  <h5 className="font-semibold text-base text-white mb-4 relative">
    <span className="relative z-10">Navigation</span>
    <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
  </h5>
  <div className="grid grid-cols-2 gap-1">
    {navigationLinks.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-gray-400 "
      >
        {link.name}
      </Link>
    ))}
  </div>
</div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h5 className="font-semibold text-base text-white mb-4 relative">
                <span className="relative z-10">Contact</span>
                <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              </h5>
              
              <div className="space-y-2">
                {[
                  { Icon: Mail, text: 'codecompass.istad.co@gmail.com', href: 'mailto:codecompass.istad.co@gmail.com' },
                  { Icon: Phone, text: '+855 123456789', href: 'tel:+855123456789' },
                  { Icon: MapPin, text: 'Proudly built at ISTAD,\nPhnom Penh, Cambodia', href: '#' }
                ].map(({ Icon, text, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="group relative flex items-start space-x-3 px-3 py-2 rounded-lg "
                  >
                    <div className="relative z-10 min-w-8 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 via-primary20 to-primary/5 flex items-center justify-center transition-all duration-500 border border-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="relative z-10 flex-1 min-w-0">
                      <span className="text-xs font-medium leading-relaxed  text-gray-400" style={{ whiteSpace: 'pre-line' }}>
                        {text}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social & Newsletter */}
            <div className="space-y-4">
              <h5 className="font-semibold text-base text-white mb-4 relative">
                <span className="relative z-10">Connect</span>
                <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              </h5>
              
              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {[
                  { Icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
                  { Icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
                  { Icon: Globe, href: '#', label: 'Website', color: '#CCF301' }
                ].map(({ Icon, href, label, color }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="group relative w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 relative z-10 transition-all duration-300 text-gray-400"
                          style={{ color: `var(--hover-color, #9CA3AF)` }}
                          onMouseEnter={(e) => (e.target as HTMLElement).style.setProperty('--hover-color', color)}
                          onMouseLeave={(e) => (e.target as HTMLElement).style.removeProperty('--hover-color')} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800/50 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
              
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
                <p className="text-gray-400 text-xs font-medium">
                  © {currentYear} CodeCompass — Where challenges meet growth.
                </p>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="animate-pulse">🚀</span>
                  <span className="text-gray-500 text-xs">
                    Built with passion in Cambodia
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase()}`}
                    className="group relative text-gray-400 transition-all duration-500 text-xs font-medium"
                  >
                    <span className="relative z-10 ">
                      {item}
                    </span>
                    <div className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary60 rounded-full"></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-16 left-8 w-1 h-1 bg-primary rounded-full animate-pulse opacity-30"></div>
    </footer>
  );
};

export default Footer;
