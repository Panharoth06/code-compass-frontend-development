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
import { useState, useEffect } from "react";
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

export default function ProblemDetailsComponents() {
  const [code, setCode] = useState<string>(`class Solution {
public:
    vector<int> getNoZeroIntegers(int n) {
        for (int a = 1; a < n; a++) {
            int b = n - a;
            if (to_string(a).find('0') == string::npos &&
                to_string(b).find('0') == string::npos) {
                return {a, b};
            }
        }
        return {1, n-1};
    }
};`);

  const [language, setLanguage] = useState<string>("cpp");
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    switch (newLanguage) {
      case "javascript":
        setCode(`var getNoZeroIntegers = function(n) {
    for (let a = 1; a < n; a++) {
        let b = n - a;
        if (!a.toString().includes('0') && !b.toString().includes('0')) return [a, b];
    }
    return [1, n-1];
};`);
        break;
      case "python":
        setCode(`class Solution:
    def getNoZeroIntegers(self, n: int):
        for a in range(1, n):
            b = n - a
            if '0' not in str(a) and '0' not in str(b):
                return [a, b]
        return [1, n-1]`);
        break;
      case "java":
        setCode(`class Solution {
    public int[] getNoZeroIntegers(int n) {
        for(int a=1; a<n; a++){
            int b = n - a;
            if(!String.valueOf(a).contains("0") && !String.valueOf(b).contains("0"))
                return new int[]{a,b};
        }
        return new int[]{1,n-1};
    }
}`);
        break;
      case "cpp":
        setCode(`class Solution {
public:
    vector<int> getNoZeroIntegers(int n) {
        for(int a=1; a<n; a++){
            int b=n-a;
            if(to_string(a).find('0')==string::npos && to_string(b).find('0')==string::npos)
                return {a,b};
        }
        return {1,n-1};
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
      setTestResults(results);
      setTestCases(
        testCases.map((c, i) => ({
          ...c,
          status: results[i].passed ? "passed" : "failed",
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await codeExecutor.submitSolution(code, language);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="/CodeCompassDM.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h6 className="font-semibold text-foreground text-sm sm:text-base">
              CodeCompass
            </h6>
            <p className="text-xs text-muted-foreground">
              Interactive Code Editor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1 sm:mr-2" /> Settings
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-1 sm:mr-2" /> Share
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play className="w-4 h-4 mr-1 sm:mr-2" />{" "}
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send className="w-4 h-4 mr-1 sm:mr-2" />{" "}
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <ProfileDropdown />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
          {/* Problem Description */}
          <Panel defaultSize={isMobile ? 30 : 40} minSize={isMobile ? 20 : 30}>
            <ProblemDescription problem={sampleProblem} />
          </Panel>

          <PanelResizeHandle
            className={`bg-border hover:bg-accent transition-colors ${
              isMobile ? "h-2 w-full" : "w-2 h-full"
            }`}
          />

          {/* Code + Output */}
          <Panel defaultSize={isMobile ? 70 : 60} minSize={isMobile ? 50 : 40}>
            <PanelGroup direction="vertical">
              {/* Code Editor */}
              <Panel
                defaultSize={isMobile ? 65 : 70}
                minSize={isMobile ? 40 : 50}
              >
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

                  <div className="flex-1 min-h-[200px]">
                    <MonacoEditor
                      value={code}
                      onChange={(v) => setCode(v || "")}
                      language={language}
                    />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-border hover:bg-accent transition-colors" />

              {/* Test Cases / Output */}
              <Panel
                defaultSize={isMobile ? 35 : 30}
                minSize={isMobile ? 20 : 20}
              >
                {showOutput ? (
                  <CodeOutput
                    result={executionResult}
                    isRunning={isRunning}
                    onClear={() => {
                      setExecutionResult(null);
                      setShowOutput(false);
                    }}
                  />
                ) : (
                  <TestCasesPanel
                    testCases={testCases}
                    testResults={testResults}
                    onTestCasesChange={setTestCases}
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
