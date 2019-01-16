import React from 'react';
import { MDBInput, Fa, Col } from 'mdbreact';

const formLabel = (
  <Fa icon="search">
    <span className="ml-2">SEARCH YOUR CHEAT</span>
  </Fa>
);

const SearchBar = () => (
  <div className="d-flex justify-content-center mt-4">
    <Col md="4">
      <div className="form-group">
        <MDBInput label={formLabel} size="md" className="text-center" />
      </div>
    </Col>
  </div>
);

export default SearchBar;
