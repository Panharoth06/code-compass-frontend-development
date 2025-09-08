"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Github,
  Trophy,
  MessageCircle,
  Star,
  Calendar,
  Eye,
  Camera,
} from "lucide-react";

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("Recent AC");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/editprofile"); // navigate to updateprofile.tsx
  };

  // handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sample data for the chart
  const monthlyData = [
    { month: "JAN", submissions: 45, solved: 12 },
    { month: "FEB", submissions: 52, solved: 18 },
    { month: "MAR", submissions: 38, solved: 25 },
    { month: "APR", submissions: 64, solved: 32 },
    { month: "MAY", submissions: 71, solved: 45 },
    { month: "JUN", submissions: 58, solved: 38 },
    { month: "JUL", submissions: 82, solved: 52 },
    { month: "AUG", submissions: 76, solved: 48 },
    { month: "SEP", submissions: 89, solved: 65 },
    { month: "OCT", submissions: 94, solved: 72 },
    { month: "NOV", submissions: 87, solved: 68 },
    { month: "DEC", submissions: 91, solved: 75 },
  ];

  const maxSubmissions = Math.max(...monthlyData.map((d) => d.submissions));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              {/* Profile Image with upload */}
              <div className="relative w-16 h-16">
                <img
                  src={profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-500 shadow-md"
                />
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div>
                <h5 className="text-xl font-bold">Bunvarnn</h5>
                <p className="text-gray-400">bunvarnn@gmail.com</p>
              </div>
            </div>

            <button
              onClick={handleEditProfile}
              className="w-full bg-[#b4ff00] hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Edit Profile
            </button>

            <div className="flex items-center mt-4 text-gray-400">
              <Github size={16} className="mr-2" />
              <span>bunvarnnnn</span>
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-lg font-semibold mb-4">Community Stats</h5>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye size={16} className="mr-2" />
                  <span>Views</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>Solution</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle size={16} className="mr-2" />
                  <span>Discuss</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star size={16} className="mr-2 " />
                  <span>Reputation</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-lg font-semibold mb-4">Languages</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="w-10" src="/img/cpp.png" alt="C++" />
                  <span className="ml-2">C++</span>
                </div>
                <span className="text-gray-400 text-sm">
                  85 problems solved
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="w-10" src="/img/js.png" alt="JavaScript" />
                  <span className="ml-2">JavaScript</span>
                </div>
                <span className="text-gray-400 text-sm">
                  62 problems solved
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-lg font-semibold mb-4">Skills</h5>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Advanced</span>
                  <span className="text-sm text-gray-400">
                    No recent AC data
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Intermediate</span>
                  <span className="text-sm text-gray-400">
                    No recent AC data
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Fundamental</span>
                  <span className="text-sm text-gray-400">
                    No recent AC data
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Circle and Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Circle */}
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-yellow-300"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset="251.2"
                    className="transition-all duration-1000"
                    style={{ strokeDashoffset: 251.2 * 0.99 }}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">0/365</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-gray-400">Easy</div>
                  <div className="font-semibold">42%</div>
                </div>
                <div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-gray-400">Med</div>
                  <div className="font-semibold">27%</div>
                </div>
                <div>
                  <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-gray-400">Hard</div>
                  <div className="font-semibold">18%</div>
                </div>
              </div>
            </div>

            {/* Total Badges */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h5 className="text-lg font-semibold mb-4 text-gray-400">
                Total Badges
              </h5>
              <div className="text-4xl font-bold mb-4 text-center">3</div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-400">
                  Locked Badges
                </p>
                <p className="text-sm">Aug LeetCompass Challenge</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-sm font-semibold mb-3 flex items-center">
              <Trophy size={20} className="mr-2" />
              My Badges
            </h5>
            <div className="flex justify-center items-center gap-6">
              <img className="w-32" src="/img/c++.png" alt="C++" />
              <img className="w-32" src="/img/java.png" alt="Java" />
              <img className="w-32" src="/img/python.png" alt="Python" />
            </div>
          </div>

          {/* Submissions Chart */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h5 className="text-lg font-semibold mb-4">
              233 Submission in 2025
            </h5>
            <div className="flex items-end justify-between h-40 mb-4">
              {monthlyData.map((data) => (
                <div
                  key={data.month}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="flex flex-col items-center">
                    {/* Total submissions bar */}
                    <div
                      className="w-6 bg-gray-700 rounded-sm"
                      style={{
                        height: `${
                          (data.submissions / maxSubmissions) * 120
                        }px`,
                        minHeight: "4px",
                      }}
                    ></div>
                    {/* Solved submissions bar */}
                    <div
                      className="w-6 bg-green-500 rounded-sm -mt-1"
                      style={{
                        height: `${(data.solved / maxSubmissions) * 120}px`,
                        minHeight: "2px",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="bg-gray-800 rounded-lg">
            <div className="flex border-b border-gray-700">
              {["Recent AC", "Solutions", "Discuss"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-white border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "Recent AC" && (
                    <Calendar size={16} className="inline mr-2" />
                  )}
                  {tab === "Solutions" && (
                    <Star size={16} className="inline mr-2" />
                  )}
                  {tab === "Discuss" && (
                    <MessageCircle size={16} className="inline mr-2" />
                  )}
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6">
              <div className="text-center text-gray-400 py-8">
                No Recent Submissions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
