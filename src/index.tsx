import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {FILM_LIST} from './mocks/films.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={FILM_LIST}/>
  </React.StrictMode>
);
