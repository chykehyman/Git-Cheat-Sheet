import axios from 'axios';
import _decode from 'jwt-decode';
import types from '../types';
import toast from '../../helpers/toast';

const isProcessing = bool => ({
  type: types.IS_PROCESSING,
  bool
});

const userAuthSuccess = user => ({
  type: types.USER_AUTH_SUCCESS,
  user
});

const userAuthFailure = error => ({
  type: types.USER_AUTH_FAILURE,
  error
});

const userAuthProcess = userData => async dispatch => {
  let route = 'signup';

  if (typeof userData.confirmPassword === 'undefined') {
    route = 'signin';
  }
  dispatch(isProcessing(true));

  try {
    const response = await axios.post(`/api/${route}`, userData);
    const { message, payload } = response.data;

    localStorage.setItem('token', payload);
    dispatch(userAuthSuccess(_decode(payload)));
    dispatch(isProcessing(false));
    toast('success', message);
  } catch (error) {
    const { message } = error.response.data;
    dispatch(userAuthFailure(message));
    dispatch(isProcessing(false));
    toast('error', message);
  }
};

export default userAuthProcess;
