// import React, { useEffect } from "react"
// import { Edit, Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
// import { useGetMyProblemsQuery, Problem } from "@/lib/services/creator-dashboard/problem/displayAllProblemsApi"

// // Import the APIs - make sure these paths match your actual file structure
// // If you get import errors, adjust these paths accordingly
// let useModifyProblemMutation, useDeleteProblemMutation;

// try {
//   const modifyApi = require("@/lib/services/creator-dashboard/problem/modifyProblemsApi");
//   useModifyProblemMutation = modifyApi.useModifyProblemMutation;
// } catch (error) {
//   console.warn("Could not import modifyProblemsApi:", error);
//   useModifyProblemMutation = () => [() => Promise.reject("Modify API not available"), { isLoading: false, error: null }];
// }

// try {
//   const deleteApi = require("@/lib/services/creator-dashboard/problem/deletedProblemsApi");
//   useDeleteProblemMutation = deleteApi.useDeleteProblemMutation;
// } catch (error) {
//   console.warn("Could not import deletedProblemsApi:", error);
//   useDeleteProblemMutation = () => [() => Promise.reject("Delete API not available"), { isLoading: false, error: null }];
// }

// const Badge = ({ children, className = "" }) => (
//   <span
//     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${className}`}
//   >
//     {children}
//   </span>
// )

// const Button = ({
//   children,
//   className = "",
//   variant = "default",
//   size = "default",
//   onClick,
//   type = "button",
//   disabled = false,
//   ...props
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95 relative overflow-hidden"

//   const variants = {
//     default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
//     outline:
//       "border-2 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
//     ghost: "hover:bg-accent hover:text-accent-foreground",
//     destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
//   }

//   const sizes = {
//     default: "h-11 py-3 px-6",
//     sm: "h-9 px-4 rounded-lg text-sm",
//     lg: "h-12 px-8 text-lg",
//   }

//   return (
//     <button
//       type={type}
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//       {...props}
//     >
//       {children}
//     </button>
//   )
// }

// const Table = ({ children, className = "" }) => (
//   <div className="w-full overflow-auto rounded-xl border border-border">
//     <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
//   </div>
// )

// const TableHeader = ({ children }) => (
//   <thead className="bg-muted/50 [&_tr]:border-b [&_tr]:border-border">{children}</thead>
// )

// const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>

// const TableRow = ({ children, className = "" }) => (
//   <tr className={`border-b border-border transition-colors hover:bg-muted/30 ${className}`}>{children}</tr>
// )

// const TableHead = ({ children, className = "" }) => (
//   <th
//     className={`h-14 px-6 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
//   >
//     {children}
//   </th>
// )

// const TableCell = ({ children, className = "" }) => (
//   <td className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
// )

// // Notification Component
// const Notification = ({ type, message, onClose }) => {
//   const icons = {
//     success: <CheckCircle className="w-5 h-5" />,
//     error: <XCircle className="w-5 h-5" />,
//     info: <AlertCircle className="w-5 h-5" />
//   }

//   const colors = {
//     success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200",
//     error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200",
//     info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-200"
//   }

//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000)
//     return () => clearTimeout(timer)
//   }, [onClose])

//   return (
//     <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 ${colors[type]}`}>
//       {icons[type]}
//       <span className="font-medium">{message}</span>
//       <button onClick={onClose} className="ml-2 hover:opacity-70">
//         ×
//       </button>
//     </div>
//   )
// }

// function getDifficultyColor(difficulty) {
//   switch (difficulty?.toLowerCase()) {
//     case "easy":
//       return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
//     case "medium":
//       return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
//     case "hard":
//       return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
//     default:
//       return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
//   }
// }

// function getStatusColor(status) {
//   switch (status) {
//     case "APPROVED":
//       return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
//     case "PENDING":
//       return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
//     case "REJECTED":
//       return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
//     default:
//       return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
//   }
// }

// interface ProblemsTableProps {
//   showVerified?: boolean;
//   showAll?: boolean;
//   onEdit?: (problem: Problem) => void;
//   onDelete?: (problem: Problem) => void;
// }

// export default function ProblemsTable({ 
//   showVerified = true, 
//   showAll = false,
//   onEdit, 
//   onDelete 
// }: ProblemsTableProps) {
//   const [notification, setNotification] = React.useState<{type: string, message: string} | null>(null)
//   const [currentPage, setCurrentPage] = React.useState(1)
//   const itemsPerPage = 5
  
//   // Fetch problems from API
//   const { 
//     data: allProblems = [], 
//     isLoading, 
//     error,
//     refetch
//   } = useGetMyProblemsQuery()

//   // Use the API hooks with error handling
//   const [modifyProblem, modifyState] = useModifyProblemMutation()
//   const [deleteProblem, deleteState] = useDeleteProblemMutation()

//   // Manual filtering based on showVerified and showAll props
//   const problems = React.useMemo(() => {
//     if (!allProblems || !Array.isArray(allProblems)) return []
    
//     if (showAll) {
//       return allProblems
//     }
    
//     if (showVerified) {
//       return allProblems.filter(problem => 
//         problem.status === 'APPROVED' || problem.status === 'PENDING'
//       )
//     } else {
//       return allProblems.filter(problem => problem.status === 'PENDING')
//     }
//   }, [allProblems, showVerified, showAll])

//   // Pagination calculations
//   const totalPages = Math.ceil((problems?.length || 0) / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   const paginatedProblems = problems.slice(startIndex, endIndex)

//   // Reset to page 1 when filters change
//   React.useEffect(() => {
//     setCurrentPage(1)
//   }, [showVerified, showAll])

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const renderPagination = () => {
//     if (totalPages <= 1) return null

//     const pages: (number | string)[] = []
//     const maxVisiblePages = 5

//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total is small
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i)
//       }
//     } else {
//       // Always show first page
//       pages.push(1)

//       if (currentPage > 3) {
//         pages.push('...')
//       }

//       // Show pages around current page
//       const startPage = Math.max(2, currentPage - 1)
//       const endPage = Math.min(totalPages - 1, currentPage + 1)

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i)
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push('...')
//       }

//       // Always show last page
//       pages.push(totalPages)
//     }

//     return (
//       <div className="flex items-center justify-center gap-2 mt-6 mb-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-2"
//         >
//           Previous
//         </Button>

//         {pages.map((page, index) => {
//           if (page === '...') {
//             return (
//               <span key={`ellipsis-${index}`} className="px-2 text-gray-500 dark:text-gray-400">
//                 {page}
//               </span>
//             )
//           }

//           return (
//             <Button
//               key={page}
//               variant={currentPage === page ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => handlePageChange(page as number)}
//               className={`min-w-[2.5rem] px-3 py-2 ${
//                 currentPage === page 
//                   ? 'bg-primary text-white' 
//                   : 'bg-white dark:bg-gray-800'
//               }`}
//             >
//               {page}
//             </Button>
//           )
//         })}

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2"
//         >
//           Next
//         </Button>
//       </div>
//     )
//   }

//   // Handle API response notifications
//   useEffect(() => {
//     if (error) {
//       setNotification({
//         type: 'error',
//         message: 'Failed to fetch problems. Please try again.'
//       })
//     } else if (allProblems && allProblems.length > 0) {
//       setNotification({
//         type: 'success',
//         message: `Successfully loaded ${allProblems.length} problem${allProblems.length > 1 ? 's' : ''}`
//       })
//     }
//   }, [allProblems, error])

//   const showNotification = (type: string, message: string) => {
//     setNotification({ type, message })
//   }

//   const closeNotification = () => {
//     setNotification(null)
//   }

//   const handleRefresh = () => {
//     refetch()
//     showNotification('info', 'Refreshing problems...')
//   }

//   const handleEdit = async (problem: Problem) => {
//     console.log('=== EDIT BUTTON CLICKED ===')
//     console.log('Problem to edit:', problem)
//     console.log('Problem ID:', problem.id)
//     console.log('onEdit callback exists:', !!onEdit)
    
//     try {
//       if (onEdit) {
//         await onEdit(problem)
//         showNotification('info', `Opening editor for: ${problem.title} (ID: ${problem.id})`)
//         // Don't refetch here - let the actual edit save handle it
//       } else {
//         showNotification('info', 'Edit functionality - please implement onEdit prop')
//       }
//     } catch (error) {
//       console.error('Edit error:', error)
//       showNotification('error', 'Failed to initiate edit process')
//     }
//   }

//   const handleDelete = async (problem: Problem) => {
//     console.log('=== DELETE ATTEMPT START ===')
//     console.log('Problem to delete:', problem)
//     console.log('Delete function type:', typeof deleteProblem)
    
//     try {
//       if (!window.confirm(`Are you sure you want to delete "${problem.title}"?`)) {
//         console.log('Delete cancelled by user')
//         return
//       }

//       console.log('User confirmed deletion, proceeding...')
//       console.log('Calling deleteProblem with:', { problemId: problem.id })
      
//       showNotification('info', `Attempting to delete "${problem.title}"...`)
      
//       // Try the delete operation
//       const deletePromise = deleteProblem({ problemId: problem.id })
//       console.log('Delete promise created:', deletePromise)
      
//       const result = await deletePromise.unwrap()
      
//       console.log('=== DELETE SUCCESS ===')
//       console.log('Delete result:', result)
      
//       showNotification('success', `Problem "${problem.title}" deleted successfully!`)
      
//       // Refresh the data
//       refetch()
      
//       // Call onDelete callback if provided
//       if (onDelete) {
//         onDelete(problem)
//       }
      
//     } catch (error) {
//       console.log('=== DELETE ERROR DETAILS ===')
//       console.log('Raw error:', error)
//       console.log('Error type:', typeof error)
//       console.log('Error constructor:', error?.constructor?.name)
//       console.log('Error keys:', Object.keys(error || {}))
      
//       // Handle different error types
//       let errorMessage = 'Failed to delete problem'
      
//       if (error === "Delete API not available") {
//         errorMessage = 'Delete API is not properly configured. Check your imports.'
//       } else if (typeof error === 'string') {
//         errorMessage = error
//       } else if (error?.status) {
//         errorMessage = `Delete failed with status ${error.status}`
//         if (error?.data?.message) {
//           errorMessage += `: ${error.data.message}`
//         }
//       } else if (error?.message) {
//         errorMessage = `Delete failed: ${error.message}`
//       } else if (error && Object.keys(error).length === 0) {
//         errorMessage = 'Delete API call failed - empty error response. Check network tab for details.'
//       }
      
//       console.log('Final error message:', errorMessage)
//       showNotification('error', errorMessage)
//     }
//   }

//   // Debug logging
//   console.log('ProblemsTable render:', {
//     showVerified,
//     totalProblems: allProblems?.length,
//     filteredProblems: problems?.length,
//     hasModifyHook: typeof modifyProblem === 'function',
//     hasDeleteHook: typeof deleteProblem === 'function',
//   })

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             {showVerified ? 'All Problems' : 'Pending Problems'}
//           </h3>
//         </div>
        
//         <div className="flex items-center justify-center p-8">
//           <RefreshCw className="w-6 h-6 animate-spin mr-2" />
//           <span className="text-gray-600 dark:text-gray-300">
//             Loading {showAll ? 'all' : showVerified ? 'all' : 'pending'} problems...
//           </span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     const getErrorMessage = (err) => {
//       if (typeof err === 'string') return err
//       if (err?.message) return err.message
//       if (err?.data?.message) return err.data.message
//       if (err?.error) return err.error
//       if (err?.status) return `HTTP ${err.status} Error`
//       return 'Unknown error occurred'
//     }
    
//     const errorMessage = getErrorMessage(error)
    
//     if (error?.status === 401) {
//       return (
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//               {showVerified ? 'All Problems' : 'Pending Problems'}
//             </h3>
//           </div>
          
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
//                   <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
//                   <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
//                   <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
//                   <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
//                   <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
//                   <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell colSpan="6" className="text-center py-8">
//                     <div className="flex flex-col items-center space-y-4">
//                       <div className="text-red-500 dark:text-red-400 text-lg font-semibold">
//                         🔒 Authentication Required
//                       </div>
//                       <div className="text-gray-600 dark:text-gray-400">
//                         Your session has expired. Please log in again to view your problems.
//                       </div>
//                       <Button
//                         onClick={() => window.location.href = '/login'}
//                         className="mt-2"
//                       >
//                         Go to Login
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       )
//     }
    
//     return (
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             {showAll ? 'All Problems' : showVerified ? 'All Problems' : 'Pending Problems'} (Error)
//           </h3>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleRefresh}
//             className="flex items-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Retry
//           </Button>
//         </div>
        
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
//                 <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
//                 <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
//                 <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
//                 <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
//                 <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
//                 <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <TableRow>
//                 <TableCell colSpan="6" className="text-center py-8 text-red-500 dark:text-red-400">
//                   Error loading problems: {errorMessage}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={closeNotification}
//         />
//       )}
      
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           {showAll ? 'All Problems' : showVerified ? 'All Problems' : 'Pending Problems'} ({problems?.length || 0})
//         </h3>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             Showing {startIndex + 1}-{Math.min(endIndex, problems?.length || 0)} of {problems?.length || 0}
//           </span>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleRefresh}
//             className="flex items-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Refresh
//           </Button>
//         </div>
//       </div>
      
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
//               <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
//               <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
//               <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
//               <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
//               <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
//               <TableHead className="font-semibold text-gray-900 dark:text-white text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedProblems.length > 0 ? (
//               paginatedProblems.map((problem) => (
//                 <TableRow
//                   key={problem.id}
//                   className="hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-200 group"
//                 >
//                   <TableCell className="font-medium text-gray-900 dark:text-white">{problem.id}</TableCell>
//                   <TableCell className="font-medium text-gray-900 dark:text-white">
//                     <div>
//                       <div>{problem.title}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {problem.coin} coins • {problem.star} stars
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     {problem.difficulty ? (
//                       <Badge className={`${getDifficultyColor(problem.difficulty)} shadow-md`}>
//                         {problem.difficulty}
//                       </Badge>
//                     ) : (
//                       <span className="text-gray-500 dark:text-gray-400">-</span>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Badge className={`${getStatusColor(problem.status)} shadow-md`}>
//                       {problem.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex flex-wrap gap-1">
//                       {problem.tag_names?.length > 0 ? (
//                         problem.tag_names.slice(0, 3).map((tag, index) => (
//                           <Badge 
//                             key={index}
//                             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500"
//                           >
//                             {tag}
//                           </Badge>
//                         ))
//                       ) : (
//                         <span className="text-gray-500 dark:text-gray-400">-</span>
//                       )}
//                       {problem.tag_names?.length > 3 && (
//                         <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
//                           +{problem.tag_names.length - 3}
//                         </Badge>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-1">
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 group-hover:scale-105 p-2"
//                         onClick={() => handleEdit(problem)}
//                         title="Edit problem"
//                         disabled={modifyState.isLoading}
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 group-hover:scale-105 p-2"
//                         onClick={() => handleDelete(problem)}
//                         title="Delete problem"
//                         disabled={deleteState.isLoading}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan="6" className="text-center py-8 text-gray-500 dark:text-gray-400">
//                   No {showAll ? 'problems' : showVerified ? 'problems' : 'pending problems'} found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
      
//       {renderPagination()}
//     </div>
//   )
// }


import React, { useEffect } from "react"
import { Edit, Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { useGetMyProblemsQuery, Problem } from "@/lib/services/creator-dashboard/problem/displayAllProblemsApi"
import { useModifyProblemMutation } from "@/lib/services/creator-dashboard/problem/modifyProblemsApi"
import { useDeleteProblemMutation } from "@/lib/services/creator-dashboard/problem/deletedProblemsApi"

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

// Notification Component
const Notification = ({ type, message, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-200"
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 ${colors[type]}`}>
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        ×
      </button>
    </div>
  )
}

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

function getStatusColor(status) {
  switch (status) {
    case "APPROVED":
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
    case "PENDING":
      return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
    case "REJECTED":
      return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
  }
}

interface ProblemsTableProps {
  showVerified?: boolean;
  showAll?: boolean;
  onEdit?: (problem: Problem) => void;
  onDelete?: (problem: Problem) => void;
}

export default function ProblemsTable({ 
  showVerified = true, 
  showAll = false,
  onEdit, 
  onDelete 
}: ProblemsTableProps) {
  const [notification, setNotification] = React.useState<{type: string, message: string} | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5
  
  // Fetch problems from API
  const { 
    data: allProblems = [], 
    isLoading, 
    error,
    refetch
  } = useGetMyProblemsQuery()

  // Use the API hooks with proper imports
  const [modifyProblem, modifyState] = useModifyProblemMutation()
  const [deleteProblem, deleteState] = useDeleteProblemMutation()

  // Manual filtering based on showVerified and showAll props
  const problems = React.useMemo(() => {
    if (!allProblems || !Array.isArray(allProblems)) return []
    
    if (showAll) {
      return allProblems
    }
    
    if (showVerified) {
      return allProblems.filter(problem => 
        problem.status === 'APPROVED' || problem.status === 'PENDING'
      )
    } else {
      return allProblems.filter(problem => problem.status === 'PENDING')
    }
  }, [allProblems, showVerified, showAll])

  // Pagination calculations
  const totalPages = Math.ceil((problems?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProblems = problems.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [showVerified, showAll])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2"
        >
          Previous
        </Button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500 dark:text-gray-400">
                {page}
              </span>
            )
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page as number)}
              className={`min-w-[2.5rem] px-3 py-2 ${
                currentPage === page 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              {page}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2"
        >
          Next
        </Button>
      </div>
    )
  }

  // Handle API response notifications
  useEffect(() => {
    if (error) {
      setNotification({
        type: 'error',
        message: 'Failed to fetch problems. Please try again.'
      })
    } else if (allProblems && allProblems.length > 0) {
      setNotification({
        type: 'success',
        message: `Successfully loaded ${allProblems.length} problem${allProblems.length > 1 ? 's' : ''}`
      })
    }
  }, [allProblems, error])

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message })
  }

  const closeNotification = () => {
    setNotification(null)
  }

  const handleRefresh = () => {
    refetch()
    showNotification('info', 'Refreshing problems...')
  }

  const handleEdit = async (problem: Problem) => {
    console.log('=== EDIT BUTTON CLICKED ===')
    console.log('Problem to edit:', problem)
    console.log('Problem ID:', problem.id)
    console.log('onEdit callback exists:', !!onEdit)
    
    try {
      if (onEdit) {
        await onEdit(problem)
        showNotification('info', `Opening editor for: ${problem.title} (ID: ${problem.id})`)
        // Don't refetch here - let the actual edit save handle it
      } else {
        showNotification('info', 'Edit functionality - please implement onEdit prop')
      }
    } catch (error) {
      console.error('Edit error:', error)
      showNotification('error', 'Failed to initiate edit process')
    }
  }

  const handleDelete = async (problem: Problem) => {
    console.log('=== DELETE ATTEMPT START ===')
    console.log('Problem to delete:', problem)
    console.log('Delete function type:', typeof deleteProblem)
    
    try {
      if (!window.confirm(`Are you sure you want to delete "${problem.title}"?`)) {
        console.log('Delete cancelled by user')
        return
      }

      console.log('User confirmed deletion, proceeding...')
      console.log('Calling deleteProblem with:', { problemId: problem.id })
      
      showNotification('info', `Attempting to delete "${problem.title}"...`)
      
      // Try the delete operation
      const deletePromise = deleteProblem({ problemId: problem.id })
      console.log('Delete promise created:', deletePromise)
      
      const result = await deletePromise.unwrap()
      
      console.log('=== DELETE SUCCESS ===')
      console.log('Delete result:', result)
      
      showNotification('success', `Problem "${problem.title}" deleted successfully!`)
      
      // Refresh the data
      refetch()
      
      // Call onDelete callback if provided
      if (onDelete) {
        onDelete(problem)
      }
      
    } catch (error) {
      console.log('=== DELETE ERROR DETAILS ===')
      console.log('Raw error:', error)
      console.log('Error type:', typeof error)
      console.log('Error constructor:', error?.constructor?.name)
      console.log('Error keys:', Object.keys(error || {}))
      
      // Handle different error types
      let errorMessage = 'Failed to delete problem'
      
      if (typeof error === 'string') {
        errorMessage = error
      } else if (error?.status) {
        errorMessage = `Delete failed with status ${error.status}`
        if (error?.data?.message) {
          errorMessage += `: ${error.data.message}`
        }
      } else if (error?.message) {
        errorMessage = `Delete failed: ${error.message}`
      } else if (error && Object.keys(error).length === 0) {
        errorMessage = 'Delete API call failed - empty error response. Check network tab for details.'
      }
      
      console.log('Final error message:', errorMessage)
      showNotification('error', errorMessage)
    }
  }

  // Debug logging
  console.log('ProblemsTable render:', {
    showVerified,
    totalProblems: allProblems?.length,
    filteredProblems: problems?.length,
    hasModifyHook: typeof modifyProblem === 'function',
    hasDeleteHook: typeof deleteProblem === 'function',
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {showVerified ? 'All Problems' : 'Pending Problems'}
          </h3>
        </div>
        
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span className="text-gray-600 dark:text-gray-300">
            Loading {showAll ? 'all' : showVerified ? 'all' : 'pending'} problems...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    const getErrorMessage = (err) => {
      if (typeof err === 'string') return err
      if (err?.message) return err.message
      if (err?.data?.message) return err.data.message
      if (err?.error) return err.error
      if (err?.status) return `HTTP ${err.status} Error`
      return 'Unknown error occurred'
    }
    
    const errorMessage = getErrorMessage(error)
    
    if (error?.status === 401) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {showVerified ? 'All Problems' : 'Pending Problems'}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
                  <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan="6" className="text-center py-8">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-red-500 dark:text-red-400 text-lg font-semibold">
                        🔒 Authentication Required
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Your session has expired. Please log in again to view your problems.
                      </div>
                      <Button
                        onClick={() => window.location.href = '/login'}
                        className="mt-2"
                      >
                        Go to Login
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {showAll ? 'All Problems' : showVerified ? 'All Problems' : 'Pending Problems'} (Error)
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
                <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan="6" className="text-center py-8 text-red-500 dark:text-red-400">
                  Error loading problems: {errorMessage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {showAll ? 'All Problems' : showVerified ? 'All Problems' : 'Pending Problems'} ({problems?.length || 0})
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, problems?.length || 0)} of {problems?.length || 0}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
              <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => (
                <TableRow
                  key={problem.id}
                  className="hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-200 group"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">{problem.id}</TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <div>
                      <div>{problem.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {problem.coin} coins • {problem.star} stars
                      </div>
                    </div>
                  </TableCell>
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
                    <Badge className={`${getStatusColor(problem.status)} shadow-md`}>
                      {problem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {problem.tag_names?.length > 0 ? (
                        problem.tag_names.slice(0, 3).map((tag, index) => (
                          <Badge 
                            key={index}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">-</span>
                      )}
                      {problem.tag_names?.length > 3 && (
                        <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          +{problem.tag_names.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 group-hover:scale-105 p-2"
                        onClick={() => handleEdit(problem)}
                        title="Edit problem"
                        disabled={modifyState.isLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 group-hover:scale-105 p-2"
                        onClick={() => handleDelete(problem)}
                        title="Delete problem"
                        disabled={deleteState.isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No {showAll ? 'problems' : showVerified ? 'problems' : 'pending problems'} found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {renderPagination()}
    </div>
  )
}