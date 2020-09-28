import './ArticleUser.scss';

import { ArticleUserProps } from '../Article.type';
import Moment from 'react-moment';
import React from 'react';
import User from '../../User/User';
import UserAvatar from '../../User/UserAvatar/UserAvatar';

const ArticleUser: React.FC<ArticleUserProps> = ({
  image,
  username,
  createdAt,
  marginTop,
  whiteUsername,
}) => {
  return (
    <div
      className={`article-user__flex ${
        marginTop ? 'article-user--margin-top' : ''
      }`}
    >
      <UserAvatar username={username} image={image} />
      <div>
        <User white={whiteUsername} username={username} />
        {createdAt ? (
          <Moment className="article-user__date" format="LL HH:mm">
            {createdAt}
          </Moment>
        ) : null}
      </div>
    </div>
  );
};

export default ArticleUser;
