import { baseApi } from "../../baseApi";

export interface TestCase {
  stdin: string;
  expected_outputs: string;
}

export interface Hint {
  description: string;
  is_locked: boolean;
}

export interface ModifyProblemRequest {
  title?: string;
  description?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  star?: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  coin?: number;
  best_memory_usage?: number;
  best_time_execution?: number;
  test_cases?: TestCase[];
  tag_names?: string[];
  hints?: Hint[];
}

export interface ModifyProblemResponse {
  message?: string;
  data?: any;
}

export const modifyProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProblem: builder.mutation<ModifyProblemResponse, { problemId: number; data: ModifyProblemRequest }>({
      query: ({ problemId, data }) => ({
        url: `problems/${problemId}`,
        method: 'PATCH',
        body: data,
      }),
      // Invalidate related caches after successful update
      invalidatesTags: (result, error, { problemId }) => [
        { type: 'Problems', id: problemId },
        'Problems',
        'VerifiedProblems',
        'UnverifiedProblems',
      ],
      // Add error handling and logging
      transformErrorResponse: (response: any) => {
        console.error('Update problem API error:', response);
        return response;
      },
      // Add response transformation and logging
      transformResponse: (response: any) => {
        console.log('Update problem API response:', response);
        return response;
      },
    }),
    
    // Additional helper mutation for partial updates
    patchProblem: builder.mutation<ModifyProblemResponse, { problemId: number; data: Partial<ModifyProblemRequest> }>({
      query: ({ problemId, data }) => ({
        url: `problems/${problemId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { problemId }) => [
        { type: 'Problems', id: problemId },
        'Problems',
        'VerifiedProblems',
        'UnverifiedProblems',
      ],
      transformErrorResponse: (response: any) => {
        console.error('Patch problem API error:', response);
        return response;
      },
      transformResponse: (response: any) => {
        console.log('Patch problem API response:', response);
        return response;
      },
    }),

    // Update only basic info (title, description, difficulty)
    updateProblemBasicInfo: builder.mutation<ModifyProblemResponse, { 
      problemId: number; 
      title?: string;
      description?: string;
      difficulty?: "EASY" | "MEDIUM" | "HARD";
    }>({
      query: ({ problemId, ...data }) => ({
        url: `problems/${problemId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { problemId }) => [
        { type: 'Problems', id: problemId },
        'Problems',
        'VerifiedProblems',
        'UnverifiedProblems',
      ],
    }),

    // Update test cases only
    updateProblemTestCases: builder.mutation<ModifyProblemResponse, { 
      problemId: number; 
      test_cases: TestCase[];
    }>({
      query: ({ problemId, test_cases }) => ({
        url: `problems/${problemId}`,
        method: 'PATCH',
        body: { test_cases },
      }),
      invalidatesTags: (result, error, { problemId }) => [
        { type: 'Problems', id: problemId },
        'Problems',
      ],
    }),

    // Update tags only
    updateProblemTags: builder.mutation<ModifyProblemResponse, { 
      problemId: number; 
      tag_names: string[];
    }>({
      query: ({ problemId, tag_names }) => ({
        url: `problems/${problemId}`,
        method: 'PATCH',
        body: { tag_names },
      }),
      invalidatesTags: (result, error, { problemId }) => [
        { type: 'Problems', id: problemId },
        'Problems',
        'VerifiedProblems',
        'UnverifiedProblems',
      ],
    }),

    // Update hints only
    updateProblemHints: builder.mutation<ModifyProblemResponse, { 
      problemId: number; 
      hints: Hint[];
    }>({
      query: ({ problemId, hints }) => ({
        url: `problems/${problemId}`,
        method: 'PATCH',
        body: { hints },
      }),
      invalidatesTags: (result, error, { problemId }) => [
        { type: 'Problems', id: problemId },
        'Problems',
      ],
    }),
  }),
  overrideExisting: false,
});

// Export all the mutation hooks
export const { 
  useUpdateProblemMutation,
  usePatchProblemMutation,
  useUpdateProblemBasicInfoMutation,
  useUpdateProblemTestCasesMutation,
  useUpdateProblemTagsMutation,
  useUpdateProblemHintsMutation,
} = modifyProblemsApi;