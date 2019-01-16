import { combineReducers } from 'redux';
import userAuth from './userAuthReducer';
import gitCheats from './cheatsReducer';

export default combineReducers({
  userAuth,
  gitCheats
});
