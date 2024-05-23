import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DispatchType, ExpensesObjectType, GlobalStoreType } from '../types';
import {
  editExpenseAction,
  requestAllCurrenciesList,
  requestAllCurrencyCodes,
} from '../redux/actions';
import './styles/WalletForm.css';

function WalletForm() {
  const { isLoading } = useSelector((globalState: GlobalStoreType) => globalState.wallet);
  const { currencies } = useSelector(
    (globalState: GlobalStoreType) => globalState.wallet,
  );
  const { expenses } = useSelector(
    (globalState: GlobalStoreType) => globalState.wallet,
  );
  const { editor, idToEdit } = useSelector(
    (globalState: GlobalStoreType) => globalState.wallet,
  );
  const dispatch: DispatchType = useDispatch();

  const [formData, setFormData] = useState({
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  });

  useEffect(() => {
    dispatch(requestAllCurrencyCodes());
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
  };

  const handleEditExpense = () => {
    const updatedFormData = {
      ...formData,
      id: idToEdit,
      exchangeRates: expenses.find(({ id }) => id === idToEdit)?.exchangeRates,
    };
    dispatch(editExpenseAction(updatedFormData as ExpensesObjectType));
  };

  const handleSubmit = () => {
    const newExpenseId = expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;
    const updatedFormData = {
      ...formData,
      id: newExpenseId,
      exchangeRates: {},
    };
    dispatch(requestAllCurrenciesList(updatedFormData));
    setFormData({
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  if (isLoading) return <h3>Carregando...</h3>;

  return (
    <div className="wallet-form-container bg-white shadow-2xl flex justify-center">
      <form className="flex space-x-8 items-end p-6">
        <label htmlFor="value">
          <h6>Valor da despesa:</h6>
          <input
            value={ formData.value }
            onChange={ handleChange }
            type="number"
            id="value"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          <h6>Descrição:</h6>
          <input
            value={ formData.description }
            onChange={ handleChange }
            type="text"
            id="description"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency">
          <h6>Moeda:</h6>
          <select
            value={ formData.currency }
            data-testid="currency-input"
            id="currency"
            onChange={ handleChange }
          >
            {
              currencies.map((currency) => {
                return <option key={ currency } value={ currency }>{ currency }</option>;
              })
            }
          </select>
        </label>

        <label htmlFor="method">
          <h6>Método de pagamento:</h6>
          <select
            value={ formData.method }
            data-testid="method-input"
            id="method"
            onChange={ handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          <h6>Categoria:</h6>
          <select
            value={ formData.tag }
            data-testid="tag-input"
            id="tag"
            onChange={ handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        { editor
          ? (
            <button
              onClick={ handleEditExpense }
              type="button"
              className="bg-orange-500 text-white py-1 px-4 rounded-md font-semibold
              hover:ring-4 ring-orange-300 duration-300"
            >
              Editar despesa
            </button>
          )
          : (
            <button
              onClick={ handleSubmit }
              type="button"
              className="bg-green-500 text-white py-1 px-4 rounded-md font-semibold
              hover:ring-4 ring-green-300 duration-300"
            >
              Adicionar despesa
            </button>
          )}
      </form>
    </div>
  );
}

export default WalletForm;
