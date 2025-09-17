"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  User,
  LogIn,
  Home,
  Puzzle,
  Trophy,
  ChevronDown,
  Users,
  Mail,
  Shield,
  FileText,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { signIn } from "next-auth/react";
import AuthButtons from "./AuthComponents/AuthButton";

import codecompasslogo from "../../public/codecompass-2.png";

// Uiverse Toggle Component
const UiverseToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="uiverse-toggle">
      <div className="toggle-switch">
        <label className="switch-label">
          <input
            type="checkbox"
            className="checkbox"
            checked={isDark}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      <style jsx>{`
        .uiverse-toggle .toggle-switch {
          position: relative;
          width: 50px;
          height: 25px;
          --light: #d8dbe0;
          --dark: #28292c;
          --link: rgb(27, 129, 112);
          --link-hover: rgb(24, 94, 82);
        }

        .uiverse-toggle .switch-label {
          position: absolute;
          width: 100%;
          height: 25px;
          background-color: var(--dark);
          border-radius: 12.5px;
          cursor: pointer;
          border: 1.5px solid var(--dark);
          transition: all 0.3s ease;
        }

        .uiverse-toggle .switch-label:hover {
          transform: scale(1.05);
        }

        .uiverse-toggle .checkbox {
          position: absolute;
          display: none;
        }

        .uiverse-toggle .slider {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12.5px;
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }

        .uiverse-toggle .checkbox:checked ~ .slider {
          background-color: var(--light);
        }

        .uiverse-toggle .slider::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          width: 12.5px;
          height: 12.5px;
          border-radius: 50%;
          -webkit-box-shadow: inset 6px -2px 0px 0px var(--light);
          box-shadow: inset 6px -2px 0px 0px var(--light);
          background-color: var(--dark);
          -webkit-transition: 0.3s;
          transition: 0.3s;
        }

        .uiverse-toggle .checkbox:checked ~ .slider::before {
          -webkit-transform: translateX(25px);
          -ms-transform: translateX(25px);
          transform: translateX(25px);
          background-color: var(--dark);
          -webkit-box-shadow: none;
          box-shadow: none;
        }

        /* Focus styles for accessibility */
        .uiverse-toggle .checkbox:focus + .slider {
          box-shadow: 0 0 0 2px rgba(204, 243, 1, 0.5);
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          .uiverse-toggle .toggle-switch {
            --light: #f1f3f4;
            --dark: #1f2937;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .uiverse-toggle .toggle-switch {
            width: 45px;
            height: 22px;
          }
          
          .uiverse-toggle .switch-label {
            height: 22px;
            border-radius: 11px;
          }
          
          .uiverse-toggle .slider {
            border-radius: 11px;
          }
          
          .uiverse-toggle .slider::before {
            width: 11px;
            height: 11px;
            top: 4.5px;
            left: 4.5px;
            -webkit-box-shadow: inset 5px -1.5px 0px 0px var(--light);
            box-shadow: inset 5px -1.5px 0px 0px var(--light);
          }
          
          .uiverse-toggle .checkbox:checked ~ .slider::before {
            -webkit-transform: translateX(22px);
            -ms-transform: translateX(22px);
            transform: translateX(22px);
          }
        }
      `}</style>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Main navigation items
  const mainNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Problems", href: "/problemset", icon: Puzzle },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  // More dropdown items (added Document)
  const moreItems = [
    { name: "Document", href: "/document", icon: FileText },
    { name: "About Us", href: "/about", icon: Users },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
  ];

  return (
    <>
      {/* Fixed navbar with modern animations */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          animate={{
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.1)"
              : "",
            boxShadow: isScrolled
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            borderRadius: isScrolled ? "2rem" : "0rem",
            marginTop: isScrolled ? "20px" : "0px",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
          className={`relative mx-auto ${
            isScrolled ? "w-[90%] lg:w-[60%] lg:mx-auto" : "w-full"
          }`}
        >
          {/* Dark mode background */}
          <motion.div
            animate={{
              backgroundColor: isScrolled
                ? "rgba(17, 24, 39, 0.8)"
                : "",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
            }}
            className="absolute inset-0 dark:block hidden rounded-2xl"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Enhanced Logo with Animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="flex items-center space-x-3 group relative"
                >
                  <div className="relative">
                    {/* Logo with enhanced animations */}
                    <motion.div
                      className="relative w-12 h-12 flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Image
                        src={codecompasslogo}
                        alt="CodeCompass Logo"
                        width={55}
                        height={55}
                        className="w-12 h-12 object-contain"
                        priority
                      />

                      {/* Enhanced glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-[#CCF301]/20 rounded-xl blur-md -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* <div className="flex flex-col">
                    <motion.span
                      className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#CCF301] transition-colors duration-200"
                      whileHover={{ x: 2 }}
                    >
                      CodeCompass
                    </motion.span>
                  </div> */}
                </Link>
              </motion.div>

              {/* Desktop Navigation with Hover Effects */}
              <div className="hidden lg:flex items-center space-x-1 relative">
                {mainNavItems.map((item, id) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div key={item.name} className="relative">
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] rounded-xl transition-all duration-200 font-medium relative group z-10"
                        onMouseEnter={() => setHoveredItem(id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>

                      {/* Animated background for hovered item */}
                      {hoveredItem === id && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-[#CCF301]/10 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}

                {/* Enhanced More Dropdown */}
                <div className="relative">
                  <motion.button
                    onMouseEnter={() => setIsMoreOpen(true)}
                    onMouseLeave={() => setIsMoreOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>More</span>
                    <motion.div
                      animate={{ rotate: isMoreOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                    <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                  </motion.button>

                  {/* Enhanced Dropdown Menu with Framer Motion */}
                  <AnimatePresence>
                    {isMoreOpen && (
                      <motion.div
                        onMouseEnter={() => setIsMoreOpen(true)}
                        onMouseLeave={() => setIsMoreOpen(false)}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                      >
                        <div className="p-2">
                          {moreItems.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Link
                                  href={item.href}
                                  className="flex items-center space-x-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 transition-all duration-200 rounded-lg group relative"
                                >
                                  <IconComponent className="h-5 w-5" />
                                  <span className="text-sm font-medium">
                                    {item.name}
                                  </span>

                                  {/* Hover effect */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                                    transition={{ duration: 0.2 }}
                                  />
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Enhanced Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-3">
                <UiverseToggle />
                <AuthButtons/>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Mobile Menu with Better Animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30 shadow-xl"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Gradient overlay for mobile menu */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-gray-900/5"></div>

                <div className="relative px-4 py-6 space-y-1">
                  {/* Mobile Main Navigation with stagger animation */}
                  {mainNavItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium group relative"
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{item.name}</span>
                          <motion.div
                            className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.2 }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile More Items with enhanced animation */}
                  <motion.div
                    className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="mb-3">
                      <span className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        More
                      </span>
                    </div>
                    {moreItems.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.6 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{item.name}</span>
                            <motion.div
                              className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.2 }}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Enhanced Mobile Actions */}
                  <motion.div
                    className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4 mt-4 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Theme
                      </span>
                      <UiverseToggle />
                    </div>

                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-[#CCF301] hover:bg-[#CCF301]/10 rounded-xl transition-all duration-200 font-medium relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogIn className="h-5 w-5" />
                      <span onClick={() => signIn("keycloak")}>Login</span>
                      <motion.div
                        className="absolute inset-0 bg-[#CCF301]/5 rounded-xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>

                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-[#CCF301] to-[#CCF301]/80 text-gray-900 hover:from-[#CCF301]/90 hover:to-[#CCF301]/70 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#CCF301]/25 relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="h-5 w-5" />
                      <Link href={"/signup"}>
                        <span>Sign Up</span>
                      </Link>

                      {/* Animated background shimmer for mobile */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer div to prevent content from being hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;