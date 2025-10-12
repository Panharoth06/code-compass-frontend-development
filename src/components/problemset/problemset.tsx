"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  JSX,
} from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { useGetAllProblemsQuery } from "@/lib/services/problem/problemApi";
import { ProblemSummaryResponse } from "@/lib/types/problem/problemResponse";
import { Sidebar } from "./sideBar";
import { StudyPlan } from "./packageProblem";
import { Card } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { IsFetchingLoader } from "./isFetchingLoader";
const topicFilters = [
  "All Topics",
  "Arrays",
  "Strings",
  "Trees",
  "Dynamic Programming",
];

const getDifficultyConfig = (difficulty: string) => {
  switch (difficulty) {
    case "EASY":
      return {
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-500/15 border-green-500/20",
      };
    case "MEDIUM":
      return {
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-500/15 border-orange-500/20",
      };
    case "HARD":
      return {
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-500/15 border-red-500/20",
      };
    default:
      return {
        color: "text-gray-600 dark:text-slate-400",
        bg: "bg-gray-500/15 dark:bg-slate-500/15 border-gray-500/20 dark:border-slate-500/20",
      };
  }
}


export default function Problemset(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const [currentView, setCurrentView] = useState<"problems" | "problemPackages">(
    "problems"
  );
  const [sidebarWidth, setSidebarWidth] = useState(288); // 72 * 4 = 288px (w-72)
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  // Fetch problems
  const { data, isFetching } = useGetAllProblemsQuery({ page, size: 10 });
  const problems = data?.content || [];


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!data || isFetching) return;

      const nearBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 300;

      if (nearBottom && page + 1 < (data.totalPages || 0)) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Auto-load next page if container is too short
    if (container.scrollHeight <= container.clientHeight && page + 1 < (data?.totalPages || 0)) {
      setPage((prev) => prev + 1);
    }

    return () => container.removeEventListener('scroll', handleScroll);
  }, [data?.totalPages, isFetching, page, data]);


  const minWidth = 64; // w-16
  const maxWidth = 400;

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setSidebarWidth(64);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Load saved sidebar width (using React state instead of localStorage for build compatibility)
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      e.preventDefault();
      setIsDragging(true);
    },
    [isMobile]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || isMobile) return;

      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
        setIsCollapsed(newWidth <= 80); // Auto-collapse when very narrow
      }
    },
    [isDragging, isMobile]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp, isMobile]);

  const toggleCollapse = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
      return;
    }

    if (isCollapsed) {
      setSidebarWidth(288);
      setIsCollapsed(false);
    } else {
      setSidebarWidth(64);
      setIsCollapsed(true);
    }
  };



  // const filteredData = problems
  //   ? [...problems]
  //     .sort((a: ProblemSummaryResponse, b: ProblemSummaryResponse) => a.id - b.id)
  //     .filter((problem: ProblemSummaryResponse) => {
  //       const matchesSearch = problem.title
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase());
  //       const matchesTopic =
  //         activeFilter === "All Topics" ||
  //         problem.tags.some((tag) => {
  //           const normalizedTag = tag.toLowerCase().replace(/-/g, " ");
  //           const normalizedFilter = activeFilter.toLowerCase();
  //           return (
  //             normalizedTag.includes(normalizedFilter) ||
  //             normalizedFilter.includes(normalizedTag)
  //           );
  //         });

  //       return matchesSearch && matchesTopic;
  //     }) : [];

  if (currentView === "problemPackages") {
    return (
      <StudyPlan
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
        onBack={() => setCurrentView("problems")}
      />
    );
  }

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
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`${mobileMenuOpen ? "hidden" : "block fixed top-16 left-4 z-50 p-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200"} `}
        >
          <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 flex group-hover:hidden"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="sidebar" className="svg-inline--fa fa-sidebar absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M224 80V432H448c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H224zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 24c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H88c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H88zM64 312c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H88c-13.3 0-24 10.7-24 24z"></path></svg></div>
        </button>
      )}

      {/* Main Content */}

      <div
        className={`flex-1 mx-4 transition-all duration-300 ease-in-out min-h-screen ${isMobile ? "w-full" : ""
          }`}
        style={
          !isMobile ? { width: `calc(100% - ${sidebarWidth}px)`, } : {}
        }
      >
        {/* Filters Section */}
        <div className="mb-6 sm:mb-8 mt-10">
          <Card hover={false} className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Search */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Search Problems
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Topic Filter */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Topic Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {topicFilters.map((filter) => (
                    <Button
                      key={filter}
                      variant={
                        activeFilter === filter ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveFilter(filter)}
                      className="transition-all duration-200 whitespace-nowrap text-xs sm:text-sm"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  title="Advanced Filters"
                  className="flex-shrink-0"
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  title="Sort Options"
                  className="flex-shrink-0"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Problems Table - Mobile Responsive */}
        <div className="mb-8">
          <Card hover={false} className="">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto" ref={scrollContainerRef}>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-800/50">
                    <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      #
                    </th>
                    <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      Problem
                    </th>
                    <th className="text-left p-3 sm:p-4 text-gray-700 dark:text-slate-300 font-medium text-sm">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem: ProblemSummaryResponse) => {
                    const difficultyConfig = getDifficultyConfig(
                      problem.difficulty
                    );
                    return (
                      <tr
                        key={problem.id}
                        className="border-b border-gray-200 dark:border-slate-700/30 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-all duration-200 cursor-pointer group"
                      >
                        <td className="p-3 sm:p-4 text-gray-600 dark:text-slate-400 font-mono text-sm">
                          <Link
                            href={`/problemdetails/${problem.id}`}
                            className="no-underline block"
                          >
                            {problem.id}
                          </Link>
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            href={`/problemdetails/${problem.id}`}
                            className="no-underline block"
                          >
                            <div className="min-w-0">
                              <div className="text-gray-900 dark:text-slate-100 font-medium group-hover:text-[#CCF301] transition-colors duration-200 truncate">
                                {problem.title}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {problem.tags
                                  .slice(0, 3)
                                  .map((tag, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                {problem.tags.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    +{problem.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            href={`/problemdetails/${problem.id}`}
                            className="no-underline block"
                          >
                            <Badge
                              className={`${difficultyConfig.color} ${difficultyConfig.bg} border text-xs`}
                            >
                              {problem.difficulty}
                            </Badge>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  {isFetching && <IsFetchingLoader />}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="divide-y divide-gray-200 dark:divide-slate-700/50">
                {problems.map((problem: ProblemSummaryResponse) => {
                  const difficultyConfig = getDifficultyConfig(
                    problem.difficulty
                  );
                  return (
                    <div
                      key={problem.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-all duration-200 cursor-pointer"
                    >
                      <Link href={`/problemdetails/${problem.id}`} className="no-underline block">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className="text-gray-600 dark:text-slate-400 font-mono text-sm flex-shrink-0">
                              #{problem.id}
                            </span>
                            <div className="min-w-0 flex-1">
                              <h6 className="text-gray-900 dark:text-slate-100 font-medium text-sm truncate">
                                {problem.title}
                              </h6>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            className={`${difficultyConfig.color} ${difficultyConfig.bg} border text-xs`}
                          >
                            {problem.difficulty}
                          </Badge>
                          {problem.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {problem.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{problem.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ) as JSX.Element;
}