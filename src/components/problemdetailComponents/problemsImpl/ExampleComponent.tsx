import { Button } from '@/components/ui/button';
import { ProblemResponse } from '@/lib/types/problem/problemResponse';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
 
interface ExampleComponentProps {
  problem: ProblemResponse | undefined;
}

function ExampleComponent({ problem }: ExampleComponentProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 4000);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Examples</h3>
      {problem?.test_cases.slice(0, 2).map((testCase, index) => {
        const formattedInput = testCase.stdin.replace(/\\n/g, '\n');
        const formattedOutput = testCase.expected_outputs.replace(/\\n/g, '\n');
        
        return (
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
                    `Input: ${formattedInput}\nOutput: ${formattedOutput}`,
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
                      copyToClipboard(formattedInput, `input-${index}`)
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
                  {formattedInput}
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
                      copyToClipboard(formattedOutput, `output-${index}`)
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
                  {formattedOutput}
                </pre>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ExampleComponent;