import React, { useEffect, useRef, useState } from 'react';
import { Code, Lightbulb, Trophy, BarChart3, Target, Globe } from 'lucide-react';

const WhyChooseSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#CCF301]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#CCF301]/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#CCF301]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-[#CCF301]/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: '"Source Code Pro", monospace' }}>
            <span className="bg-gradient-to-r from-primary via-[#000000] to-primary dark:from-primary dark:via-white dark:to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
              Why Choose
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-[#000000] to-primary dark:from-primary dark:via-white dark:to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
              CodeCompass?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Barlow, sans-serif' }}>
            CodeCompass helps you strengthen your coding skills with clear, step-by-step problem-solving guidance.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div 
            className={`group relative bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCF301]/10 hover:-translate-y-1 ${isVisible ? 'animate-smooth-zoom-in' : 'opacity-0 scale-90 translate-y-8'}`} 
            style={{ animationDelay: '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl group-hover:shadow-[#CCF301]/25">
                  <Code className="w-8 h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 border-2 border-[#CCF301]/20 rounded-2xl group-hover:border-[#CCF301]/40 transition-all duration-700 group-hover:scale-110"></div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                Powerful Editor
              </h4>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Code in our modern code editor, real-time syntax highlighting.
              </p>

              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#CCF301]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCF301]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Feature 2 */}
          <div 
            className={`group relative bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCF301]/10 hover:-translate-y-1 ${isVisible ? 'animate-smooth-zoom-in' : 'opacity-0 scale-90 translate-y-8'}`} 
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl group-hover:shadow-[#CCF301]/25">
                  <Lightbulb className="w-8 h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 border-2 border-[#CCF301]/20 rounded-2xl group-hover:border-[#CCF301]/40 transition-all duration-700 group-hover:scale-110"></div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                Smart Hints
              </h4>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Step-by-step hints to guide users through solving problems.
              </p>

              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#CCF301]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCF301]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Feature 3 */}
          <div 
            className={`group relative bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCF301]/10 hover:-translate-y-1 ${isVisible ? 'animate-smooth-zoom-in' : 'opacity-0 scale-90 translate-y-8'}`} 
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl group-hover:shadow-[#CCF301]/25">
                  <Trophy className="w-8 h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 border-2 border-[#CCF301]/20 rounded-2xl group-hover:border-[#CCF301]/40 transition-all duration-700 group-hover:scale-110"></div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                Competitive
              </h4>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Compete in weekly contests, climb leaderboards.
              </p>

              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#CCF301]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCF301]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Feature 4 */}
          <div 
            className={`group relative bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCF301]/10 hover:-translate-y-1 ${isVisible ? 'animate-smooth-zoom-in' : 'opacity-0 scale-90 translate-y-8'}`} 
            style={{ animationDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25">
                  <BarChart3 className="w-8 h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl group-hover:border-[#CCF301]/40 transition-all duration-700 group-hover:scale-110"></div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                Progress Analytics
              </h4>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Tailored to meet individual needs perfectly balanced.
              </p>

              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#CCF301]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCF301]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Feature 5 */}
          <div 
            className={`group relative bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCF301]/10 hover:-translate-y-1 ${isVisible ? 'animate-smooth-zoom-in' : 'opacity-0 scale-90 translate-y-8'}`} 
            style={{ animationDelay: '400ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl group-hover:shadow-[#CCF301]/25">
                  <Target className="w-8 h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 border-2 border-[#CCF301]/20 rounded-2xl group-hover:border-[#CCF301]/40 transition-all duration-700 group-hover:scale-110"></div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                Interview Prep
              </h4>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Prepare for technical interviews with curated problem sets from FAANG companies and realistic mock interview sessions.
              </p>

              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#CCF301]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCF301]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Feature 6 */}
          <div 
            className={`group relative bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCF301]/10 hover:-translate-y-1 ${isVisible ? 'animate-smooth-zoom-in' : 'opacity-0 scale-90 translate-y-8'}`} 
            style={{ animationDelay: '500ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/0 via-[#CCF301]/5 to-[#CCF301]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out shadow-lg group-hover:shadow-xl group-hover:shadow-[#CCF301]/25">
                  <Globe className="w-8 h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 border-2 border-[#CCF301]/20 rounded-2xl group-hover:border-primary/40 transition-all duration-700 group-hover:scale-110"></div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-500" style={{ fontFamily: '"Source Code Pro", monospace' }}>
                Global Community
              </h4>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
                Connect with millions of developers, share solutions, discuss algorithms, and learn from the global coding community.
              </p>

              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#CCF301]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 group-hover:border-[#CCF301]/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCF301]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes smooth-zoom-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(32px);
          }
          60% {
            opacity: 0.8;
            transform: scale(1.02) translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-smooth-zoom-in {
          animation: smooth-zoom-in 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        /* Additional smooth transitions */
        .group {
          will-change: transform;
        }
        
        .group:hover {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;