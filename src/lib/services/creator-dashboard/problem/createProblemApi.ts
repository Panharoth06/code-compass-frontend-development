import { baseApi } from "../../baseApi";

export const createProblemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create problem mutation
    createProblem: builder.mutation<{status: string}, {
      title: string;
      description: string;
      difficulty: "EASY" | "MEDIUM" | "HARD";
      star: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
      coin: number;
      best_memory_usage: number;
      best_time_execution: number;
      test_cases: Array<{
        stdin: string;
        expected_outputs: string;
      }>;
      tag_names: string[];
      hints: Array<{
        description: string;
        is_locked: boolean;
      }>;
    }>({
      query: (problemData) => ({
        url: `problems`, // baseApi already includes /api/v1/
        method: 'POST',
        body: problemData
      }),
      invalidatesTags: ['Problems'],
    }),

    // Fetch unverified problems
    getUnverifiedProblems: builder.query<Array<{
      id: number;
      title: string;
      difficulty: "EASY" | "MEDIUM" | "HARD";
      tags: string[];
    }>, void>({
      query: () => ({
        url: 'problems/unverified', // baseApi already includes /api/v1/
        method: 'GET',
      }),
      providesTags: ['Problems'],
    }),
  }),
});

export const { 
  useCreateProblemMutation,
  useGetUnverifiedProblemsQuery
} = createProblemApi;