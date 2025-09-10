"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Star,
  Copy,
  Lightbulb,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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
  companies: string[];
  description: string; // HTML string
  examples: Example[];
  constraints: string[];
  likes: number;
  dislikes: number;
  submissions: number;
  acceptanceRate: string;
  onlineUsers: number;
}

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
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
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
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
                className="cursor-pointer hover:bg-accent"
              >
                <Lightbulb className="w-3 h-3 mr-1" />
                Topics
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
              >
                Companies
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
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

          {/* Constraints with hover copy */}
          {problem.constraints.length > 0 && (
            <div className="space-y-3 relative group">
              <div className="flex items-center justify-between">
                <h6 className="font-semibold text-foreground">Constraints:</h6>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        problem.constraints.join("\n"),
                        "constraints"
                      )
                    }
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Copy constraints"
                  >
                    {copiedStates.constraints ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <ul className="space-y-1">
                {problem.constraints.map((constraint, index) => (
                  <li
                    key={index}
                    className="font-mono text-sm text-muted-foreground flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Topics / Companies / actions */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h6 className="font-semibold text-foreground mb-2">Topics</h6>
              <div className="flex flex-wrap gap-2">
                {problem.topics.map((topic) => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className="text-xs hover:bg-accent cursor-pointer"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h6 className="font-semibold text-foreground mb-2">Companies</h6>
              <div className="flex flex-wrap gap-2">
                {problem.companies.map((company) => (
                  <Badge
                    key={company}
                    variant="outline"
                    className="text-xs hover:bg-accent cursor-pointer"
                  >
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className={
                    liked
                      ? "text-green-600 hover:text-green-700"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  <Heart
                    className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`}
                  />
                  {problem.likes.toLocaleString()}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {problem.dislikes}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={
                    bookmarked
                      ? "text-yellow-600 hover:text-yellow-700"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  <Star
                    className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    copyToClipboard(
                      `${problem.id}. ${
                        problem.title
                      }\n\n${problem.description.replace(
                        /<[^>]*>/g,
                        ""
                      )}\n\nExamples:\n${problem.examples
                        .map(
                          (ex, i) =>
                            `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${
                              ex.output
                            }`
                        )
                        .join(
                          "\n\n"
                        )}\n\nConstraints:\n${problem.constraints.join("\n")}`,
                      "full-problem"
                    )
                  }
                  aria-label="Copy entire problem"
                >
                  {copiedStates["full-problem"] ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <span className="inline-flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {problem.onlineUsers.toLocaleString()} Online
                </span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                Accepted: {problem.submissions.toLocaleString()} submissions
              </div>
              <div>Acceptance Rate: {problem.acceptanceRate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
