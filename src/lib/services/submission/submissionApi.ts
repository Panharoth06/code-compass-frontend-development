import { Judge0Response } from "@/lib/types/jugde0/jugde0Response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const submissionApi = createApi ({
    reducerPath: "submissionApi",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS
        }
    ),
    endpoints: (builder) => ({
        getSubmission: builder.query<Judge0Response, string>({
            query: (token: string) => `submissions/${token}`,
        }),
    }),
});

export const { useGetSubmissionQuery } = submissionApi;