import { Submission } from "@/lib/types/submission/Submission";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const submissionApi = createApi ({
    reducerPath: "submissionApi",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS
        }
    ),
    endpoints: (builder) => ({
        postSubmission: builder.mutation<Submission, string>({
            query: (problem_id: string) => `submissions/${problem_id}`,
        }),
    }),
});

export const { usePostSubmissionMutation } = submissionApi;