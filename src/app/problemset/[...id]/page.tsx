"use client";

import { useGetProblemQuery } from "@/lib/services/problem/problem";
import { Hint, TestCase } from "@/lib/types/problem/problemResponse";
import { useParams } from "next/navigation";

const ProblemPage = () => {
  const params = useParams();
  const problemId = params.id?.[0] || "";

  const { 
    data: problem, 
    error, 
    isLoading 
  } = useGetProblemQuery(problemId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full mx-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/6 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("API Error:", error);
    const errorMessage = (() => {
      if ("status" in error) {
        if (error.status === 401) return "Unauthorized access. Please log in.";
        if (error.status === 403) return "Access forbidden. You don't have permission to view this problem.";
        if (error.status === 404) return "Problem not found. Please check the problem ID.";
        return `Error ${error.status}: ${JSON.stringify(error.data)}`;
      }
      if ("message" in error) return error.message;
      return "An unexpected error occurred while loading the problem.";
    })();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4 text-center">
          <div className="text-red-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Problem Not Found</h2>
          <p className="text-gray-600 mb-6">The requested problem could not be loaded.</p>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    EASY: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HARD: "bg-red-100 text-red-800"
  };

  const starIcons = {
    ONE: "⭐",
    TWO: "⭐⭐",
    THREE: "⭐⭐⭐",
    FOUR: "⭐⭐⭐⭐",
    FIVE: "⭐⭐⭐⭐⭐"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{problem.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {starIcons[problem.star]}
                </span>
                {problem.coin && (
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    🪙 {problem.coin} coins
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">By {problem.author}</p>
              <p className="text-xs text-gray-500">Best: {problem.best_time_execution}s • {problem.best_memory_usage}MB</p>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{problem.description}</p>
          </div>
          
          {/* Tags Section */}
          {problem.tag_names && problem.tag_names.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {problem.tag_names.map((tag: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Test Cases Section */}
          {problem.test_cases && problem.test_cases.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Cases</h2>
              <div className="space-y-4">
                {problem.test_cases.map((testCase: TestCase, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-3">Test Case {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Input:</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          {testCase.stdin}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Expected Output:</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          {testCase.expected_outputs}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Hints Section */}
          {problem.hints && problem.hints.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Hints</h2>
              <div className="space-y-3">
                {problem.hints.map((hint: Hint, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${hint.isLocked ? 'bg-gray-100 border-l-4 border-gray-400' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{index + 1}.</span>
                      <div>
                        <p className={`${hint.isLocked ? 'text-gray-500' : 'text-gray-700'}`}>
                          {hint.isLocked ? "🔒 Locked hint (solve to unlock)" : hint.hint}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Solve Problem
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Try Test Cases
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Show Hints
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;