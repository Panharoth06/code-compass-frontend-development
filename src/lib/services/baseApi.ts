/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setAccessToken, setRefreshToken, logout, setTokens } from "@/lib/services/auth/authSlice";
import { getSession } from "next-auth/react";

// Proxy baseQuery without async in prepareHeaders
const baseQuery = fetchBaseQuery({
  // baseUrl: "/api/proxy",
    baseUrl:process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});


// Async wrapper to handle getSession + refresh
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  const session = await getSession();

  // Normalize args
  const queryArgs: any = typeof args === "string" ? { url: args } : { ...args };

  if (session?.access_token) {
    queryArgs.headers = {
      ...queryArgs.headers,
      Authorization: `Bearer ${session.access_token}`,
    };
  }

  let result = await baseQuery(queryArgs, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    const state = api.getState() as RootState;
    const currentRefreshToken = state.auth.refreshToken;

    if (!currentRefreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery(
      { url: "/token", method: "POST", body: { refresh_token: currentRefreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const tokens = refreshResult.data as { accessToken: string; refreshToken: string };
      api.dispatch(setTokens(tokens));
      api.dispatch(setAccessToken(tokens.accessToken));
      api.dispatch(setRefreshToken(tokens.refreshToken));

      // Retry original request
      queryArgs.headers = {
        ...queryArgs.headers,
        Authorization: `Bearer ${tokens.accessToken}`,
      };
      result = await baseQuery(queryArgs, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "Roles",
    "Packages",
    "Comments",
    "Submissions",
    "Solutions",
    "Problems",
    "Medias",
    "CreatorRequests", // fixed typo
    "Badges",
    "Auth",
    "Users",
    "Hints",
    "Leaderboard",
  ],
  endpoints: () => ({}),
});
