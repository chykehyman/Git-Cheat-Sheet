import axios from 'axios';
import types from '../types';

const isFetching = bool => ({
  type: types.IS_FETCHING,
  bool
});

const cheatsFetchSuccess = gitCheats => ({
  type: types.CHEATS_FETCH_SUCCESS,
  gitCheats
});

const cheatsFetchFailure = error => ({
  type: types.CHEATS_FETCH_FAILURE,
  error
});

export default () => async dispatch => {
  dispatch(isFetching(true));

  try {
    const response = await axios({
      method: 'GET',
      url: '/api/cheats',
      headers: { 'x-access-token': localStorage.token }
    });

    const { payload } = response.data;

    dispatch(cheatsFetchSuccess(payload));
    dispatch(isFetching(false));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(cheatsFetchFailure(message));
    dispatch(isFetching(false));
  }
};

export const searchCheats = keywords => (dispatch, getState) => {
  const cheats = getState().gitCheats.allGitCheats.filter(
    category =>
      category.name.includes(keywords) ||
      category.cheats
        .map(cheat => cheat.description.toLowerCase())
        .some(description => description.includes(keywords)) ||
      category.cheats
        .map(cheat => cheat.command.toLowerCase())
        .some(command => command.includes(keywords))
  );
  return dispatch({
    type: types.SEARCH_RESPONSE,
    searchData: cheats
  });
};
