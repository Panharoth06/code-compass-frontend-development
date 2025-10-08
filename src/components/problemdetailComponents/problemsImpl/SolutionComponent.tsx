import React from 'react'
import { useGetAllSolutionsQuery } from '@/lib/services/solution/solutionApi'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Code2, Clock, User } from 'lucide-react'
import Image from 'next/image';

interface SolutionComponentProps {
  problem_id: number;
}

const SolutionComponent = (problem_id: SolutionComponentProps) => {
  const { data: solutions, isLoading, isError } = useGetAllSolutionsQuery(problem_id);

  if (isLoading)
    return (
      <p className="text-lg text-center text-black/80 dark:text-white/90 animate-pulse">
        Loading...
      </p>
    )

  if (isError)
    return (
      <p className="text-lg text-center text-red-800 dark:text-red-600 animate-pulse">
        Failed to load data
      </p>
    )

  if (!solutions || solutions.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-8">
        No solutions found yet.
      </p>
    )

  const displayLangaugeMap: Record<string, string> = {
    54: "C++",
    62: "Java",
    63: "JavaScript",
    71: "Python",
  };

  return (
    <div className="mx-auto px-4 py-6 space-y-6">
      <h2 className="text-3xl font-semibold text-black/80 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
        Solutions
      </h2>

      {solutions.map((solution, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 rounded-2xl"
        >
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              {solution.user_profile ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={solution.user_profile}
                    alt={solution.author}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <User size={48} className="text-gray-500 dark:text-gray-400" />
              )}

              <span className="font-medium text-lg">{solution.author}</span>
              <Code2 size={16} className="ml-3" />

              <span className="capitalize text-based">{displayLangaugeMap[solution.language_id] ?? `Lang ${solution.language_id}`}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-based">
              <Clock size={16} />
              {new Date(solution.posted_at).toLocaleDateString()}
            </div>
          </CardHeader>

          <CardContent className="space-y-3">


            <pre className="bg-gray-100 text-based dark:bg-gray-900 p-3 rounded-xl overflow-x-auto text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              <code>{solution.source_code}</code>
            </pre>

            {solution.explanation && (
              <div className="text-gray-700 dark:text-gray-300 text-lg">
                <span className="font-medium">Explanation: </span>
                {solution.explanation}
              </div>
            )}
          </CardContent>

        </Card>
      ))}
    </div>
  )
}

export default SolutionComponent
