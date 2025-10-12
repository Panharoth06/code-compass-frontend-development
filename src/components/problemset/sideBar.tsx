import { BookOpen, Calendar, ChevronRight, Trophy, X } from "lucide-react";
import { Card } from "./card";

export const Sidebar = ({
  sidebarWidth,
  isMobile,
  isCollapsed,
  mobileMenuOpen,
  toggleCollapse,
  setMobileMenuOpen,
  sidebarRef,
  dragRef,
  isDragging,
  handleMouseDown,
  currentView,
  setCurrentView,
}: {
  sidebarWidth: number;
  isMobile: boolean;
  isCollapsed: boolean;
  mobileMenuOpen: boolean;
  toggleCollapse: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  dragRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  currentView: string;
  setCurrentView: (view: "problems" | "problemPackages") => void;
}) => {
  return (
    <div
      ref={sidebarRef}
      className={`${isMobile
        ? `fixed left-0 top-0 z-50 transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-80`
        : "relative z-40"
        } bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ease-in-out group`}
      style={
        !isMobile
          ? {
            width: `${sidebarWidth}px`,
            height: "100vh",
            minHeight: "100vh",
            borderRadius: "25px",
          }
          : {
            height: "100vh",
            minHeight: "100vh",
          }
      }
    >
      {/* Resize Handle - Desktop Only */}
      {!isMobile && (
        <div
          ref={dragRef}
          className={`absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-[#CCF301]/50 transition-colors duration-200 group-hover:opacity-100 opacity-0 ${isDragging ? "bg-[#CCF301] opacity-100" : ""
            }`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-0.5 h-4 bg-gray-500 dark:bg-slate-400 rounded-full"></div>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col">
        {/* Fixed header section */}
        <div className="flex-shrink-0 p-4 sm:p-6 pb-4">
          {/* Logo */}
          <div
            className={`flex items-center gap-3 mb-6 ${!isMobile && isCollapsed ? "justify-center" : ""
              }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-gray-900" />
            </div>
            {(isMobile || !isCollapsed) && (
              <div className="min-w-0">
                <h5 className="text-lg font-bold text-[#CCF301] truncate">
                  CodeCompass
                </h5>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                  Problem Library
                </p>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleCollapse}
            className={`${isMobile
              ? "absolute right-4 top-4"
              : "absolute bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700 -right-4 top-6"
              } transition-all duration-200 w-8 h-8 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:text-[#CCF301] z-20`}
            title={
              isMobile
                ? "Close menu"
                : isCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
            }
          >
            {isMobile ? (
              <X className="w-5 h-5" />
            ) : isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>

          {/* Stats Cards */}
          {(isMobile || !isCollapsed) && (
            <div className="space-y-3 mb-6">
              <Card hover={false} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    {/* <p className="text-2xl font-bold text-[#CCF301]">
                      {mockData.length}
                    </p> */}
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                      Total Problems
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-[#CCF301] flex-shrink-0" />
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Scrollable navigation section */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 p-3 ${currentView === "problems"
                ? "bg-[#CCF301]/10 border border-[#CCF301]/20 text-[#CCF301]"
                : "text-gray-600 dark:text-slate-400 hover:text-[#CCF301] hover:bg-[#CCF301]/10"
                } rounded-xl font-medium transition-all duration-300 cursor-pointer ${!isMobile && isCollapsed ? "justify-center" : ""
                }`}
              onClick={() => {
                setCurrentView("problems");
                if (isMobile) setMobileMenuOpen(false);
              }}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              {(isMobile || !isCollapsed) && (
                <span className="whitespace-nowrap truncate">
                  Problem Library
                </span>
              )}
              {(isMobile || !isCollapsed) && (
                <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
              )}
            </div>

            <div
              className={`flex items-center gap-3 p-3 ${currentView === "problemPackages"
                ? "bg-[#CCF301]/10 border border-[#CCF301]/20 text-[#CCF301]"
                : "text-gray-600 dark:text-slate-400 hover:text-[#CCF301] hover:bg-[#CCF301]/10"
                } transition-all duration-200 cursor-pointer rounded-xl ${!isMobile && isCollapsed ? "justify-center" : ""
                }`}
              onClick={() => {
                setCurrentView("problemPackages");
                if (isMobile) setMobileMenuOpen(false);
              }}
              title="Problem Packages"
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              {(isMobile || !isCollapsed) && (
                <span className="whitespace-nowrap truncate">Problem Packages</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};