import type { Post, User } from "./postType";

export type CommentSectionProps = {
  postId: string;
};

export type NewComment = {
  desc: string;
}

export type CommentType = {
  _id: string;
  desc: string;
  user: User;
  post: Post;
  createdAt: Date;
}