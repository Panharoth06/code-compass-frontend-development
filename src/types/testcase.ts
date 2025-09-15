export type TestCaseStatus = "pending" | "passed" | "failed";

export interface TestCase {
  input: string;
  expected_outputs?: string;
}
