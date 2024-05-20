import { apiRequest } from '../../services/apiRequest';
import { AllCurrenciesDataType, DispatchType, ExpensesObjectType } from '../../types';

export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';
export const SUBMIT_NEW_EXPENSE = 'SUBMIT_NEW_EXPENSE';
export const REQUEST_LOADING = 'REQUEST_LOADING';
export const REQUEST_CURRENCY_CODES = 'REQUEST_CURRENCY_CODES';
export const REQUEST_FALIED = 'REQUEST_FAILED';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
const ALL_CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';

const submitLoginAction = (email: string) => ({
  type: SUBMIT_LOGIN_FORM,
  payload: email,
});

const submitNewExpenseAction = (newExpense: ExpensesObjectType) => ({
  type: SUBMIT_NEW_EXPENSE,
  payload: newExpense,
});

const loadingRequest = { type: REQUEST_LOADING };

const requestCurrencyCodes = (data: AllCurrenciesDataType) => ({
  type: REQUEST_CURRENCY_CODES,
  payload: Object.values(data).filter(({ codein }) => codein !== 'BRLT')
    .map(({ code }) => code),
});

const requestAllCurrencyCodes = () => async (dispatch: DispatchType) => {
  try {
    dispatch(loadingRequest);
    const currencyCodesList = await apiRequest(ALL_CURRENCIES_URL);
    dispatch(requestCurrencyCodes(currencyCodesList));
    dispatch(loadingRequest);
  } catch (error: any) {
    console.log(error.message);
  }
};

const requestAllCurrenciesList = (newExpense: ExpensesObjectType) => (
  async (dispatch: DispatchType) => {
    try {
      dispatch(loadingRequest);
      const currenciesList = await apiRequest(ALL_CURRENCIES_URL);
      dispatch(submitNewExpenseAction({ ...newExpense, exchangeRates: currenciesList }));
      dispatch(loadingRequest);
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

const deleteExpenseAction = (newExpenseList: ExpensesObjectType[]) => ({
  type: DELETE_EXPENSE,
  payload: newExpenseList,
});

export {
  submitLoginAction,
  submitNewExpenseAction,
  requestAllCurrencyCodes,
  requestAllCurrenciesList,
  deleteExpenseAction,
};
