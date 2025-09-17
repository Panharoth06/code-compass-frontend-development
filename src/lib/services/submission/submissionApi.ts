import { BatchSubmissionResult, Submission } from "@/lib/types/submission/Submission";
import { baseApi } from "../baseApi";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBatchSubmissions: builder.mutation<BatchSubmissionResult, { problem_id: string; body: Submission }>({
      query: ({ problem_id, body }) => ({
        url: `submissions/batch/${problem_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Submissions", "Users", "Problems"],
    }),

    runBatchSubmissions: builder.mutation<BatchSubmissionResult, Submission >({
      query: (body) => ({
        url: `submissions/run/batch`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Submissions"],
    }),
  }),
});


export const {
  usePostBatchSubmissionsMutation,
  useRunBatchSubmissionsMutation,
} = submissionApi;
