import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-md-spinner';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBInput,
  MDBBtn
} from 'mdbreact';

import signUpAction from '../../actions/creators/userAuthActions';
import { signUpValidator } from '../../../../shared/userSharedValidator';
import AppLogo from '../common/AppLogo';

class SignUpPage extends Component {
  initialState = {
    data: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    errors: {}
  };

  state = { ...this.initialState };

  handleOnChange = event => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      data: { ...prevState.data, [event.target.name]: event.target.value }
    }));
  };

  handleOnFocus = event => {
    event.persist();
    const {
      errors: { password }
    } = this.state;
    if (password && this.checkError(password)) {
      this.setState({ errors: { password: '' } });
    }
    this.setState(prevState => ({
      errors: { ...prevState.errors, [event.target.name]: '' }
    }));
  };

  handleOnSubmit = event => {
    event.preventDefault();

    const { data } = this.state;
    const { history, signUpAction } = this.props;
    const { isValid, errors } = signUpValidator(data);

    if (!isValid) {
      this.setState(prevState => ({
        ...prevState,
        errors
      }));
    } else {
      signUpAction({ ...data }).then(() => {
        if (!this.props.authError) history.push('/');
      });
    }
  };

  checkError = error => {
    if (error.endsWith('match')) return true;
    return false;
  };

  render() {
    const {
      data: { username, password, confirmPassword },
      errors
    } = this.state;

    const { isProcessing } = this.props;

    const errorColor = {
      color: '#ff9a9e'
    };

    return (
      <MDBContainer className="mt-4">
        <AppLogo />
        <MDBRow>
          <MDBCol md="6" className="offset-md-3">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header warm-flame-gradient rounded text-center">
                  <h3 className="my-2">
                    <MDBIcon icon="unlock-alt" className="mr-3" />
                    Sign Up
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.handleOnSubmit}>
                  <div className="grey-text">
                    <MDBInput
                      label="username"
                      name="username"
                      value={username}
                      onChange={this.handleOnChange}
                      onFocus={this.handleOnFocus}
                      icon="user-circle-o"
                      group
                      type="text"
                    >
                      {errors.username && (
                        <em
                          className="d-flex justify-content-end"
                          style={errorColor}
                        >
                          <small>{errors.username}</small>
                        </em>
                      )}
                    </MDBInput>
                    <MDBInput
                      label="password"
                      name="password"
                      value={password}
                      onChange={this.handleOnChange}
                      onFocus={this.handleOnFocus}
                      icon="lock"
                      group
                      type="password"
                    >
                      {errors.password && !this.checkError(errors.password) && (
                        <em
                          className="d-flex justify-content-end"
                          style={errorColor}
                        >
                          <small>{errors.password}</small>
                        </em>
                      )}
                    </MDBInput>
                    <MDBInput
                      label="confirm password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={this.handleOnChange}
                      onFocus={this.handleOnFocus}
                      icon="lock"
                      group
                      type="password"
                    >
                      {errors.password && this.checkError(errors.password) && (
                        <em
                          className="d-flex justify-content-end"
                          style={errorColor}
                        >
                          <small>{errors.password}</small>
                        </em>
                      )}
                    </MDBInput>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <MDBBtn
                      color="deep-orange"
                      className="mb-3"
                      type="submit"
                      disabled={isProcessing}
                    >
                      Sign Up
                      {isProcessing && (
                        <Spinner
                          className="ml-2"
                          size={18}
                          singleColor="#fff"
                        />
                      )}
                    </MDBBtn>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>
                      Already a member?
                      <Link to="/signin" className="ml-2">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = ({ userAuth: { isProcessing, authError } }) => ({
  isProcessing,
  authError
});

SignUpPage.propTypes = {
  authError: PropTypes.string.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  signUpAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  { signUpAction }
)(SignUpPage);
