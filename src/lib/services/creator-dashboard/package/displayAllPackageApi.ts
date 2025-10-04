import { baseApi } from "../../baseApi";

// Define types based on the API response
export interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

export interface BadgeResponse {
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

export interface Package {
  id: number;
  name: string;
  description: string;
  problems: Problem[];
  status: "PENDING" | "APPROVED";
  author: string;
  badgesResponse: BadgeResponse | null;
}

export const displayAllPackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackagesByAuthor: builder.query<Package[], void>({
      query: () => ({
        url: `packages/me`,
        method: 'GET',
      }),
      providesTags: () => [
        { type: 'Packages' }
      ],
    }),
  }),
});

export const { useGetAllPackagesByAuthorQuery } = displayAllPackageApi;