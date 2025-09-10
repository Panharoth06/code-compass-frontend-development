"use client";

export default function Header() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-blue-600">CodeCompass</div>
        <div className="text-sm text-gray-400">/</div>
        <div className="text-sm text-gray-600 font-medium">Problems</div>
        <div className="text-sm text-gray-400">/</div>
        <div className="text-sm text-gray-800 font-medium">1. Two Sum</div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="text-sm text-gray-600">Streak: 7 days</div>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          U
        </div>
      </div>
    </div>
  );
}
