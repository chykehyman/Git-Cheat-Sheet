import types from '../actions/types';
import initialState from '../store/state';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case types.IS_PROCESSING:
      return { ...state, isProcessing: action.bool };
    case types.USER_AUTH_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        },
        authError: ''
      };
    case types.USER_AUTH_FAILURE:
      return { ...state, authError: action.error };
    default:
      return state;
  }
};
