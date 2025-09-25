export type DiscussionResponse = {
  id?: number;
  problemId?: number;
  comment?: string;
  username?: string;
  commentAt?: string;
};

export type CommentRequest = {
  comment?: string;
  username?: string;
  problemId?: number;
}


