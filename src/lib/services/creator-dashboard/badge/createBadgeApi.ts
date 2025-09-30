import { baseApi } from "../../baseApi";

// Response type based on your API documentation
export interface CreateBadgeResponse {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  author: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

// Request type based on your API documentation
export interface CreateBadgeRequest {
  name: string;
  description: string;
  icon_url: string;
}

export const createBadgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBadge: builder.mutation<CreateBadgeResponse, CreateBadgeRequest>({
      query: ({ name, description, icon_url }) => ({
        url: `badges`,
        method: 'POST',
        body: { name, description, icon_url }
      }),
      invalidatesTags: () => [
        { type: 'Badges' }
      ],
    }),
  }),
});

export const { useCreateBadgeMutation } = createBadgeApi;