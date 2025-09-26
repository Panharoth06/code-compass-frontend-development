"use client"

import React, { useState } from "react"
import { useCreatePackageMutation } from "@/lib/services/creator-dashboard/package/createPackageApi"

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md resize-none ${className}`}
    {...props}
  />
)

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-semibold text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
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
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-input hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
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

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child, {
              onClick: () => setIsOpen(!isOpen),
              selectedValue,
              isOpen,
            })
          } else if (child.type === SelectContent) {
            return isOpen
              ? React.cloneElement(child, {
                  onValueChange: handleValueChange,
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

const SelectTrigger = ({ onClick, selectedValue, isOpen }) => (
  <button
    type="button"
    className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
    onClick={onClick}
  >
    <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>
      {selectedValue || "Select difficulty level..."}
    </span>
    <svg
      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
)

const SelectValue = ({ children, placeholder }) => (
  <span className="text-muted-foreground">{children || placeholder}</span>
)

const SelectContent = ({ children, onValueChange, onClose }) => (
  <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-popover/95 backdrop-blur-md shadow-2xl animate-in">
    <div className="p-2">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onValueChange,
            onClose,
          })
        }
        return child
      })}
    </div>
  </div>
)

const SelectItem = ({ value, children, onValueChange, onClose }) => (
  <div
    className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-foreground outline-none hover:bg-primary/20 hover:text-primary transition-colors duration-200"
    onClick={() => {
      onValueChange?.(value)
      onClose?.()
    }}
  >
    {children}
  </div>
)

function CreatePackageForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    problems: "",
    badges: "",
    difficulty: "",
  })

  const [createPackage, { isLoading, error }] = useCreatePackageMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim()) {
      return
    }

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      }

      const result = await createPackage(payload).unwrap()

      // Reset form
      setFormData({
        name: "",
        description: "",
        problems: "",
        badges: "",
        difficulty: "",
      })

      // Call success callback if provided
      onSuccess?.(result)
    } catch (err) {
      console.error("Failed to create package:", err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Create New Package</h2>
        <p className="text-muted-foreground text-lg">Fill in the details below to create a new learning package</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Error: {error?.data?.message || "Something went wrong. Please try again."}</span>
          </div>
        </div>
      )}

      <div className="glass rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="packageName">Package Name *</Label>
            <Input
              id="packageName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter a descriptive package name"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="packageDescription">Package Description *</Label>
            <Textarea
              id="packageDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this package covers, its objectives, and target audience"
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="packageBadges">Badges (Optional)</Label>
              <Textarea
                id="packageBadges"
                value={formData.badges}
                onChange={(e) => setFormData({ ...formData, badges: e.target.value })}
                placeholder="List any badges or achievements that can be earned from this package"
                className="min-h-[100px]"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="packageDifficulty">Difficulty Level (Optional)</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">🟢 Beginner - Perfect for newcomers</SelectItem>
                  <SelectItem value="Intermediate">🟡 Intermediate - Some experience required</SelectItem>
                  <SelectItem value="Advanced">🔴 Advanced - For experienced learners</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <Button
            onClick={handleSubmit}
            className="w-full text-lg py-4"
            disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Package...</span>
              </div>
            ) : (
              "Create Package"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePackageForm
