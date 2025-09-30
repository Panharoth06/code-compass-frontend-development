"use client"

import { useState } from "react"

const genderOptions = ["MALE", "FEMALE", "OTHER"]

export function GenderSelect() {
  const [selected, setSelected] = useState<string>("")

  return (
    <div className="space-y-3">
      <label className="text-sm font-mono text-foreground">Gender</label>
      <div className="flex flex-wrap gap-2">
        {genderOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`px-4 py-2 rounded-full text-xs font-mono border-gray-600 transition-all duration-200 ${
              selected === option
                ? "bg-terminal-green text-background border-gray-600"
                : "bg-background text-white/90 border-border hover:border-terminal-green"
            } border`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
