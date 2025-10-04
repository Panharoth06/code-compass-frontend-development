// import { baseApi } from "../../baseApi";

// export const deleteBadgesApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     deleteBadge: builder.mutation<void, number>({
//       query: (id) => ({
//         url: `badges/${id}/delete`,
//         method: 'DELETE',
//       }),
//       // Transform the 204 No Content response
//       transformResponse: (response) => undefined,
//       // Correct parameter order: result, error, arg
//       invalidatesTags: (result, error, id) => [
//         { type: 'Badges', id: id },
//         { type: 'Badges', id: 'LIST' } // Invalidate the list to trigger refetch
//       ],
//     }),
//   }),
// });

// export const { useDeleteBadgeMutation } = deleteBadgesApi;

import { baseApi } from "../../baseApi";

export const deleteBadgesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteBadge: builder.mutation<void, number>({
      query: (id) => ({
        url: `badges/${id}/delete`,
        method: 'DELETE',
      }),
      // Transform the 204 No Content response
      transformResponse: () => undefined,
      // Correct parameter order: result, error, arg
      invalidatesTags: (result, error, id) => [
        { type: 'Badges', id: id },
        { type: 'Badges', id: 'LIST' } // Invalidate the list to trigger refetch
      ],
    }),
  }),
});

export const { useDeleteBadgeMutation } = deleteBadgesApi;