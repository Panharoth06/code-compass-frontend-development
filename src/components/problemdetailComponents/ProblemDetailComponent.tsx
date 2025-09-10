"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Play, Settings, Share, RotateCcw, Send } from "lucide-react";
import { MonacoEditor } from "@/components/problemdetailComponents/problemsImpl/monaco-editor";
import { ProblemDescription } from "@/components/problemdetailComponents/problemsImpl/problem-description";
import { TestCasesPanel } from "@/components/problemdetailComponents/problemsImpl/test-cases-panel";
import { CodeOutput } from "@/components/problemdetailComponents/problemsImpl/code-output";
import { ProfileDropdown } from "@/components/problemdetailComponents/problemsImpl/profile-dropdown";
import {
  codeExecutor,
  type ExecutionResult,
  type TestCaseResult,
} from "@/lib/code-executor";
import { useState } from "react";
import type { TestCase } from "@/types/testcase";
import Image from "next/image";

const sampleProblem = {
  id: 1317,
  title: "Convert Integer to the Sum of Two No-Zero Integers",
  difficulty: "Easy" as const,
  topics: ["Math", "Greedy", "Number Theory"],
  companies: ["Google", "Amazon", "Microsoft", "Apple"],
  description: `<p><strong>No-Zero integer</strong> is a positive integer that <strong>does not contain any 0</strong> in its decimal representation.</p>
    <p>Given an integer <code>n</code>, return <em>a list of two integers</em> <code>[a, b]</code> <em>where:</em></p>
    <ul>
      <li><code>a</code> and <code>b</code> are <strong>No-Zero integers</strong>.</li>
      <li><code>a + b = n</code></li>
    </ul>
    <p>The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.</p>`,
  examples: [
    {
      input: "n = 2",
      output: "[1,1]",
      explanation:
        "Let a = 1 and b = 1. Both a and b are no-zero integers, and a + b = 2 = n, so return [1,1].",
    },
    {
      input: "n = 11",
      output: "[2,9]",
      explanation:
        "Let a = 2 and b = 9. Both a and b are no-zero integers, and a + b = 11 = n, so return [2,9].",
    },
  ],
  constraints: ["2 <= n <= 10^4"],
  likes: 806,
  dislikes: 213,
  submissions: 125000,
  acceptanceRate: "57.8%",
  onlineUsers: 1517,
};

export default function ProblemsetComponents() {
  const [code, setCode] = useState(`class Solution {
public:
    vector<int> getNoZeroIntegers(int n) {
        for (int a = 1; a < n; a++) {
            int b = n - a;
            if (to_string(a).find('0') == string::npos && 
                to_string(b).find('0') == string::npos) {
                return {a, b};
            }
        }
        return {1, n-1}; // fallback
    }
};`);
  const [language, setLanguage] = useState("cpp");

  //  Use the proper type here
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: "case-1",
      inputs: { n: "2" },
      expectedOutput: "[1,1]",
      status: "pending",
    },
    {
      id: "case-2",
      inputs: { n: "11" },
      expectedOutput: "[2,9]",
      status: "pending",
    },
  ]);

  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] =
    useState<ExecutionResult | null>(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Update code template based on language
    switch (newLanguage) {
      case "javascript":
        setCode(`/**
 * @param {number} n
 * @return {number[]}
 */
var getNoZeroIntegers = function(n) {
    for (let a = 1; a < n; a++) {
        let b = n - a;
        if (!a.toString().includes('0') && !b.toString().includes('0')) {
            return [a, b];
        }
    }
    return [1, n-1]; // fallback
};`);
        break;
      case "python":
        setCode(`class Solution:
    def getNoZeroIntegers(self, n: int) -> List[int]:
        for a in range(1, n):
            b = n - a
            if '0' not in str(a) and '0' not in str(b):
                return [a, b]
        return [1, n-1]  # fallback`);
        break;
      case "java":
        setCode(`class Solution {
    public int[] getNoZeroIntegers(int n) {
        for (int a = 1; a < n; a++) {
            int b = n - a;
            if (!String.valueOf(a).contains("0") && 
                !String.valueOf(b).contains("0")) {
                return new int[]{a, b};
            }
        }
        return new int[]{1, n-1}; // fallback
    }
}`);
        break;
      case "cpp":
        setCode(`class Solution {
public:
    vector<int> getNoZeroIntegers(int n) {
        for (int a = 1; a < n; a++) {
            int b = n - a;
            if (to_string(a).find('0') == string::npos && 
                to_string(b).find('0') == string::npos) {
                return {a, b};
            }
        }
        return {1, n-1}; // fallback
    }
};`);
        break;
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setShowOutput(true);

    try {
      const result = await codeExecutor.executeCode(code, language);
      setExecutionResult(result);
    } catch (error) {
      setExecutionResult({
        success: false,
        output: "",
        error: "Execution failed: " + (error as Error).message,
        executionTime: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = async () => {
    setIsRunning(true);

    try {
      const results = await codeExecutor.runTestCases(
        code,
        language,
        testCases
      );

      //  Update test case statuses safely
      const updatedTestCases: TestCase[] = testCases.map((testCase, index) => ({
        ...testCase,
        status: results[index].passed ? "passed" : "failed",
      }));

      setTestResults(results);
      setTestCases(updatedTestCases);
    } catch (error) {
      console.error("Test execution failed:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await codeExecutor.submitSolution(code, language);
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src="/CodeCompassDM.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h6 className="font-semibold text-foreground">CodeCompass</h6>
              <p className="text-xs text-muted-foreground">
                Interactive Code Editor
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <ProfileDropdown />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel - Problem Description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription problem={sampleProblem} />
          </Panel>

          <PanelResizeHandle className="w-2 bg-border hover:bg-accent transition-colors" />

          {/* Right Panel - Code Editor and Output */}
          <Panel defaultSize={60} minSize={40}>
            <PanelGroup direction="vertical">
              {/* Code Editor */}
              <Panel defaultSize={70} minSize={50}>
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                        <span className="text-black font-bold text-xs">
                          {language === "javascript"
                            ? "JS"
                            : language === "python"
                            ? "PY"
                            : language === "java"
                            ? "JA"
                            : "C++"}
                        </span>
                      </div>
                      <span className="font-medium">Code Editor</span>
                      <span className="text-sm text-muted-foreground">
                        Write and execute your code
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <select
                        className="bg-background border border-border rounded px-2 py-1 text-sm"
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-1">
                    <MonacoEditor
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      language={language}
                    />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-border hover:bg-accent transition-colors" />

              {/* Bottom Panel - Test Cases/Output */}
              <Panel defaultSize={30} minSize={20}>
                {showOutput ? (
                  <div className="h-full flex flex-col">
                    <div className="border-b border-border">
                      <div className="flex">
                        <button
                          onClick={() => setShowOutput(false)}
                          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                          Test Cases
                        </button>
                        <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                          Output
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <CodeOutput
                        result={executionResult}
                        isRunning={isRunning}
                        onClear={() => {
                          setExecutionResult(null);
                          setShowOutput(false);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <TestCasesPanel
                    testCases={testCases}
                    testResults={testResults}
                    onTestCasesChange={(cases) => setTestCases(cases)}
                    onRunTests={handleRunTests}
                    isRunning={isRunning}
                  />
                )}
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
