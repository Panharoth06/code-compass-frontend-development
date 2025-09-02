'use client';
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  CheckCircle, 
  Circle, 
  BarChart3, 
  Users, 
  Zap,
  ChevronDown,
  ChevronRight,
  X,
  Hash,
  Target,
  Trophy,
  Book,
  Lightbulb
} from 'lucide-react';

const ProblemSet = () => {
  const [selectedTags, setSelectedTags] = useState(['All Topics']);
  const [selectedDifficulty, setSelectedDifficulty] = useState(['All']);
  const [selectedStatus, setSelectedStatus] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [isDark, setIsDark] = useState(true);

  // Sample problem data
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: "49%",
      status: "solved",
      tags: ["Array", "Hash Table"],
      submissions: "3.2M",
      likes: 15420
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium", 
      acceptance: "38%",
      status: "attempted",
      tags: ["Linked List", "Math", "Recursion"],
      submissions: "1.8M",
      likes: 9821
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      acceptance: "33%", 
      status: "unsolved",
      tags: ["Hash Table", "String", "Sliding Window"],
      submissions: "2.1M",
      likes: 12453
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: "36%",
      status: "unsolved", 
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      submissions: "982K",
      likes: 8734
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      acceptance: "32%",
      status: "solved",
      tags: ["String", "Dynamic Programming"],
      submissions: "1.5M", 
      likes: 11267
    },
    {
      id: 6,
      title: "Reverse Integer",
      difficulty: "Medium",
      acceptance: "26%",
      status: "unsolved",
      tags: ["Math"],
      submissions: "1.7M",
      likes: 6543
    },
    {
      id: 7,
      title: "Palindrome Number",
      difficulty: "Easy", 
      acceptance: "52%",
      status: "solved",
      tags: ["Math"],
      submissions: "2.8M",
      likes: 7821
    },
    {
      id: 8,
      title: "Regular Expression Matching",
      difficulty: "Hard",
      acceptance: "27%",
      status: "unsolved",
      tags: ["String", "Dynamic Programming", "Recursion"],
      submissions: "756K",
      likes: 9156
    },
    {
      id: 9,
      title: "Valid Parentheses",
      difficulty: "Easy",
      acceptance: "41%", 
      status: "solved",
      tags: ["String", "Stack"],
      submissions: "2.4M",
      likes: 13245
    },
    {
      id: 10,
      title: "Remove With Duplicates",
      difficulty: "Easy",
      acceptance: "48%",
      status: "attempted",
      tags: ["Array", "Two Pointers"],
      submissions: "1.9M",
      likes: 8976
    }
  ];

  const allTags = [
    "All Topics", "Array", "String", "Hash Table", "Dynamic Programming", 
    "Math", "Binary Search", "Two Pointers", "Linked List", "Stack", 
    "Recursion", "Sliding Window", "Divide and Conquer"
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const statuses = ["All", "Solved", "Attempted", "Unsolved"];

  // Filter problems based on selected filters
  const filteredProblems = problems.filter(problem => {
    const matchesTags = selectedTags.includes("All Topics") || 
      problem.tags.some(tag => selectedTags.includes(tag));
    
    const matchesDifficulty = selectedDifficulty.includes("All") || 
      selectedDifficulty.includes(problem.difficulty);
    
    const matchesStatus = selectedStatus.includes("All") || 
      selectedStatus.some(status => status.toLowerCase() === problem.status);
    
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTags && matchesDifficulty && matchesStatus && matchesSearch;
  });

  const handleTagToggle = (tag) => {
    if (tag === "All Topics") {
      setSelectedTags(["All Topics"]);
    } else {
      setSelectedTags(prev => {
        const withoutAll = prev.filter(t => t !== "All Topics");
        if (withoutAll.includes(tag)) {
          const newTags = withoutAll.filter(t => t !== tag);
          return newTags.length === 0 ? ["All Topics"] : newTags;
        } else {
          return [...withoutAll, tag];
        }
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'solved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'attempted': return <Circle className="h-5 w-5 text-yellow-500" />;
      default: return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAcceptanceColor = (acceptance) => {
    const rate = parseInt(acceptance);
    if (rate >= 50) return 'text-green-500';
    if (rate >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-slate-900 dark:to-black"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Problems</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Practice coding problems and improve your skills
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-green-500">{problems.filter(p => p.status === 'solved').length}</span> solved, 
                  <span className="font-medium text-yellow-500 ml-1">{problems.filter(p => p.status === 'attempted').length}</span> attempted
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            
            {/* Sidebar */}
            <div className={`${showFilters ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 sticky top-24">
                
                {/* Search */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search problems..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCF301] focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">Solved</span>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                      {problems.filter(p => p.status === 'solved').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Attempted</span>
                    </div>
                    <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                      {problems.filter(p => p.status === 'attempted').length}
                    </p>
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Difficulty
                  </h3>
                  <div className="space-y-2">
                    {difficulties.map(difficulty => (
                      <label key={difficulty} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedDifficulty.includes(difficulty)}
                          onChange={() => {
                            if (difficulty === "All") {
                              setSelectedDifficulty(["All"]);
                            } else {
                              setSelectedDifficulty(prev => {
                                const withoutAll = prev.filter(d => d !== "All");
                                if (withoutAll.includes(difficulty)) {
                                  const newDiff = withoutAll.filter(d => d !== difficulty);
                                  return newDiff.length === 0 ? ["All"] : newDiff;
                                } else {
                                  return [...withoutAll, difficulty];
                                }
                              });
                            }
                          }}
                          className="w-4 h-4 text-[#CCF301] bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 rounded focus:ring-[#CCF301] focus:ring-2"
                        />
                        <span className={`text-sm group-hover:text-[#CCF301] transition-colors ${
                          difficulty === "All" ? "text-gray-700 dark:text-gray-300" : getDifficultyColor(difficulty)
                        }`}>
                          {difficulty}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Status
                  </h3>
                  <div className="space-y-2">
                    {statuses.map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(status)}
                          onChange={() => {
                            if (status === "All") {
                              setSelectedStatus(["All"]);
                            } else {
                              setSelectedStatus(prev => {
                                const withoutAll = prev.filter(s => s !== "All");
                                if (withoutAll.includes(status)) {
                                  const newStatus = withoutAll.filter(s => s !== status);
                                  return newStatus.length === 0 ? ["All"] : newStatus;
                                } else {
                                  return [...withoutAll, status];
                                }
                              });
                            }
                          }}
                          className="w-4 h-4 text-[#CCF301] bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 rounded focus:ring-[#CCF301] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#CCF301] transition-colors">
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Topics Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Topics
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {allTags.map(tag => (
                      <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="w-4 h-4 text-[#CCF301] bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 rounded focus:ring-[#CCF301] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#CCF301] transition-colors">
                          {tag}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Controls */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <Filter className="h-4 w-4" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredProblems.length} of {problems.length} problems
                  </div>
                </div>
              </div>

              {/* Problems Table */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/80 dark:bg-gray-700/80">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Acceptance
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Difficulty
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Tags
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredProblems.map((problem, index) => (
                        <tr 
                          key={problem.id} 
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusIcon(problem.status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {problem.id}.
                              </span>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#CCF301] transition-colors">
                                  {problem.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-3">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {problem.submissions}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    {problem.likes.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getAcceptanceColor(problem.acceptance)}`}>
                              {problem.acceptance}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {problem.tags.slice(0, 3).map(tag => (
                                <span 
                                  key={tag}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-[#CCF301]/20 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                                >
                                  {tag}
                                </span>
                              ))}
                              {problem.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                  +{problem.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProblems.length === 0 && (
                  <div className="text-center py-12">
                    <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No problems found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {filteredProblems.length > 0 && (
                <div className="text-center mt-6">
                  <button className="px-6 py-3 bg-[#CCF301] hover:bg-[#CCF301]/80 text-gray-900 font-medium rounded-lg transition-colors">
                    Load More Problems
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;