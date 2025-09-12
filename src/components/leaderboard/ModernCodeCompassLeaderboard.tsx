'use client'

import React, { useState, useEffect } from 'react'
import ChampionCard from './ChampionCard'
import LeaderboardTable from './LeaderboardTable'
import SidebarProfile from './SidebarProfile'

export default function ModernCodeCompassLeaderboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Listen for theme changes from document class
  useEffect(() => {
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark')
      setIsDarkMode(hasDarkClass)
    }
    
    // Check initial theme
    checkTheme()
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const leaderboardData = [
    { 
      rank: 2, 
      name: "Algorithm Ace", 
      stars: 2847, 
      problems: 156, 
      country: "🇰🇭", 
      avatar: "AA",
      title: "Senior Software Engineer"

    },
    { 
      rank: 3, 
      name: "Code Conqueror", 
      stars: 2654, 
      problems: 142, 
      country: "🇰🇭", 
      avatar: "CC",
      title: "Full Stack Developer"
    },
    { 
      rank: 4, 
      name: "Byte Slayer", 
      stars: 2432, 
      problems: 128, 
      country: "🇰🇭", 
      avatar: "BS",
      title: "Backend Developer"
    },
    { 
      rank: 5, 
      name: "Syntax Samurai", 
      stars: 2298, 
      problems: 119, 
      country: "🇰🇭", 
      avatar: "SS",
      title: "Frontend Developer"
    },
    { 
      rank: 6, 
      name: "Bug Hunter", 
      stars: 2156, 
      problems: 108, 
      country: "🇰🇭", 
      avatar: "BH",
      title: "QA Engineer"
    },
    { 
      rank: 7, 
      name: "Pixel Pioneer", 
      stars: 2034, 
      problems: 98, 
      country: "🇰🇭", 
      avatar: "PP",
      title: "UI/UX Developer"
    },
    { 
      rank: 8, 
      name: "Debug Dragon", 
      stars: 1923, 
      problems: 89, 
      country: "🇰🇭", 
      avatar: "DD",
      title: "DevOps Engineer"
    },
    { 
      rank: 9, 
      name: "Stack Master", 
      stars: 1812, 
      problems: 82, 
      country: "🇰🇭", 
      avatar: "SM",
      title: "Software Architect"
    },
    { 
      rank: 10, 
      name: "Logic Lord", 
      stars: 1734, 
      problems: 76, 
      country: "🇰🇭", 
      avatar: "LL",
      title: "Data Scientist"
    },
  ]

  const topUser = {
    rank: 1,
    name: "Cheng Devith",
    title: "Full Stack Developer",
    stars: 3125,
    problems: 178,
    country: "🇰🇭",
    avatar: "CD",
    quote: "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time.",
    joinedDate: "2021",
    location: "Phnom Penh, Cambodia",

  }

  const programmingStats = {
    languages: [
      { name: "JavaScript", problems: 440, color: "text-yellow-500" },
      { name: "Python", problems: 324, color: "text-blue-500" },
      { name: "C", problems: 255, color: "text-gray-600" },
      { name: "Java", problems: 192, color: "text-red-500" }
    ]
  }

  return (
    <div className={`min-h-screen transition-all duration-500 font-['Inter',sans-serif] ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="flex flex-col xl:flex-row min-h-screen">
        
        {/* Left Sidebar */}
        <SidebarProfile
          isDarkMode={isDarkMode}
          userName="Cheng Devith"
          userTitle="Full Stack Developer"
          userAvatar="CD"
          programmingLanguages={programmingStats.languages}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-[#CCF301]">CodeCompass</span> LeaderBoard
            </h1>
           <p className={`text-base sm:text-lg lg:text-xl ${
  isDarkMode ? 'text-gray-400' : 'text-gray-600'
}`}>
  {"Code Until Life's Compass Points Your Way."}
</p>

          </div>

          {/* Champion Highlight */}
          <ChampionCard user={topUser} isDarkMode={isDarkMode} />

          {/* Leaderboard Table/Cards */}
          <LeaderboardTable users={leaderboardData} isDarkMode={isDarkMode} />

          {/* View More Button */}
          <div className="text-center">
            <button className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isDarkMode 
                ? 'border-[#CCF301] text-[#CCF301] hover:bg-[#CCF301] hover:text-black hover:shadow-[#CCF301]/30' 
                : 'border-[#CCF301] text-[#CCF301] hover:bg-[#CCF301] hover:text-black hover:shadow-[#CCF301]/40'
            } backdrop-blur-xl`}>
              View More Coders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}