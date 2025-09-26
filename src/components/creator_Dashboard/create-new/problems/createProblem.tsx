"use client"

import React, { useState } from "react"
import { useCreateProblemMutation } from "@/lib/services/creator-dashboard/problem/createProblemApi"

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
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
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
    <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>{selectedValue || "Select..."}</span>
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

function CreateProblemForm({ onSubmit, editingProblem }) {
  const [formData, setFormData] = useState({
    title: editingProblem?.title || "",
    hints: editingProblem?.hints?.length ? editingProblem.hints : [""],
    testCases: "",
    expectedOutput: "",
    definition: "",
    difficulty: editingProblem?.difficulty || "",
    category: editingProblem?.category || "",
    tags: "",
    coin: 20,
    star: "ZERO",
    bestMemoryUsage: 0,
    bestTimeExecution: 0.1,
  })

  // Use the mutation hook
  const [createProblem, { data, isLoading, error }] = useCreateProblemMutation()

  const handleHintChange = (index, value) => {
    const newHints = [...formData.hints]
    newHints[index] = value
    setFormData({ ...formData, hints: newHints })
  }

  const addHint = () => {
    if (formData.hints.length < 3) {
      setFormData({ ...formData, hints: [...formData.hints, ""] })
    }
  }

  const removeHint = (index) => {
    if (formData.hints.length > 1) {
      const newHints = [...formData.hints]
      newHints.splice(index, 1)
      setFormData({ ...formData, hints: newHints })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.definition.trim() || !formData.difficulty) {
      alert("Title, Problem Definition, and Difficulty are required")
      return
    }

    const filteredHints = formData.hints.filter((hint) => hint.trim() !== "")

    // Transform form data to match API structure
    const apiData = {
      title: formData.title,
      description: formData.definition,
      difficulty: formData.difficulty.toUpperCase(),
      star: formData.star,
      coin: Number.parseInt(formData.coin) || 20,
      best_memory_usage: Number.parseFloat(formData.bestMemoryUsage) || 0,
      best_time_execution: Number.parseFloat(formData.bestTimeExecution) || 0.1,
      test_cases:
        formData.testCases && formData.expectedOutput
          ? [
              {
                stdin: formData.testCases,
                expected_outputs: formData.expectedOutput,
              },
            ]
          : [],
      tag_names: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
      hints: filteredHints.map((hint) => ({
        description: hint,
        is_locked: false,
      })),
    }

    console.log("=== DEBUG: Form Data ===")
    console.log("Original form data:", formData)
    console.log("=== DEBUG: API Data ===")
    console.log("Transformed API data:", JSON.stringify(apiData, null, 2))
    console.log("========================")

    try {
      console.log("Sending API data:", apiData) // Debug log
      await createProblem(apiData).unwrap()
      alert("Problem created successfully!")

      // Reset form
      setFormData({
        title: "",
        hints: [""],
        testCases: "",
        expectedOutput: "",
        definition: "",
        difficulty: "",
        category: "",
        tags: "",
        coin: 20,
        star: "ZERO",
        bestMemoryUsage: 0,
        bestTimeExecution: 0.1,
      })

      // Call parent onSubmit if provided (for local state updates)
      if (onSubmit) {
        onSubmit({ ...formData, hints: filteredHints })
      }
    } catch (err) {
      console.error("Failed to create problem:", err)
      console.error("Error details:", JSON.stringify(err, null, 2)) // More detailed error log

      // Show more specific error message
      let errorMessage = "Failed to create problem"
      if (err?.data?.message) {
        errorMessage += ": " + err.data.message
      } else if (err?.message) {
        errorMessage += ": " + err.message
      }
      alert(errorMessage)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {editingProblem ? "Edit Problem" : "Create New Problem"}
        </h2>
        <p className="text-muted-foreground">
          {editingProblem ? "Update your coding challenge" : "Design an engaging coding challenge for learners"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title">Problem Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter a descriptive problem title"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="definition">Problem Definition *</Label>
              <Textarea
                id="definition"
                value={formData.definition}
                onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                placeholder="Describe the problem clearly and concisely..."
                required
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">🟢 Easy</SelectItem>
                    <SelectItem value="Medium">🟡 Medium</SelectItem>
                    <SelectItem value="Hard">🔴 Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
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
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Hints (max 3)</Label>
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={hint}
                    onChange={(e) => handleHintChange(index, e.target.value)}
                    placeholder={`Hint ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.hints.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeHint(index)}
                      className="px-3"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              {formData.hints.length < 3 && (
                <Button type="button" variant="outline" onClick={addHint} className="w-full bg-transparent">
                  + Add Hint
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="testCases">Test Cases</Label>
              <Textarea
                id="testCases"
                value={formData.testCases}
                onChange={(e) => setFormData({ ...formData, testCases: e.target.value })}
                placeholder="Enter test cases..."
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="expectedOutput">Expected Output</Label>
              <Textarea
                id="expectedOutput"
                value={formData.expectedOutput}
                onChange={(e) => setFormData({ ...formData, expectedOutput: e.target.value })}
                placeholder="Enter expected output..."
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Existing code for other form fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="coin">Coin Reward</Label>
            <Input
              id="coin"
              type="number"
              value={formData.coin}
              onChange={(e) => setFormData({ ...formData, coin: Number.parseInt(e.target.value) || 20 })}
              placeholder="Coin reward (default: 20)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="star">Star Rating</Label>
            <Select value={formData.star} onValueChange={(value) => setFormData({ ...formData, star: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select star rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ZERO">Zero Stars</SelectItem>
                <SelectItem value="ONE">One Star</SelectItem>
                <SelectItem value="TWO">Two Stars</SelectItem>
                <SelectItem value="THREE">Three Stars</SelectItem>
                {/* <SelectItem value="FOUR">Four Stars</SelectItem>
                <SelectItem value="FIVE">Five Stars</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bestMemoryUsage">Best Memory Usage (MB)</Label>
            <Input
              id="bestMemoryUsage"
              type="number"
              step="0.1"
              value={formData.bestMemoryUsage}
              onChange={(e) => setFormData({ ...formData, bestMemoryUsage: Number.parseFloat(e.target.value) || 0 })}
              placeholder="Memory usage (default: 0)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bestTimeExecution">Best Time Execution (s)</Label>
            <Input
              id="bestTimeExecution"
              type="number"
              step="0.01"
              value={formData.bestTimeExecution}
              onChange={(e) =>
                setFormData({ ...formData, bestTimeExecution: Number.parseFloat(e.target.value) || 0.1 })
              }
              placeholder="Time execution (default: 0.1)"
            />
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

        <div className="pt-6 border-t border-border">
          <Button type="submit" className="w-full text-lg py-4" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Problem...</span>
              </div>
            ) : editingProblem ? (
              "Update Problem"
            ) : (
              "Create Problem"
            )}
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Error: {JSON.stringify(error)}</span>
            </div>
          </div>
        )}

        {data && (
          <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Success: {data.status}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateProblemForm
