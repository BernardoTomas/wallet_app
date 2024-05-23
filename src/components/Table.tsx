import { useDispatch, useSelector } from 'react-redux';
import './styles/Table.css';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { GlobalStoreType } from '../types';
import { deleteExpenseAction, toggleEditExpenseAction } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((globalState: GlobalStoreType) => globalState.wallet);
  const dispatch = useDispatch();

  const handleDeleteExpense = (id: number) => {
    const newExpenseList = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpenseAction(newExpenseList));
  };

  const handleChangeEditMode = (id: number) => {
    dispatch(toggleEditExpenseAction(id));
  };

  return (
    <div className="expense-table-container m-8 p-4 rounded-md bg-white shadow-xl">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.length > 0
              && expenses.map(({
                id,
                description,
                tag,
                method,
                value,
                exchangeRates,
                currency,
              }) => (
                <tr key={ id }>
                  <td><h5>{ description }</h5></td>
                  <td><h5>{ tag }</h5></td>
                  <td><h5>{ method }</h5></td>
                  <td><h5>{ Number(value).toFixed(2) }</h5></td>
                  <td><h5>{ exchangeRates[currency].name }</h5></td>
                  <td>
                    <h5>
                      {
                        Number(exchangeRates[currency].ask).toFixed(2)
                      }
                    </h5>
                  </td>
                  <td>
                    <h5>
                      {
                        (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                      }
                    </h5>
                  </td>
                  <td><h5>Real</h5></td>
                  <td className="buttons-container space-x-2">
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="edit-btn hover:ring-4 duration-300 ring-orange-300"
                      onClick={ () => handleChangeEditMode(id) }
                    >
                      <MdEdit />
                    </button>

                    <button
                      type="button"
                      data-testid="delete-btn"
                      className="delete-btn hover:ring-4 duration-300 ring-red-300"
                      onClick={ () => handleDeleteExpense(id) }
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
