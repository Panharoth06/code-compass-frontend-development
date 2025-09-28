import { baseApi } from "../../baseApi";

// Define the badge interface based on your API response
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  author: string;
}

// Create the API slice for fetching badges
export const displayAllBadgesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBadges: builder.query<Badge[], void>({
      query: () => {
        console.log('Making request to badges endpoint...');
        return {
          url: 'badges',
          method: 'GET'
        };
      },
      transformResponse: (response: Badge[]) => {
        console.log('API Response received:', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Badges' as const, id })),
              { type: 'Badges', id: 'LIST' },
            ]
          : [{ type: 'Badges', id: 'LIST' }],
    }),
  }),
});

// Export the hook for use in components
export const { useGetAllBadgesQuery } = displayAllBadgesApi;