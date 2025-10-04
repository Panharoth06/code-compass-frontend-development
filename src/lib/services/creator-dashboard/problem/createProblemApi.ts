import { baseApi } from "../../baseApi";

// Define the types based on your API documentation
export interface CreateProblemRequest {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  star: "ZERO" | "ONE" | "TWO" | "THREE";
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
}

export interface CreateProblemResponse {
  id: number;
  best_memory_usage: number;
  best_time_execution: number;
  coin: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  star: "ZERO" | "ONE" | "TWO" | "THREE";
  title: string;
  test_cases: Array<{
    stdin: string;
    expected_outputs: string;
  }>;
  tag_names: string[];
  hints: Array<{
    id: number;
    description: string;
    is_locked: boolean;
  }>;
  author: string;
  status: "PENDING";
}

export const createProblemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProblem: builder.mutation<CreateProblemResponse, CreateProblemRequest>({
      query: (problemData) => ({
        url: `problems`,
        method: 'POST',
        body: problemData,
      }),
      invalidatesTags: () => [
        { type: 'Problems' }
      ],
    }),
  }),
});

export const { useCreateProblemMutation } = createProblemApi;