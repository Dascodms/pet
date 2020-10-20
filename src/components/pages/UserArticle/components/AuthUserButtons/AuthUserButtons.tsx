import React, { FC, ReactNode } from 'react';

import Wrapper from '../../../../ui/Wrapper/Wrapper';
import { useAuth } from '../../../../Contexts/AuthContext';

type Props = {
  author: string;
  children: ReactNode;
};

const AuthUserButtons: FC<Props> = ({ children, author }) => {
  const { user } = useAuth();
  return (
    <>
      {user.username === author ? (
        <Wrapper
          style={{
            display: 'flex',
            alignSelf: 'flex-end',
            justifyContent: 'space-between',
            width: '220px',
          }}
        >
          {children}
        </Wrapper>
      ) : null}
    </>
  );
};

export default AuthUserButtons;
