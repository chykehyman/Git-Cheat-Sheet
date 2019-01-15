import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import logo from '../../assets/images/cheat_logo.png';

const AppLogo = () => (
  <MDBRow className="text-center">
    <MDBCol md="6" className="offset-md-3 mb-3">
      <img src={logo} className="img-fluid" alt="app logo" width="20%" />
    </MDBCol>
  </MDBRow>
);

export default AppLogo;
