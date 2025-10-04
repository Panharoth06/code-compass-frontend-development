import { baseApi } from "../../baseApi";

// Request type based on your API documentation
export interface ModifyPackageRequest {
  name: string;
  description: string;
}

// Response type based on your API documentation
export interface ModifyPackageResponse {
  id: number;
  name: string;
  description: string;
  problems: {
    id: number;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    tags: string[];
  }[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  author: string;
  badgesResponse: {
    id: number;
    name: string;
    description: string;
    icon_url: string;
    created_at: string;
    is_deleted: boolean;
    is_verified: boolean;
    author: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
  };
}

export const modifyPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    modifyPackage: builder.mutation<ModifyPackageResponse, { id: number } & ModifyPackageRequest>({
      query: ({ id, ...body }) => ({
        url: `packages/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Packages', id },
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useModifyPackageMutation } = modifyPackageApi;