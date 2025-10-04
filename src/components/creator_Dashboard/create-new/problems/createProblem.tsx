// "use client"

// import React, { useState, useEffect } from "react"
// import { useCreateProblemMutation } from "@/lib/services/creator-dashboard/problem/createProblemApi"

// const Input = ({ className = "", type = "text", ...props }) => (
//   <input
//     type={type}
//     className={`flex h-12 w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md ${className}`}
//     {...props}
//   />
// )

// const Textarea = ({ className = "", ...props }) => (
//   <textarea
//     className={`flex min-h-[120px] w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md resize-none ${className}`}
//     {...props}
//   />
// )

// const Label = ({ children, htmlFor, className = "" }) => (
//   <label
//     htmlFor={htmlFor}
//     className={`text-sm font-semibold text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
//   >
//     {children}
//   </label>
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
//     "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95"

//   const variants = {
//     default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
//     outline:
//       "border-2 border-input hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
//     ghost: "hover:bg-accent hover:text-accent-foreground",
//     destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
//   }

//   const sizes = {
//     default: "h-11 py-3 px-6",
//     sm: "h-9 px-4 rounded-lg text-sm",
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

// const Select = ({ children, value, onValueChange }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedValue, setSelectedValue] = useState(value || "")

//   const handleValueChange = (newValue) => {
//     setSelectedValue(newValue)
//     onValueChange?.(newValue)
//     setIsOpen(false)
//   }

//   return (
//     <div className="relative">
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           if (child.type === SelectTrigger) {
//             return React.cloneElement(child, {
//               onClick: () => setIsOpen(!isOpen),
//               selectedValue,
//               isOpen,
//             })
//           } else if (child.type === SelectContent) {
//             return isOpen
//               ? React.cloneElement(child, {
//                   onValueChange: handleValueChange,
//                   onClose: () => setIsOpen(false),
//                 })
//               : null
//           }
//         }
//         return child
//       })}
//     </div>
//   )
// }

// const SelectTrigger = ({ onClick, selectedValue, isOpen }) => (
//   <button
//     type="button"
//     className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
//     onClick={onClick}
//   >
//     <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>{selectedValue || "Select..."}</span>
//     <svg
//       className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//     </svg>
//   </button>
// )

// const SelectValue = ({ children, placeholder }) => (
//   <span className="text-muted-foreground">{children || placeholder}</span>
// )

// const SelectContent = ({ children, onValueChange, onClose }) => (
//   <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-popover/95 backdrop-blur-md shadow-2xl animate-in">
//     <div className="p-2">
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child, {
//             onValueChange,
//             onClose,
//           })
//         }
//         return child
//       })}
//     </div>
//   </div>
// )

// const SelectItem = ({ value, children, onValueChange, onClose }) => (
//   <div
//     className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-foreground outline-none hover:bg-primary/20 hover:text-primary transition-colors duration-200"
//     onClick={() => {
//       onValueChange?.(value)
//       onClose?.()
//     }}
//   >
//     {children}
//   </div>
// )

// // Notification Component
// const Notification = ({ type, message, isVisible, onClose }) => {
//   if (!isVisible) return null

//   const bgColor = type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-red-500/10 border-red-500/20 text-red-600'
//   const icon = type === 'success' 
//     ? <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//       </svg>
//     : <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//       </svg>

//   return (
//     <div className={`p-4 border rounded-xl ${bgColor} mb-4`}>
//       <div className="flex items-center justify-between space-x-2">
//         <div className="flex items-center space-x-2">
//           {icon}
//           <span>{message}</span>
//         </div>
//         <button 
//           onClick={onClose}
//           className="text-current hover:opacity-70 transition-opacity"
//         >
//           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   )
// }

// function CreateProblemForm({ onSubmit, editingProblem }) {
//   const [formData, setFormData] = useState({
//     title: editingProblem?.title || "",
//     hints: editingProblem?.hints?.length ? editingProblem.hints : [""],
//     testCases: "",
//     expectedOutput: "",
//     definition: "",
//     difficulty: editingProblem?.difficulty || "",
//     category: editingProblem?.category || "",
//     tags: "",
//     coin: 20,
//     star: "ZERO",
//     bestMemoryUsage: 0,
//     bestTimeExecution: 0.1,
//   })

//   const [notification, setNotification] = useState({
//     isVisible: false,
//     type: 'success',
//     message: ''
//   })

//   // Use the mutation hook
//   const [createProblem, { isLoading }] = useCreateProblemMutation()

//   // Auto-hide notification after 5 seconds
//   useEffect(() => {
//     if (notification.isVisible) {
//       const timer = setTimeout(() => {
//         setNotification(prev => ({ ...prev, isVisible: false }))
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [notification.isVisible])

//   const showNotification = (type, message) => {
//     setNotification({
//       isVisible: true,
//       type,
//       message
//     })
//   }

//   const hideNotification = () => {
//     setNotification(prev => ({ ...prev, isVisible: false }))
//   }

//   const handleHintChange = (index, value) => {
//     const newHints = [...formData.hints]
//     newHints[index] = value
//     setFormData({ ...formData, hints: newHints })
//   }

//   const addHint = () => {
//     if (formData.hints.length < 3) {
//       setFormData({ ...formData, hints: [...formData.hints, ""] })
//     }
//   }

//   const removeHint = (index) => {
//     if (formData.hints.length > 1) {
//       const newHints = [...formData.hints]
//       newHints.splice(index, 1)
//       setFormData({ ...formData, hints: newHints })
//     }
//   }

//   const handleSubmit = async () => {

//     if (!formData.title.trim() || !formData.definition.trim() || !formData.difficulty) {
//       showNotification('error', "Title, Problem Definition, and Difficulty are required")
//       return
//     }

//     const filteredHints = formData.hints.filter((hint) => hint.trim() !== "")

//     // Transform form data to match API structure
//     const apiData = {
//       title: formData.title,
//       description: formData.definition,
//       difficulty: formData.difficulty.toUpperCase(),
//       star: formData.star,
//       coin: Number.parseInt(formData.coin) || 20,
//       best_memory_usage: Number.parseFloat(formData.bestMemoryUsage) || 0,
//       best_time_execution: Number.parseFloat(formData.bestTimeExecution) || 0.1,
//       test_cases:
//         formData.testCases && formData.expectedOutput
//           ? [
//               {
//                 stdin: formData.testCases,
//                 expected_outputs: formData.expectedOutput,
//               },
//             ]
//           : [],
//       tag_names: formData.tags
//         ? formData.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag)
//         : [],
//       hints: filteredHints.map((hint) => ({
//         description: hint,
//         is_locked: false,
//       })),
//     }

//     console.log("=== DEBUG: Form Data ===")
//     console.log("Original form data:", formData)
//     console.log("=== DEBUG: API Data ===")
//     console.log("Transformed API data:", JSON.stringify(apiData, null, 2))
//     console.log("========================")

//     try {
//       console.log("Sending API data:", apiData) // Debug log
//       const response = await createProblem(apiData).unwrap()
      
//       console.log("API Response:", response)
      
//       // Show success notification with status
//       const successMessage = `Problem created successfully! Status: ${response.status || 'PENDING'}`
//       showNotification('success', successMessage)

//       // Reset form
//       setFormData({
//         title: "",
//         hints: [""],
//         testCases: "",
//         expectedOutput: "",
//         definition: "",
//         difficulty: "",
//         category: "",
//         tags: "",
//         coin: 20,
//         star: "ZERO",
//         bestMemoryUsage: 0,
//         bestTimeExecution: 0.1,
//       })

//       // Call parent onSubmit if provided (for local state updates)
//       if (onSubmit) {
//         onSubmit({ ...formData, hints: filteredHints })
//       }
//     } catch (err) {
//       console.error("Failed to create problem:", err)
//       console.error("Error details:", JSON.stringify(err, null, 2))

//       // Show error notification with more specific error message
//       let errorMessage = "Failed to create problem"
      
//       if (err?.data?.message) {
//         errorMessage += `: ${err.data.message}`
//       } else if (err?.message) {
//         errorMessage += `: ${err.message}`
//       } else if (err?.status) {
//         errorMessage += `: HTTP ${err.status}`
//       }
      
//       showNotification('error', errorMessage)
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold text-foreground mb-2">
//           {editingProblem ? "Edit Problem" : "Create New Problem"}
//         </h2>
//         <p className="text-muted-foreground">
//           {editingProblem ? "Update your coding challenge" : "Design an engaging coding challenge for learners"}
//         </p>
//       </div>

//       {/* Notification */}
//       <Notification
//         type={notification.type}
//         message={notification.message}
//         isVisible={notification.isVisible}
//         onClose={hideNotification}
//       />

//       <div className="space-y-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="space-y-3">
//               <Label htmlFor="title">Problem Title *</Label>
//               <Input
//                 id="title"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="Enter a descriptive problem title"
//                 required
//               />
//             </div>

//             <div className="space-y-3">
//               <Label htmlFor="definition">Problem Definition *</Label>
//               <Textarea
//                 id="definition"
//                 value={formData.definition}
//                 onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
//                 placeholder="Describe the problem clearly and concisely..."
//                 required
//                 rows={6}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-3">
//                 <Label htmlFor="difficulty">Difficulty *</Label>
//                 <Select
//                   value={formData.difficulty}
//                   onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select difficulty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Easy">🟢 Easy</SelectItem>
//                     <SelectItem value="Medium">🟡 Medium</SelectItem>
//                     <SelectItem value="Hard">🔴 Hard</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-3">
//                 <Label htmlFor="category">Category</Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={(value) => setFormData({ ...formData, category: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Array">Array</SelectItem>
//                     <SelectItem value="String">String</SelectItem>
//                     <SelectItem value="Tree">Tree</SelectItem>
//                     <SelectItem value="Graph">Graph</SelectItem>
//                     <SelectItem value="Dynamic Programming">Dynamic Programming</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-4">
//               <Label>Hints (max 3)</Label>
//               {formData.hints.map((hint, index) => (
//                 <div key={index} className="flex gap-3">
//                   <Input
//                     value={hint}
//                     onChange={(e) => handleHintChange(index, e.target.value)}
//                     placeholder={`Hint ${index + 1}`}
//                     className="flex-1"
//                   />
//                   {formData.hints.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => removeHint(index)}
//                       className="px-3"
//                     >
//                       ✕
//                     </Button>
//                   )}
//                 </div>
//               ))}
//               {formData.hints.length < 3 && (
//                 <Button type="button" variant="outline" onClick={addHint} className="w-full bg-transparent">
//                   + Add Hint
//                 </Button>
//               )}
//             </div>

//             <div className="space-y-3">
//               <Label htmlFor="testCases">Test Cases</Label>
//               <Textarea
//                 id="testCases"
//                 value={formData.testCases}
//                 onChange={(e) => setFormData({ ...formData, testCases: e.target.value })}
//                 placeholder="Enter test cases..."
//                 rows={4}
//               />
//             </div>

//             <div className="space-y-3">
//               <Label htmlFor="expectedOutput">Expected Output</Label>
//               <Textarea
//                 id="expectedOutput"
//                 value={formData.expectedOutput}
//                 onChange={(e) => setFormData({ ...formData, expectedOutput: e.target.value })}
//                 placeholder="Enter expected output..."
//                 rows={4}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="coin">Coin Reward</Label>
//             <Input
//               id="coin"
//               type="number"
//               value={formData.coin}
//               onChange={(e) => setFormData({ ...formData, coin: Number.parseInt(e.target.value) || 20 })}
//               placeholder="Coin reward (default: 20)"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="star">Star Rating</Label>
//             <Select value={formData.star} onValueChange={(value) => setFormData({ ...formData, star: value })}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select star rating" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ZERO">Zero Stars</SelectItem>
//                 <SelectItem value="ONE">One Star</SelectItem>
//                 <SelectItem value="TWO">Two Stars</SelectItem>
//                 <SelectItem value="THREE">Three Stars</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="bestMemoryUsage">Best Memory Usage (MB)</Label>
//             <Input
//               id="bestMemoryUsage"
//               type="number"
//               step="0.1"
//               value={formData.bestMemoryUsage}
//               onChange={(e) => setFormData({ ...formData, bestMemoryUsage: Number.parseFloat(e.target.value) || 0 })}
//               placeholder="Memory usage (default: 0)"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="bestTimeExecution">Best Time Execution (s)</Label>
//             <Input
//               id="bestTimeExecution"
//               type="number"
//               step="0.01"
//               value={formData.bestTimeExecution}
//               onChange={(e) =>
//                 setFormData({ ...formData, bestTimeExecution: Number.parseFloat(e.target.value) || 0.1 })
//               }
//               placeholder="Time execution (default: 0.1)"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="tags">Tags</Label>
//           <Input
//             id="tags"
//             value={formData.tags}
//             onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//             placeholder="Enter tags (comma separated)"
//           />
//         </div>

//         <div className="pt-6 border-t border-border">
//           <Button type="submit" className="w-full text-lg py-4" disabled={isLoading} onClick={handleSubmit}>
//             {isLoading ? (
//               <div className="flex items-center space-x-2">
//                 <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
//                 <span>Creating Problem...</span>
//               </div>
//             ) : editingProblem ? (
//               "Update Problem"
//             ) : (
//               "Create Problem"
//             )}
//           </Button>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default CreateProblemForm
"use client"

import React, { useState, useEffect } from "react"
import { useCreateProblemMutation } from "@/lib/services/creator-dashboard/problem/createProblemApi"
import { useModifyProblemMutation } from "@/lib/services/creator-dashboard/problem/modifyProblemsApi"

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

// Notification Component
const Notification = ({ type, message, isVisible, onClose }) => {
  if (!isVisible) return null

  const styles = {
    success: {
      bg: 'bg-green-500/95 dark:bg-green-600/95',
      border: 'border-green-600 dark:border-green-500',
      text: 'text-white',
      icon: (
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-500/95 dark:bg-red-600/95',
      border: 'border-red-600 dark:border-red-500',
      text: 'text-white',
      icon: (
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-500/95 dark:bg-blue-600/95',
      border: 'border-blue-600 dark:border-blue-500',
      text: 'text-white',
      icon: (
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  const currentStyle = styles[type] || styles.info

  return (
    <div className={`fixed top-6 right-6 z-[9999] max-w-md animate-in slide-in-from-top-5 duration-300`}>
      <div className={`${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} border-2 rounded-xl shadow-2xl backdrop-blur-sm`}>
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {currentStyle.icon}
          </div>
          <div className="flex-1 pt-0.5">
            <p className="font-semibold text-base leading-relaxed">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity rounded-lg p-1 hover:bg-white/20"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function CreateProblemForm({ onSubmit, editingProblem, onClose }) {
  const [formData, setFormData] = useState({
    title: editingProblem?.title || "",
    hints: editingProblem?.hints?.length ? editingProblem.hints.map(h => h.description || h) : [""],
    testCases: editingProblem?.test_cases?.[0]?.stdin || "",
    expectedOutput: editingProblem?.test_cases?.[0]?.expected_outputs || "",
    definition: editingProblem?.description || "",
    difficulty: editingProblem?.difficulty || "",
    category: editingProblem?.category || "",
    tags: editingProblem?.tag_names?.join(", ") || "",
    coin: editingProblem?.coin || 20,
    star: editingProblem?.star || "ZERO",
    bestMemoryUsage: editingProblem?.best_memory_usage || 0,
    bestTimeExecution: editingProblem?.best_time_execution || 0.1,
  })

  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'success',
    message: ''
  })

  // Use BOTH mutation hooks
  const [createProblem, { isLoading: isCreating }] = useCreateProblemMutation()
  const [modifyProblem, { isLoading: isModifying }] = useModifyProblemMutation()

  const isLoading = isCreating || isModifying

  // Update form when editingProblem changes
  useEffect(() => {
    if (editingProblem) {
      console.log('=== EDITING PROBLEM ===')
      console.log('Problem data:', editingProblem)
      
      setFormData({
        title: editingProblem.title || "",
        hints: editingProblem.hints?.length ? editingProblem.hints.map(h => h.description || h) : [""],
        testCases: editingProblem.test_cases?.[0]?.stdin || "",
        expectedOutput: editingProblem.test_cases?.[0]?.expected_outputs || "",
        definition: editingProblem.description || "",
        difficulty: editingProblem.difficulty || "",
        category: editingProblem.category || "",
        tags: editingProblem.tag_names?.join(", ") || "",
        coin: editingProblem.coin || 20,
        star: editingProblem.star || "ZERO",
        bestMemoryUsage: editingProblem.best_memory_usage || 0,
        bestTimeExecution: editingProblem.best_time_execution || 0.1,
      })
    }
  }, [editingProblem])

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification.isVisible) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.isVisible])

  const showNotification = (type, message) => {
    setNotification({
      isVisible: true,
      type,
      message
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

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

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.definition.trim() || !formData.difficulty) {
      showNotification('error', "Title, Problem Definition, and Difficulty are required")
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

    console.log("=== DEBUG: Form Submission ===")
    console.log("Is Editing:", !!editingProblem)
    console.log("Problem ID:", editingProblem?.id)
    console.log("Original form data:", formData)
    console.log("Transformed API data:", JSON.stringify(apiData, null, 2))
    console.log("========================")

    try {
      let response

      // CRITICAL FIX: Check if we're editing or creating
      if (editingProblem && editingProblem.id) {
        // UPDATING existing problem
        console.log("=== UPDATING PROBLEM ===")
        console.log("Problem ID:", editingProblem.id)
        console.log("API Data:", apiData)
        
        showNotification('info', `Updating problem #${editingProblem.id}...`)
        
        response = await modifyProblem({
          problemId: editingProblem.id,
          problemData: apiData
        }).unwrap()
        
        console.log("Update Response:", response)
        
        // Show detailed success message
        showNotification('success', `✓ Problem #${editingProblem.id} "${formData.title}" has been updated successfully!`)
        
        // Auto-close the form after 2 seconds
        setTimeout(() => {
          if (onClose) {
            onClose()
          }
        }, 2000)
      } else {
        // CREATING new problem
        console.log("=== CREATING NEW PROBLEM ===")
        console.log("API Data:", apiData)
        
        showNotification('info', 'Creating new problem...')
        
        response = await createProblem(apiData).unwrap()
        
        console.log("Create Response:", response)
        
        // Show detailed success message with problem ID and status
        const successMessage = `✓ Problem created successfully! ID: ${response.id || 'N/A'} | Status: ${response.status || 'PENDING'}`
        showNotification('success', successMessage)

        // Reset form only if creating (not editing)
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
      }

      // Call parent onSubmit if provided (for local state updates)
      if (onSubmit) {
        onSubmit({ ...formData, hints: filteredHints })
      }
    } catch (err) {
      console.error("Failed to save problem:", err)
      console.error("Error details:", JSON.stringify(err, null, 2))

      // Show error notification with more specific error message
      let errorMessage = editingProblem ? "✗ Failed to update problem" : "✗ Failed to create problem"
      
      if (err?.data?.message) {
        errorMessage += `: ${err.data.message}`
      } else if (err?.message) {
        errorMessage += `: ${err.message}`
      } else if (err?.status) {
        errorMessage += ` (HTTP ${err.status})`
      } else if (err?.data) {
        errorMessage += `: ${err.data}`
      }
      
      showNotification('error', errorMessage)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {editingProblem ? `Edit Problem #${editingProblem.id}` : "Create New Problem"}
        </h2>
        <p className="text-muted-foreground">
          {editingProblem ? "Update your coding challenge" : "Design an engaging coding challenge for learners"}
        </p>
      </div>

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <div className="space-y-8">
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
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
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
          <Button type="submit" className="w-full text-lg py-4" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>{editingProblem ? 'Updating Problem...' : 'Creating Problem...'}</span>
              </div>
            ) : editingProblem ? (
              `Update Problem #${editingProblem.id}`
            ) : (
              "Create Problem"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateProblemForm