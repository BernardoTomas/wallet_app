import { useSelector } from 'react-redux';
import { GlobalStoreType } from '../types';
import './styles/Header.css';

function Header() {
  const userEmail = useSelector((state: GlobalStoreType) => state.user.email);
  const { expenses } = useSelector((state: GlobalStoreType) => state.wallet);

  return (
    <header className="wallet-header">
      Header
      <div className="user-data">
        <h5 data-testid="email-field">{ userEmail }</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
        <h5 data-testid="total-field">
          {
          expenses.length === 0
            ? '0.00'
            : (
              expenses.reduce((acc, expense) => {
                if (expense.value) {
                  return acc + (
                    Number(expense.value) * Number(expense
                      .exchangeRates[expense.currency].ask)
                  );
                }
                return acc;
              }, 0).toFixed(2)
            )
        }
        </h5>
      </div>
    </header>
  );
}

export default Header;
