import { UserResponse } from "@/lib/types/user/UserResponse";
import { baseApi } from "../baseApi";

export const submissionHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissionHistory: builder.query<UserResponse, void>({
      query: () => `/submission-history`,
      providesTags: () => [{type: 'Submissions' }]
    }),
  }),
});

export const { useGetSubmissionHistoryQuery } = submissionHistoryApi;
