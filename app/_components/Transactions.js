import { auth } from '../_lib/auth';
import { getTransactionsByUser } from '../_lib/data-service';
import Transaction from './Transaction';

async function Transactions({ filter }) {
  const session = await auth();
  const transactions = await getTransactionsByUser(session.user.id);

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
          amount={e.amount}
          type={e.type}
          key={e.id}
        />
      ))}
    </div>
  );
}

export default Transactions;
