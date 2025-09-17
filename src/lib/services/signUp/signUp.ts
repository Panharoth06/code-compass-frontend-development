import { SignUpResponse, SignUpRequest } from "@/lib/types/auth/signUp";
import { baseApi } from "../baseApi";

export const signUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Auth" }, { type: "Users" }],
    }),
  }),
});

export const { useSignupMutation } = signUpApi;
