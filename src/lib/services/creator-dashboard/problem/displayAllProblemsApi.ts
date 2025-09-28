import { baseApi } from "../../baseApi";

export const displayAllProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisplayAllProblems: builder.query<any[], void>({
      query: () => ({
        url: `problems/me`,
        method: 'GET',
      }),
      providesTags: () => [
        { type: 'DisplayAllProblems' }
      ],
    }),
  }),
});

export const { useGetDisplayAllProblemsQuery } = displayAllProblemsApi;