import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const hintApi = createApi({
  reducerPath: "hintApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.access_token) {
        headers.set("Authorization", `Bearer ${session.access_token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    unlockHint: builder.mutation<string, number>({
      query: (hintId) => ({
        url: `hints/${hintId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { 
  useUnlockHintMutation
} = hintApi;