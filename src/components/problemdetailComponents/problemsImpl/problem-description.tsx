"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Lightbulb,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useToast } from "@/hooks/use-toast";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  description: string; // HTML string
  examples: Example[];
}

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { toast } = useToast();

  // Create editor with immediatelyRender:false and no initial content.
  // Then set content on client inside useEffect to avoid hydration mismatch.
  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // start empty to avoid SSR mismatch
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none",
      },
    },
    // IMPORTANT: avoid Tiptap trying to immediately render on hydration
    immediatelyRender: false,
  });

  // Set actual content client-side (avoids SSR/content mismatch)
  useEffect(() => {
    if (editor) {
      // set HTML content (strip none — StarterKit handles basic tags)
      editor.commands.setContent(problem.description || "");
    }
  }, [editor, problem.description]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      toast({
        description: "Copied to clipboard!",
        duration: 2000,
      });
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch {
      toast({
        description: "Failed to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600 text-white dark:bg-green-900 dark:text-green-200 text-base";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-base";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-base";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 text-base";
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h6 className="text-2xl font-semibold text-foreground text-balance">
                {problem.id}. {problem.title}
              </h6>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent text-base"
              >
                <Lightbulb className="w-3 h-3 mr-1" />
                Topics
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent text-base"
              >
                Hint
              </Badge>
            </div>
          </div>

          {/* Description with hover copy button */}
          <div className="relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Render EditorContent only when editor is ready */}
            {editor ? <EditorContent editor={editor} /> : null}
          </div>

          {/* Examples */}
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="bg-muted/50 p-4 rounded-lg border relative group"
              >
                <h6 className="font-semibold mb-3 text-foreground">
                  Sample {index + 1}:
                </h6>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        `Input: ${example.input}\nOutput: ${example.output}`,
                        `example-${index}`
                      )
                    }
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Copy example ${index + 1}`}
                  >
                    {copiedStates[`example-${index}`] ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 p-3 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">
                        Input
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(example.input, `input-${index}`)
                        }
                        className="text-muted-foreground hover:text-foreground p-1 h-6 w-6"
                        aria-label={`Copy input ${index + 1}`}
                      >
                        {copiedStates[`input-${index}`] ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                      {example.input}
                    </pre>
                  </div>

                  <div className="bg-background/50 p-3 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">
                        Output
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(example.output, `output-${index}`)
                        }
                        className="text-muted-foreground hover:text-foreground p-1 h-6 w-6"
                        aria-label={`Copy output ${index + 1}`}
                      >
                        {copiedStates[`output-${index}`] ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                      {example.output}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
