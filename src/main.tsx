import React from 'react';
import ReactDOM from 'react-dom/client';
import '@shared/presentation/styles/motion-theme.css';
import { App } from '@app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
