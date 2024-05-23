import { useSelector } from 'react-redux';
import { GlobalStoreType } from '../types';
import './styles/Header.css';

function Header() {
  const userEmail = useSelector((state: GlobalStoreType) => state.user.email);
  const { expenses } = useSelector((state: GlobalStoreType) => state.wallet);

  return (
    <header
      className="wallet-header p-8 bg-cover flex flex-col items-center
        justify-between space-y-4 md:flex-row md:space-y-0"
    >
      <div className="title-container flex items-center">
        <h3
          className="text-3xl min-[420px]:text-5xl text-white font-bold"
        >
          TrybeWallet
        </h3>
        <img
          className="max-h-14 pl-2"
          src="/trybeLogo-white.png"
          alt="logo da trybe"
        />
      </div>
      <div className="user-data text-white flex space-x-4">
        <h5 className="border-r pr-4" data-testid="email-field">{ userEmail }</h5>
        <h4 data-testid="header-currency-field">BRL</h4>
        <h4 data-testid="total-field">
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
        </h4>
      </div>
    </header>
  );
}

export default Header;
