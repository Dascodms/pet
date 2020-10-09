import './Header.scss';
import '../../../assets/scss/link.scss';

import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import React from 'react';
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
            <Wrapper
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '250px',
              }}
            >
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
            </Wrapper>
          ) : (
            <Wrapper
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '250px',
              }}
            >
              <Link className="link" to="/signin">
                Sign In
              </Link>
              <Link className="link" to="/signup">
                Sign Up
              </Link>
            </Wrapper>
          )}
        </Wrapper>
      </Container>
    </header>
  );
};

export default Header;
