import { Author } from '../../components/ui/Article/Article.type';

export type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
};

export type CreateComment = {
  slug: string;
  commentText: string;
};

export type DeleteComment = {
  slug: string;
  id: number;
};
