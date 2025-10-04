// import React, { useState } from 'react';
// import { Trophy, Code, Flame, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// interface ProgrammingLanguage {
//   name: string;
//   problems: number;
//   color: string;
// }

// interface SidebarProfileProps {
//   isDarkMode: boolean;
//   userName: string;
//   userTitle: string;
//   userAvatar: string;
//   programmingLanguages: ProgrammingLanguage[];
// }

// const SidebarProfile: React.FC<SidebarProfileProps> = ({
//   isDarkMode,
//   userName,
//   userTitle,
//   userAvatar,
//   programmingLanguages
// }) => {
//   const [isDesktopVisible, setIsDesktopVisible] = useState(true);

//   const toggleDesktopSidebar = () => {
//     setIsDesktopVisible(!isDesktopVisible);
//   };

//   return (
//     <>
//       {/* Desktop Toggle Button - Fixed position when sidebar is hidden */}
//       {!isDesktopVisible && (
//         <button
//           onClick={toggleDesktopSidebar}
//           className={`hidden lg:block fixed top-6 left-6 z-50 p-3 rounded-full shadow-lg border transition-all duration-300 ${
//             isDarkMode 
//               ? 'bg-slate-900/95 border-white/20 text-white hover:bg-slate-800/95 shadow-black/20' 
//               : 'bg-white/95 border-black/20 text-gray-900 hover:bg-gray-50/95 shadow-black/10'
//           } backdrop-blur-sm`}
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       )}

//       {/* Sidebar Container - Desktop Only (completely hidden on mobile) */}
//       {isDesktopVisible && (
//         <div className={`
//           hidden lg:block
//           h-auto
//           w-80 lg:w-80 xl:w-96
//           border-r overflow-hidden
//           ${isDarkMode 
//             ? 'border-white/10 bg-gradient-to-b from-slate-900/98 to-black/98' 
//             : 'border-black/10 bg-gradient-to-b from-white/98 to-gray-50/98'
//           } backdrop-blur-xl
//         `}>
          
//           {/* Desktop Close Button - Only visible when sidebar is open */}
//           <button
//             onClick={toggleDesktopSidebar}
//             className={`absolute top-4 right-4 z-10 p-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
//               isDarkMode 
//                 ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
//                 : 'bg-black/5 border-black/10 text-gray-900 hover:bg-black/10'
//             }`}
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>

//           <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
//             {/* Profile Section */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-6">
//                 <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-3 transition-all duration-300 flex-shrink-0 ${
//                   isDarkMode 
//                     ? 'border-[#CCF301]/30 shadow-lg shadow-[#CCF301]/10' 
//                     : 'border-[#CCF301]/50 shadow-lg shadow-[#CCF301]/20'
//                 }`}>
//                   <div className="w-full h-full bg-gradient-to-br from-[#CCF301] to-[#CCF301]/70 flex items-center justify-center text-black font-bold text-xl sm:text-2xl">
//                     {userAvatar}
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                 </div>
                
//                 <div className="min-w-0 flex-1">
//                   <h2 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 truncate ${
//                     isDarkMode ? 'text-white' : 'text-gray-900'
//                   }`}>
//                     {userName}
//                   </h2>
//                   <p className={`text-sm transition-colors duration-300 ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {userTitle}
//                   </p>
//                 </div>
//               </div>

//               {/* Achievement Badges */}
//               <div className="grid grid-cols-1 gap-3 mb-6 sm:mb-8">
//                 <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 ${
//                   isDarkMode 
//                     ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 text-yellow-400' 
//                     : 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-700'
//                 }`}>
//                   <Trophy className="w-5 h-5 flex-shrink-0" />
//                   <span className="font-semibold text-sm">Top 10 Coders</span>
//                 </div>
                
//                 <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 ${
//                   isDarkMode 
//                     ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400' 
//                     : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-700'
//                 }`}>
//                   <Star className="w-5 h-5 flex-shrink-0" />
//                   <span className="font-semibold text-sm">Top 50 Holders</span>
//                 </div>
                
//                 <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 ${
//                   isDarkMode 
//                     ? 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20 text-red-400' 
//                     : 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 text-red-700'
//                 }`}>
//                   <Flame className="w-5 h-5 flex-shrink-0" />
//                   <span className="font-semibold text-sm">Top 100 Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Programming Languages */}
//             <div className="mb-6 sm:mb-8">
//               <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 <Code className="w-5 h-5 text-[#CCF301]" />
//                 Programming Languages
//               </h3>
              
//               <div className="space-y-3 sm:space-y-4">
//                 {programmingLanguages.map((lang) => (
//                   <div key={lang.name} className={`flex justify-between items-center p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-105 ${
//                     isDarkMode 
//                       ? 'bg-white/5 border-white/10 hover:bg-white/10' 
//                       : 'bg-black/5 border-black/10 hover:bg-black/10'
//                   }`}>
//                     <span className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                       {lang.name}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className={`font-bold text-sm sm:text-base ${lang.color}`}>{lang.problems}</span>
//                       <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                         problems
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SidebarProfile;


"use client"

import { useState, useEffect } from "react"
import { useGetLeaderboardQuery } from "@/lib/services/leaderboard/leaderboardApi"
import { useGetUserProfileQuery } from "@/lib/services/leaderboard/userProfileApi"
import ChampionCard from "./ChampionCard"
import SidebarProfile from "./SidebarProfile"

interface ProgrammingLanguage {
  name: string
  problems: number
  color: string
}

export default function ModernCodeCompassLeaderboard() {
  const [isDarkMode] = useState(true)
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true)
  
  // Use both APIs
  const { data: leaderboardResponse, isLoading: leaderboardLoading, error: leaderboardError } = useGetLeaderboardQuery()
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useGetUserProfileQuery()

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  // Transform leaderboard data
  const leaderboardData = leaderboardResponse?.top_subscribers?.map(subscriber => ({
    rank: subscriber.rank,
    name: subscriber.username,
    stars: subscriber.stars,
    problems: subscriber.total_problem_solved,
    country: subscriber.location || "🇰🇭",
    image: subscriber.profile_image || "/image/default-avatar.jpg",
    level: subscriber.level
  })) || []

  // Champion is the #1 ranked user from leaderboard
  const championUser = leaderboardData.length > 0 ? {
    rank: leaderboardData[0].rank,
    name: leaderboardData[0].name,
    title: getTitleFromLevel(leaderboardData[0].level),
    stars: leaderboardData[0].stars,
    problems: leaderboardData[0].problems,
    country: leaderboardData[0].country,
    image: leaderboardData[0].image,
    quote: "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time.",
    joinedDate: "2024",
    location: "Cambodia",
    streak: 7,
    lastActive: "today"
  } : {
    rank: 1,
    name: "Top Coder",
    title: "Code Master",
    stars: 3125,
    problems: 178,
    country: "🇰🇭",
    image: "/image/default-avatar.jpg",
    quote: "A great coder isn't born at the top — they climb there, one bug, one breakthrough, and one bold challenge at a time.",
    joinedDate: "2024",
    location: "Cambodia",
    streak: 7,
    lastActive: "today"
  }

  // Current user data from user profile API - THIS IS YOUR ACTUAL PROFILE
  const currentUser = userProfile ? {
    rank: userProfile.rank,
    name: userProfile.username,
    title: getTitleFromLevel(userProfile.level),
    stars: userProfile.star,
    problems: userProfile.totalProblemsSolved,
    country: userProfile.location || "🇰🇭",
    image: userProfile.imageUrl || "/image/default-avatar.jpg",
    level: userProfile.level,
    coin: userProfile.coin,
    email: userProfile.email
  } : {
    rank: 2,
    name: "xeinnkh",
    title: "Code Newborn",
    stars: 0,
    problems: 0,
    country: "🇰🇭",
    image: "/image/default-avatar.jpg",
    level: "CODE_NEWBORN",
    coin: 10000,
    email: "horratha4t5@gmail.com"
  }

  const programmingLanguages: ProgrammingLanguage[] = [
    { name: "JavaScript", problems: 440, color: "text-yellow-500" },
    { name: "Python", problems: 324, color: "text-blue-500" },
    { name: "C", problems: 255, color: "text-gray-600" },
    { name: "Java", problems: 192, color: "text-red-500" },
  ]

  // Helper function
  function getTitleFromLevel(level: string | null): string {
    if (!level) return "Code Enthusiast"
    
    const levelTitles: { [key: string]: string } = {
      "CODE_NEWBORN": "Code Newborn",
      "CODE_APPRENTICE": "Code Apprentice",
      "CODE_JOURNEYMAN": "Code Journeyman",
      "CODE_EXPERT": "Code Expert",
      "CODE_MASTER": "Code Master",
      "CODE_LEGEND": "Code Legend"
    }
    
    return levelTitles[level] || "Code Enthusiast"
  }

  const isLoading = leaderboardLoading || profileLoading
  const error = leaderboardError || profileError

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading leaderboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading data</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-500 font-['Barlow',sans-serif] ${
      isDarkMode
        ? "bg-gradient-to-br from-black via-slate-900 to-black"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="flex min-h-screen">
        {/* Sidebar - Shows YOUR actual profile from userProfile API */}
        <SidebarProfile
          isDarkMode={isDarkMode}
          userName={currentUser.name}
          userTitle={currentUser.title}
          userAvatar={currentUser.image}
          userRank={currentUser.rank}
          userStars={currentUser.stars}
          userProblems={currentUser.problems}
          userLevel={currentUser.level}
          userCoin={currentUser.coin}
          userEmail={currentUser.email}
          programmingLanguages={programmingLanguages}
          isDesktopVisible={isDesktopSidebarVisible}
          onToggleDesktop={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isDesktopSidebarVisible ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={`text-4xl xl:text-5xl font-black mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <span className="text-[#CCF301]">CodeCompass</span> LeaderBoard
              </h1>
              <p className={`text-base xl:text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Compete, Code, Conquer
              </p>
            </div>

            {/* Champion Card - Shows #1 ranked user from leaderboard */}
            <ChampionCard 
              user={championUser} 
              isDarkMode={isDarkMode} 
            />

            {/* Rest of your leaderboard table would go here using leaderboardData */}
          </div>
        </div>
      </div>
    </div>
  )
}