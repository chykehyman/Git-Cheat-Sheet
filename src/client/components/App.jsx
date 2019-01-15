import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.shape().isRequired
};

const App = ({ children }) => <Fragment>{children}</Fragment>;

App.propTypes = propTypes;

export default App;
