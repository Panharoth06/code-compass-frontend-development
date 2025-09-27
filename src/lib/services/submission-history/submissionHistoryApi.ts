import { baseApi } from "../baseApi";
import { SubmissionHistory } from "@/lib/types/submission-history/submissionHistoryType";

export const submissionHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmissionHistory: builder.query<SubmissionHistory[], {problem_id: number | undefined}>({
      query: ({problem_id}) => `submission-histories/${problem_id}/problem`,
      providesTags: (result, error, {problem_id}) => [{type: 'SubmissionHistories'}, {type: 'Problems', id: problem_id}]
    }),
  }),
});

export const { useGetAllSubmissionHistoryQuery } = submissionHistoryApi;