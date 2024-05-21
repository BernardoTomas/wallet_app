import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const expenseDescription = 'Comi um xtudão';

describe('Testes para verificar o funcionamento do Table', () => {
  test('Teste pra ver se as informações certas estão sendo renderizadas', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    const { store } = renderWithRouterAndRedux(<Wallet />);

    const thDescription = screen.getByText('Descrição');
    const thTag = screen.getByText('Tag');
    const thMethod = screen.getByText('Método de pagamento');
    const thValue = screen.getByText('Valor');
    const thCurrency = screen.getByText('Moeda');
    const thExchange = screen.getByText('Câmbio utilizado');
    const thConvertedvalue = screen.getByText('Valor convertido');
    const thCurrencyToExchange = screen.getByText('Moeda de conversão');
    const thEditDelete = screen.getByText('Editar/Excluir');

    expect(thDescription).toBeInTheDocument();
    expect(thTag).toBeInTheDocument();
    expect(thMethod).toBeInTheDocument();
    expect(thValue).toBeInTheDocument();
    expect(thCurrency).toBeInTheDocument();
    expect(thExchange).toBeInTheDocument();
    expect(thConvertedvalue).toBeInTheDocument();
    expect(thCurrencyToExchange).toBeInTheDocument();
    expect(thEditDelete).toBeInTheDocument();

    const valueInput = await screen.findByLabelText('Valor da despesa:');
    const descriptionInput = await screen.findByLabelText('Descrição:');
    const adicionarDespesaBtn = await screen.findByRole('button', { name: 'Adicionar despesa' });

    await userEvent.type(valueInput, '10');
    await userEvent.type(descriptionInput, 'Comi um xtudão');
    await userEvent.click(adicionarDespesaBtn);

    const tdDescription = await screen.findByText(expenseDescription);
    const tdTag = await screen.findByRole('heading', { level: 5, name: 'Alimentação' });
    const tdMethod = await screen.findByRole('heading', { level: 5, name: 'Dinheiro' });
    const tdValue = await screen.findByRole('heading', { level: 5, name: '10.00' });
    const tdCurrency = await screen.findByRole('heading', { level: 5, name: 'Dólar Americano/Real Brasileiro' });
    const tdExchange = await screen.findByRole('heading', { level: 5, name: '4.75' });
    const tdConvertedvalue = await screen.findByRole('heading', { level: 5, name: '47.53' });
    const tdCurrencyToExchange = await screen.findByText('Real');
    const tdEditBtn = await screen.findByTestId('edit-btn');
    const tdDeleteBtn = await screen.findByTestId('delete-btn');

    expect(tdDescription).toBeInTheDocument();
    expect(tdTag).toBeInTheDocument();
    expect(tdMethod).toBeInTheDocument();
    expect(tdValue).toBeInTheDocument();
    expect(tdCurrency).toBeInTheDocument();
    expect(tdExchange).toBeInTheDocument();
    expect(tdConvertedvalue).toBeInTheDocument();
    expect(tdCurrencyToExchange).toBeInTheDocument();
    expect(tdEditBtn).toBeInTheDocument();
    expect(tdDeleteBtn).toBeInTheDocument();

    await userEvent.click(tdDeleteBtn);

    expect(store.getState().wallet.expenses).toHaveLength(0);
  });
});
