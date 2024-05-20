import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserStateType = {
  email: string;
};

export type CurrencyObjectType = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type AllCurrenciesDataType = {
  [key: string]: CurrencyObjectType;
};

export type ExpensesObjectType = {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: AllCurrenciesDataType;
};

export type WalletStateType = {
  currencies: string[],
  expenses: ExpensesObjectType[];
  editor: boolean;
  idToEdit: number;
  isLoading: boolean;
};

export type UserActionType = {
  type: string,
  payload: UserStateType,
};

export type WalletActionType = {
  type: string;
  payload: CurrencyObjectType[];
};

export type GlobalStoreType = {
  user: UserStateType;
  wallet: WalletStateType;
};

export type DispatchType = ThunkDispatch<GlobalStoreType, unknown, AnyAction>;
