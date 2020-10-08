import './Header.scss';
import '../../../assets/scss/link.scss';

import Container from '../Container/Container';
import HeaderWrapper from './ui/HeaderWrapper/HeaderWrapper';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import React from 'react';
import { TOKEN_NAME } from '../../../api';
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
        <div className="header__wrapper">
          <Logo />
          {user ? (
            <HeaderWrapper classes="header__menu">
              <Link className="link" to="/">
                Home
              </Link>
              <Link className="link" to="/create">
                Create Post
              </Link>
              <Link className="link" to="/">
                Settings
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
