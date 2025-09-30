import { baseApi } from "../../baseApi";

// Response type based on your API documentation
export interface CreatePackageResponse {
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

// Request type based on your API documentation
export interface CreatePackageRequest {
  name: string;
  description: string;
}

export const createPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation<CreatePackageResponse, CreatePackageRequest>({
      query: ({ name, description }) => ({
        url: `packages`,
        method: 'POST',
        body: { name, description }
      }),
      invalidatesTags: () => [
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useCreatePackageMutation } = createPackageApi;