import {
  ProblemResponse,
  ProblemSummaryResponse,
} from "@/lib/types/problem/problemResponse";
import { baseApi } from "../baseApi";


export const problemApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getProblem: builder.query<ProblemResponse | undefined, number>({
      query: (id) => ({
        url: `problems/${id}/me`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Problems", id }],
    }),
    
    getAllProblems: builder.query<ProblemSummaryResponse[], void>({
      query: () => `problems/verified`,
      keepUnusedDataFor: 300, 
      providesTags: () => [{ type: "Problems" }],
    }),

    searchProblems: builder.query<ProblemSummaryResponse[], {searchQuery: string}>({
      // The parameter type is now correctly inferred from the generic argument:
      query: ({ searchQuery }) => ({
        url: `problems/search?keyword=${searchQuery}`, 
      }),
      providesTags: () => [{type: 'Problems'}],
    }),
  }),
});

export const { useGetProblemQuery, useGetAllProblemsQuery, useSearchProblemsQuery } = problemApi;
