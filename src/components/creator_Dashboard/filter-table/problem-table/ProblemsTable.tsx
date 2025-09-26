import React from "react"
import { Edit, Trash2 } from "lucide-react"
import { useGetVerifiedProblemsQuery } from "@/lib/services/creator-dashboard/problem/verifiedProblemsApi"
// Update this import path to match your actual file structure
import { useFetchUnverifiedProblemsQuery } from "@/lib/services/creator-dashboard/problem/unverifiedProblemsApi"

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${className}`}
  >
    {children}
  </span>
)

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95 relative overflow-hidden"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
    lg: "h-12 px-8 text-lg",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-auto rounded-xl border border-border">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

const TableHeader = ({ children }) => (
  <thead className="bg-muted/50 [&_tr]:border-b [&_tr]:border-border">{children}</thead>
)

const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>

const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b border-border transition-colors hover:bg-muted/30 ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }) => (
  <th
    className={`h-14 px-6 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "" }) => (
  <td className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
)

function getDifficultyColor(difficulty) {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
    case "medium":
      return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
    case "hard":
      return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
  }
}

export default function ProblemsTable({ showVerified = true, onEdit, onDelete }) {
  const { 
    data: verifiedProblems = [], 
    isLoading: isLoadingVerified, 
    error: verifiedError 
  } = useGetVerifiedProblemsQuery(undefined, { skip: !showVerified })
  
  const { 
    data: unverifiedProblems = [], 
    isLoading: isLoadingUnverified, 
    error: unverifiedError 
  } = useFetchUnverifiedProblemsQuery(undefined, { skip: showVerified })

  const problems = showVerified ? verifiedProblems : unverifiedProblems
  const isLoading = showVerified ? isLoadingVerified : isLoadingUnverified
  const error = showVerified ? verifiedError : unverifiedError

  // Enhanced debug logging
  console.log('=== ProblemsTable Debug Info ===')
  console.log('showVerified:', showVerified)
  console.log('verifiedProblems:', verifiedProblems)
  console.log('unverifiedProblems:', unverifiedProblems)
  console.log('problems (selected):', problems)
  console.log('isLoadingVerified:', isLoadingVerified)
  console.log('isLoadingUnverified:', isLoadingUnverified)
  console.log('isLoading (selected):', isLoading)
  console.log('verifiedError:', verifiedError)
  console.log('unverifiedError:', unverifiedError)
  console.log('error (selected):', error)
  console.log('================================')

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
              <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading {showVerified ? 'verified' : 'unverified'} problems...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  if (error) {
    console.error('Error details:', error)
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
              <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan="5" className="text-center py-8 text-red-500 dark:text-red-400">
                Error loading {showVerified ? 'verified' : 'unverified'} problems: {error?.message || 'Unknown error'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
            <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
            <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.length > 0 ? (
            problems.map((problem) => (
              <TableRow
                key={problem.id}
                className="hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-200 group"
              >
                <TableCell className="font-medium text-gray-900 dark:text-white">{problem.id}</TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-white">{problem.title}</TableCell>
                <TableCell>
                  {problem.difficulty ? (
                    <Badge className={`${getDifficultyColor(problem.difficulty)} shadow-md`}>
                      {problem.difficulty}
                    </Badge>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {problem.tags?.map((tag, index) => (
                      <Badge 
                        key={index}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500"
                      >
                        {tag}
                      </Badge>
                    )) || <span className="text-gray-500 dark:text-gray-400">-</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 group-hover:scale-105 p-2"
                      onClick={() => onEdit && onEdit(problem)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 group-hover:scale-105 p-2"
                      onClick={() => onDelete && onDelete(problem)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400">
                No {showVerified ? 'verified' : 'unverified'} problems found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}