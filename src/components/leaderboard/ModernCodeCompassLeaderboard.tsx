"use client"

import { useState, useEffect } from "react"
import { Trophy, Code, Flame, Crown, Medal, Award, Star, Zap } from "lucide-react"

export default function ModernCodeCompassLeaderboard() {
  const [isDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode)
  //   document.documentElement.classList.toggle('dark')
  // }

  const leaderboardData = [
    { rank: 2, name: "Master Of BlockChain", stars: 2847, problems: 156, country: "🇰🇭", image: "/image/mentor-2.jpg" },
    { rank: 3, name: "Mother 100 Hand", stars: 2654, problems: 142, country: "🇰🇭", image: "/image/kukuk.jpg" },
    { rank: 4, name: "Byte Slayer", stars: 2432, problems: 128, country: "🇰🇭", image: "/image/devithkoko.jpg" },
    { rank: 5, name: "Syntax Samurai", stars: 2298, problems: 119, country: "🇰🇭", image: "/image/bun.jpg" },
    { rank: 6, name: "Bug Hunter", stars: 2156, problems: 108, country: "🇰🇭", image: "/image/cat.jpg" },
    { rank: 7, name: "Pixel Pioneer", stars: 2034, problems: 98, country: "🇰🇭", image: "/image/funn.jpg" },
    { rank: 8, name: "Debug Dragon", stars: 1923, problems: 89, country: "🇰🇭", image: "/image/jay.jpg" },
    { rank: 9, name: "Stack Master", stars: 1812, problems: 82, country: "🇰🇭", image: "/image/waguri.jpg" },
    { rank: 10, name: "Logic Lord", stars: 1734, problems: 76, country: "🇰🇭", image: "/image/bleh.jpg" },
  ]

  const topUser = {
    rank: 1,
    name: "Cheng Devith",
    title: "Full Stack Developer",
    stars: 3125,
    problems: 178,
    country: "🇰🇭",
    image: "/image/devit.jpg", 
    quote:
      "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time.",
  }

  const programmingStats = {
    languages: [
      { name: "JavaScript", problems: 440, color: "text-yellow-500" },
      { name: "Python", problems: 324, color: "text-blue-500" },
      { name: "C", problems: 255, color: "text-gray-600" },
      { name: "Java", problems: 192, color: "text-red-500" },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <Trophy className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 font-['Barlow',sans-serif] ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-slate-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div className="flex flex-col xl:flex-row min-h-screen">
        {/* Left Sidebar */}
        <div
          className={`w-full xl:w-80 p-4 xl:p-6 border-b xl:border-b-0 xl:border-r transition-all duration-300 ${
            isDarkMode
              ? "border-white/10 bg-gradient-to-b from-slate-900/50 to-black/50"
              : "border-black/10 bg-gradient-to-b from-white/80 to-gray-50/80"
          } backdrop-blur-xl`}
        >
          {/* Profile Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
       <div
  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-3  ${
    isDarkMode
      ? "border-primary/40 shadow-xl shadow-primary/20"
      : "border-primary/60 shadow-xl shadow-primary/30"
  }`}
>
  <img
    src={topUser.image}
    alt={topUser.name}
    className="w-full h-full object-cover"
  />
</div>

              <div>
                <h2
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Cheng Devith
                </h2>
                <p
                  className={`text-xs transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-2 mb-6">
              <div
                className={`flex items-center gap-2 p-3 rounded-xl border  ${
                  isDarkMode
                    ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400"
                    : "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-700"
                }`}
              >
                <Trophy className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-xs">Top 10 Coders</span>
              </div>

              <div
                className={`flex items-center gap-2 p-3 rounded-xl border ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400"
                    : "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-700"
                }`}
              >
                <Star className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-xs">Top 50 Holders</span>
              </div>

              <div
                className={`flex items-center gap-2 p-3 rounded-xl border  ${
                  isDarkMode
                    ? "bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20 text-red-400"
                    : "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 text-red-700"
                }`}
              >
                <Flame className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-xs">Top 100 Active</span>
              </div>
            </div>
          </div>

          {/* Programming Languages */}
          <div className="mb-6">
            <h3
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <Code className="w-4 h-4 text-primary" />
              Programming Languages
            </h3>
            <div className="space-y-3">
              {programmingStats.languages.map((lang) => (
                <div
                  key={lang.name}
                  className={`flex justify-between items-center p-3 rounded-lg border ${
                    isDarkMode ? "bg-slate-800/80 border-slate-700/50" : "bg-gray-100/80 border-gray-300/50"
                  }`}
                >
                  <span className={`font-medium text-sm ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
                    {lang.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-bold text-sm ${
                        lang.name === "JavaScript"
                          ? isDarkMode
                            ? "text-yellow-300"
                            : "text-yellow-600"
                          : lang.name === "Python"
                            ? (isDarkMode ? "text-blue-300" : "text-blue-600")
                            : lang.name === "C"
                              ? isDarkMode
                                ? "text-gray-200"
                                : "text-gray-600"
                              : isDarkMode
                                ? "text-red-300"
                                : "text-red-600"
                      }`}
                    >
                      {lang.problems}
                    </span>
                    <span className={`text-xs ${isDarkMode ? "text-gray-200" : "text-gray-600"}`}>problems</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 xl:p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl xl:text-4xl font-black mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              <span className="text-primary">CodeCompass</span> LeaderBoard
            </h1>
            <p className={`text-base xl:text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Compete, Code, Conquer
            </p>
          </div>

          {/* Champion Highlight */}
          <div className="mb-6">
            <div
              className={`relative p-6 rounded-2xl border-2 cursor-pointer group overflow-hidden ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/50 to-slate-900/30 border-primary/30 hover:border-primary/50"
                  : "bg-gradient-to-br from-white/80 to-gray-50/80 border-primary/40 hover:border-primary/60"
              } backdrop-blur-xl`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 "></div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-2xl "></div>

              <div className="relative flex flex-col lg:flex-row items-center gap-4">
                <div className="relative">
                <div
  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-3  ${
    isDarkMode
      ? "border-primary/40 shadow-xl shadow-primary/20"
      : "border-primary/60 shadow-xl shadow-primary/30"
  }`}
>
  <img
    src={topUser.image}
    alt={topUser.name}
    className="w-full h-full object-cover"
  />
</div>

                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold text-xs flex items-center gap-1 px-2 py-1 rounded-lg">
                    <Crown className="w-3 h-3" />
                    #1
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <h2 className="text-xl lg:text-2xl font-black text-primary">Champion</h2>
                    <Zap className="w-5 h-5 text-yellow-500" />
                  </div>
                  <h3 className={`text-base lg:text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {topUser.name} • {topUser.title}
                  </h3>
                  <p
                    className={`text-xs lg:text-sm italic leading-relaxed max-w-2xl ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    "{topUser.quote}"
                  </p>

                  {/* Champion Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                    <div
                      className={`px-2 py-1 rounded-lg border ${
                        isDarkMode
                          ? "bg-slate-800/90 border-slate-600/50 text-white"
                          : "bg-gray-800/90 border-gray-600/50 text-white"
                      }`}
                    >
                      <span className="font-bold text-primary text-xs">{topUser.stars.toLocaleString()}</span>
                      <span className="ml-1 text-xs text-gray-200">stars</span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg border ${
                        isDarkMode
                          ? "bg-slate-800/90 border-slate-600/50 text-white"
                          : "bg-gray-800/90 border-gray-600/50 text-white"
                      }`}
                    >
                      <span className="font-bold text-primary text-xs">{topUser.problems}</span>
                      <span className="ml-1 text-xs text-gray-200">solved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block mb-6">
            <div
              className={`rounded-xl border overflow-hidden backdrop-blur-xl ${
                isDarkMode ? "bg-slate-900/30 border-white/10" : "bg-white/60 border-black/10"
              }`}
            >
              <div className={`overflow-x-auto ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <table className="w-full">
                  <thead>
                    <tr
                      className={`border-b ${isDarkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                    >
                      <th className="text-left p-3 font-bold text-primary text-xs">Rank</th>
                      <th className="text-left p-3 font-bold text-primary text-xs">Coder</th>
                      <th className="text-right p-3 font-bold text-primary text-xs">Stars</th>
                      <th className="text-right p-3 font-bold text-primary text-xs">Problems Solved</th>
                      <th className="text-center p-3 font-bold text-primary text-xs">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user) => (
                      <tr
                        key={user.rank}
                        className={`border-b transition-all duration-300 cursor-pointer group ${
                          isDarkMode ? "border-white/5 hover:bg-white/5" : "border-black/5 hover:bg-black/5"
                        }`}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getRankIcon(user.rank)}
                            <span className="text-base font-bold text-primary">
                              #{user.rank.toString().padStart(2, "0")}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br from-primary/80 to-primary/60 flex items-center justify-center text-white font-bold text-xs`}
                            >
                                 <img
                                     src={user.image}
                                      alt={user.name}
                                      className="w-full h-full object-cover rounded-full"
                                     />

                            </div>
                            <span className="font-semibold text-xs group-hover:text-primary transition-colors duration-300">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className="text-base font-bold text-primary">{user.stars.toLocaleString()}</span>
                        </td>
                        <td className="p-3 text-right">
                          <span className={`font-semibold text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {user.problems}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="w-6 h-6 mx-auto bg-gradient-to-br from-blue-600 to-red-600 rounded-xl flex items-center justify-center text-sm">
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
          <div className="lg:hidden space-y-3 mb-6">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${
                  isDarkMode
                    ? "bg-slate-900/30 border-white/10 hover:bg-slate-800/50"
                    : "bg-white/60 border-black/10 hover:bg-white/80"
                } backdrop-blur-xl`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.rank)}
                      <span className="text-xl font-bold text-primary">#{user.rank.toString().padStart(2, "0")}</span>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary/60 flex items-center justify-center text-white font-bold text-xs transition-transform duration-300 group-hover:scale-110`}
                    >
                      {user.avatar}
                    </div>
                    <div>
                      <span
                        className={`font-semibold text-sm group-hover:text-primary transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {user.name}
                      </span>
                    </div>
                  </div>
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110">
                    {user.country}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{user.stars.toLocaleString()}</div>
                    <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Stars</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {user.problems}
                    </div>
                    <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Problems</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <button
              className={`px-3 py-2.5 rounded-lg border font-bold text-xs transition-all duration-300 hover:shadow-md ${
                isDarkMode
                  ? "border-primary text-primary hover:bg-primary hover:text-black hover:shadow-primary/30"
                  : "border-primary text-primary hover:bg-primary hover:text-black hover:shadow-primary/40"
              } backdrop-blur-xl`}
            >
              View More Coders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}