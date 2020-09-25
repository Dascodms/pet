import { Author } from '../Article/Article.type';

export type Comment = {
  id?: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
  currentUser: string;
  slug: string;
};
