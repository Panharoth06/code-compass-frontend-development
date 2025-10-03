"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { JSX } from "react/jsx-runtime" // Declare JSX variable

export function CodeEditorPanel() {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const fullCode = `// Welcome to CodeCompass
// Start your competitive programming journey

function code_compass(user) {
  const skills = [
    'algorithms',
    'data structures',
    'problem solving'
  ];

  const rank = user.practice(skills);

  return {
    success: true,
    level: rank,
    message: 'Ready to compete!'
  };
}

// Initialize your journey
code_compass(new User());`

  useEffect(() => {
    if (currentIndex < fullCode.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedCode(fullCode.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        },
        30 + Math.random() * 40,
      )

      return () => clearTimeout(timeout)
    } else if (currentIndex === fullCode.length && !isTypingComplete) {
      setIsTypingComplete(true)
    }
  }, [currentIndex, fullCode, isTypingComplete])

  useEffect(() => {
    if (isTypingComplete) {
      const restartTimeout = setTimeout(() => {
        setDisplayedCode("")
        setCurrentIndex(0)
        setIsTypingComplete(false)
      }, 5500)

      return () => clearTimeout(restartTimeout)
    }
  }, [isTypingComplete])

  const renderCodeWithSyntax = (code: string) => {
    const lines = code.split("\n")
    return lines.map((line, lineIndex) => {
      const lineNumber = lineIndex + 1
      const highlightedLine = highlightSyntax(line)

      return (
        <div key={lineIndex} className="flex gap-6">
          <span className="text-gray-600 select-none w-6 text-right">{lineNumber}</span>
          <div className="flex-1">
            {highlightedLine}
            {lineIndex === lines.length - 1 && (
              <span className="inline-block w-2 h-4 bg-terminal-green animate-pulse ml-0.5" />
            )}
          </div>
        </div>
      )
    })
  }

  const highlightSyntax = (line: string) => {
    const parts: JSX.Element[] = []
    let currentPart = ""
    let inString = false
    let stringChar = ""

    const keywords = ["function", "const", "return", "new"]
    const types = ["User"]
    const booleans = ["true", "false"]

    const flushPart = (className?: string) => {
      if (currentPart) {
        parts.push(
          <span key={parts.length} className={className || "text-gray-300"}>
            {currentPart}
          </span>,
        )
        currentPart = ""
      }
    }

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      // Handle comments
      if (!inString && char === "/" && line[i + 1] === "/") {
        flushPart()
        parts.push(
          <span key={parts.length} className="text-gray-500 italic">
            {line.slice(i)}
          </span>,
        )
        break
      }

      // Handle strings
      if ((char === '"' || char === "'") && !inString) {
        flushPart()
        inString = true
        stringChar = char
        currentPart = char
        continue
      }

      if (inString && char === stringChar) {
        currentPart += char
        flushPart("text-[#ce9178]")
        inString = false
        stringChar = ""
        continue
      }

      if (inString) {
        currentPart += char
        continue
      }

      // Handle keywords, types, and other tokens
      if (/[a-zA-Z_]/.test(char)) {
        currentPart += char
      } else {
        if (currentPart) {
          if (keywords.includes(currentPart)) {
            flushPart("text-[#c586c0]")
          } else if (types.includes(currentPart)) {
            flushPart("text-[#4ec9b0]")
          } else if (booleans.includes(currentPart)) {
            flushPart("text-[#569cd6]")
          } else if (/^[A-Z]/.test(currentPart)) {
            flushPart("text-[#4ec9b0]")
          } else if (line[i] === "(") {
            flushPart("text-[#dcdcaa]")
          } else {
            flushPart("text-[#9cdcfe]")
          }
        }
        parts.push(
          <span key={parts.length} className="text-gray-300">
            {char}
          </span>,
        )
      }
    }

    if (currentPart) {
      if (inString) {
        flushPart("text-[#ce9178]")
      } else if (keywords.includes(currentPart)) {
        flushPart("text-[#c586c0]")
      } else {
        flushPart("text-[#9cdcfe]")
      }
    }

    return parts
  }

     return (
        <div className="hidden lg:flex lg:ml-4 h-full flex-col justify-between bg-[#1e1e1e] rounded-lg overflow-hidden border border-terminal-green/30 shadow-[0_0_20px_rgba(0,255,0,0.15)]">
            {/* macOS Window Controls Bar */}
            <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2.5 border-b border-[#3e3e3e]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-[#1e1e1e] px-4 py-1 rounded-t text-xs font-mono text-gray-300 border-t border-x border-terminal-green/20">
                        register.js
                    </div>
                </div>
                <div className="h-12 w-12 relative">
                    <Image
                    src={"/codecompass-2.png"}
                    alt="Codecompass logo"
                    fill
                    />
                </div>
                {/* <div className="w-[52px]" /> Spacer for centering */}
            </div>

            <div className="flex-1 p-6 font-mono text-base overflow-auto">
                <div className="space-y-1">{renderCodeWithSyntax(displayedCode)}</div>
            </div>
        </div>
    )
}
