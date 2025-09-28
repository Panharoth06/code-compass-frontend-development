import { baseApi } from "../../baseApi";

interface AddProblemRequest {
  package_name: string;
  problem_ids: number[];
}

interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

interface AddProblemResponse {
  name: string;
  description: string;
  problems: Problem[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  author: string;
}

export const addProblemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProblemToPackage: builder.mutation<AddProblemResponse, AddProblemRequest>({
      query: (body) => ({
        url: `packages/add-problems`,
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: () => [
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useAddProblemToPackageMutation } = addProblemApi;