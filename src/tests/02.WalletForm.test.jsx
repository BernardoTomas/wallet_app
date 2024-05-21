import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const expenseDescription = 'Comi um xtudão';
const valueInputLabel = 'Valor da despesa:';
const descriptionInputLabel = 'Descrição:';

const mockExpense1 = {
  id: 0,
  value: '10',
  description: expenseDescription,
  tag: 'Alimentação',
  method: 'Dinheiro',
  currency: 'USD',
  exchangeRates: mockData,
};

const mockExpense2 = {
  id: 0,
  value: '100',
  description: 'Na real foram 20 coxinhas',
  tag: 'Saúde',
  method: 'Cartão de crédito',
  currency: 'EUR',
  exchangeRates: mockData,
};

describe('Testes para conferir que o WalletForm está funcionando como esperado', () => {
  test('Testando que o wallet form guarda as informações corretas no store', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    const { store } = renderWithRouterAndRedux(<Wallet />);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const valueInput = await screen.findByLabelText(valueInputLabel);
    const descriptionInput = await screen.findByLabelText(descriptionInputLabel);
    const currencyInput = await screen.findByLabelText('Moeda:');
    const methodInput = await screen.findByLabelText('Método de pagamento:');
    const tagInput = await screen.findByLabelText('Categoria:');
    const adicionarDespesaBtn = await screen.findByRole('button', { name: 'Adicionar despesa' });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();

    await userEvent.type(valueInput, '10');
    await userEvent.type(descriptionInput, expenseDescription);
    await userEvent.click(adicionarDespesaBtn);

    expect(store.getState().wallet.expenses).toHaveLength(1);
    expect(store.getState().wallet.expenses[0]).toEqual(mockExpense1);
  });

  test('Testando o modo de edição do WalletForm', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    const { store } = renderWithRouterAndRedux(<Wallet />);

    const valueInput = await screen.findByLabelText(valueInputLabel);
    const descriptionInput = await screen.findByLabelText(descriptionInputLabel);
    const adicionarDespesaBtn = await screen.findByRole('button', { name: 'Adicionar despesa' });

    await userEvent.type(valueInput, '10');
    await userEvent.type(descriptionInput, expenseDescription);
    await userEvent.click(adicionarDespesaBtn);

    const editExpenseTableBtn = await screen.findByTestId('edit-btn');
    expect(editExpenseTableBtn).toBeInTheDocument();

    await userEvent.click(editExpenseTableBtn);

    const editarDespesaBtn = await screen.findByRole('button', { name: 'Editar despesa' });
    expect(editarDespesaBtn).toBeInTheDocument();

    const editValueInput = await screen.findByLabelText(valueInputLabel);
    const editDescriptionInput = await screen.findByLabelText(descriptionInputLabel);
    const editCurrencyInput = await screen.findByLabelText('Moeda:');
    const editMethodInput = await screen.findByLabelText('Método de pagamento:');
    const editTagInput = await screen.findByLabelText('Categoria:');

    await userEvent.clear(editValueInput);
    await userEvent.clear(editDescriptionInput);

    await userEvent.type(editValueInput, '100');
    await userEvent.type(editDescriptionInput, 'Na real foram 20 coxinhas');
    await userEvent.selectOptions(editTagInput, 'Saúde');
    await userEvent.selectOptions(editMethodInput, 'Cartão de crédito');
    await userEvent.selectOptions(editCurrencyInput, 'EUR');
    await userEvent.click(editarDespesaBtn);

    expect(store.getState().wallet.expenses).toHaveLength(1);
    expect(store.getState().wallet.expenses[0]).toEqual(mockExpense2);
  });
});
