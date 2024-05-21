import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a página de login', () => {
  const mockEmail = 'umEmail@ig.com';

  test('Testando se existem os campos email, senha e um botão', () => {
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(entrarBtn).toBeInTheDocument();
  });

  test('Testando se o botão de Entrar funciona corretamente', async () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Senha:');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    await userEvent.type(loginInput, mockEmail);

    expect(entrarBtn).toBeDisabled();

    await userEvent.clear(loginInput);
    await userEvent.type(passwordInput, '123456');

    expect(entrarBtn).toBeDisabled();

    await userEvent.clear(passwordInput);
    await userEvent.type(loginInput, mockEmail);
    await userEvent.type(passwordInput, '123456');

    expect(entrarBtn).not.toBeDisabled();

    await userEvent.click(entrarBtn);

    expect(store.getState().user.email).toBe(mockEmail);

    const userEmail = screen.queryByText(mockEmail);

    expect(userEmail).toBeInTheDocument();
  });
});
