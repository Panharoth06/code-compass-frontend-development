export function TerminalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
      <div className="absolute inset-0 font-mono text-sm text-white leading-relaxed p-8">
        <pre className="select-none">
          {`// Competitive Programming Platform
import { Algorithm } from '@cp/core';
import { DataStructure } from '@cp/utils';

class Solution {
  solve(input: number[]): number {
    const n = input.length;
    const dp = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
      dp[i] = Math.max(dp[i-1] || 0, input[i]);
    }
    
    return dp[n-1];
  }
}

// Time Complexity: O(n)
// Space Complexity: O(n)

export default Solution;

// Test Cases
const testCases = [
  { input: [1, 2, 3, 4, 5], expected: 5 },
  { input: [-1, -2, -3], expected: -1 },
  { input: [0, 0, 0], expected: 0 },
];

function runTests() {
  const solution = new Solution();
  testCases.forEach((test, i) => {
    const result = solution.solve(test.input);
    console.log(\`Test \${i + 1}: \${result === test.expected ? 'PASS' : 'FAIL'}\`);
  });
}

runTests();`}
        </pre>
      </div>
    </div>
  )
}
