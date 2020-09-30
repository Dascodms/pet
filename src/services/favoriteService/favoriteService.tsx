import { del, post } from '../../api';

import { Article } from '../../components/ui/Article/Article.type';

export const favoriteArticle = async ({
  slug,
  favorited,
}: {
  slug: string;
  favorited: boolean;
}): Promise<Article> => {
  const url = `/articles/${slug}/favorite`;
  const response = favorited
    ? await del<{ article: Article }>(url)
    : await post<{ article: Article }>(url);
  console.log(response);
  return response.article;
};
