import { getTransactionsByUser } from '../_lib/data-service';
import Msg from './msg';
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
  if (filter === 'income')
    displayTransactions = transactions.filter(
      (trans) => trans.type === 'income'
    );

  return (
    <div>
      {displayTransactions.length ? (
        displayTransactions.map((e) => (
          <Transaction
            category={e.category}
            price={e.price}
            type={e.type}
            id={e.id}
            key={e.id}
          />
        ))
      ) : (
        <Msg>
          There is no {filter} transactions yet{' '}
          {filter === 'income' ? '😥' : '😎'}
        </Msg>
      )}
    </div>
  );
}

export default TransactionsList;
