export type TestCaseStatus = "pending" | "passed" | "failed";

export interface TestCase {
  id: string;
  inputs: Record<string, string>;
  expectedOutput?: string;
  status: TestCaseStatus;
}
