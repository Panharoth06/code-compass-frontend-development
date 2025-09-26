import { baseApi } from "../../baseApi";

// Types
interface CreatePackageRequest {
  name: string;
  description: string;
}

interface UpdatePackageRequest {
  name?: string;
  description?: string;
}

interface AddProblemsRequest {
  package_name: string;
  problem_ids: number[];
}

interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

interface PackageResponse {
  name: string;
  description: string;
  problems: Problem[];
}

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new package
    createPackage: builder.mutation<PackageResponse, CreatePackageRequest>({
      query: (body) => ({
        url: `packages`,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [
        { type: 'Packages' }
      ],
    }),

    // Update a specific package
    updatePackage: builder.mutation<PackageResponse, { id: number; data: UpdatePackageRequest }>({
      query: ({ id, data }) => ({
        url: `packages/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Packages', id },
        { type: 'Packages' }
      ],
    }),

    // Add problems to a package
    addProblemsToPackage: builder.mutation<PackageResponse, AddProblemsRequest>({
      query: (body) => ({
        url: `packages/add-problems`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: () => [
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { 
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useAddProblemsToPackageMutation 
} = packageApi;