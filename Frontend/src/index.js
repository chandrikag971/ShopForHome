import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TokenState from './context/tokenContext/tokenState';
import UserState from './context/UserContext/UserState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TokenState>
      <UserState>
        <App />
      </UserState>
    </TokenState>
  </React.StrictMode>
);

