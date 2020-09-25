import './Header.scss';
import '../../assets/scss/link.scss';

import React, { useEffect } from 'react';

import Container from '../ui/Container/Container';
import HeaderWrapper from './ui/HeaderWrapper/HeaderWrapper';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo/Logo';
import { TOKEN_NAME } from '../../api';
import { useAuth } from '../Contexts/AuthContext';
import { useUser } from '../../hooks/useUser';

const Header = (): JSX.Element => {
  const { user, setUser } = useAuth();

  const onClickHandle = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_NAME);
  };
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <Logo />
          {user ? (
            <HeaderWrapper classes="header__menu">
              <Link className="link" to="/signin">
                settings
              </Link>
              <Link className="link" to="/signup">
                Create Article
              </Link>
              <button onClick={onClickHandle} className="link">
                Logout
              </button>
            </HeaderWrapper>
          ) : (
            <HeaderWrapper classes="header__menu">
              <Link className="link" to="/signin">
                Sign In
              </Link>
              <Link className="link" to="/signup">
                Sign Up
              </Link>
            </HeaderWrapper>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
