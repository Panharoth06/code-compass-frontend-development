"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

type Difficulty = "Easy" | "Med." | "Hard";

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  submissions: number;
  successRate: number;
  created: string;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum Array Challenge",
    description: "Find two numbers that add up to target",
    difficulty: "Easy",
    submissions: 248,
    successRate: 90,
    created: "3 days ago",
  },
  {
    id: 2,
    title: "Binary Tree Traversal",
    description: "Implement BFS and DFS algorithms",
    difficulty: "Med.",
    submissions: 107,
    successRate: 75,
    created: "5 days ago",
  },
  {
    id: 3,
    title: "Dynamic Programming Mastery",
    description: "Advanced DP techniques and optimization",
    difficulty: "Hard",
    submissions: 315,
    successRate: 65,
    created: "7 days ago",
  },
  {
    id: 4,
    title: "Graph Representation",
    description: "Implement Adjacency List and Adjacency Matrix",
    difficulty: "Easy",
    submissions: 155,
    successRate: 55,
    created: "9 days ago",
  },
  {
    id: 5,
    title: "Recursion & Backtracking",
    description: "Solve the N Queens Problem",
    difficulty: "Med.",
    submissions: 217,
    successRate: 45,
    created: "11 days ago",
  },
  {
    id: 6,
    title: "Dynamic Fibonacci",
    description: "Implement Fibonacci sequence with Memoization",
    difficulty: "Hard",
    submissions: 385,
    successRate: 80,
    created: "13 days ago",
  },
  {
    id: 7,
    title: "Hash Map Basics",
    description: "Implement basic hash map operations",
    difficulty: "Easy",
    submissions: 275,
    successRate: 80,
    created: "15 days ago",
  },
  {
    id: 8,
    title: "Sliding Window Technique",
    description: "Solve maximum sum subarray problems",
    difficulty: "Med.",
    submissions: 190,
    successRate: 70,
    created: "17 days ago",
  },
  {
    id: 9,
    title: "Graph DFS & BFS",
    description: "Traverse graphs using DFS and BFS",
    difficulty: "Hard",
    submissions: 310,
    successRate: 60,
    created: "19 days ago",
  },
  {
    id: 10,
    title: "Linked List Operations",
    description: "Implement singly and doubly linked list methods",
    difficulty: "Med.",
    submissions: 220,
    successRate: 75,
    created: "21 days ago",
  },
];

const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    case "Med.":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    case "Hard":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }
};

const getSuccessRateColor = (rate: number) => {
  if (rate >= 80) return "text-emerald-400";
  if (rate >= 60) return "text-yellow-400";
  return "text-red-400";
};

export default function ProblemSetPage() {
  const [activeTab, setActiveTab] = useState("Problems Created");
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(1);

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-700 px-6 py-3">
        <button
          onClick={() => setActiveTab("Problems Created")}
          className={`pb-2 px-1 font-medium text-sm transition-colors ${
            activeTab === "Problems Created"
              ? "text-emerald-400 border-b-2 border-emerald-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Problems Created
        </button>
      </div>

      {/* Problem List / Admin Responses */}
      {activeTab === "Problems Created" && (
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-400 border-b border-slate-700 pb-2 mb-2">
            <div className="col-span-3">Problem Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Submissions</div>
            <div className="col-span-2">Success Rate</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto">
            {problems.map((problem) => {
              const isActive = selectedProblemId === problem.id;
              return (
                <div
                  key={problem.id}
                  onClick={() => {
                    setSelectedProblemId(problem.id);
                    window.location.href = `/problemsets/${problem.id}`;
                  }}
                  className={`grid grid-cols-12 gap-4 items-center px-4 py-3 mb-1 border-b border-slate-700 cursor-pointer hover:bg-slate-700/50 ${
                    isActive
                      ? "bg-slate-700 border-l-4 border-l-emerald-500"
                      : ""
                  }`}
                >
                  <div className="col-span-3">
                    <div className="font-medium text-white mb-1">
                      {problem.title}
                    </div>
                    <div className="text-sm text-slate-400 truncate">
                      {problem.description}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="col-span-2 text-slate-200 font-medium">
                    {problem.submissions}
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`font-medium ${getSuccessRateColor(
                        problem.successRate
                      )}`}
                    >
                      {problem.successRate}%
                    </span>
                  </div>
                  <div className="col-span-2 text-slate-400">
                    {problem.created}
                  </div>
                  <div className="col-span-1">
                    <button className="p-1 hover:bg-slate-600 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "Admin Responses" && (
        <div className="flex-1 flex items-center justify-center text-center p-6">
          <div>
            <h3 className="text-lg font-medium text-slate-300 mb-2">
              No Admin Responses
            </h3>
            <p className="text-slate-400">
              Admin responses will appear here when available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
