import { baseApi } from "../../baseApi";
// Define types based on the API response
export interface TestCase {
  stdin: string;
  expected_outputs: string;
}

export interface Hint {
  id: number;
  description: string;
  is_locked: boolean;
}

export interface Problem {
  id: number;
  best_memory_usage: number;
  best_time_execution: number;
  coin: number;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  star: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  title: string;
  test_cases: TestCase[];
  tag_names: string[];
  hints: Hint[];
  author: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const displayAllProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProblems: builder.query<Problem[], void>({
      query: () => ({
        url: `problems/me`,
        method: 'GET',
      }),
      providesTags: () => [
        { type: 'Problems' }
      ],
    }),
    updateProblem: builder.mutation<{status: string}, {id: number, data: Partial<Problem>}>({
      query: ({id, data}) => ({
        url: `problems/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: () => [
        {type: 'Problems'}
      ],
    }),
    deleteProblem: builder.mutation<{status: string}, number>({
      query: (id) => ({
        url: `problems/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [
        {type: 'Problems'}
      ],
    }),
  }),
});

export const { 
  useGetMyProblemsQuery, 
  useUpdateProblemMutation,
  useDeleteProblemMutation 
} = displayAllProblemsApi;