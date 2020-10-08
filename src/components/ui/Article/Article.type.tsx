export type ArticleApi = {
  articles: Article[];
  articlesCount: number;
};

export type Article = {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

export type Author = {
  bio: string;
  following: boolean;
  image: string;
  username: string;
};
