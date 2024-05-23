import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

function Wallet() {
  return (
    <main className="bg-stone-300 min-h-screen">
      <Header />
      <WalletForm />
      <Table />
    </main>
  );
}

export default Wallet;
