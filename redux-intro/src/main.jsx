import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import './index.css';

store.dispatch({ type: 'account/deposit', payload: 250 });
console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
