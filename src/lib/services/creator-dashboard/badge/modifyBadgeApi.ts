// import { baseApi } from "../../baseApi";

// // Request type based on your API documentation
// export interface ModifyBadgeRequest {
//   name: string;
//   description: string;
//   icon_url: string;
// }

// // Response type - API returns plain text message
// export type ModifyBadgeResponse = string;

// export const modifyBadgeApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     modifyBadge: builder.mutation<ModifyBadgeResponse, { id: number } & ModifyBadgeRequest>({
//       query: ({ id, ...body }) => ({
//         url: `badges/${id}`,
//         method: 'PUT',
//         body,
//       }),
//       transformResponse: (response: any) => {
//         // If response is already a string, return it
//         if (typeof response === 'string') {
//           return response;
//         }
//         // If response is an object with a message, return the message
//         if (response?.message) {
//           return response.message;
//         }
//         // Otherwise return the whole response as string
//         return String(response);
//       },
//       invalidatesTags: (result, error, { id }) => [
//         { type: 'Badges', id },
//         { type: 'Badges' }
//       ],
//     }),
//   }),
// });

// export const { useModifyBadgeMutation } = modifyBadgeApi;

import { baseApi } from "../../baseApi";

// Request type based on your API documentation
export interface ModifyBadgeRequest {
  name: string;
  description: string;
  icon_url: string;
}

// Response type - API returns plain text message
export type ModifyBadgeResponse = string;

export const modifyBadgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    modifyBadge: builder.mutation<ModifyBadgeResponse, { id: number } & ModifyBadgeRequest>({
      query: ({ id, ...body }) => ({
        url: `badges/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: unknown) => {
        // If response is already a string, return it
        if (typeof response === 'string') {
          return response;
        }
        // If response is an object with a message, return the message
        if (response && typeof response === 'object' && 'message' in response && typeof (response as { message: unknown }).message === 'string') {
          return (response as { message: string }).message;
        }
        // Otherwise return the whole response as string
        return String(response);
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Badges', id },
        { type: 'Badges' }
      ],
    }),
  }),
});

export const { useModifyBadgeMutation } = modifyBadgeApi;