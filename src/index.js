import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootApp } from './components/app';

ReactDOM.render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  document.getElementById('app')
);
