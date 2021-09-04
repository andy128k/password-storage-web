import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import content from './reducers/content';
import { RootApp } from './components/app';

const store = createStore(content);

ReactDOM.render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  document.getElementById('app')
);
