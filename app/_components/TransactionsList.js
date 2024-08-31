import { startOfMonth, subMonths } from 'date-fns';
import { getTransactionsByUser } from '../_lib/data-service';
import MessageToUser from './MessageToUser';
import Transaction from './Transaction';

async function TransactionsList({ filter, user, timeFilter }) {
  const transactions = await getTransactionsByUser(user);
  if (!transactions.length) return null;

  let filteredTransactions = transactions;

  // Time
  const now = new Date();

  if (timeFilter === 'lastMonth') {
    const startOfLastMonth = startOfMonth(now);
    filteredTransactions = filteredTransactions.filter(
      (trans) => new Date(trans.created_at) >= startOfLastMonth
    );
  } else if (timeFilter === 'last3Months') {
    const last3Months = subMonths(now, 3);
    filteredTransactions = filteredTransactions.filter(
      (trans) => new Date(trans.created_at) >= last3Months
    );
  } else if (timeFilter === 'last6Months') {
    const last6Months = subMonths(now, 6);
    filteredTransactions = filteredTransactions.filter(
      (trans) => new Date(trans.created_at) >= last6Months
    );
  } else if (timeFilter === 'lastYear') {
    const lastYear = subMonths(now, 12);
    filteredTransactions = filteredTransactions.filter(
      (trans) => new Date(trans.created_at) >= lastYear
    );
  }

  // Type
  if (filter === 'all') {
  } else if (filter === 'expenses') {
    filteredTransactions = filteredTransactions.filter(
      (trans) => trans.type === 'expense'
    );
  } else if (filter === 'income') {
    filteredTransactions = filteredTransactions.filter(
      (trans) => trans.type === 'income'
    );
  }

  return (
    <div>
      {filteredTransactions.length ? (
        filteredTransactions.map((e) => (
          <Transaction
            category={e?.category}
            price={e?.price}
            type={e?.type}
            id={e?.id}
            date={e?.created_at}
            notes={e?.notes}
            key={e.id}
          />
        ))
      ) : (
        <MessageToUser>
          There is no {filter} transactions yet{' '}
          {filter === 'income' ? '😥' : '😎'}
        </MessageToUser>
      )}
    </div>
  );
}

export default TransactionsList;
