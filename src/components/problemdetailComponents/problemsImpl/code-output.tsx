"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Zap, MemoryStick } from "lucide-react"
import type { ExecutionResult } from "@/lib/code-executor"

interface CodeOutputProps {
  result: ExecutionResult | null
  isRunning: boolean
  onClear: () => void
}

export function CodeOutput({ result, isRunning, onClear }: CodeOutputProps) {
  if (isRunning) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-500" />
          <p className="text-muted-foreground">Executing code...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Run your code to see the output here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="font-medium">{result.success ? "Execution Successful" : "Execution Failed"}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Execution Stats */}
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {result.executionTime}ms
          </Badge>
          {result.memoryUsage && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MemoryStick className="w-3 h-3" />
              {result.memoryUsage}MB
            </Badge>
          )}
        </div>

        {/* Output */}
        {result.success && result.output && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Output:</h4>
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">{result.output}</div>
          </div>
        )}

        {/* Error */}
        {result.error && (
          <div>
            <h4 className="font-medium mb-2 text-red-600">Error:</h4>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg font-mono text-sm text-red-600">
              {result.error}
            </div>
          </div>
        )}

        {/* Success message for no output */}
        {result.success && !result.output && !result.error && (
          <div className="text-center text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
            <p>Code executed successfully with no output</p>
          </div>
        )}
      </div>
    </div>
  )
}
