import { baseApi } from "../baseApi";

export const creatorRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCreatorRequest: builder.mutation<{status: string} , {description: string}>({
      query: ({description}) => ({
        url: `creator-requests`,
        method: 'POST',
        body: {description}
      }),
      invalidatesTags: () => [
        {type: 'CreatorRequests'}
    ],
    }),
  }),
});

export const { usePostCreatorRequestMutation } = creatorRequestApi;