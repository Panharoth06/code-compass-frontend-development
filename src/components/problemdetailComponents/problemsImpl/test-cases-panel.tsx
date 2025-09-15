"use client";
import { Button } from "@/components/ui/button";
// import type { TestCaseResult } from "@/lib/code-executor";
import type { TestCase } from "@/types/testcase";

interface TestCasesPanelProps {
  testCases: TestCase[];
  // testResults: TestCaseResult[];
  onTestCasesChange: (cases: TestCase[]) => void;
  onRunTests: () => void;
  isRunning: boolean;
}

export function TestCasesPanel({
  // testResults,
  // onTestCasesChange,
  onRunTests,
  isRunning,
}: TestCasesPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-4 py-2 flex items-center justify-between">
        <h6 className="font-medium">Test Cases</h6>
        <Button size="sm" onClick={onRunTests} disabled={isRunning}>
          {isRunning ? "Running..." : "Run Tests"}
        </Button>
      </div>
      {/* <div className="flex-1 overflow-auto p-4 space-y-2">
        {testCases.map((testCase) => {
          const result = testResults.find((r) => r.testCaseId === testCase.id);

          return (
            <div
              key={testCase.id}
              className={`p-2 rounded border ${
                testCase.status === "passed"
                  ? "border-green-500 bg-green-50"
                  : testCase.status === "failed"
                  ? "border-red-500 bg-red-50"
                  : "border-border"
              }`}
            >
              <p className="text-base font-medium">
                Inputs: {JSON.stringify(testCase.inputs)}
              </p>
              {result && (
                <p className="text-xs text-muted-foreground">
                  Output: {result.actualOutput} | Expected:{" "}
                  {testCase.expectedOutput}
                </p>
              )}
              <p className="text-small">
                Status:{" "}
                <span
                  className={
                    testCase.status === "passed"
                      ? "text-green-600"
                      : testCase.status === "failed"
                      ? "text-red-600"
                      : "text-gray-500"
                  }
                >
                  {testCase.status}
                </span>
              </p>
            </div>
          );
        })} */}
      {/* </div> */}
    </div>
  );
}
