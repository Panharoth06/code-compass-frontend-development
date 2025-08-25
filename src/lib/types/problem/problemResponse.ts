export type ProblemResponse = {
    id: number;
    best_memory_usage: number;
    best_time_execution: number;
    coin: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    star: "ONE" | "TWO" | "THREE";
    title: string;
    test_cases: {
        input: string;
        expectedOutput: string;
    }[];
    tag_names: string[];
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
//       "input": "string",
//       "expectedOutput": "string"
//     }
//   ],
//   "tag_names": [
//     "string"
//   ]
// }