import React from 'react';
import PropTypes from 'prop-types';
import { MDBInput, Fa, Col } from 'mdbreact';

const formLabel = (
  <Fa icon="search">
    <span className="ml-2">SEARCH YOUR CHEAT</span>
  </Fa>
);

const SearchBar = ({ onChangeHandler }) => (
  <div className="d-flex justify-content-center mt-4">
    <Col md="4">
      <div className="form-group">
        <span className="search-bar">
          <MDBInput
            name="search"
            onChange={onChangeHandler}
            label={formLabel}
            size="md"
            className="text-center"
            autoComplete="off"
          />
        </span>
      </div>
    </Col>
  </div>
);

SearchBar.propTypes = {
  onChangeHandler: PropTypes.func.isRequired
};

export default SearchBar;
