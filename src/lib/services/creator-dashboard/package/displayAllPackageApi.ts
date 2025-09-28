import { baseApi } from "../../baseApi";

// Define the package interface based on your ACTUAL API response
export interface Package {
  name: string;
  description: string;
  problems: Array<{
    id: number;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    tags: string[];
  }>;
  status: "PENDING" | "APPROVED" | "REJECTED"; // Based on your API response
  author: string;
  
  // Temporary frontend-only fields for compatibility
  _tempId?: number; // Used as fallback ID for frontend operations
}

// Create the API slice for fetching packages
export const displayAllPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query<Package[], void>({
      query: () => {
        console.log('Making request to packages endpoint...');
        return {
          url: 'packages',
          method: 'GET'
        };
      },
      transformResponse: (response: Package[]) => {
        console.log('Packages API Response received:', response);
        
        // Add temporary ID for frontend compatibility
        return response.map((pkg, index) => ({
          ...pkg,
          _tempId: index // Temporary ID based on array index
        }));
      },
      transformErrorResponse: (response: { status?: number; data?: { message?: string; error?: string }; message?: string }) => {
        console.error('Packages API Error:', response);
        return {
          data: {
            message: response?.data?.message || 
                    response?.data?.error || 
                    response?.message || 
                    'Failed to fetch packages. Please try again later.'
          },
          status: response?.status || 500
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((pkg) => ({ type: 'Packages' as const, id: pkg.name })), // Use name as unique identifier
              { type: 'Packages', id: 'LIST' },
            ]
          : [{ type: 'Packages', id: 'LIST' }],
    }),

    // Get a single package by name (since backend doesn't have ID-based lookup yet)
    getPackageByName: builder.query<Package, string>({
      query: (name) => {
        console.log(`Making request to package ${name} endpoint...`);
        return {
          url: `packages/${encodeURIComponent(name)}`,
          method: 'GET'
        };
      },
      transformResponse: (response: Package) => {
        console.log('Package by name API Response received:', response);
        return response;
      },
      transformErrorResponse: (response: { status?: number; data?: { message?: string; error?: string }; message?: string }) => {
        console.error('Package by name API Error:', response);
        return {
          data: {
            message: response?.data?.message || 
                    response?.data?.error || 
                    response?.message || 
                    'Failed to fetch package details. Please try again later.'
          },
          status: response?.status || 500
        };
      },
      providesTags: (result, error, name) => [{ type: 'Packages', id: name }],
    }),

    // Keep the old method for backward compatibility, but mark as deprecated
    // @deprecated Use getPackageByName instead
    getPackageById: builder.query<Package, number>({
      query: (id) => {
        console.log(`Making request to package ${id} endpoint...`);
        return {
          url: `packages/${id}`,
          method: 'GET'
        };
      },
      transformResponse: (response: Package) => {
        console.log('Package by ID API Response received:', response);
        return response;
      },
      transformErrorResponse: (response: { status?: number; data?: { message?: string; error?: string }; message?: string }) => {
        console.error('Package by ID API Error:', response);
        return {
          data: {
            message: response?.data?.message || 
                    response?.data?.error || 
                    response?.message || 
                    'Failed to fetch package details. Please try again later.'
          },
          status: response?.status || 500
        };
      },
      providesTags: (result, error, id) => [{ type: 'Packages', id }],
    }),
  }),
});

// Export the hooks for use in components
export const { 
  useGetAllPackagesQuery,
  useGetPackageByIdQuery, // @deprecated
  useGetPackageByNameQuery 
} = displayAllPackageApi;