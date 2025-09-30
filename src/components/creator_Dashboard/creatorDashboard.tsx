"use client"

import React, { useState, useMemo } from "react"
import { Plus, Code, Award, Package, Sparkles, Filter, ChevronLeft, ChevronRight, X } from "lucide-react"
import CreateBadgeForm from "./create-new/badges/createBadge"
import CreatePackageForm from "./create-new/packages/createPackage"
import CreateProblemForm from "./create-new/problems/createProblem"
import AllItemsTable from "./filter-table/AllItemsTable"

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
  disabled = false,
  ...props
}) => {
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95 relative overflow-hidden"
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95 relative overflow-hidden"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
    lg: "h-12 px-8 text-lg",
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
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "", onClick }) => (
  <div
    className={`rounded-2xl border border-border bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
const Card = ({ children, className = "", onClick }) => (
  <div
    className={`rounded-2xl border border-border bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-2 p-6 ${className}`}>{children}</div>
const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-2 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-bold leading-none tracking-tight text-card-foreground ${className}`}>{children}</h3>
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-bold leading-none tracking-tight text-card-foreground ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
)

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Dialog = ({ children, open, onOpenChange }) => {
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen) => {
  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DialogTrigger) {
            return React.cloneElement(child, {
              onClick: () => handleOpenChange(true),
            return React.cloneElement(child, {
              onClick: () => handleOpenChange(true),
            })
          } else if (child.type === DialogContent) {
            return isOpen
              ? React.cloneElement(child, {
                  onClose: () => handleOpenChange(false),
              ? React.cloneElement(child, {
                  onClose: () => handleOpenChange(false),
                })
              : null
          }
        }
        return child
      })}
    </>
  )
}

const DialogTrigger = ({ children, onClick }) => <div onClick={onClick}>{children}</div>
const DialogTrigger = ({ children, onClick }) => <div onClick={onClick}>{children}</div>

const DialogContent = ({ children, onClose, className = "" }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
    onClick={onClose}
  >
const DialogContent = ({ children, onClose, className = "" }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
    onClick={onClose}
  >
    <div
      // customize size of dialog

      className={`glass rounded-3xl shadow-2xl max-w-5xl w-full max-h-[80vh] overflow-hidden border border-white/10 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative max-h-[65vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-primary transition-colors duration-200 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-accent"
        >
          <X className="w-5 h-5" />
      <div className="relative max-h-[65vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-primary transition-colors duration-200 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-accent"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-8">{children}</div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  </div>
)

// Form wrapper components to handle dialog integration
const ProblemFormWrapper = ({ onSuccess, editingProblem }) => {
  const handleSubmit = (formData) => {
    console.log("Problem created/updated:", formData)
    onSuccess?.()
  }

  return <CreateProblemForm onSubmit={handleSubmit} editingProblem={editingProblem} />
}

const BadgeFormWrapper = ({ onSuccess }) => {
  const handleSuccess = () => {
    console.log("Badge created successfully")
    onSuccess?.()
  }

  return <CreateBadgeForm onSuccess={handleSuccess} />
}

const PackageFormWrapper = ({ onSuccess }) => {
  const handleSuccess = (result) => {
    console.log("Package created successfully:", result)
    onSuccess?.()
  }

  return <CreatePackageForm onSuccess={handleSuccess} />
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
// Form wrapper components to handle dialog integration
const ProblemFormWrapper = ({ onSuccess, editingProblem }) => {
  const handleSubmit = (formData) => {
    console.log("Problem created/updated:", formData)
    onSuccess?.()
  }

  return <CreateProblemForm onSubmit={handleSubmit} editingProblem={editingProblem} />
}

const BadgeFormWrapper = ({ onSuccess }) => {
  const handleSuccess = () => {
    console.log("Badge created successfully")
    onSuccess?.()
  }

  return <CreateBadgeForm onSuccess={handleSuccess} />
}

const PackageFormWrapper = ({ onSuccess }) => {
  const handleSuccess = (result) => {
    console.log("Package created successfully:", result)
    onSuccess?.()
  }

  return <CreatePackageForm onSuccess={handleSuccess} />
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-primary/10 hover:border-primary"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={
            currentPage === page ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-primary/10 hover:border-primary"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-primary/10 hover:border-primary"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={
            currentPage === page ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-primary/10 hover:border-primary"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default function CreatorDashboard() {
  // Sample data - remove when connecting to API
  const [allItems] = useState([
  // Sample data - remove when connecting to API
  const [allItems] = useState([
    {
      id: 1,
      type: "problem",
      type: "problem",
      title: "Two Sum Array Challenge",
      difficulty: "Easy",
      category: "Array",
      submissions: 248,
      successRate: "90%",
      created: "3 days ago",
    },
    {
      id: 2,
      type: "problem",
      type: "problem",
      title: "Binary Tree Traversal",
      difficulty: "Medium",
      category: "Tree",
      submissions: 107,
      successRate: "75%",
      created: "5 days ago",
    },
    {
      id: 3,
      type: "badge",
      title: "Array Master Badge",
      category: "Achievement",
      submissions: 45,
      successRate: "85%",
      created: "1 week ago",
    },
    {
      id: 4,
      type: "package",
      title: "Data Structures Bundle",
      category: "Learning",
      submissions: 89,
      successRate: "80%",
      created: "2 weeks ago",
    },
    {
      id: 5,
      type: "problem",
      type: "badge",
      title: "Array Master Badge",
      category: "Achievement",
      submissions: 45,
      successRate: "85%",
      created: "1 week ago",
    },
    {
      id: 4,
      type: "package",
      title: "Data Structures Bundle",
      category: "Learning",
      submissions: 89,
      successRate: "80%",
      created: "2 weeks ago",
    },
    {
      id: 5,
      type: "problem",
      title: "Dynamic Programming Mastery",
      difficulty: "Hard",
      category: "Dynamic Programming",
      submissions: 315,
      successRate: "65%",
      created: "3 weeks ago",
    },
    {
      id: 6,
      type: "badge",
      title: "Problem Solver",
      category: "Achievement",
      submissions: 156,
      successRate: "92%",
      created: "1 month ago",
      created: "3 weeks ago",
    },
    {
      id: 6,
      type: "badge",
      title: "Problem Solver",
      category: "Achievement",
      submissions: 156,
      successRate: "92%",
      created: "1 month ago",
    },
  ])

  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProblem, setEditingProblem] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false)
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false)

  const itemsPerPage = 5

  // Filter data based on selected filter
  const filteredItems = useMemo(() => {
    if (filter === "all") return allItems
    return allItems.filter((item) => item.type === filter)
  }, [allItems, filter])

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const handleCreateProblem = (formData) => {
    console.log("Create Problem:", formData)
    // Form handles its own success/failure, just close dialog on success
  }

  const handleEditProblem = (formData) => {
    console.log("Edit Problem:", formData)
    setEditingProblem(null)
    // Form handles its own success/failure, just close dialog on success
  }

  const handleCreateBadge = () => {
    console.log("Create Badge")
    // Form handles its own success/failure, just close dialog on success
  }

  const handleCreatePackage = (result) => {
    console.log("Create Package:", result)
    // Form handles its own success/failure, just close dialog on success
  }

  const openEditDialog = (item) => {
    setEditingProblem(item)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      console.log("Delete item:", item.id)
  const openDeleteDialog = (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      console.log("Delete item:", item.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-white p-4 md:p-6">
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 float">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 float">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Creator Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
            Craft amazing coding problems, design achievement badges, and create comprehensive learning packages with
            our modern creator tools
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
            Craft amazing coding problems, design achievement badges, and create comprehensive learning packages with
            our modern creator tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary/80 text-sm font-semibold mb-1">Total Problems</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {allItems.filter((item) => item.type === "problem").length}
                  </p>
                  <p className="text-primary/80 text-sm font-semibold mb-1">Total Problems</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {allItems.filter((item) => item.type === "problem").length}
                  </p>
                </div>
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Code className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-2/20 to-chart-2/10 border-chart-2/20 hover:border-chart-2/40 transition-all duration-300">

          <Card className="bg-gradient-to-br from-chart-2/20 to-chart-2/10 border-chart-2/20 hover:border-chart-2/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-chart-2/80 text-sm font-semibold mb-1">Total Badges</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {allItems.filter((item) => item.type === "badge").length}
                  </p>
                  <p className="text-chart-2/80 text-sm font-semibold mb-1">Total Badges</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {allItems.filter((item) => item.type === "badge").length}
                  </p>
                </div>
                <div className="p-3 bg-chart-2/20 rounded-xl">
                  <Award className="w-6 h-6 text-chart-2" />
                </div>
                <div className="p-3 bg-chart-2/20 rounded-xl">
                  <Award className="w-6 h-6 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4/20 to-chart-4/10 border-chart-4/20 hover:border-chart-4/40 transition-all duration-300">

          <Card className="bg-gradient-to-br from-chart-4/20 to-chart-4/10 border-chart-4/20 hover:border-chart-4/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-chart-4/80 text-sm font-semibold mb-1">Total Packages</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {allItems.filter((item) => item.type === "package").length}
                  </p>
                  <p className="text-chart-4/80 text-sm font-semibold mb-1">Total Packages</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {allItems.filter((item) => item.type === "package").length}
                  </p>
                </div>
                <div className="p-3 bg-chart-4/20 rounded-xl">
                  <Package className="w-6 h-6 text-chart-4" />
                </div>
                <div className="p-3 bg-chart-4/20 rounded-xl">
                  <Package className="w-6 h-6 text-chart-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Code className="w-8 h-8 text-primary-foreground" />
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Code className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Create New Problem
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    Craft engaging coding challenges for learners
                  </CardDescription>
                  <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Create New Problem
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    Craft engaging coding challenges for learners
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Button className="w-full group-hover:shadow-lg bg-transparent" variant="outline">
                <CardContent className="p-6 pt-0">
                  <Button className="w-full group-hover:shadow-lg bg-transparent" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Problem
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <CreateProblemForm onSubmit={() => setIsCreateDialogOpen(false)} />
            <DialogContent>
              <CreateProblemForm onSubmit={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
          <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-chart-2/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-chart-2 to-chart-2/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-chart-2/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-chart-2 to-chart-2/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-chart-2 to-chart-2/80 bg-clip-text text-transparent">
                    Create New Badge
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    Design beautiful achievement badges
                  </CardDescription>
                  <CardTitle className="text-xl bg-gradient-to-r from-chart-2 to-chart-2/80 bg-clip-text text-transparent">
                    Create New Badge
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    Design beautiful achievement badges
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Button className="w-full group-hover:shadow-lg bg-transparent" variant="outline">
                <CardContent className="p-6 pt-0">
                  <Button className="w-full group-hover:shadow-lg bg-transparent" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Badge
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <BadgeFormWrapper onSuccess={() => setIsBadgeDialogOpen(false)} />
            <DialogContent>
              <BadgeFormWrapper onSuccess={() => setIsBadgeDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
          <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-chart-4/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-chart-4 to-chart-4/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-chart-4/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-chart-4 to-chart-4/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-chart-4 to-chart-4/80 bg-clip-text text-transparent">
                    Create New Package
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    Bundle problems and badges together
                  </CardDescription>
                  <CardTitle className="text-xl bg-gradient-to-r from-chart-4 to-chart-4/80 bg-clip-text text-transparent">
                    Create New Package
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    Bundle problems and badges together
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Button className="w-full group-hover:shadow-lg bg-transparent" variant="outline">
                <CardContent className="p-6 pt-0">
                  <Button className="w-full group-hover:shadow-lg bg-transparent" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Package
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <PackageFormWrapper onSuccess={() => setIsPackageDialogOpen(false)} />
            <DialogContent>
              <PackageFormWrapper onSuccess={() => setIsPackageDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <ProblemFormWrapper onSuccess={() => setIsEditDialogOpen(false)} editingProblem={editingProblem} />
          <DialogContent>
            <ProblemFormWrapper onSuccess={() => setIsEditDialogOpen(false)} editingProblem={editingProblem} />
          </DialogContent>
        </Dialog>

        <div className="flex flex-wrap gap-3 justify-start items-start">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button
            variant={filter === "problem" ? "default" : "outline"}
            onClick={() => setFilter("problem")}
            className={
              filter === "problem" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Code className="w-4 h-4 mr-2" />
            Problems
          </Button>
          <Button
            variant={filter === "badge" ? "default" : "outline"}
            onClick={() => setFilter("badge")}
            className={
              filter === "badge" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Award className="w-4 h-4 mr-2" />
            Badges
          </Button>
          <Button
            variant={filter === "package" ? "default" : "outline"}
            onClick={() => setFilter("package")}
            className={
              filter === "package" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Package className="w-4 h-4 mr-2" />
            Packages
          </Button>
        </div>

        <Card className="shadow-2xl border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-2xl border-b border-gray-200/50 dark:border-gray-700/50">
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              {filter === "all" && "All Items"}
              {filter === "problem" && "Problems"}
              {filter === "badge" && "Badges"}
              {filter === "package" && "Packages"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Manage your created content and track performance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <AllItemsTable items={paginatedItems} filter={filter} onEdit={openEditDialog} onDelete={openDeleteDialog} />
          
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
