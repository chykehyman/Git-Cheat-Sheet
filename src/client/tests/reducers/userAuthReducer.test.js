import userAuth from '../../reducers/userAuthReducer';
import types from '../../actions/types';

describe('grocery reducer', () => {
  const initialState = {
    isProcessing: false,
    user: {},
    authError: ''
  };

  describe('initial state', () => {
    it('should return apppropiate initial state', done => {
      expect(userAuth(undefined, {})).toEqual(initialState);
      done();
    });
  });

  it('should set processing loader to true when passed IS_PROCESSING', done => {
    const action = {
      type: types.IS_PROCESSING,
      bool: true
    };

    const newState = userAuth(initialState, action);
    expect(newState.isProcessing).toEqual(true);
    expect(newState.user).toEqual({});
    expect(newState.authError).toEqual('');
    done();
  });

  it('should populate user object when passed USER_AUTH_SUCCESS', done => {
    const action = {
      type: types.USER_AUTH_SUCCESS,
      user: {
        username: 'some_username'
      }
    };

    const newState = userAuth(initialState, action);
    expect(newState.isProcessing).toEqual(false);
    expect(newState.user).toEqual({ username: 'some_username' });
    expect(newState.authError).toEqual('');
    done();
  });

  it('should return an error when passed USER_AUTH_FAILURE', done => {
    const action = {
      type: types.USER_AUTH_FAILURE,
      error: 'auth error'
    };

    const newState = userAuth(initialState, action);
    expect(newState.isProcessing).toEqual(false);
    expect(newState.user).toEqual({});
    expect(newState.authError).toEqual('auth error');
    done();
  });
});
