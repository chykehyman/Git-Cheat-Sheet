import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol } from 'mdbreact';
import Spinner from 'react-md-spinner';

import NavBar from '../common/NavBar';
import SearchBar from '../common/SearchBar';
import CategoryList from './CategoryList';
import getCheats, { searchCheats } from '../../actions/creators/cheatsAction';
import { logout } from '../../actions/creators/userAuthActions';

export class CheatPage extends Component {
  state = {
    isDisplayed: false,
    cheatId: '0',
    searchText: ''
  };

  componentDidMount() {
    const { getCheats } = this.props;
    getCheats();
  }

  handleToggleDisplay = cheatId => {
    this.setState({ isDisplayed: true, cheatId }, () => {
      setTimeout(() => this.setState({ isDisplayed: false }), 1500);
    });
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/signin');
  };

  handleOnChange = event => {
    event.persist();
    this.setState(
      prevState => ({
        ...prevState,
        searchText: event.target.value
      }),
      () => this.handleCheatSearch()
    );
  };

  handleCheatSearch = () => {
    const { searchText } = this.state;
    const { searchCheats } = this.props;
    searchCheats(searchText);
  };

  render() {
    const { isFetching, allGitCheats, searchData, username } = this.props;
    const { isDisplayed, cheatId } = this.state;

    const cheatsData = searchData || allGitCheats;

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
              <SearchBar onChangeHandler={this.handleOnChange} />
              <CategoryList
                allGitCheats={cheatsData}
                isDisplayed={isDisplayed}
                toggleDisplay={this.handleToggleDisplay}
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
  gitCheats: { isFetching, allGitCheats, searchData },
  userAuth: {
    user: { username }
  }
}) => ({
  isFetching,
  allGitCheats,
  searchData,
  username
});

CheatPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  allGitCheats: PropTypes.array.isRequired,
  getCheats: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  searchCheats: PropTypes.func.isRequired
};

CheatPage.defaultProps = {
  username: 'username'
};

export default connect(
  mapStateToProps,
  { getCheats, logout, searchCheats }
)(CheatPage);
