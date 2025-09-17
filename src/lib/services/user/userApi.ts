import { UserResponse } from "@/lib/types/user/UserResponse";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => `users/me`,
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
