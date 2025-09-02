"use client";

interface ProblemHeaderProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags?: string[];
}

export default function ProblemHeader({
  title,
  difficulty,
  tags = [],
}: ProblemHeaderProps) {
  const difficultyColors = {
    Easy: "text-green-600",
    Medium: "text-yellow-600",
    Hard: "text-red-600",
  };

  return (
    <div className="mb-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <span className={`text-sm font-medium ${difficultyColors[difficulty]}`}>
        {difficulty}
      </span>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-800 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
