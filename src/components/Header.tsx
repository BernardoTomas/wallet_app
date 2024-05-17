import { useSelector } from 'react-redux';
import { GlobalStoreType } from '../types';

function Header() {
  const userEmail = useSelector((store: GlobalStoreType) => store.user.email);

  return (
    <header className="wallet-header">
      Header
      <div className="user-data">
        <h5 data-testid="email-field">{ userEmail }</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
        <h5 data-testid="total-field">0</h5>
      </div>
    </header>
  );
}

export default Header;
