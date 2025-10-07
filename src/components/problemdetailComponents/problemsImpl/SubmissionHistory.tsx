"use client";

import React, { useState } from "react";
import { useGetAllSubmissionHistoryQuery } from "@/lib/services/submission-history/submissionHistoryApi";
import { Star, Code2, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MonacoEditor } from "./monaco-editor";

// --- Map Judge0 language IDs to readable names ---
const monacoLanguageMap: Record<string, string> = {
  54: "cpp",
  62: "java",
  63: "javascript",
  71: "python",
};

const displayLangaugeMap: Record<string, string> = {
  54: "C++",
  62: "Java",
  63: "JavaScript",
  71: "Python",
};



// --- Star Rating Component ---
const StarRating = ({ star }: { star: string }) => {
  let solidStars = 0;
  if (star === "ONE") solidStars = 1;
  else if (star === "TWO") solidStars = 2;
  else if (star === "THREE") solidStars = 3;

  return (
    <div className="flex items-center gap-1">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < solidStars ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
              }`}
          />
        ))}
    </div>
  );
};

// --- Status Badge Style ---
const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toUpperCase();
  let color: string = "bg-gray-700 text-white";

  if (normalized === "ACCEPTED") color = "bg-green-600 text-white";
  else if (["WRONG ANSWER", "RUNTIME ERROR"].includes(normalized))
    color = "bg-red-600 text-white";
  else if (normalized === "TIME LIMIT EXCEEDED")
    color = "bg-orange-500 text-white";

  return <Badge className={`${color} font-medium px-3 py-1`}>{status}</Badge>;
};

// --- Main Component ---
const SubmissionHistoryComponent = ({ problem_id }: { problem_id?: number }) => {
  const skipQuery = typeof problem_id === "undefined";
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("cpp");


  const {
    data: submissions,
    isLoading,
    isFetching,
    isError,
  } = useGetAllSubmissionHistoryQuery(
    { problem_id: problem_id as number },
    { skip: skipQuery }
  );

  if (skipQuery) {
    return (
      <p className="text-center text-gray-400 py-6">
        Please select a problem to view its submission history.
      </p>
    );
  }

  if (isLoading || isFetching) {
    return <p className="text-center text-based text-gray-300 py-6 animate-pulse">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Error loading submission history. Please try again.
      </p>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <p className="text-center text-gray-400 py-6">
        No submissions found for this problem.
      </p>
    );
  }

  return (
  <div className="min-w-96 overflow-x-auto space-y-6">
    {/* Header */}
    <h2 className="text-2xl font-semibold text-black/80 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2">
      Submission History
    </h2>

    {/* Table */}
    <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead className="bg-gray-100 dark:bg-background">
          <tr>
            {["Submitted At", "Status", "Language", "Earned Coins", "Stars", "Code"].map((heading) => (
              <th key={heading} className="px-4 py-3 text-left text-black/70 dark:text-gray-300 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-white dark:bg-background" : "bg-black/5 dark:bg-black/15"} hover:bg-black/10 dark:hover:bg-black/20`}
            >
              <td className="px-4 py-3 text-black/80 dark:text-gray-300">
                {new Date(submission.submitted_at).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={submission.status} />
              </td>
              <td className="px-4 py-3 text-black/80 dark:text-gray-300">
                {displayLangaugeMap[submission.language_id] ?? `Lang ${submission.language_id}`}
              </td>
              <td className="px-4 py-3 text-yellow-400 font-medium flex items-center gap-1">
                <Coins className="h-4 w-4" />
                {submission.coin || 0}
              </td>
              <td className="px-4 py-3">
                <StarRating star={submission.star} />
              </td>
              <td className="px-4 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 font-medium border-green-800 dark:border-gray-600 hover:bg-gray-800 text-green-800 dark:text-gray-200"
                  onClick={() => {
                    setSelectedCode(submission.source_code);
                    setSelectedLanguage(monacoLanguageMap[submission.language_id] || "plaintext");
                  }}
                >
                  <Code2 className="h-4 w-4" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Code Viewer */}
    {selectedCode && (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold px-4 py-2 bg-gray-100 dark:bg-background dark:text-white border-b border-gray-300 dark:border-gray-700">
          Submission Code
        </h3>
        <MonacoEditor
          value={selectedCode}
          language={selectedLanguage}
          readOnly={true}
          height="400px"
          showThemeSelector={false}
        />
      </div>
    )}
  </div>
);

};

export default SubmissionHistoryComponent;
