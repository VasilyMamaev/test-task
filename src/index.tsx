import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import store from './store';

ReactDOM.render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
);
