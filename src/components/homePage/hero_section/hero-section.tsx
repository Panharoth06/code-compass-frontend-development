"use client";

// components/hero-section.tsx
import { useState } from 'react';
import GridDotBackground from './GridDotBackground';
import CardSwap, { Card, heroContent, codeCards } from "@/components/homePage/hero_section/card";
import TypingAnimation from "@/components/homePage/animation/typing-animation";
import PathAnimation from '../animation/svg-path-drawing-text-animation';

export default function HeroSection() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <section className="relative min-h-[800px] lg:h-[800px] flex items-center overflow-hidden font-barlow bg-white dark:bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <GridDotBackground 
          gridSize={50}
          dotSize={2}
          showGrid={true}
          showDots={true}
          gridOpacity={0.15}
          dotOpacity={0.25}
          className="opacity-60"
        />
      </div>

      {/* Content Wrapper */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left side */}
        {/* Left side - Now just contains the PathAnimation with all content */}
        <div className="max-w-xl z-10">
          <PathAnimation 
            heroContent={heroContent}
            setShowDescription={setShowDescription}
            showDescription={showDescription}
          />
        </div>

        {/* Right side - Cards */}
        <div className="relative flex justify-center lg:justify-end w-full max-w-lg h-[400px] lg:h-[500px]">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            {codeCards.map((cardData) => (
              <Card 
                key={cardData.id}
                language={cardData.language}
                title={cardData.title}
                code={cardData.content}
              />
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}