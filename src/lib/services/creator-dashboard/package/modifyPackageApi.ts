import { baseApi } from "../../baseApi";

interface ModifyPackageRequest {
  name?: string;
  description?: string;
}

interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

interface ModifyPackageResponse {
  name: string;
  description: string;
  problems: Problem[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  author: string;
}

export const modifyPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    modifyPackage: builder.mutation<ModifyPackageResponse, { id: number; data: ModifyPackageRequest }>({
      query: ({ id, data }) => {
        console.log('Modify package API call:', { id, data })
        return {
          url: `packages/${id}`,
          method: 'PATCH',
          body: data,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
      invalidatesTags: () => [
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useModifyPackageMutation } = modifyPackageApi;