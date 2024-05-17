export type UserStateType = {
  email: string;
}

export type ExpensesObjectType = {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: string;
}

export type WalletStateType = {
  currencies: string[],
  expenses: ExpensesObjectType[];
  editor: boolean;
  idToEdit: number;
}

export type UserActionType = {
  type: string,
  payload: UserStateType,
}

export type WalletActionType = {
  type: string;
  payload: WalletStateType;
}