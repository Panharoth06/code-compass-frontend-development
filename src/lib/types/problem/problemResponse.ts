export interface ProblemResponse {
  id: number;
  best_memory_usage: number;
  best_time_execution: number;
  coin: number;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  star: "ONE" | "TWO" | "THREE";
  title: string;
  test_cases: TestCase[];
  hints: Hint[];
  tag_names: string[];
  author: string;
}

export interface TestCase {
  stdin: string;
  expected_outputs: string;
}

export interface TestResult {
  id: string | number;
  status: "passed" | "failed" | "error" | "timeout";
  output?: string;
  expected?: string;
  runtime?: string;
  error?: string;
  memory?: string;
}

export interface Hint {
  id: number;
  description: string;
  is_locked: boolean;
}


export interface ProblemSummaryResponse {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

// {
//   "id": 0,
//   "best_memory_usage": 0,
//   "best_time_execution": 0.1,
//   "coin": "string",
//   "description": "string",
//   "difficulty": "EASY",
//   "star": "ONE",
//   "title": "string",
//   "test_cases": [
//     {
//       "stdin": "string",
//       "expected_outputs": "string"
//     }
//   ],
//   "tag_names": [
//     "string"
//   ],
//   "hints": [
//     {
//       "hint": "string",
//       "isLocked": true
//     }
//   ],
//   "author": "string"
// }
