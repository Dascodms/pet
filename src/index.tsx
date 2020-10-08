import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import { AuthProvider } from './components/Contexts/AuthContext';
import { getArticles } from './services/articleService/articleService';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root'),
);
