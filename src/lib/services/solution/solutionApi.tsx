import { baseApi } from "../baseApi";
import { SolutionResponse } from "@/lib/types/solution/solutionResponse";

export const solutionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSolutions: builder.query<SolutionResponse[], { problem_id: number}>({
      query: ({ problem_id }) => `solutions/problem/${problem_id}`,
      providesTags: (result, error, { problem_id }) => [
        { type: "Solutions", id: problem_id },
      ],
    }),
  }),
});

export const { useGetAllSolutionsQuery } = solutionApi;
