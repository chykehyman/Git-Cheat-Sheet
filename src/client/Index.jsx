import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import toastr from 'toastr';

import 'bootstrap/dist/css/bootstrap.min';
import 'mdbreact/dist/css/mdb.css';
import 'toastr/build/toastr.min.css';
import './assets/styles/main';

import Routes from './routes/Index';
import appStore from './store/config';
import { setUser } from './actions/creators/userAuthActions';

toastr.options = {
  showMethod: 'slideDown',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp',
  progressBar: true,
  closeButton: true,
  hideDuration: 500,
  positionClass: 'toast-top-right',
  timeOut: 4000
};

setUser(appStore.dispatch, localStorage.getItem('token'));

ReactDOM.render(
  <Provider store={appStore}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
