import { Article, ArticleApi } from '../../components/ui/Article/Article.type';
import { del, get, post, put } from '../../api';

import { createPostType } from '../../components/pages/CreatePost/CreatePost.type';
import { getComments } from '../commentService/commentService';

const url = '/articles?limit=10';

export const getArticles = async (
  key: string,
  page: number,
): Promise<ArticleApi> => {
  const response = get<ArticleApi>(`${url}&offset=${page ? page * 10 : 0}`);
  return response;
};

export const getArticlesByTag = async (
  key: string,
  page: number,
  tag: string,
): Promise<ArticleApi> => {
  const response = get<ArticleApi>(
    `${url}&tag=${tag}&offset=${page ? page * 10 : 0}`,
  );
  return response;
};

export const getArticlesByFeed = async (
  key: string,
  page: number,
): Promise<ArticleApi> => {
  const url = '/articles/feed?limit=10';
  const response = get<ArticleApi>(`${url}&offset=${page ? page * 10 : 0}`);
  return response;
};

export const getArticlesByUser = async (
  key: string,
  page: number,
  username: string,
): Promise<ArticleApi> => {
  const response = get<ArticleApi>(
    `${url}&author=${username}&offset=${page ? page * 10 : 0}`,
  );
  return response;
};

export const getArticlesByUserFavorited = async (
  key: string,
  page: number,
  username: string,
): Promise<ArticleApi> => {
  const response = get<ArticleApi>(
    `${url}&favorited=${username}&offset=${page ? page * 10 : 0}`,
  );
  return response;
};

export const createArticle = async (body: createPostType): Promise<Article> => {
  const response = post<Article>('/articles', { article: body });
  return response;
};

export const editArticle = async ({
  data,
  slug,
}: {
  data: createPostType;
  slug: string;
}): Promise<Article> => {
  const response = put<Article>(`/articles/${slug}`, { article: data });
  return response;
};

export const deleteArticle = async (slug: string): Promise<Article> => {
  const response = del<Article>(`/articles/${slug}`);
  return response;
};

export const getArticle = async (
  key: string,
  slug: string,
): Promise<Article> => {
  const response = await get<{ article: Article }>(`/articles/${slug}`);
  return response.article;
};
