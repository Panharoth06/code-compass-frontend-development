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

    getPublicProblem: builder.query<ProblemResponse | undefined, number>({
      query: (id) => ({
        url: `problems/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Problems", id }],
    }),

    getAllProblems: builder.query<
  { content: ProblemSummaryResponse[]; totalPages: number; totalElements: number; number: number; size: number },
  { page?: number; size?: number }
>({
  query: ({ page = 0, size = 10 }) => `problems/verified?page=${page}&size=${size}`,

  // 👇 All pages share one cache key
  serializeQueryArgs: ({ endpointName }) => endpointName,

  // 👇 Merge new pages into the existing cache
  merge: (currentCache, newItems) => {
    if (!currentCache?.content) {
      currentCache.content = [];
    }

    if (newItems.number === 0) {
      // first page -> reset
      currentCache.content = newItems.content;
    } else {
      // next pages -> append
      currentCache.content.push(...newItems.content);
    }

    currentCache.totalElements = newItems.totalElements;
    currentCache.totalPages = newItems.totalPages;
    currentCache.number = newItems.number;
    currentCache.size = newItems.size;
  },

  // 👇 Only refetch when the page number changes
  forceRefetch({ currentArg, previousArg }) {
    return currentArg?.page !== previousArg?.page;
  },
}),



    searchProblems: builder.query<
      ProblemSummaryResponse[],
      { searchQuery: string }
    >({
      // The parameter type is now correctly inferred from the generic argument:
      query: ({ searchQuery }) => ({
        url: `problems/search?keyword=${searchQuery}`,
      }),
      providesTags: () => [{ type: "Problems" }],
    }),
  }),
});

export const {
  useGetProblemQuery,
  useGetAllProblemsQuery,
  useSearchProblemsQuery,
  useGetPublicProblemQuery,
} = problemApi;
