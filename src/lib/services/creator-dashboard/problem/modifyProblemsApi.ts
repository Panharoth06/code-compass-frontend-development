// import { baseApi } from "../../baseApi";

// // Define the types for the modify problem API
// export interface ModifyProblemRequest {
//   title: string;
//   description: string;
//   difficulty: "EASY" | "MEDIUM" | "HARD";
//   star: "ZERO" | "ONE" | "TWO" | "THREE";
//   coin: number;
//   best_memory_usage: number;
//   best_time_execution: number;
//   test_cases: Array<{
//     stdin: string;
//     expected_outputs: string;
//   }>;
//   tag_names: string[];
//   hints: Array<{
//     description: string;
//     is_locked: boolean;
//   }>;
// }

// // Response type changed to string since API returns a text message
// export interface ModifyProblemResponse {
//   id: number;
//   best_memory_usage: number;
//   best_time_execution: number;
//   coin: string;
//   description: string;
//   difficulty: "EASY" | "MEDIUM" | "HARD";
//   star: "ZERO" | "ONE" | "TWO" | "THREE";
//   title: string;
//   test_cases: Array<{
//     stdin: string;
//     expected_outputs: string;
//   }>;
//   tag_names: string[];
//   hints: Array<{
//     id: number;
//     description: string;
//     is_locked: boolean;
//   }>;
//   author: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
// }

// export const modifyProblemsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Changed return type to string since your API returns a text message
//     modifyProblem: builder.mutation<string, { problemId: number; problemData: ModifyProblemRequest }>({
//       query: ({ problemId, problemData }) => {
//         console.log('=== MODIFY API CALL ===')
//         console.log('Problem ID:', problemId)
//         console.log('Problem Data:', problemData)
//         console.log('URL will be:', `problems/${problemId}`)
        
//         return {
//           url: `problems/${problemId}`,
//           method: 'PATCH',
//           body: problemData,
//         }
//       },
//       transformResponse: (response: any, meta: any, arg: any) => {
//         console.log('=== MODIFY API RESPONSE ===')
//         console.log('Raw response:', response)
//         console.log('Meta:', meta)
//         console.log('Args:', arg)
//         return response
//       },
//       transformErrorResponse: (response: any, meta: any, arg: any) => {
//         console.log('=== MODIFY API ERROR ===')
//         console.log('Error response:', response)
//         console.log('Meta:', meta)
//         console.log('Args:', arg)
//         return response
//       },
//       // Simplified cache invalidation - just invalidate all Problems to force refetch
//       invalidatesTags: (result, error, arg) => {
//         console.log('=== MODIFY API CACHE INVALIDATION ===')
//         console.log('Result:', result)
//         console.log('Error:', error)
//         console.log('Invalidating cache for all Problems')
        
//         // Invalidate the entire Problems cache to force a complete refetch
//         return ['Problems']},
//       // Add extra lifecycle hooks for debugging
//       onQueryStarted: async (arg, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) => {
//         console.log('=== MODIFY QUERY STARTED ===')
//         console.log('Arguments:', arg)
//         console.log('Request ID:', requestId)
        
//         try {
//           const result = await queryFulfilled
//           console.log('=== MODIFY QUERY FULFILLED ===')
//           console.log('Result:', result)
//         } catch (error) {
//           console.log('=== MODIFY QUERY REJECTED ===')
//           console.log('Error:', error)
//         }
//       }
//     }),
//   }),
// });

// export const { useModifyProblemMutation } = modifyProblemsApi;

import { baseApi } from "../../baseApi";

// Define the types for the modify problem API
export interface ModifyProblemRequest {
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

export interface ModifyProblemResponse {
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
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const modifyProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    modifyProblem: builder.mutation<string, { problemId: number; problemData: ModifyProblemRequest }>({
      query: ({ problemId, problemData }) => {
        console.log('=== MODIFY API CALL ===')
        console.log('Problem ID:', problemId)
        console.log('Problem Data:', problemData)
        console.log('URL will be:', `problems/${problemId}`)
        
        return {
          url: `problems/${problemId}`,
          method: 'PATCH',
          body: problemData,
          // CRITICAL FIX: Tell RTK Query to expect text response, not JSON
          responseHandler: 'text',
        }
      },
      transformResponse: (response: string) => {
        console.log('=== MODIFY API RESPONSE ===')
        console.log('Raw response (text):', response)
        return response
      },
      transformErrorResponse: (response: any) => {
        console.log('=== MODIFY API ERROR ===')
        console.log('Error response:', response)
        return response
      },
      invalidatesTags: (result, error) => {
        console.log('=== MODIFY API CACHE INVALIDATION ===')
        console.log('Result:', result)
        console.log('Error:', error)
        console.log('Invalidating cache for all Problems')
        
        return ['Problems']
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        console.log('=== MODIFY QUERY STARTED ===')
        console.log('Arguments:', arg)
        
        try {
          const result = await queryFulfilled
          console.log('=== MODIFY QUERY FULFILLED ===')
          console.log('Result:', result)
        } catch (error) {
          console.log('=== MODIFY QUERY REJECTED ===')
          console.log('Error:', error)
        }
      }
    }),
  }),
});

export const { useModifyProblemMutation } = modifyProblemsApi;