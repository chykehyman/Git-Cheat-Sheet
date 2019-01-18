import cheats from '../../reducers/cheatsReducer';
import types from '../../actions/types';

describe('grocery reducer', () => {
  const initialState = {
    isFetching: false,
    allGitCheats: [],
    searchData: null,
    error: ''
  };

  describe('initial state', () => {
    it('should return apppropiate initial state', done => {
      expect(cheats(undefined, {})).toEqual(initialState);
      done();
    });
  });

  it('should set fetching loader to true when passed IS_FETCHING', done => {
    const action = {
      type: types.IS_FETCHING,
      bool: true
    };

    const newState = cheats(initialState, action);
    expect(newState.isFetching).toEqual(true);
    expect(newState.allGitCheats).toEqual([]);
    expect(newState.searchData).toEqual(null);
    expect(newState.error).toEqual('');
    done();
  });

  it('should populate cheats array when passed CHEATS_FETCH_SUCCESS', done => {
    const action = {
      type: types.CHEATS_FETCH_SUCCESS,
      gitCheats: [{}]
    };

    const newState = cheats(initialState, action);
    expect(newState.isFetching).toEqual(false);
    expect(newState.allGitCheats).toEqual([{}]);
    expect(newState.searchData).toEqual(null);
    expect(newState.error).toEqual('');
    done();
  });

  it('should return an error when passed CHEATS_FETCH_FAILURE', done => {
    const action = {
      type: types.CHEATS_FETCH_FAILURE,
      error: 'error occurred'
    };

    const newState = cheats(initialState, action);
    expect(newState.isFetching).toEqual(false);
    expect(newState.allGitCheats).toEqual([]);
    expect(newState.searchData).toEqual(null);
    expect(newState.error).toEqual('error occurred');
    done();
  });

  it('should return searchData array when passed SEARCH_RESPONSE', done => {
    const action = {
      type: types.SEARCH_RESPONSE,
      searchData: [{}]
    };

    const newState = cheats(initialState, action);
    expect(newState.isFetching).toEqual(false);
    expect(newState.allGitCheats).toEqual([]);
    expect(newState.searchData).toEqual([{}]);
    expect(newState.error).toEqual('');
    done();
  });
});
