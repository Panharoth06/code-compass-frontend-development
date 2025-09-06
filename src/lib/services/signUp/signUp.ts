import { SignUpResponse, SignUpRequest } from "@/lib/types/auth/signUp";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation } = signUpApi;
