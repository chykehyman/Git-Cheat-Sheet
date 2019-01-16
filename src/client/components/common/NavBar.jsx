import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import logo from '../../assets/images/cheat_logo.png';

const NavbarPage = ({ logout, username }) => (
  <div className="d-flex flex-row justify-content-between align-items-center mt-4">
    <img src={logo} alt="app logo" width="40px" height="40px" />
    <h4 style={{ color: '#555' }}>Git Cheat Sheet</h4>
    <button
      type="button"
      data-tip="Log Out"
      onClick={() => logout()}
      style={{
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        textAlign: 'center',
        lineHeight: '40px',
        color: 'white',
        fontSize: '22px',
        backgroundColor: '#bbb',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      {username[0].toUpperCase()}
    </button>
    <ReactTooltip place="bottom" effect="solid" />
  </div>
);

NavbarPage.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default NavbarPage;
