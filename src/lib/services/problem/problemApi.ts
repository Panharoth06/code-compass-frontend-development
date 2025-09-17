import { ProblemResponse } from "@/lib/types/problem/problemResponse";
import { baseApi } from "../baseApi";
import { getSession } from "next-auth/react";

export const problemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProblem: builder.query<ProblemResponse, number>({
      query: async (id) => {
        const session = await getSession();
        const endpoint = session?.access_token ? '/me' : '';
        return { url: `problems/${id}${endpoint}`, method: "GET" };
      },
      providesTags: (result, error, id) => [{ type: "Problems", id }],
    }),
  }),
});

export const { useGetProblemQuery } = problemApi;