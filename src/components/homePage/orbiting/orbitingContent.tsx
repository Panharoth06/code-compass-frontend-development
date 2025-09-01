'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Code, Target, Zap, Globe } from 'lucide-react';

const OrbitingContent = ({ isDarkMode }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% of element is visible
      rootMargin: '-50px 0px' // Start animation 50px before element comes into view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          setVisibleItems(prev => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    // Observe title
    if (titleRef.current) {
      titleRef.current.dataset.index = 'title';
      observer.observe(titleRef.current);
    }

    // Observe cards
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = `card-${index}`;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (item) => visibleItems.has(item);

  return (
    <div className="order-2 lg:order-2 space-y-4">
      {/* Compact title */}
      <div 
        ref={titleRef}
        className={`transition-all duration-800 ${
          isVisible('title') ? 'animate-fade-in-right' : 'animate-on-scroll-right'
        }`}
      >
        <h3 className="text-sm font-medium leading-tight text-center" style={{ fontFamily: '"Source Code Pro", monospace' }}>
          Choose Your{' '}
          <span className="text-lime-400">Language</span>, Solve Problems{' '}
          <span className="text-lime-400">Your Way!</span>
        </h3>
      </div>
       
      {/* Content */}
      <div className="space-y-6">
        {/* Problem Sets */}
        <div 
          ref={el => cardRefs.current[0] = el}
          className={`group p-6 rounded-xl border transition-all duration-500 transform hover:translate-x-2 hover:scale-105 hover:shadow-lg ${
            isVisible('card-0') ? 'animate-fade-in-up' : 'animate-on-scroll'
          } ${
            isDarkMode 
              ? 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/30' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={{ 
            animationDelay: isVisible('card-0') ? '0.1s' : '0s',
            transitionDelay: isVisible('card-0') ? '0.1s' : '0s'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-lg bg-lime-400/10 group-hover:bg-lime-400/20 transition-all duration-300">
              <div className="text-lime-400 transform group-hover:scale-110 transition-transform duration-300">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-semibold mb-2 group-hover:text-lime-400 transition-colors duration-300">Problem Sets</h5>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                Sharpen your skills in Java, widely used in enterprise applications, Android development, and scalable systems.
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 text-lime-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Coding Challenges */}
        <div 
          ref={el => cardRefs.current[1] = el}
          className={`group p-6 rounded-xl border transition-all duration-500 transform hover:translate-x-2 hover:scale-105 hover:shadow-lg ${
            isVisible('card-1') ? 'animate-fade-in-up' : 'animate-on-scroll'
          } ${
            isDarkMode 
              ? 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/30' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={{ 
            animationDelay: isVisible('card-1') ? '0.2s' : '0s',
            transitionDelay: isVisible('card-1') ? '0.2s' : '0s'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-lg bg-lime-400/10 group-hover:bg-lime-400/20 transition-all duration-300">
              <div className="text-lime-400 transform group-hover:scale-110 transition-transform duration-300">
                <Code className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-semibold mb-2 group-hover:text-lime-400 transition-colors duration-300">Coding Challenges</h5>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                Solve coding problems in Python, the most beginner-friendly language with powerful libraries for data science, AI, and automation.
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 text-lime-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Algorithm Exercises */}
        <div 
          ref={el => cardRefs.current[2] = el}
          className={`group p-6 rounded-xl border transition-all duration-500 transform hover:translate-x-2 hover:scale-105 hover:shadow-lg ${
            isVisible('card-2') ? 'animate-fade-in-up' : 'animate-on-scroll'
          } ${
            isDarkMode 
              ? 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/30' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={{ 
            animationDelay: isVisible('card-2') ? '0.3s' : '0s',
            transitionDelay: isVisible('card-2') ? '0.3s' : '0s'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-lg bg-lime-400/10 group-hover:bg-lime-400/20 transition-all duration-300">
              <div className="text-lime-400 transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-semibold mb-2 group-hover:text-lime-400 transition-colors duration-300">Algorithm Exercises</h5>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                Master C, the foundation of programming that teaches you memory management, performance, and low-level concepts.
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 text-lime-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* JavaScript Tasks */}
        <div 
          ref={el => cardRefs.current[3] = el}
          className={`group p-6 rounded-xl border transition-all duration-500 transform hover:translate-x-2 hover:scale-105 hover:shadow-lg ${
            isVisible('card-3') ? 'animate-fade-in-up' : 'animate-on-scroll'
          } ${
            isDarkMode 
              ? 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/30' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          style={{ 
            animationDelay: isVisible('card-3') ? '0.4s' : '0s',
            transitionDelay: isVisible('card-3') ? '0.4s' : '0s'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 rounded-lg bg-lime-400/10 group-hover:bg-lime-400/20 transition-all duration-300">
              <div className="text-lime-400 transform group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-semibold mb-2 group-hover:text-lime-400 transition-colors duration-300">JavaScript Tasks</h5>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                Level up with JavaScript, the language of the web, powering interactive websites, front-end frameworks, and full-stack apps.
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 text-lime-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitingContent;