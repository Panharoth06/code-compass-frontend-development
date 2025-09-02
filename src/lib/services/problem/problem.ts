import { ProblemResponse } from "@/lib/types/problem/problemResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const problemApi = createApi ({
    reducerPath: "problemApi",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS
        }
    ),
    endpoints: (builder) => ({
        getProblem: builder.query<ProblemResponse, string>({
            query: (problemId: string) => `problems/${problemId}`,
        }),
    }),
});

export const { useGetProblemQuery } = problemApi;