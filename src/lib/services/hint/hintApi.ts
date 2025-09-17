import {baseApi}  from "../baseApi";

export const hintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    unlockHint: builder.mutation<string, number>({
      query: (hintId) => ({
        url: `hints/${hintId}/unlock`,
        method: 'PATCH',
      }),
      // Fixed: Added curly braces around the object
      invalidatesTags: (hintId) => [
        { type: 'Hints', id: hintId, }
      ]
    }),
  }),
});

export const { 
  useUnlockHintMutation
} = hintApi;