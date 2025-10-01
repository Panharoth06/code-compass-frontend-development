import { baseApi } from "../baseApi";

export interface BadgeResponse {
  name: string;
  icon_url: string;
  description: string;
}

export interface Subscriber {
  username: string;
  rank: number;
  stars: number;
  total_problem_solved: number;
  level: string | null;
  profile_image: string | null;
  location: string | null;
  badgesResponse: BadgeResponse[];
}

export interface LeaderboardResponse {
  top_subscribers: Subscriber[];
  your_rank: number;
  nearby_subscribers: Subscriber[];
  current_subscribers: Subscriber;
}

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query<LeaderboardResponse, void>({
      query: () => ({
        url: `leaderboard/me`,
        method: 'GET',
      }),
      providesTags: ['Leaderboard'],
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;