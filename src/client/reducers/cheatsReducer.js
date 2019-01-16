import types from '../actions/types';
import initialState from '../store/state';

export default (state = initialState.cheats, action) => {
  switch (action.type) {
    case types.IS_FETCHING:
      return { ...state, isFetching: action.bool };
    case types.CHEATS_FETCH_SUCCESS:
      return {
        ...state,
        allGitCheats: [...action.gitCheats],
        error: ''
      };
    case types.CHEATS_FETCH_FAILURE:
      return { ...state, error: action.error };
    case types.SEARCH_RESPONSE:
      return { ...state, searchData: [...action.searchData] };
    default:
      return state;
  }
};
