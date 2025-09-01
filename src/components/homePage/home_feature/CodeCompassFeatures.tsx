'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, MessageSquare, Trophy } from 'lucide-react';

export default function CodeCompassFeatures() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if dark class exists on document
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Create a MutationObserver to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen transition-all duration-500 font-['Barlow',sans-serif]">

      <div className="container mx-auto px-6 py-20">
        {/* Main Title */}
        <div className="text-center mb-20">
          <h2 className={`text-5xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Features Of{' '}
            <span className="relative inline-block">
              <span className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-lime-300 via-lime-400 to-white bg-clip-text text-transparent animate-pulse'
                  : 'bg-gradient-to-r from-lime-300 via-lime-400 to-black bg-clip-text text-transparent animate-pulse'
              }`}>
                CodeCompass
              </span>
              <div className={`absolute inset-0 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-lime-300 via-lime-400 to-white opacity-20 blur-xl animate-pulse'
                  : 'bg-gradient-to-r from-lime-300 via-lime-400 to-black opacity-20 blur-xl animate-pulse'
              }`}></div>
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="space-y-32">
          {/* Code Submission Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
                }`}>
                  <Trophy className="w-8 h-8 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold">Code Submission</h3>
              </div>
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Lets you write in a powerful editor, supports many languages, and shows live judge status updates
              </p>
            </div>
            
            {/* Image Placeholder for Code Submission */}
            <div className={`relative rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
            } h-80 flex items-center justify-center group transition-all duration-300 hover:scale-105`}>
              <div className={`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-lime-400/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-lime-400" />
                </div>
                <p className="text-base font-medium">Code Submission Screenshot</p>
                <p className="text-sm mt-2">Replace with your image</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Discussion Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder for Discussion */}
            <div className={`relative rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
            } h-80 flex items-center justify-center group transition-all duration-300 hover:scale-105 order-2 lg:order-1`}>
              <div className={`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-lime-400/20 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-lime-400" />
                </div>
                <p className="text-base font-medium">Discussion Screenshot</p>
                <p className="text-sm mt-2">Replace with your image</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className={`space-y-6 order-1 lg:order-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
                }`}>
                  <MessageSquare className="w-8 h-8 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold">Discussion</h3>
              </div>
              
              {/* Crazy Idea Box */}
              <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-2xl p-6 text-black mb-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-6 h-6" />
                  <span className="font-bold text-base">Crazy Idea</span>
                </div>
                <p className="font-medium">What if we're all connected to one omega-consciousness?</p>
              </div>
              
              <div className={`${
                isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
              } rounded-2xl p-6`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-lime-400"></div>
                  <span className="font-bold">Open Question</span>
                </div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  What is the meaning of life?
                </p>
              </div>
              
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Let users dive into problem-specific threads to ask questions, share solutions, and learn from others—all in a focused, supportive space.
              </p>
            </div>
          </div>

          {/* Leaderboard Ranking Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
                }`}>
                  <Trophy className="w-8 h-8 text-lime-400" />
                </div>
                <h3 className="text-2xl font-bold">
                  <span className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-lime-300 via-lime-400 to-white bg-clip-text text-transparent animate-pulse'
                      : 'bg-gradient-to-r from-lime-300 via-lime-400 to-black bg-clip-text text-transparent animate-pulse'
                  }`}>
                    Leaderboard Ranking
                  </span>
                </h3>
              </div>
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A competitive ranking system where users with the highest stars appear at the top—motivating progress and engagement.
              </p>
            </div>
            
            {/* Image Placeholder for Leaderboard */}
            <div className={`relative rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
            } h-80 flex items-center justify-center group transition-all duration-300 hover:scale-105`}>
              <div className={`text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-lime-400/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-lime-400" />
                </div>
                <p className="text-base font-medium">Leaderboard Screenshot</p>
                <p className="text-sm mt-2">Replace with your image</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}