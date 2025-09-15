import { UserResponse } from "@/lib/types/user/UserResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS,
        prepareHeaders: async (headers) => {
            const session = await getSession();

            if (session?.access_token) {
                headers.set("Authorization", `Bearer ${session.access_token}`);
            } else {
                console.warn("No access token found in session");
            }
        headers.set("Content-Type", "application/json");
        return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => `users/me`,
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
