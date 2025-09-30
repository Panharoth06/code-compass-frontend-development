import { baseApi } from "../../baseApi";

export const deletePackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deletePackage: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `packages/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Packages', id },
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useDeletePackageMutation } = deletePackageApi;