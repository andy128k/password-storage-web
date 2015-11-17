import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';
import { content } from './store';

let store = createStore(content);
ReactDOM.render(
  React.createElement(Provider, {store: store},
                      React.createElement(App)),
  document.getElementById('app'));

