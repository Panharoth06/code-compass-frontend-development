import { ProblemResponse } from "@/lib/types/problem/problemResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

let endpoint: string = "";
export const problemApi = createApi({

  reducerPath: "problemApi",
  
  baseQuery: fetchBaseQuery({
  
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS,
  
    
    prepareHeaders: async (headers) => {
  
      const session = await getSession();
  
      if (session?.access_token) {
        headers.set("Authorization", `Bearer ${session.access_token}`);
        endpoint = "/me";
      } else {
        console.warn("No access token found in session");
      }
  
      headers.set("Content-Type", "application/json");
  
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProblem: builder.query<ProblemResponse, number>({
      query: (id) => `problems/${id}${endpoint}`, 
    }),
  }),
});

export const { useGetProblemQuery } = problemApi;