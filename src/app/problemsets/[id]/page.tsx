// src/app/problems/[id]/page.tsx
"use client";

import { use, useState } from "react";
import Workspace from "@/components/problemsComponents/layout/Workspace";
import ProblemSidebar from "@/components/problemsComponents/problemSidebar/ProblemSidebar";
import { Menu } from "lucide-react";

export default function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params with use()
  const { id } = use(params);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80">
          <ProblemSidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar with toggle button */}
        <div className="p-2 border-b dark:border-gray-700 flex items-center">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-md hover:bg-neutral-800"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <span className="ml-2 text-white font-medium">Problem {id}</span>
        </div>

        {/* Workspace */}
        <Workspace problemId={id} />
      </div>
    </div>
  );
}
