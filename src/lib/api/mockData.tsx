import type { Problem } from "./apiSlice"

export const mockProblems: Problem[] = [
  {
    id: 1317,
    title: "Convert Integer to the Sum of Two No-Zero Integers",
    difficulty: "Easy",
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
        explanation: "Let a = 1 and b = 1. Both a and b are no-zero integers, and a + b = 2 = n, so return [1,1].",
      },
      {
        input: "n = 11",
        output: "[2,9]",
        explanation: "Let a = 2 and b = 9. Both a and b are no-zero integers, and a + b = 11 = n, so return [2,9].",
      },
    ],
    constraints: ["2 <= n <= 10^4"],
    likes: 806,
    dislikes: 213,
    submissions: 125000,
    acceptanceRate: "57.8%",
    onlineUsers: 1517,
  },
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Facebook"],
    description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
      <p>You may assume that each input would have <strong><em>exactly one solution</em></strong>, and you may not use the <em>same</em> element twice.</p>
      <p>You can return the answer in any order.</p>`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    likes: 45234,
    dislikes: 1456,
    submissions: 8234567,
    acceptanceRate: "49.1%",
    onlineUsers: 2341,
  },
]
