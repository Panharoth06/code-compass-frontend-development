'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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
    <div className="min-h-screen text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Features Of{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
              CodeCompass
            </span>
          </h1>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {/* Code Submission Feature */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="p-3 rounded-xl bg-muted border">
                  <Trophy className="w-6 h-6 text-lime-400" />
                </div> */}
                <h2 className="text-3xl lg:text-4xl font-bold">Code Submission</h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Lets you write in a powerful editor, supports many languages, and shows live judge status updates
              </p>
            </div>

            <div className="relative rounded-2xl  overflow-hidden border bg-muted/30 group hover:bg-muted/50 transition-colors shadow-xl">
              <Image
                src="/code submission.png"
                alt=" Code Submission"
                fill
                className="object-cover"
              />

            </div>
          </div>

          {/* Discussion Feature */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-xl overflow-hidden border bg-muted/30 group hover:bg-muted/50 transition-colors shadow-xl">
              <Image
                src="/leaderboard.png"
                alt="CodeCompass LeaderBoard"
                fill
                className="object-cover"
              />
            </div>


            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="p-3 rounded-xl bg-muted border">
                  <MessageSquare className="w-6 h-6 text-lime-400" />
                </div> */}
                <h2 className="text-2xl lg:text-4xl font-bold">Discussion</h2>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Let users dive into problem-specific threads to ask questions, share solutions, and learn from
                others—all in a focused, supportive space.
              </p>
            </div>
          </div>

          {/* Leaderboard Ranking Feature */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="p-3 rounded-xl bg-muted border">
                  <Trophy className="w-6 h-6 text-lime-400" />
                </div> */}
                <h2 className="text-2xl lg:text-4xl font-bold">
                  Leaderboard Ranking
                </h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A competitive ranking system where users with the highest stars appear at the top—motivating progress
                and engagement.
              </p>
            </div>

            <div className="relative rounded-2xl  overflow-hidden border bg-muted/30 group hover:bg-muted/50 transition-colors  shadow-xl">
              <Image
                src="/leaderboard.png"
                alt="CodeCompass LeaderBoard"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}