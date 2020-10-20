import '../../../assets/scss/link.scss';

import React, { memo } from 'react';

import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { TOKEN_NAME } from '../../../api';
import Wrapper from '../Wrapper/Wrapper';
import { useAuth } from '../../Contexts/AuthContext';

const Header = (): JSX.Element => {
  const { user, setUser } = useAuth();

  const onClickHandle = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_NAME);
  };

  return (
    <header className="header">
      <Container>
        <Wrapper
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px',
            marginBottom: '20px',
          }}
        >
          <Logo />
          {user ? (
            <div>
              <NavLink
                activeClassName="link--active"
                className="link link--mr-10"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                activeClassName="link--active"
                className="link link--mr-10"
                to={`/profile/${user.username}`}
              >
                {user.username}
              </NavLink>
              <NavLink
                activeClassName="link--active"
                className="link link--mr-10"
                to="/create"
              >
                Create Post
              </NavLink>
              <NavLink
                activeClassName="link--active"
                className="link link--mr-10"
                to="/settings"
              >
                Settings
              </NavLink>
              <button onClick={onClickHandle} className="link">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavLink
                activeClassName="link--active"
                className="link link--mr-10"
                to="/signin"
              >
                Sign In
              </NavLink>
              <NavLink
                activeClassName="link--active"
                className="link link--mr-10"
                to="/signup"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </Wrapper>
      </Container>
    </header>
  );
};

export default memo(Header);
