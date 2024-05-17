import { WalletActionType, WalletStateType } from '../../types';
import {
  REQUEST_LOADING,
  REQUEST_CURRENCY_CODES,
  SUBMIT_NEW_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
};

const walletReducer = (
  state: WalletStateType = INITIAL_STATE,
  action: WalletActionType,
) => {
  switch (action.type) {
    case SUBMIT_NEW_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case REQUEST_CURRENCY_CODES:
      return {
        ...state,
        currencies: action.payload,
      };
    case REQUEST_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};

export default walletReducer;
