import './components/app.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import { AuthProvider } from './components/Contexts/AuthContext';
import { PageProvider } from './components/Contexts/PageContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <AuthProvider>
    <PageProvider>
      <Router>
        <App />
      </Router>
    </PageProvider>
  </AuthProvider>,

  document.getElementById('root'),
);
