"use client"

import { useMemo } from "react"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!password) return 0
    let score = 0

    // Length check
    if (password.length >= 8) score += 25
    if (password.length >= 12) score += 25

    // Character variety checks
    if (/[a-z]/.test(password)) score += 12.5
    if (/[A-Z]/.test(password)) score += 12.5
    if (/[0-9]/.test(password)) score += 12.5
    if (/[^a-zA-Z0-9]/.test(password)) score += 12.5

    return Math.min(score, 100)
  }, [password])

  const getStrengthLabel = () => {
    if (strength === 0) return ""
    if (strength < 40) return "Weak"
    if (strength < 70) return "Medium"
    return "Strong"
  }

  const getStrengthColor = () => {
    if (strength < 40) return "bg-destructive"
    if (strength < 70) return "bg-yellow-500"
    return "bg-terminal-green"
  }

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">Password Strength</span>
        <span
          className={`text-xs font-mono font-semibold ${
            strength < 40 ? "text-destructive" : strength < 70 ? "text-yellow-500" : "text-terminal-green"
          }`}
        >
          {getStrengthLabel()}
        </span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${strength}%` }} />
      </div>
    </div>
  )
}
