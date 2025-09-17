export interface SubmissionResult {
    language_id: string;
    stdout: string;
    time: string;
    memory: string;
    stderr: string;
    token: string;
    compile_output: string;
    message: string;
    status: {
      id: number;
      description: string;
    } | undefined;
}

export interface BatchSubmissionResult {
  submissions: SubmissionResult[];
}

export interface Submission {
  source_code: string,
  language_id: string| number,
  stdin: string[],
  expected_outputs:string[]
}

export interface TestResult {
  id: string | number
  status: "passed" | "failed" | "error" | "timeout"
  output?: string
  expected?: string
  runtime?: string
  error?: string
}