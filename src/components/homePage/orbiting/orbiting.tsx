"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { OrbitingCirclesProps } from "@/lib/types/orbitingCircles/OrbitingCirclesProps";


const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  children,
  iconSize = 40,
  radius = 150,
  reverse = false,
  speed = 1,
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + (reverse ? -speed : speed));
    }, 50);

    return () => clearInterval(interval);
  }, [reverse, speed]);

  const childrenArray = Array.isArray(children) ? children : [children];
  const angleStep = 360 / childrenArray.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {childrenArray.map((child, index) => {
        const angle = (rotation + index * angleStep) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={index}
            className="absolute transition-all duration-100 ease-linear"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center hover:scale-110 transition-all duration-300">
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LanguageIcons = {
  cpp: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" className="fill-blue-400">
      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0L21.74 18.69c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.109c-3.92 0-7.109-3.189-7.109-7.109S8.08 4.891 12 4.891a7.133 7.133 0 016.156 3.552l-3.076 1.781A3.567 3.567 0 0012 8.445c-1.96 0-3.554 1.595-3.554 3.555S10.04 15.555 12 15.555a3.57 3.57 0 003.08-1.778l3.077 1.78A7.135 7.135 0 0112 19.109zm7.109-6.714h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79z" />
    </svg>
  ),
  java: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" className="fill-orange-400">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
    </svg>
  ),
  python: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" className="fill-blue-300">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  javascript: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" className="fill-yellow-400">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  logo: () => (
    <div className="w-20 h-20  rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
      <Image 
      src={"public/assets/image/Logo2.svg"} 
      alt="Code compass logo"
      width={50}
      height={50} 
      />
    </div>
  ),
};

const OrbitingAnimation = ({ isDarkMode = false }) => {
  return (
    <div className="order-1 lg:order-1 animate-fade-in-left">
      <div className="relative flex justify-center items-center w-full overflow-hidden h-[600px] lg:h-[700px]">
        {/* Central Logo */}
        <div className="relative z-10 animate-zoom-in">
          <LanguageIcons.logo />
        </div>

        {/* Round 1 - Outermost */}
        {/* <OrbitingCircles 
          iconSize={70} 
          radius={280} 
          speed={0.5}
        >
          <LanguageIcons.cpp />
          <LanguageIcons.java />
        </OrbitingCircles> */}

        {/* Round 2 */}
        <OrbitingCircles iconSize={60} radius={220} reverse={true} speed={0.7}>
          <LanguageIcons.python />
          <LanguageIcons.javascript />
          <LanguageIcons.cpp />
          <LanguageIcons.java />
        </OrbitingCircles>

        {/* Round 3 */}
        <OrbitingCircles iconSize={50} radius={160} speed={0.9}>
          <LanguageIcons.cpp />
          <LanguageIcons.python />
          <LanguageIcons.java />
        </OrbitingCircles>

        {/* Round 4 - Innermost */}
        <OrbitingCircles iconSize={40} radius={100} reverse={true} speed={1.1}>
          <LanguageIcons.java />
          <LanguageIcons.javascript />
          <LanguageIcons.cpp />
        </OrbitingCircles>

        {/* Orbital Trails */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <div className={`rounded-full border ${
    isDarkMode ? 'border-slate-700/20' : 'border-gray-300/20'
  } opacity-30 w-[560px] h-[560px] animate-pulse-slow`}></div> */}
          <div
            className={`absolute rounded-full border opacity-30 w-[440px] h-[440px] animate-pulse-slow`}
            style={{
              animationDelay: "1s",
              borderColor: isDarkMode ? "#CCF301" : "#000000",
            }}
          ></div>
          <div
            className={`absolute rounded-full border opacity-30 w-[320px] h-[320px] animate-pulse-slow`}
            style={{
              animationDelay: "2s",
              borderColor: isDarkMode ? "#CCF301" : "#000000",
            }}
          ></div>
          <div
            className={`absolute rounded-full border opacity-30 w-[200px] h-[200px] animate-pulse-slow`}
            style={{
              animationDelay: "3s",
              borderColor: isDarkMode ? "#CCF301" : "#000000",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrbitingAnimation;
