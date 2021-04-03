import React from 'react';
import ReactDOM from 'react-dom';
import '@/shared/presentation/assets/styles/global.style.css';
import App from './shared/presentation/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
