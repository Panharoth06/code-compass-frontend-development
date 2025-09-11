"use client"

import { Editor, loader } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  fontSize?: number
  height?: string
  readOnly?: boolean
  className?: string
  showThemeSelector?: boolean
}

type EditorTheme = "vs-dark" | "light" | "custom-dark" | "github-dark" | "monokai" | "solarized-dark" | "solarized-light"

export function MonacoEditor({
  value,
  onChange,
  language,
  fontSize = 14,
  height = "100%",
  readOnly = false,
  className,
  showThemeSelector = true,
}: MonacoEditorProps) {
  const { theme: systemTheme } = useTheme()
  const editorRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [editorTheme, setEditorTheme] = useState<EditorTheme>("vs-dark")
  const [isEditorReady, setIsEditorReady] = useState(false)

  const themes: { value: EditorTheme; label: string; description: string }[] = [
    { value: "light", label: "Light", description: "VS Code Light" },
    { value: "vs-dark", label: "Dark", description: "VS Code Dark" },
    { value: "custom-dark", label: "Custom Dark", description: "Enhanced Dark Theme" },
    { value: "github-dark", label: "GitHub Dark", description: "GitHub Dark Theme" },
    { value: "monokai", label: "Monokai", description: "Monokai Theme" },
    { value: "solarized-dark", label: "Solarized Dark", description: "Solarized Dark Theme" },
    { value: "solarized-light", label: "Solarized Light", description: "Solarized Light Theme" },
  ]

  useEffect(() => {
    setMounted(true)
    // Set initial theme based on system theme
    setEditorTheme("vs-dark")
  }, [systemTheme])

  useEffect(() => {
    if (!mounted) return

    const initializeCustomThemes = async () => {
      try {
        const monaco = await loader.init()
        
        // Custom Dark Theme
        monaco.editor.defineTheme("custom-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "6A9955", fontStyle: "italic" },
            { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
            { token: "string", foreground: "CE9178" },
            { token: "number", foreground: "B5CEA8" },
            { token: "type", foreground: "4EC9B0" },
            { token: "function", foreground: "DCDCAA" },
            { token: "variable", foreground: "9CDCFE" },
            { token: "constant", foreground: "4FC1FF" },
          ],
          colors: {
            "editor.background": "#1e1e1e",
            "editor.foreground": "#d4d4d4",
            "editor.lineHighlightBackground": "#2d2d30",
            "editor.selectionBackground": "#264f78",
            "editorCursor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#858585",
            "editorLineNumber.activeForeground": "#c6c6c6",
            "editorIndentGuide.background": "#404040",
            "editorIndentGuide.activeBackground": "#707070",
          },
        })

        // GitHub Dark Theme
        monaco.editor.defineTheme("github-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "8b949e", fontStyle: "italic" },
            { token: "keyword", foreground: "ff7b72", fontStyle: "bold" },
            { token: "string", foreground: "a5d6ff" },
            { token: "number", foreground: "79c0ff" },
            { token: "type", foreground: "ffa657" },
            { token: "function", foreground: "d2a8ff" },
            { token: "variable", foreground: "ffa657" },
          ],
          colors: {
            "editor.background": "#0d1117",
            "editor.foreground": "#c9d1d9",
            "editor.lineHighlightBackground": "#161b22",
            "editor.selectionBackground": "#264f78",
            "editorCursor.foreground": "#c9d1d9",
            "editorLineNumber.foreground": "#6e7681",
            "editorLineNumber.activeForeground": "#c9d1d9",
          },
        })

        // Monokai Theme
        monaco.editor.defineTheme("monokai", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "75715e", fontStyle: "italic" },
            { token: "keyword", foreground: "f92672", fontStyle: "bold" },
            { token: "string", foreground: "e6db74" },
            { token: "number", foreground: "ae81ff" },
            { token: "type", foreground: "66d9ef" },
            { token: "function", foreground: "a6e22e" },
            { token: "variable", foreground: "f8f8f2" },
          ],
          colors: {
            "editor.background": "#272822",
            "editor.foreground": "#f8f8f2",
            "editor.lineHighlightBackground": "#3e3d32",
            "editor.selectionBackground": "#49483e",
            "editorCursor.foreground": "#f8f8f0",
            "editorLineNumber.foreground": "#90908a",
            "editorLineNumber.activeForeground": "#c2c2bf",
          },
        })

        // Solarized Dark Theme
        monaco.editor.defineTheme("solarized-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "586e75", fontStyle: "italic" },
            { token: "keyword", foreground: "859900", fontStyle: "bold" },
            { token: "string", foreground: "2aa198" },
            { token: "number", foreground: "d33682" },
            { token: "type", foreground: "b58900" },
            { token: "function", foreground: "268bd2" },
            { token: "variable", foreground: "93a1a1" },
          ],
          colors: {
            "editor.background": "#002b36",
            "editor.foreground": "#839496",
            "editor.lineHighlightBackground": "#073642",
            "editor.selectionBackground": "#274642",
            "editorCursor.foreground": "#839496",
            "editorLineNumber.foreground": "#586e75",
            "editorLineNumber.activeForeground": "#93a1a1",
          },
        })

        // Solarized Light Theme
        monaco.editor.defineTheme("solarized-light", {
          base: "vs",
          inherit: true,
          rules: [
            { token: "comment", foreground: "93a1a1", fontStyle: "italic" },
            { token: "keyword", foreground: "859900", fontStyle: "bold" },
            { token: "string", foreground: "2aa198" },
            { token: "number", foreground: "d33682" },
            { token: "type", foreground: "b58900" },
            { token: "function", foreground: "268bd2" },
            { token: "variable", foreground: "586e75" },
          ],
          colors: {
            "editor.background": "#fdf6e3",
            "editor.foreground": "#657b83",
            "editor.lineHighlightBackground": "#eee8d5",
            "editor.selectionBackground": "#d3d3d3",
            "editorCursor.foreground": "#657b83",
            "editorLineNumber.foreground": "#93a1a1",
            "editorLineNumber.activeForeground": "#586e75",
          },
        })

      } catch (error) {
        console.error("Failed to initialize custom themes:", error)
      }
    }

    initializeCustomThemes()
  }, [mounted])

  

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
    setIsEditorReady(true)
    editor.focus()
  }

  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue)
    }
  }

  const handleThemeChange = async (newTheme: EditorTheme) => {
    setEditorTheme(newTheme)
    if (editorRef.current) {
      try {
        const monaco = await loader.init()
        monaco.editor.setTheme(newTheme)
      } catch (error) {
        console.error("Failed to change theme:", error)
      }
    }
  }

  const getMonacoLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      cpp: "cpp",
      java: "java",
      python: "python",
      javascript: "javascript",
    }
    return languageMap[lang.toLowerCase()] || "plaintext"
  }

  if (!mounted) {
    return (
      <div 
        className={`h-full bg-card flex items-center justify-center ${className || ""}`}
        style={{ height }}
      >
        <div className="text-muted-foreground text-sm">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className={className || "h-full w-full"} style={{ height }}>
      {showThemeSelector && (
        <div className="flex items-center gap-3 p-3 border-b bg-background">
          <label className="text-sm font-medium text-foreground">Theme:</label>
          <select
            value={editorTheme}
            onChange={(e) => handleThemeChange(e.target.value as EditorTheme)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label} - {theme.description}
              </option>
            ))}
          </select>
          <div className="text-xs text-muted-foreground ml-auto">
            Current: {themes.find(t => t.value === editorTheme)?.label}
          </div>
        </div>
      )}
      
      <div style={{ height: showThemeSelector ? "calc(100% - 60px)" : "100%" }}>
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={value}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme={editorTheme}
          options={{
            fontSize: 18,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
            lineNumbers: "on",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            readOnly,
            contextmenu: true,
            selectOnLineNumbers: true,
            roundedSelection: false,
            cursorStyle: "line",
            cursorBlinking: "blink",
            folding: true,
            foldingHighlight: true,
            showFoldingControls: "mouseover",
            matchBrackets: "always",
            autoIndent: "full",
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            glyphMargin: false,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: "line",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              horizontalScrollbarSize: 8,
              verticalScrollbarSize: 8,
            },
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            smoothScrolling: true,
            mouseWheelZoom: true,
          }}
          loading={
            <div className="bg-card flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Initializing Monaco Editor...</div>
            </div>
          }
        />
      </div>
    </div>
  )
}