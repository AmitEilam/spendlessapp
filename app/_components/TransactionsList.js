import { deleteTransaction } from '../_lib/actions';
import { getTransactionsByUser } from '../_lib/data-service';
import Transaction from './Transaction';

async function TransactionsList({ filter, user }) {
  const transactions = await getTransactionsByUser(user);
  if (!transactions.length) return null;

  let displayTransactions;
  if (filter === 'all') displayTransactions = transactions;
  if (filter === 'expenses')
    displayTransactions = transactions.filter(
      (trans) => trans.type === 'expense'
    );
  if (filter === 'incomes')
    displayTransactions = transactions.filter(
      (trans) => trans.type === 'income'
    );

  return (
    <div>
      {displayTransactions.map((e) => (
        <Transaction
          category={e.category}
          price={e.price}
          type={e.type}
          id={e.id}
          key={e.id}
        />
      ))}
    </div>
  );
}

export default TransactionsList;
