import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DispatchType, GlobalStoreType } from '../types';
import { requestAllCurrenciesList, requestAllCurrencyCodes } from '../redux/actions';

function WalletForm() {
  const { isLoading } = useSelector((globalState: GlobalStoreType) => globalState.wallet);
  const { currencies } = useSelector(
    (globalState: GlobalStoreType) => globalState.wallet,
  );
  const { expenses } = useSelector(
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <form onSubmit={ handleSubmit }>
        <label htmlFor="value">Valor da despesa:</label>
        <input
          onChange={ handleChange }
          type="text"
          id="value"
          data-testid="value-input"
        />

        <label htmlFor="description">Descrição:</label>
        <input
          onChange={ handleChange }
          type="text"
          id="description"
          data-testid="description-input"
        />

        <label htmlFor="currency">Moeda:</label>
        <select data-testid="currency-input" id="currency" onChange={ handleChange }>
          {
            currencies.map((currency) => {
              return <option key={ currency } value={ currency }>{ currency }</option>;
            })
          }
        </select>

        <label htmlFor="method">Método de pagamento:</label>
        <select data-testid="method-input" id="method" onChange={ handleChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="tag">Categoria:</label>
        <select data-testid="tag-input" id="tag" onChange={ handleChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button type="submit">Adicionar despesa</button>
      </form>
    </div>
  );
}

export default WalletForm;
