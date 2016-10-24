import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './reducer';

import './index.css';

let store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);
