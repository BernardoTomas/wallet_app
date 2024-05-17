import { UserActionType, UserStateType } from '../../types';
import { SUBMIT_LOGIN_FORM } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state: UserStateType = INITIAL_STATE, action: UserActionType) => {
  switch (action.type) {
    case SUBMIT_LOGIN_FORM:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
