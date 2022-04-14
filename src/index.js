import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import content from './reducers/content';
import { RootApp } from './components/app';

const store = createStore(content);

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <RootApp />
  </Provider>
);
