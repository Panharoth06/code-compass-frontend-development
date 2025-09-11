import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  companies: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  likes: number;
  dislikes: number;
  submissions: number;
  acceptanceRate: string;
  onlineUsers: number;
}

export interface Submission {
  id: string;
  problemId: number;
  userId: string;
  code: string;
  language: string;
  status:
    | "Accepted"
    | "Wrong Answer"
    | "Time Limit Exceeded"
    | "Runtime Error"
    | "Compile Error";
  runtime?: number;
  memory?: number;
  submittedAt: string;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  runtime: number;
  error?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  solvedProblems: number;
  totalSubmissions: number;
  acceptanceRate: string;
  ranking: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token?: string } };
      const token = state.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Problem", "User", "Submission", "TestResult"],
  endpoints: (builder) => ({
    getProblems: builder.query<
      Problem[],
      { difficulty?: string; topic?: string; company?: string }
    >({
      query: (params = {}) => ({
        url: "/problems",
        params,
      }),
      providesTags: ["Problem"],
    }),
    getProblem: builder.query<Problem, number>({
      query: (id) => `/problems/${id}`,
      providesTags: (result, error, id) => [{ type: "Problem", id }],
    }),

    submitSolution: builder.mutation<
      Submission,
      { problemId: number; code: string; language: string }
    >({
      query: (body) => ({
        url: "/submissions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Submission"],
    }),

    runTestCases: builder.mutation<
      TestResult[],
      {
        problemId: number;
        code: string;
        language: string;
        testCases: Array<{
          inputs: Record<string, string>;
          expectedOutput: string;
        }>;
      }
    >({
      query: (body) => ({
        url: "/test-cases/run",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TestResult"],
    }),

    getUserSubmissions: builder.query<
      Submission[],
      { userId: string; problemId?: number }
    >({
      query: ({ userId, problemId }) => ({
        url: `/users/${userId}/submissions`,
        params: problemId ? { problemId } : {},
      }),
      providesTags: ["Submission"],
    }),

    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),

    updateUserProfile: builder.mutation<
      UserProfile,
      { userId: string; name?: string; avatar?: string }
    >({
      query: ({ userId, ...body }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
  }),
});

export const {
  useGetProblemsQuery,
  useGetProblemQuery,
  useSubmitSolutionMutation,
  useRunTestCasesMutation,
  useGetUserSubmissionsQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = apiSlice;
