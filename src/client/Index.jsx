import React from 'react';
import ReactDOM from 'react-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min';
import './assets/styles/main';


ReactDOM.render(
  <div className="app">App is working!!!</div>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
