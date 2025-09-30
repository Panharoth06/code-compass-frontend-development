import React, { useEffect, useState } from "react"
import { Edit, Trash2, RefreshCw, CheckCircle, Clock, AlertCircle, MoreVertical, Plus, X, Award, Package, ChevronDown, ChevronRight, Code, Hash } from "lucide-react"
import { useGetAllPackagesByAuthorQuery } from "@/lib/services/creator-dashboard/package/displayAllPackageApi"
import { useModifyPackageMutation } from "@/lib/services/creator-dashboard/package/modifyPackageApi"
import { useDeletePackageMutation } from "@/lib/services/creator-dashboard/package/deletePackageApi"
import { useAddProblemsToPackageMutation } from "@/lib/services/creator-dashboard/package/addProblemApi"
import { useAddBadgeToPackageMutation } from "@/lib/services/creator-dashboard/package/addBadgeApi"
import AddProblemModal from "./Add-Function/AddProblemToPackage"
import AddBadgeModal from "./Add-Function/AddBadgeToPackage"

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
  <div className="w-full overflow-auto rounded-xl border-2 border-gray-200 dark:border-gray-700">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

const TableHeader = ({ children }) => (
  <thead className="bg-gray-50 dark:bg-gray-800 [&_tr]:border-b-2 [&_tr]:border-gray-200 dark:[&_tr]:border-gray-700">{children}</thead>
)

const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>

const TableRow = ({ children, className = "", onClick }) => (
  <tr className={`border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${onClick ? 'cursor-pointer' : ''} ${className}`} onClick={onClick}>{children}</tr>
)

const TableHead = ({ children, className = "" }) => (
  <th
    className={`h-14 px-6 text-left align-middle font-bold text-gray-700 dark:text-gray-200 [&:has([role=checkbox])]:pr-0 ${className}`}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "" }) => (
  <td className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
)

// Dropdown Menu Components
const DropdownMenu = ({ children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DropdownMenuTrigger) {
            return React.cloneElement(child, {
              onClick: (e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              },
              isOpen,
            })
          } else if (child.type === DropdownMenuContent) {
            return isOpen
              ? React.cloneElement(child, {
                  onClose: () => setIsOpen(false),
                })
              : null
          }
        }
        return child
      })}
    </div>
  )
}

const DropdownMenuTrigger = ({ children, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className="h-9 w-9 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200 flex items-center justify-center border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
    title="More actions"
  >
    <MoreVertical className="w-5 h-5 text-gray-700 dark:text-gray-200" />
  </button>
)

const DropdownMenuContent = ({ children, onClose }) => (
  <>
    <div className="fixed inset-0 z-40" onClick={onClose} />
    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
      <div className="p-1.5">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClose,
            })
          }
          return child
        })}
      </div>
    </div>
  </>
)

const DropdownMenuItem = ({ children, onClick, onClose, className = "" }) => (
  <div
    className={`relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 font-medium ${className}`}
    onClick={(e) => {
      e.stopPropagation()
      onClick?.()
      onClose?.()
    }}
  >
    {children}
  </div>
)

// Enhanced Notification component with progress bar
const Notification = ({ type, message, onClose, autoClose = true }) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (!autoClose) return
    
    const duration = 5000
    const interval = 50
    const decrement = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement
        if (newProgress <= 0) {
          clearInterval(timer)
          setTimeout(() => onClose(), 0)
          return 0
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [autoClose, onClose])

  const config = {
    success: {
      bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: <CheckCircle className="w-5 h-5" />,
      progressColor: 'bg-green-700',
      borderColor: 'border-green-400'
    },
    error: {
      bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
      icon: <AlertCircle className="w-5 h-5" />,
      progressColor: 'bg-red-700',
      borderColor: 'border-red-400'
    },
    info: {
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: <Clock className="w-5 h-5" />,
      progressColor: 'bg-blue-700',
      borderColor: 'border-blue-400'
    },
    warning: {
      bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      icon: <AlertCircle className="w-5 h-5" />,
      progressColor: 'bg-yellow-700',
      borderColor: 'border-yellow-400'
    }
  }

  const currentConfig = config[type] || config.info

  return (
    <div className={`fixed top-4 right-4 ${currentConfig.bgColor} text-white rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 transform animate-in slide-in-from-top-5 border-2 ${currentConfig.borderColor} max-w-md`}>
      <div className="px-6 py-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {currentConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm leading-relaxed break-words">{message}</p>
        </div>
        <button 
          onClick={onClose} 
          className="ml-2 hover:bg-white/20 rounded-lg p-1.5 transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {autoClose && (
        <div className="h-1 bg-white/20">
          <div 
            className={`h-full ${currentConfig.progressColor} transition-all duration-50 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    APPROVED: {
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-2 border-green-300 dark:border-green-700",
      icon: <CheckCircle className="w-3 h-3 mr-1" />
    },
    PENDING: {
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-2 border-yellow-300 dark:border-yellow-700",
      icon: <Clock className="w-3 h-3 mr-1" />
    }
  }

  const config = statusConfig[status] || statusConfig.PENDING

  return (
    <Badge className={config.className}>
      {config.icon}
      {status}
    </Badge>
  )
}

// Badge Name Component
const BadgeName = ({ badge }) => {
  if (!badge || !badge.name) {
    return (
      <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400 border-2 border-gray-300 dark:border-gray-700">
        <Package className="w-3 h-3 mr-1" />
        No Badge
      </Badge>
    )
  }

  return (
    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300 border-2 border-purple-300 dark:border-purple-700">
      <Award className="w-3 h-3 mr-1" />
      {badge.name}
    </Badge>
  )
}

// Difficulty Badge Component
const DifficultyBadge = ({ difficulty }) => {
  const difficultyConfig = {
    EASY: {
      className: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700",
      text: "Easy"
    },
    MEDIUM: {
      className: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700",
      text: "Medium"
    },
    HARD: {
      className: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700",
      text: "Hard"
    }
  }

  const config = difficultyConfig[difficulty] || difficultyConfig.MEDIUM

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold border ${config.className}`}>
      {config.text}
    </span>
  )
}

// Problem Details Row Component
const ProblemDetailsRow = ({ problems, isVisible }) => {
  if (!isVisible || !problems || problems.length === 0) return null

  return (
    <TableRow className="bg-gray-50/50 dark:bg-gray-800/30 border-none">
      <TableCell colSpan={6} className="p-0">
        <div className="px-6 py-4 border-l-4 border-blue-400 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-4 h-4 text-blue-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Problems in this package:</h4>
            </div>
            
            <div className="grid gap-3">
              {problems.map((problem, index) => (
                <div 
                  key={problem.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all duration-200"
                  style={{
                    marginLeft: `${index * 20}px`,
                    maxWidth: `calc(100% - ${index * 20}px)`
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <h5 className="font-medium text-gray-900 dark:text-white">{problem.title}</h5>
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      ID: {problem.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}

interface PackagesTableProps {
  onEdit?: (item: Package) => void;
  onDelete?: (item: Package) => void;
  onAddProblem?: (item: Package) => void;
  onAddBadge?: (item: Package) => void;
}

export default function PackagesTable({ onEdit, onDelete, onAddProblem, onAddBadge }: PackagesTableProps) {
  const { data: packages, error, isLoading, refetch } = useGetAllPackagesByAuthorQuery()
  const [modifyPackage, { isLoading: isModifying }] = useModifyPackageMutation()
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation()
  const [addProblemsToPackage, { isLoading: isAddingProblem }] = useAddProblemsToPackageMutation()
  const [addBadgeToPackage, { isLoading: isAddingBadge }] = useAddBadgeToPackageMutation()
  const [notification, setNotification] = useState<{type: string, message: string, autoClose?: boolean} | null>(null)
  const [problemModalState, setProblemModalState] = useState<{isOpen: boolean, package: any | null}>({
    isOpen: false,
    package: null
  })
  const [badgeModalState, setBadgeModalState] = useState<{isOpen: boolean, package: any | null}>({
    isOpen: false,
    package: null
  })
  
  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const showNotification = (type: string, message: string, autoClose = true) => {
    setNotification({ type, message, autoClose })
  }

  useEffect(() => {
    if (notification && notification.autoClose !== false) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleRowClick = (packageId: number, event: React.MouseEvent) => {
    // Don't expand if clicking on action buttons
    if ((event.target as HTMLElement).closest('.dropdown-trigger')) {
      return
    }

    setExpandedRows(prev => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(packageId)) {
        newExpanded.delete(packageId)
      } else {
        newExpanded.add(packageId)
      }
      return newExpanded
    })
  }

  const handleRefresh = () => {
    refetch()
    showNotification('info', '🔄 Refreshing packages list...')
  }

  const handleEdit = (pkg: Package) => {
    if (onEdit) {
      onEdit(pkg)
    } else {
      showNotification('info', `✏️ Edit functionality for "${pkg.name}" needs to be implemented`)
    }
  }

  const handleDelete = async (pkg: Package) => {
    try {
      if (onDelete) {
        onDelete(pkg)
      } else {
        showNotification('warning', `⚠️ Deleting package "${pkg.name}"...`, false)
        
        await deletePackage({ id: pkg.id }).unwrap()
        showNotification('success', `✅ Package "${pkg.name}" has been successfully deleted!`)
        refetch()
        
        if (notification?.type === 'warning') {
          setNotification(null)
        }
      }
    } catch (err) {
      console.error("Failed to delete package:", err)
      const errorMessage = err?.data?.message || err?.message || "Failed to delete package"
      showNotification('error', `❌ Delete Failed: ${errorMessage}`)
    }
  }

  const handleAddProblemClick = (pkg: Package) => {
    if (onAddProblem) {
      onAddProblem(pkg)
    } else {
      if (pkg.problems?.length > 0) {
        showNotification('info', `📋 Package "${pkg.name}" currently has ${pkg.problems.length} problem(s). You can add more problems.`)
      }
      setProblemModalState({ isOpen: true, package: pkg })
    }
  }

  const handleAddBadgeClick = (pkg: Package) => {
    if (onAddBadge) {
      onAddBadge(pkg)
    } else {
      if (pkg.badgesResponse) {
        showNotification('warning', `🏆 Package "${pkg.name}" already has badge "${pkg.badgesResponse.name}". Each package can only have one badge.`)
        return
      }
      setBadgeModalState({ isOpen: true, package: pkg })
    }
  }

  const handleAddProblemSubmit = async (problemIds: number[]) => {
    try {
      showNotification('info', `🔄 Adding ${problemIds.length} problem(s) to package "${problemModalState.package.name}"...`, false)
      
      const result = await addProblemsToPackage({
        packageName: problemModalState.package.name,
        problemIds
      }).unwrap()

      const successMessage = `✅ Successfully added ${problemIds.length} problem(s) to package "${result.name}"! Package now has ${result.problems.length} total problems. Status: ${result.status}`
      
      showNotification('success', successMessage)
      setProblemModalState({ isOpen: false, package: null })
      refetch()
    } catch (err: any) {
      let errorMessage = "❌ Failed to add problems to package"
      
      if (err?.status === 'FETCH_ERROR') {
        errorMessage = "🌐 Network Error: Please check your connection and ensure the API server is running."
      } else if (err?.status === 'PARSING_ERROR') {
        errorMessage = "🔧 Server Error: Invalid response format received from server."
      } else if (err?.status === 401) {
        errorMessage = "🔐 Authentication Error: Please log in again to continue."
      } else if (err?.status === 403) {
        errorMessage = "🚫 Permission Error: You don't have permission to add problems to this package."
      } else if (err?.status === 404) {
        errorMessage = `🔍 Not Found: Package "${problemModalState.package?.name}" or some problem IDs were not found.`
      } else if (err?.status === 400) {
        const serverMsg = err?.data?.message || err?.data
        errorMessage = serverMsg ? `⚠️ Invalid Request: ${serverMsg}` : "⚠️ Invalid Request: Please check the problem IDs format."
      } else if (err?.data?.message) {
        errorMessage = `❌ Error: ${err.data.message}`
      } else if (err?.message) {
        errorMessage = `❌ Error: ${err.message}`
      } else if (typeof err === 'string') {
        errorMessage = `❌ Error: ${err}`
      }
      
      showNotification('error', errorMessage)
    }
  }

  const handleAddBadgeSubmit = async (badgeName: string) => {
    try {
      showNotification('info', `🏆 Adding badge "${badgeName}" to package "${badgeModalState.package.name}"...`, false)
      
      const result = await addBadgeToPackage({
        packageName: badgeModalState.package.name,
        badgeName
      }).unwrap()

      let successMessage = ''
      
      if (typeof result === 'string') {
        successMessage = `✅ ${result}`
      } else if (result?.message) {
        successMessage = `✅ ${result.message}`
      } else if (result) {
        successMessage = `✅ Badge "${badgeName}" successfully added to package "${badgeModalState.package.name}"!`
      } else {
        successMessage = `✅ Badge "${badgeName}" successfully added to package "${badgeModalState.package.name}"!`
      }

      showNotification('success', successMessage)
      setBadgeModalState({ isOpen: false, package: null })
      refetch()
    } catch (err: any) {
      let errorMessage = "❌ Failed to add badge to package"
      
      if (err?.status === 'FETCH_ERROR') {
        errorMessage = "🌐 Network Error: Please check your connection and ensure the API server is running."
      } else if (err?.status === 'PARSING_ERROR') {
        errorMessage = `🔧 Server Response Error: Unable to parse server response. Raw data: ${JSON.stringify(err?.data)}`
      } else if (err?.status === 401) {
        errorMessage = "🔐 Authentication Error: Please log in again to continue."
      } else if (err?.status === 403) {
        errorMessage = "🚫 Permission Error: You don't have permission to add badges to this package."
      } else if (err?.status === 404) {
        errorMessage = `🔍 Not Found: Package "${badgeModalState.package?.name}" or badge "${badgeName}" was not found.`
      } else if (err?.status === 400) {
        const serverMsg = err?.data?.message || err?.data
        errorMessage = serverMsg ? `⚠️ Invalid Request: ${serverMsg}` : `⚠️ Invalid Badge: Badge "${badgeName}" may already exist or be assigned to another package.`
      } else if (err?.status === 409) {
        errorMessage = `🔒 Conflict: Badge "${badgeName}" is already assigned to another package. Each badge can only belong to one package.`
      } else if (err?.data?.message) {
        errorMessage = `❌ Error: ${err.data.message}`
      } else if (err?.data && typeof err.data === 'string') {
        errorMessage = `❌ Error: ${err.data}`
      } else if (err?.message) {
        errorMessage = `❌ Error: ${err.message}`
      } else if (typeof err === 'string') {
        errorMessage = `❌ Error: ${err}`
      }
      
      showNotification('error', errorMessage)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-blue-500" />
        <span className="text-gray-600 dark:text-gray-300 font-medium">Loading packages...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
          autoClose={notification.autoClose !== false}
        />
      )}
      
      <AddProblemModal
        isOpen={problemModalState.isOpen}
        onClose={() => setProblemModalState({ isOpen: false, package: null })}
        packageInfo={problemModalState.package}
        onSubmit={handleAddProblemSubmit}
        isLoading={isAddingProblem}
      />

      <AddBadgeModal
        isOpen={badgeModalState.isOpen}
        onClose={() => setBadgeModalState({ isOpen: false, package: null })}
        packageInfo={badgeModalState.package}
        onSubmit={handleAddBadgeSubmit}
        isLoading={isAddingBadge}
      />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-500" />
          My Packages ({packages?.length || 0})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="flex items-center gap-2 border-2"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="font-bold text-gray-900 dark:text-white">Package Name</TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-white">Description</TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-white hidden sm:table-cell">Problems</TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-white">Badge</TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-white">Status</TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages && packages.length > 0 ? (
              packages.map((pkg) => (
                <React.Fragment key={pkg.id}>
                  <TableRow
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
                    onClick={(e) => handleRowClick(pkg.id, e)}
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        {expandedRows.has(pkg.id) ? (
                          <ChevronDown className="w-4 h-4 text-blue-500 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-blue-500 transition-transform duration-200" />
                        )}
                        <Package className="w-4 h-4 text-blue-500" />
                        {pkg.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300 max-w-xs">
                      <div className="truncate" title={pkg.description}>
                        {pkg.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(pkg.id, e)
                        }}
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800/50">
                          <Plus className="w-3 h-3 mr-1" />
                          {pkg.problems?.length || 0} problems
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell>
                      <BadgeName badge={pkg.badgesResponse} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={pkg.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end dropdown-trigger">
                        <DropdownMenu>
                          <DropdownMenuTrigger />
                          <DropdownMenuContent>
                            <DropdownMenuItem 
                              onClick={() => handleEdit(pkg)}
                              className="hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4 mr-3 text-blue-500" />
                              Edit Package
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleAddProblemClick(pkg)}
                              className="hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300"
                            >
                              <Plus className="w-4 h-4 mr-3 text-green-500" />
                              Add Problems
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleAddBadgeClick(pkg)}
                              className={`${
                                pkg.badgesResponse 
                                  ? "opacity-50 cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800" 
                                  : "hover:bg-yellow-50 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-300"
                              }`}
                            >
                              <Award className={`w-4 h-4 mr-3 ${pkg.badgesResponse ? 'text-gray-400' : 'text-yellow-500'}`} />
                              {pkg.badgesResponse ? "Badge Assigned" : "Add Badge"}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(pkg)}
                              className="hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 border-t-2 border-gray-200 dark:border-gray-700 mt-1 pt-2"
                            >
                              <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                              Delete Package
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  <ProblemDetailsRow 
                    problems={pkg.problems} 
                    isVisible={expandedRows.has(pkg.id)} 
                  />
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center gap-3">
                    <Package className="w-12 h-12 text-gray-300" />
                    <p className="font-bold text-lg">{error ? 'Failed to load packages' : 'No packages found'}</p>
                    <p className="text-sm">
                      {error 
                        ? 'Please try refreshing the page or check your connection' 
                        : 'Create your first package to get started'
                      }
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {(isModifying || isDeleting || isAddingProblem || isAddingBadge) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
            <span className="font-medium text-gray-900 dark:text-white">
              {isModifying && "Updating package..."}
              {isDeleting && "Deleting package..."}
              {isAddingProblem && "Adding problems to package..."}
              {isAddingBadge && "Adding badge to package..."}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}