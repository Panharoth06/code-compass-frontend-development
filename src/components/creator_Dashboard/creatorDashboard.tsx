"use client"

import React, { useState } from "react"
import { Plus, Edit, Trash2, Code, Award, Package, Sparkles, TrendingUp, Users } from "lucide-react"

interface Problem {
  id: number
  title: string
  hints: string[]
  difficulty: string
  category: string
  submissions: number
  successRate: string
  created: string
}

interface CreateProblemFormData {
  title: string
  hints: string[]
  testCases: string
  expectedOutput: string
  definition: string
  difficulty: string
  category: string
  tags: string
}

interface CreateBadgeFormData {
  title: string
  description: string
  icon: string
  packageLink: string
  image: File | null
}

interface CreatePackageFormData {
  name: string
  problems: string
  badges: string
  difficulty: string
}

interface DialogTriggerProps {
  children: React.ReactNode
  onClick?: () => void
}

interface DialogContentProps {
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

// Component interfaces for proper typing
interface ComponentProps {
  children: React.ReactNode
  className?: string
}

interface ButtonProps extends ComponentProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm"
  onClick?: () => void
  type?: "button" | "submit"
}

interface InputProps {
  className?: string
  type?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  accept?: string
}

interface TextareaProps {
  className?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

interface LabelProps extends ComponentProps {
  htmlFor?: string
}

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onValueChange?: (value: string) => void
  onClose?: () => void
}

interface TabsProps {
  children: React.ReactNode
  defaultValue?: string
  className?: string
}

interface TabsListProps {
  children: React.ReactNode
  activeTab?: string
  setActiveTab?: (tab: string) => void
  className?: string
}

interface TabsTriggerProps {
  children: React.ReactNode
  value: string
  activeTab?: string
  setActiveTab?: (tab: string) => void
  className?: string
}

interface TabsContentProps {
  children: React.ReactNode
  value: string
  activeTab?: string
  className?: string
}

// Simple Badge component
const Badge = ({ children, className = "" }: ComponentProps) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
)

// Simple Button component
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Simple Card components
const Card = ({
  children,
  className = "",
  onClick,
}: ComponentProps & { onClick?: () => void }) => (
  <div className={`rounded-xl border bg-card/50 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`} onClick={onClick}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: ComponentProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: ComponentProps) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }: ComponentProps) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
)

const CardContent = ({ children, className = "" }: ComponentProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

// Simple Input component
const Input = ({
  className = "",
  type = "text",
  ...props
}: InputProps) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    {...props}
  />
)

// Simple Textarea component
const Textarea = ({
  className = "",
  ...props
}: TextareaProps) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    {...props}
  />
)

// Simple Label component
const Label = ({
  children,
  htmlFor,
  className = "",
}: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
)

// Simple Select components
const Select = ({
  children,
  value,
  onValueChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<{ onClick?: () => void; selectedValue?: string }>,  { 
              onClick: () => setIsOpen(!isOpen), 
              selectedValue 
            })
          } else if (child.type === SelectContent) {
            return isOpen
             ? React.cloneElement(child as React.ReactElement<{ onValueChange?: (value: string) => void; onClose?: () => void }>, {
                  onValueChange: handleValueChange, 
                  onClose: () => setIsOpen(false) 
                })
              : null
          }
        }
        return child
      })}
    </div>
  )
}

const SelectTrigger = ({
  onClick,
  selectedValue,
}: { children: React.ReactNode; onClick?: () => void; selectedValue?: string }) => (
  <button
    type="button"
    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
    onClick={onClick}
  >
    <span>{selectedValue || "Select..."}</span>
    <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
)

const SelectValue = ({ children, placeholder }: { children?: React.ReactNode; placeholder?: string }) => (
  <span className="text-muted-foreground">
    {children || placeholder}
  </span>
)

const SelectContent = ({
  children,
  onValueChange,
  onClose,
}: { children: React.ReactNode; onValueChange?: (value: string) => void; onClose?: () => void }) => (
  <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover/95 backdrop-blur-md shadow-xl">
    <div className="p-1">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
            onValueChange, onClose
          })
        }
        return child
      })}
    </div>
  </div>
)

const SelectItem = ({
  value,
  children,
  onValueChange,
  onClose,
}: SelectItemProps) => (
  <div
    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
    onClick={() => {
      onValueChange?.(value)
      onClose?.()
    }}
  >
    {children}
  </div>
)

// Simple Table components with proper typing
const Table = ({ children, className = "" }: ComponentProps) => (
  <div className="w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="[&_tr]:border-b">{children}</thead>
)

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
)

const TableRow = ({ children, className = "" }: ComponentProps) => (
  <tr className={`border-b transition-colors ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }: ComponentProps) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
)

const TableCell = ({ children, className = "" }: ComponentProps) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
)

// Simple Dialog components
const Dialog = ({
  children,
  open,
  onOpenChange,
}: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DialogTrigger) {
            return React.cloneElement(child as React.ReactElement<DialogTriggerProps>, { 
              onClick: () => handleOpenChange(true) 
            })
          } else if (child.type === DialogContent) {
            return isOpen
              ? React.cloneElement(child as React.ReactElement<DialogContentProps>, { 
                  onClose: () => handleOpenChange(false) 
                })
              : null
          }
        }
        return child
      })}
    </>
  )
}

const DialogTrigger = ({
  children,
  onClick,
}: DialogTriggerProps) => <div onClick={onClick}>{children}</div>

const DialogContent = ({
  children,
  onClose,
  className = "",
}: DialogContentProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
    <div
      className={`bg-background/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-lg w-full border ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  </div>
)

const DialogHeader = ({ children, className = "" }: ComponentProps) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`}>{children}</div>
)

const DialogTitle = ({ children, className = "" }: ComponentProps) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const DialogDescription = ({ children, className = "" }: ComponentProps) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
)

// Simple Tabs components with proper typing
const Tabs = ({ children, defaultValue, className = "" }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || "")

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<TabsListProps | TabsContentProps>, { 
            activeTab, 
            setActiveTab 
          })
        }
        return child
      })}
    </div>
  )
}

const TabsList = ({ children, activeTab, setActiveTab, className = "" }: TabsListProps) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-lg bg-muted/50 backdrop-blur-sm p-1 text-muted-foreground ${className}`}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<TabsTriggerProps>, { 
          activeTab, 
          setActiveTab 
        })
      }
      return child
    })}
  </div>
)

const TabsTrigger = ({
  children,
  value,
  activeTab,
  setActiveTab,
  className = "",
}: TabsTriggerProps) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === value ? "bg-background text-foreground shadow-sm" : ""} ${className}`}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
)

const TabsContent = ({
  children,
  value,
  activeTab,
  className = "",
}: TabsContentProps) =>
  activeTab === value ? (
    <div
      className={`mt-2 font-barlow ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  ) : null

// Mock data for admin responses
const mockAdminResponses = [
  {
    message: "Problem approved and published",
    status: "Approved",
    date: "2 days ago",
  },
  {
    message: "Badge request pending review",
    status: "Pending",
    date: "5 days ago",
  },
  {
    message: "Package rejected - missing test cases",
    status: "Rejected",
    date: "7 days ago",
  },
]

function CreateProblemForm({
  onSubmit,
  editingProblem,
}: { onSubmit: (data: CreateProblemFormData) => void; editingProblem?: Problem | null }) {
  const [formData, setFormData] = useState<CreateProblemFormData>({
    title: editingProblem?.title || "",
    hints: editingProblem?.hints?.length ? editingProblem.hints : [""],
    testCases: "",
    expectedOutput: "",
    definition: "",
    difficulty: editingProblem?.difficulty || "",
    category: editingProblem?.category || "",
    tags: "",
  })

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...formData.hints]
    newHints[index] = value
    setFormData({ ...formData, hints: newHints })
  }

  const addHint = () => {
    if (formData.hints.length < 3) {
      setFormData({ ...formData, hints: [...formData.hints, ""] })
    }
  }

  const removeHint = (index: number) => {
    if (formData.hints.length > 1) {
      const newHints = [...formData.hints]
      newHints.splice(index, 1)
      setFormData({ ...formData, hints: newHints })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredHints = formData.hints.filter(hint => hint.trim() !== "")
    onSubmit({ ...formData, hints: filteredHints })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Problem Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter problem title"
        />
      </div>
      
      <div className="space-y-3">
        <Label>Hints (max 3)</Label>
        {formData.hints.map((hint, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={hint}
              onChange={(e) => handleHintChange(index, e.target.value)}
              placeholder={`Hint ${index + 1}`}
            />
            {formData.hints.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeHint(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transform-none shadow-none"
              >
                ✕
              </Button>
            )}
          </div>
        ))}
        {formData.hints.length < 3 && (
          <Button
            type="button"
            variant="ghost"
            onClick={addHint}
            className="mt-2 px-3 py-1 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transform-none shadow-none"
          >
            + Add Hint
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="definition">Problem Definition</Label>
        <Textarea
          id="definition"
          value={formData.definition}
          onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
          placeholder="Describe the problem"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="testCases">Test Cases</Label>
        <Textarea
          id="testCases"
          value={formData.testCases}
          onChange={(e) => setFormData({ ...formData, testCases: e.target.value })}
          placeholder="Enter test cases"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expectedOutput">Expected Output</Label>
        <Textarea
          id="expectedOutput"
          value={formData.expectedOutput}
          onChange={(e) => setFormData({ ...formData, expectedOutput: e.target.value })}
          placeholder="Enter expected output"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Array">Array</SelectItem>
              <SelectItem value="String">String</SelectItem>
              <SelectItem value="Tree">Tree</SelectItem>
              <SelectItem value="Graph">Graph</SelectItem>
              <SelectItem value="Dynamic Programming">Dynamic Programming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Enter tags (comma separated)"
        />
      </div>
      
      <Button type="submit" className="w-full">
        {editingProblem ? "Update Problem" : "Create Problem"}
      </Button>
    </form>
  )
}

function CreateBadgeForm() {
  const [formData, setFormData] = useState<CreateBadgeFormData>({
    title: "",
    description: "",
    icon: "",
    packageLink: "",
    image: null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Create Badge:", {
      ...formData,
      image: formData.image
        ? {
            name: formData.image.name,
            size: formData.image.size,
            type: formData.image.type,
          }
        : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="badgeTitle">Badge Title</Label>
        <Input
          id="badgeTitle"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter badge title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="badgeDescription">Description</Label>
        <Textarea
          id="badgeDescription"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the badge"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="badgeImage">Badge Image</Label>
        <Input id="badgeImage" type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
        {imagePreview && (
          <div className="mt-3">
            <div 
              className="w-20 h-20 bg-cover bg-center rounded-xl border-2 border-gray-300 shadow-lg"
              style={{ backgroundImage: `url(${imagePreview})` }}
              role="img"
              aria-label="Badge preview"
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="badgeIcon">Icon</Label>
          <Input
            id="badgeIcon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Enter icon name or URL"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="packageLink">Package Link</Label>
          <Input
            id="packageLink"
            value={formData.packageLink}
            onChange={(e) => setFormData({ ...formData, packageLink: e.target.value })}
            placeholder="Enter package link"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Create Badge
      </Button>
    </form>
  )
}

function CreatePackageForm() {
  const [formData, setFormData] = useState<CreatePackageFormData>({
    name: "",
    problems: "",
    badges: "",
    difficulty: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Create Package:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="packageName">Package Name</Label>
        <Input
          id="packageName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter package name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="packageProblems">Add Problems</Label>
        <Textarea
          id="packageProblems"
          value={formData.problems}
          onChange={(e) => setFormData({ ...formData, problems: e.target.value })}
          placeholder="List problems to include"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="packageBadges">Add Badges</Label>
        <Textarea
          id="packageBadges"
          value={formData.badges}
          onChange={(e) => setFormData({ ...formData, badges: e.target.value })}
          placeholder="List badges to include"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="packageDifficulty">Package Difficulty</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full">
        Create Package
      </Button>
    </form>
  )
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
    case "Medium":
      return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
    case "Hard":
      return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Approved":
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
    case "Pending":
      return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-500"
    case "Rejected":
      return "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500"
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-600 text-white border-gray-500"
  }
}

export default function CreatorDashboard() {
  const [problems, setProblems] = useState<Problem[]>([
    {
      id: 1,
      title: "Two Sum Array Challenge",
      hints: ["Find two numbers that add up to target", "Use hash map for O(n) solution"],
      difficulty: "Easy",
      category: "Array",
      submissions: 248,
      successRate: "90%",
      created: "3 days ago",
    },
    {
      id: 2,
      title: "Binary Tree Traversal",
      hints: ["Implement BFS and DFS algorithms", "Consider recursive and iterative approaches"],
      difficulty: "Medium",
      category: "Tree",
      submissions: 107,
      successRate: "75%",
      created: "5 days ago",
    },
    {
      id: 3,
      title: "Dynamic Programming Mastery",
      hints: ["Advanced DP techniques and optimization", "Break down into subproblems", "Use memoization"],
      difficulty: "Hard",
      category: "Dynamic Programming",
      submissions: 315,
      successRate: "65%",
      created: "7 days ago",
    },
  ])

  const [editingProblem, setEditingProblem] = useState<Problem | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleCreateProblem = (formData: CreateProblemFormData) => {
    const newProblem: Problem = {
      id: problems.length + 1,
      title: formData.title,
      hints: formData.hints,
      difficulty: formData.difficulty,
      category: formData.category,
      submissions: 0,
      successRate: "0%",
      created: "Just now",
    }
    setProblems([...problems, newProblem])
    setIsCreateDialogOpen(false)
    console.log("Create Problem:", formData)
  }

  const handleEditProblem = (formData: CreateProblemFormData) => {
    if (editingProblem) {
      setProblems(
        problems.map((p) =>
          p.id === editingProblem.id
            ? {
                ...p,
                title: formData.title,
                hints: formData.hints,
                difficulty: formData.difficulty,
                category: formData.category,
              }
            : p,
        ),
      )
      setEditingProblem(null)
      setIsEditDialogOpen(false)
      console.log("Edit Problem:", formData)
    }
  }

  const handleDeleteProblem = (id: number) => {
    setProblems(problems.filter((p) => p.id !== id))
    console.log("Delete Problem:", id)
  }

  const openEditDialog = (problem: Problem) => {
    setEditingProblem(problem)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (problem: Problem) => {
    if (confirm(`Are you sure you want to delete "${problem.title}"?`)) {
      handleDeleteProblem(problem.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-gray-100 p-6">
      {/* Animated Background Elements */}
     

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Creator Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto">
            Craft amazing coding problems, design achievement badges, and create comprehensive learning packages
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Problems</p>
                  <p className="text-3xl font-bold">{problems.length}</p>
                </div>
                <Code className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Submissions</p>
                  <p className="text-3xl font-bold">{problems.reduce((acc, p) => acc + p.submissions, 0)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-pink-600 to-pink-700 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm font-medium">Avg Success Rate</p>
                  <p className="text-3xl font-bold">77%</p>
                </div>
                <Users className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Top Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-blue-300 dark:hover:border-blue-600 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create New Problem</CardTitle>
                  <CardDescription>Craft engaging coding challenges for learners</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:shadow-lg" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Problem
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Problem</DialogTitle>
                <DialogDescription>Fill in the details to create a new coding problem</DialogDescription>
              </DialogHeader>
              <CreateProblemForm onSubmit={handleCreateProblem} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-yellow-300 dark:hover:border-yellow-600 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Create New Badge</CardTitle>
                  <CardDescription>Design beautiful achievement badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:shadow-lg" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Badge
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Badge</DialogTitle>
                <DialogDescription>Design a new achievement badge</DialogDescription>
              </DialogHeader>
              <CreateBadgeForm />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Create New Package</CardTitle>
                  <CardDescription>Bundle problems and badges together</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:shadow-lg" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Package
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Package</DialogTitle>
                <DialogDescription>Bundle problems and badges into a comprehensive package</DialogDescription>
              </DialogHeader>
              <CreatePackageForm />
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Problem</DialogTitle>
              <DialogDescription>Update the problem details</DialogDescription>
            </DialogHeader>
            <CreateProblemForm onSubmit={handleEditProblem} editingProblem={editingProblem} />
          </DialogContent>
        </Dialog>

        {/* Enhanced Tabbed Content */}
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="problems" className="text-sm font-medium">
              Problems Created
            </TabsTrigger>
            <TabsTrigger value="responses" className="text-sm font-medium">
              Admin Responses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="space-y-4">
            <Card className="border-0 shadow-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-t-xl">
                <CardTitle className="text-2xl">Problems Created</CardTitle>
                <CardDescription>Manage your coding problems and track their performance</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead className="font-semibold">Problem Title</TableHead>
                      <TableHead className="font-semibold">Difficulty</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Submissions</TableHead>
                      <TableHead className="font-semibold">Success Rate</TableHead>
                      <TableHead className="font-semibold">Created</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {problems.map((problem) => (
                      <TableRow key={problem.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200 group">
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">{problem.title}</TableCell>
                        <TableCell>
                          <Badge className={`${getDifficultyColor(problem.difficulty)} shadow-md`}>{problem.difficulty}</Badge>
                        </TableCell>
                        <TableCell className="font-medium text-purple-600 dark:text-purple-400">{problem.category}</TableCell>
                        <TableCell className="font-semibold text-blue-600 dark:text-blue-400">{problem.submissions}</TableCell>
                        <TableCell className="font-semibold text-green-600 dark:text-green-400">{problem.successRate}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{problem.created}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 group-hover:scale-105"
                              onClick={() => openEditDialog(problem)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 group-hover:scale-105"
                              onClick={() => openDeleteDialog(problem)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <Card className="border-0 shadow-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-t-xl">
                <CardTitle className="text-2xl">Admin Responses</CardTitle>
                <CardDescription>View feedback and messages from administrators</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead className="font-semibold">Message</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAdminResponses.map((response, index) => (
                      <TableRow key={index} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-200">
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">{response.message}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(response.status)} shadow-md`}>{response.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">{response.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}