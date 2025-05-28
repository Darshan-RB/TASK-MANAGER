import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or whatever global CSS you're using
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="668736523921-gcatl58v5cu3vvu3rmjrh6aupvg8r933.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
