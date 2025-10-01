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

export type ReportRequest = {
  reason?: string;
  commentId?: number;
  problemId?: number;
  username?: string;
}

export type ReportResponse = {
  reason?: string;
  createAt?: string;
  status?: string;
  commentId?: number;
  problemId?: number;
  userId?: number;
}
