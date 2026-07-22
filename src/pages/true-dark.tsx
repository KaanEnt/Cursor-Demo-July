import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import '../index.css';

// True dark landing — pure-black token overrides come from html.true-dark in tokens.css.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
