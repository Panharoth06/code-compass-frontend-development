import { baseApi } from "../../baseApi";

export interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

export const verifyProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedProblems: builder.query<Problem[], void>({
      query: () => ({
        url: `problems/verified`,
        method: 'GET',
      }),
      providesTags: ['Problems'],
    }),
  }),
});

export const { useGetVerifiedProblemsQuery } = verifyProblemsApi;