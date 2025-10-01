import { baseApi } from "../baseApi";
import { CommentRequest, DiscussionResponse } from "@/lib/types/discussion/discussionResponse";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<CommentRequest, DiscussionResponse>({
      query: (commentData) => ({
        url: `/comments/create`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, { problemId }) => [
        { type: "Problems", id: problemId },
      ],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;