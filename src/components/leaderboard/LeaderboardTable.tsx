import React from 'react';
import { Trophy, Medal, Award, Star, Calendar, Github, Linkedin } from 'lucide-react';

export interface LeaderboardUser {
  rank: number;
  name: string;
  stars: number;
  problems: number;
  country: string;
  avatar: string;
  title?: string;
  joinedDate?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  streak?: number;
  lastActive?: string;
  recentActivity?: string;
}

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  isDarkMode: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, isDarkMode }) => {
  const [hoveredUser, setHoveredUser] = React.useState<number | null>(null);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />;
      default: return <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />;
    }
  };

  const Crown = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16L3 8l5.5 5L12 4l3.5 9L21 8l-2 8H5z" />
    </svg>
  );

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block mb-6 lg:mb-8">
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
                  {['Rank', 'Coder', 'Stars', 'Problems', 'Country'].map((heading, i) => (
                    <th 
                      key={i}
                      className={`p-4 lg:p-6 font-bold text-sm lg:text-base ${
                        isDarkMode ? 'text-[#CCF301]' : 'text-black'
                      } ${i === 0 || i === 1 ? 'text-left' : i === 4 ? 'text-center' : 'text-right'}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.rank}
                    className={`border-b transition-all duration-300 hover:scale-[1.01] cursor-pointer group relative ${
                      isDarkMode 
                        ? 'border-white/5 hover:bg-white/5' 
                        : 'border-black/5 hover:bg-black/5'
                    }`}
                    onMouseEnter={() => setHoveredUser(user.rank)}
                    onMouseLeave={() => setHoveredUser(null)}
                  >
                    <td className="p-4 lg:p-6">
                      <div className="flex items-center gap-2 lg:gap-3">
                        {getRankIcon(user.rank)}
                        <span className={`text-lg lg:text-xl font-bold ${
                          isDarkMode ? 'text-[#CCF301]' : 'text-black'
                        }`}>
                          #{user.rank.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 lg:p-6">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-[#CCF301]/80 to-[#CCF301]/60 flex items-center justify-center text-black font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                          {user.avatar}
                        </div>
                        <div>
                          <div className={`font-semibold group-hover:text-[#CCF301] transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {user.name}
                          </div>
                          {user.title && (
                            <div className={`text-xs lg:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {user.title}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 lg:p-6 text-right">
                      <span className={`text-lg lg:text-xl font-bold ${
                        isDarkMode ? 'text-[#CCF301]' : 'text-black'
                      }`}>
                        {user.stars.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 lg:p-12 text-right">
                      <span className={`font-semibold text-sm lg:text-base ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {user.problems}
                      </span>
                    </td>
                    <td className="p-4 lg:p-6 text-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 mx-auto bg-gradient-to-br from-blue-600 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-lg lg:text-xl transition-transform duration-300 group-hover:scale-110">
                        {user.country}
                      </div>
                    </td>

                    {/* Hover Details Popup */}
                    {hoveredUser === user.rank && (
                      <td className="absolute left-full top-0 z-50 ml-4">
                        <div className={`w-80 p-4 rounded-xl border shadow-2xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-900/95 border-white/20 text-white' 
                            : 'bg-white/95 border-black/20 text-gray-900'
                        } backdrop-blur-xl`}>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CCF301]/80 to-[#CCF301]/60 flex items-center justify-center text-black font-bold">
                                {user.avatar}
                              </div>
                              <div>
                                <div className={`font-bold ${
                                  isDarkMode ? 'text-[#CCF301]' : 'text-black'
                                }`}>
                                  {user.name}
                                </div>
                                {user.title && (
                                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {user.title}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {user.joinedDate && (
                                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <Calendar className="w-4 h-4" />
                                  <span>Joined {user.joinedDate}</span>
                                </div>
                              )}
                              {user.streak && (
                                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <Star className="w-4 h-4 text-orange-500" />
                                  <span>{user.streak} day streak</span>
                                </div>
                              )}
                            </div>

                            {(user.github || user.linkedin) && (
                              <div className="flex gap-3 pt-2 border-t border-white/10">
                                {user.github && (
                                  <a href={user.github} className={`flex items-center gap-1 text-sm hover:text-[#CCF301] transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <Github className="w-4 h-4" />
                                    <span>GitHub</span>
                                  </a>
                                )}
                                {user.linkedin && (
                                  <a href={user.linkedin} className={`flex items-center gap-1 text-sm hover:text-[#CCF301] transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <Linkedin className="w-4 h-4" />
                                    <span>LinkedIn</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Cards */}
      <div className="lg:hidden space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {users.map((user) => (
          <div
            key={user.rank}
            className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative ${
              isDarkMode 
                ? 'bg-slate-900/30 border-white/10 hover:bg-slate-800/50' 
                : 'bg-white/60 border-black/10 hover:bg-white/80'
            } backdrop-blur-xl`}
            onMouseEnter={() => setHoveredUser(user.rank)}
            onMouseLeave={() => setHoveredUser(null)}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  {getRankIcon(user.rank)}
                  <span className={`text-xl sm:text-2xl font-bold ${
                    isDarkMode ? 'text-[#CCF301]' : 'text-black'
                  }`}>
                    #{user.rank.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#CCF301]/80 to-[#CCF301]/60 flex items-center justify-center text-black font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                  {user.avatar}
                </div>
                <div>
                  <span className={`font-semibold group-hover:text-[#CCF301] transition-colors duration-300 text-sm sm:text-base ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user.name}
                  </span>
                  {user.title && (
                    <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {user.title}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg transition-transform duration-300 group-hover:scale-110">
                {user.country}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
              <div className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${
                  isDarkMode ? 'text-[#CCF301]' : 'text-black'
                }`}>
                  {user.stars.toLocaleString()}
                </div>
                <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Stars
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.problems}
                </div>
                <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Problems
                </div>
              </div>
              {user.streak && (
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-orange-500">
                    {user.streak}
                  </div>
                  <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Day Streak
                  </div>
                </div>
              )}
            </div>

           
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaderboardTable;
