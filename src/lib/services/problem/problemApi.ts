import { ProblemResponse } from "@/lib/types/problem/problemResponse";
import { baseApi } from "../baseApi";

export const problemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProblem: builder.query<ProblemResponse, number>({
      query: (id) => {
        return { url: `problems/${id}/me`, method: "GET" };
      },
      providesTags: (result, error, id) => [{ type: "Problems", id }],
    }),
  }),
});

export const { useGetProblemQuery } = problemApi;