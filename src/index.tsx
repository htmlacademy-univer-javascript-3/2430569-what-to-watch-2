import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {store} from './store';
import {Provider} from 'react-redux';
import {fetchFilms} from './store/api-actions.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
