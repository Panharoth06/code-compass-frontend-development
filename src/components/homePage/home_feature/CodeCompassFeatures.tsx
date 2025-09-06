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
                  ? 'bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-400 bg-clip-text text-transparent'
              }`}>
                CodeCompass
              </span>
              <div className={`absolute -inset-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-lime-400/10 via-lime-300/10 to-emerald-300/10 blur-xl'
                  : 'bg-gradient-to-r from-lime-500/10 via-lime-400/10 to-emerald-400/10 blur-xl'
              }`}></div>
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="space-y-32">
          {/* Code Submission Feature */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`space-y-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                    : 'bg-white/70 border-gray-200 backdrop-blur-sm'
                }`}>
                  <Trophy className="w-7 h-7 text-lime-400" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Code Submission</h3>
              </div>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Lets you write in a powerful editor, supports many languages, and shows live judge status updates
              </p>
            </div>
            
            {/* Image Placeholder for Code Submission */}
            <div className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:border-lime-400/50 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800 backdrop-blur-sm' 
                : 'bg-gray-50/80 border-gray-200 backdrop-blur-sm'
            } h-80 flex items-center justify-center group`}>
              <div className={`text-center transition-all duration-300 ${
                isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
              }`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lime-400/20 flex items-center justify-center transition-all duration-300 group-hover:bg-lime-400/30 group-hover:scale-110">
                  <Trophy className="w-8 h-8 text-lime-400" />
                </div>
                <p className="text-lg font-medium">Code Submission Screenshot</p>
                <p className="text-sm mt-2 opacity-70">Replace with your image</p>
              </div>
              <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-lime-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100'
                  : 'bg-gradient-to-br from-lime-400/3 via-transparent to-emerald-400/3 opacity-0 group-hover:opacity-100'
              }`}></div>
            </div>
          </div>

          {/* Discussion Feature */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image Placeholder for Discussion */}
            <div className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:border-lime-400/50 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800 backdrop-blur-sm' 
                : 'bg-gray-50/80 border-gray-200 backdrop-blur-sm'
            } h-80 flex items-center justify-center group order-2 lg:order-1`}>
              <div className={`text-center transition-all duration-300 ${
                isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
              }`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lime-400/20 flex items-center justify-center transition-all duration-300 group-hover:bg-lime-400/30 group-hover:scale-110">
                  <MessageSquare className="w-8 h-8 text-lime-400" />
                </div>
                <p className="text-lg font-medium">Discussion Screenshot</p>
                <p className="text-sm mt-2 opacity-70">Replace with your image</p>
              </div>
              <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-lime-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100'
                  : 'bg-gradient-to-br from-lime-400/3 via-transparent to-emerald-400/3 opacity-0 group-hover:opacity-100'
              }`}></div>
            </div>

            <div className={`space-y-8 order-1 lg:order-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                    : 'bg-white/70 border-gray-200 backdrop-blur-sm'
                }`}>
                  <MessageSquare className="w-7 h-7 text-lime-400" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Discussion</h3>
              </div>
              
              {/* Crazy Idea Box */}
              <div className="bg-gradient-to-r from-lime-400 to-emerald-400 rounded-3xl p-6 text-black mb-8 transform transition-all duration-300 hover:scale-[1.02] border border-lime-300/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-black/10 rounded-lg">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-lg">Crazy Idea</span>
                </div>
                <p className="font-medium text-lg">What if we&apos;re all connected to one omega-consciousness?</p>
              </div>
              
              <div className={`rounded-3xl p-6 border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                  : 'bg-white/70 border-gray-200 backdrop-blur-sm'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-lime-400 animate-pulse"></div>
                  <span className="font-bold text-lg">Open Question</span>
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  What is the meaning of life?
                </p>
              </div>
              
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Let users dive into problem-specific threads to ask questions, share solutions, and learn from others—all in a focused, supportive space.
              </p>
            </div>
          </div>

          {/* Leaderboard Ranking Feature */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`space-y-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                    : 'bg-white/70 border-gray-200 backdrop-blur-sm'
                }`}>
                  <Trophy className="w-7 h-7 text-lime-400" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">
                  <span className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-300 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-400 bg-clip-text text-transparent'
                  }`}>
                    Leaderboard Ranking
                  </span>
                </h3>
              </div>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                A competitive ranking system where users with the highest stars appear at the top—motivating progress and engagement.
              </p>
            </div>
            
            {/* Image Placeholder for Leaderboard */}
            <div className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:border-lime-400/50 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800 backdrop-blur-sm' 
                : 'bg-gray-50/80 border-gray-200 backdrop-blur-sm'
            } h-80 flex items-center justify-center group`}>
              <div className={`text-center transition-all duration-300 ${
                isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
              }`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lime-400/20 flex items-center justify-center transition-all duration-300 group-hover:bg-lime-400/30 group-hover:scale-110">
                  <Trophy className="w-8 h-8 text-lime-400" />
                </div>
                <p className="text-lg font-medium">Leaderboard Screenshot</p>
                <p className="text-sm mt-2 opacity-70">Replace with your image</p>
              </div>
              <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-lime-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100'
                  : 'bg-gradient-to-br from-lime-400/3 via-transparent to-emerald-400/3 opacity-0 group-hover:opacity-100'
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}