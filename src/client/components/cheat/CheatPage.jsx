import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol } from 'mdbreact';
import Spinner from 'react-md-spinner';

import NavBar from '../common/NavBar';
import SearchBar from '../common/SearchBar';
import CategoryList from './CategoryList';
import getCheats from '../../actions/creators/cheatsAction';
import { logout } from '../../actions/creators/userAuthActions';

export class CheatPage extends Component {
  state = {
    isDisplayed: false,
    cheatId: '0'
  };

  componentDidMount() {
    const { getCheats } = this.props;
    getCheats();
  }

  onToggleDisplay = cheatId => {
    this.setState({ isDisplayed: true, cheatId }, () => {
      setTimeout(() => this.setState({ isDisplayed: false }), 1500);
    });
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/signin');
  };

  render() {
    const { isFetching, allGitCheats, username } = this.props;
    const { isDisplayed, cheatId } = this.state;

    return (
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10">
          <NavBar username={username} logout={this.handleLogout} />
          {isFetching ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20%'
              }}
            >
              <Spinner />
            </div>
          ) : (
            <Fragment>
              <SearchBar />
              <CategoryList
                allGitCheats={allGitCheats}
                isDisplayed={isDisplayed}
                toggleDisplay={this.onToggleDisplay}
                cheatId={cheatId}
              />
            </Fragment>
          )}
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapStateToProps = ({
  gitCheats: { isFetching, allGitCheats },
  userAuth: {
    user: { username }
  }
}) => ({
  isFetching,
  allGitCheats,
  username
});

CheatPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  allGitCheats: PropTypes.array.isRequired,
  getCheats: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { getCheats, logout }
)(CheatPage);
