import { WalletActionType, WalletStateType } from '../../types';
import {
  REQUEST_LOADING,
  REQUEST_CURRENCY_CODES,
  SUBMIT_NEW_EXPENSE,
  DELETE_EXPENSE,
  TOGGLE_EXPENSE_EDITOR,
  EDIT_EXPENSE,
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
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
      };
    case TOGGLE_EXPENSE_EDITOR:
      return {
        ...state,
        editor: true,
        idToEdit: action.payload,
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        editor: false,
        expenses: state.expenses.map((expense) => {
          if (expense.id === state.idToEdit) {
            return action.payload;
          }
          return expense;
        }),
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
