// Mock code execution service for demonstration
// In a real application, this would connect to a backend service

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  memoryUsage?: number;
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTime: number;
  error?: string;
}

class CodeExecutor {
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private validateSyntax(
    code: string,
    language: string
  ): { isValid: boolean; error?: string } {
    // Basic syntax validation for demo purposes
    if (!code.trim()) {
      return { isValid: false, error: "Code cannot be empty" };
    }

    switch (language) {
      case "javascript":
        if (!code.includes("function") && !code.includes("=>")) {
          return {
            isValid: false,
            error: "JavaScript code must contain a function",
          };
        }
        break;
      case "python":
        if (!code.includes("def ") && !code.includes("class ")) {
          return {
            isValid: false,
            error: "Python code must contain a function or class definition",
          };
        }
        break;
      case "java":
        if (!code.includes("class ") || !code.includes("public ")) {
          return {
            isValid: false,
            error: "Java code must contain a public class",
          };
        }
        break;
      case "cpp":
        if (
          !code.includes("vector") &&
          !code.includes("int") &&
          !code.includes("return")
        ) {
          return {
            isValid: false,
            error: "C++ code must contain proper function signature",
          };
        }
        break;
    }

    return { isValid: true };
  }

  private simulateExecution(
    code: string,
    language: string,
    input: Record<string, string>
  ): ExecutionResult {
    // Simulate different execution scenarios
    const executionTime = Math.floor(Math.random() * 100) + 20;
    const memoryUsage = Math.floor(Math.random() * 50) + 10;

    // Simulate various outcomes based on code content
    if (code.includes("throw") || code.includes("error")) {
      return {
        success: false,
        output: "",
        error: "Runtime Error: Exception thrown during execution",
        executionTime,
        memoryUsage,
      };
    }

    if (code.includes("infinite") || code.includes("while(true)")) {
      return {
        success: false,
        output: "",
        error: "Time Limit Exceeded: Code execution timed out",
        executionTime: 5000,
        memoryUsage,
      };
    }

    // Mock successful execution for the no-zero integers problem
    const n = Number.parseInt(input.n || "2");

    if (isNaN(n) || n < 2) {
      return {
        success: false,
        output: "",
        error: "Invalid input: n must be a positive integer >= 2",
        executionTime,
        memoryUsage,
      };
    }

    // ✅ Initialize result with fallback directly
    let result: string = "[1,1]";

    // Simple algorithm to find two no-zero integers
    for (let a = 1; a < n; a++) {
      const b = n - a;
      if (!a.toString().includes("0") && !b.toString().includes("0")) {
        result = `[${a},${b}]`;
        break;
      }
    }

    return {
      success: true,
      output: result,
      executionTime,
      memoryUsage,
    };
  }

  async executeCode(code: string, language: string): Promise<ExecutionResult> {
    await this.delay(500); // Simulate network delay

    const syntaxCheck = this.validateSyntax(code, language);
    if (!syntaxCheck.isValid) {
      return {
        success: false,
        output: "",
        error: `Syntax Error: ${syntaxCheck.error}`,
        executionTime: 0,
      };
    }

    // Simulate compilation time for compiled languages
    if (language === "java" || language === "cpp") {
      await this.delay(1000);
    }

    return this.simulateExecution(code, language, { n: "2" });
  }

  async runTestCases(
    code: string,
    language: string,
    testCases: Array<{
      id: string;
      inputs: Record<string, string>;
      expectedOutput?: string;
    }>
  ): Promise<TestCaseResult[]> {
    await this.delay(300); // Initial delay

    const syntaxCheck = this.validateSyntax(code, language);
    if (!syntaxCheck.isValid) {
      return testCases.map((testCase) => ({
        testCaseId: testCase.id,
        passed: false,
        actualOutput: "",
        expectedOutput: testCase.expectedOutput || "",
        executionTime: 0,
        error: `Syntax Error: ${syntaxCheck.error}`,
      }));
    }

    const results: TestCaseResult[] = [];

    for (const testCase of testCases) {
      await this.delay(200); // Delay between test cases

      const execution = this.simulateExecution(code, language, testCase.inputs);

      const result: TestCaseResult = {
        testCaseId: testCase.id,
        passed:
          execution.success &&
          (!testCase.expectedOutput ||
            execution.output === testCase.expectedOutput),
        actualOutput: execution.output,
        expectedOutput: testCase.expectedOutput || "",
        executionTime: execution.executionTime,
        error: execution.error,
      };

      // Add some randomness to make it more realistic
      if (execution.success && Math.random() > 0.85) {
        result.passed = false;
        result.error = "Wrong Answer: Output does not match expected result";
      }

      results.push(result);
    }

    return results;
  }

  async submitSolution(
    code: string,
    language: string
  ): Promise<{
    accepted: boolean;
    runtime: number;
    memory: number;
    testsPassed: number;
    totalTests: number;
    error?: string;
  }> {
    await this.delay(2000); // Longer delay for submission

    const syntaxCheck = this.validateSyntax(code, language);
    if (!syntaxCheck.isValid) {
      return {
        accepted: false,
        runtime: 0,
        memory: 0,
        testsPassed: 0,
        totalTests: 100,
        error: `Compilation Error: ${syntaxCheck.error}`,
      };
    }

    // Simulate submission results
    const totalTests = 100;
    const testsPassed = Math.floor(Math.random() * 20) + 80; // 80-100 tests passed
    const accepted = testsPassed === totalTests;
    const runtime = Math.floor(Math.random() * 50) + 10;
    const memory = Math.floor(Math.random() * 20) + 15;

    return {
      accepted,
      runtime,
      memory,
      testsPassed,
      totalTests,
      error: accepted ? undefined : "Some test cases failed",
    };
  }
}

export const codeExecutor = new CodeExecutor();
