import './style.scss';

import React, { FC, useState } from 'react';

import { Article } from './Article.type';
import ArticleInfo from './ArticleInfo/ArticleInfo';
import ArticleModalTags from './ArticleModalTags/ArticleModalTags';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Tag from '../Tag/Tag';
import UserInfo from '../User/UserInfo/UserInfo';
import Wrapper from '../Wrapper/Wrapper';
import { useAuth } from '../../Contexts/AuthContext';

type Props = {
  article: Article;
  className: string;
  handleFavoriteStatus: (slug: string, favorited: boolean) => void;
};

const ArticleCard: FC<Props> = ({
  article,
  className = '',
  handleFavoriteStatus,
}): JSX.Element => {
  const {
    title,
    slug,
    createdAt,
    description,
    favoritesCount,
    tagList,
    favorited,
    author: { image, username },
  } = article;
  const [showTags, setShowTags] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <div className={`article ${className}`}>
      <ArticleInfo title={title} description={description} slug={slug} />
      <Wrapper
        style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
      >
        <UserInfo username={username} image={image} createdAt={createdAt} />
      </Wrapper>
      <Wrapper style={{ marginTop: '20px' }}>
        <FavoriteButton
          disabled={user === null}
          favorited={favorited}
          onClick={() => handleFavoriteStatus(slug, favorited)}
        >
          <span>{favoritesCount}</span>
        </FavoriteButton>
        {tagList.slice(0, 4).map((tag) => (
          <Tag className="tag__feed" tag={tag} key={Math.random() * 1000} />
        ))}
        {tagList.length > 4 && (
          <button onMouseMove={() => setShowTags(true)}>More...</button>
        )}
        {showTags && (
          <ArticleModalTags
            tags={tagList}
            title={title}
            setShowTags={setShowTags}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default ArticleCard;
