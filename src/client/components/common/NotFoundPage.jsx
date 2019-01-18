import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotFoundPage = props => {
  const style = {
    message: { fontWeight: 'bold' },
    color: { color: '#555' },
    link: {
      border: '1px solid #ff7043',
      color: '#ff7043',
      padding: '10px',
      borderRadius: '3px',
      cursor: 'pointer'
    }
  };
  const {
    history: { location }
  } = props;
  const message = ` ${location.pathname} `;

  return (
    <div className="no-items">
      <p className="lead mb-4 mt-4 display-4" style={style.color}>
        404
      </p>
      <i
        className="fa fa-exclamation-triangle fa-3x pb-3 d-block"
        style={style.color}
      />
      <p className="lead" style={style.color}>
        Ooops!!!.. Page with url
        <span style={style.message}>{message}</span>
        was not found
      </p>
      <Link style={style.link} to="/">
        Go Back
      </Link>
    </div>
  );
};

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default NotFoundPage;
