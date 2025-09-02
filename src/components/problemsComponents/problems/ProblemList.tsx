"use client";

import React from "react";

export default function ProblemList() {
  return (
    <div className="flex flex-col h-full bg-neutral-900 overflow-y-auto p-4 text-white">
      <h5 className="text-2xl font-bold mb-2">1. Two Sum</h5>
      <span className="text-sm text-emerald-400 mb-2">Easy</span>

      <div className="mb-2">
        <strong>Topics:</strong> Array, Hash Table
      </div>

      <div className="mb-2">
        <strong>Companies:</strong> Facebook, Google, Amazon
      </div>

      <div className="mb-4 p-2 bg-neutral-800 rounded">
        <strong>Hint:</strong> Use a hash map to store visited numbers.
      </div>

      <p className="mb-4">
        Given an array of integers <code>nums</code> and an integer{" "}
        <code>target</code>, return indices of the two numbers such that they
        add up to <code>target</code>.
      </p>

      <p className="mb-4">
        You may assume each input has exactly one solution.
      </p>
      <p className="mb-4">You cannot use the same element twice.</p>

      <h5 className="font-semibold mb-2">Example 1:</h5>
      <pre className="bg-neutral-800 p-2 rounded mb-2">
        {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]`}
      </pre>

      <h5 className="font-semibold mb-2">Example 2:</h5>
      <pre className="bg-neutral-800 p-2 rounded mb-2">
        {`Input: nums = [3,2,4], target = 6
Output: [1,2]`}
      </pre>

      <h5 className="font-semibold mb-2">Constraints:</h5>
      <ul className="list-disc ml-5 mb-4 text-sm text-neutral-300">
        <li>2 &lt; nums.length &lt; 10⁴</li>
        <li>-10⁹ &lt; nums[i] &lt; 10⁹</li>
        <li>-10⁹ &lt; target &lt; 10⁹</li>
        <li>Only one valid answer exists</li>
      </ul>
    </div>
  );
}
