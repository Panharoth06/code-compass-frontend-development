import {baseApi}  from "../baseApi";

export const hintApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    unlockHint: builder.mutation<string, number>({
      query: (hintId) => ({
        url: `hints/${hintId}/unlock`,
        method: 'PUT',
      }),
      invalidatesTags: (hintId) => [
        { type: 'Hints', id: hintId}, {type: 'Problems'}, {type: 'Users'}
      ]
    }),
  }),
});

export const { 
  useUnlockHintMutation
} = hintApi;