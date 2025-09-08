'use client'

import { useState, useEffect } from "react"
import { Trophy, Code, Flame, Crown, Medal, Award, Star, Zap } from "lucide-react"

export default function ModernCodeCompassLeaderboard() {
  const [isDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode)
  //   document.documentElement.classList.toggle('dark')
  // }

  const leaderboardData = [
    { rank: 2, name: "Algorithm Ace", stars: 2847, problems: 156, country: "🇰🇭", avatar: "AA" },
    { rank: 3, name: "Code Conqueror", stars: 2654, problems: 142, country: "🇰🇭", avatar: "CC" },
    { rank: 4, name: "Byte Slayer", stars: 2432, problems: 128, country: "🇰🇭", avatar: "BS" },
    { rank: 5, name: "Syntax Samurai", stars: 2298, problems: 119, country: "🇰🇭", avatar: "SS" },
    { rank: 6, name: "Bug Hunter", stars: 2156, problems: 108, country: "🇰🇭", avatar: "BH" },
    { rank: 7, name: "Pixel Pioneer", stars: 2034, problems: 98, country: "🇰🇭", avatar: "PP" },
    { rank: 8, name: "Debug Dragon", stars: 1923, problems: 89, country: "🇰🇭", avatar: "DD" },
    { rank: 9, name: "Stack Master", stars: 1812, problems: 82, country: "🇰🇭", avatar: "SM" },
    { rank: 10, name: "Logic Lord", stars: 1734, problems: 76, country: "🇰🇭", avatar: "LL" },
  ]

  const topUser = {
    rank: 1,
    name: "Cheng Devith",
    title: "Full Stack Developer",
    stars: 3125,
    problems: 178,
    country: "🇰🇭",
    avatar: "CD",
    quote: "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time."
  }

  const programmingStats = {
    languages: [
      { name: "JavaScript", problems: 440, color: "text-yellow-500" },
      { name: "Python", problems: 324, color: "text-blue-500" },
      { name: "C", problems: 255, color: "text-gray-600" },
      { name: "Java", problems: 192, color: "text-red-500" }
    ]
  }

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />
      case 2: return <Medal className="w-5 h-5 text-gray-400" />
      case 3: return <Award className="w-5 h-5 text-amber-600" />
      default: return <Trophy className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 font-['Barlow',sans-serif] ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      


      <div className="flex flex-col xl:flex-row min-h-screen">
        
        {/* Left Sidebar */}
        <div className={`w-full xl:w-96 p-6 xl:p-8 border-b xl:border-b-0 xl:border-r transition-all duration-300 ${
          isDarkMode 
            ? 'border-white/10 bg-gradient-to-b from-slate-900/50 to-black/50' 
            : 'border-black/10 bg-gradient-to-b from-white/80 to-gray-50/80'
        } backdrop-blur-xl`}>
          
          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center gap-5 mb-6">
              <div className={`relative w-20 h-20 rounded-3xl overflow-hidden border-3 transition-all duration-300 ${
                isDarkMode 
                  ? 'border-[#CCF301]/30 shadow-lg shadow-[#CCF301]/10' 
                  : 'border-[#CCF301]/50 shadow-lg shadow-[#CCF301]/20'
              }`}>
                <div className="w-full h-full bg-gradient-to-br from-[#CCF301] to-[#CCF301]/70 flex items-center justify-center text-black font-bold text-2xl">
                  CD
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div>
                <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Cheng Devith
                </h2>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 mb-8">
              <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400' 
                  : 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-700'
              }`}>
                <Trophy className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">Top 10 Coders</span>
              </div>
              
              <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400' 
                  : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-700'
              }`}>
                <Star className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">Top 50 Holders</span>
              </div>
              
              <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20 text-red-400' 
                  : 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 text-red-700'
              }`}>
                <Flame className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">Top 100 Active</span>
              </div>
            </div>
          </div>

          {/* Programming Languages */}
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Code className="w-5 h-5 text-[#CCF301]" />
              Programming Languages
            </h3>
            <div className="space-y-4">
              {programmingStats.languages.map((lang) => (
                <div key={lang.name} className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {lang.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${lang.color}`}>{lang.problems}</span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      problems
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section - Desktop Only */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 xl:p-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className={`text-4xl xl:text-6xl font-black mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-[#CCF301]">CodeCompass</span> LeaderBoard
            </h1>
            <p className={`text-lg xl:text-xl ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Compete, Code, Conquer
            </p>
          </div>

          {/* Champion Highlight */}
          <div className="mb-10">
            <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] cursor-pointer group overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/30 border-[#CCF301]/30 hover:border-[#CCF301]/50' 
                : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-[#CCF301]/40 hover:border-[#CCF301]/60'
            } backdrop-blur-xl`}>
              
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/5 via-transparent to-[#CCF301]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCF301]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="relative">
                  <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-3xl overflow-hidden border-4 transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode 
                      ? 'border-[#CCF301]/40 shadow-2xl shadow-[#CCF301]/20' 
                      : 'border-[#CCF301]/60 shadow-2xl shadow-[#CCF301]/30'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 flex items-center justify-center text-black font-black text-3xl lg:text-4xl">
                      CD
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-2 rounded-xl font-bold text-sm flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    #1
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#CCF301]">
                      Champion
                    </h2>
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                  <h3 className={`text-xl lg:text-2xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {topUser.name} • {topUser.title}
                  </h3>
                  <p className={`text-base lg:text-lg italic leading-relaxed max-w-2xl ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    &quot;{topUser.quote}&quot;
                  </p>
                  
                  {/* Champion Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                    <div className={`px-4 py-2 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-black/10 border-black/20 text-black'
                    }`}>
                      <span className="font-bold text-[#CCF301]">{topUser.stars.toLocaleString()}</span>
                      <span className="ml-1 text-sm">stars</span>
                    </div>
                    <div className={`px-4 py-2 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-black/10 border-black/20 text-black'
                    }`}>
                      <span className="font-bold text-[#CCF301]">{topUser.problems}</span>
                      <span className="ml-1 text-sm">solved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block mb-8">
            <div className={`rounded-2xl border overflow-hidden backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-slate-900/30 border-white/10' 
                : 'bg-white/60 border-black/10'
            }`}>
              <div className={`overflow-x-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      isDarkMode 
                        ? 'border-white/10 bg-white/5' 
                        : 'border-black/10 bg-black/5'
                    }`}>
                      <th className="text-left p-6 font-bold text-[#CCF301]">Rank</th>
                      <th className="text-left p-6 font-bold text-[#CCF301]">Coder</th>
                      <th className="text-right p-6 font-bold text-[#CCF301]">Stars</th>
                      <th className="text-right p-6 font-bold text-[#CCF301]">Problems Solveds</th>
                      <th className="text-center p-6 font-bold text-[#CCF301]">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user) => (
                      <tr 
                        key={user.rank} 
                        className={`border-b transition-all duration-300 hover:scale-[1.01] cursor-pointer group ${
                          isDarkMode 
                            ? 'border-white/5 hover:bg-white/5' 
                            : 'border-black/5 hover:bg-black/5'
                        }`}
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            {getRankIcon(user.rank)}
                            <span className="text-xl font-bold text-[#CCF301]">
                              #{user.rank.toString().padStart(2, '0')}
                            </span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CCF301]/80 to-[#CCF301]/60 flex items-center justify-center text-black font-bold text-sm transition-transform duration-300 group-hover:scale-110`}>
                              {user.avatar}
                            </div>
                            <span className="font-semibold group-hover:text-[#CCF301] transition-colors duration-300">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <span className="text-xl font-bold text-[#CCF301]">
                            {user.stars.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <span className={`font-semibold ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {user.problems}
                          </span>
                        </td>
                        <td className="p-6 text-center">
                          <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110">
                            {user.country}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 mb-8">
            {leaderboardData.map((user) => (
              <div 
                key={user.rank} 
                className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${
                  isDarkMode 
                    ? 'bg-slate-900/30 border-white/10 hover:bg-slate-800/50' 
                    : 'bg-white/60 border-black/10 hover:bg-white/80'
                } backdrop-blur-xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.rank)}
                      <span className="text-2xl font-bold text-[#CCF301]">
                        #{user.rank.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CCF301]/80 to-[#CCF301]/60 flex items-center justify-center text-black font-bold text-sm transition-transform duration-300 group-hover:scale-110`}>
                      {user.avatar}
                    </div>
                    <div>
                      <span className={`font-semibold group-hover:text-[#CCF301] transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110">
                    {user.country}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#CCF301]">
                      {user.stars.toLocaleString()}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Stars
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.problems}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Problems
                    </div>
                  </div>
                  <div className="text-center flex justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110">
                      {user.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <button className={`px-8 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
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