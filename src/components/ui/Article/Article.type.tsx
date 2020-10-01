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

export type ArticleProps = {
  article: Article;
  classes: string;
  setPage: (page: number) => void;
  queryKey?: string;
};

export type ArticleUserProps = {
  image: string;
  username: string;
  createdAt?: string;
  whiteUsername?: boolean;
  marginTop?: boolean;
};

export type ArticleModalTagsProps = {
  setShowTags: (arg: boolean) => void;
  title: string;
  tags: string[];
};
