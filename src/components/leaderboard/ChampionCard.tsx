import React from 'react';
import { Crown, Star, Zap, Calendar, MapPin } from 'lucide-react';

interface ChampionUser {
  rank: number;
  name: string;
  title: string;
  stars: number;
  problems: number;
  country: string;
  avatar: string;
  quote: string;
  joinedDate?: string;
  location?: string;
  streak?: number;
  lastActive?: string;
}

interface ChampionCardProps {
  user: ChampionUser;
  isDarkMode: boolean;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ user, isDarkMode }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="mb-6 sm:mb-8 lg:mb-10">
      <div
        className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 hover:scale-[1.01] cursor-pointer group overflow-hidden ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/30 border-[#CCF301]/30 hover:border-[#CCF301]/50'
            : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-[#CCF301]/40 hover:border-[#CCF301]/60'
        } backdrop-blur-xl`}
        onMouseEnter={() => setShowDetails(false) }
        onMouseLeave={() =>setShowDetails(true)}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#CCF301]/5 via-transparent to-[#CCF301]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-[#CCF301]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

        <div className="relative flex flex-col sm:flex-row lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 transition-transform duration-500 group-hover:scale-110 ${
                isDarkMode
                  ? 'border-[#CCF301]/40 shadow-2xl shadow-[#CCF301]/20'
                  : 'border-[#CCF301]/60 shadow-2xl shadow-[#CCF301]/30'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 flex items-center justify-center text-black font-black text-xl sm:text-2xl lg:text-4xl">
                {user.avatar}
              </div>
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-1.5 sm:p-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
              #{user.rank}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#CCF301]">
                Champion
              </h2>
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-500" />
            </div>
            <h3
              className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {user.name} • {user.title}
            </h3>

            {/* Quote + Details crossfade */}
            <div className="relative h-20 sm:h-24 lg:h-28 overflow-hidden">
              {/* Quote */}
              <p
                className={`absolute inset-0 flex items-center justify-center sm:justify-start text-sm sm:text-base lg:text-lg italic leading-relaxed max-w-2xl transition-all duration-500 ${
                  showDetails
                    ? 'opacity-0 translate-y-2'
                    : 'opacity-100 translate-y-0'
                } ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                &ldquo;{user.quote}&rdquo;
              </p>

              {/* Details */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  showDetails
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {user.joinedDate && (
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Joined {user.joinedDate}</span>
                    </div>
                  )}
                  {user.location && (
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.streak && (
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                      <span>{user.streak} day streak</span>
                    </div>
                  )}
                  {user.lastActive && (
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Active {user.lastActive}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Champion Stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6">
  <div
    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
      isDarkMode
        ? "bg-white/10 border-white/20 text-white"
        : "bg-black/10 border-black/20 text-black"
    }`}
  >
    <span
      className={`font-bold ${
        isDarkMode ? "text-[#CCF301]" : "text-black"
      }`}
    >
      {user.stars.toLocaleString()}
    </span>
    <span className="ml-1">stars</span>
  </div>

  <div
    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
      isDarkMode
        ? "bg-white/10 border-white/20 text-white"
        : "bg-black/10 border-black/20 text-black"
    }`}
  >
    <span
      className={`font-bold ${
        isDarkMode ? "text-[#CCF301]" : "text-black"
      }`}
    >
      {user.problems}
    </span>
    <span className="ml-1">solved</span>
  </div>

  <div
    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
      isDarkMode
        ? "bg-white/10 border-white/20 text-white"
        : "bg-black/10 border-black/20 text-black"
    }`}
  >
    <span
      className={`font-bold ${
        isDarkMode ? "text-[#CCF301]" : "text-black"
      }`}
    >
      {user.country}
    </span>
    <span className="ml-1">Cambodia</span>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;