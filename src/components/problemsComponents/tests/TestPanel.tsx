"use client";
import { useState } from "react";

interface TestPanelProps {
  problemId: string;
  code: string;
}

interface TestCase {
  input: number[];
  target: number;
  expected: number[];
}

export default function TestPanel({ problemId, code }: TestPanelProps) {
  const [output, setOutput] = useState<string>("");

  const testCases: TestCase[] = [
    { input: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { input: [3, 2, 4], target: 6, expected: [1, 2] },
  ];

  const runCode = () => {
    try {
      // Wrap user code (expects a function named "twoSum")
      const userFunc: (nums: number[], target: number) => number[] =
        new Function(`${code}; return twoSum;`)();

      let results = "";
      for (const t of testCases) {
        const result = userFunc(t.input, t.target);
        results += `Input: ${JSON.stringify(t.input)}, target=${t.target}\n`;
        results += `Expected: ${JSON.stringify(t.expected)}\n`;
        results += `Got: ${JSON.stringify(result)}\n\n`;
      }
      setOutput(results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOutput("Runtime Error: " + err.message);
      } else {
        setOutput("Runtime Error: " + String(err));
      }
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-sm">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold">Test Cases for Problem {problemId}</h5>
        <button
          onClick={runCode}
          className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Run Code
        </button>
      </div>

      <pre className="flex-1 overflow-auto bg-black text-green-400 p-3 rounded-md">
        {output || "Click Run Code to see results..."}
      </pre>
    </div>
  );
}
