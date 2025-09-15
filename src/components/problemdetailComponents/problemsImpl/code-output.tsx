// "use client";
// /* eslint-disable */
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Play, Upload, Plus, X, Check, AlertCircle, Clock } from "lucide-react";
// // import { apiCall, API_CONFIG, JUDGE0_LANGUAGE_IDS } from "@/lib/api"; // Uncommented, assuming defined
// import {
//   ProblemResponse,
//   TestCase,
//   TestResult,
// } from "@/lib/types/problem/problemResponse";
// import { SubmissionResult } from "@/lib/types/submission/Submission";

// type InternalTestCase = TestCase & { id: string }; // Add id for internal use

// // type SubmissionResult = {
// //   id: string;
// //   status: "accepted" | "wrong_answer" | "runtime_error" | "pending";
// //   runtime?: string;
// //   memory?: string;
// //   testsPassed?: number;
// //   totalTests?: number;
// //   submittedAt: Date;
// //   language: string;
// //   errorMessage?: string;
// // };

// interface Props {
//   problem: ProblemResponse;
//   code: string;
//   language: string;
// }

// const TestAndOutputPanel: React.FC<Props> = ({ problem, code, language }) => {
//   const [testCases, setTestCases] = useState<InternalTestCase[]>(
//     problem.test_cases.map((tc, i) => ({
//       id: (i + 1).toString(),
//       stdin: tc.stdin,
//       expected_outputs: tc.expected_outputs,
//     }))
//   );
//   const [testResults, setTestResults] = useState<TestResult[]>([]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState("testcase");
//   const [showSubmissionModal, setShowSubmissionModal] = useState(false);
//   const [submissionResult, setSubmissionResult] =
//     useState<SubmissionResult | null>(null);
//   const [inputError, setInputError] = useState<string | null>(null);

//   // --- helpers ---
//   const validateInput = (stdin: string) => {
//     return stdin.trim().length > 0;
//   };

//   const language_id = (language: string) => {
//     const JUDGE0_LANGUAGE_IDS: Record<string, number> = {
//       javascript: 63,
//       python: 71,
//       java: 62,
//       cpp: 54,
//     };
//     return JUDGE0_LANGUAGE_IDS[language] || 54; // default to c++
//   }

//   const formatStdinForLanguage = (testCase: InternalTestCase) => {
//     switch (language) {
//       case "java":
//         return `${testCase.stdin}\n`;
//       case "cpp":
//       case "python":
//       case "javascript":
//         return testCase.stdin;
//       default:
//         return testCase.stdin;
//     }
//   };

//   const processSubmissionResult = (
//     submission: SubmissionResult,
//     testCase: InternalTestCase
//   ): TestResult => {
//     let status: "passed" | "failed" | "error" | "timeout" = "error";
//     switch (submission.status?.id) {
//       case 3:
//         status =
//           submission.stdout?.trim() === testCase.expected_outputs
//             ? "passed"
//             : "failed";
//         break;
//       case 4:
//         status = "failed";
//         break;
//       case 5:
//         status = "timeout";
//         break;
//       default:
//         status = "error";
//         break;
//     }
//     return {
//       id: testCase.id,
//       status,
//       output: submission.stdout?.trim() || "No output",
//       expected: testCase.expected_outputs,
//       runtime: submission.time
//         ? `${(parseFloat(submission.time) * 1000).toFixed(0)}ms`
//         : "N/A",
//       memory: submission.memory ? `${submission.memory} KB` : "N/A",
//       error:
//         submission.stderr ||
//         (submission.status?.id !== 3
//           ? submission.status?.description
//           : undefined),
//     };
//   };

//   // --- actions ---
//   const handleRun = async () => {
//     if (!testCases.every((tc) => validateInput(tc.stdin))) {
//       setInputError(
//         "Invalid input: Ensure all test case inputs are non-empty."
//       );
//       return;
//     }
//     setInputError(null);
//     setIsRunning(true);
//     setTestResults([]);
//     setActiveTab("result");
//     try {
//       const stdinInputs = testCases.map(formatStdinForLanguage);
//       const expectedOutputs = testCases.map((tc) => tc.expected_outputs);
//       const batchResult = await apiCall(API_CONFIG.endpoints.batch, {
//         source_code: code,
//         language_id: JUDGE0_LANGUAGE_IDS[language],
//         stdin: stdinInputs,
//         expected_outputs: expectedOutputs,
//       });
//       const results: TestResult[] = batchResult.submissions.map(
//         (sub: any, index: number) =>
//           processSubmissionResult(sub, testCases[index])
//       );
//       setTestResults(results);
//     } catch (err) {
//       setInputError("Failed to run code. Check your inputs and try again.");
//       console.error("[Panel] Run error:", err);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const runSingleTest = async (testCase: InternalTestCase) => {
//     if (!validateInput(testCase.stdin)) {
//       setInputError("Invalid input for this test case.");
//       return;
//     }
//     setInputError(null);
//     setActiveTab("result");
//     try {
//       const stdin = formatStdinForLanguage(testCase);
//       const result = await apiCall(API_CONFIG.endpoints.batch, {
//         source_code: code,
//         language_id: JUDGE0_LANGUAGE_IDS[language],
//         stdin: [stdin],
//         expected_outputs: [testCase.expected_outputs],
//       });
//       const testResult = processSubmissionResult(
//         result.submissions[0],
//         testCase
//       );
//       setTestResults([testResult]);
//     } catch (err) {
//       setInputError("Failed to run test case.");
//       console.error("[Panel] Single run error:", err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!testCases.every((tc) => validateInput(tc.stdin))) {
//       setInputError(
//         "Invalid input: Ensure all test case inputs are non-empty."
//       );
//       return;
//     }
//     setInputError(null);
//     setIsSubmitting(true);
//     setShowSubmissionModal(true);
//     setSubmissionResult({
//       id: `sub_${Date.now()}`,
//       status: "pending",
//       submittedAt: new Date(),
//       language: language.toUpperCase(),
//     });
//     try {
//       const stdinInputs = testCases.map(formatStdinForLanguage);
//       const expectedOutputs = testCases.map((tc) => tc.expected_outputs);
//       const result = await apiCall(API_CONFIG.endpoints.batch, {
//         source_code: code,
//         language_id: JUDGE0_LANGUAGE_IDS[language],
//         stdin: stdinInputs,
//         expected_outputs: expectedOutputs,
//       });
//       const passed = result.submissions.filter(
//         (sub: any, i: number) =>
//           sub.status?.id === 3 && sub.stdout?.trim() === expectedOutputs[i]
//       ).length;
//       const total = result.submissions.length;
//       const avgRuntime =
//         result.submissions.reduce(
//           (sum: number, sub: any) => sum + (parseFloat(sub.time) || 0),
//           0
//         ) / total;
//       const avgMemory =
//         result.submissions.reduce(
//           (sum: number, sub: any) => sum + (sub.memory || 0),
//           0
//         ) / total;
//       const overall = passed === total ? "accepted" : "wrong_answer";
//       setSubmissionResult({
//         status: submissionResult?.status,
//         submittedAt: new Date(),
//         language: language.toUpperCase(),
//         runtime: `${(avgRuntime * 1000).toFixed(0)}ms`,
//         memory: `${Math.round(avgMemory)} KB`,
//       });
//     } catch (err) {
//       setSubmissionResult({
//         status: submissionResult?.status,
//         submittedAt: new Date(),
//         language: language.toUpperCase(),
//         errorMessage: (err as Error).message,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- keyboard shortcuts ---
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (e.ctrlKey && e.key === "Enter") {
//         handleRun();
//       }
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [handleRun]);

//   // --- render ---
//   const addTestCase = () => {
//     const newId = (testCases.length + 1).toString();
//     setTestCases((prev) => [
//       ...prev,
//       { id: newId, stdin: "", expected_outputs: "" },
//     ]);
//   };

//   const removeTestCase = (id: string) => {
//     if (testCases.length > 1) {
//       setTestCases((prev) => prev.filter((tc) => tc.id !== id));
//     }
//   };

//   const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
//     setTestCases((prev) =>
//       prev.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
//     );
//   };

//   return (
//     <div className="min-h-0 border-t border-border flex flex-col bg-background">
//       {/* action bar */}
//       <div className="p-3 border-b border-border flex items-center justify-between bg-muted">
//         <div className="flex items-center gap-2">
//           <Button
//             onClick={handleRun}
//             disabled={isRunning || isSubmitting}
//             size="sm"
//             variant="outline"
//             className="bg-background hover:bg-accent"
//           >
//             <Play className="w-4 h-4 mr-2" />
//             {isRunning ? "Running..." : "Run (Ctrl+Enter)"}
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={isRunning || isSubmitting}
//             size="sm"
//             className="dark:bg-primary dark:hover:bg-primary/90 bg-primary/90 hover:cursor-pointer text-black"
//           >
//             <Upload className="w-4 h-4 mr-2" />
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </Button>
//         </div>
//         <div className="text-xs text-muted-foreground">
//           {isRunning || isSubmitting ? "Processing..." : "Ready"}
//         </div>
//       </div>
//       {/* error message */}
//       {inputError && (
//         <div className="p-2 bg-red-500/10 text-red-400 text-sm flex items-center gap-2">
//           <AlertCircle className="w-4 h-4" />
//           {inputError}
//         </div>
//       )}
//       {/* tabs */}
//       <Tabs
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="flex flex-col flex-1 min-h-0"
//       >
//         {/* Tab Headers */}
//         <TabsList className="grid grid-cols-2 w-full bg-muted shrink-0">
//           <TabsTrigger value="testcase" className="text-sm font-medium">
//             Test Cases
//           </TabsTrigger>
//           <TabsTrigger value="result" className="text-sm font-medium">
//             Results
//           </TabsTrigger>
//         </TabsList>

//         {/* Test Cases Tab */}
//         <TabsContent
//           value="testcase"
//           className="flex-1 min-h-0 p-3 overflow-y-auto"
//         >
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-semibold">Custom Test Cases</h3>
//               <Button
//                 onClick={addTestCase}
//                 size="sm"
//                 variant="ghost"
//                 className="text-xs"
//               >
//                 <Plus className="w-4 h-4 mr-1" />
//                 Add Case
//               </Button>
//             </div>

//             {testCases.map((tc, i) => (
//               <Card key={tc.id} className="p-3 bg-background">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium">Case {i + 1}</span>
//                   <div className="flex gap-1">
//                     <Button
//                       onClick={() => runSingleTest(tc)}
//                       size="icon"
//                       variant="ghost"
//                       title="Run Test Case"
//                     >
//                       <Play className="w-4 h-4" />
//                     </Button>
//                     {testCases.length > 1 && (
//                       <Button
//                         onClick={() => removeTestCase(tc.id)}
//                         size="icon"
//                         variant="ghost"
//                         title="Remove Test Case"
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div>
//                     <label className="text-xs font-medium text-muted-foreground">
//                       Input
//                     </label>
//                     <textarea
//                       value={tc.stdin}
//                       onChange={(e) =>
//                         updateTestCase(tc.id, "stdin", e.target.value)
//                       }
//                       placeholder={`Enter input here\nExample:\n2 7 11 15\n9`}
//                       className="w-full rounded-md border bg-background text-xs font-mono p-2 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black/30"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs font-medium text-muted-foreground">
//                       Expected Output
//                     </label>
//                     <textarea
//                       value={tc.expected_outputs}
//                       onChange={(e) =>
//                         updateTestCase(
//                           tc.id,
//                           "expected_outputs",
//                           e.target.value
//                         )
//                       }
//                       placeholder={`Enter expected output\nExample:\n0 1`}
//                       className="w-full rounded-md border bg-background text-xs font-mono p-2 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black/30"
//                     />
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         {/* Results Tab */}
//         <TabsContent
//           value="result"
//           className="flex-1 min-h-0 p-3 overflow-y-auto"
//         >
//           {testResults.length === 0 ? (
//             <div className="text-center text-muted-foreground py-8 text-sm">
//               Run your code to see results here
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {testResults.map((res, i) => (
//                 <Card key={res.id} className="p-3 bg-background">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-medium">Case {i + 1}</span>
//                     <Badge
//                       className={
//                         res.status === "passed"
//                           ? "bg-green-500/20 text-green-400"
//                           : res.status === "timeout"
//                           ? "bg-yellow-500/20 text-yellow-400"
//                           : "bg-red-500/20 text-red-400"
//                       }
//                     >
//                       {res.status === "passed" && (
//                         <Check className="w-3 h-3 mr-1" />
//                       )}
//                       {res.status === "timeout" && (
//                         <Clock className="w-3 h-3 mr-1" />
//                       )}
//                       {res.status !== "passed" && res.status !== "timeout" && (
//                         <AlertCircle className="w-3 h-3 mr-1" />
//                       )}
//                       {res.status.toUpperCase()}
//                     </Badge>
//                   </div>
//                   <div className="text-xs grid grid-cols-2 gap-2">
//                     <div>
//                       <span className="font-medium">Output:</span>{" "}
//                       <code>{res.output}</code>
//                     </div>
//                     <div>
//                       <span className="font-medium">Expected:</span>{" "}
//                       <code>{res.expected}</code>
//                     </div>
//                     <div>
//                       <span className="font-medium">Runtime:</span>{" "}
//                       {res.runtime}
//                     </div>
//                     {res.memory && (
//                       <div>
//                         <span className="font-medium">Memory:</span>{" "}
//                         {res.memory}
//                       </div>
//                     )}
//                     {res.error && (
//                       <div className="col-span-2 text-red-400">
//                         <span className="font-medium">Error:</span> {res.error}
//                       </div>
//                     )}
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//       {/* submission modal */}
//       {showSubmissionModal && submissionResult && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Card className="w-80 p-4 space-y-3 bg-background">
//             <h3 className="text-lg font-semibold text-center">
//               Submission Verdict
//             </h3>
//             <Badge
//               className={
//                 submissionResult.status === "accepted"
//                   ? "bg-green-500/20 text-green-400 w-full justify-center text-base"
//                   : submissionResult.status === "pending"
//                   ? "bg-blue-500/20 text-blue-400 w-full justify-center text-base"
//                   : "bg-red-500/20 text-red-400 w-full justify-center text-base"
//               }
//             >
//               {submissionResult.status === "accepted" && (
//                 <Check className="w-4 h-4 mr-2" />
//               )}
//               {submissionResult.status === "pending" && (
//                 <Clock className="w-4 h-4 mr-2" />
//               )}
//               {submissionResult.status !== "accepted" &&
//                 submissionResult.status !== "pending" && (
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                 )}
//               {submissionResult.status.toUpperCase()}
//             </Badge>
//             {submissionResult.testsPassed !== undefined && (
//               <div className="text-sm text-center">
//                 Passed: {submissionResult.testsPassed}/
//                 {submissionResult.totalTests}
//               </div>
//             )}
//             {submissionResult.runtime && (
//               <div className="text-sm text-center">
//                 Runtime: {submissionResult.runtime}
//               </div>
//             )}
//             {submissionResult.memory && (
//               <div className="text-sm text-center">
//                 Memory: {submissionResult.memory}
//               </div>
//             )}
//             {submissionResult.errorMessage && (
//               <div className="text-sm text-red-400 text-center">
//                 {submissionResult.errorMessage}
//               </div>
//             )}
//             <div className="text-sm text-center">
//               Best Runtime: {problem.best_time_execution}s
//             </div>
//             <div className="text-sm text-center">
//               Best Memory: {problem.best_memory_usage} KB
//             </div>
//             <div className="text-sm text-center">Author: {problem.author}</div>
//             <Button
//               onClick={() => setShowSubmissionModal(false)}
//               className="w-full mt-2"
//               variant="outline"
//             >
//               Close
//             </Button>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestAndOutputPanel;



import React from 'react'

const CodeOutput = () => {
  return (
    <div>code-output</div>
  )
}

export default CodeOutput