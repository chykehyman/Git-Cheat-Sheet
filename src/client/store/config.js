import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import indexReducer from '../reducers';

const env = process.env.NODE_ENV || 'development';

let middleware = compose(
  applyMiddleware(thunk, reduxImmutableStateInvariant()),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

if (env === 'production') {
  middleware = applyMiddleware(thunk);
}

const configureStore = () => createStore(indexReducer, middleware);

if (module.hot) {
  // Webpack HMR for reducers
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers').default; // eslint-disable-line global-require
    configureStore.replaceReducer(nextReducer);
  });
}

export default configureStore();
