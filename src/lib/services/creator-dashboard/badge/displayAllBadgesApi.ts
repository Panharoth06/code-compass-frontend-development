import { baseApi } from "../../baseApi";

// Define types based on the API response
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  author: string;
  status: "PENDING" | "APPROVED";
}

export const displayAllBadgesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBadgesByAuthor: builder.query<Badge[], void>({
      query: () => ({
        url: `badges/me`,
        method: 'GET',
      }),
      providesTags: () => [
        { type: 'Badges' }
      ],
    }),
  }),
});

export const { useGetAllBadgesByAuthorQuery } = displayAllBadgesApi;