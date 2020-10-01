import { ArticleApi } from '../../components/ui/Article/Article.type';
import { get } from '../../api';

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
