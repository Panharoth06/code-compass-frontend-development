import { BookOpen } from "lucide-react";
import { Sidebar } from "./sideBar";
import { Card } from "./card";

export const StudyPlan = ({
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
    onBack,
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
    onBack: () => void;
}) => {
    const studyPlans = [
        {
            id: "1",
            title: "C++ Mastery",
            description: "Master C++ programming with 75 curated problems",
            subtitle: "System Programming & Performance",
            problems: "75 Problems",
            level: "Advanced",
            gradient: "from-blue-500 to-blue-600",
            icon: "💻",
        },
        {
            id: "2",
            title: "Java Excellence",
            description: "Enterprise Java development with top interview questions",
            subtitle: "Object-Oriented Programming",
            problems: "85 Problems",
            level: "Intermediate",
            gradient: "from-orange-500 to-red-500",
            icon: "☕",
        },
        {
            id: "3",
            title: "JavaScript Pro",
            description: "Modern JavaScript and web development essentials",
            subtitle: "Frontend & Backend Development",
            problems: "90 Problems",
            level: "Intermediate",
            gradient: "from-yellow-500 to-yellow-600",
            icon: "🚀",
        },
        {
            id: "4",
            title: "Python Expert",
            description: "Data structures, algorithms, and Python mastery",
            subtitle: "AI/ML & Data Science Ready",
            problems: "80 Problems",
            level: "Mixed",
            gradient: "from-green-500 to-blue-500",
            icon: "🐍",
        },
    ];

    return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-slate-100 transition-all duration-500 flex relative overflow-x-hidden"
    >
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

            {/* Sidebar */}
            <Sidebar
                sidebarWidth={sidebarWidth}
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                mobileMenuOpen={mobileMenuOpen}
                toggleCollapse={toggleCollapse}
                setMobileMenuOpen={setMobileMenuOpen}
                sidebarRef={sidebarRef}
                dragRef={dragRef}
                isDragging={isDragging}
                handleMouseDown={handleMouseDown}
                currentView="problemPackages"
                setCurrentView={onBack}
            />

            {isMobile && (
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`${mobileMenuOpen ? "hidden" : "block fixed top-16 left-4 z-50 p-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200"} `}
                >
                    <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 flex group-hover:hidden">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="sidebar" className="svg-inline--fa fa-sidebar absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M224 80V432H448c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H224zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 24c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H88c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H88zM64 312c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H88c-13.3 0-24 10.7-24 24z">
                            </path>
                        </svg>
                    </div>
                </button>
            )}

            {/* Main Content */}
            <div
                className={`flex-1 mt-4 transition-all duration-300 ease-in-out min-h-screen ${isMobile ? "w-full" : ""
                    }`}
                style={
                    !isMobile
                        ? {
                            width: `calc(100% - ${sidebarWidth}px)`,
                        }
                        : {}
                }
            >
                <div className="p-4">
                    {/* Mobile Header */}
                    {isMobile && (
                        <div className="flex items-center justify-between mb-6 lg:hidden">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#CCF301] to-[#CCF301]/80 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-gray-900" />
                                </div>
                                <h5 className="text-lg font-bold text-[#CCF301]">
                                    CodeCompass
                                </h5>
                            </div>
                            <div className="w-10 h-10"></div>
                        </div>
                    )}

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
                            Problem Packages
                        </h3>
                    </div>

                    <div className="mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {studyPlans.map((plan) => (
                                <Card
                                    key={plan.id}
                                    className="group cursor-pointer h-64 relative overflow-hidden"
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-90`}
                                    />
                                    <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                                        <div>
                                            <div className="text-3xl mb-3">{plan.icon}</div>
                                            <h5 className="font-bold text-lg mb-2">{plan.title}</h5>
                                            <p className="text-white/90 text-sm mb-1">
                                                {plan.subtitle}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/80 text-sm mb-3">
                                                {plan.description}
                                            </p>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white/90">{plan.problems}</span>
                                                <span className="text-white/90">•</span>
                                                <span className="text-white/90">{plan.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};