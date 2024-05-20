import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DispatchType, ExpensesObjectType, GlobalStoreType } from '../types';
import {
  editExpenseAction,
  requestAllCurrenciesList,
  requestAllCurrencyCodes,
} from '../redux/actions';

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
  };

  if (isLoading) return <h3>Carregando...</h3>;

  return (
    <div className="wallet-form-container">
      <form>
        <label htmlFor="value">Valor da despesa:</label>
        <input
          value={ formData.value }
          onChange={ handleChange }
          type="number"
          id="value"
          data-testid="value-input"
        />

        <label htmlFor="description">Descrição:</label>
        <input
          value={ formData.description }
          onChange={ handleChange }
          type="text"
          id="description"
          data-testid="description-input"
        />

        <label htmlFor="currency">Moeda:</label>
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

        <label htmlFor="method">Método de pagamento:</label>
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

        <label htmlFor="tag">Categoria:</label>
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

        { editor
          ? (
            <button onClick={ handleEditExpense } type="button">
              Editar despesa
            </button>
          )
          : <button onClick={ handleSubmit } type="button">Adicionar despesa</button>}
      </form>
    </div>
  );
}

export default WalletForm;
